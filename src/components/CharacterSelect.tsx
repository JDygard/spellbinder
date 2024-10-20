import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCharacter } from '../store/slices/gameSlice';
import { setInitialPlayerData } from '../store/slices/playerSlice';
import { useSocket } from '../utils/SocketContext';
import '../styles/CharacterSelect.css';
import { RootState } from '../store/store';
import { Character } from '../store/slices/gameSlice';


const CharacterSelect = () => {
  const characters = useSelector((state: RootState) => state.player.characters);
  const dispatch = useDispatch();
  const socket = useSocket();  // Access the socket
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterClass, setNewCharacterClass] = useState('');

  const handleSelectCharacter = (character: Character) => {
    dispatch(setCharacter(character));  // Set the selected character in Redux

    // Emit the 'selectCharacter' event to the server
    if (socket) {
      socket.emit('selectCharacter', character.id);  // Send the selected character's ID to the server
    }
  };

  const handleCreateCharacter = () => {
    if (newCharacterName && newCharacterClass) {
      const characterData = {
        name: newCharacterName,
        class: newCharacterClass,
      };

      // Emit the 'createCharacter' event to the server
      if (socket) {
        socket.emit('createCharacter', characterData);
        socket.on('playerData', (data: any) => {
          console.log('Received player data:', data);
          dispatch(setInitialPlayerData(data.playerData));  // Update Redux state with new player data
        });
      }
    } else {
      console.log('Please enter both name and class for the new character');
    }
  };

  return (
    <div>
      <h2>Select a character:</h2>
      <div className="character-list">
        {characters.map((character) => (
          <button
            key={character.id}
            className="character-button"
            onClick={() => handleSelectCharacter(character)}
          >
            {character.name}
          </button>
        ))}
      </div>
      <div className="create-character-form">
        <input
          type="text"
          placeholder="Character Name"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
        />
        <select
          value={newCharacterClass}
          onChange={(e) => setNewCharacterClass(e.target.value)}
        >
          <option value="" disabled>Select Class</option>
          <option value="Warrior">Warrior</option>
          <option value="Rogue">Rogue</option>
          <option value="Sorcerer">Sorcerer</option>
        </select>
        <button className="create-character-button" onClick={handleCreateCharacter}>
          Create New Character
        </button>
      </div>
    </div>
  );
};

export default CharacterSelect;