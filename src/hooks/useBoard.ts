import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, replaceLetters, clearSelectedLetters } from "../store/slices/gameSlice";
import { useSocket } from "../utils/SocketContext";
import { RootState } from "../store/store";
import { SelectedLetter } from "../store/slices/gameSlice";

export interface Effect {
  type: string;
  duration: number;
}

export interface Letter {
  letter: string;
  key: number;
  effect: Effect;
}

interface UseBoardResult {
  board: Letter[][];
  generateBoard: () => void;
  replaceSelectedLetters: (selectedLetters: SelectedLetter[]) => void;
  setTempSelectedLetters: React.Dispatch<React.SetStateAction<SelectedLetter[]>>;
}

const useBoard = (): UseBoardResult | null => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);
  const [tempSelectedLetters, setTempSelectedLetters] = useState<SelectedLetter[]>([]);

  const socket = useSocket();
  
  const generateBoard = useCallback(() => {
    if (!socket) return;
    let size = 4;
    socket.emit("generateBoard", size);
  },[socket]);

  const replaceSelectedLetters = useCallback((selectedLetters: SelectedLetter[]) => {
    if (!socket) return;
    socket.emit("replaceSelectedLetters", { selectedLetters });
  }, [socket]);

  // Listen for events from the server
  useEffect(() => {
    if (socket) {
      socket.on("newBoard", (newBoard: Letter[][]) => {
        dispatch(setBoard(newBoard));
      });

      socket.on("updatedBoard", (updatedBoard: Letter[][]) => {
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