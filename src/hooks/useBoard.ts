import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, replaceLetters, clearSelectedLetters } from "../store/slices/gameSlice";
import { useSocket } from "../utils/SocketContext";
import { RootState } from "../store/store";

export interface Letter {
  letter: string;
  key: number;
  effect: {};
}

interface Board {
  board: Letter[];
}

const useBoard = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);
  const [tempSelectedLetters, setTempSelectedLetters] = useState([]);

  const socket = useSocket();

  const generateBoard = useCallback(() => {
    let size = 4;
    socket.emit("generateBoard", size);
  },[socket]);

  const replaceSelectedLetters = useCallback((selectedLetters: string[]) => {
    socket.emit("replaceSelectedLetters", { selectedLetters });
  }, [socket]);

  // Listen for events from the server
  useEffect(() => {
    if (socket) {
      socket.on("newBoard", (newBoard: Board) => {
        dispatch(setBoard(newBoard));
      });

      socket.on("updatedBoard", (updatedBoard: Board) => {
        dispatch(replaceLetters(updatedBoard));
      });

      socket.on("wordAccepted", () => {
        dispatch(clearSelectedLetters());
        replaceSelectedLetters(tempSelectedLetters);
        setTempSelectedLetters([]);
      });

      socket.on("wordRejected", () => {
        dispatch(clearSelectedLetters());
      });

      return () => {
        socket.off("newBoard");
        socket.off("updatedBoard");
        socket.off("wordAccepted");
      };
    }
  }, [dispatch, tempSelectedLetters, replaceSelectedLetters, socket]);

  return { board, generateBoard, replaceSelectedLetters, setTempSelectedLetters };
};

export default useBoard;