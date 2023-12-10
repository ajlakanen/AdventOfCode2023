import { canConnect, checkConnections, pipes } from "./10.js";

const pipe1 = "L";
const from1 = "N";
console.log(canConnect(pipe1, from1) === true);

const pipe2 = "L";
const from2 = "W";
console.log(canConnect(pipe2, from2) === false);

const pipes3 = ["L", "7", "J", "F"];
console.log(pipes3.map((pipe) => pipes[pipe]));

// Bottom right corner, connections exist
const lines4 =
  // prettier-ignore
  ["7-F7-", 
   ".FJ|7", 
   "SJLL7", 
   "|F--J", 
   "LJ.LJ"];
console.log(checkConnections({ y: 4, x: 4 }, lines4).join("") === "0001");

// Bottom row, connections exist
const lines5 =
  // prettier-ignore
  ["7-F7-", 
   ".FJ|7", 
   "SJLL7", 
   "|F--J", 
   "LJ.LJ"];
console.log(checkConnections({ y: 4, x: 3 }, lines5).join("") === "0100");

// No connections
const lines6 =
  // prettier-ignore
  ["7-F7-", 
   ".FJ|7", 
   "SJLL7", 
   "|F-.J", 
   "LJ.L."];
console.log(checkConnections({ y: 4, x: 3 }, lines6).join("") === "0000");
