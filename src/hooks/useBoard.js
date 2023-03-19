import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, replaceLetters, addSubmittedWord } from "../slices/gameSlice";
import { getSocket } from "../utils/socket";

const useBoard = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const [tempSelectedLetters, setTempSelectedLetters] = useState([]);

  const generateBoard = () => {
    let size = 4;
    getSocket().emit("generateBoard", size);
  };

  const replaceSelectedLetters = (selectedLetters) => {
    getSocket().emit("replaceSelectedLetters", { board, selectedLetters });
  };

  // Listen for events from the server
  useEffect(() => {
    const handleWordAccepted = (acceptedWord) => {
      dispatch(addSubmittedWord(acceptedWord));
      replaceSelectedLetters(tempSelectedLetters);
      setTempSelectedLetters([]); // Clear tempSelectedLetters
    };

    const socket = getSocket();
    socket.on("wordAccepted", handleWordAccepted);
    socket.on("newBoard", (newBoard) => {
      dispatch(setBoard(newBoard));
    });
    socket.on("updatedBoard", (updatedBoard) => {
      dispatch(replaceLetters(updatedBoard));
    });

    return () => {
      socket.off("newBoard");
      socket.off("updatedBoard");
      socket.off("wordAccepted", handleWordAccepted);
    };
  }, [dispatch, tempSelectedLetters, replaceSelectedLetters]);

  return { board, generateBoard, replaceSelectedLetters, setTempSelectedLetters };
};

export default useBoard;
