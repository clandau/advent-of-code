"use strict";
exports.__esModule = true;
var fs = require("fs");
var testData = fs.readFileSync("./day12/testInput.txt", "utf-8").split("\n");
var data = fs.readFileSync("./day12/input.txt", "utf-8").split("\n");
// if turning right, iterate through starting at current
// if left, subtract from 360 and do the same
var directionOrder = ["N", "E", "S", "W"];
function rainRisk1(directions) {
    var currentDirection = "E";
    var currentLocation = { NS: 0, EW: 0 };
    var instructions = {
        N: function (v) {
            currentLocation.NS = currentLocation.NS + v;
        },
        S: function (v) {
            currentLocation.NS = currentLocation.NS - v;
        },
        E: function (v) {
            currentLocation.EW = currentLocation.EW + v;
        },
        W: function (v) {
            currentLocation.EW = currentLocation.EW - v;
        },
        L: function (v) {
            var numberOfMoves = (360 - v) / 90;
            var currentI = directionOrder.indexOf(currentDirection);
            var newI = (currentI + numberOfMoves) % directionOrder.length;
            currentDirection = directionOrder[newI];
        },
        R: function (v) {
            var numberOfMoves = v / 90;
            var currentI = directionOrder.indexOf(currentDirection);
            var newI = (currentI + numberOfMoves) % directionOrder.length;
            currentDirection = directionOrder[newI];
        },
        F: function (v) {
            instructions[currentDirection](v);
        }
    };
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var direction = directions_1[_i];
        var instruction = direction[0];
        var value = parseInt(direction.slice(1));
        instructions[instruction](value);
    }
    console.log("current diretion " + currentDirection);
    console.log(currentLocation);
    return Math.abs(currentLocation.NS) + Math.abs(currentLocation.EW);
}
console.log("Part 1: " + rainRisk1(data));
