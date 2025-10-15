import React from "react";

const CELL_COLORS = {
  0: "bg-stone-300",
  2: "bg-amber-100 text-stone-700",
  4: "bg-amber-200 text-stone-700",
  8: "bg-orange-400 text-white",
  16: "bg-orange-500 text-white",
  32: "bg-red-400 text-white",
  64: "bg-red-500 text-white",
  128: "bg-yellow-400 text-white",
  256: "bg-yellow-500 text-white",
  512: "bg-yellow-600 text-white",
  1024: "bg-yellow-700 text-white",
  2048: "bg-yellow-800 text-white",
};

const getCellColor = (value) => CELL_COLORS[value] || "bg-stone-800 text-white";

const Cell = ({ value, size = "w-20 h-20" }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-lg font-bold text-2xl ${size} ${getCellColor(
        value
      )}`}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Cell;
