import { GoogleGenAI, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";
import type { PointOfInterest } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const mapTool: FunctionDeclaration = {
  name: 'showRouteOnMap',
  description: 'Muestra una ruta en un mapa a un destino específico en Bogotá.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      destination: {
        type: Type.STRING,
        description: 'El destino al que el usuario quiere llegar. Debe ser una dirección, nombre de un lugar o punto de interés en Bogotá, Colombia.',
      },
    },
    required: ['destination'],
  },
};

const getSystemInstruction = () => {
  return `Eres 'Candelario', un curador de arte virtual, apasionado y conocedor del programa 'Bogotá a Cielo Abierto'. Tu misión es guiar a los usuarios, tanto locales como turistas, a través del museo al aire libre que es Bogotá, incluyendo sus obras de arte y centros culturales. Eres amigable, creativo y haces que el arte sea accesible y emocionante para todos. También puedes ayudar a los usuarios a encontrar rutas para llegar a los lugares de interés. Tus respuestas deben ser siempre en español. No saludes al usuario a menos que sea el primer mensaje. Responde de forma concisa y conversacional.`;
};

// Helper to fetch image and convert to base64
async function urlToGenerativePart(url: string, mimeType: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return {
    inlineData: {
      mimeType,
      data: base64,
    },
  };
}

export const getImageDescription = async (imageUrl: string): Promise<string> => {
  try {
    const imagePart = await urlToGenerativePart(imageUrl, "image/jpeg");
    const textPart = {
      text: 'Describe esta imagen en detalle para una persona con discapacidad visual. Menciona los colores predominantes, la composición, el estilo del arte y cualquier emoción o ambiente que transmita la escena. Sé vívido y claro en tu descripción.',
    };
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting image description from Gemini:", error);
    return "Lo siento, no pude analizar la imagen en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};


export const getCuratorResponse = async (
  prompt: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  poi?: PointOfInterest | null
): Promise<GenerateContentResponse> => {
  try {
    let fullPrompt = prompt;

    if (poi) {
      fullPrompt = `El contexto actual es sobre ${poi.type}: "${poi.title}", ubicado en ${poi.location}. Su descripción dice: "${poi.description}". La pregunta del usuario es: ${prompt}`;
    }

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
        tools: [{ functionDeclarations: [mapTool] }],
      },
      history: history,
    });
    
    const response = await chat.sendMessage({ message: fullPrompt });
    return response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Mimic the GenerateContentResponse structure for errors
    return {
      // FIX: Per @google/genai guidelines, `text` is a string property and `functionCalls` is a property, not a function.
      // This change prevents runtime errors when handling API call failures.
      text: "Lo siento, parece que mis circuitos artísticos están un poco cruzados en este momento. Por favor, inténtalo de nuevo en un momento.",
      functionCalls: undefined,
    } as unknown as GenerateContentResponse;
  }
};