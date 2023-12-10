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

const checkDirection = (pipe, from) => {
  return pipe.connects.indexOf(from) > -1;
};

const checkConnections = ([nesw]) => {
  let connections = [];
  // north
  checkDirection(nesw[0], "S") ? connections.push(1) : connections.push(0);
  // east
  checkDirection(nesw[1], "W") ? connections.push(1) : connections.push(0);
  // south
  checkDirection(nesw[2], "N") ? connections.push(1) : connections.push(0);
  // west
  checkDirection(nesw[3], "E") ? connections.push(1) : connections.push(0);

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

  console.log("startPos", startPos);
};

part1();

export { checkDirection };
