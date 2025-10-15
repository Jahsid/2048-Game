import { useCallback, useState } from "react";
import { generateInitialGrid, moveGrid } from "./utils/gameLogic";
import Board from "./components/Board";
import { useKeyboard } from "./hooks/useKeyboard";

function App() {
  const [grid, setGrid] = useState(generateInitialGrid());

  const handleKey = useCallback((e) => {
    const directionMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    const direction = directionMap[e.key];
    if (!direction) return;

    setGrid((prevGrid) => moveGrid(prevGrid, direction));
  }, []);

  useKeyboard(handleKey);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-6">
        <h1 className="text-4xl font-bold text-stone-700 mb-6">Game 2048</h1>

        <Board grid={grid} />

        <p className="mt-6 text-gray-600 text-sm">
          Combine tiles to reach <span className="font-semibold">2048!</span>
        </p>
      </div>
    </>
  );
}

export default App;
