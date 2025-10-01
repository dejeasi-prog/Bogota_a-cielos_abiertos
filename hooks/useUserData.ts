import { useState, useEffect, useCallback } from 'react';
import type { UserData } from '../types';
import { CHALLENGES } from '../data/challenges';

const getInitialUserData = (): UserData => {
  try {
    const item = window.localStorage.getItem('bogotaCieloAbiertoUser');
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
  return {
    name: 'Explorador/a Urbano',
    points: 0,
    level: 'Novato del Arte',
    completedChallenges: [],
    visitedPlaces: [],
  };
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(getInitialUserData);

  useEffect(() => {
    try {
      window.localStorage.setItem('bogotaCieloAbiertoUser', JSON.stringify(userData));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [userData]);

  const addPoints = useCallback((points: number) => {
    setUserData(prev => ({ ...prev, points: prev.points + points }));
  }, []);

  const addVisitedPlace = useCallback((poiId: number) => {
     setUserData(prev => {
        if(prev.visitedPlaces.includes(poiId)) return prev; // Don't add duplicates
        const newVisitedPlaces = [...prev.visitedPlaces, poiId];
        
        // Check for newly completed challenges
        const newCompletedChallenges = [...prev.completedChallenges];
        let pointsFromChallenges = 0;

        CHALLENGES.forEach(challenge => {
            if (!newCompletedChallenges.includes(challenge.id)) {
                const allRequiredVisited = challenge.requiredPOIs.every(reqId => newVisitedPlaces.includes(reqId));
                if (allRequiredVisited) {
                    newCompletedChallenges.push(challenge.id);
                    pointsFromChallenges += challenge.points;
                }
            }
        });

        return {
            ...prev,
            visitedPlaces: newVisitedPlaces,
            completedChallenges: newCompletedChallenges,
            points: prev.points + pointsFromChallenges
        };
     });
  }, []);
  
  const updateName = useCallback((name: string) => {
    setUserData(prev => ({...prev, name}));
  }, []);

  return { ...userData, addPoints, addVisitedPlace, updateName };
};
