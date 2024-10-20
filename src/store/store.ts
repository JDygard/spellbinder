// store.ts (or store.js if you're using JavaScript)
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import playerReducer from './slices/playerSlice';
import authReducer from './slices/authSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;