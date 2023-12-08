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

  let initialSeeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => {
      return parseInt(seed);
    });
  initialSeeds = initialSeeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
      acc.push({ start: initialSeeds[index], length: initialSeeds[index + 1] });
    }
    return acc;
  }, []);

  const mapGroups = groupBy(lines, "")
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

  // [<--MAP-->]
  //             [<--VALUES-->]
  // or
  //                [<--MAP-->]
  // [<--VALUES-->]
  // Value range is completely out of the map range
  const valuesOutOfMap = (values, map) => {
    return (
      map.in > values.start + values.length - 1 ||
      map.in + map.length <= values.start
    );
  };

  // [<---MAP------>]
  // [<---VALUES--->]
  // or
  // [<-------MAP------->]
  //   [<---VALUES--->]
  // The value range is completely within the map range
  const valuesWithinMap = (values, map) => {
    return (
      map.in <= values.start &&
      map.in + map.length >= values.start + values.length
    );
  };

  // [<---MAP--->]
  //     [<---VALUES--->]
  // or
  // [<---MAP--->]
  // [<---VALUES--->]
  // The map starts before the value range start (or exactly at the start)
  // and ends before the value range ends
  const mapStartsBeforeValues = (values, map) => {
    return (
      map.in <= values.start &&
      map.in + map.length > values.start &&
      map.in + map.length < values.start + values.length
    );
  };

  //       [<---MAP--->]
  // [<---VALUES--->]
  // or
  //    [<---MAP--->]
  // [<---VALUES--->]
  // Values start before map, but end before (or at) map ends
  const valuesPartlyWithinMap = (values, map) => {
    return (
      map.in > values.start &&
      map.in < values.start + values.length &&
      map.in + map.length >= values.start + values.length
    );
  };

  //     [<----MAP---->]
  // [<-----VALUES------->]
  // The map starts after the value range starts and ends before the value range ends
  const mapeWithinValues = (values, map) => {
    return (
      map.in > values.start &&
      map.in + map.length < values.start + values.length
    );
  };

  /**
   * This is the core of the solution. It maps the value range to the minimum
   * value range. It does this by iterating through the map groups and
   * recursively calling itself until it reaches the end of the map groups.
   * @param {Object} values Value range to map
   * @param {Array} mapGroups Map groups to map the value range
   * @returns {Object} The mapped value range
   */
  const mapRangeMin = (values, mapGroups) => {
    if (mapGroups.length === 0) {
      // Reached the end of the map groups
      return values;
    }
    const nextMaps = mapGroups[0].maps.sort((a, b) => a.out - b.out);
    // console.log("nextMaps", nextMaps);

    // Get the tail of the map groups
    const [headOfMapGroups, ...tailOfMapGroups] = mapGroups;

    for (let i = 0; i < nextMaps.length; i++) {
      const map = nextMaps[i];
      if (valuesOutOfMap(values, map)) continue;

      if (valuesWithinMap(values, map)) {
        const diff = values.start - map.in;
        return mapRangeMin(
          {
            start: map.out + diff,
            length: values.length,
          },
          tailOfMapGroups
        );
      }

      if (mapStartsBeforeValues(values, map)) {
        const diff = values.start - map.in;
        const head = mapRangeMin(
          {
            start: map.out + diff,
            length: map.length - diff,
          },
          tailOfMapGroups
        );

        const tail = mapRangeMin(
          {
            start: values.start + map.length - diff,
            length: values.length - head.length,
          },
          mapGroups
        );
        return head.start < tail.start ? head : tail;
      }

      if (valuesPartlyWithinMap(values, map)) {
        const diff = map.in - values.start;
        const head = mapRangeMin(
          {
            start: values.start,
            length: diff,
          },
          mapGroups
        );
        const tail = mapRangeMin(
          {
            start: map.out,
            length: values.length - head.length,
          },
          tailOfMapGroups
        );
        return head.start < tail.start ? head : tail;
      }

      //     [<----MAP---->]
      // [<-----VALUES------->]
      if (mapeWithinValues(values, map)) {
        const diff = map.in - values.start;
        const head = mapRangeMin(
          {
            start: values.start,
            length: diff,
          },
          mapGroups
        );

        const tail = mapRangeMin(
          {
            start: map.in,
            length: values.length - head.length,
          },
          mapGroups
        );
        return head.start < tail.start ? head : tail;
      }
    }

    // Value range is not in any of the map ranges
    return mapRangeMin(values, tailOfMapGroups);
  };

  let min = mapRangeMin(initialSeeds[0], mapGroups);
  console.log(min);
  for (let i = 1; i < initialSeeds.length; i++) {
    const seed = initialSeeds[i];
    const mapped = mapRangeMin(seed, mapGroups);
    console.log(mapped);
    if (mapped.start < min.start) {
      min = mapped;
    }
  }
  // The minimum is 0 but the actual minimum is the start of the fourth map.
  // WHY???

  // console.log("Part 2", min);
};

part1();
part2();
