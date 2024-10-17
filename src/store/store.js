import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import playerReducer from './slices/playerSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
    auth: authSlice,
  },
});

export default store;