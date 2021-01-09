const fs = require("fs");
const data = fs.readFileSync("./day14/input.txt", "utf-8").split("\n");

function dockingData1() {
  const storedValues: any = {};
  let mask: string[] = parseMask(data[0]);
  for (let item of data) {
    if (item.startsWith("mask")) {
      mask = parseMask(item);
    } else {
      const writeInfo = item.split(" = ");
      const location = writeInfo[0].split("mem[")[1].split("]")[0];
      let value = (writeInfo[writeInfo.length - 1] >>> 0)
        .toString(2)
        .padStart(mask.length, "0")
        .split("");
      for (let j = mask.length - 1; j >= 0; j--) {
        if (mask[j] !== "X") {
          value[j] = mask[j];
        }
      }
      storedValues[location] = parseInt(value.join(""), 2);
    }
  }
  return Object.values(storedValues).reduce((a, b) => {
    return <number>a + <number>b;
  });
}

function dockingData2() {
  const storedLocations: any = {};
  let mask: string[] = parseMask(data[0]);
  for (let item of data) {
    if (item.startsWith("mask")) {
      mask = parseMask(item);
    } else {
      // convert location to binary
      let writeLocations: string[] = [];
      const writeInfo = item.split(" = ");
      let currentValue = writeInfo[writeInfo.length - 1]
      const location = (writeInfo[0].split("mem[")[1].split("]")[0] >>> 0)
        .toString(2)
        .padStart(mask.length, "0")
        .split("");
      writeLocations = [""];
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "1") {
          writeLocations = writeLocations.map((loc) => {
            return loc += "1";
          });
        } else if (mask[i] === "0") {
          writeLocations = writeLocations.map((loc) => {
            return (loc += location[i]);
          });
        } else {
          let newLocs = [...writeLocations];
          newLocs = newLocs.map((loc) => loc += "1");
          writeLocations = writeLocations.map((loc) => (loc += "0"));
          writeLocations = newLocs.concat(writeLocations);
        }
      }
      writeLocations.forEach(loc => storedLocations[loc] = currentValue)
    }
  }
  return Object.values(storedLocations).reduce((a, b) => {
    return parseInt(<string>a) + parseInt(<string>b);
  });
}

function parseMask(maskStr: string) {
  return maskStr.split(" = ")[1].split("");
}

console.log(`Part 1: ${dockingData1()}`);  // Part 1: 11327140210986
console.log(`Part 2: ${dockingData2()}`); // Part 2: 2308180581795

export {};
