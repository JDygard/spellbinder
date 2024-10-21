import { createSlice } from '@reduxjs/toolkit';
import { Letter } from '../../hooks/useBoard';


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

export interface SelectedLetter {
  row: number;
  col: number;
}

interface GameSlice {
  board: Letter[][];
  selectedLetters: SelectedLetter[];
  loggedIn: boolean;
  playerData: Record<string, any>;
  character: Character;
  characters: Character[];
  submittedWords: string[];
}

export interface GameState {
  monster: Monster;
  playerHp: number;
  monsterHp: number;
  combos: Combo[];
  score: number;
  gameLog: GameLogEntry[];
  comboGameLog: ComboGameLogEntry[];
  tileEffects: TileEffect[];
  damageMultiplier?: number;
}

interface Monster {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  abilities: Ability[];
}

interface Ability {
  name: string;
  description: string;
  cooldown: number;
}

export interface Combo {
  id?: string;
  name: string;
  sequence: number[]; // Sequence of word lengths
  timeLimit: number;  // Time limit in seconds
  effect: ComboEffect;
}

interface ComboEffect {
  type: string;       // 'damageMultiplier', 'heal', 'applyStatusEffect', etc.
  value: number;
  duration: number;   // Duration in rounds
  statusEffect?: string;
}

export interface GameLogEntry {
  submittedAt: number;
  abilityName?: string;
  word?: string;
  value?: number;
  color?: 'success' | 'fail' | 'danger';
  length?: number;
  effects?: Effect[];
  type?: string;      // Event type like 'bombExplosion', 'lightningDamage'
  damage?: number;
}

interface ComboGameLogEntry {
  word: string;
  length: number;
  submittedAt: number;
}

interface TileEffect {
  type: string;       // 'lightning', 'poison', 'bomb', etc.
  damage?: number;
  duration?: number;
}

interface Effect {
  type: string;
  damage?: number;
  duration?: number;
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
  },
  characters: [],
  submittedWords: [],
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
