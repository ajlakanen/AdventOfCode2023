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

const combineLists = (list1, list2) => {
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

const energized = (map, { posX, posY }, { dirX, dirY }, energizedPositions) => {
  // console.log(energizedPositions.length);

  const newX = posX + dirX;
  const newY = posY + dirY;

  if (!insideMap({ x: newX, y: newY })) {
    return { inside: false, energizedPositions: [...energizedPositions] };
  }

  const isInArray = inArray({ x: newX, y: newY }, energizedPositions);
  if (!isInArray) {
    energizedPositions.push({
      x: newX,
      y: newY,
    });
  } /*else {
    return energized(map, { posX: newX, posY: newY }, { dirX, dirY }, [
      ...energizedPositions,
    ]);
  }*/

  //console.log(newY, newX, energizedPositions.length);

  const newChar = map[newY][newX];
  if (newChar === ".") {
    return energized(map, { posX: newX, posY: newY }, { dirX, dirY }, [
      ...energizedPositions,
    ]);
  }

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
    energizedPositions = combineLists(
      [...left.energizedPositions],
      [...right.energizedPositions]
    );
    if (left.inside || right.inside) console.log("PROBLEMinside");

    return {
      inside: left.inside || right.inside,
      energizedPositions: [...energizedPositions],
    };
  }

  if (newChar === "\\") {
    let newDirX = 0;
    let newDirY = 0;
    if (dirY === -1) newDirX = -1;
    else if (dirY === 1) newDirX = 1;
    if (dirX === 1) newDirY = 1; // going right (x>0) // go up (y<0)
    else if (dirX === -1) newDirY = -1; // going left (x<0) // go down (y>0)
    return energized(
      map,
      { posX: newX, posY: newY },
      { dirX: newDirX, dirY: newDirY },
      [...energizedPositions]
    );
  }

  if (newChar === "/") {
    //console.log("slash", posY, posX, newY, newX, dirY, dirX);
    let newDirX = 0;
    let newDirY = 0;
    if (dirY === 1) newDirX = -1; // going down (y>0) // // go left (x<0)
    else if (dirY === -1) newDirX = 1; // going up // (y<0) // go right (x>0)
    if (dirX === 1) newDirY = -1; // going right (x>0) // // go up (y<0)
    else if (dirX === -1) newDirY = 1; // going left // (x<0) // go down (y>0)

    return energized(
      map,
      { posX: newX, posY: newY },
      { dirX: newDirX, dirY: newDirY },
      [...energizedPositions]
    );
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
    energizedPositions = combineLists(
      [...up.energizedPositions],
      [...down.energizedPositions]
    );

    if (up.inside || down.inside) console.log("PROBLEMinside");
    return {
      inside: up.inside || down.inside,
      energizedPositions: [...energizedPositions],
    };
  }
  return energized(map, { posX: newX, posY: newY }, { dirX, dirY }, [
    ...energizedPositions,
  ]);
  // return { inside: false, energizedPositions };
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
  console.log(energiz.energizedPositions.length);

  let energiz2 = lines.map((line) => [...line]);
  energiz.energizedPositions.forEach((pos) => {
    energiz2[pos.y][pos.x] = "#";
  });
  energiz2.forEach((line) => console.log(line.join("")));
};

part1();
