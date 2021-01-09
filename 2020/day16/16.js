"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("./day16/input.txt", "utf-8").split("\n\n");
// const invalidTickets: number[] = [];
var invalidTickets = [
    12,
    22,
    977,
    10,
    8,
    985,
    977,
    5,
    985,
    15,
    991,
    8,
    999,
    999,
    990,
    21,
    979,
    989,
    976,
    14,
    984,
    991,
    976,
    998,
    989,
    13,
    3,
    984,
    23,
    986,
    16,
    11,
    990,
    10,
    4,
    10,
    6,
    4,
    980,
    7,
    6,
    14,
    5,
    22,
    989,
    995,
];
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
    var fieldKeys = Object.keys(ranges);
    var fieldValues = Object.values(ranges);
    var ticketRows = parseNearbyTicketsKeepRows(data[2]);
    console.log(ticketRows);
    var ticketLength = ticketRows[0].length;
    var locationCountHolder = new Array(fieldValues.length);
    ticketRows.forEach(function (ticket) {
        var _loop_1 = function (i) {
            var ticketInt = parseInt(ticket[i]);
            var _loop_2 = function (j_1) {
                fieldValues[j_1].forEach(function (f) {
                    var min = parseInt(f[0]);
                    var max = parseInt(f[1]);
                    if (ticketInt >= min && ticketInt <= max) {
                        if (locationCountHolder[i]) {
                            locationCountHolder[i][j_1]
                                ? (locationCountHolder[i][j_1] += 1)
                                : (locationCountHolder[i][j_1] = 1);
                        }
                        else {
                            locationCountHolder[i] = [];
                            locationCountHolder[i][j_1] = 1;
                        }
                    }
                });
            };
            for (var j_1 = 0; j_1 < fieldValues.length; j_1++) {
                _loop_2(j_1);
            }
        };
        for (var i = 0; i < ticket.length; i++) {
            _loop_1(i);
        }
    });
    var columnHolder = {};
    var foundFields = [];
    while (Object.keys(columnHolder).length < ticketLength) {
        for (var i = 0; i < locationCountHolder.length; i++) {
            var found = [];
            for (var j_2 = 0; j_2 < locationCountHolder[i].length; j_2++) {
                if (locationCountHolder[i][j_2] === ticketRows.length) {
                    var field = fieldKeys[j_2];
                    if (!Object.values(columnHolder).includes(field)) {
                        // if this FIELD is in there, move don't add it
                        found.push(j_2);
                    }
                }
            }
            if (found.length === 1) {
                var location_1 = found[0];
                columnHolder[i] = fieldKeys[location_1];
                foundFields.push(fieldKeys[location_1]);
                locationCountHolder[i] = [];
            }
        }
    }
    var myTicket = data[1].split("\n")[1].split(",");
    var departureValues = [];
    console.log(columnHolder);
    for (var i = 0; i < myTicket.length; i++) {
        console.log(columnHolder[i] + ": " + myTicket[i]);
        if (columnHolder[i].includes("departure")) {
            departureValues.push(parseInt(myTicket[i]));
        }
        console.log("departureValues: " + departureValues);
    }
    var product = departureValues[0] * departureValues[1];
    var j = 2;
    while (j < departureValues.length) {
        product *= departureValues[j];
        j++;
    }
    return product;
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
    var currentSplitRow;
    rows.forEach(function (row) {
        currentSplitRow = row.split(",");
        var found = false;
        for (var _i = 0, invalidTickets_1 = invalidTickets; _i < invalidTickets_1.length; _i++) {
            var ticket = invalidTickets_1[_i];
            if (currentSplitRow.indexOf(ticket.toString()) !== -1) {
                found = true;
                break;
            }
        }
        if (!found)
            filteredRows.push(currentSplitRow);
    });
    return filteredRows;
}
// console.log(`part 1: ${ticketTranslation1()}`); // part 1: 21978
console.log("part 2: " + ticketTranslation2()); //
