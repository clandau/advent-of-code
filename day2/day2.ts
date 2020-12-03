import { createSecureContext } from "tls";

const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "./input.txt");

function processData() {
  fs.readFile(inputPath, (err: any, file: any) => {
    if (err) return err;
    const itemArray = file.toString().split("\n");
    console.log(countValid1(itemArray)); // 454 valid
    console.log(countValid2(itemArray)); // 649 valid
  });
}

function countValid1(passwordData: string[]) {
  // for each item, parse into 3 secctions
  let invalid = 0;
  passwordData.forEach((elem) => {
    let itemArray = elem.split(" ");
    const counts = itemArray[0].split("-");
    const lowBound = parseInt(counts[0]);
    const highBound = parseInt(counts[1]);
    const requiredLetter = itemArray[1][0];
    const password = itemArray[2].split("");
    let currentCount = 0;
    for (let char of password) {
      if (char === requiredLetter) {
        currentCount++;
        if (currentCount > highBound) {
          invalid++;
          break;
        }
      }
    }
    if (currentCount < lowBound) invalid++;
  });
  return passwordData.length - invalid;
}

function countValid2(passwordData: string[]) {
  let valid = 0;
  passwordData.forEach((elem) => {
    let itemArray = elem.split(" ");
    const locations: string[] = itemArray[0].split("-");
    const location1 = parseInt(locations[0]) - 1;
    const location2 = parseInt(locations[1]) - 1;
    const requiredLetter = itemArray[1][0];
    const password = itemArray[2];
    if (password[location1] === requiredLetter) {
      password[location2] !== requiredLetter ? valid++ : null;
    } else if (password[location2] === requiredLetter) {
      password[location1] !== requiredLetter ? valid++ : null;
    }
  });
  return valid;
}

processData();

export {};
