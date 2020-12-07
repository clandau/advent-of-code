const fs = require("fs");
const DATA: string[] = fs.readFileSync("./day7/input.txt", "utf-8").split("\n");


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
 
console.log(`Part 1: ${HandyHaversacks1(DATA)}`); // Part 1: 257


export {};