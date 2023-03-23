import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCharacter, setCharacters } from '../slices/gameSlice';
import '../styles/CharacterSelect.css';

const CharacterSelect = () => {
  const characters = useSelector((state) => state.game.characters);
  const dispatch = useDispatch();

  const handleSelectCharacter = (character) => {
    dispatch(setCharacter(character));
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
