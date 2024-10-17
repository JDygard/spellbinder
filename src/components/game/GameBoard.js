import React, { useState, useEffect } from "react";
import "../styles/GameBoard.css";
import useBoard from "../../hooks/useBoard";
import useSelectedLetters from "../../hooks/useSelectedLetters";
import { useSocket } from "../../utils/SocketContext";
import LetterTile from "./LetterTile";

const GameBoard = () => {
  const [inputValue, setInputValue] = useState("");
  const [wordIsValid, setWordIsValid] = useState(true);
  const { selectedLetters, handleInputChange } = useSelectedLetters();
  const { board, generateBoard, setTempSelectedLetters } = useBoard();
  const socket = useSocket();

  const submitWord = () => {
    if (!wordIsValid) return;

    if (inputValue === "") return;

    const submittedLetters = selectedLetters.map(
      (pos) => board[pos.row][pos.col]
    );
    console.log(submittedLetters)

    setTempSelectedLetters(selectedLetters);
    socket.emit("submitWord", { word: inputValue, letters: submittedLetters });
    setInputValue("");
  };

  const handleInputValueChange = (e) => {
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
      {board.map((row, rowIndex) => (
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
