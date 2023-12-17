const f = require("fs");

const lines = f
  .readFileSync("data/16-data.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    return line;
  });

const insideMap = ({ x, y }) => {
  return x >= 0 && x < lines[0].length && y >= 0 && y < lines.length;
};

const inArray = ({ x, y }, arr) => {
  return arr.filter((item) => item.x === x && item.y === y).length > 0;
};

const combineLists = ({ list1, list2 }) => {
  const combined = [];
  list1.forEach((item) => {
    if (!inArray(item, combined)) {
      combined.push(item);
    }
  });
  list2.forEach((item) => {
    if (!inArray(item, combined)) {
      combined.push(item);
    }
  });
  return combined;
};

const charNeedsRecursion = (char, dirX, dirY) => {
  if (char === "-" && dirX === 0) return true;
  if (char === "|" && dirY === 0) return true;
  return false;
};

const energized = (map, { posX, posY }, { dirX, dirY }, energizedPositions) => {
  let newX = posX;
  let newY = posY;

  let newChar = "";

  while (true) {
    newX += dirX;
    newY += dirY;
    if (!insideMap({ x: newX, y: newY })) {
      return energizedPositions;
    }
    newChar = map[newY][newX];
    if (charNeedsRecursion(newChar, dirX, dirY)) {
      break;
    }

    if (!inArray({ x: newX, y: newY }, energizedPositions)) {
      energizedPositions.push({
        x: newX,
        y: newY,
      });
    }

    if (newChar === ".") continue;

    if (newChar === "\\") {
      const newDirX = dirY === -1 ? -1 : dirY === 1 ? 1 : 0;
      const newDirY = dirX === 1 ? 1 : dirX === -1 ? -1 : 0;
      dirX = newDirX;
      dirY = newDirY;
    }

    if (newChar === "/") {
      const newDirX = dirY === 1 ? -1 : dirY === -1 ? 1 : 0;
      const newDirY = dirX === 1 ? -1 : dirX === -1 ? 1 : 0;
      dirX = newDirX;
      dirY = newDirY;
    }
  }

  const isInArray = inArray({ x: newX, y: newY }, energizedPositions);

  if (!isInArray) {
    energizedPositions.push({
      x: newX,
      y: newY,
    });
  }

  if (newChar === "-" && dirX === 0 && !isInArray) {
    const left = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: -1, dirY: 0 },
      energizedPositions
    );
    const right = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: 1, dirY: 0 },
      energizedPositions
    );
    return combineLists({ list1: left, list2: right });
  }

  if (newChar === "|" && dirY === 0 && !isInArray) {
    const up = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: 0, dirY: -1 },
      energizedPositions
    );
    const down = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: 0, dirY: 1 },
      energizedPositions
    );

    return combineLists({ list1: up, list2: down });
  }
  return energizedPositions;
};

const part1 = () => {
  const energizedPositions = [];
  const energiz = energized(
    lines,
    { posX: -1, posY: 0 },
    { dirX: 1, dirY: 0 },
    [...energizedPositions]
  );

  console.log(energiz.length);
};

const part2 = () => {
  let map = [];
  // top row
  for (let i = 0; i < lines[0].length; i++) {
    const energizedPositions = [];
    const energiz = energized(
      lines,
      { posX: i, posY: -1 },
      { dirX: 0, dirY: 1 },
      [...energizedPositions]
    );
    console.log(energiz.length);
    map.push({ x: i, y: -1, energized: energiz.length });
  }

  // bottom row
  for (let i = 0; i < lines[0].length; i++) {
    const energizedPositions = [];
    const energiz = energized(
      lines,
      { posX: i, posY: lines.length },
      { dirX: 0, dirY: -1 },
      [...energizedPositions]
    );
    console.log(energiz.length);
    map.push({ x: i, y: lines.length, energized: energiz.length });
  }

  // from left to right
  for (let i = 0; i < lines.length; i++) {
    const energizedPositions = [];
    const energiz = energized(
      lines,
      { posX: -1, posY: i },
      { dirX: 1, dirY: 0 },
      [...energizedPositions]
    );
    console.log(energiz.length);
    map.push({ x: -1, y: i, energized: energiz.length });
  }

  // from right to left
  for (let i = 0; i < lines.length; i++) {
    const energizedPositions = [];
    const energiz = energized(
      lines,
      { posX: lines[0].length, posY: i },
      { dirX: -1, dirY: 0 },
      [...energizedPositions]
    );
    console.log(energiz.length);
    map.push({ x: lines[0].length, y: i, energized: energiz.length });
  }

  map
    .sort((a, b) => {
      return a.energized - b.energized;
    })
    .map((row) => {
      console.log(row);
    });
};

part1();
part2();
