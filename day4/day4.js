"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs
    .readFileSync("./day4/input.txt", "utf-8")
    .split("\n\n");
var expectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
var actualExpectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
console.log(data);
function countValidPassports(input) {
    var totalInvalidPassports = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var passport = input_1[_i];
        var fieldsArray = passport.split(/\s/g);
        var countFields = 0;
        for (var _a = 0, fieldsArray_1 = fieldsArray; _a < fieldsArray_1.length; _a++) {
            var i = fieldsArray_1[_a];
            var start = i.split(":")[0];
            // console.log(start);
            // console.log(actualExpectedFields);
            if (actualExpectedFields.indexOf(start) !== -1) {
                // console.log(actualExpectedFields.indexOf(start))
                countFields++;
            }
        }
        console.log("number fields: " + countFields);
        if (countFields < actualExpectedFields.length) {
            totalInvalidPassports++;
            console.log(JSON.stringify(passport));
        }
    }
    // console.log(countFields)
    // console.log(i)
    return input.length - totalInvalidPassports;
}
console.log(countValidPassports(data));
