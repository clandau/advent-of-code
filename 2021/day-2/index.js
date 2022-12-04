import { parseData } from "../helpers.js";

const data = parseData("day-2/input.txt");

function puzzle1(data) {
  const position = [0, 0];
  
  const directions = {
    forward: { offset: 1, index: 0 },
    down: { offset: 1, index: 1 },
    up: { offset: -1, index: 1 },
  }

  for (const item of data) {
    const itemArray = item.split(" ");
    const directionDetails = directions[itemArray[0]];
    const units = itemArray[1];

    position[directionDetails.index] += units * directionDetails.offset;
  }

  return position[0] * position[1];
}

function puzzle2(data) {
  const position = [0, 0]
  let currentAim = 0;

  for (const item of data) {
    const itemArray = item.split(" ");
    const direction = itemArray[0];
    const units = parseInt(itemArray[1]);

    if (direction === 'forward') {
      position[0] += units;
      if (currentAim > 0) {
        position[1] += (currentAim * units);
      }
    } else {
      currentAim += (direction === 'up' ? -(units) : units);
    }
  }

  return position[0] * position[1];
}

console.log(puzzle1(data));
console.log(puzzle2(data));