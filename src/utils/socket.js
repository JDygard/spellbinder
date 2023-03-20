import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export const initSocket = (token) => {
  if (!socket) {
    socket = io('ws://localhost:3001', {
      query: { token },
    });
    console.log(socket)
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const useSocket = (onPlayerData) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      initSocket(token);

      const socket = getSocket();
      socket.on('playerData', onPlayerData);
      socket.on('connect_error', (err) => {
        console.log('Socket connect_error:', err);
      });
      
      socket.on('error', (err) => {
        console.log('Socket error:', err);
      });

      // Clean up the socket when the component unmounts
      return () => {
        closeSocket();
      };
    }
  }, [onPlayerData]);
};
