import { useSelector, useDispatch } from "react-redux";
import { setBoard, replaceLetters } from "../slices/gameSlice";

const letterFrequency =
  "EEEEEEEEEEEEEEEEEEEAAAAAAAAAAIIIIIIIIINNNNNNNOOOOOOOOTTTTTTTRRRRRRSSSSSLLLLLCCCCCUUUUUDMMMMPHFFBBGYWKVJXQZ";

const randomLetter = () =>
  letterFrequency[Math.floor(Math.random() * letterFrequency.length)];

const useBoard = (size) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);

  const generateBoard = () => {
    const newBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => randomLetter())
    );
    dispatch(setBoard(newBoard));
  };

  const replaceSelectedLetters = (selectedLetters) => {
    const newBoard = [...board].map((row) => [...row]);
    for (const pos of selectedLetters) {
      newBoard[pos.row][pos.col] = randomLetter();
    }
    dispatch(replaceLetters(newBoard));
  };
  

  return { board, generateBoard, replaceSelectedLetters };
};

export default useBoard;