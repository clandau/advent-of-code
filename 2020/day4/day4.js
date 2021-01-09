"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs
    .readFileSync("./day4/input.txt", "utf-8")
    .split("\n\n");
var actualExpectedFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
function countValidPassports(input) {
    var totalInvalidPassports = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var passport = input_1[_i];
        var fieldsArray = passport.split(/\s/g);
        var countFields = 0;
        for (var _a = 0, fieldsArray_1 = fieldsArray; _a < fieldsArray_1.length; _a++) {
            var i = fieldsArray_1[_a];
            var start = i.split(":")[0];
            if (actualExpectedFields.indexOf(start) !== -1) {
                countFields++;
            }
        }
        if (countFields < actualExpectedFields.length) {
            totalInvalidPassports++;
        }
    }
    return input.length - totalInvalidPassports;
}
function countValidPassports2(input) {
    var totalInvalidPassports = 0;
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var passport = input_2[_i];
        var fieldsArray = passport.split(/\s/g);
        var countFields = 0;
        for (var _a = 0, fieldsArray_2 = fieldsArray; _a < fieldsArray_2.length; _a++) {
            var i = fieldsArray_2[_a];
            var inputs = i.split(":");
            var start = inputs[0];
            var value = inputs[1];
            if (actualExpectedFields.indexOf(start) !== -1 && isValidData(start, value)) {
                countFields++;
            }
        }
        if (countFields < actualExpectedFields.length) {
            totalInvalidPassports++;
        }
    }
    return input.length - totalInvalidPassports;
}
function isValidData(item, value) {
    var passportItems = {
        byr: validNumberRange(parseInt(value), 1920, 2002),
        iyr: validNumberRange(parseInt(value), 2010, 2020),
        eyr: validNumberRange(parseInt(value), 2020, 2030),
        hgt: validHeight(value),
        hcl: value.length === 7 && validHairColor(value),
        ecl: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
        pid: value.length === 9 && isNumber(value)
    };
    return passportItems[item];
}
function validNumberRange(val, min, max) {
    return val >= min && val <= max;
}
function validHeight(hgt) {
    var units = hgt.slice(-2);
    var value = hgt.slice(0, -2);
    if (["cm", "in"].includes(units)) {
        if (units === "cm") {
            // cm 150 and at most 193
            return validNumberRange(parseInt(value), 150, 193);
        }
        else if (units === "in") {
            // in at least 59 and at most 76
            return validNumberRange(parseInt(value), 59, 76);
        }
    }
    return false;
}
function validHairColor(color) {
    var regex = /^#([0-9a-f])*$/g;
    return regex.test(color);
}
function isNumber(val) {
    var allNumberRegex = /^([0-9])*$/g;
    return allNumberRegex.test(val);
}
console.log(countValidPassports(data)); // 233
console.log(countValidPassports2(data)); // 111
