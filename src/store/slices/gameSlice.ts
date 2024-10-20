import { createSlice } from '@reduxjs/toolkit';


export interface Character {
  id: string;
  userId: string;
  username: string;
  name: string;
  level: number;
  experience: number;
  class: string;
  talentPoints: number;
  talents: {
    class: Record<string, any>;
    generic: Record<string, any>;
  };
  inventory: {
    weapon: Record<string, any> | null;
    armor: Record<string, any> | null;
    trinket: Record<string, any> | null;
    helmet: Record<string, any> | null;
    inventory: (Record<string, any> | null)[];
  };
};

interface GameSlice {
  board: string[];
  selectedLetters: string[];
  loggedIn: boolean;
  playerData: Record<string, any>;
  character: Character;
  characters: Character[];
}



const initialState: GameSlice = {
  board: [],
  selectedLetters: [],
  loggedIn: false,
  playerData: {},
  character: {
    id: '',
    userId: '',
    username: '',
    name: '',
    level: 0,
    experience: 0,
    class: '',
    talentPoints: 0,
    talents: {
      class: {},
      generic: {},
    },
    inventory: {
      weapon: null,
      armor: null,
      trinket: null,
      helmet: null,
      inventory: [],
    },
  }, //currently selected character
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
