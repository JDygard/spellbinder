import { io } from "socket.io-client";

let socket;

export const initializeSocket = (token) => {
  console.log(token);
  socket = io("http://localhost:3001", {
    query: { token },
  });
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};
