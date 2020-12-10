"use strict";
exports.__esModule = true;
var fs = require("fs");
// const testData = fs.readFileSync("./day10/testInput.txt", "utf-8").split("\n");
var data = fs.readFileSync("./day10/input.txt", "utf-8").split("\n");
var sortedNumbers = function (data) { return data.sort(function (a, b) {
    return parseInt(a) - parseInt(b);
}); };
var sortedData = sortedNumbers(data);
function adapterArray1(sortedAdapters) {
    var oneJoltDifferences = 0;
    var threeJoltDifferences = 1;
    var i = 0;
    var current = parseInt(sortedAdapters[i]);
    if (current === 1)
        oneJoltDifferences++;
    if (current === 3)
        threeJoltDifferences++;
    while (i < sortedAdapters.length - 1) {
        var oneMore = parseInt(sortedAdapters[i + 1]);
        var difference = oneMore - current;
        if (difference === 3)
            threeJoltDifferences++;
        if (difference === 1)
            oneJoltDifferences++;
        i++;
        current = parseInt(sortedAdapters[i]);
    }
    return oneJoltDifferences * threeJoltDifferences;
}
function adapterArray2(sortedAdapters) {
    sortedAdapters.unshift("0");
    sortedAdapters.push((parseInt(sortedAdapters[sortedAdapters.length - 1]) + 3).toString());
    var i = 0;
    var paths = new Array(sortedAdapters.length - 1).fill(0);
    paths.unshift(1);
    while (i < sortedAdapters.length - 1) {
        var iPaths = paths[i];
        var j = i + 1;
        var current = parseInt(sortedAdapters[i]);
        var next = parseInt(sortedAdapters[j]);
        if (next - current === 3) {
            paths[j] += iPaths;
        }
        else {
            while (j < sortedAdapters.length && next - current <= 3) {
                paths[j] += iPaths;
                j++;
                next = parseInt(sortedAdapters[j]);
            }
        }
        i++;
    }
    return paths.pop();
}
// console.log(`Part 1: ${adapterArray1(sortedData)}`) // Part 1: 1890
console.log("Part 2: " + adapterArray2(sortedData)); // 
