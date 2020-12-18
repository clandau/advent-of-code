"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("./day16/testInput.txt", "utf-8").split("\n\n");
var invalidTickets = [];
// const invalidTickets = [
//   12,
//   22,
//   977,
//   10,
//   8,
//   985,
//   977,
//   5,
//   985,
//   15,
//   991,
//   8,
//   999,
//   999,
//   990,
//   21,
//   979,
//   989,
//   976,
//   14,
//   984,
//   991,
//   976,
//   998,
//   989,
//   13,
//   3,
//   984,
//   23,
//   986,
//   16,
//   11,
//   990,
//   10,
//   4,
//   10,
//   6,
//   4,
//   980,
//   7,
//   6,
//   14,
//   5,
//   22,
//   989,
//   995,
// ];
function ticketTranslation1() {
    var invalidTickets = [];
    var ranges = parseRanges(data[0]);
    var nearbyTickets = parseNearbyTickets(data[2]);
    for (var _i = 0, nearbyTickets_1 = nearbyTickets; _i < nearbyTickets_1.length; _i++) {
        var ticket = nearbyTickets_1[_i];
        var ticketInt = parseInt(ticket);
        var i = 0;
        var found = false;
        while (!found && i < ranges.length) {
            var min = parseInt(ranges[i][0]);
            var max = parseInt(ranges[i][1]);
            if (ticketInt >= min && ticketInt <= max) {
                found = true;
            }
            i++;
        }
        if (!found)
            invalidTickets.push(ticketInt);
    }
    return invalidTickets.reduce(function (a, b) { return a + b; });
}
function ticketTranslation2() {
    var ranges = parseRangesKeepRows(data[0]);
    var ticketLocationCounts = {};
    var fieldArray = Object.entries(ranges);
    var fieldValues = Object.values(ranges);
    var ticketRows = parseNearbyTicketsKeepRows(data[2]);
    var locationCountHolder = new Array(fieldValues.length);
    ticketRows.forEach(function (ticket) {
        var _loop_2 = function (i) {
            var ticketInt = parseInt(ticket[i]);
            var _loop_3 = function (j) {
                fieldValues[j].forEach(function (f) {
                    var min = parseInt(f[0]);
                    var max = parseInt(f[1]);
                    if (ticketInt >= min && ticketInt <= max) {
                        if (locationCountHolder[i]) {
                            locationCountHolder[i][j] ? locationCountHolder[i][j] += 1 : locationCountHolder[i][j] = 1;
                        }
                        else {
                            locationCountHolder[i] = [];
                            locationCountHolder[i][j] = 1;
                        }
                        console.log(locationCountHolder);
                    }
                });
            };
            for (var j = 0; j < fieldValues.length; j++) {
                _loop_3(j);
            }
        };
        for (var i = 0; i < ticket.length; i++) {
            _loop_2(i);
        }
    });
    console.log(locationCountHolder);
    var locations = [];
    var _loop_1 = function (i) {
        // if only one is in all of them, that will be the correct index
        var locationsWithAll = [];
        locationCountHolder[i].forEach(function (item) {
            if (item === ticketRows.length) {
                locationsWithAll.push(i);
            }
        });
        if (locationsWithAll.length === 1) {
            locations[i] = locationsWithAll[0];
        }
        console.log(locationsWithAll);
    };
    for (var i = 0; i < locationCountHolder.length; i++) {
        _loop_1(i);
    }
    console.log(locations);
}
function parseRanges(data) {
    var ranges = [];
    var fieldRows = data.split("\n").join(" ").split(" ");
    console.log(fieldRows);
    fieldRows.forEach(function (row) {
        if (row.includes("-")) {
            var rangeInts = row.split("-");
            ranges.push(rangeInts);
        }
    });
    return ranges;
}
function parseRangesKeepRows(data) {
    var ranges = {};
    var fieldRows = data.split("\n");
    fieldRows.forEach(function (row) {
        var separated = row.split(":");
        var fieldType = separated.shift() || "none";
        var fieldRanges = [];
        separated[0].split(" ").forEach(function (i) {
            var split = i.split("-");
            split.length === 2 ? fieldRanges.push(split) : null;
        });
        ranges[fieldType] = fieldRanges;
    });
    return ranges;
}
function parseNearbyTickets(data) {
    return data.split("\n").join(",").split(",").slice(1);
}
function parseNearbyTicketsKeepRows(data) {
    var rows = data.split("\n");
    rows.shift();
    var filteredRows = [];
    rows.forEach(function (row) {
        var found = false;
        for (var _i = 0, invalidTickets_1 = invalidTickets; _i < invalidTickets_1.length; _i++) {
            var ticket = invalidTickets_1[_i];
            if (row.indexOf(ticket.toString()) !== -1) {
                found = true;
                break;
            }
        }
        if (!found)
            filteredRows.push(row.split(","));
    });
    return filteredRows;
}
// console.log(`part 1: ${ticketTranslation1()}`); // part 1: 21978
console.log("part 2: " + ticketTranslation2()); //
