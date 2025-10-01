import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import AccessibilityIcon from './icons/AccessibilityIcon';

interface HeaderProps {
  isAccessibilityMode: boolean;
  setAccessibilityMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isAccessibilityMode, setAccessibilityMode }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Bogotá a <span className="text-amber-500">Cielo Abierto</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-500 hidden md:block">Tu curador de arte virtual</p>
          <button 
            onClick={() => setAccessibilityMode(!isAccessibilityMode)}
            className={`p-2 rounded-full transition-colors ${isAccessibilityMode ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            aria-label={`Activar modo de accesibilidad ${isAccessibilityMode ? 'desactivado' : 'activado'}`}
            title="Activar/Desactivar Modo de Accesibilidad"
            >
            <AccessibilityIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;