import React from 'react';
import { letterRarity } from '../helpers/letterRarity';

const LetterTile = ({ letter, effect, rowIndex, colIndex, selectedLetters }) => (
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
    {effect.duration > 0 && (
      <span className="effect-duration">{effect.duration}</span>
    )}
    <span className={`rarity-dot ${letterRarity(letter).color}`} />
  </div>
);

export default LetterTile;
