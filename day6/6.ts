const fs = require("fs");
const DATA: string[] = fs.readFileSync("./day6/input.txt", "utf-8").split("\n\n");

function customCustoms1(answerGroups: string[]) {
  let sumOfCounts = 0;
  answerGroups.forEach(answer => {
    sumOfCounts += new Set(answer.split("\n").join("").split("")).size
  })
  return sumOfCounts;
}

console.log(customCustoms1(DATA))

export {}