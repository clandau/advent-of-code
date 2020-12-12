const fs = require("fs");
const testData = fs.readFileSync("./day11/testInput.txt", "utf-8").split("\n");
const data = fs.readFileSync("./day11/input.txt", "utf-8").split("\n");

let currentSeatState: string[];
let seats: any = {};

function seatingSystem1(rows: string[]) {
  createSeatDataStructs(rows);
  let changes = true;
  while (changes) {
    let nextSeatState = [];
    let currentRoundChanges = false;
    for (let i = 0; i < currentSeatState.length; i++) {
      const adjacentSeats = seats[i];
      if (currentSeatState[i] === "L") {
        // if no occupied seats around it, flip to #
        let count = 0;
        for (let j of adjacentSeats) {
          if (currentSeatState[j] === "#") {
            count++;
          }
        }
        if (count === 0) {
          // flip it
          nextSeatState[i] = "#";
          currentRoundChanges = true;
        } else {
          nextSeatState[i] = "L";
        }
      } else if (currentSeatState[i] === "#") {
        // if 4 or more occupied, flip to "L"
        let count = 0;
        for (let j of adjacentSeats) {
          if (currentSeatState[j] === "#") {
            count++;
          }
        }
        if (count >= 4) {
          // flip
          nextSeatState[i] = "L";
          currentRoundChanges = true;
        } else nextSeatState[i] = "#";
      } else {
        nextSeatState[i] = ".";
      }
    }
    if (!currentRoundChanges) {
      return currentSeatState.filter((i) => i === "#").length;
    } else {
      currentSeatState = nextSeatState;
    }
  }
  if (!changes) {
    return currentSeatState.filter((i) => i === "#").length;
  }
}

function seatingSystem2(rows: string[]) {
  createSeatDataStructs2(rows);
  while (true) {
    let nextSeatState = [];
    let currentRoundChanges = false;
    for (let i = 0; i < currentSeatState.length; i++) {
      const adjacentSeats = seats[i];
      if (currentSeatState[i] === "L") {
        // if no occupied seats around it, flip to #
        let count = 0;
        for (let j of adjacentSeats) {
          if (currentSeatState[j] === "#") {
            count++;
          }
        }
        if (count === 0) {
          // flip it
          nextSeatState[i] = "#";
          currentRoundChanges = true;
        } else {
          nextSeatState[i] = "L";
        }
      } else if (currentSeatState[i] === "#") {
        // if 4 or more occupied, flip to "L"
        let count = 0;
        for (let j of adjacentSeats) {
          if (currentSeatState[j] === "#") {
            count++;
          }
        }
        if (count >= 5) {
          // flip
          nextSeatState[i] = "L";
          currentRoundChanges = true;
        } else nextSeatState[i] = "#";
      } else {
        nextSeatState[i] = ".";
      }
    }
    if (!currentRoundChanges) {
      return currentSeatState.filter((i) => i === "#").length;
    } else {
      currentSeatState = nextSeatState;
    }
  }
}

function createSeatDataStructs(seatRows: string[]) {
  const flatList = [];
  const seats: any = {};
  const rowLength = seatRows[0].length;
  const totalLength = rowLength * seatRows.length;
  for (let i = 0; i < seatRows.length; i++) {
    const row = seatRows[i];
    for (let j = 0; j < row.length; j++) {
      flatList.push(row[j]);
      if (row[j] === "L") {
        const flatItemIndex = i * rowLength + j;
        flatList[flatItemIndex] = "#";
        const adjacentSeatLocations: number[] = [];
        if (j % rowLength !== 0) {
          // not on left side, so can get left side stuff
          let upperLeft = flatItemIndex - rowLength - 1;
          let lowerLeft = flatItemIndex + rowLength - 1;
          if (upperLeft >= 0) {
            adjacentSeatLocations.push(upperLeft);
          }
          if (lowerLeft < totalLength) {
            adjacentSeatLocations.push(lowerLeft);
          }
          if (flatItemIndex - 1 >= 0) {
            adjacentSeatLocations.push(flatItemIndex - 1);
          }
        }

        if (flatItemIndex % rowLength === 0 || j % (rowLength - 1) !== 0) {
          // get right side things.
          let upperRight = flatItemIndex - rowLength + 1;
          let lowerRight = flatItemIndex + rowLength + 1;
          if (upperRight >= 0) {
            adjacentSeatLocations.push(upperRight);
          }
          if (lowerRight < totalLength) {
            adjacentSeatLocations.push(lowerRight);
          }
          if (flatItemIndex + 1 < totalLength) {
            adjacentSeatLocations.push(flatItemIndex + 1);
          }
        }

        // get top and bottom
        if (flatItemIndex - rowLength >= 0) {
          adjacentSeatLocations.push(flatItemIndex - rowLength);
        }
        if (flatItemIndex + rowLength < totalLength) {
          adjacentSeatLocations.push(flatItemIndex + rowLength);
        }

        seats[flatItemIndex] = adjacentSeatLocations;
      }
    }
  }
  currentSeatState = flatList;
}

function createSeatDataStructs2(seatRows: string[]) {
  const flatList = [];
  const rowLength = seatRows[0].length;
  for (let i = 0; i < seatRows.length; i++) {
    const row = seatRows[i];
    for (let j = 0; j < row.length; j++) {
      flatList.push(row[j]);
      let currentRowIndex = j;
      let currentRow = i;
      if (row[j] === "L") {
        flatList[i * rowLength + j] = "#";
        const adjacentSeatLocations: number[] = [];
        if (j !== 0) {
          // look left
          do {
            currentRowIndex--;
          } while (
            currentRowIndex >= 0 &&
            seatRows[currentRow][currentRowIndex] === "."
          );
          if (
            currentRowIndex >= 0 &&
            seatRows[currentRow][currentRowIndex] === "L"
          ) {
            adjacentSeatLocations.push(
              currentRow * rowLength + currentRowIndex
            );
          }
          currentRowIndex = j;

          // look diagonal up and left
          do {
            currentRowIndex--;
            currentRow--;
          } while (
            currentRow >= 0 &&
            currentRowIndex >= 0 &&
            seatRows[currentRow][currentRowIndex] === "."
          );
          if (
            currentRow >= 0 &&
            currentRowIndex >= 0 &&
            seatRows[currentRow][currentRowIndex] !== "."
          ) {
            adjacentSeatLocations.push(
              currentRow * rowLength + currentRowIndex
            );
          }
          currentRowIndex = j;
          currentRow = i;

          // look diagonal down and left
          do {
            currentRowIndex--;
            currentRow++;
          } while (
            currentRow < seatRows.length &&
            currentRowIndex >= 0 &&
            seatRows[currentRow][currentRowIndex] === "."
          );
          if (
            currentRow < seatRows.length &&
            currentRowIndex >= 0 &&
            seatRows[currentRow][currentRowIndex] !== "."
          ) {
            adjacentSeatLocations.push(
              currentRow * rowLength + currentRowIndex
            );
          }
          currentRowIndex = j;
          currentRow = i;
        }
        if (j !== rowLength - 1) {
          // look right
          do {
            currentRowIndex++;
          } while (
            currentRowIndex < rowLength &&
            seatRows[currentRow][currentRowIndex] === "."
          );
          if (
            currentRowIndex < rowLength &&
            seatRows[currentRow][currentRowIndex] !== "."
          ) {
            adjacentSeatLocations.push(
              currentRow * rowLength + currentRowIndex
            );
          }
          currentRowIndex = j;
          currentRow = i;

          // look diagonal up and right
          do {
            currentRow--;
            currentRowIndex++;
          } while (
            currentRow >= 0 &&
            currentRowIndex < rowLength &&
            seatRows[currentRow][currentRowIndex] === "."
          );
          if (
            currentRow >= 0 &&
            currentRowIndex < rowLength &&
            seatRows[currentRow][currentRowIndex] !== "."
          ) {
            adjacentSeatLocations.push(
              currentRow * rowLength + currentRowIndex
            );
          }
          currentRow = i;
          currentRowIndex = j;

          // look diagonal down and right
          do {
            currentRow++;
            currentRowIndex++;
          } while (
            currentRow < seatRows.length &&
            currentRowIndex < rowLength &&
            seatRows[currentRow][currentRowIndex] === "."
          );
          if (
            currentRow < seatRows.length &&
            currentRowIndex < rowLength &&
            seatRows[currentRow][currentRowIndex] !== "."
          ) {
            adjacentSeatLocations.push(
              currentRow * rowLength + currentRowIndex
            );
          }
          currentRow = i;
          currentRowIndex = j;
        }
        // look up
        do {
          currentRow--;
        } while (
          currentRow >= 0 &&
          seatRows[currentRow][currentRowIndex] === "."
        );

        if (currentRow >= 0 && seatRows[currentRow][currentRowIndex] !== ".") {
          adjacentSeatLocations.push(currentRow * rowLength + currentRowIndex);
        }
        currentRow = i;
        currentRowIndex = j;
        // look down
        do {
          currentRow++;
        } while (
          currentRow < seatRows.length &&
          seatRows[currentRow][currentRowIndex] === "."
        );
        if (
          currentRow < seatRows.length &&
          seatRows[currentRow][currentRowIndex] !== "."
        ) {
          adjacentSeatLocations.push(currentRow * rowLength + currentRowIndex);
        }

        seats[i * rowLength + j] = adjacentSeatLocations;
      }
    }
  }
  currentSeatState = flatList;
}

// console.log(`Part 1: ${seatingSystem1(data)}`); // Part 1: 2152
console.log(`Part 2: ${seatingSystem2(data)}`); // Part 2: 1937

export {};
