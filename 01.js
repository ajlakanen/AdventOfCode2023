const f = require("fs");

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("01-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const onlynumbers = lines.map((line) => {
    return line.replace(/\D/g, "");
  });

  let numbers = [];

  onlynumbers.map((number) => {
    const num = parseInt(number[0] + "" + number[number.length - 1]);
    numbers.push(num);
  });

  const sum = numbers.reduce((a, b) => a + b, 0);

  console.log(sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("01-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const digitWords = [
    { word: "one", digit: 1 },
    { word: "two", digit: 2 },
    { word: "three", digit: 3 },
    { word: "four", digit: 4 },
    { word: "five", digit: 5 },
    { word: "six", digit: 6 },
    { word: "seven", digit: 7 },
    { word: "eight", digit: 8 },
    { word: "nine", digit: 9 },
  ];

  /**
   * Replaces words with digits in a string, while keeping the first and last letter of the word.
   * For example, "one" becomes "o1e", "three" becomes "t3e", etc.
   * Special case (example): eighthree -> e8three -> e8t3e
   * @param {String} str      The string to replace digits in
   * @param {Array}  mapping  The mapping of words to digits
   * @returns
   */
  const replaceWordDigits = (str, mapping) => {
    let result = str;
    let i = 0;
    while (i < result.length - 1) {
      for (let j = 0; j < mapping.length; j++) {
        if (i + mapping[j].word.length > result.length) {
          continue;
        }
        const sub = result.substring(i, i + mapping[j].word.length);
        if (sub === mapping[j].word) {
          result = result.replace(
            mapping[j].word,
            sub[0] + mapping[j].digit + sub[sub.length - 1] // This was a tough one. Thanks to https://www.reddit.com/r/adventofcode/comments/1884fpl/2023_day_1for_those_who_stuck_on_part_2/ for helping me with this.
          );
          break;
        }
      }
      i++;
    }
    return result;
  };

  const replaced = lines.map((line) => {
    return replaceWordDigits(line, digitWords);
  });

  const onlynumbers = replaced.map((line) => {
    return line.replace(/\D/g, "");
  });

  let numbers = [];

  onlynumbers.map((number) => {
    const num = parseInt(number[0] + "" + number[number.length - 1]);
    numbers.push(num);
  });

  /* for debugging
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i], replaced[i], onlynumbers[i], numbers[i]);
  }
  */

  const sum = numbers.reduce((a, b) => a + b, 0);

  console.log(sum);
};
part1();
part2();
