import React from 'react';
import { letterRarity } from './letterRarity';

const LetterTile = ({ letter, key, effect, rowIndex, colIndex, selectedLetters }) => (
  <div
    key={`${rowIndex}-${colIndex}`}
    className={`letter ${selectedLetters.some(
      (pos) => pos.row === rowIndex && pos.col === colIndex
    )
      ? "selected"
      : ""
      } ${effect.type}`}
  >
    {letter}
    <span className={`rarity-dot ${letterRarity(letter).color}`} />
  </div>
);

export default LetterTile;
