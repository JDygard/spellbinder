import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitialState: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});

export const { setInitialState } = authSlice.actions;

export default authSlice.reducer;
