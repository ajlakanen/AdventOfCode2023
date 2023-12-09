const f = require("fs");

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/05-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  const parseSeeds = (line) => {
    const rawSeeds = line
      .split(": ")[1]
      .split(" ")
      .map((l) => parseInt(l));
    return rawSeeds.reduce((acc, seed, index) => {
      if (index % 2 === 0) {
        acc.push({
          start: rawSeeds[index],
          length: rawSeeds[index + 1],
        });
      }
      return acc;
    }, []);
  };

  const seeds = parseSeeds(lines[0]);
  console.log(seeds);

  let mapGroups = [];
  let currentMaps = [];
  // Maps start at line 2
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
      mapGroups.push(currentMaps);
      currentMaps = [];
      continue;
    }
    if (line.includes(":")) continue;
    const [output, input, length] = line.split(" ").map((l) => parseInt(l));
    currentMaps.push({ output, input, length });
  }
  //console.log(mapGroups);

  // for each seedRange
  //   for each mapGroup
  //     for each map
  //       if map.input is in seedRange
  //         apply map to seedRange

  // [<--MAP-->]
  //             [<--VALUES-->]
  // or
  //                [<--MAP-->]
  // [<--VALUES-->]
  // Value range is completely out of the map range
  const valuesOutOfMap = (values, map) => {
    return (
      map.input > values.start + values.length - 1 ||
      map.input + map.length <= values.start
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
      map.input <= values.start &&
      map.input + map.length >= values.start + values.length
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
      map.input <= values.start &&
      map.input + map.length > values.start &&
      map.input + map.length < values.start + values.length
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
      map.input > values.start &&
      map.input < values.start + values.length &&
      map.input + map.length >= values.start + values.length
    );
  };

  //     [<----MAP---->]
  // [<-----VALUES------->]
  // The map starts after the value range starts and ends before the value range ends
  const mapWithinValues = (values, map) => {
    return (
      map.input > values.start &&
      map.input + map.length < values.start + values.length
    );
  };

  const applyMap = (values, map) => {
    if (valuesOutOfMap(values, map)) return { unmapped: [values] };
    if (valuesWithinMap(values, map)) {
      return {
        mapped: [
          {
            start: map.output,
            length: map.length,
          },
        ],
      };
    }

    if (mapStartsBeforeValues(values, map)) {
      const diff = values.start - map.input;
      const headlength = map.length - diff;
      return {
        mapped: [
          {
            start: map.output + diff,
            length: headlength,
          },
        ],
        unmapped: [
          {
            start: map.input + map.length,
            length: values.length - headlength,
          },
        ],
      };
    }

    if (valuesPartlyWithinMap(values, map)) {
      const diff = map.input - values.start;
      return {
        unmapped: [
          {
            start: values.start,
            length: diff,
          },
        ],
        mapped: [
          {
            start: map.output,
            length: values.length - diff,
          },
        ],
      };
    }

    //     [<----MAP---->]
    // [<-----VALUES------->]
    if (mapWithinValues(values, map)) {
      const diff = map.input - values.start;

      return {
        unmapped: [
          {
            start: values.start,
            length: diff,
          },
          {
            start: map.input,
            length: values.length - diff,
          },
        ],
      };
    }
  };

  for (let i = 0; i < seeds.length; i++) {
    const seedRange = seeds[i];

    for (let j = 0; j < mapGroups.length; j++) {
      const mapGroup = mapGroups[j];

      let k = 0;
      while (k < mapGroup.length) {
        const map = mapGroup[k];
        const result = applyMap(seedRange, map);
        console.log(result);
        //return;
        // apply map to seedRange if necessary
        // const newSeed = {
        //   start: map.output,
        //   length: map.length,
        // };
        // seeds.push(newSeed);
        k++;
      }
    }
  }
};

part2();
