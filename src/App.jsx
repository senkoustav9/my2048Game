// React in-built hooks
import { useEffect, useState } from "react";

// Module for deep cloning
import cloneDeep from "lodash.clonedeep";

// Block Component
import Block from "./Block/Block";

// Utilities: Custom Hook
import { useEvent } from "./Utils/customHook";

// React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility functions
import { check2048, calculate } from "./Utils/utilities";

// Events
import { swipeDown } from "./Events/swipeDown";
import { swipeUp } from "./Events/swipeUp";
import { swipeLeft } from "./Events/swipeLeft";
import { swipeRight } from "./Events/swipeRight";

//CSS File
import "./App.css";

function App() {
  
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  let oldBestScore = JSON.parse(localStorage.getItem("Best")) || 0;

  const [bestScore, setBestScore] = useState(oldBestScore);
  const [score, setScore] = useState(0);

  const [winner, setWinner] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const Left_ARROW = 37;
  const Up_ARROW = 38;
  const Right_ARROW = 39;
  const Down_ARROW = 40;

  // Function to initialise the matrix
  const initialise = () => {
    let newGrid = cloneDeep(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  // Function to add 2 or 4 to the matrix
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) break;

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;

      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }

      if (attempts > 50) {
        gridFull = true;
        let gameOverr = checkGameOver();
        if (gameOverr) {
          setGameOver(true);
          toast.error("Game Over");
        }
      }
    }
  };

  // Function to check if game is over
  const checkGameOver = () => {
    let checker = swipeLeft(data, setData, addNumber, true);
    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }
    let checker2 = swipeDown(data, setData, addNumber, true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }
    let checker3 = swipeRight(data, setData, addNumber, true);
    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }
    let checker4 = swipeUp(data, setData, addNumber, true);
    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }
    return true;
  };

  // Function to reset game
  const resetGame = () => {
    setScore(0);
    setWinner(false);
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  useEffect(() => {
    initialise();
  }, []);

  // Function to handle the events
  const handleKeyDown = (event) => {
    if (gameOver) return;

    switch (event.keyCode) {
      case Up_ARROW:
        swipeUp(data, setData, addNumber, false);
        break;
      case Down_ARROW:
        swipeDown(data, setData, addNumber, false);
        break;
      case Left_ARROW:
        swipeLeft(data, setData, addNumber, false);
        break;
      case Right_ARROW:
        swipeRight(data, setData, addNumber, false);
        break;
      default:
        break;
    }
    check2048(data, winner, setWinner);
    calculate(data, setScore, bestScore, setBestScore);

    if (checkGameOver()) {
      toast.error("Game Over");
      setGameOver(true);
    }
  };

  useEvent("keydown", handleKeyDown);

  return (
    <div className="App">
      <ToastContainer />
      <div className="DetailBox">
        <div className="Details">
          <div className="BestScoreBox">Best: {bestScore}</div>
          <div className="Heading">
{/*             <p className="p1">my</p> */}
            <p className="p2">2048</p>
          </div>
        </div>
        <div className="Details">
          <div className="ScoreBox">Score: {score}</div>
          <div className="Button" onClick={resetGame}>
            New Game
          </div>
        </div>
      </div>
      <div className="BlockSet">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="RowSet">
            {row.map((num, index) => (
              <Block num={num} key={index} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
