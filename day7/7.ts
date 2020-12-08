import { createSecureContext } from "tls";

const fs = require("fs");
const DATA: string[] = fs.readFileSync("./day7/input.txt", "utf-8").split("\n");
const testData: string[] = fs.readFileSync("./day7/practiceInput.txt", "utf-8").split("\n");

function HandyHaversacks1(rules: string[]) {
  const bagColors: any = {}
  for (let rule of rules) {
    const splitOnContain = rule.split(" contain ");
    const holdingBag = splitOnContain[0].split(" ").slice(0, -1).join(" ");
    if (!bagColors[holdingBag]) {
      bagColors[holdingBag] = [];
    }
    const containingBags = splitOnContain[1].split(", ");
    for (let bag of containingBags) {
      if (bag !== "no other bags.") {
        let bagDescription = bag.split(" ").slice(1, -1).join(" ");
        if (bagColors[bagDescription]) {
          bagColors[bagDescription].push(holdingBag)
        } else {
          bagColors[bagDescription] = [holdingBag];
        }
      }
    }
  }
  let totalCount = 0;
  const counted: string[] = [];
  function countOccurances (items: string[]): void {
    if (!items) return;
    for (let item of items) {
      if (counted.indexOf(item) === -1) {
        totalCount++;
        counted.push(item)
        countOccurances(bagColors[item])
      }
    }
  }
  countOccurances(["shiny gold"])
  return totalCount - 1;
}

function HandyHaversacks2(rules: string[]) {
  const bagCollection: any = {}
  for (let rule of rules) {
    const splitOnContain = rule.split(" contain ");
    const holdingBag = splitOnContain[0].split(" ").slice(0, -1).join(" ");
    if (!bagCollection[holdingBag]) {
      bagCollection[holdingBag] = {};
    }
    const containingBags = splitOnContain[1].split(", ");
    for (let bag of containingBags) {
      if (bag !== "no other bags.") {
        let bagDetails = bag.split(" ");
        const count = bagDetails.shift();
        let bagDescription = bag.split(" ").slice(1, -1).join(" ");
        count ? bagCollection[holdingBag][bagDescription] = parseInt(count) : null;
      }
    }
  }
  let totalCount = 0;
  
  function countTotalBags(item: string, numberOfItems = 1) : void {
    totalCount += numberOfItems;
    if (!bagCollection[item]) return;
    Object.keys(bagCollection[item]).forEach(key => {
      return countTotalBags(key, bagCollection[item][key] * numberOfItems)
    })
  }

  countTotalBags("shiny gold")
  return totalCount - 1;
}
 
// console.log(`Part 1: ${HandyHaversacks1(DATA)}`); // Part 1: 257
console.log(`Part 2: ${HandyHaversacks2(DATA)}`);  // Part 2: 1038


export {};