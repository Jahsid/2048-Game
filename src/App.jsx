import { useCallback, useState, useEffect } from "react";
import {
  checkGameOver,
  checkWin,
  generateInitialGrid,
  moveGrid,
} from "./utils/gameLogic";
import Board from "./components/Board";
import { useKeyboard } from "./hooks/useKeyboard";
import { useSwipe } from "./hooks/useSwipe";
import GameOverlay from "./components/GameOverlay";
import Title from "./components/Title";

function App() {
  const [grid, setGrid] = useState(generateInitialGrid());
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    setHighScores(savedScores);
  }, []);

  useEffect(() => {
    if (gameOver || win) {
      const updatedScores = [...highScores, score]
        .sort((a, b) => b - a)
        .slice(0, 5);
      setHighScores(updatedScores);
      localStorage.setItem("highScores", JSON.stringify(updatedScores));
    }
  }, [gameOver, win]);

  const handleKey = useCallback(
    (e) => {
      if (!gameStarted || win || gameOver) return;

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
    [win, gameOver, gameStarted]
  );

  useKeyboard(handleKey);
  useSwipe((direction) => {
    if (!gameStarted || win || gameOver) return;

    setGrid((prevGrid) => {
      const { newGrid, score: gainedScore } = moveGrid(prevGrid, direction);
      setScore((prev) => prev + gainedScore);
      if (checkWin(newGrid)) setWin(true);
      if (checkGameOver(newGrid)) setGameOver(true);
      return newGrid;
    });
  });

  const restartGame = () => {
    setGrid(generateInitialGrid());
    setScore(0);
    setWin(false);
    setGameOver(false);
    setGameStarted(true);
  };

  const goToStartScreen = () => {
    setGameStarted(false);
    setScore(0);
    setWin(false);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-6">
      {!gameStarted ? (
        // Start Screen
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">2048verse</h1>
          <button
            onClick={() => setGameStarted(true)}
            className="px-6 py-3 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700"
          >
            Start Game
          </button>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              🏆 High Scores
            </h2>
            <ul className="text-gray-600">
              {highScores.length > 0 ? (
                highScores.map((s, i) => (
                  <li key={i}>
                    #{i + 1} — <span className="font-semibold">{s}</span>
                  </li>
                ))
              ) : (
                <p>No scores yet. Play your first game!</p>
              )}
            </ul>
          </div>
        </div>
      ) : gameOver ? (
        // Game Over Screen
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Game Over 💀</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your Score: <span className="font-semibold">{score}</span>
          </p>

          <button
            onClick={restartGame}
            className="px-6 py-3 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700 mr-3"
          >
            Try Again
          </button>

          <button
            onClick={goToStartScreen}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow-md hover:bg-gray-600"
          >
            Home
          </button>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              🏆 High Scores
            </h2>
            <ul className="text-gray-600">
              {highScores.length > 0 ? (
                highScores.map((s, i) => (
                  <li key={i}>
                    #{i + 1} — <span className="font-semibold">{s}</span>
                  </li>
                ))
              ) : (
                <p>No high scores yet</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        // Game Screen
        <>
          <Title score={score} />
          <Board grid={grid} />
          <GameOverlay win={win} gameOver={gameOver} onRestart={restartGame} />
          <p className="mt-6 text-gray-600 text-sm">
            Combine tiles to reach <span className="font-semibold">2048!</span>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
