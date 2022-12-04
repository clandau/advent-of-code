import { parseData } from "../helpers";


function puzzle1() {
  const data = parseData("day-3/input.txt");
  let prioritiesTotal = 0;

  for (const sack of data) {
    const compartment1 = sack.substr(0, sack.length / 2);
    const compartment2 = sack.substr(sack.length / 2).split("");

    let found = false;
    let i = 0;

    while (!found) {
      if (compartment2.indexOf(compartment1[i]) > -1) {
        found = true;
      } else i++;
    }

    const charCode = compartment1[i].charCodeAt(0);
    prioritiesTotal += priorityFromCharCode(charCode);
  }

  return prioritiesTotal;
}

function puzzle2() {
  const data = parseData("day-3/input.txt");
  let prioritiesTotal = 0;

  while (data.length) {
    const currentGroup = data.splice(-3);

    const sack1 = currentGroup[0];
    const sack2 = currentGroup[1].split('');
    const sack3 = currentGroup[2].split('');

    let i = 0;
    let found = false;

    while (!found) {
      if (sack2.indexOf(sack1[i]) > -1 && sack3.indexOf(sack1[i]) > -1) {
        found = true;
      } else i++;
    }

    const charCode = sack1[i].charCodeAt(0);
    prioritiesTotal += priorityFromCharCode(charCode);
  }

  return prioritiesTotal;
}

function priorityFromCharCode(charCode) {
  const upperCaseOffset = 38;
  const lowerCaseOffset = 96;

  const isUpperCase = (code) => code < 91;

  return isUpperCase(charCode)
    ? charCode - upperCaseOffset
    : charCode - lowerCaseOffset;
}

console.log(`Puzzle 1: ${puzzle1()}`);
console.log(`Puzzle 2: ${puzzle2()}`);
