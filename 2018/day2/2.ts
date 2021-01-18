const fs = require("fs");
const data = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");

const sampleData = fs.readFileSync("./day2/testInput.txt", "utf-8").split("\n");

function IMS1(boxes: string[]) {
  let twiceCount = 0;
  let thriceCount = 0;
  for (let box of boxes) {
    const numberCountHolder: any = {};
    for (let item of box) {
      numberCountHolder[item] ? numberCountHolder[item]++ : numberCountHolder[item] = 1;
    }
    const vals = Object.values(numberCountHolder);
    if (vals.indexOf(2) > -1) twiceCount++;
    if (vals.indexOf(3) > -1) thriceCount++;
  }
  return twiceCount * thriceCount;
}

function IMS2(boxes: string[]) {

}


console.log(`Part 1: ${IMS1(data)}`);
console.log(`Part 2: ${IMS1(sampleData)}`);
