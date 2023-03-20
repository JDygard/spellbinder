import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: [],
  selectedLetters: [],
  submittedWords: [],
  loggedIn: false,
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
    addSubmittedWord: (state, action) => {
      state.submittedWords.push(action.payload);
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
  },
});

export const {
  setBoard,
  replaceLetters,
  setSelectedLetters,
  addSubmittedWord,
  clearSelectedLetters,
  login,
  setCharacter,
  setCharacters,
} = gameSlice.actions;

export default gameSlice.reducer;
