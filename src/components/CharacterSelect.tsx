import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCharacter } from '../store/slices/gameSlice';
import { setInitialPlayerData } from '../store/slices/playerSlice';
import { useSocket } from '../utils/SocketContext';
import '../styles/CharacterSelect.css';
import { RootState } from '../store/store';
import { Character } from '../store/slices/gameSlice';
import CharacterSheet from './CharacterSheet';

interface ClassData {
  id: string;
  name: string;
  description: string;
  baseStats: {
    health: number;
    mana: number;
    strength: number;
    dexterity: number;
    intelligence: number;
  };
}

const CharacterSelect = () => {
  const characters = useSelector((state: RootState) => state.player.characters);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const socket = useSocket();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterClass, setNewCharacterClass] = useState('');
  const [availableClasses, setAvailableClasses] = useState<ClassData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (socket) {
      socket.on('updateCharacters', (characters: Character[]) => {
        console.log('Received characters update:', characters);
        dispatch(setInitialPlayerData({ characters }));
        setIsLoading(false);
      });

      socket.on('availableClasses', (classes: ClassData[]) => {
        console.log('Received available classes:', classes);
        setAvailableClasses(classes);
      });

      socket.emit('requestCharacters');
      socket.emit('requestClasses');

      return () => {
        socket.off('updateCharacters');
        socket.off('availableClasses');
      };
    }
  }, [socket, dispatch]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    dispatch(setCharacter(character));
    if (socket) {
      socket.emit('selectCharacter', character.id);
    }
  };

  const handleCreateCharacter = () => {
    // Debug: Log the current user state
    console.log('Current user state at character creation:', user);

    if (!user || !user.id) {
      console.error('User data missing:', user);
      setError('User data is incomplete. Please try logging in again.');
      return;
    }

    if (newCharacterName && newCharacterClass) {
      const characterData = {
        userId: user.id,
        username: user.username, // Add username if needed by the backend
        name: newCharacterName,
        class: newCharacterClass,
        level: 1,
        experience: 0,
        stats: {
          health: 100,
          mana: 100,
          strength: 10,
          dexterity: 10,
          intelligence: 10,
        },
        inventory: [],
        equipment: {},
        skills: [],
      };

      // Debug: Log the character data being sent
      console.log('Sending character data:', characterData);

      setError(null);

      if (socket) {
        // Remove any previous listeners to prevent duplicates
        socket.off('playerData');
        socket.off('error');
        socket.off('createCharacterError');

        socket.on('playerData', (data: any) => {
          console.log('Received player data:', data);
          if (data.playerData) {
            dispatch(setInitialPlayerData(data.playerData));
            setNewCharacterName('');
            setNewCharacterClass('');
          } else {
            console.error('Invalid player data received:', data);
            setError('Invalid player data received from server');
          }
        });

        socket.on('error', (error: any) => {
          console.error('Socket error:', error);
          setError(error.message || 'Error creating character');
        });

        socket.on('createCharacterError', (error: any) => {
          console.error('Character creation error:', error);
          setError(error.message || 'Error creating character');
        });

        // Debug: Add confirmation of socket emit
        try {
          socket.emit('createCharacter', characterData, (response: any) => {
            console.log('Create character response:', response);
          });
          console.log('Character creation request sent successfully');
        } catch (err) {
          console.error('Error emitting createCharacter:', err);
          setError('Error sending character creation request');
        }
      } else {
        console.error('Socket not available');
        setError('Connection to server not available');
      }
    } else {
      setError('Please enter both name and class for the new character');
    }
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/2 space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-200 mb-4">Select a character:</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-2">
            {characters && characters.length > 0 ? (
              characters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleSelectCharacter(character)}
                  className={`w-full p-4 rounded-lg transition-all ${
                    selectedCharacter?.id === character.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{character.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm opacity-75">{character.class}</span>
                      <span className="text-sm bg-gray-800 px-2 py-1 rounded">
                        Level {character.level}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-gray-400 italic">No characters found. Create a new one below!</p>
            )}
          </div>
        </div>

          <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Create New Character</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Character Name"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
              maxLength={20}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <select
              value={newCharacterClass}
              onChange={(e) => setNewCharacterClass(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Class</option>
              {availableClasses.map(classData => (
                <option key={classData.id} value={classData.id}>
                  {classData.name}
                </option>
              ))}
            </select>
            {newCharacterClass && (
              <div className="text-sm text-gray-400 mt-2">
                {availableClasses.find(c => c.id === newCharacterClass)?.description}
              </div>
            )}
            <button 
              onClick={handleCreateCharacter}
              disabled={!newCharacterName || !newCharacterClass || !user}
              className="w-full py-2 px-4 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create New Character
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <CharacterSheet character={selectedCharacter} />
      </div>
    </div>
  );
};

export default CharacterSelect;