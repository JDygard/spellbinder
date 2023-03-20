import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacter, setCharacters } from '../slices/gameSlice';
import { getSocket } from '../utils/socket';

const CharacterSelect = () => {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.game.characters);
    const character = useSelector((state) => state.game.character);

    const handleCharacterSelect = (character) => {
        dispatch(setCharacter(character));
    };

    const characterMap = characters.map((character) => {
        // Make a card with a button for each character
        return (
            <div onClick={handleCharacterSelect(character)} className="character-card">
                <h3>{character.name}</h3>
                <p>Level: {character.level}</p>
                <p>class: {character.class}</p>
            </div>
        );
    });

    useEffect(() => {
        // use the current user id to fetch the character list from the server
        // use socket.io to listen for character updates
        getSocket().emit('getCharacters', 'userId');
        getSocket().on('characters', (characters) => {
            // Update the character list in the store
            dispatch(setCharacters(characters));
        });
    }, []);

    return (
        <div className="character-select">
            {/* Add your character selection logic and UI here */}
            <button onClick={() => handleCharacterSelect('character1')}>Character 1</button>
            <button onClick={() => handleCharacterSelect('character2')}>Character 2</button>
            {/* Add more characters as needed */}
        </div>
    );
};

export default CharacterSelect;