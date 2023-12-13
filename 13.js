const f = require("fs");

const lines = f
  .readFileSync("data/13-data.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    return line;
  });

// If line is empty, push the current group to the groups array and reset the group
// Else, push the line to the group
const parsePatterns = (lines) => {
  let patterns = [];
  let pattern = [];
  lines.map((line) => {
    if (line === "") {
      patterns.push(pattern);
      pattern = [];
    } else {
      pattern.push(line);
    }
  });
  patterns.push(pattern);
  return patterns;
};

const stringIsMirrored = (string) => {
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - i - 1]) {
      return false;
    }
  }
  return true;
};

const hasVerticalMirror = (pattern) => {
  let x = 1;
  while (x < pattern[0].length) {
    // If consecutive characters are the same,
    // it makes this a potential focal point of the mirror
    if (pattern[0][x] === pattern[0][x - 1]) {
      const rightDist = pattern[0].length - x;
      const leftDist = x;
      const distToEdge = Math.min(rightDist, leftDist);

      // Check if the other rows are mirrored at the same previously found index
      let y = 0;
      let hasMirror = true;
      while (y < pattern.length) {
        const subString = pattern[y].substring(x - distToEdge, x + distToEdge);

        if (!stringIsMirrored(subString)) {
          hasMirror = false;
          break;
        }
        y++;
      }
      if (hasMirror) {
        return x;
      }
    }
    x++;
  }
  return -1;
};

const hasHorizontalMirror = (pattern) => {
  let y = 1;
  while (y < pattern.length) {
    // If this and previous column has the same character,
    // it makes this a potential focal point of the mirror
    // (between the columns y and y-1)
    if (pattern[y][0] === pattern[y - 1][0]) {
      const upDist = y;
      const downDist = pattern.length - y;
      const distToEdge = Math.min(upDist, downDist);

      // Check if the other columns are mirrored at the same previously found index
      let x = 0;
      let hasMirror = true;

      while (x < pattern[0].length) {
        // Concatenate the column of each row to a string
        const column = pattern.map((row) => row[x]).join("");
        const subString = column.substring(y - distToEdge, y + distToEdge);

        if (subString.length < 2) {
          x++;
          continue;
        }

        if (!stringIsMirrored(subString)) {
          hasMirror = false;
          break;
        }
        x++;
      }
      if (hasMirror) {
        return y;
      }
    }
    y++;
  }
  return -1;
};

const part1 = () => {
  const patterns = parsePatterns(lines);

  // prettier-ignore
  let pattern = [
    "#...",
    ".#..",
    ".#.#",
    "..#.",
  ];

  // prettier-ignore
  let pattern2 = [
  '..#..#..##..#..#.',
  '.######.#.....##.',
  '###..###..##....#',
  '#.#..#.##.#...###',
  '#.#..#.##.#...###',
  '###..###..##....#',
  '.######.#.....##.',
  '..#..#..##..#..##',
  '.#....#.###.#####',
  '###..###.#..##..#',
  '#.####.##..##....',
  '###..#####.##...#',
  '..####.....#####.',
  '.#....#..#.#.##..',
  '.######.#..#.#.#.'];

  // prettier-ignore
  let pattern3 = [
    "#....",
    "#....",
    "#....",
    "#....",
    ".#...",
  ];

  const verticalMirrorsSum = patterns
    .map(hasVerticalMirror)
    .filter((x) => x !== -1)
    .reduce((acc, now) => acc + now, 0);

  const horizontalMirrorsSum = patterns
    .map(hasHorizontalMirror)
    .filter((x) => x !== -1)
    .reduce((acc, now) => acc + now * 100, 0);
  console.log(verticalMirrorsSum + horizontalMirrorsSum);
};

part1();

module.exports = { hasVerticalMirror, hasHorizontalMirror };
