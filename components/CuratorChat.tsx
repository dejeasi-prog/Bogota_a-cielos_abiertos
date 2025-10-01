import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PointOfInterest, ChatMessage } from '../types';
import { MessageSender } from '../types';
import { getCuratorResponse } from '../services/geminiService';
import SendIcon from './icons/SendIcon';
import LoadingSpinner from './LoadingSpinner';
import ChatMessageComponent from './ChatMessage';
import AudioPlayer from './AudioPlayer';

interface CuratorChatProps {
  initialPOI: PointOfInterest | null;
  onClose: () => void;
}

const CuratorChat: React.FC<CuratorChatProps> = ({ initialPOI, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPOI] = useState<PointOfInterest | null>(initialPOI);
  const chatHistoryRef = useRef<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = useCallback((sender: MessageSender, text: string) => {
    setMessages(prev => [...prev, { sender, text }]);
    const role = sender === MessageSender.USER ? 'user' : 'model';
    if (text.includes('Generando una ruta')) return;
    chatHistoryRef.current.push({ role, parts: [{ text }] });
  }, []);

  const getInitialGreeting = useCallback(async () => {
    setIsLoading(true);
    let greetingPrompt = 'Hola, preséntate y dime ¿qué puedo descubrir hoy en Bogotá?';
    if (currentPOI) {
      greetingPrompt = `Hola, acabo de escanear un código QR en ${currentPOI.type}: "${currentPOI.title}". Cuéntame algo fascinante sobre este lugar para empezar.`;
    }
    
    try {
      const response = await getCuratorResponse(greetingPrompt, [], currentPOI);
      if (response.text) {
        addMessage(MessageSender.BOT, response.text);
      }
    } catch (error) {
      console.error(error);
      addMessage(MessageSender.BOT, "Hola. Hubo un problema al conectarme, pero estoy listo para ayudarte a explorar el arte de Bogotá.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPOI, addMessage]);
  
  useEffect(() => {
    getInitialGreeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessageText = userInput;
    addMessage(MessageSender.USER, userMessageText);
    setUserInput('');
    setIsLoading(true);
    
    try {
      const response = await getCuratorResponse(userMessageText, chatHistoryRef.current, currentPOI);
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        for(const call of response.functionCalls) {
          if (call.name === 'showRouteOnMap') {
            const destination = call.args.destination;
            if (typeof destination === 'string' && destination) {
              addMessage(MessageSender.BOT, `¡Claro! He generado una ruta para ti hacia ${destination}. Se abrirá en una nueva pestaña.`);
              const encodedDestination = encodeURIComponent(destination);
              const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;
              window.open(mapUrl, '_blank', 'noopener,noreferrer');
            }
          }
        }
      }

      if (response.text) {
        addMessage(MessageSender.BOT, response.text);
      }

    } catch (error) {
      console.error(error);
      addMessage(MessageSender.BOT, "Mis disculpas, estoy teniendo problemas para procesar esa pregunta. ¿Podrías intentar con otra?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 flex flex-col h-[calc(100vh-200px)]">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 font-sans">Tu Curador Virtual</h3>
          {currentPOI && <p className="text-sm text-amber-600">Explorando: {currentPOI.title}</p>}
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none transition-colors">&times;</button>
      </div>
      
      {currentPOI?.audioUrl && (
        <div className="p-4 border-b border-gray-200">
          <AudioPlayer src={currentPOI.audioUrl} />
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <ChatMessageComponent key={index} message={msg} />
        ))}
        {isLoading && <div className="flex justify-center py-4"><LoadingSpinner /></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-white/50 rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={isLoading ? "El curador está pensando..." : "Pregúntame sobre arte, rutas..."}
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full py-3 px-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            disabled={isLoading}
            aria-label="Escribe tu pregunta"
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="bg-amber-500 text-white rounded-full p-3 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110"
            aria-label="Enviar pregunta"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CuratorChat;