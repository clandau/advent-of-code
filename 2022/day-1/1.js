import { parseData } from "../index.js";

const data = parseData('day-1/input.txt');

function puzzle1(input) {
  let maxCals = 0;
  let currentElfCals = 0;

  for (const item of input) {
    if (item === "") {
      if (currentElfCals > maxCals) {
        maxCals = currentElfCals;
      }
      currentElfCals = 0;
    } else {
      currentElfCals += parseInt(item);
    }
  }

  return currentElfCals > maxCals ? currentElfCals : maxCals;
}

function puzzle2(input) {
  const MAX_ARRAY_LENGTH = 3;
  let top3cals = [];
  let currentElfCals = 0;

  for (const item of input) {
    if (item === "") {
      if (
        top3cals.length < MAX_ARRAY_LENGTH ||
        currentElfCals > top3cals[MAX_ARRAY_LENGTH - 1]
      ) {
        top3cals = processMaxCalArray([...top3cals], currentElfCals);
      }
      currentElfCals = 0;
    } else {
      currentElfCals += parseInt(item);
    }
  }
  if (currentElfCals > top3cals[MAX_ARRAY_LENGTH - 1]) {
    top3cals = processMaxCalArray(top3cals, currentElfCals);
  }

  return top3cals.reduce((acc, cur) => (acc += cur), 0);
}

function processMaxCalArray(top3, value) {
  const newVals = [...top3, value];
  let i = newVals.length - 2;
  let current = newVals[i + 1];

  while (i >= 0 && current > newVals[i]) {
    const temp = newVals[i];
    newVals[i] = current;
    newVals[i + 1] = temp;
    current = newVals[i];

    i--;
  }

  return newVals.slice(0, 3);
}

console.log(`Puzzle 1: ${puzzle1(data)}`);
console.log(`Puzzle 2: ${puzzle2(data)}`);
