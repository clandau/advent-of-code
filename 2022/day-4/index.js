import { parseData } from "../helpers.js";

const data = parseData("day-4/input.txt");

function puzzle1(pairGroups) {
  let total = 0;
  for (const pairs of pairGroups) {
    const pair = pairs.split(',');
    const pair1 = pair[0].split('-').map(v => parseInt(v));
    const pair2 = pair[1].split('-').map(v => parseInt(v));
    
    if ((pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) || (pair2[0] >= pair1[0] && pair2[1] <= pair1[1])) {
      total++;
    }
  }
  return total;
}

function puzzle2(pairGroups) {
  let total = 0;
  for (const pairs of pairGroups) {
    const holderArray = [];
    const pair = pairs.split(/[,-]+/).map(v => parseInt(v));
    let i = pair[0];

    while (i <= pair[1]) {
      holderArray[i] = 'X';
      i++;
    }

    i = pair[2];
    let overlapped = false;

    while (i <= pair[3] && !overlapped) {
      if (holderArray[i] === 'X') {
        overlapped = true;
        total++;
      }
      i++;
    }
  }
  return total;
}

console.log(`Puzzle 1: ${puzzle1(data)}`);
console.log(`Puzzle 2: ${puzzle2(data)}`);