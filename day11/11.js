const fs = require("fs");
const testData = fs.readFileSync("./day11/testInput.txt", "utf-8").split("\n");
const data = fs.readFileSync("./day11/input.txt", "utf-8").split("\n");
let currentSeatState;
let seats = {};
function seatingSystem1(rows) {
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
                }
                else {
                    nextSeatState[i] = "L";
                }
            }
            else if (currentSeatState[i] === "#") {
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
                }
                else
                    nextSeatState[i] = "#";
            }
            else {
                nextSeatState[i] = ".";
            }
        }
        if (!currentRoundChanges) {
            return currentSeatState.filter(i => i === "#").length;
        }
        else {
            currentSeatState = nextSeatState;
        }
    }
    if (!changes) {
        return currentSeatState.filter(i => i === "#").length;
    }
}
function createSeatDataStructs(seatRows) {
    const flatList = [];
    const rowLength = seatRows[0].length;
    const totalLength = rowLength * seatRows.length;
    for (let i = 0; i < seatRows.length; i++) {
        const row = seatRows[i];
        for (let j = 0; j < row.length; j++) {
            flatList.push(row[j]);
            if (row[j] === "L") {
                const flatItemIndex = i * rowLength + j;
                flatList[flatItemIndex] = "#";
                const adjacentSeatLocations = [];
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
console.log(`Part 1: ${seatingSystem1(data)}`);
