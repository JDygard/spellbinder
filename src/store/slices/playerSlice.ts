import { createSlice } from '@reduxjs/toolkit';
import { Character } from './gameSlice';

interface PlayerSlice {
  id: string;
  username: string;
  characters: Character[];
  health: number;
  maxHealth: number;
  points: number;
}

const initialState: PlayerSlice = {
  id: "",
  username: "",
  characters: [],
  health: 0,
  maxHealth: 0,
  points: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setInitialPlayerData: (state, action) => {
      if (!action.payload) return;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.characters = action.payload.characters;
    },
    updateCharacters: (state, action) => {
      state.characters = action.payload;
    },
    updateCharacter: (state, action) => {
      const { id, data } = action.payload;
      const characterIndex = state.characters.findIndex(char => char.id === id);
      if (characterIndex !== -1) {
        state.characters[characterIndex] = { ...state.characters[characterIndex], ...data };
      }
    },
    removeCharacter: (state, action) => {
      state.characters = state.characters.filter(char => char.id !== action.payload);
    },
  },
});

// Export actions
export const {
   setInitialPlayerData,
   updateCharacters,
   updateCharacter,
   removeCharacter
 } = playerSlice.actions;

// Export reducer
export default playerSlice.reducer;