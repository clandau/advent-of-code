"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var inputPath = path.join(__dirname, "./input.txt");
function processData() {
    fs.readFile(inputPath, function (err, file) {
        if (err)
            return err;
        var itemArray = file.toString().split("\n");
        console.log(countValid1(itemArray)); // 454 valid
        console.log(countValid2(itemArray)); // 649 valid
    });
}
function countValid1(passwordData) {
    // for each item, parse into 3 secctions
    var invalid = 0;
    passwordData.forEach(function (elem) {
        var itemArray = elem.split(" ");
        var counts = itemArray[0].split("-");
        var lowBound = parseInt(counts[0]);
        var highBound = parseInt(counts[1]);
        var requiredLetter = itemArray[1][0];
        var password = itemArray[2].split("");
        var currentCount = 0;
        for (var _i = 0, password_1 = password; _i < password_1.length; _i++) {
            var char = password_1[_i];
            if (char === requiredLetter) {
                currentCount++;
                if (currentCount > highBound) {
                    invalid++;
                    break;
                }
            }
        }
        if (currentCount < lowBound)
            invalid++;
    });
    return passwordData.length - invalid;
}
function countValid2(passwordData) {
    var valid = 0;
    passwordData.forEach(function (elem) {
        var itemArray = elem.split(" ");
        var locations = itemArray[0].split("-");
        var location1 = parseInt(locations[0]) - 1;
        var location2 = parseInt(locations[1]) - 1;
        var requiredLetter = itemArray[1][0];
        var password = itemArray[2];
        if (password[location1] === requiredLetter) {
            password[location2] !== requiredLetter ? valid++ : null;
        }
        else if (password[location2] === requiredLetter) {
            password[location1] !== requiredLetter ? valid++ : null;
        }
    });
    return valid;
}
processData();
