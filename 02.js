const f = require("fs");

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/02-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const games = lines.map((line) => {
    const game = line
      .replace(/^(Game \d+: )/g, "")
      .split("; ")
      .map((draw) => {
        return draw.split(", ").map((colorvalue) => {
          const colorAndValue = colorvalue.split(" ");
          return {
            color: colorAndValue[1],
            value: parseInt(colorAndValue[0]),
          };
        });
      });

    return game;
  });

  const invalidGames = (games, { maxRed, maxGreen, maxBlue }) => {
    // Array of game indices that are invalid
    let invalidGameNumbers = [];
    // Game
    for (let i = 0; i < games.length; i++) {
      // Draw
      for (let j = 0; j < games[i].length; j++) {
        // Colorvalue
        for (let k = 0; k < games[i][j].length; k++) {
          if (
            (games[i][j][k].color === "red" && games[i][j][k].value > maxRed) ||
            (games[i][j][k].color === "green" &&
              games[i][j][k].value > maxGreen) ||
            (games[i][j][k].color === "blue" && games[i][j][k].value > maxBlue)
          ) {
            // For a draw that has a color with a value that is greater than the maximum value for that color, the game is invalid.
            invalidGameNumbers.push(i + 1);
            break;
          }
        }
      }
    }
    return invalidGameNumbers;
  };

  const invalid = invalidGames(games, {
    maxRed: 12,
    maxGreen: 13,
    maxBlue: 14,
  });

  let nums = Array.from(Array(lines.length + 1).keys());
  nums = nums.filter((num) => {
    return !invalid.includes(num);
  });
  let sum = nums.reduce((a, b) => a + b, 0);
  console.log("part 1", sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/02-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const games = lines.map((line) => {
    const game = line
      .replace(/^(Game \d+: )/g, "")
      .split("; ")
      .map((draw) => {
        return draw.split(", ").map((colorvalue) => {
          const colorAndValue = colorvalue.split(" ");
          return {
            color: colorAndValue[1],
            value: parseInt(colorAndValue[0]),
          };
        });
      });

    return game;
  });

  let maxColorsForEachGame = [];
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    let maxColors = {};
    for (let j = 0; j < game.length; j++) {
      const draw = game[j];
      for (let k = 0; k < draw.length; k++) {
        const color = draw[k].color;
        const value = draw[k].value;
        if (maxColors[color] === undefined || maxColors[color] < value) {
          maxColors[color] = value;
        }
      }
    }
    maxColorsForEachGame.push(maxColors);
  }

  const sumOfPowers = maxColorsForEachGame.reduce((a, b) => {
    let sum = 1;
    for (let color in b) {
      sum *= b[color];
    }
    return a + sum;
  }, 0);
  console.log("part 2", sumOfPowers);
};

part1();
part2();
