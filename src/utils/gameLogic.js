export const generateInitialGrid = () => {
  const grid = Array(4).fill().map(() => Array(4).fill(0));
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

export const addRandomTile = (grid) => {
  const empty = [];
  grid.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) empty.push([i, j]);
    })
  );
  if (empty.length === 0) return grid;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  return grid;
};

const moveRowLeft = (row) => {
  const filtered = row.filter((val) => val !== 0);
  const merged = [];
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  while (merged.length < 4) merged.push(0);
  return merged;
};

const transpose = (grid) => grid[0].map((_, i) => grid.map((row) => row[i]));

const reverseGrid = (grid) => grid.map((row) => [...row].reverse());

export const moveGrid = (grid, direction) => {
  let newGrid = JSON.parse(JSON.stringify(grid));

  switch (direction) {
    case "left":
      newGrid = newGrid.map(moveRowLeft);
      break;
    case "right":
      newGrid = reverseGrid(newGrid).map(moveRowLeft);
      newGrid = reverseGrid(newGrid);
      break;
    case "up":
      newGrid = transpose(newGrid).map(moveRowLeft);
      newGrid = transpose(newGrid);
      break;
    case "down":
      newGrid = transpose(reverseGrid(newGrid))
        .map(moveRowLeft);
      newGrid = reverseGrid(transpose(newGrid));
      break;
    default:
      break;
  }

  if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
    addRandomTile(newGrid);
  }

  return newGrid;
};
