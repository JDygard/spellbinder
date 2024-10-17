import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: [],
  selectedLetters: [],
  loggedIn: false,
  playerData: {},
  character: {}, //currently selected character
  characters: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    replaceLetters: (state, action) => {
      state.board = action.payload;
    },
    setSelectedLetters: (state, action) => {
      state.selectedLetters = action.payload;
    },
    clearSelectedLetters: (state) => {
      state.selectedLetters = [];
    },
    login: (state) => {
      state.loggedIn = true;
    },
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setPlayerData: (state, action) => {
      state.playerData = action.payload;
    },
  },
});

export const {
  setBoard,
  replaceLetters,
  setSelectedLetters,
  clearSelectedLetters,
  login,
  setCharacter,
  setCharacters,
  setPlayerData,
} = gameSlice.actions;

export default gameSlice.reducer;
