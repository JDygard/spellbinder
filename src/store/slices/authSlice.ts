import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    loggedIn: boolean;
    user: any;
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    loggedIn: false,
    user: null,
    token: null,
    refreshToken: null,
};

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await fetch("http://localhost:3001/verify-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 && refreshToken) {
      const refreshResponse = await fetch("http://localhost:3001/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.status === 200) {
        const data = await refreshResponse.json();
        const newToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        dispatch(refreshTokens({ token: newToken, refreshToken: newRefreshToken }));
      }
    }
  }
);

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
      logout: (state) => {
          state.loggedIn = false;
          state.user = null;
          state.token = null;
          state.refreshToken = null;
      }
  },
});

export const { setInitialState, refreshTokens, logout } = authSlice.actions;

export default authSlice.reducer;
