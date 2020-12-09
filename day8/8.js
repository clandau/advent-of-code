"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
function handheldHalting2(instructions) {
    // can only change one nop to jmp or jmp to nop
    var instructionCopy = __spreadArrays(instructions);
    var start = 0;
    var accumulator = 0;
    while (start < instructionCopy.length) {
        var split = instructionCopy[start].split(" ");
        var instruction = split[0];
        var num = parseInt(split[1]);
        if (instruction === "acc") {
            accumulator += num;
            start++;
        }
        else {
            if (instruction === "jmp") {
                // pretend it's a nop and traverse to the end
                instructionCopy[start] = "nop " + split[1];
                var result = traverseAndCount(instructionCopy, start, accumulator);
                if (result !== -1) {
                    return result;
                }
                else {
                    // go keep it a jmp
                    instructionCopy[start] = split.join(" ");
                    start += num;
                }
            }
            else if (instruction === "nop") {
                // pretend it's a "jmp" and traverse to the end
                instructionCopy[start] = "jmp " + split[1];
                var result = traverseAndCount(instructionCopy, start, accumulator);
                if (result !== -1) {
                    return result;
                }
                else {
                    instructionCopy[start] = split.join(" ");
                    start++;
                }
            }
        }
    }
}
var traverseAndCount = function (instructions, i, acc) {
    var accumulator = acc;
    var visitedSpots = [];
    while (visitedSpots.indexOf(i) === -1 && i < instructions.length) {
        visitedSpots.push(i);
        var split = instructions[i].split(" ");
        var instruction = split[0];
        var num = parseInt(split[1]);
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
console.log("Part 1: " + handheldHalting1(DATA)); // Part 1: 1331
console.log("Part 2: " + handheldHalting2(DATA)); // Part 2: 1121
