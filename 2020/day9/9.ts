const fs = require("fs");
const testData = fs.readFileSync("./day9/testInput.txt", "utf-8").split("\n");
const data = fs.readFileSync("./day9/input.txt", "utf-8").split("\n");
const preambleLength = 25;

function encodingError1(data: string[]) {
  let currentStart = 0;
  let currentI = preambleLength;
  let preambleNumbers = data.slice(currentStart, preambleLength);
  let currentNumber = parseInt(data[preambleLength]);
  
  while (currentI < data.length) {
    let foundValid = false;
    for (let i = 0; i < preambleNumbers.length - 1; i++) {
      loop1:
      for (let j = 1; j < preambleNumbers.length; j++) {
        if (parseInt(preambleNumbers[i])+ parseInt(preambleNumbers[j]) === currentNumber) {
          foundValid = true;
          break loop1;
        }
      }
    }
    if (!foundValid) {
      return data[currentI];
    } else {
      preambleNumbers = data.slice(++currentStart, ++currentI);
      currentNumber = parseInt(data[currentI]);
    }
  }
}

function encodingError2(data: string[], invalidNumber: number) {
  let pointLeft = 0;
  let pointRight = 1;
  let currentSum = parseInt(data[pointLeft]) + parseInt(data[pointRight]);

  while (pointLeft <= pointRight && pointRight <= data.length) {
    if (currentSum === invalidNumber) {
      return sumSmallestAndLargest(data, pointLeft, pointRight);
    }
    while (currentSum < invalidNumber && pointRight < data.length) {
      pointRight++;
      currentSum += parseInt(data[pointRight]);
    }
  
    while (currentSum > invalidNumber && pointLeft < pointRight) {
      currentSum -= parseInt(data[pointLeft]);
      pointLeft++;
    }
  
    while (pointLeft === pointRight && currentSum > invalidNumber) {
      pointLeft++;
      currentSum = parseInt(data[pointLeft]);
      pointRight = pointLeft;
    }
  }
}

const sumSmallestAndLargest = (data: string[], start: number, end: number) => {
  let smallest = parseInt(data[start]);
  let largest = parseInt(data[start]);
  for (let i = start; i <= end; i++) {
    const currentNum = parseInt(data[i])
    if (currentNum < smallest) {
      smallest = currentNum;
    } else if (currentNum > largest) {
      largest = currentNum;
    }
  }
  return smallest + largest;
}

// console.log(`Part 1: ${encodingError1(data)}`)  // Part 1: 14144619
const part1answer = 14144619;
console.log(`Part 2: ${encodingError2(data, part1answer)}`) // Part 2: 1766397

export {}