const fs = require("fs");

const data: string[] = fs
  .readFileSync("./day4/input.txt", "utf-8")
  .split("\n\n");
const expectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
const actualExpectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

console.log(data)

function countValidPassports(input: string[]) {
  let totalInvalidPassports = 0;
  for (let passport of input) {
    const fieldsArray = passport.split(/\s/g);
    let countFields = 0;
    for (let i of fieldsArray) {
      const start = i.split(":")[0];
      if (actualExpectedFields.indexOf(start) !== -1) {
        countFields++;
      }
    }
    if (countFields < actualExpectedFields.length) {
      totalInvalidPassports++;
    }
  }
  return input.length - totalInvalidPassports;
}
console.log(countValidPassports(data)); // 233

export {};
