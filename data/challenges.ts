import type { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  {
    id: 'candelaria_explorer',
    title: 'Explorador de La Candelaria',
    description: 'Visita los tres centros culturales más emblemáticos del centro histórico.',
    points: 50,
    requiredPOIs: [4, 5, 6], // IDs for García Márquez, Botero, Colón
  },
  {
    id: 'urban_art_initiate',
    title: 'Iniciado en el Arte Urbano',
    description: 'Descubre dos de los murales más icónicos del centro de Bogotá.',
    points: 30,
    requiredPOIs: [1, 2], // IDs for El Beso, Guardián
  },
  {
    id: 'full_tour',
    title: 'Tour Completo: Corazón de Bogotá',
    description: 'Un reto para los más dedicados. Visita 3 murales y 2 centros culturales.',
    points: 100,
    requiredPOIs: [1, 3, 7, 5, 6],
  },
];
