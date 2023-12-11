const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/11-data-small.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });
};

part1();
