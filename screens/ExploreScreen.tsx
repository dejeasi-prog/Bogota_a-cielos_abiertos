import React, { useState, useMemo } from 'react';
import ArtGallery from '../components/ArtGallery';
import { POINTS_OF_INTEREST } from '../data/pointsOfInterest';
import type { PointOfInterest } from '../types';
import { PointOfInterestType } from '../types';
import InteractiveMap from '../components/InteractiveMap'; // New component import
import MapPinIcon from '../components/icons/MapPinIcon'; // New icon import

interface ExploreScreenProps {
  onSelectPOI: (poi: PointOfInterest) => void;
}

type FilterType = 'all' | PointOfInterestType | 'map';

const ExploreScreen: React.FC<ExploreScreenProps> = ({ onSelectPOI }) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredPOIs = useMemo(() => {
    if (filter === 'all' || filter === 'map') {
      return POINTS_OF_INTEREST;
    }
    return POINTS_OF_INTEREST.filter(poi => poi.type === filter);
  }, [filter]);

  const FilterButton: React.FC<{
    label: string;
    type: FilterType;
    icon?: React.ReactNode;
  }> = ({ label, type, icon }) => {
    const isActive = filter === type;
    return (
      <button
        onClick={() => setFilter(type)}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
          isActive
            ? 'bg-amber-500 text-white shadow'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 font-sans">Explora la Colección</h2>
        <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
            <FilterButton label="Todos" type="all" />
            <FilterButton label="Obras de Arte" type={PointOfInterestType.ARTWORK} />
            <FilterButton label="Centros Culturales" type={PointOfInterestType.CULTURAL_CENTER} />
            <FilterButton label="Mapa" type="map" icon={<MapPinIcon className="w-4 h-4" />} />
        </div>
      </div>
      {filter === 'map' ? (
        <InteractiveMap pointsOfInterest={filteredPOIs} onSelectPOI={onSelectPOI} />
      ) : (
        <ArtGallery pointsOfInterest={filteredPOIs} onSelectPOI={onSelectPOI} />
      )}
    </>
  );
};

export default ExploreScreen;