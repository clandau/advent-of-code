const fs = require("fs");
const DATA = fs.readFileSync("./day6/input.txt", "utf-8").split("\n\n");
function customCustoms1(answerGroups) {
    let sumOfCounts = 0;
    answerGroups.forEach(group => {
        sumOfCounts += new Set(group.split("\n").join("").split("")).size;
    });
    return sumOfCounts;
}
function customCustoms2(answerGroups) {
    let sumOfCounts = 0;
    answerGroups.forEach(group => {
        const personGroup = group.split("\n");
        const numberOfPeople = personGroup.length;
        const answerHolder = {};
        personGroup.forEach(person => {
            for (let i of person) {
                answerHolder[i] ? answerHolder[i]++ : answerHolder[i] = 1;
            }
        });
        Object.entries(answerHolder).forEach(count => {
            count[1] === numberOfPeople ? sumOfCounts++ : null;
        });
    });
    return sumOfCounts;
}
console.log(`Part 1: ${customCustoms1(DATA)}`);
console.log(`Part 2: ${customCustoms2(DATA)}`); // Part 2: 3354
