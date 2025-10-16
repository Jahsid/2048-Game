import React from "react";

const GameOverlay = ({ win, gameOver, onRestart }) => {
  if (!win && !gameOver) return null;

  const message = win ? "You Win!" : "Game Over";
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">{message}</h2>
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded shadow"
          onClick={onRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverlay;
