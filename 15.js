const f = require("fs");

const smallData = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
const bigData = f.readFileSync("data/15-data.txt", "utf-8");
const data = bigData.split(",");

const hash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
    hash *= 17;
    hash = hash % 256;
  }
  return hash;
};

const part1 = () => {
  const sum = data.reduce((acc, now) => acc + hash(now), 0);
  console.log(sum);
};

const part2 = () => {
  let boxes = Array(256).fill("");
  for (let i = 0; i < data.length; i++) {
    const equal = data[i].indexOf("=");
    const dash = data[i].indexOf("-");
    const name = data[i].substring(0, Math.max(equal, dash));
    const box = hash(name);
    if (dash > -1) {
      boxes[box] = [...boxes[box]].filter(
        (item) => item.split("=")[0] !== name
      );
    } else {
      if (
        [...boxes[box]].filter((item) => item.split("=")[0] === name).length > 0
      ) {
        const toReplace = [...boxes[box]].filter(
          (item) => item.split("=")[0] === name
        )[0];
        const indexToReplace = boxes[box].indexOf(toReplace);
        // console.log(boxes[box], toReplace, indexToReplace);
        boxes[box][indexToReplace] = data[i];
        continue;
      }
      boxes[box] = [...boxes[box], data[i]];
    }
  }
  let sum = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      sum += (i + 1) * (j + 1) * boxes[i][j].split("=")[1];
    }
  }
  console.log(sum);
};

part1();
part2();
