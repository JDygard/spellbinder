import React from 'react';
import { useSelector } from 'react-redux';
import { letterRarity } from "./letterRarity";

const SubmittedWordsList = () => {
  const submittedWords = useSelector((state) => state.game.submittedWords);

  const wordValue = (word) => {
    return word.split('').reduce((acc, letter) => {
      return acc + letterRarity(letter).value;
    }, 0);
  };

  return (
    <div className="submitted-words-list">
      <h2>Submitted Words</h2>
      <ul>
        {submittedWords.map((word, index) => (
          <li key={index} style={{ display:"flex", justifyContent: "space-around" }}>
            {word} - {wordValue(word)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedWordsList;
