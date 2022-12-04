import { parseData } from "../helpers.js";

const data = parseData("day-3/sampleInput.txt");

function computeOnesCount(data) {
  const onesCount = [];
  for (const input of data) {
    input.split("").map((val, i) => {
      if (val === "1") {
        onesCount[i] ? (onesCount[i] += 1) : (onesCount[i] = 1);
      }
    });
  }
  return onesCount;
}

function computeGammaAndEpsilon(onesCount, total) {
  return onesCount.reduce(
    ({ gamma = "", epsilon = "" }, count) => {
      if (count > total / 2) {
        gamma += "1";
        epsilon += "0";
      } else {
        gamma += "0";
        epsilon += "1";
      }
      return { gamma, epsilon };
    },
    {}
  );
}

function puzzle1(data) {
  const onesCount = computeOnesCount(data);

  const { gamma, epsilon } = computeGammaAndEpsilon(onesCount, data.length);

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

console.log(puzzle1(data));
console.log(puzzle2(data));

