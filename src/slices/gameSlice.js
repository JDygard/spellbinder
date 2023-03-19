import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: [],
  selectedLetters: [],
  submittedWords: [],
  loggedIn: false, // Add this line
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
  },
});

export const { 
  setBoard, 
  replaceLetters, 
  setSelectedLetters, 
  addSubmittedWord, 
  clearSelectedLetters, 
  login
} = gameSlice.actions;

export default gameSlice.reducer;
