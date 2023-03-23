import { useEffect, useContext } from "react";
import { useSocket } from "../utils/SocketContext";

export const useSocketActions = (onPlayerData, ...events) => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("playerData", onPlayerData);
      socket.on("connect_error", (err) => {
        console.log("Socket connect_error:", err);
      });

      socket.on("error", (err) => {
        console.log("Socket error:", err);
      });

      // Add event listeners
      events.forEach((event) => {
        socket.on(event, (data) => {
          onPlayerData({ event, data });
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

