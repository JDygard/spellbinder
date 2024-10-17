import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCharacter } from '../store/slices/gameSlice';
import { useSocket } from '../utils/SocketContext';
import '../styles/CharacterSelect.css';

const CharacterSelect = () => {
  const characters = useSelector((state) => state.game.characters);
  const dispatch = useDispatch();
  const socket = useSocket();  // Access the socket

  const handleSelectCharacter = (character) => {
    dispatch(setCharacter(character));  // Set the selected character in Redux

    // Emit the 'selectCharacter' event to the server
    if (socket) {
      socket.emit('selectCharacter', character.id);  // Send the selected character's ID to the server
    }
  };

  const handleCreateCharacter = () => {
    // Implement character creation logic here
    console.log('Create a new character');
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
      <button className="create-character-button" onClick={handleCreateCharacter}>
        Create New Character
      </button>
    </div>
  );
};

export default CharacterSelect;
