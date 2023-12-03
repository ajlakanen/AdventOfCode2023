const f = require("fs");
const { get } = require("http");

/**
 * Read the digits from the lines to a object array
 * @param {Array} lines Lines of the input
 * @returns {Array} Digits in the input
 * @example
 * const lines = [ '123.456' ];
 * getNumbers(lines);
 * // returns [ { digit: '1', y: 0, x: 0 },
 * //           { digit: '2', y: 0, x: 1 },
 * //           { digit: '3', y: 0, x: 2 },
 * //           { digit: '4', y: 0, x: 4 },
 * //           { digit: '5', y: 0, x: 5 },
 * //           { digit: '6', y: 0, x: 6 } ]
 **/
const getNumbers = (lines) => {
  let numbers = [];
  lines.forEach((line, y) => {
    let number = [];
    line.split("").forEach((ch, x) => {
      if (/\d/.test(ch)) {
        number.push({ digit: ch, y: y, x: x });
      } else if (number.length) {
        numbers.push(number);
        number = [];
      }
    });
    if (number.length) numbers.push(number);
  });
  return numbers;
};

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/03-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  /**
   * Get all symbols in the input
   * @param {Array} lines Lines of the input
   * @returns {Array} Symbols in the input
   */
  const getSymbols = (lines) => {
    let symbols = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (!char.match(/[\d\.]/g) && !symbols.includes(char)) {
          symbols.push(char);
        }
      }
    }
    return symbols;
  };

  const directions = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
  ];

  /**
   * Check if there is a symbol in any direction of the number
   * (horizontally, vertically or diagonally)
   * @param {Array}   digit       Digit
   * @param {Array}   directions  Directions to check
   * @param {String}  symbols     Symbols to check
   * @returns {Boolean}           True if there is a symbol in any direction of the number, false otherwise
   */
  const symbolInPerimeter = (digit, directions, symbols) => {
    for (let k = 0; k < directions.length; k++) {
      const y_new = digit.y + directions[k].y;
      const x_new = digit.x + directions[k].x;
      if (
        lines[y_new] !== undefined &&
        lines[y_new][x_new] !== undefined &&
        symbols.includes(lines[y_new][x_new])
      ) {
        symbolFound = true;
        return true;
      }
    }
    return false;
  };

  // Find symbols
  const symbols = getSymbols(lines);
  const numbers = getNumbers(lines);

  // Check if there are symbols in any direction of the number
  // If there are, add the number to the sum
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    // Check all digits of the number
    for (let j = 0; j < number.length; j++) {
      const digit = number[j];
      if (symbolInPerimeter(digit, directions, symbols)) {
        sum += parseInt(
          number
            .map((digit) => {
              return digit.digit;
            })
            .join("")
        );
        break;
      }
    }
  }

  console.log("Part 1", sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/03-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const numbers = getNumbers(lines);

  // Find the locations of the stars
  let stars = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char.match(/[*]/g)) {
        stars.push({ y: i, x: j });
      }
    }
  }

  const directions = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
  ];

  // Select all numbers around the stars.
  // Later, we will select the numbers that appear exactly 2 times
  let numbersAroundStar = [];
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    for (let j = 0; j < directions.length; j++) {
      const direction = directions[j];

      // If numbers-array contains a number (at least a single digit) at the
      // location of the star, add it to numbersAroundStar
      numbers.map((number) =>
        number.filter((digit) => {
          if (
            digit.y === star.y + direction.y &&
            digit.x === star.x + direction.x
          ) {
            // If number is already added to numbersAroundStar, don't add it again
            if (!numbersAroundStar.find((n) => n.number === number)) {
              numbersAroundStar.push({ number: number, star: star });
            }
          }
        })
      );
    }
  }

  // Select stars that appear exactly 2 times in numbersAroundStar
  let starsWithTwoNumbers = [];
  for (let i = 0; i < numbersAroundStar.length; i++) {
    const number = numbersAroundStar[i].number;
    const star = numbersAroundStar[i].star;
    const count = numbersAroundStar.filter((n) => n.star === star).length;
    if (count === 2) {
      starsWithTwoNumbers.push({
        star: star,
        number: parseInt(number.map((n) => n.digit).join("")),
      });
    }
  }

  // Multiply the numbers around the stars and add them together
  let sum = 0;
  for (let i = 0; i < starsWithTwoNumbers.length; i += 2)
    sum += starsWithTwoNumbers[i].number * starsWithTwoNumbers[i + 1].number;

  // Print the sum
  console.log("Part 2", sum);
};

part1();
part2();
