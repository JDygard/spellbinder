import { useSelector, useDispatch } from "react-redux";
import { setSelectedLetters as setReduxSelectedLetters } from "../slices/gameSlice";

const useSelectedLetters = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const selectedLetters = useSelector((state) => state.game.selectedLetters);

  const findValidLetterOnBoard = (letter, visited) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (
          board[row][col].letter === letter &&
          !visited.some((pos) => pos.row === row && pos.col === col)
        ) {
          return { row, col, key: board[row][col].key };
        }
      }
    }
    return null;
  };

  const handleInputChange = (inputValue) => {
    const newSelectedLetters = [];
    const visited = [];
    let valid = true;

    for (const letter of inputValue) {
      const pos = findValidLetterOnBoard(letter, visited);
      if (pos) {
        visited.push(pos);
        newSelectedLetters.push(pos);
      } else {
        valid = false;
        break;
      }
    }

    dispatch(setReduxSelectedLetters(newSelectedLetters));
    return valid;
  };

  return { selectedLetters, handleInputChange };
};

export default useSelectedLetters;
