const fs = require("fs");
const data = fs
    .readFileSync("./day5/input.txt", "utf-8")
    .split("\n");
function binaryBoardingPart1(boardingPasses) {
    let highest = -1;
    for (let pass of boardingPasses) {
        const seatNumber = findSeat(pass);
        seatNumber > highest ? highest = seatNumber : null;
    }
    return highest;
}
function findSeat(seatAssignment) {
    const rowDirections = seatAssignment.slice(0, 7);
    const columnDirections = seatAssignment.slice(-3);
    const row = seatNumber(rowDirections, "F", "B", 128);
    const column = seatNumber(columnDirections, "L", "R", 8);
    return row * 8 + column;
}
function seatNumber(directions, lowerValue, upperValue, total) {
    let start = 0;
    let end = total;
    let current = Math.floor((start + end) / 2);
    for (let direction of directions) {
        if (direction === lowerValue) {
            end = current;
        }
        else if (direction === upperValue) {
            start = current;
        }
        current = Math.floor((start + end) / 2);
    }
    return current;
}
// console.log(findSeat("BBFFBBFRLL"))
console.log(binaryBoardingPart1(data)); // 996
