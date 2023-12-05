const { group } = require("console");
const f = require("fs");

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/05-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const groupBy = (xs, key) => {
    let result = [];
    let current = [];
    for (let i = 0; i < xs.length; i++) {
      const line = xs[i];
      if (line === key || i === xs.length - 1) {
        result.push(current);
        current = [];
      } else {
        current.push(line);
      }
    }

    return result;
  };

  const mapNames = [
    { source: "seed", dest: "soil" },
    { source: "soil", dest: "fertilizer" },
    { source: "fertilizer", dest: "water" },
    { source: "water", dest: "light" },
    { source: "light", dest: "temperature" },
    { source: "temperature", dest: "humidity" },
    { source: "humidity", dest: "location" },
  ];

  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => {
      return parseInt(seed);
    });

  const grouped = groupBy(lines, "")
    .map((group) => {
      const sourceDest = mapNames.filter((mapName) =>
        group[0].split("-")[0].includes(mapName.source)
      )[0];
      const mappings = group.slice(1).map((line) => {
        return {
          out: parseInt(line.split(" ")[0]),
          in: parseInt(line.split(" ")[1]),
          length: parseInt(line.split(" ")[2]),
        };
      });

      return {
        source: sourceDest.source,
        dest: sourceDest.dest,
        maps: mappings,
      };
    })
    .slice(1);

  let results = [];
  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    const result = grouped.reduce((acc, group) => {
      const selectedMapping = group.maps.filter((mapping) => {
        return acc >= mapping.in && acc < mapping.in + mapping.length;
      });
      selectedMapping.forEach((mapping) => {
        const diff = acc - mapping.in;
        if (acc >= mapping.in && acc <= mapping.in + mapping.length) {
          acc = mapping.out + diff;
          return acc;
        }
      });
      return acc;
    }, seed);
    results.push(result);
  }

  console.log("Part 1", Math.min(...results));
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/05-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const groupBy = (xs, key) => {
    let result = [];
    let current = [];
    for (let i = 0; i < xs.length; i++) {
      const line = xs[i];
      if (line === key || i === xs.length - 1) {
        result.push(current);
        current = [];
      } else {
        current.push(line);
      }
    }

    return result;
  };

  const mapNames = [
    { source: "seed", dest: "soil" },
    { source: "soil", dest: "fertilizer" },
    { source: "fertilizer", dest: "water" },
    { source: "water", dest: "light" },
    { source: "light", dest: "temperature" },
    { source: "temperature", dest: "humidity" },
    { source: "humidity", dest: "location" },
  ];

  const initialSeeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => {
      return BigInt(parseInt(seed));
    });
  // console.log(initialSeeds);

  const seedRanges = initialSeeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
      acc.push({ start: seed, length: initialSeeds[index + 1] });
    }
    return acc;
  }, []);

  // console.log("seedRanges", seedRanges);

  const groupedMaps = groupBy(lines, "")
    .map((group) => {
      const sourceDest = mapNames.filter((mapName) =>
        group[0].split("-")[0].includes(mapName.source)
      )[0];
      const mappings = group.slice(1).map((line) => {
        return {
          out: BigInt(parseInt(line.split(" ")[0])),
          in: BigInt(parseInt(line.split(" ")[1])),
          length: BigInt(parseInt(line.split(" ")[2])),
        };
      });

      return {
        source: sourceDest.source,
        dest: sourceDest.dest,
        maps: mappings,
      };
    })
    .slice(1);

  groupedMaps.reverse();
  // console.log(groupedMaps[0]);

  const whenToStop = groupedMaps[0].maps.reduce(
    (acc, map) => (map.in > acc ? map.in : acc),
    groupedMaps[0].maps[0].in
  );
  let ii = 0;
  while (ii < whenToStop) {
    let minOutput =
      groupedMaps[0].maps.reduce(
        (acc, map) => (map.out < acc ? map.out : acc),
        groupedMaps[0].maps[0].out
      ) + BigInt(ii);

    //console.log("initial minOutput", minOutput);
    for (let i = 0; i < groupedMaps.length; i++) {
      for (let j = 0; j < groupedMaps[i].maps.length; j++) {
        const min = groupedMaps[i].maps[j].out;
        const max = groupedMaps[i].maps[j].out + groupedMaps[i].maps[j].length; // exclusive
        if (min <= minOutput && max > minOutput) {
          /*console.log(
            "found",
            "from",
            groupedMaps[i].dest,
            "to",
            groupedMaps[i].source,
            min,
            "<",
            minOutput,
            "<",
            max,
            " --> ",
            groupedMaps[i].maps[j].in,
            "+",
            minOutput - min
          );*/
          const diff = minOutput - min;
          minOutput = groupedMaps[i].maps[j].in + diff;
          //console.log("new minOutput", minOutput);
          break;
        }
      }
    }
    if (initialSeeds.includes(minOutput)) {
      console.log("found seed", minOutput);
      break;
    } else ii++;
  }

  // TODO: This is too slow :-(. Need to find a way to reduce the number of seeds.
  /*
  let mappingLowests = [];
  for (let j = 0; j < seedRanges.length; j++) {
    for (
      let k = seedRanges[j].start;
      k < seedRanges[j].start + seedRanges[j].length;
      k++
    ) {
      let lowestOfRangeFound = false;
      const seed = k;
    }
  }
  */
  /*
  let results = [];
  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    const result = grouped.reduce((acc, group) => {
      const selectedMapping = group.maps.filter((mapping) => {
        return acc >= mapping.in && acc < mapping.in + mapping.length;
      });
      selectedMapping.forEach((mapping) => {
        const diff = acc - mapping.in;
        if (acc >= mapping.in && acc <= mapping.in + mapping.length) {
          acc = mapping.out + diff;
          return acc;
        }
      });
      return acc;
    }, seed);
    results.push(result);
  }
  */
  console.log("Part 2");
};

part1();
part2();
