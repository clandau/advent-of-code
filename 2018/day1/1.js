"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("./day1/input.txt", "utf-8").split("\n");
function chronalCalibration1() {
    var total = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var value = data_1[_i];
        total += parseInt(value);
    }
    return total;
}
function chronalCalibration2() {
    var frequencies = [];
    var currentFrequency = parseInt(data[0]);
    var i = 1;
    // let currentI = iteration;
    while (frequencies.indexOf(currentFrequency) === -1) {
        // push previous
        frequencies.push(currentFrequency);
        // calculate next
        currentFrequency += parseInt(data[i]);
        // update iteration values
        i = (i + 1) % data.length;
        // currentI = iteration % data.length;
    }
    return currentFrequency;
}
console.log("Part 1: " + chronalCalibration1()); // Part 1: 454
console.log("Part 2: " + chronalCalibration2()); // Part 2: 566
