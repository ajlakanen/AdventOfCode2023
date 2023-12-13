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
      let hasMirror = true;
      // Check if the other rows are mirrored at the same previously found index
      let y = 1;
      while (y < pattern.length) {
        if (!stringIsMirroredAtIndex(pattern[y], x)) {
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
      let hasMirror = true;
      // Check if the other columns are mirrored at the same previously found index
      let x = 1;
      while (x < pattern[0].length) {
        // Concatenate the column of each row to a string

        const column = pattern.map((row) => row[x]).join("");
        if (!stringIsMirroredAtIndex(column, y)) {
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

  //console.log(patterns);
  console.log("patterns[0] vertical", hasVerticalMirror(patterns[0]));
  console.log("patterns[1] vertical", hasVerticalMirror(patterns[1]));
  console.log("patterns[0] horizontal", hasHorizontalMirror(patterns[0]));
  console.log("patterns[1] horizontal", hasHorizontalMirror(patterns[1]));

  // prettier-ignore
  let pattern = [
    "#...",
    ".#..",
    ".#.#",
    "..#.",
  ];
  console.log("pattern ", hasVerticalMirror(pattern));
  console.log("pattern ", hasHorizontalMirror(pattern));

  const verticalMirrorsSum = patterns
    .map(hasVerticalMirror)
    .filter((x) => x !== -1)
    .reduce((acc, now) => acc + now, 0);
  console.log(verticalMirrorsSum);

  const horizontalMirrorsSum = patterns
    .map(hasHorizontalMirror)
    .filter((x) => x !== -1)
    .reduce((acc, now) => acc + now * 100, 0);
  console.log(verticalMirrorsSum + horizontalMirrorsSum);
};

part1();

module.exports = { hasVerticalMirror, hasHorizontalMirror };
