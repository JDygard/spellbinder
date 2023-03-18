import React, { useState, useEffect } from "react";
import "../styles/GameBoard.css";
import useBoard from "../hooks/useBoard";
import useSelectedLetters from "../hooks/useSelectedLetters";
import { letterRarity } from "./letterRarity";
import { useSelector, useDispatch } from "react-redux";
import {
  setBoard,
  setSelectedLetters,
  addSubmittedWord,
  clearSelectedLetters,
} from "../slices/gameSlice";
import socket from "../utils/socket";

const GameBoard = () => {
  const [inputValue, setInputValue] = useState("");
  const [wordIsValid, setWordIsValid] = useState(true);
  const { selectedLetters, handleInputChange } = useSelectedLetters();
  const {
    board,
    generateBoard,
    replaceSelectedLetters,
    setTempSelectedLetters,
  } = useBoard();
  const dispatch = useDispatch();

  const submitWord = () => {
    if (!wordIsValid) return;
  
    if (inputValue === "") return;
  
    console.log("Submitting word:", inputValue);
    socket.emit("submitWord", inputValue);
    // Save the selected letters in tempSelectedLetters
    setTempSelectedLetters(selectedLetters);
    // Clear the selected letters and input value
    dispatch(clearSelectedLetters());
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
  }, []);

  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`letter ${
                selectedLetters.some((pos) => pos.row === rowIndex && pos.col === colIndex)
                  ? "selected"
                  : ""
              }`}
            >
              {letter}
              <span className={`rarity-dot ${letterRarity(letter).color}`} />
            </div>
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
