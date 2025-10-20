import React from "react";
import { RotateCcw } from "lucide-react";

const Title = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-sm mb-6 gap-4">

      {/* Score & Restart Section */}
      <div className="flex items-center gap-3 mx-10">
        <div className="bg-amber-100 border border-amber-300 text-stone-800 px-4 py-2 rounded-lg shadow-md font-bold text-lg">
          🧮 Score: <span className="text-orange-600">{score}</span>
        </div>

        <button
          onClick={onRestart}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5" />
          Restart
        </button>
      </div>
    </div>
  );
};

export default Title;
