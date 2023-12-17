const { dir } = require("console");
const f = require("fs");

const lines = f
  .readFileSync("data/16-data-small.txt", "utf-8")
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
  // console.log(list1);
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
  // console.log(energizedPositions.length);

  let newX = posX;
  let newY = posY;

  // if (!insideMap({ x: newX, y: newY })) {
  //   return energizedPositions;
  // }

  let newChar = map[newY][newX];

  while (true) {
    newX += dirX;
    newY += dirY;
    newChar = map[newY][newX];
    if (!insideMap({ x: newX, y: newY })) {
      return energizedPositions;
    }
    if (!isInArray({ x: newX, y: newY }, energizedPositions)) {
      energizedPositions.push({
        x: newX,
        y: newY,
      });
    }
    if (charNeedsRecursion(newChar, dirX, dirY)) {
      break;
    }

    if (newChar === ".") {
      continue;
    }
    if (newChar === "\\") {
      let newDirX = 0;
      let newDirY = 0;
      if (dirY === -1) newDirX = -1;
      else if (dirY === 1) newDirX = 1;
      if (dirX === 1) newDirY = 1; // going right (x>0) // go up (y<0)
      else if (dirX === -1) newDirY = -1; // going left (x<0) // go down (y>0)
      dirX = newDirX;
      dirY = newDirY;
    }

    if (newChar === "/") {
      let newDirX = 0;
      let newDirY = 0;
      if (dirY === 1) newDirX = -1; // going down (y>0) // // go left (x<0)
      else if (dirY === -1) newDirX = 1; // going up // (y<0) // go right (x>0)
      if (dirX === 1) newDirY = -1; // going right (x>0) // // go up (y<0)
      else if (dirX === -1) newDirY = 1; // going left // (x<0) // go down (y>0)
      dirX = newDirX;
      dirY = newDirY;
    }
  }

  /*else {
    return energized(map, { posX: newX, posY: newY }, { dirX, dirY }, [
      ...energizedPositions,
    ]);
  }*/

  //console.log(newY, newX, energizedPositions.length);

  // const newChar = map[newY][newX];

  if (newChar === "-" && dirX === 0 && !isInArray) {
    const left = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: -1, dirY: 0 },
      [...energizedPositions]
    );
    const right = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: 1, dirY: 0 },
      [...energizedPositions]
    );
    energizedPositions = combineLists({ list1: left, list2: right });
    if (left.inside || right.inside) console.log("PROBLEMinside");

    return energizedPositions;
  }

  if (newChar === "|" && dirY === 0 && !isInArray) {
    const up = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: 0, dirY: -1 },
      [...energizedPositions]
    );
    const down = energized(
      map,
      { posX: newX, posY: newY },
      { dirX: 0, dirY: 1 },
      [...energizedPositions]
    );

    energizedPositions = combineLists({ list1: up, list2: down });

    if (up.inside || down.inside) console.log("PROBLEMinside");
    return energizedPositions;
  }

  // console.log("when do we get here?");
  return energized(
    map,
    { posX: newX, posY: newY },
    { dirX, dirY },
    energizedPositions
  );
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

  console.log(energiz);
  console.log(energiz.length);

  let energiz2 = lines.map((line) => [...line]);
  energiz.forEach((pos) => {
    energiz2[pos.y][pos.x] = "#";
  });
  energiz2.forEach((line) => console.log(line.join("")));
};

part1();
