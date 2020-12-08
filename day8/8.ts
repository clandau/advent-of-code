const fs = require("fs");
const DATA = fs.readFileSync("./day8/input.txt", "utf-8").split("\n");

function handheldHalting1(instructions: string[]) {
  // store value of accumulator and visited instructions
  // if instructions already visited, return current accumulator
  let accumulator = 0, i = 0;
  const visitedSpots: number[] = [];
  
  while (visitedSpots.indexOf(i) === -1) {
    visitedSpots.push(i);
    const split = instructions[i].split(" ");
    const instruction = split[0];
    const num = parseInt(split[1]);
    switch (instruction) {
      case ("nop"):
        console.log(instruction, num)
        i++;
        break;
      case ("acc"):
        accumulator += num;
        i++;
        break;
      case ("jmp"):
        i += num;
        break;
    }
  }
  return accumulator;
}

console.log(`Part 1: ${handheldHalting1(DATA)}`);  // Part 1: 1331

export {}