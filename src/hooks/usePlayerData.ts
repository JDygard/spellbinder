import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Character, setCharacters } from '../store/slices/gameSlice';
import { useSocket } from '../utils/SocketContext';
import { RootState } from '../store/store';

const usePlayerData = () => {
  const socket = useSocket();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch();

  if (!socket) return null;

  useEffect(() => {
    if (loggedIn) {
      socket.emit('requestCharacters');

      socket.on('characters', (characters: Character[]) => {
        dispatch(setCharacters(characters));
      });
    }
  }, [loggedIn, dispatch]);
};

export default usePlayerData;
