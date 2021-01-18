const fs = require("fs");
const data = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");
const sampleData = ["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"];
function IMS1(boxes) {
    let twiceCount = 0;
    let thriceCount = 0;
    for (let box of boxes) {
        const numberCountHolder = {};
        for (let item of box) {
            numberCountHolder[item] ? numberCountHolder[item]++ : numberCountHolder[item] = 1;
        }
        const vals = Object.values(numberCountHolder);
        if (vals.indexOf(2) > -1)
            twiceCount++;
        if (vals.indexOf(3) > -1)
            thriceCount++;
    }
    console.log(twiceCount, thriceCount);
    return twiceCount * thriceCount;
}
console.log(`Part 1: ${IMS1(data)}`);
