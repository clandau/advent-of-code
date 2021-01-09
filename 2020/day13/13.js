"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("./day13/input.txt", "utf-8").split("\n");
var earliestTime = parseInt(data[0]);
var busIds = data[1].split(",").map(function (x) { return parseInt(x); });
function shuttleSearch1(earliest, busIds) {
    var shortestTime = [0, Infinity];
    for (var i = 0; i < busIds.length; i++) {
        if (!isNaN(busIds[i])) {
            var nextTime = earliest - (earliest % busIds[i]) + busIds[i];
            if (shortestTime[1] > nextTime) {
                shortestTime = [busIds[i], nextTime];
            }
        }
    }
    return shortestTime[0] * (shortestTime[1] - earliest);
}
function shuttleSearch2(busIds) {
    var time = busIds[0];
    var step = busIds[0];
    for (var i = 1; i < busIds.length; i++) {
        if (!isNaN(busIds[i])) {
            while ((time + i) % busIds[i] !== 0) {
                time += step;
            }
            step = step * busIds[i];
        }
    }
    return time;
}
function isMultiple(busId, currentTime) {
    // determines whether a number is a mulitple of the bus id
    return currentTime % busId === 0;
}
console.log("Part 1: " + shuttleSearch1(earliestTime, busIds)); // Part 1: 1835
console.log("Part 2: " + shuttleSearch2(busIds)); // Part 2: 247086664214628
