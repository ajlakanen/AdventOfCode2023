import { canConnect, checkConnections, pipes } from "./10.js";

const pipe1 = "L";
const from1 = "N";
console.log(canConnect(pipe1, from1) === true);

const pipe2 = "L";
const from2 = "W";
console.log(canConnect(pipe2, from2) === false);

const pipes1 = ["L", "7", "J", "F"];
console.log(pipes1.map((pipe) => pipes[pipe]));
