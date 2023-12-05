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
      return parseInt(seed);
    });
  // console.log(initialSeeds);

  const seedRanges = initialSeeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
      acc.push({ start: seed, length: initialSeeds[index + 1] });
    }
    return acc;
  }, []);

  console.log("seedRanges", seedRanges);

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

  //console.log("groupedMaps", groupedMaps);

  /**
   * Apply mappings to value ranges
   * @param {Array} valueRanges Start of the range and length of the range
   * @param {Array} mapRanges Mappings from source to dest
   * @returns
   */
  const applyRanges = (valueRanges, mapRanges) => {
    {
      const newValueRanges = valueRanges.map((valueRange) => {
        const currentMapRanges = mapRanges.filter((mapRange) => {
          /*if (
            valueRange.start >= mapRange.in &&
            valueRange.start + valueRange.length > mapRange.in + mapRange.length
          ) {
            console.log(
              "Value range was partly within the map range",
              valueRange,
              mapRange
            );
            return;
          }
          return (
            valueRange.start >= mapRange.in &&
            valueRange.start < mapRange.in + mapRange.length
          );*/
          return (
            (valueRange.start >= mapRange.in &&
              valueRange.start < mapRange.in + mapRange.length) ||
            (valueRange.start + valueRange.length > mapRange.in &&
              valueRange.start + valueRange.length <=
                mapRange.in + mapRange.length)
          );
        });
        //console.log("valueRange", valueRange);

        if (currentMapRanges.length === 0) {
          console.log("No map range found for value range", valueRange);
          return valueRange;
        }
        console.log("currentMapRanges", currentMapRanges);

        const diff = valueRange.start - currentMapRanges.start;
        return {
          start: currentMapRanges.out + diff,
          length: valueRange.length,
        };
      });
      return newValueRanges;
    }
  };

  const applyMappings = (valueRanges, mappings) => {
    let newValueRanges = valueRanges;
    for (let i = 0; i < mappings.length; i++) {
      const mapping = mappings[i].maps;
      newValueRanges = applyRanges(newValueRanges, mapping);
    }
    return newValueRanges;
  };

  const newMappings = applyMappings(seedRanges, groupedMaps);
  console.log("newMappings", newMappings);

  // let ii = 0;
  // while (ii < whenToStop) {
  //   let minOutput =
  //     groupedMaps[0].maps.reduce(
  //       (acc, map) => (map.out < acc ? map.out : acc),
  //       groupedMaps[0].maps[0].out
  //     ) + BigInt(ii);

  // let min = 9999999999999999999999;
  // for (let k = 0; k < groupedMaps[0].maps.length; k++) {
  //   // groupedMaps[0].maps.forEach((firstMap) => {
  //   const firstMap = groupedMaps[0].maps[k];
  //   let ii = 0;
  //
  //   console.log("firstmap", firstMap);
  //   console.log("firstmap.length", firstMap.length);
  //   while (ii < firstMap.length) {
  //     const initialOutput = firstMap.out + BigInt(ii);
  //     let minOutput = firstMap.out + BigInt(ii);
  //     // if (ii % 100000 === 0)
  //     //   console.log(
  //     //     "initial minOutput",
  //     //     minOutput,
  //     //     firstMap.out,
  //     //     ii,
  //     //     firstMap.length
  //     //   );
  //     for (let i = 0; i < groupedMaps.length; i++) {
  //       // console.log("i", i);
  //       for (let j = 0; j < groupedMaps[i].maps.length; j++) {
  //         // console.log("j", j);
  //         // is minOutput in the range of the current map?
  //         const min = groupedMaps[i].maps[j].out;
  //         const max =
  //           groupedMaps[i].maps[j].out + groupedMaps[i].maps[j].length; // exclusive end
  //         if (min <= minOutput && max > minOutput) {
  //           /*console.log(
  //           "found",
  //           "from",
  //           groupedMaps[i].dest,
  //           "to",
  //           groupedMaps[i].source,
  //           min,
  //           "<",
  //           minOutput,
  //           "<",
  //           max,
  //           " --> ",
  //           groupedMaps[i].maps[j].in,
  //           "+",
  //           minOutput - min
  //         );*/
  //           const diff = minOutput - min;
  //           minOutput = groupedMaps[i].maps[j].in + diff;
  //           //console.log("new minOutput", minOutput);
  //           break;
  //         }
  //       }
  //     }
  //     //if (initialSeeds.includes(minOutput)) {
  //     initialSeeds.reduce((acc, seed, index) => {
  //       if (index % 2 === 0) {
  //         if (minOutput >= seed && minOutput < seed + initialSeeds[index + 1]) {
  //           if (minOutput < min) {
  //             min = minOutput;
  //             console.log("found seed", minOutput, "output", initialOutput);
  //           }
  //           return;
  //         }
  //       }
  //       return acc;
  //     });
  //
  //     //}
  //     ii++;
  //   }
  // }

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
