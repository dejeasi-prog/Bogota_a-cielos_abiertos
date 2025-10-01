import React from 'react';
import type { Screen } from '../App';
import ExploreIcon from './icons/ExploreIcon';
import TrophyIcon from './icons/TrophyIcon';
import QrCodeIcon from './icons/QrCodeIcon';
import CalendarIcon from './icons/CalendarIcon';
import ProfileIcon from './icons/ProfileIcon';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
  onScanClick: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
    }`}
  >
    {icon}
    <span className="text-xs mt-1 font-semibold">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen, onScanClick }) => {
  return (
    <footer className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <NavItem 
          label="Explorar"
          icon={<ExploreIcon className="w-6 h-6" />}
          isActive={activeScreen === 'explore'}
          onClick={() => setActiveScreen('explore')}
        />
        <NavItem 
          label="Retos"
          icon={<TrophyIcon className="w-6 h-6" />}
          isActive={activeScreen === 'challenges'}
          onClick={() => setActiveScreen('challenges')}
        />
        <div className="w-20 h-16 flex items-center justify-center">
            <button
            onClick={onScanClick}
            className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center -mt-8 border-4 border-sky-50 hover:bg-amber-600 transition-all transform hover:scale-110 shadow-lg"
            aria-label="Escanear QR"
            >
            <QrCodeIcon className="w-8 h-8" />
            </button>
        </div>
        <NavItem 
          label="Agenda"
          icon={<CalendarIcon className="w-6 h-6" />}
          isActive={activeScreen === 'agenda'}
          onClick={() => setActiveScreen('agenda')}
        />
        <NavItem 
          label="Perfil"
          icon={<ProfileIcon className="w-6 h-6" />}
          isActive={activeScreen === 'profile'}
          onClick={() => setActiveScreen('profile')}
        />
      </div>
    </footer>
  );
};

export default BottomNav;