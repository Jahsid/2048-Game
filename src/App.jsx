import { useCallback, useState } from "react";
import { checkGameOver, checkWin, generateInitialGrid, moveGrid } from "./utils/gameLogic";
import Board from "./components/Board";
import { useKeyboard } from "./hooks/useKeyboard";
import GameOverlay from "./components/GameOverlay";
import Title from "./components/Title";

function App() {
  const [grid, setGrid] = useState(generateInitialGrid());
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleKey = useCallback(
    (e) => {
      if (win || gameOver) return;

      const directionMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const direction = directionMap[e.key];
      if (!direction) return;

      setGrid((prevGrid) => {
        const { newGrid, score: gainedScore } = moveGrid(prevGrid, direction);

        setScore((prev) => prev + gainedScore);
        if (checkWin(newGrid)) setWin(true);
        if (checkGameOver(newGrid)) setGameOver(true);

        return newGrid;
      });
    },
    [win, gameOver]
  );

  useKeyboard(handleKey);

  const restartGame = () => {
    setGrid(generateInitialGrid());
    setScore(0);
    setWin(false);
    setGameOver(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-6">
        <Title score={score} />
        <Board grid={grid} />
        <GameOverlay win={win} gameOver={gameOver} onRestart={restartGame} />
        <p className="mt-6 text-gray-600 text-sm">
          Combine tiles to reach <span className="font-semibold">2048!</span>
        </p>
      </div>
    </>
  );
}

export default App;
