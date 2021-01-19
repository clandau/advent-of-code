const fs = require("fs");
const data = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");
const sampleData = fs.readFileSync("./day2/testInput.txt", "utf-8").split("\n");
function IMS1(boxes) {
    let twiceCount = 0;
    let thriceCount = 0;
    for (let box of boxes) {
        const numberCountHolder = {};
        for (let item of box) {
            numberCountHolder[item]
                ? numberCountHolder[item]++
                : (numberCountHolder[item] = 1);
        }
        const vals = Object.values(numberCountHolder);
        if (vals.indexOf(2) > -1)
            twiceCount++;
        if (vals.indexOf(3) > -1)
            thriceCount++;
    }
    return twiceCount * thriceCount;
}
function IMS2(boxes) {
    let a = 0;
    let b = 0;
    let item1 = boxes[a];
    let item2 = boxes[b];
    while (a < boxes.length - 1) {
        while (b < boxes.length) {
            let differentLetterLocations = [];
            for (let i = 0; i < item1.length; i++) {
                if (item1[i] !== item2[i]) {
                    differentLetterLocations.push(i);
                }
            }
            if (differentLetterLocations.length === 1) {
                let sub1 = item1.substring(0, differentLetterLocations[0]);
                let sub2 = item1.substring(differentLetterLocations[0] + 1);
                return sub1 + sub2;
            }
            else {
                b++;
                item2 = boxes[b];
            }
        }
        a++;
        b = a + 1;
        item1 = boxes[a];
        item2 = boxes[b];
    }
}
console.log(`Part 1: ${IMS1(data)}`);
console.log(`Part 2: ${IMS2(data)}`);
