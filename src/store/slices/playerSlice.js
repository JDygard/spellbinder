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
    
  },
});

// Export actions
export const {  } = playerSlice.actions;

// Export reducer
export default playerSlice.reducer;