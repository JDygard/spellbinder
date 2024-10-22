import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { setInitialPlayerData, updateCharacters } from "../store/slices/playerSlice";
import { RootState } from "../store/store";
import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const dummySocket: Socket = {
  id: '',
  connected: false,
  disconnected: true,
  connect: () => {},
  disconnect: () => {},
  emit: () => {},
  on: () => {},
  off: () => {},
  once: () => {},
  listeners: () => [],
  hasListeners: () => false,
  removeListener: () => {},
  removeAllListeners: () => {},
  // Add other methods as needed
} as unknown as Socket;

export const SocketProvider = (
  { children }: { children: React.ReactNode }
) => {
  const [socket, setSocket] = useState<Socket>(dummySocket);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:3001", { query: { token } });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected")
        newSocket.emit("requestPlayerData")
      });
      
      newSocket.on("playerData", (data) => {
        dispatch(setInitialPlayerData(data));
      })

      newSocket.on("updateCharacters", (data) => {
        dispatch(updateCharacters(data));
      })
        

      return () => {
        newSocket.disconnect();
        setSocket(dummySocket);
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
