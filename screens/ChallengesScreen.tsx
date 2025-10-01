import React from 'react';
import { CHALLENGES } from '../data/challenges';
import type { UserData } from '../types';
import TrophyIcon from '../components/icons/TrophyIcon';

interface ChallengesScreenProps {
  userData: Omit<UserData, 'name' | 'level'>;
}

const ChallengesScreen: React.FC<ChallengesScreenProps> = ({ userData }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 font-sans">Retos Culturales</h2>
      <div className="space-y-6 max-w-2xl mx-auto">
        {CHALLENGES.map(challenge => {
          const isCompleted = userData.completedChallenges.includes(challenge.id);
          const visitedForThisChallenge = challenge.requiredPOIs.filter(poiId => userData.visitedPlaces.includes(poiId)).length;
          const progress = (visitedForThisChallenge / challenge.requiredPOIs.length) * 100;

          return (
            <div key={challenge.id} className={`bg-white p-6 rounded-lg border ${isCompleted ? 'border-green-400' : 'border-gray-200'} shadow-sm`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 font-sans">{challenge.title}</h3>
                  <p className="text-gray-600 mt-1">{challenge.description}</p>
                </div>
                <div className={`flex items-center space-x-2 font-semibold ${isCompleted ? 'text-green-500' : 'text-amber-500'}`}>
                  <TrophyIcon className="w-5 h-5" />
                  <span>{challenge.points} pts</span>
                </div>
              </div>
              {isCompleted ? (
                <p className="mt-4 text-center font-semibold text-green-500">¡Reto Completado!</p>
              ) : (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progreso</span>
                    <span>{visitedForThisChallenge} / {challenge.requiredPOIs.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengesScreen;