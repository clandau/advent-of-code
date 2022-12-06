import { parseData } from "../helpers.js";

const data = parseData("day-6/input.txt");

function noDuplicates(arr) {
  const holder = [];
  for (const char of arr) {
    if (holder.includes(char)) {
      return false;
    }
    holder.push(char);
  }
  return true;
}

function puzzle1(data) {
  const bufferString = [...data][0];
  let start = 0;
  let end = 4;
  let found = false;

  while (!found && end <= bufferString.length) {
    const substringArr = bufferString.substring(start, end).split("");
    found = noDuplicates(substringArr);
    start++;
    end++;
  }
  return end - 1;
}

function puzzle2(data) {
  const bufferString = [...data][0];
  let start = 0;
  let end = 14;
  let found = false;

  while (!found && end <= bufferString.length) {
    const substringArr = bufferString.substring(start, end).split("");
    found = noDuplicates(substringArr);
    start++;
    end++;
  }
  return end - 1;
}

console.log(`Puzzle 1: ${puzzle1(data)}`);
console.log(`Puzzle 2: ${puzzle2(data)}`);
