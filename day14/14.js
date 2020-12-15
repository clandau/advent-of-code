"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("./day14/input.txt", "utf-8").split("\n");
function dockingData1() {
    var storedValues = {};
    var mask = parseMask(data[0]);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        if (item.startsWith("mask")) {
            mask = parseMask(item);
        }
        else {
            var writeInfo = item.split(" = ");
            var location_1 = writeInfo[0].split("mem[")[1].split("]")[0];
            var value = (writeInfo[writeInfo.length - 1] >>> 0)
                .toString(2)
                .padStart(mask.length, "0")
                .split("");
            for (var j = mask.length - 1; j >= 0; j--) {
                if (mask[j] !== "X") {
                    value[j] = mask[j];
                }
            }
            storedValues[location_1] = parseInt(value.join(""), 2);
        }
    }
    console.log(Object.values(storedValues));
    return Object.values(storedValues).reduce(function (a, b) {
        return a + b;
    });
}
function dockingData2() {
    var storedLocations = {};
    var mask = parseMask(data[0]);
    var _loop_1 = function (item) {
        if (item.startsWith("mask")) {
            mask = parseMask(item);
        }
        else {
            // convert location to binary
            var writeLocations = [];
            var writeInfo = item.split(" = ");
            var currentValue_1 = writeInfo[writeInfo.length - 1];
            console.log("write info: " + currentValue_1);
            var location_2 = (writeInfo[0].split("mem[")[1].split("]")[0] >>> 0)
                .toString(2)
                .padStart(mask.length, "0")
                .split("");
            writeLocations = [""];
            var _loop_2 = function (i) {
                if (mask[i] === "1") {
                    writeLocations = writeLocations.map(function (loc) {
                        return loc += "1";
                    });
                }
                else if (mask[i] === "0") {
                    writeLocations = writeLocations.map(function (loc) {
                        return (loc += location_2[i]);
                    });
                }
                else {
                    var newLocs = __spreadArrays(writeLocations);
                    newLocs = newLocs.map(function (loc) { return loc += "1"; });
                    writeLocations = writeLocations.map(function (loc) { return (loc += "0"); });
                    writeLocations = newLocs.concat(writeLocations);
                }
            };
            for (var i = 0; i < mask.length; i++) {
                _loop_2(i);
            }
            writeLocations.forEach(function (loc) { return storedLocations[loc] = currentValue_1; });
        }
    };
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var item = data_2[_i];
        _loop_1(item);
    }
    console.log(storedLocations);
    return Object.values(storedLocations).reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
    });
}
function parseMask(maskStr) {
    return maskStr.split(" = ")[1].split("");
}
// console.log(`Part 1: ${dockingData1()}`);  // Part 1: 11327140210986
console.log("Part 2: " + dockingData2()); //
