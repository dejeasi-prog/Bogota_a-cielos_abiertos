import React, { useState, useMemo } from 'react';
import { EVENTS } from '../data/events';
import SearchIcon from '../components/icons/SearchIcon';
import EventCard from '../components/EventCard';

const AgendaScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) {
      return EVENTS;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return EVENTS.filter(
      (event) =>
        event.title.toLowerCase().includes(lowercasedQuery) ||
        event.date.toLowerCase().includes(lowercasedQuery) ||
        event.location.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800 font-sans">Agenda Cultural</h2>
      
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, fecha o lugar..."
            className="w-full bg-white border border-gray-300 rounded-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            aria-label="Buscar eventos"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} searchQuery={searchQuery} />
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg md:col-span-2">
            <p className="text-gray-600 text-lg">No se encontraron eventos.</p>
            <p className="text-gray-500 text-sm mt-1">Intenta con otros términos de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaScreen;