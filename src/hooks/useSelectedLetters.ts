import { useSelector, useDispatch } from "react-redux";
import { setSelectedLetters as setReduxSelectedLetters } from "../store/slices/gameSlice";
import { RootState } from "../store/store";

interface Visited {
  row: number;
  col: number;
}

const useSelectedLetters = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);
  const selectedLetters = useSelector((state: RootState) => state.game.selectedLetters);

  const findValidLetterOnBoard = (letter: string, visited: Visited[]) => {
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

  const handleInputChange = (inputValue: string) => {
    const newSelectedLetters = [];
    const visited: Visited[] = [];
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
