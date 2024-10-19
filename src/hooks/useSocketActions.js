import { useEffect } from "react";
import { useSocket } from "../utils/SocketContext";
import { setUserData } from "../store/slices/authSlice";
import { setInitialPlayerData } from "../store/slices/playerSlice";

export const useSocketActions = (onPlayerData, ...events) => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {

      
      socket.on("connect_error", (err) => {
        console.log("Socket connect_error:", err);
      });

      socket.on("error", (err) => {
        console.log("Socket error:", err);
      });

      events.forEach((event) => {
        socket.on(event, (data) => {
          setInitialPlayerData({ event, data });
        });
      });

      // Clean up the socket when the component unmounts
      return () => {
        socket.removeAllListeners("playerData");
        socket.removeAllListeners("connect_error");
        socket.removeAllListeners("error");
        events.forEach((event) => {
          socket.removeAllListeners(event);
        });
      };
    }
  }, [socket, onPlayerData, events]);
};

