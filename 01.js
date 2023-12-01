const f = require("fs");

const sortNumbers = (a, b) => {
  return parseInt(a) - parseInt(b);
};

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

  // console.log(numbers);

  const sum = numbers.reduce((a, b) => a + b, 0);

  console.log(sum);
};

const part2 = () => {
  // 1. read data to lines
  let lines = [];

  const data = f.readFileSync("01-data-part2-small.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  console.log(lines);

  const numberWords = [
    { w: "one", n: 1 },
    { w: "two", n: 2 },
    { w: "three", n: 3 },
    { w: "four", n: 4 },
    { w: "five", n: 5 },
    { w: "six", n: 6 },
    { w: "seven", n: 7 },
    { w: "eight", n: 8 },
    { w: "nine", n: 9 },
  ];

  const wordsToNumbers = lines.map((line) => {
    numberWords.map((number) => {
      if (line.includes(number.w)) {
        console.log(line);
        console.log(number.n);
        return number.n;
      }
    });
  });

  console.log(wordsToNumbers);

  const onlynumbers = lines.map((line) => {
    line.map((word) => {
      numberWords.map((number) => {
        if (word === number.w) {
          return number.n;
        }
      });
    });
    return line.replace(/\D/g, "");
  });

  let numbers = [];

  onlynumbers.map((number) => {
    const num = parseInt(number[0] + "" + number[number.length - 1]);
    numbers.push(num);
  });
};
part1();
part2();
