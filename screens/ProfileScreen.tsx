import React from 'react';
import type { UserData } from '../types';
import ProfileIcon from '../components/icons/ProfileIcon';
import TrophyIcon from '../components/icons/TrophyIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import { CHALLENGES } from '../data/challenges';

interface ProfileScreenProps {
  userData: ReturnType<typeof import('../hooks/useUserData').useUserData>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userData }) => {
  const completed = CHALLENGES.filter(c => userData.completedChallenges.includes(c.id));

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 font-sans">Mi Perfil</h2>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mb-4">
            <ProfileIcon className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 font-sans">{userData.name}</h3>
            <p className="text-amber-600 font-semibold">{userData.level}</p>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-6 text-center">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Puntos Totales</p>
            <p className="text-3xl font-semibold text-amber-500 flex items-center justify-center space-x-2">
              <SparklesIcon className="w-6 h-6" />
              <span>{userData.points}</span>
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Retos Completados</p>
            <p className="text-3xl font-semibold text-green-500 flex items-center justify-center space-x-2">
              <TrophyIcon className="w-6 h-6" />
              <span>{userData.completedChallenges.length}</span>
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-4 font-sans text-center text-gray-800">Mis Logros</h4>
          {completed.length > 0 ? (
            <div className="space-y-3">
              {completed.map(challenge => (
                <div key={challenge.id} className="bg-green-50 border border-green-200 p-3 rounded-md flex items-center space-x-3">
                  <TrophyIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">{challenge.title}</p>
                    <p className="text-xs text-green-600">+{challenge.points} puntos</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">¡Aún no has completado ningún reto! ¡Sal a explorar!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;