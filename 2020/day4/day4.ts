const fs = require("fs");
type PassportItems = {
  byr: boolean;
  iyr: boolean;
  eyr: boolean;
  hgt: boolean;
  hcl: boolean;
  ecl: boolean;
  pid: boolean;
};

type PassportItemValues = keyof PassportItems;

const data: string[] = fs
  .readFileSync("./day4/input.txt", "utf-8")
  .split("\n\n");
const actualExpectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

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

function countValidPassports2(input: string[]) {
  let totalInvalidPassports = 0;
  for (let passport of input) {
    const fieldsArray = passport.split(/\s/g);
    let countFields = 0;
    for (let i of fieldsArray) {
      const inputs = i.split(":")
      const start = <PassportItemValues>inputs[0];
      const value = inputs[1];
      if (actualExpectedFields.indexOf(start) !== -1 && isValidData(start, value)) {
        countFields++;
      }
    }
    if (countFields < actualExpectedFields.length) {
      totalInvalidPassports++;
    }
  }
  return input.length - totalInvalidPassports;
}

function isValidData(item: PassportItemValues, value: string): boolean {
  const passportItems: PassportItems = {
    byr: validNumberRange(parseInt(value), 1920, 2002),
    iyr: validNumberRange(parseInt(value), 2010, 2020),
    eyr: validNumberRange(parseInt(value), 2020, 2030),
    hgt: validHeight(value),
    hcl: value.length === 7 && validHairColor(value),
    ecl: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
    pid: value.length === 9 && isNumber(value),
  };

  return passportItems[item];
}

function validNumberRange(val: number, min: number, max: number) {
  return val >= min && val <= max;
}

function validHeight(hgt: string) {
  const units = hgt.slice(-2);
  const value = hgt.slice(0, -2);
  if (["cm", "in"].includes(units)) {
    if (units === "cm") {
      // cm 150 and at most 193
      return validNumberRange(parseInt(value), 150, 193);
    } else if (units === "in") {
      // in at least 59 and at most 76
      return validNumberRange(parseInt(value), 59, 76);
    }
  }
  return false;
}

function validHairColor(color: string) {
  const regex = /^#([0-9a-f])*$/g;
  return regex.test(color);
}

function isNumber(val: string) {
  const allNumberRegex = /^([0-9])*$/g;
  return allNumberRegex.test(val);
}

console.log(countValidPassports(data)); // 233
console.log(countValidPassports2(data)); // 111

export {};
