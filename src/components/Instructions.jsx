import { useState } from "react";

export default function Instructions() {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
      >
        {show ? "Hide Instructions" : "How to Play"}
      </button>

      {show && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-2 text-center">🎮 2048 Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Use <span className="font-semibold">Arrow keys</span> or <span className="font-semibold">Swipe</span> to move tiles.</li>
            <li>Combine tiles with the same number to create bigger numbers.</li>
            <li>Reach <span className="font-bold">2048</span> to win the game.</li>
            <li>The game ends when no moves are left.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
