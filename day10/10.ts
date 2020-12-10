const fs = require("fs");
// const testData = fs.readFileSync("./day10/testInput.txt", "utf-8").split("\n");
const data = fs.readFileSync("./day10/input.txt", "utf-8").split("\n");

const sortedNumbers = (data: string[]) => data.sort((a, b) => {
  return parseInt(a) - parseInt(b);
});

const sortedData = sortedNumbers(data);

function adapterArray1(sortedAdapters: string[]) {
  let oneJoltDifferences = 0;
  let threeJoltDifferences = 1;

  let i = 0;
  let current = parseInt(sortedAdapters[i]);
  if (current === 1) oneJoltDifferences++
  if (current === 3) threeJoltDifferences++;

  while (i < sortedAdapters.length - 1) {
    const oneMore = parseInt(sortedAdapters[i+1]);
    const difference = oneMore - current;
    if (difference === 3) threeJoltDifferences++;
    if (difference === 1) oneJoltDifferences++;
    i++;
    current = parseInt(sortedAdapters[i]);
  }
  return oneJoltDifferences * threeJoltDifferences;
}

function adapterArray2(sortedAdapters: string[]) {
  sortedAdapters.unshift("0");
  sortedAdapters.push((parseInt(sortedAdapters[sortedAdapters.length - 1]) + 3).toString());
  let i = 0;
  const paths = new Array(sortedAdapters.length - 1).fill(0);
  paths.unshift(1);

  while (i < sortedAdapters.length - 1) {
    const iPaths = paths[i];
    let j = i + 1;
    const current = parseInt(sortedAdapters[i]);
    let next = parseInt(sortedAdapters[j])
    if (next - current === 3) {
      paths[j] += iPaths;
    } else {
      while (j < sortedAdapters.length && next - current <= 3) {
        paths[j] += iPaths;
        j++;
        next = parseInt(sortedAdapters[j])
      }
    }
    i++;
  }
  return paths.pop();
}

console.log(`Part 1: ${adapterArray1(sortedData)}`) // Part 1: 1890
console.log(`Part 2: ${adapterArray2(sortedData)}`) // Part 2: 49607173328384

export {}