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
  S: ["N", "E", "S", "W"],
};

const canConnect = (pipe, from) => {
  if (!pipes[pipe]) return false;
  return pipes[pipe].indexOf(from) > -1;
};

const cardinals = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

const cardinalOpposites = {
  N: "S",
  E: "W",
  S: "N",
  W: "E",
};

const getConnectedCardinals = ({ y, x }, from, lines) => {
  let connections = [];

  // north
  if (from !== "N" && y > 0 && canConnect(lines[y - 1][x], "S"))
    connections.push("N");
  // east
  if (
    from !== "E" &&
    x < lines[y].length - 1 &&
    canConnect(lines[y][x + 1], "W")
  )
    connections.push("E");
  // south
  if (from !== "S" && y < lines.length - 1 && canConnect(lines[y + 1][x], "N"))
    connections.push("S");
  // west
  if (from !== "W" && x > 0 && canConnect(lines[y][x - 1], "E"))
    connections.push("W");

  return connections;
};

const nextLocation = ({ y, x }, lines, from) => {
  const char = lines[y][x];
  const newDir = pipes[char].filter((d) => d !== cardinalOpposites[from])[0];
  //console.log("newDirection", newDirection);
  const newPos = {
    newY: y + (newDir === "N" ? -1 : newDir === "S" ? 1 : 0),
    newX: x + (newDir === "W" ? -1 : newDir === "E" ? 1 : 0),
    newDir: newDir,
  };

  console.log("newPos", newPos);
  return newPos;
};

const getConnections = ({ y, x }, lines) => {
  let connections = [];
  // north
  if (y > 0 && canConnect(lines[y - 1][x], "S")) connections.push("N");

  // east
  if (x < lines[y].length - 1 && canConnect(lines[y][x + 1], "W"))
    connections.push("E");

  // south
  if (y < lines.length - 1 && canConnect(lines[y + 1][x], "N"))
    connections.push("S");

  // west
  if (x > 0 && canConnect(lines[y][x - 1], "E")) connections.push("W");

  return connections;
};

const part1 = () => {
  let lines = [];

  const data = readFileSync("data/10-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const startPos = findStartPos(lines);

  const connections = getConnections(startPos, lines);
  let prevDir = connections[0];
  let connectionDirection = cardinalOpposites[prevDir];
  let y = startPos.x + cardinals[prevDir][0];
  let x = startPos.y + cardinals[prevDir][1];
  const firstPipeAfterStart = { y: x, x: y };
  console.log("startPos", startPos);
  console.log("startPos connections", connections);
  console.log("firstConnection", prevDir);
  console.log("firstConnectionDirection", connectionDirection);
  console.log("firstPipeAfterStart", firstPipeAfterStart);

  const connections2 = getConnectedCardinals(
    { y: x, x: y },
    connectionDirection,
    lines
  );
  console.log("connections2", connections2);

  let i = 1;
  //let {newY, newX} = firstPipeAfterStart;
  while (true) {
    const { newY, newX, newDir } = nextLocation({ y: x, x: y }, lines, prevDir);
    x = newX;
    y = newY;
    prevDir = newDir;
    if (lines[x][y] === "S") break;
    else i++;
  }
};

part1();

export { canConnect, getConnections, getConnectedCardinals, pipes };
