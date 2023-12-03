const f = require("fs");

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/03-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  // Find symbols
  let symbols = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (!char.match(/[\d\.]/g)) {
        symbols.push(char);
      }
    }
  }

  // Remove duplicate symbols
  symbols = [...new Set(symbols)];
  const regex = /[@&*\$\-#=%+/]/g;

  // Read the digits from the lines to a object array
  // Structure:
  // [ { digit, i, j },
  //   { digit, i, j+1 },
  //   { digit, i, j+2 }, ...
  // ]
  let numbers = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let number = [];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char.match(/\d/g)) {
        number.push({ number: char, i_y: i, i_x: j });
        if (j === line.length - 1) {
          numbers.push(number);
          number = [];
        }
      } else {
        if (number.length > 0) {
          numbers.push(number);
          number = [];
        }
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

  // Check if there are symbols in any direction of the number
  // If there are, add the number to the sum
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    // Check all digits of the number
    for (let j = 0; j < number.length; j++) {
      let symbolFound = false;
      const digit = number[j];
      const i_y = digit.i_y;
      const i_x = digit.i_x;

      // Check all directions
      for (let k = 0; k < directions.length; k++) {
        const direction = directions[k];
        const i_y_new = i_y + direction.y;
        const i_x_new = i_x + direction.x;
        if (
          lines[i_y_new] !== undefined &&
          lines[i_y_new][i_x_new] !== undefined &&
          lines[i_y_new][i_x_new].match(regex)
        ) {
          symbolFound = true;
          break;
        }
      }
      if (symbolFound) {
        const digits = parseInt(
          number
            .map((digit) => {
              return digit.number;
            })
            .join("")
        );
        // console.log("line", i_y, "digits", digits);
        sum += digits;
        break;
      }
    }
  }

  console.log("sum", sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/03-data-small.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });
};

part1();
part2();
