const f = require("fs");

const part1 = () => {
  let lines = [];
  const rawData = f.readFileSync("data/09-data.txt", "utf-8");
  rawData.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const data = lines.map((line) => line.split(" ").map((n) => parseInt(n)));

  const diffLists = (array) => {
    let diffs = [];
    let arrayCount = 0;
    while (true) {
      if (diffs.length > 0 && diffs[diffs.length - 1].every((n) => n === 0))
        break;
      const previous = arrayCount === 0 ? array : diffs[diffs.length - 1];
      let diffNow = [];
      //console.log("ok");
      for (let i = 0; i < previous.length - 1; i++) {
        diffNow.push(previous[i + 1] - previous[i]);
      }
      diffs.push(diffNow);
      arrayCount++;
    }
    return diffs;
  };

  const extrapolate = (diffLists) => {
    let result = [...diffLists];
    for (let i = diffLists.length - 2; i >= 0; i--) {
      const last = result[i][result[i].length - 1];
      const previous = result[i + 1][result[i + 1].length - 1];
      result[i].push(last + previous);
    }
    return result[0][result[0].length - 1];
  };

  const sum = data.reduce((acc, line) => {
    const extrapolated = line[line.length - 1] + extrapolate(diffLists(line));
    return acc + extrapolated;
  }, 0);
  console.log(sum);

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const extrapolated = line[line.length - 1] + extrapolate(diffLists(line));
    //console.log(extrapolated);
  }
  // console.log(diffLists(data[2]));
  // console.log(data[2][data[2].length - 1] + extrapolate(diffLists(data[2])));
  // console.log("data", data);
};

part1();
