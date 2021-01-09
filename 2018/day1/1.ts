const fs = require("fs");
const data = fs.readFileSync("./day1/input.txt", "utf-8").split("\n");

function chronalCalibration1() {
  let total = 0;
  for (let value of data) {
    total += parseInt(value);
  }
  return total;
}

function chronalCalibration2() {
  let frequencies: number[] = [];
  let currentFrequency = parseInt(data[0]);
  let i = 1;
  while (frequencies.indexOf(currentFrequency) === -1) {
    // push previous
    frequencies.push(currentFrequency);
    // calculate next
    currentFrequency += parseInt(data[i]);
    // update iteration values
    i = (i + 1) % data.length;
  }
  return currentFrequency;
}

console.log(`Part 1: ${chronalCalibration1()}`); // Part 1: 454
console.log(`Part 2: ${chronalCalibration2()}`); // Part 2: 566

export {}