"use strict";
exports.__esModule = true;
var fs = require("fs");
var DATA = fs.readFileSync("./day8/input.txt", "utf-8").split("\n");
function handheldHalting1(instructions) {
    // store value of accumulator and visited instructions
    // if instructions already visited, return current accumulator
    var accumulator = 0, i = 0;
    var visitedSpots = [];
    while (visitedSpots.indexOf(i) === -1) {
        visitedSpots.push(i);
        var split = instructions[i].split(" ");
        var instruction = split[0];
        var num = parseInt(split[1]);
        switch (instruction) {
            case ("nop"):
                console.log(instruction, num);
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
console.log("Part 1: " + handheldHalting1(DATA));
