import { setInitialState } from './authSlice.js';

export const loadInitialState = () => {
  return async (dispatch: any) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(
        setInitialState({
          loggedIn: true,
          user: JSON.parse(user),
          token,
        })
      );
    }
  };
};
