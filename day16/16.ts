import { sep } from "path";

const fs = require("fs");
const data = fs.readFileSync("./day16/testInput.txt", "utf-8").split("\n\n");
const invalidTickets: number[] = [];
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
  let invalidTickets: number[] = [];
  const ranges = parseRanges(data[0]);
  const nearbyTickets = parseNearbyTickets(data[2]);
  for (let ticket of nearbyTickets) {
    const ticketInt = parseInt(ticket);
    let i = 0;
    let found = false;
    while (!found && i < ranges.length) {
      let min = parseInt(ranges[i][0]);
      let max = parseInt(ranges[i][1]);
      if (ticketInt >= min && ticketInt <= max) {
        found = true;
      }
      i++;
    }
    if (!found) invalidTickets.push(ticketInt);
  }
  return invalidTickets.reduce((a, b) => a + b);
}
function ticketTranslation2() {
  const ranges: string[][] = parseRangesKeepRows(data[0]);
  const ticketLocationCounts: any = {}
  const fieldArray = Object.entries(ranges);
  const fieldValues = Object.values(ranges);
  const ticketRows = parseNearbyTicketsKeepRows(data[2]);
  const locationCountHolder: number[][] = new Array(fieldValues.length);
  ticketRows.forEach((ticket) => {
    for (let i = 0; i < ticket.length; i++) {
      let ticketInt = parseInt(ticket[i])
      for (let j = 0; j < fieldValues.length; j++) {
        fieldValues[j].forEach(f => {
          let min = parseInt(f[0]);
          let max = parseInt(f[1]);
          if (ticketInt >= min && ticketInt <= max) {
            if (locationCountHolder[i]) {
              locationCountHolder[i][j] ? locationCountHolder[i][j] += 1 : locationCountHolder[i][j] = 1;
            } else {
              locationCountHolder[i] = [];
              locationCountHolder[i][j] = 1;
            }
            console.log(locationCountHolder);
          }
        })
      }
    }
  })
  console.log(locationCountHolder)
  const locations = [];
  for (let i = 0; i< locationCountHolder.length; i++) {
    // if only one is in all of them, that will be the correct index
    let locationsWithAll: number[] = [];
    locationCountHolder[i].forEach(item => {
      if (item === ticketRows.length) {
        locationsWithAll.push(i);
      }
    })
    if (locationsWithAll.length === 1) {
      locations[i] = locationsWithAll[0]
    }
    console.log(locationsWithAll);
  }
  console.log(locations)
}

function parseRanges(data: string) {
  const ranges: string[][] = [];
  let fieldRows = data.split("\n").join(" ").split(" ");
  console.log(fieldRows);
  fieldRows.forEach((row) => {
    if (row.includes("-")) {
      let rangeInts = row.split("-");
      ranges.push(rangeInts);
    }
  });
  return ranges;
}

function parseRangesKeepRows(data: string) {
  let ranges: any = {};
  let fieldRows = data.split("\n");
  fieldRows.forEach((row) => {
    const separated = row.split(":");
    const fieldType = separated.shift() || "none";
    const fieldRanges: string[][] = [];
    separated[0].split(" ").forEach((i) => {
      let split = i.split("-");
      split.length === 2 ? fieldRanges.push(split) : null;
    });
    ranges[fieldType] = fieldRanges;
  });
  return ranges;
}

function parseNearbyTickets(data: string) {
  return data.split("\n").join(",").split(",").slice(1);
}

function parseNearbyTicketsKeepRows(data: string) {
  const rows = data.split("\n");
  rows.shift();
  const filteredRows: string[][] = [];
  rows.forEach((row) => {
    let found = false;
    for (let ticket of invalidTickets) {
      if (row.indexOf(ticket.toString()) !== -1) {
        found = true;
        break;
      }
    }
    if (!found) filteredRows.push(row.split(","));
  });
  return filteredRows;
}

// console.log(`part 1: ${ticketTranslation1()}`); // part 1: 21978
console.log(`part 2: ${ticketTranslation2()}`); //

export {};
