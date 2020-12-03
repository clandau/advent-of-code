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
        console.log(tobogganTrajectory1(inputArray));
    });
}
function tobogganTrajectory1(pattern) {
    var iLength = pattern[0].length;
    var RIGHT = 3;
    var DOWN = 1;
    var i = DOWN;
    var j = RIGHT;
    var treeCount = 0;
    while (i < pattern.length) {
        if (isTree(pattern[i][j])) {
            treeCount++;
        }
        j = (j + RIGHT) % iLength;
        i += DOWN;
    }
    return treeCount;
}
function isTree(char) {
    var TREE = "#";
    return char === TREE;
}
processInput(inputPath);
