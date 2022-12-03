import { parseData } from "../helpers.js";

const data = parseData("day-1/input.txt");

function puzzle1(data) {
  return data.reduce((total, current, i) => {
    const currentDepth = parseInt(current);
    const previousDepth = i > 0 ? parseInt(data[i - 1]) : Infinity;

    return currentDepth > previousDepth ? ++total : total;
  }, 0);
}

function puzzle2(data) {
  let i = 0;
  let total = 0;
  let priorSum = Infinity;
  let currentSum;

  while (i < data.length - 2) {
    currentSum = parseInt(data[i]) + parseInt(data[i + 1]) + parseInt(data[i + 2])
    console.log(priorSum, currentSum, total)
    if (currentSum > priorSum) {
      total++;
    };
    priorSum = currentSum;
    i++;
  }

  return total;
}

// console.log(puzzle1(data));
console.log(puzzle2(data));
