import React, { useState } from 'react';
import type { PointOfInterest } from '../types';
import { PointOfInterestType } from '../types';
import MapPinIcon from './icons/MapPinIcon';
import { getImageDescription } from '../services/geminiService';
import ImageIcon from './icons/ImageIcon';
import LoadingSpinner from './LoadingSpinner';

interface ArtCardProps {
  poi: PointOfInterest;
  onSelectPOI: (poi: PointOfInterest) => void;
}

const ArtCard: React.FC<ArtCardProps> = ({ poi, onSelectPOI }) => {
  const [isDescribing, setIsDescribing] = useState(false);

  const typeStyle = poi.type === PointOfInterestType.CULTURAL_CENTER
    ? 'bg-sky-600' // Accent blue
    : 'bg-amber-500';  // Main yellow accent

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening chat when clicking map button
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(poi.location)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDescribeImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescribing(true);
    try {
      const description = await getImageDescription(poi.imageUrl);
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = 'es-CO';
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error describing image:", error);
      alert("No se pudo generar la descripción de la imagen.");
    } finally {
      setIsDescribing(false);
    }
  };


  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="relative">
        <img src={poi.imageUrl} alt={`Imagen de ${poi.title} por ${poi.artist}`} className="w-full h-56 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className={`absolute top-3 right-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10 ${typeStyle}`}>
          {poi.type}
        </div>
        <div className="absolute bottom-4 left-4 z-10">
            <h4 className="text-xl font-semibold text-white mb-1 font-sans">{poi.title}</h4>
            <p className="text-sm text-gray-200 font-semibold">{poi.artist}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{poi.description}</p>
        <div className="flex items-center space-x-2">
            <button
            onClick={() => onSelectPOI(poi)}
            className="flex-1 bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors duration-300"
            >
            Preguntar al Curador
            </button>
            <button
              onClick={handleDescribeImage}
              disabled={isDescribing}
              className="bg-sky-600 text-white font-semibold p-2.5 rounded-md hover:bg-sky-700 transition-colors duration-300 disabled:bg-gray-400"
              aria-label="Describir imagen con inteligencia artificial"
            >
              {isDescribing ? <LoadingSpinner /> : <ImageIcon className="w-5 h-5" />}
            </button>
            <button
            onClick={handleMapClick}
            className="bg-gray-200 text-gray-700 font-semibold p-2.5 rounded-md hover:bg-gray-300 transition-colors duration-300"
            aria-label="Obtener ruta"
            >
            <MapPinIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;