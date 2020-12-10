"use strict";
exports.__esModule = true;
var fs = require("fs");
var testData = fs.readFileSync("./day9/testInput.txt", "utf-8").split("\n");
var data = fs.readFileSync("./day9/input.txt", "utf-8").split("\n");
var preambleLength = 25;
function encodingError1(data) {
    var currentStart = 0;
    var currentI = preambleLength;
    var preambleNumbers = data.slice(currentStart, preambleLength);
    var currentNumber = parseInt(data[preambleLength]);
    while (currentI < data.length) {
        var foundValid = false;
        for (var i = 0; i < preambleNumbers.length - 1; i++) {
            loop1: for (var j = 1; j < preambleNumbers.length; j++) {
                if (parseInt(preambleNumbers[i]) + parseInt(preambleNumbers[j]) === currentNumber) {
                    foundValid = true;
                    break loop1;
                }
            }
        }
        if (!foundValid) {
            return data[currentI];
        }
        else {
            preambleNumbers = data.slice(++currentStart, ++currentI);
            currentNumber = parseInt(data[currentI]);
        }
    }
}
function encodingError2(data, invalidNumber) {
    var pointLeft = 0;
    var pointRight = 1;
    var currentSum = parseInt(data[pointLeft]) + parseInt(data[pointRight]);
    while (pointLeft <= pointRight && pointRight <= data.length) {
        if (currentSum === invalidNumber) {
            console.log(pointLeft, pointRight, currentSum);
            return sumSmallestAndLargest(data, pointLeft, pointRight);
        }
        while (currentSum < invalidNumber && pointRight < data.length) {
            pointRight++;
            currentSum += parseInt(data[pointRight]);
            console.log("sum 45 : " + currentSum);
        }
        while (currentSum > invalidNumber && pointLeft < pointRight) {
            console.log("sum 50 : " + currentSum + ", " + pointLeft + ", " + pointRight);
            currentSum -= parseInt(data[pointLeft]);
            pointLeft++;
        }
        while (pointLeft === pointRight && currentSum > invalidNumber) {
            pointLeft++;
            currentSum = parseInt(data[pointLeft]);
            pointRight = pointLeft;
        }
    }
}
var sumSmallestAndLargest = function (data, start, end) {
    var smallest = parseInt(data[start]);
    var largest = parseInt(data[start]);
    console.log(smallest, largest);
    for (var i = start; i <= end; i++) {
        var currentNum = parseInt(data[i]);
        if (currentNum < smallest) {
            smallest = currentNum;
        }
        else if (currentNum > largest) {
            largest = currentNum;
        }
    }
    return smallest + largest;
};
// console.log(`Part 1: ${encodingError1(data)}`)  // Part 1: 14144619
var part1answer = 14144619;
var part1TestAnswer = 127;
console.log("Part 2: " + encodingError2(data, part1answer));
