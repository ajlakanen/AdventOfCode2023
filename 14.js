const f = require("fs");

const lines = f
  .readFileSync("data/14-data.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    return line;
  });

// Made in part 1. This was replaced in part 2.
const tilt1 = (lines, direction = { x: 0, y: 1 }) => {
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

const rollRocks = (str) => {
  const rolled = str
    .split("#")
    .map((group) => {
      const count = group.split("O").length - 1;
      return "O".repeat(count) + ".".repeat(group.length - count);
    })
    .join("#");
  return rolled;
};

const reverseString = (str) => {
  return str.split("").reverse().join("");
};

const tilt2 = (lines, direction = { x: 0, y: 1 }) => {
  // Go through each column
  let tilted = Array(lines[0].length).fill("");

  const horizontal = direction.x !== 0;
  let i = 0;
  const end = horizontal ? lines[0].length : lines.length;
  while (i < end) {
    let line = horizontal ? lines[i] : lines.map((line) => line[i]).join("");

    // north
    if (direction.y === 1) {
      line = rollRocks(line);
      tilted.map((l, i) => {
        tilted[i] += line[i];
      });
    }

    // west
    if (direction.x === -1) {
      line = rollRocks(line);
      tilted[i] = line;
    }

    // south
    if (direction.y === -1) {
      line = reverseString(rollRocks(reverseString(line)));
      tilted.map((l, i) => {
        tilted[i] += line[i];
      });
    }

    // east
    if (direction.x === 1) {
      line = reverseString(rollRocks(reverseString(line)));
      tilted[i] = line;
    }
    i++;
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
  const tilted1 = tilt2(lines);
  // tilted1.forEach((line) => console.log(line));
  const load = calculateLoad(tilted1);
  console.log(load);
};

const part2 = () => {
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

  const directions = [
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
  ];

  let tilted = [...initial];
  let afterRound = [...tilted];
  let k = 0;
  for (let j = 0; j < 1000000000; j++) {
    for (let i = 0; i < directions.length; i++) {
      tilted = tilt2(tilted, directions[i]);
      if (k++ % 100000 === 0) console.log(k);
    }
    if (tilted.join("") === afterRound.join("")) {
      console.log("found a pattern");
      break;
    }
    afterRound = [...tilted];
  }
  const load = calculateLoad(tilted);
  console.log(load);
};

part1();
part2();
