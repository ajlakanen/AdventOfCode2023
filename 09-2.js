const f = require("fs");

/**
 * Returns a sequence of differences between numbers in the input array.
 * The sequence is repeated until all numbers are equal.
 * @param {Array} array Sequence of numbers
 * @returns [Array] Sequence of differences between numbers in the input array
 */
const diffLists = (array) => {
  let diffs = [];
  let arrayCount = 0;
  while (true) {
    if (diffs.length > 0 && diffs[diffs.length - 1].every((n) => n === 0))
      break;
    const previous = arrayCount === 0 ? array : diffs[diffs.length - 1];
    let diffNow = [];
    for (let i = 0; i < previous.length - 1; i++) {
      diffNow.push(previous[i + 1] - previous[i]);
    }
    diffs.push(diffNow);
    arrayCount++;
  }
  return diffs;
};

const part1 = () => {
  let lines = [];
  const rawData = f.readFileSync("data/09-data.txt", "utf-8");
  rawData.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const data = lines.map((line) => line.split(" ").map((n) => parseInt(n)));

  const extrapolate = (diffLists) => {
    let result = [...diffLists];
    for (let i = diffLists.length - 2; i >= 0; i--) {
      const last = result[i][result[i].length - 1];
      const previous = result[i + 1][result[i + 1].length - 1];
      result[i].push(last + previous);
    }
    return result[0][result[0].length - 1];
  };

  const sum = data.reduce((acc, line) => {
    return acc + line[line.length - 1] + extrapolate(diffLists(line));
  }, 0);
  console.log("Part 1", sum);
};

const part2 = () => {
  let lines = [];
  const rawData = f.readFileSync("data/09-data.txt", "utf-8");
  rawData.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const data = lines.map((line) => line.split(" ").map((n) => parseInt(n)));

  const extrapolateLeft = (diffLists) => {
    let result = [...diffLists];
    for (let i = diffLists.length - 2; i >= 0; i--) {
      const first = result[i][0];
      const previous = result[i + 1][0];
      result[i].unshift(first - previous);
    }
    return result[0][0];
  };

  console.log(
    "Part 2",
    data.reduce((acc, line) => {
      return acc + line[0] - extrapolateLeft(diffLists(line));
    }, 0)
  );
};

part1();
part2();
