const fs = require("fs");
const DATA = fs.readFileSync("./day8/input.txt", "utf-8").split("\n");

function handheldHalting1(instructions: string[]) {
  // store value of accumulator and visited instructions
  // if instructions already visited, return current accumulator
  let accumulator = 0,
    i = 0;
  const visitedSpots: number[] = [];

  while (visitedSpots.indexOf(i) === -1) {
    visitedSpots.push(i);
    const split = instructions[i].split(" ");
    const instruction = split[0];
    const num = parseInt(split[1]);
    switch (instruction) {
      case "nop":
        i++;
        break;
      case "acc":
        accumulator += num;
        i++;
        break;
      case "jmp":
        i += num;
        break;
    }
  }
  return accumulator;
}

function handheldHalting2(instructions: string[]) {
  // can only change one nop to jmp or jmp to nop
  const instructionCopy = [...instructions];
  let start = 0;
  let accumulator = 0;

  while (start < instructionCopy.length) {
    const split = instructionCopy[start].split(" ");
    const instruction = split[0];
    const num = parseInt(split[1]);
    if (instruction === "acc") {
      accumulator += num;
      start++;
    } else {
      if (instruction === "jmp") {
        // pretend it's a nop and traverse to the end
        instructionCopy[start] = `nop ${split[1]}`;
        const result = traverseAndCount(instructionCopy, start, accumulator);
        if (result !== -1) {
          return result;
        } else {
          // go keep it a jmp
          instructionCopy[start] = split.join(" ");
          start += num;
        }
      } else if (instruction === "nop") {
        // pretend it's a "jmp" and traverse to the end
        instructionCopy[start] = `jmp ${split[1]}`;
        const result = traverseAndCount(instructionCopy, start, accumulator);
        if (result !== -1) {
          return result;
        } else {
          instructionCopy[start] = split.join(" ");
          start++;
        }
      }
    }
  }
}

const traverseAndCount = (instructions: string[], i: number, acc: number) => {
  let accumulator = acc;
  const visitedSpots: number[] = [];
  while (visitedSpots.indexOf(i) === -1 && i < instructions.length) {
    visitedSpots.push(i);
    const split = instructions[i].split(" ");
    const instruction = split[0];
    const num = parseInt(split[1]);
    switch (instruction) {
      case "nop":
        i++;
        break;
      case "acc":
        accumulator += num;
        i++;
        break;
      case "jmp":
        i += num;
        break;
    }
  }
  return i === instructions.length ? accumulator : -1;
};

console.log(`Part 1: ${handheldHalting1(DATA)}`); // Part 1: 1331
console.log(`Part 2: ${handheldHalting2(DATA)}`); // Part 2: 1121

export {};
