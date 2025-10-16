export const generateInitialGrid = () => {
  let grid = Array(4)
    .fill()
    .map(() => Array(4).fill(0));

  grid = addRandomTile(grid);
  grid = addRandomTile(grid);

  return grid;
};

export const addRandomTile = (grid) => {
  const emptyCells = [];
  grid.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) emptyCells.push([i, j]);
    })
  );

  if (emptyCells.length === 0) return grid;

  const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const newGrid = grid.map((row) => [...row]);
  newGrid[i][j] = Math.random() < 0.9 ? 2 : 4;

  return newGrid;
};

const moveRowLeft = (row) => {
  const filtered = row.filter((val) => val !== 0);
  const merged = [];
  let score = 0;
  let skip = false;

  for (let i = 0; i < filtered.length; i++) {
    if (skip) {
      skip = false;
      continue;
    }
    if (filtered[i] === filtered[i + 1]) {
      const newVal = filtered[i] * 2;
      merged.push(newVal);
      score += newVal;
      skip = true;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < row.length) merged.push(0);

  return { row: merged, score };
};

const transpose = (grid) => grid[0].map((_, i) => grid.map((row) => row[i]));

const reverseGrid = (grid) => grid.map((row) => [...row].reverse());

const gridsAreEqual = (a, b) =>
  a.every((row, i) => row.every((val, j) => val === b[i][j]));

export const moveGrid = (grid, direction) => {
  let newGrid = grid.map((row) => [...row]);
  let totalScore = 0;

  const processGrid = (g) =>
    g.map((row) => {
      const { row: newRow, score } = moveRowLeft(row);
      totalScore += score;
      return newRow;
    });

  switch (direction) {
    case "left":
      newGrid = processGrid(newGrid);
      break;

    case "right":
      newGrid = reverseGrid(processGrid(reverseGrid(newGrid)));
      break;

    case "up":
      newGrid = transpose(processGrid(transpose(newGrid)));
      break;

    case "down":
      newGrid = transpose(reverseGrid(processGrid(reverseGrid(transpose(newGrid)))));
      break;

    default:
      break;
  }

  if (!gridsAreEqual(newGrid, grid)) {
    newGrid = addRandomTile(newGrid);
  }

  return { newGrid, score: totalScore };
};

export const checkWin = (grid) => grid.some((row) => row.includes(2048));

export const checkGameOver = (grid) => {
  const size = grid.length;

  for (let i = 0; i < size; i++) {
    if (grid[i].includes(0)) return false;
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (j < size - 1 && grid[i][j] === grid[i][j + 1]) return false;
      if (i < size - 1 && grid[i][j] === grid[i + 1][j]) return false;
    }
  }

  return true;
};
