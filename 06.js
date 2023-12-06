const f = require("fs");

/**
 * This function is the core of the solution. It counts in how many ways you go
 * over the distance in the given time. From the start of the race, you can
 * "hold the pedal" to give you speed; during this time you are not moving. When
 * you release the pedal you start moving. The longer you hold the pedal, the
 * faster you move, but the less remaining time you have to go over the
 * distance.
 *
 * @param {Object} param0 Time and distance of the race
 * @returns Number of ways to go over the distance in the given time
 */
const findWaysToWin = ({ time, distance }) => {
  let left = 0;
  let right = time;
  while (left * (time - left) <= distance) {
    left++;
  }

  while (right * (time - right) <= distance) {
    right--;
  }
  return right - left + 1;
};

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/06-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const parseRaces = (lines) => {
    const justNumbers = lines
      .map((line) => {
        return line
          .split(":")[1]
          .split(" ")
          .filter((a) => a)
          .map((num) => parseInt(num));
      })
      .flat(1);

    let races = [];
    for (let i = 0; i < justNumbers.length / 2; i++)
      races.push({
        time: justNumbers[i],
        distance: justNumbers[i + justNumbers.length / 2],
      });

    return races;
  };

  const races = parseRaces(lines);
  const waysToWin = races.map((race) => findWaysToWin(race));
  console.log(
    "Part 1",
    waysToWin.reduce((a, b) => a * b, 1)
  );
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/06-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const parseRaces = (lines) => {
    const justNumbers = lines
      .map((line) => {
        return line
          .split(":")[1]
          .split(" ")
          .filter((a) => a)
          .join(""); // How does this work even though it's not a number?
      })
      .flat(1);

    let races = [];
    for (let i = 0; i < justNumbers.length / 2; i++)
      races.push({
        time: justNumbers[i],
        distance: justNumbers[i + justNumbers.length / 2],
      });

    return races;
  };

  const races = parseRaces(lines);
  const waysToWin = races.map((race) => findWaysToWin(race));
  console.log(
    "Part 2",
    waysToWin.reduce((a, b) => a * b, 1)
  );
};

part1();
part2();
