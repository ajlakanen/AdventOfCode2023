const f = require("fs");
const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/04-data-small.txt", "utf-8");
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
        console.log("my", my, "winning", winning);
        my.forEach((num) => {
          if (winning.includes(num)) {
            my.splice(my.indexOf(num), 1);
          }
        });
        console.log("my", my, "winning", winning);
        return card;
      });
  });
  //console.log("lines", lines);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/04-data-small.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });
};

part1();
part2();
