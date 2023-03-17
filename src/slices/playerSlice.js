import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  health: 100,
  maxHealth: 100,
  points: 0,
  // You can add other stats as required
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Define actions and reducers for updating player health, points, and other stats
  },
});

// Export actions
export const { /* action1, action2, ... */ } = playerSlice.actions;

// Export reducer
export default playerSlice.reducer;