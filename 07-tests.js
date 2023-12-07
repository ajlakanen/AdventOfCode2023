import { getHandType } from "./07.js";

console.log("Test Cases:");
// Tests
console.log(getHandType([14, 14, 14, 14, 14]));
console.log(getHandType([11, 14, 14, 14, 14]));
console.log(getHandType([14, 14, 11, 14, 14]));
console.log(getHandType([14, 14, 11, 11, 14]));
console.log(5 === getHandType([14, 11, 14, 11, 14]));
console.log(5 === getHandType([11, 11, 14, 11, 14]));
console.log(3 === getHandType([10, 11, 14, 11, 14]));
console.log(4 === getHandType([14, 10, 14, 11, 14]));
console.log(2 === getHandType([14, 10, 10, 11, 12]));
console.log(2 === getHandType([14, 10, 11, 10, 12]));
console.log(3 === getHandType([14, 10, 11, 10, 14]));
console.log(3 === getHandType([14, 10, 11, 11, 14]));
console.log(1 === getHandType([14, 10, 9, 11, 8]));
