const f = require("fs");

const part1 = () => {
  let lines = [];
  const rawData = f.readFileSync("data/09-data-small.txt", "utf-8");
  rawData.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const data = lines.map((line) => line.split(" ").map((n) => parseInt(n)));
  console.log(data);

  const diffLists = (array) => {
    let diffs = [];
    let arrayCount = 0;
    while (diffs.length < 1 || diffs[diffs.length - 1].every((n) => n !== 0)) {
      const previous = arrayCount === 0 ? array : diffs[diffs.length - 1];
      let diffNow = [];
      console.log("ok");
      for (let i = 0; i < previous.length - 1; i++) {
        diffNow.push(previous[i + 1] - previous[i]);
      }
      diffs.push(diffNow);
      arrayCount++;
    }
    return diffs;
  };

  const diffs = diffLists(data[1]);
  console.log(diffs);
};

part1();
