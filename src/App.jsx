import { useCallback, useState, useEffect, useRef } from "react";
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

// Import audio files
import bgMusicFile from "./assets/audio/bg-music.mp3";
import moveSoundFile from "./assets/audio/move.mp3";
import winSoundFile from "./assets/audio/win.mp3";
import gameOverSoundFile from "./assets/audio/gameover.mp3";
import Instructions from "./components/Instructions";

function App() {
  const [grid, setGrid] = useState(generateInitialGrid());
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Audio refs
  const bgMusicRef = useRef(new Audio(bgMusicFile));
  const moveSoundRef = useRef(new Audio(moveSoundFile));
  const winSoundRef = useRef(new Audio(winSoundFile));
  const gameOverSoundRef = useRef(new Audio(gameOverSoundFile));

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    setHighScores(savedScores);

    // Loop background music
    bgMusicRef.current.loop = true;
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

  const handleMove = useCallback(
    (direction) => {
      if (!gameStarted || win || gameOver) return;

      setGrid((prevGrid) => {
        const { newGrid, score: gainedScore } = moveGrid(prevGrid, direction);

        // Play move sound if grid changed
        if (JSON.stringify(prevGrid) !== JSON.stringify(newGrid)) {
          moveSoundRef.current.play().catch(() => {});
        }

        setScore((prev) => prev + gainedScore);
        if (checkWin(newGrid)) {
          setWin(true);
          winSoundRef.current.play().catch(() => {});
        }
        if (checkGameOver(newGrid)) {
          setGameOver(true);
          gameOverSoundRef.current.play().catch(() => {});
        }
        return newGrid;
      });
    },
    [win, gameOver, gameStarted]
  );

  const handleKey = useCallback(
    (e) => {
      const directionMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const direction = directionMap[e.key];
      if (direction) handleMove(direction);
    },
    [handleMove]
  );

  useKeyboard(handleKey);
  useSwipe(handleMove);

  const restartGame = () => {
    setGrid(generateInitialGrid());
    setScore(0);
    setWin(false);
    setGameOver(false);
    setGameStarted(true);

    // Play background music
    bgMusicRef.current.play().catch(() => {});
  };

  const goToStartScreen = () => {
    setGameStarted(false);
    setScore(0);
    setWin(false);
    setGameOver(false);

    // Pause background music
    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 p-6">
      {!gameStarted ? (
        // Start Screen
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-6 tracking-wide drop-shadow-md flex items-center justify-center gap-2">
            🎮 <span className="text-amber-700">2048</span>⚡
          </h1>
          <button
            onClick={() => restartGame()}
            className="px-6 py-3 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-700"
          >
            Start Game
          </button>

          <Instructions />
          
          <div className="mt-8 w-full max-w-xs mx-auto">
            <h2 className="text-xl font-semibold mb-2 text-gray-700 text-center">
              🏆 High Scores
            </h2>
            <ul className="text-gray-600">
              {highScores.length > 0 ? (
                highScores.map((s, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center gap-2 py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:scale-105 transition-transform duration-200 break-words"
                  >
                    <span className="font-bold">#{i + 1}</span>
                    <span className="font-semibold">{s}</span>
                  </li>
                ))
              ) : (
                <p className="text-center">
                  No scores yet. Play your first game!
                </p>
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
              🏆High Scores
            </h2>
            <ul className="text-gray-600">
              {highScores.length > 0 ? (
                highScores.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    <span className="font-bold text-lg">#{i + 1}</span>
                    <span className="font-semibold text-lg">{s}</span>
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
          <Title score={score} onRestart={restartGame} />
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
