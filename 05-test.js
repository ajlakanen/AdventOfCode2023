// [<---MAP--->]
//     [<---VALUES--->]
// or
// [<---MAP--->]
// [<---VALUES--->]
// The map starts before the value range start (or exactly at the start)
// and ends before the value range ends
const test1 = (map, valueRange) => {
  return (
    map.in <= valueRange.start &&
    map.in + map.length > valueRange.start &&
    map.in + map.length <= valueRange.start + valueRange.length
  );
};

// [<---MAP--->]
//     [<---VALUES--->]
// or
// [<---MAP--->]
// [<---VALUES--->]
// The map starts before the value range start (or exactly at the start)
// and ends before the value range ends
const test2 = (map, valueRange) => {
  return (
    map.in <= valueRange.start &&
    map.in + map.length > valueRange.start &&
    map.in + map.length < valueRange.start + valueRange.length
  );
};

//       [<---MAP--->]
// [<---VALUES--->]
// or
//    [<---MAP--->]
// [<---VALUES--->]
// The map starts after the value range starts and ends after the value range ends
const test3 = (map, valueRange) => {
  return (
    map.in > valueRange.start &&
    map.in < valueRange.start + valueRange.length &&
    map.in + map.length >= valueRange.start + valueRange.length
  );
};

//
// [<--MAP-->]
//             [<--VALUES-->]
// or
//                 [<--MAP-->]
// [<--VALUES-->]
// The value range is out of the map range
const test4 = (map, valueRange) => {
  return (
    map.in > valueRange.start + valueRange.length ||
    map.in + map.length <= valueRange.start
  );
};

//     [<----MAP---->]
// [<-----VALUES------->]
// The map starts after the value range starts and ends before the value range ends
const test5 = (map, valueRange) => {
  return (
    map.in > valueRange.start &&
    map.in + map.length < valueRange.start + valueRange.length
  );
};

// Test 1
const map1 = { in: 0, length: 10, out: 15 };
const valueRange1 = { start: 5, length: 10 };
console.log(test1(map1, valueRange1) === true);

const map2 = { in: 0, length: 5, out: 15 };
const valueRange2 = { start: 0, length: 10 };
console.log(test1(map2, valueRange2) === true);

const map3 = { in: 0, length: 5, out: 15 };
const valueRange3 = { start: 0, length: 5 };
console.log(test1(map3, valueRange3) === true);

// Test 2
const map4 = { in: 0, length: 5, out: 15 };
const valueRange4 = { start: 4, length: 5 };

console.log(test2(map4, valueRange4) === true);
const map5 = { in: 0, length: 5, out: 15 };
const valueRange5 = { start: 0, length: 4 };
console.log(test2(map5, valueRange5) === false);

// Test 3

// Test 4
const map6 = { in: 0, length: 5, out: 15 };
const valueRange6 = { start: 1, length: 3 };
console.log(test4(map6, valueRange6) === false);

const map7 = { in: 0, length: 5, out: 15 };
const valueRange7 = { start: 4, length: 5 };
console.log(test4(map7, valueRange7) === false);

const map8 = { in: 0, length: 5, out: 15 };
const valueRange8 = { start: 5, length: 5 };
console.log(test4(map8, valueRange8) === true);
