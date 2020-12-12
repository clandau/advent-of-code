const fs = require("fs");
const testData = fs.readFileSync("./day12/testInput.txt", "utf-8").split("\n");
const data = fs.readFileSync("./day12/input.txt", "utf-8").split("\n");

type location = {
  NS: number;
  EW: number;
};
type directionValue = 90 | 180 | 270 | 360;
type direction = "N" | "S" | "E" | "W";
type instruction = "F" | "R" | "L";

// if turning right, iterate through starting at current
// if left, subtract from 360 and do the same
const directionOrder: direction[] = ["N", "E", "S", "W"];

function rainRisk1(directions: string[]) {
  let currentDirection: direction = "E";
  let currentLocation: location = { NS: 0, EW: 0 };

  const instructions = {
    N: (v: number) => {
      currentLocation.NS = currentLocation.NS + v;
    },
    S: (v: number) => {
      currentLocation.NS = currentLocation.NS - v;
    },
    E: (v: number) => {
      currentLocation.EW = currentLocation.EW + v;
    },
    W: (v: number) => {
      currentLocation.EW = currentLocation.EW - v;
    },
    L: (v: number) => {
      const numberOfMoves = (360 - v) / 90;
      const currentI = directionOrder.indexOf(currentDirection);
      const newI = (currentI + numberOfMoves) % directionOrder.length;
      currentDirection = directionOrder[newI];
    },
    R: (v: number) => {
      const numberOfMoves = v / 90;
      const currentI = directionOrder.indexOf(currentDirection);
      const newI = (currentI + numberOfMoves) % directionOrder.length;
      currentDirection = directionOrder[newI];
    },
    F: (v: number) => {
      instructions[currentDirection](v);
    },
  };

  for (let direction of directions) {
    const instruction = <direction | instruction>direction[0];
    const value = <number | directionValue>parseInt(direction.slice(1));
    instructions[instruction](value);
  }
  return Math.abs(currentLocation.NS) + Math.abs(currentLocation.EW);
}

console.log(`Part 1: ${rainRisk1(data)}`);

export {};
