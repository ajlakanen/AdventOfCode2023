const f = require("fs");
const { parse } = require("path");

const lines = f
  .readFileSync("data/12-data-small.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    return line;
  });

const parseSprings = (lines) => {
  let springGroups = [];
  lines.map((line) => {
    const [head, tail] = line.split(/\s/);
    let group = [];
    head.split(/\./).forEach((g) => {
      if (g !== "") group.push(g);
    });
    const counts = tail.split(/\,/).map((n) => parseInt(n));

    springGroups.push({ group, counts });
  });
  return springGroups;
};

const part1 = () => {
  const springGroups = parseSprings(lines);
  console.log("springGroups", springGroups);
};

const part2 = () => {};

console.log("Part 1: " + part1());
console.log("Part 2: " + part2());
