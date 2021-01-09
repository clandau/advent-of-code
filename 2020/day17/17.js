"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("./day17/testInput.txt", "utf-8").split("\n");
var cubes = data.map(function (c) { return c.split(""); });
function conwayCubes(data) {
    var active = "#";
    var inactive = ".";
    var cubes = [data];
    var existingData = JSON.parse(JSON.stringify(cubes));
    for (var z = 0; z < existingData.length; z++) {
        for (var y = 0; y < existingData[z].length; y++) {
            for (var x = 0; x < existingData[z][y].length; x++) {
                console.log(existingData[z][y][x]);
            }
        }
    }
}
console.log("Part 1: " + conwayCubes(cubes));
