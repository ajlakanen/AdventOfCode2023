const f = require("fs");

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/08-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });
  // console.log(lines);

  const tree = lines.splice(2).reduce((acc, line) => {
    const [key, value] = line
      .split(" = ")
      .map((l) => l.replace(/[() ]/g, ""))
      .map((l) => l.split(","));
    return {
      ...acc,
      [key]: { left: value[0], right: value[1] },
    };
  }, []);

  // console.log(tree);

  /**
   * Find the ZZZ node recursively. This is too slow for the real input but I
   * left it here for posterity.
   * @param {Array} tree Tree of nodes
   * @param {String} instructions Instructions to follow
   * @param {String} key Current key
   * @param {Number} iterations How many iterations have we done
   * @returns {Number} Number of iterations
   */
  const findZZZRec = (tree, instructions, key, iterations) => {
    const nextInstruction = instructions[iterations % instructions.length];
    const nextDirection =
      nextInstruction === "L" ? tree[key].left : tree[key].right;
    if (nextDirection === "ZZZ") {
      return ++iterations;
    } else {
      iterations++;
      return findZZZRec(tree, instructions, nextDirection, iterations);
    }
  };

  const findZZZ = (tree, instructions) => {
    let iterations = 0;
    let key = "AAA";
    while (true) {
      const nextInstruction = instructions[iterations % instructions.length];
      const nextDirection =
        nextInstruction === "L" ? tree[key].left : tree[key].right;
      if (nextDirection === "ZZZ") {
        return ++iterations;
      } else {
        iterations++;
        key = nextDirection;
      }
    }
  };

  const instructions = lines[0];
  const iterations = findZZZ(tree, instructions, "AAA", 0);
  console.log(iterations);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/08-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });
  // console.log(lines);

  const tree = lines.splice(2).reduce((acc, line) => {
    const [key, value] = line
      .split(" = ")
      .map((l) => l.replace(/[() ]/g, ""))
      .map((l) => l.split(","));
    return {
      ...acc,
      [key]: { left: value[0], right: value[1] },
    };
  }, []);

  const nodesWithA = Object.keys(tree).filter((key) => key[2] === "A");
  // console.log("nodesWithA", nodesWithA);

  const newNodes = (keys, tree, instruction) => {
    return keys.map((key) => {
      const nextDirection =
        instruction === "L" ? tree[key].left : tree[key].right;
      return nextDirection;
    });
  };

  const instructions = lines[0];
  let nodesNow = nodesWithA;

  // How long does it take to reach Z from each node
  const countsToReachZ = nodesNow.map((node) => {
    let nodesNow = [node];
    const howManyStepsToZ = [];
    let i = 0;
    let j = 0;
    while (true) {
      const instruction = instructions[i % instructions.length];
      nodesNow = newNodes(nodesNow, tree, instruction);
      if (nodesNow.every((node) => node[2] === "Z")) {
        howManyStepsToZ.push(i + 1);
        if (i > 1 && (i + 1) % howManyStepsToZ[0] !== 0) {
          console.log(
            "not divisible!!",
            i + 1,
            "howManyStepsToZ",
            howManyStepsToZ
          );
        }
        j++;
        if (j > 0) {
          return howManyStepsToZ;
        }
      }
      i++;
    }
  });

  console.log(countsToReachZ.flat());

  // }
  //console.log(counts);
  //console.log(nodesNow, i);
};

part1();
part2();
