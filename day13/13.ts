const fs = require("fs");
const data = fs.readFileSync("./day13/input.txt", "utf-8").split("\n");
const earliestTime = parseInt(data[0]);
const busIds = data[1].split(",").map((x: string) => parseInt(x));

function shuttleSearch1(earliest: number, busIds: number[]) {
  let shortestTime: number[] = [0, Infinity];
  for (let i = 0; i < busIds.length; i++) {
    if (!isNaN(busIds[i])) {
      const nextTime = earliest - (earliest % busIds[i]) + busIds[i];
      if (shortestTime[1] > nextTime) {
        shortestTime = [busIds[i], nextTime];
      }
    }
  }
  return shortestTime[0] * (shortestTime[1] - earliest);
}

function shuttleSearch2(busIds: number[]) {
  let time = busIds[0];
  let step = busIds[0];

  for (let i = 1; i < busIds.length; i++) {
    if (!isNaN(busIds[i])) {
      while ((time + i) % busIds[i] !== 0) {
        time += step;
      }
      step = step * busIds[i];
    }
  }
  return time;
}

function isMultiple(busId: number, currentTime: number) {
  // determines whether a number is a mulitple of the bus id
  return currentTime % busId === 0;
}

console.log(`Part 1: ${shuttleSearch1(earliestTime, busIds)}`); // Part 1: 1835
console.log(`Part 2: ${shuttleSearch2(busIds)}`); // Part 2: 247086664214628

export {};
