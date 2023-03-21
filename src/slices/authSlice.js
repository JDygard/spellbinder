import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitialState: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        refreshTokens: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
    },
});

export const { setInitialState, refreshTokens } = authSlice.actions;

export default authSlice.reducer;
