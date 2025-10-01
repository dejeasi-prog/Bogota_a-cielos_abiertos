import React, { useState } from 'react';
import type { Event } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import MapPinIcon from './icons/MapPinIcon';

// Helper component to highlight search matches
const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  // Escape special characters in highlight string for regex to prevent errors
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-200 text-amber-800 rounded px-1 py-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

interface EventCardProps {
    event: Event;
    searchQuery: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, searchQuery }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-lg">
            <img src={event.imageUrl} alt={`Imagen del evento ${event.title}`} className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 font-sans">
                    <Highlight text={event.title} highlight={searchQuery} />
                </h3>
                
                <div className="flex items-center space-x-2 text-amber-600 mt-2 text-sm">
                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">
                        <Highlight text={event.date} highlight={searchQuery} />
                    </span>
                </div>
                <div className="flex items-start space-x-2 text-gray-600 mt-1 text-sm">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                        <Highlight text={event.location} highlight={searchQuery} />
                    </span>
                </div>

                <p className={`text-gray-700 mt-4 text-sm flex-grow transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-full' : 'line-clamp-3'}`}>
                    {event.description}
                </p>

                <div className="mt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors"
                    >
                        {isExpanded ? 'Ver menos' : 'Ver más'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;