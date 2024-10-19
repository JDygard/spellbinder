import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { setInitialPlayerData, updateCharacters } from "../store/slices/playerSlice";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const token = useSelector((state) => state.auth.token);
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
        setSocket(null);
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
