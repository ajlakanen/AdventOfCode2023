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

  const isValueRangeOutofMapRange = (valueRange, mapRange) => {
    return (
      //valueRange.start >= mapRange.in &&
      //valueRange.start < mapRange.in + mapRange.length
      //valueRange.start >= mapRange.in &&
      //valueRange.start < mapRange.in + mapRange.length
      mapRange.in > valueRange.start + valueRange.length ||
      mapRange.in + mapRange.length < valueRange.start
    );
  };

  /**
   * This is the core of the solution. It maps the value range to the minimum
   * value range. It does this by iterating through the map groups and
   * recursively calling itself until it reaches the end of the map groups.
   * @param {Object} valueRange Value range to map
   * @param {Array} mapGroups Map groups to map the value range
   * @returns {Object} The mapped value range
   */
  const mapRangeMin = (valueRange, mapGroups) => {
    if (mapGroups.length === 0) {
      // Reached the end of the map groups
      return valueRange;
    }
    const nextMaps = mapGroups[0].maps.sort((a, b) => a.in - b.in);

    // Get the tail of the map groups
    const [headOfMapGroups, ...tailOfMapGroups] = mapGroups;

    for (let i = 0; i < nextMaps.length; i++) {
      const map = nextMaps[i];
      if (isValueRangeOutofMapRange(valueRange, map)) continue;

      // [<---MAP------>]
      // [<---VALUES--->]
      // or
      // [<-------MAP------->]
      //   [<---VALUES--->]
      // The value range is completely within the map range
      if (
        map.in <= valueRange.start &&
        map.in + map.length >= valueRange.start + valueRange.length
      ) {
        const diff = valueRange.start - map.in;

        return mapRangeMin(
          {
            start: map.out + diff,
            length: valueRange.length,
          },
          tailOfMapGroups
        );
      }

      // [<---MAP--->]
      //     [<---VALUES--->]
      // or
      // [<---MAP--->]
      // [<---VALUES--->]
      // The map starts before the value range start (or exactly at the start)
      // and ends before the value range ends
      if (
        map.in <= valueRange.start &&
        map.in + map.length > valueRange.start &&
        map.in + map.length < valueRange.start + valueRange.length
      ) {
        const diff = valueRange.start - map.in;
        const head = mapRangeMin(
          {
            start: map.out + diff,
            length: map.length - diff,
          },
          tailOfMapGroups
        );

        const tail = mapRangeMin(
          {
            start: valueRange.start + map.length - diff,
            length: valueRange.length - head.length,
          },
          // tailOfMapGroups
          mapGroups
        );
        return head.start < tail.start ? head : tail;
      }

      //       [<---MAP--->]
      // [<---VALUES--->]
      // or
      //    [<---MAP--->]
      // [<---VALUES--->]
      // The map starts after the value range starts and ends after the value range ends
      if (
        map.in > valueRange.start &&
        map.in < valueRange.start + valueRange.length &&
        map.in + map.length >= valueRange.start + valueRange.length
      ) {
        const diff = map.in - valueRange.start;
        const head = mapRangeMin(
          {
            start: valueRange.start,
            length: diff,
          },
          // tailOfMapGroups
          mapGroups
        );
        const tail = mapRangeMin(
          {
            start: map.out,
            length: valueRange.length - head.length,
          },
          tailOfMapGroups
        );
        return head.start < tail.start ? head : tail;
      }

      //     [<----MAP---->]
      // [<-----VALUES------->]
      // The map starts after the value range starts and ends before the value range ends
      // if (
      //   map.in > valueRange.start &&
      //   map.in + map.length < valueRange.start + valueRange.length
      // ) {
      //   const head = mapRangeMin(
      //     {
      //       start: valueRange.start,
      //       length: map.in - valueRange.start,
      //     },
      //     mapGroups
      //   );
      //
      //   const mid = mapRangeMin(
      //     {
      //       start: map.out,
      //       length: map.length,
      //     },
      //     tailOfMapGroups
      //   );
      //
      //   const tail = mapRangeMin(
      //     {
      //       start: map.in + map.length,
      //       length: valueRange.length - (head.length + mid.length),
      //     },
      //     tailOfMapGroups
      //   );
      //   let minPart = head;
      //   if (mid.start < minPart.start) minPart = mid;
      //   if (tail.start < minPart.start) minPart = tail;
      //   return minPart;
      // }
    }

    // Value range is not in any of the map ranges
    return mapRangeMin(valueRange, tailOfMapGroups);
  };

  const min = initialSeeds.reduce((acc, seed) => {
    const min = mapRangeMin(seed, mapGroups);
    return acc < min.start ? acc : min.start;
  }, initialSeeds[0].start);

  const minMap = initialSeeds.map((seed) => {
    const min = mapRangeMin(seed, mapGroups);
    return min;
  });

  console.log("Part 2", minMap);
  console.log("Part 2", min);
};

part1();
part2();
