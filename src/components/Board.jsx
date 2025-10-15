import React from "react";
import Cell from "./Cell";

const Board = ({ grid }) => {
  return (
    <>
      <div className="grid grid-rows-4 grid-cols-4 gap-3 bg-stone-400 p-3 rounded-xl shadow-md">
        {grid.map((row, i) =>
          row.map((value, j) => <Cell key={`${i}-${j}`} value={value} />)
        )}
      </div>
    </>
  );
};

export default Board;
