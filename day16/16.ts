const fs = require("fs");
const data = fs.readFileSync("./day16/input.txt", "utf-8").split("\n\n");
// const invalidTickets: number[] = [];
const invalidTickets = [
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
  const fieldKeys = Object.keys(ranges);
  const fieldValues = Object.values(ranges);
  const ticketRows = parseNearbyTicketsKeepRows(data[2]);
  const ticketLength = ticketRows[0].length;
  const locationCountHolder: number[][] = new Array(fieldValues.length);
  ticketRows.forEach((ticket) => {
    for (let i = 0; i < ticket.length; i++) {
      let ticketInt = parseInt(ticket[i]);
      for (let j = 0; j < fieldValues.length; j++) {
        fieldValues[j].forEach((f) => {
          let min = parseInt(f[0]);
          let max = parseInt(f[1]);
          if (ticketInt >= min && ticketInt <= max) {
            if (locationCountHolder[i]) {
              locationCountHolder[i][j]
                ? (locationCountHolder[i][j] += 1)
                : (locationCountHolder[i][j] = 1);
            } else {
              locationCountHolder[i] = [];
              locationCountHolder[i][j] = 1;
            }
          }
        });
      }
    }
  });
  let columnHolder: any = {};
  let foundFields: string[] = [];

  while (Object.keys(columnHolder).length < ticketLength) {
    for (let i = 0; i < locationCountHolder.length; i++) {
      let found = [];
      for (let j = 0; j < locationCountHolder[i].length; j++) {
        if (locationCountHolder[i][j] === ticketRows.length) {
          const field = fieldKeys[j];
          if (!Object.values(columnHolder).includes(field)) {
            // if this FIELD is in there, move don't add it
            found.push(j);
          }
        }
      }
      if (found.length === 1) {
        let location = found[0];
        columnHolder[i] = fieldKeys[location];
        foundFields.push(fieldKeys[location]);
        locationCountHolder[i] = [];
      }
    }
  }
  const myTicket = data[1].split("\n")[1].split(",");
  let departureValues: number[] = [];
  for (let i = 0; i < myTicket.length; i++) {
    if (columnHolder[i].includes("departure")) {
      departureValues.push(parseInt(myTicket[i]));
    }
  }
  let product = departureValues[0] * departureValues[1];
  let j = 2;
  while (j < departureValues.length) {
    product *= departureValues[j];
    j++;
  }
  return product;
}

function parseRanges(data: string) {
  const ranges: string[][] = [];
  let fieldRows = data.split("\n").join(" ").split(" ");
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
  let currentSplitRow;
  rows.forEach((row) => {
    currentSplitRow = row.split(",");
    let found = false;
    for (let ticket of invalidTickets) {
      if (currentSplitRow.indexOf(ticket.toString()) !== -1) {
        found = true;
        break;
      }
    }
    if (!found) filteredRows.push(currentSplitRow);
  });
  return filteredRows;
}

// console.log(`part 1: ${ticketTranslation1()}`); // part 1: 21978
console.log(`part 2: ${ticketTranslation2()}`); // part 2: 1053686852011

export {};
