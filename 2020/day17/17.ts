const fs = require("fs");
const data = fs.readFileSync("./day17/testInput.txt", "utf-8").split("\n");
const cubes = data.map(c => c.split(""));

function conwayCubes(data: string[]) {
  const active = "#";
  const inactive = ".";
  let cubes = [data]
  let existingData = JSON.parse(JSON.stringify(cubes));
  for (let z = 0; z<existingData.length; z++) {
    for (let y = 0; y<existingData[z].length; y++) {
      for (let x = 0; x < existingData[z][y].length; x++) {
        console.log(existingData[z][y][x])
        let neighborCount = 0;
        let currentCube = existingData[z][y][x];
        if (currentCube === "#") {
          // count all in z direction, count all in y direction, count all in x direction
          if ()
        } else if (currentCube === ".") {

        }
      }
    }
  }
}

console.log(`Part 1: ${conwayCubes(cubes)}`);

export {}