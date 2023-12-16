const f = require("fs");

const lines = f
  .readFileSync("data/16-data-small.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    return line;
  });

const energized = (map, { posX, posY }, { dirX, dirY }, energizedPositions) => {
  const { newX, newY } = { newx: posX + dirX, newY: posY + dirY };
  if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
    return { isInMap: false, amount: amount };
  }

  const newChar = map[newY][newX];
  if (newChar === ".") {
    if (
      energizedPositions.filter(
        (item) => item.posX === newX && item.posY === newY
      ).length === 0
    ) {
      energizedPositions.push({ posX: newX, posY: newY });
    }
    return {
      isInMap: true,
      amount: energized(
        map,
        { posX: newX, posY: newY },
        { dirX, dirY },
        energizedPositions
      ),
    };
  } else if (newChar === "#") {
    return { isInMap: true, amount: amount };
  } else if (newChar === "L") {
    return { isInMap: true, amount: 0 };
  }
};

const part1 = () => {
  lines.forEach((line) => console.log(line));
};

part1();
