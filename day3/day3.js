"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var inputPath = path.join(__dirname, "./input.txt");
function processInput(path) {
    fs.readFile(path, function (err, file) {
        if (err)
            return err;
        var inputArray = file.toString().split("\n");
        console.log(tobogganTrajectory1(inputArray)); // 167
        console.log(tobogganTrajectory2(inputArray)); // 736527114
    });
}
function tobogganTrajectory1(pattern) {
    var RIGHT = 3;
    var DOWN = 1;
    return countTrees(pattern, RIGHT, DOWN);
}
function tobogganTrajectory2(pattern) {
    var SLOPES = [
        { Right: 1, Down: 1 },
        { Right: 5, Down: 1 },
        { Right: 7, Down: 1 },
        { Right: 1, Down: 2 },
    ];
    // getting the initial value from Part 1 and not re-running it
    var countProduct = 167;
    for (var _i = 0, SLOPES_1 = SLOPES; _i < SLOPES_1.length; _i++) {
        var slope = SLOPES_1[_i];
        countProduct *= countTrees(pattern, slope.Right, slope.Down);
    }
    return countProduct;
}
function countTrees(pattern, right, down) {
    var iLength = pattern[0].length;
    var i = down;
    var j = right;
    var treeCount = 0;
    while (i < pattern.length) {
        if (isTree(pattern[i][j])) {
            treeCount++;
        }
        j = (j + right) % iLength;
        i += down;
    }
    return treeCount;
}
function isTree(char) {
    return char === "#";
}
processInput(inputPath);
