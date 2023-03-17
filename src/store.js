import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import playerReducer from './slices/playerSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
  },
});

export default store;