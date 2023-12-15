const f = require("fs");

const smallData = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
const bigData = f.readFileSync("data/15-data.txt", "utf-8");
const data = bigData.split(",");

const hash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
    //console.log(str.charCodeAt(i));
    hash *= 17;
    hash = hash % 256;
  }
  return hash;
};

const part1 = () => {
  console.log(hash("HASH"));
  console.log(hash("rn=1"));
  const sum = data.reduce((acc, now) => acc + hash(now), 0);
  console.log(sum);
};

part1();
