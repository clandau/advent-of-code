"use strict";
exports.__esModule = true;
var fs = require("fs");
var DATA = fs.readFileSync("./day7/input.txt", "utf-8").split("\n");
function HandyHaversacks1(rules) {
    var bagColors = {};
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        var splitOnContain = rule.split(" contain ");
        var holdingBag = splitOnContain[0].split(" ").slice(0, -1).join(" ");
        if (!bagColors[holdingBag]) {
            bagColors[holdingBag] = [];
        }
        var containingBags = splitOnContain[1].split(", ");
        for (var _a = 0, containingBags_1 = containingBags; _a < containingBags_1.length; _a++) {
            var bag = containingBags_1[_a];
            if (bag !== "no other bags.") {
                var bagDescription = bag.split(" ").slice(1, -1).join(" ");
                if (bagColors[bagDescription]) {
                    bagColors[bagDescription].push(holdingBag);
                }
                else {
                    bagColors[bagDescription] = [holdingBag];
                }
            }
        }
    }
    var totalCount = 0;
    var counted = [];
    function countOccurances(items) {
        if (!items)
            return;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (counted.indexOf(item) === -1) {
                totalCount++;
                counted.push(item);
                countOccurances(bagColors[item]);
            }
        }
    }
    countOccurances(["shiny gold"]);
    return totalCount - 1;
}
console.log("Part 1: " + HandyHaversacks1(DATA));
