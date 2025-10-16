import React from "react";

const Title = ({ score }) => (
  <div className="flex items-center justify-between w-full max-w-sm mb-6">
    <h1 className="text-4xl font-bold text-stone-700">Game 2048</h1>
    <div className="bg-stone-200 px-4 py-2 rounded shadow font-bold">
      Score: {score}
    </div>
  </div>
);

export default Title;
