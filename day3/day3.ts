const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "./input.txt");

function processInput(path: string) {
  fs.readFile(path, function (err: Error, file: object): void | Error {
    if (err) return err;
    const inputArray = file.toString().split("\n");
    console.log(tobogganTrajectory1(inputArray));
  });
}

function tobogganTrajectory1(pattern: string[]) {
  const iLength = pattern[0].length;
  const RIGHT = 3;
  const DOWN = 1;
  let i = DOWN;
  let j = RIGHT;

  let treeCount = 0;

  while (i < pattern.length) {
    if (isTree(pattern[i][j])) {
      treeCount++;
    }
    j = (j + RIGHT) % iLength;
    i += DOWN;
  }
  return treeCount;
}

function isTree(char: string): boolean {
  const TREE = "#";
  return char === TREE;
}

processInput(inputPath);


export {};
