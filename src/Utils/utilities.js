import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to check if 2048 has been reached
export const check2048 = (data, winner, setWinner) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] === 2048 && !winner) {
        toast.success("Way to Go, Champ!");
        setWinner(true);
      }
    }
  }
};

// Function to calculate score
export const calculate = (data, setScore, bestScore, setBestScore) => {
  let value = 0;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) 
      if (data[i][j] > 2) value += data[i][j] * 4;
  setScore(value);

  if (value > bestScore) {
    setBestScore(value);
    localStorage.setItem("Best", JSON.stringify(bestScore));
  }
};
