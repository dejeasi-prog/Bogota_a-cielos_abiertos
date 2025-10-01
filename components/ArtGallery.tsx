import React from 'react';
import type { PointOfInterest } from '../types';
import ArtCard from './ArtCard';

interface ArtGalleryProps {
  pointsOfInterest: PointOfInterest[];
  onSelectPOI: (poi: PointOfInterest) => void;
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ pointsOfInterest, onSelectPOI }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pointsOfInterest.map((poi) => (
          <ArtCard
            key={poi.id}
            poi={poi}
            onSelectPOI={onSelectPOI}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtGallery;
