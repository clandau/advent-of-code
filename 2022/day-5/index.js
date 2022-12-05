import { parseData } from "../helpers.js";

const data = parseData("day-5/input.txt", "\n\n");

function create2dCrateArray(rawArray) {
  const numbers = rawArray.pop().split("");
  const indexHolder = numbers.reduce((indices, currVal, currIdx) => {
    if (currVal !== " ") {
      indices.push(currIdx);
    }
    return indices;
  }, []);

  const crates = new Array(indexHolder.length);

  rawArray.reverse().forEach((level, i) => {
    indexHolder.forEach((locationIndex, j) => {
      if (level[locationIndex] !== " ") {
        if (!crates[j]) {
          crates[j] = [level[locationIndex]];
        } else {
          crates[j][i] = level[locationIndex];
        }
      }
    });
  });

  return crates;
}

function puzzle1(data) {
  const crateLocations = create2dCrateArray(data[0].split("\n"));
  const moves = data[1].split("\n");

  for (const move of moves) {
    const moveDirections = move.split(" ");
    let quantity = parseInt(moveDirections[1]);
    const startIndex = parseInt(moveDirections[3]) - 1;
    const endIndex = parseInt(moveDirections[5]) - 1;

    const movingCrates = crateLocations[startIndex].splice(-quantity).reverse();
    crateLocations[endIndex] = crateLocations[endIndex].concat(movingCrates);
  }
  return crateLocations.reduce((str, cur) => (str += cur[cur.length - 1]), "");
}

function puzzle2(data) {
  const crateLocations = create2dCrateArray(data[0].split("\n"));
  const moves = data[1].split("\n");

  for (const move of moves) {
    const moveDirections = move.split(" ");
    let quantity = parseInt(moveDirections[1]);
    const startIndex = parseInt(moveDirections[3]) - 1;
    const endIndex = parseInt(moveDirections[5]) - 1;

    const movingCrates = crateLocations[startIndex].splice(-quantity);
    crateLocations[endIndex] = crateLocations[endIndex].concat(movingCrates);
  }

  return crateLocations.reduce((str, cur) => (str += cur[cur.length - 1]), "");
}

console.log(`Puzzle 1: ${puzzle1(data)}`);
console.log(`Puzzle 2: ${puzzle2(data)}`);
