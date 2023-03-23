import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCharacters } from '../slices/gameSlice';
import { getSocket } from './useSocketActions';

const usePlayerData = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      const socket = getSocket();

      socket.emit('requestCharacters');

      socket.on('characters', (characters) => {
        dispatch(setCharacters(characters));
      });
    }
  }, [loggedIn, dispatch]);
};

export default usePlayerData;
