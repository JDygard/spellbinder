import React, { useState, useEffect } from "react";
import "../../styles/GameBoard.css";
import useBoard, { Letter } from "../../hooks/useBoard";
import useSelectedLetters from "../../hooks/useSelectedLetters";
import { useSocket } from "../../utils/SocketContext";
import LetterTile from "./LetterTile";

const GameBoard = () => {
  const [inputValue, setInputValue] = useState("");
  const [wordIsValid, setWordIsValid] = useState(true);
  const { selectedLetters, handleInputChange } = useSelectedLetters();

  const boardHook = useBoard();
  const socket = useSocket();
  const { board, generateBoard, setTempSelectedLetters } = boardHook;

  
  const submitWord = () => {
    if (
      !wordIsValid || 
      !socket || 
      !boardHook || 
      inputValue === ""      
    ) return;

    const submittedLetters = selectedLetters.map(
      (pos) => board[pos.row][pos.col]
    );

    setTempSelectedLetters(selectedLetters);
    socket.emit("submitWord", { word: inputValue, letters: submittedLetters });
    setInputValue("");
  };

  const handleInputValueChange = (e: any) => {
    const newInputValue = e.target.value.toUpperCase();
    setInputValue(newInputValue);
    const valid = handleInputChange(newInputValue);
    setWordIsValid(valid);
  };

  useEffect(() => {
    generateBoard();
  }, [generateBoard]);

  return (
    <div className="game-board">
      {board.map((row: Letter[], rowIndex: number) => (
        <div key={rowIndex} className="row">
          {row.map(({ letter, key, effect }, colIndex) => (
            <LetterTile
              letter={letter}
              key={`${rowIndex}-${colIndex}`}
              effect={effect}
              rowIndex={rowIndex}
              colIndex={colIndex}
              selectedLetters={selectedLetters}
            />
          ))}
        </div>
      ))}
      <div
        className="current-word"
        style={{ color: wordIsValid ? "black" : "red" }}
      >
        <h3>Current Word: {inputValue}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitWord();
            }
          }}
        />
        <button onClick={submitWord}>Submit Word</button>
      </div>
    </div>
  );
};

export default GameBoard;
