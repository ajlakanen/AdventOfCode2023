const f = require("fs");

const lines = f
  .readFileSync("data/14-data.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    return line;
  });

const tilt = (lines, direction = { x: 0, y: 1 }) => {
  // Go through each column
  let tilted = Array(lines[0].length).fill("");
  let x = 0;
  while (x < lines[0].length) {
    // Go through each row
    const column = lines
      .map((line) => line[x])
      .join("")
      .split("#")
      .map((group) => {
        const count = group.split("O").length - 1;
        return "O".repeat(count) + ".".repeat(group.length - count);
      })
      .join("#");

    tilted.map((line, i) => {
      tilted[i] += column[i];
    });
    x++;
  }
  return tilted;
};

const calculateLoad = (tilted) => {
  let load = 0;
  for (let i = 0; i < tilted.length; i++) {
    for (let j = 0; j < tilted[i].length; j++) {
      if (tilted[i][j] === "O") load += tilted.length - i;
    }
  }
  return load;
};

const part1 = () => {
  // prettier-ignore
  const initial = [
    "O....#....",
    "O.OO#....#",
    ".....##...",
    "OO.#O....O",
    ".O.....O#.",
    "O.#..O.#.#",
    "..O..#O..O",
    ".......O..",
    "#....###..",
    "#OO..#....",
    ];

  console.log(lines);
  const tilted1 = tilt(lines);
  // tilted1.forEach((line) => console.log(line));

  // prettier-ignore
  const tilted = [
    "OOOO.#.O..",
    "OO..#....#",
    "OO..O##..O",
    "O..#.OO...",
    "........#.",
    "..#....#.#",
    "..O..#.O.O",
    "..O.......",
    "#....###..",
    "#....#....",
    ];

  const load = calculateLoad(tilted1);
  console.log(load);
};

part1();
