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

function rainRisk2(directions: string[]) {
  let shipLocation: location = { NS: 0, EW: 0 };
  let waypointLocation: location = { NS: 1, EW: 10 };


  const instructions = {
    N: (v: number) => {
      waypointLocation.NS = waypointLocation.NS + v;
    },
    S: (v: number) => {
      waypointLocation.NS = waypointLocation.NS - v;
    },
    E: (v: number) => {
      waypointLocation.EW = waypointLocation.EW + v;
    },
    W: (v: number) => {
      waypointLocation.EW = waypointLocation.EW - v;
    },
    L: (v: number) => {
      let numberOfMoves = (360 - v) / 90;
      let northSouth = waypointLocation.NS;
      let eastWest = waypointLocation.EW;
      while (numberOfMoves > 0) {
        let temp = northSouth;
        northSouth = -eastWest;
        eastWest = temp;
        numberOfMoves--;
      }
      waypointLocation.EW = eastWest;
      waypointLocation.NS = northSouth;
    },
    R: (v: number) => {
      let numberOfMoves = v / 90;
      let northSouth = waypointLocation.NS;
      let eastWest = waypointLocation.EW;
      while (numberOfMoves > 0) {
        let temp = northSouth;
        northSouth = -eastWest;
        eastWest = temp;
        numberOfMoves--;
      }
      waypointLocation.EW = eastWest;
      waypointLocation.NS = northSouth;
    },
    F: (v: number) => {
      const ns = waypointLocation.NS * v;
      const ew = waypointLocation.EW * v;
      shipLocation.NS += ns;
      shipLocation.EW += ew;
    },
  };

  for (let direction of directions) {
    const instruction = <direction | instruction>direction[0];
    const value = <number | directionValue>parseInt(direction.slice(1));
    instructions[instruction](value);
  }
  return Math.abs(shipLocation.NS) + Math.abs(shipLocation.EW);
}

console.log(`Part 1: ${rainRisk1(data)}`); // Part 1: 1294
console.log(`Part 2: ${rainRisk2(data)}`); // Part 2: 20592

export {};
