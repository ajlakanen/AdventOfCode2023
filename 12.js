const { count } = require("console");
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

const parseSprings2 = (lines) => {
  const springGroups = lines.map((line) => {
    const [head, tail] = line.split(/\s/);
    const counts = tail.split(/\,/).map((n) => parseInt(n));
    return { head, counts };
  });

  return springGroups;
};

const isPossibleArrangement = (arrangement, counts) => {
  let groupCount = 0;
  let springsNow = 0;
  let previous = ".";
  for (let i = 0; i < arrangement.length; i++) {
    if (arrangement[i] === ".") {
      if (previous === "#") {
        groupCount++;
        springsNow = 0;
        previous = ".";
      }

      if (groupCount > counts.length) {
        return false;
      }
      continue;
    }

    if (arrangement[i] === "#") {
      previous = "#";
      springsNow++;
      if (springsNow > counts[groupCount]) {
        return false;
      }
      continue;
    }
  }
  return true;
};

const countPossibleArrangements = (conditions, counts) => {
  let arrangements = 0;
  return arrangements;
}

const countArrangements = (arrangement, countsLeft) => {
  if(countsLeft.length === 0) return 0;
  let i = 0;
  const [head, ...tail] = countsLeft;
  while(true)
  {
    if (arrangement[i]==="." && countsLeft[0]>0)return false;
    if (arrangement[i]==="?"){}
  }
};

const part1 = () => {
  const springGroups = parseSprings(lines);
  //console.log("springGroups", springGroups);

  const springGroups2 = parseSprings2(lines);
  //console.log("springGroups2", springGroups2);
};

const part2 = () => {};

console.log("Part 1: " + part1());
console.log("Part 2: " + part2());

module.exports = { lines, parseSprings, parseSprings2, isPossibleArrangement };
