const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "./input.txt");

function runReportRepair() {
  fs.readFile(inputPath, (err: any, file: any) => {
    if (err) return err;
    const numberArray = file.toString().split("\n");
    console.log(numberArray)
    const number = reportRepair(numberArray);
    console.log(number)

  })
}

function reportRepair(numbers: string[]): number {
  const goalSum = 2020;
  let number1: number;
  let number2: number;
  let number3: number;
  for (let i = 0; i < numbers.length-3; i++) {
    number1 = parseInt(numbers[i]);
    for (let j = 1; j < numbers.length-2; j++) {
      number2 = parseInt(numbers[j]);
      for (let k = 2; k< numbers.length-1; k++) {
        number3 = parseInt(numbers[k]);
        if (number1 + number2 + number3 === goalSum) {
          console.log(number1, number2, number3)
          return number1 * number2 * number3;
        }
      }

    }
  }
  return -1;
}

runReportRepair();