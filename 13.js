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

const stringIsMirroredAtIndex = (string, index) => {
  if (index === 0 || index === string.length - 1) return false;
  // Check if the string is mirrored at the given index

  // Distance from the "focal point" of the mirror
  let i = 1;
  mirror = true;
  while (index + i < string.length) {
    if (string[index + i] !== string[index - i - 1]) {
      mirror = false;
      break;
    }
    i++;
  }
  if (mirror) return true;
  else return false;
};

const hasVerticalMirror = (pattern) => {
  let x = 1;
  while (x < pattern[0].length) {
    // If consecutive characters are the same,
    // it makes this a potential focal point of the mirror
    if (pattern[0][x] === pattern[0][x - 1]) {
      const distToEdge = Math.min(x, pattern[0].length - x - 1);
      if (distToEdge < 2) {
        x++;
        continue;
      }

      // Check if the other rows are mirrored at the same previously found index
      let y = 1;
      let hasMirror = true;
      while (y < pattern.length) {
        const subString = pattern[y].substring(x - distToEdge, x + distToEdge);
        if (!stringIsMirroredAtIndex(subString, x)) {
          hasMirror = false;
          break;
        }
        y++;
      }
      if (hasMirror) return x;
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
    if (pattern[y][0] === pattern[y - 1][0]) {
      const distToEdge = Math.min(y, pattern.length - y - 1);
      if (distToEdge < 2) {
        y++;
        continue;
      }

      // Check if the other columns are mirrored at the same previously found index
      let x = 1;
      let hasMirror = true;

      while (x < pattern[0].length) {
        // Concatenate the column of each row to a string
        const column = pattern.map((row) => row[x]).join("");
        const subString = column.substring(y - distToEdge, y + distToEdge);
        if (!stringIsMirroredAtIndex(subString, y)) {
          hasMirror = false;
          break;
        }
        x++;
      }
      if (hasMirror) return y;
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

  // console.log(hasVerticalMirror(pattern));
  // console.log(hasHorizontalMirror(pattern));
  console.log(hasHorizontalMirror(pattern2));
  console.log(hasVerticalMirror(pattern2));

  patterns.map((pattern, index) => {
    //console.log("pattern", index, pattern);
    //console.log(hasVerticalMirror(pattern));
    //console.log(hasHorizontalMirror(pattern));
    //console.log();
  });

  const verticalMirrorsSum = patterns
    .map(hasVerticalMirror)
    .filter((x) => x !== -1)
    .reduce((acc, now) => acc + now, 0);
  console.log(verticalMirrorsSum);

  const horizontalMirrorsSum = patterns
    .map(hasHorizontalMirror)
    .filter((x) => x !== -1)
    .reduce((acc, now) => acc + now * 100, 0);
  console.log(horizontalMirrorsSum);
  console.log(verticalMirrorsSum + horizontalMirrorsSum);
};

part1();

module.exports = { hasVerticalMirror, hasHorizontalMirror };
