import { readFileSync } from "fs";

const findStartPos = (lines) => {
  let i = 0;
  while (i < lines.length) {
    if (lines[i].indexOf("S") > -1) return { y: i, x: lines[i].indexOf("S") };
    i++;
  }
  return { x: -1, y: -1 };
};

const pipes = {
  "|": ["N", "S"],
  "-": ["E", "W"],
  L: ["N", "E"],
  7: ["S", "W"],
  J: ["N", "W"],
  F: ["S", "E"],
};

const canConnect = (pipe, from) => {
  if (!pipes[pipe]) return false;
  return pipes[pipe].indexOf(from) > -1;
};

const checkConnections = ({ y, x }, lines) => {
  let connections = [];
  // north
  y > 0 && canConnect(lines[y - 1][x], "S")
    ? connections.push(1)
    : connections.push(0);
  // east
  x < lines[y].length - 1 && canConnect(lines[y][x + 1], "W")
    ? connections.push(1)
    : connections.push(0);
  // south
  y < lines.length - 1 && canConnect(lines[y + 1][x], "N")
    ? connections.push(1)
    : connections.push(0);
  // west
  x > 0 && canConnect(lines[y][x - 1], "E")
    ? connections.push(1)
    : connections.push(0);

  return connections;
};

const part1 = () => {
  let lines = [];

  const data = readFileSync("data/10-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const startPos = findStartPos(lines);

  const cardinals = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
  };

  const connections = checkConnections(startPos, lines);

  console.log("startPos", startPos);
  console.log("connections", connections);
};

part1();

export { canConnect, checkConnections, pipes };
