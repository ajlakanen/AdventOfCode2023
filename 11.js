const f = require("fs");

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

const emptyRowsAndColumns = (lines) => {
  let emptyRows = [];
  let emptyColumns = [];

  // Empty rows
  let i = 0;
  while (i < lines.length) {
    if (lines[i].replace(/\./g, "").length === 0) {
      emptyRows.push(i);
    }
    i++;
  }

  // Empty columns
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
      emptyColumns.push(i);
    }
    i++;
  }
  return { emptyRows, emptyColumns };
};

const distance = (a, b, emptyRowsAndColumns, dist) => {
  const minX = Math.min(a.x, b.x);
  const maxX = Math.max(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxY = Math.max(a.y, b.y);

  const emptyRows = emptyRowsAndColumns.emptyRows.filter(
    (row) => row >= minY && row <= maxY
  );
  const emptyColumns = emptyRowsAndColumns.emptyColumns.filter(
    (column) => column >= minX && column <= maxX
  );

  return (
    Math.abs(a.y - b.y) +
    Math.abs(a.x - b.x) +
    emptyRows.length * dist +
    emptyColumns.length * dist -
    emptyColumns.length -
    emptyRows.length
  );
};

const distancesToOtherGalaxies = (galaxies, f) => {
  let distancesToOtherGalaxies = [];
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
        distance: f(galaxies[i], galaxies[j]),
      });
      j++;
    }
    i++;
  }
  return distancesToOtherGalaxies;
};

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/11-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const empty = emptyRowsAndColumns(lines);
  const galaxies = parseGalaxies(lines);
  const distances = distancesToOtherGalaxies(galaxies, (a, b) =>
    distance(a, b, empty, 2)
  );
  console.log(distances.flat().reduce((a, b) => a + b.distance, 0));
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/11-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const galaxies = parseGalaxies(lines);
  const empty = emptyRowsAndColumns(lines);
  const distances = distancesToOtherGalaxies(galaxies, (a, b) =>
    distance(a, b, empty, 1000000)
  );
  console.log(distances.flat().reduce((a, b) => a + b.distance, 0));
};

part1();
part2();
