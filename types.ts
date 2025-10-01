// FIX: Removed a self-import of `PointOfInterestType`. It was causing a conflict with the local enum declaration below.

export enum PointOfInterestType {
  ARTWORK = 'Obra de Arte',
  CULTURAL_CENTER = 'Centro Cultural',
}

export interface PointOfInterest {
  id: number;
  title: string;
  artist: string;
  location: string;
  description: string;
  imageUrl: string;
  type: PointOfInterestType;
  audioUrl?: string; // Optional URL for audio description
}

export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
}

export interface ChatMessage {
  sender: MessageSender;
  text: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  requiredPOIs: number[]; // Array of PointOfInterest IDs required to complete
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface UserData {
  name: string;
  points: number;
  level: string;
  completedChallenges: string[];
  visitedPlaces: number[];
}