const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "./input.txt");

function processInput(path: string) {
  fs.readFile(path, function (err: Error, file: object): void | Error {
    if (err) return err;
    const inputArray = file.toString().split("\n");
    console.log(tobogganTrajectory1(inputArray));
    console.log(tobogganTrajectory2(inputArray));
  });
}

function tobogganTrajectory1(pattern: string[]) {
  const RIGHT = 3;
  const DOWN = 1;

  return countTrees(pattern, RIGHT, DOWN);
}

function countTrees(pattern: string[], right: number, down: number) {
  const iLength = pattern[0].length;
  let i = down;
  let j = right;

  let treeCount = 0;

  while (i < pattern.length) {
    if (isTree(pattern[i][j])) {
      treeCount++;
    }
    j = (j + right) % iLength;
    i += down;
  }
  return treeCount;
}

function isTree(char: string): boolean {
  const TREE = "#";
  return char === TREE;
}

function tobogganTrajectory2(pattern: string[]) {
  const SLOPES = [
    { Right: 1, Down: 1 },
    { Right: 5, Down: 1 },
    { Right: 7, Down: 1 },
    { Right: 1, Down: 2 },
  ];
  let countProduct = 167;
  for (let slope of SLOPES) {
    countProduct *= countTrees(pattern, slope.Right, slope.Down);
  }
  return countProduct;
}

processInput(inputPath);

export {};
