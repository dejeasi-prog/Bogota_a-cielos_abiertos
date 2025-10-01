import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { PointOfInterest } from '../types';
import AudioPlayer from './AudioPlayer';

interface InteractiveMapProps {
  pointsOfInterest: PointOfInterest[];
  onSelectPOI: (poi: PointOfInterest) => void;
}

// Custom Icon using SVG for brand consistency
const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const InteractiveMap: React.FC<InteractiveMapProps> = ({ pointsOfInterest, onSelectPOI }) => {
    const bogotaCoords: [number, number] = [4.60971, -74.08175];

    // Quick and dirty way to parse lat/lng from a string location if available, otherwise return null
    const parseLocation = (location: string): [number, number] | null => {
        // This is a placeholder for a real geocoding solution
        // For now, we'll manually assign coordinates to the known locations.
        const locations: { [key: string]: [number, number] } = {
            'Calle 26 con Carrera 13': [4.61523, -74.07226],
            'Avenida El Dorado': [4.64939, -74.0945],
            'Parque de los Periodistas': [4.6015, -74.0699],
            'La Candelaria, Calle 11 # 5-60': [4.5983, -74.0722], // Centro Cultural GGM
            'La Candelaria, Calle 11 # 4-41': [4.5988, -74.0715], // Museo Botero
            'La Candelaria, Calle 10 # 5-32': [4.5968, -74.0720], // Teatro Colón
            'Chapinero Alto': [4.6400, -74.0550],
            'Eje Ambiental': [4.6020, -74.0700],
            'Usaquén, Carrera 7 con Calle 119': [4.7000, -74.0300],
            'Carrera 3 # 19-10': [4.6060, -74.0690], // Cinemateca
            'La Macarena, Carrera 5': [4.6100, -74.0650],
            'Carrera 7 # 6b-30': [4.5940, -74.0750], // Fragmentos
            'Teusaquillo': [4.6300, -74.0780],
        };
        return locations[location] || null;
    };

    return (
        <div className="h-[60vh] w-full rounded-lg overflow-hidden border-2 border-amber-300 shadow-lg">
            <MapContainer center={bogotaCoords} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pointsOfInterest.map(poi => {
                    const position = parseLocation(poi.location);
                    if (!position) return null;

                    return (
                        <Marker key={poi.id} position={position} icon={customIcon}>
                            <Popup>
                               <div className="w-64 rounded-lg overflow-hidden">
                                  <img src={poi.imageUrl} alt={`Imagen de ${poi.title}`} className="w-full h-32 object-cover" />
                                  <div className="p-3">
                                    <h4 className="text-md font-semibold text-gray-800 font-sans">{poi.title}</h4>
                                    <p className="text-xs text-gray-500 mb-3">{poi.artist}</p>
                                    
                                    {poi.audioUrl && (
                                      <div className="mb-3">
                                          <AudioPlayer src={poi.audioUrl} small />
                                      </div>
                                    )}

                                    <button
                                      onClick={() => onSelectPOI(poi)}
                                      className="w-full bg-amber-500 text-white font-semibold text-sm py-2 px-3 rounded-md hover:bg-amber-600 transition-colors"
                                    >
                                      Explorar con Curador
                                    </button>
                                  </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default InteractiveMap;