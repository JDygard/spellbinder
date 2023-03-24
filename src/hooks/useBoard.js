import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, replaceLetters, addSubmittedWord, clearSelectedLetters } from "../slices/gameSlice";
import { useSocket } from "../utils/SocketContext";


const useBoard = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const selectedLetters = useSelector((state) => state.game.selectedLetters);
  const [tempSelectedLetters, setTempSelectedLetters] = useState([]);

  const socket = useSocket();

  const generateBoard = useCallback(() => {
    let size = 4;
    socket.emit("generateBoard", size);
  },[socket]);

  const replaceSelectedLetters = useCallback((selectedLetters) => {
    socket.emit("replaceSelectedLetters", { selectedLetters });
  }, [socket]);

  // Listen for events from the server
  useEffect(() => {
    if (socket) {
      socket.on("newBoard", (newBoard) => {
        dispatch(setBoard(newBoard));
      });

      socket.on("updatedBoard", (updatedBoard) => {
        dispatch(replaceLetters(updatedBoard));
      });

      socket.on("wordAccepted", (word) => {
        dispatch(addSubmittedWord(word));
        dispatch(clearSelectedLetters());
        replaceSelectedLetters(tempSelectedLetters);
        setTempSelectedLetters([]);
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
