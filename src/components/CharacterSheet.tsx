import React from 'react';
import { Shield, Swords, Brain, Heart, Flame } from 'lucide-react';

interface Character {
  name: string;
  class: string;
  level: number;
  stats?: {
    health?: number;
    mana?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  experience?: number;
}

const CharacterSheet: React.FC<{ character: Character | null }> = ({ character }) => {
  if (!character) {
    return (
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 text-gray-300">
        <p className="text-center text-gray-500 italic">Select a character to view details</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 text-gray-300">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-400">{character.name}</h2>
        <div className="mt-2">
          <span className="px-3 py-1 rounded-full bg-blue-600 text-sm">
            {character.class}
          </span>
          <span className="ml-2 px-3 py-1 rounded-full bg-green-600 text-sm">
            Level {character.level}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Heart className="w-5 h-5 text-red-400 mr-2" />
          <span className="text-sm">Health: {character.stats?.health || 100}</span>
        </div>
        <div className="flex items-center">
          <Flame className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-sm">Mana: {character.stats?.mana || 100}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Stats</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div className="flex items-center">
              <Swords className="w-5 h-5 text-red-400 mr-2" />
              <span>Strength</span>
            </div>
            <span className="font-mono">{character.stats?.strength || 10}</span>
          </div>
          
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-400 mr-2" />
              <span>Dexterity</span>
            </div>
            <span className="font-mono">{character.stats?.dexterity || 10}</span>
          </div>
          
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-purple-400 mr-2" />
              <span>Intelligence</span>
            </div>
            <span className="font-mono">{character.stats?.intelligence || 10}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-blue-500 rounded-full h-4"
            style={{ width: `${(character.experience || 0) % 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-1 text-center">
          {character.experience || 0} / 100 XP
        </p>
      </div>
    </div>
  );
};

export default CharacterSheet;