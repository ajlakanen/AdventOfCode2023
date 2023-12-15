const {
  lines,
  parseSprings,
  parseSprings2,
  isPossibleArrangement,
} = require("./12.js");

//console.log(parseSprings(lines));

const groups = parseSprings(lines);

// console.log(groups[0]);

// prettier-ignore
let springConditions = parseSprings2(["?###???????? 3,2,1"]);
console.log("springConditions", springConditions);
// prettier-ignore
let arrangements1 = 
[".###.##.#...", 
".###.##..#..", 
".###.##...#.", 
".###.##....#", 
".###..##.#..", 
".###..##..#.", 
".###..##...#", 
".###...##.#.", 
".###...##..#", 
".###....##.#"];

// prettier-ignore
let arrangements2 =
[".#####..#...", 
 "####.##..#.."];

arrangements1.map((arrangement) => {
  console.log(isPossibleArrangement(arrangement, springConditions[0].counts));
});

arrangements2.map((arrangement) => {
  console.log(isPossibleArrangement(arrangement, springConditions[0].counts));
});
