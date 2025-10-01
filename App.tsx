import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ExploreScreen from './screens/ExploreScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import AgendaScreen from './screens/AgendaScreen';
import ProfileScreen from './screens/ProfileScreen';
import QRScanner from './components/QRScanner';
import CuratorChat from './components/CuratorChat';
import type { PointOfInterest } from './types';
import { useUserData } from './hooks/useUserData';
import { POINTS_OF_INTEREST } from './data/pointsOfInterest';

export type Screen = 'explore' | 'challenges' | 'agenda' | 'profile';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('explore');
  const [isQRScannerOpen, setQRScannerOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  const [isAccessibilityMode, setAccessibilityMode] = useState<boolean>(false);
  
  const userData = useUserData();

  const handleSelectPOI = (poi: PointOfInterest) => {
    setSelectedPOI(poi);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedPOI(null);
  };

  const handleScanSuccess = (poiId: string) => {
    const poi = POINTS_OF_INTEREST.find(p => p.id === parseInt(poiId, 10));
    if (poi) {
      const points = 10;
      userData.addPoints(points);
      userData.addVisitedPlace(poi.id);
      alert(`¡Has llegado a ${poi.title}! Has ganado ${points} puntos.`);
      handleSelectPOI(poi);
    } else {
      alert("Código QR no reconocido.");
    }
    setQRScannerOpen(false);
  };

  const renderScreen = () => {
    if (isChatOpen) {
      return <CuratorChat initialPOI={selectedPOI} onClose={handleCloseChat} />;
    }
    
    if (isQRScannerOpen) {
      return <QRScanner onSuccess={handleScanSuccess} onClose={() => setQRScannerOpen(false)} />;
    }

    switch (activeScreen) {
      case 'explore':
        return <ExploreScreen onSelectPOI={handleSelectPOI} />;
      case 'challenges':
        return <ChallengesScreen userData={userData} />;
      case 'agenda':
        return <AgendaScreen />;
      case 'profile':
        return <ProfileScreen userData={userData} />;
      default:
        return <ExploreScreen onSelectPOI={handleSelectPOI} />;
    }
  };

  return (
    <div className={`min-h-screen bg-sky-50 text-gray-800 flex flex-col ${isAccessibilityMode ? 'accessibility-mode' : ''}`}>
      <Header 
        isAccessibilityMode={isAccessibilityMode}
        setAccessibilityMode={setAccessibilityMode}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderScreen()}
      </main>
      {!isQRScannerOpen && !isChatOpen && (
        <BottomNav 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
          onScanClick={() => setQRScannerOpen(true)}
        />
      )}
    </div>
  );
};

export default App;