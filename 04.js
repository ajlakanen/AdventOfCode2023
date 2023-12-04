const f = require("fs");
const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/04-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  console.log("lines", lines);

  lines = lines.map((line) => {
    return line
      .split(": ")
      .slice(1)
      .map((part) => part.trim().split(" | "))
      .map((card) => {
        // const winning = card.split(/\s+/).map((num) => parseInt(num));
        // console.log("winning", winning);
        const my = card[0].split(/\s+/).map((num) => parseInt(num));
        const winning = card[1].split(/\s+/).map((num) => parseInt(num));
        //console.log("my", my, "winning", winning);
        let winningCount = 0;
        my.forEach((num) => {
          if (winning.includes(num)) {
            // my.splice(my.indexOf(num), 1);
            winningCount++;
          }
        });
        /*console.log(
          // "my",
          // my,
          // "winning",
          // winning,
          "winninCount",
          winningCount,
          "winningAmount",
          Math.floor(Math.pow(2, winningCount - 1))
        );*/
        return Math.floor(Math.pow(2, winningCount - 1));
      });
  });
  console.log("lines", lines);
  const sum = lines.flat().reduce((a, b) => a + b, 0);
  console.log("Part 1", sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/04-data-small.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });
  /*
  lines = lines.map((line) => {
    return line
      .split(": ")
      .slice(1)
      .map((part) => part.trim().split(" | "))
      .map((card) => {
        // const winning = card.split(/\s+/).map((num) => parseInt(num));
        // console.log("winning", winning);
        const my = card[0].split(/\s+/).map((num) => parseInt(num));
        const winning = card[1].split(/\s+/).map((num) => parseInt(num));
        //console.log("my", my, "winning", winning);
        let winningCount = 0;
        my.forEach((num) => {
          if (winning.includes(num)) {
            // my.splice(my.indexOf(num), 1);
            winningCount++;
          }
        });
        return Math.floor(Math.pow(2, winningCount - 1));
      });
  });
  console.log("lines", lines);
  const sum = lines.flat().reduce((a, b) => a + b, 0);
  console.log("sum", sum);
  */
};

part1();
part2();
