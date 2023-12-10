import {
  canConnect,
  getConnectedCardinals,
  getConnections,
  pipes,
} from "./10.js";

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
console.log(getConnections({ y: 4, x: 4 }, lines4).join("") === "0001");

// Bottom row, connections exist
const lines5 =
  // prettier-ignore
  ["7-F7-", 
   ".FJ|7", 
   "SJLL7", 
   "|F--J", 
   "LJ.LJ"];
console.log(getConnections({ y: 4, x: 3 }, lines5).join("") === "0100");

// No connections
const lines6 =
  // prettier-ignore
  ["7-F7-", 
   ".FJ|7", 
   "SJLL7", 
   "|F-.J", 
   "LJ.L."];
console.log(getConnections({ y: 4, x: 3 }, lines6).join("") === "0000");

// Pipe below S, coming from S
const lines7 =
  // prettier-ignore
  ["7-F7-", 
   ".FJ|7", 
   "SJLL7", 
   "|F--J", 
   "LJ.LJ"];
console.log(
  getConnectedCardinals({ y: 3, x: 0 }, "N", lines7).join("") === "S"
);

const lines8 =
  // prettier-ignore
  ["7L7-F7F",
     "L7L7|||",
     "7L7S|||",
     "JFJ|||L"];
console.log(
  getConnectedCardinals({ y: 1, x: 3 }, "W", lines8).join("") === "S"
);
