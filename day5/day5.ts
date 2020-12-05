const fs = require("fs");

const data: string[] = fs.readFileSync("./day5/input.txt", "utf-8").split("\n");

function binaryBoardingPart1(boardingPasses: string[]): number {
  let highest = -1;
  for (let pass of boardingPasses) {
    const seatNumber = findSeat(pass);
    seatNumber > highest ? (highest = seatNumber) : null;
  }
  return highest;
}

function binaryBoardingPart2(boardingPasses: string[]): number {
  let passes = [];
  for (let pass of boardingPasses) {
    passes.push(findSeat(pass));
  }
  passes.sort((a, b) => a - b);
  for (let i = 1; i < passes.length; i++) {
    if (passes[i] - passes[i - 1] !== 1) {
      return passes[i] - 1;
    }
  }
  return -1;
}

function findSeat(seatAssignment: string) {
  const rowDirections = seatAssignment.slice(0, 7);
  const columnDirections = seatAssignment.slice(-3);

  const row = seatNumber(rowDirections, "F", "B", 128);
  const column = seatNumber(columnDirections, "L", "R", 8);

  return row * 8 + column;
}

function seatNumber(
  directions: string,
  lowerValue: string,
  upperValue: string,
  total: number
): number {
  let start = 0;
  let end = total;
  let current = Math.floor((start + end) / 2);
  for (let direction of directions) {
    if (direction === lowerValue) {
      end = current;
    } else if (direction === upperValue) {
      start = current;
    }
    current = Math.floor((start + end) / 2);
  }
  return current;
}

console.log(binaryBoardingPart1(data)); // 996
console.log(binaryBoardingPart2(data)); // 996

export {};
