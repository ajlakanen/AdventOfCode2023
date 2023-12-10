import { checkDirection } from "./10.js";

const pipe1 = { char: "L", connects: ["N", "E"] };
const from1 = "N";
console.log(checkDirection(pipe1, from1) === true);

const pipe2 = { char: "L", connects: ["N", "E"] };
const from2 = "W";
console.log(checkDirection(pipe2, from2) === false);
