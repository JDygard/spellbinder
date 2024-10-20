import { useEffect } from "react";
import { useSocket } from "../utils/SocketContext";
import { setInitialPlayerData } from "../store/slices/playerSlice";

export const useSocketActions = (onPlayerData: any, ...events: any) => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {

      
      socket.on("connect_error", (err: Error) => {
        console.log("Socket connect_error:", err);
      });

      socket.on("error", (err: Error) => {
        console.log("Socket error:", err);
      });

      // Clean up the socket when the component unmounts
      return () => {
        socket.removeAllListeners("playerData");
        socket.removeAllListeners("connect_error");
        socket.removeAllListeners("error");
        events.forEach((event: any) => {
          socket.removeAllListeners(event);
        });
      };
    }
  }, [socket, onPlayerData, events]);
};

