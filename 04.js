const f = require("fs");
const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/04-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  lines = lines.map((line) => {
    return line
      .split(": ")
      .slice(1)
      .map((part) => part.trim().split(" | "))
      .map((card) => {
        const my = card[0].split(/\s+/).map((num) => parseInt(num));
        const winning = card[1].split(/\s+/).map((num) => parseInt(num));
        let winningCount = 0;
        my.forEach((num) => {
          if (winning.includes(num)) {
            winningCount++;
          }
        });
        return Math.floor(Math.pow(2, winningCount - 1));
      });
  });
  const sum = lines.flat().reduce((a, b) => a + b, 0);
  console.log("Part 1", sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/04-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const matchingNumbers = lines
    .map((line) => {
      return line
        .split(": ")
        .slice(1)
        .map((part) => part.trim().split(" | "))
        .map((card) => {
          const my = card[0].split(/\s+/).map((num) => parseInt(num));
          const winning = card[1].split(/\s+/).map((num) => parseInt(num));
          let winningCount = 0;
          my.forEach((num) => {
            if (winning.includes(num)) {
              winningCount++;
            }
          });
          return winningCount;
        })
        .join("");
    })
    .map((num) => parseInt(num));

  let totalScratchCards = Array.from({ length: lines.length }, () => 1);
  for (let i = 0; i < matchingNumbers.length; i++) {
    for (let k = 0; k < totalScratchCards[i]; k++) {
      for (let j = i + 1; j < i + 1 + matchingNumbers[i]; j++) {
        if (j >= matchingNumbers.length) {
          break;
        }
        totalScratchCards[j] += 1;
      }
    }
  }

  console.log(
    "Part 2",
    totalScratchCards.reduce((a, b) => a + b, 0)
  );
};

part1();
part2();
