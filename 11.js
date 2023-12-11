const f = require("fs");

const expandEmptyRowsAndColumns = (lines) => {
  // Expand empty rows
  let i = 0;
  while (i < lines.length) {
    if (lines[i].replace(/\./g, "").length === 0) {
      lines.splice(i, 0, ".".repeat(lines[i - 1].length));
      i++;
    }
    i++;
  }

  // Expand empty columns
  i = 0;
  while (i < lines[0].length) {
    let j = 0;
    let columnIsEmpty = true;
    while (j < lines.length) {
      if (lines[j][i] !== ".") {
        columnIsEmpty = false;
        break;
      }
      j++;
    }
    if (columnIsEmpty) {
      j = 0;
      while (j < lines.length) {
        lines[j] =
          lines[j].substring(0, i) +
          "." +
          lines[j].substring(i, lines[j].length);
        j++;
      }
      i++;
    }
    i++;
  }
  return lines;
};

const parseGalaxies = (lines) => {
  const galaxies = [];
  let i = 0;
  while (i < lines.length) {
    let j = 0;
    while (j < lines[i].length) {
      if (lines[i][j] === "#") {
        galaxies.push({ y: i, x: j });
      }
      j++;
    }
    i++;
  }
  return galaxies;
};

const distance = (a, b) => {
  return Math.abs(a.y - b.y) + Math.abs(a.x - b.x);
};

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/11-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  lines = expandEmptyRowsAndColumns(lines);
  const galaxies = parseGalaxies(lines);
  // console.log(galaxies);

  const distancesToOtherGalaxies = [];
  let i = 0;
  while (i < galaxies.length) {
    let j = i + 1;
    distancesToOtherGalaxies.push([]);
    while (j < galaxies.length) {
      if (i === j) {
        j++;
        continue;
      }
      distancesToOtherGalaxies[i].push({
        i,
        j,
        distance: distance(galaxies[i], galaxies[j]),
      });
      j++;
    }
    i++;
  }

  console.log(
    distancesToOtherGalaxies.flat().reduce((a, b) => a + b.distance, 0)
  );
};

part1();

module.exports = { expandEmptyRowsAndColumns };
