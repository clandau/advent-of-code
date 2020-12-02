const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "./input.txt");

function runReportRepair() {
  fs.readFile(inputPath, (err: any, file: any) => {
    if (err) return err;
    const numberArray = file.toString().split("\n");
    const product1 = reportRepair1(numberArray);
    const product2 = reportRepair2(numberArray);
    console.log(`Part 1: ${product1}`);
    console.log(`Part 2: ${product2}`);
  });
}

function reportRepair1(numbers: string[]): number {
  const goalSum = 2020;
  let number1: number;
  let number2: number;
  for (let i = 0; i < numbers.length - 3; i++) {
    number1 = parseInt(numbers[i]);
    for (let j = 1; j < numbers.length - 2; j++) {
      number2 = parseInt(numbers[j]);
      if (number1 + number2 === goalSum) {
        return number1 * number2;
      }
    }
  }
  return -1;
}

function reportRepair2(numbers: string[]): number {
  const goalSum = 2020;
  let number1: number;
  let number2: number;
  let number3: number;
  for (let i = 0; i < numbers.length - 3; i++) {
    number1 = parseInt(numbers[i]);
    for (let j = 1; j < numbers.length - 2; j++) {
      number2 = parseInt(numbers[j]);
      for (let k = 2; k < numbers.length - 1; k++) {
        number3 = parseInt(numbers[k]);
        if (number1 + number2 + number3 === goalSum) {
          return number1 * number2 * number3;
        }
      }
    }
  }
  return -1;
}

runReportRepair();
// Part 1: 1007331
// Part 2: 48914340