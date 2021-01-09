var input = [1, 0, 18, 10, 19, 6];
// const input = [0,3,6];
function RambunctiousRecitation1(input) {
    var currentIteration = 1;
    var spokenNumberHolder = {};
    var currentSpokenNumber = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var i = input_1[_i];
        spokenNumberHolder[i] = currentIteration;
        currentIteration++;
    }
    while (currentIteration !== 2020) {
        // console.log(currentIteration)
        var priorHolder = currentSpokenNumber;
        if (spokenNumberHolder[priorHolder]) {
            currentSpokenNumber = currentIteration - spokenNumberHolder[priorHolder];
        }
        else {
            currentSpokenNumber = 0;
        }
        spokenNumberHolder[priorHolder] = currentIteration;
        currentIteration++;
    }
    return currentSpokenNumber;
}
function RambunctiousRecitation2(input) {
    var currentIteration = 1;
    // let spokenNumberHolder: any = {};
    var spokenNumberHolder = new Array(30000000);
    var currentSpokenNumber = 0;
    var priorHolder;
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var i = input_2[_i];
        spokenNumberHolder[i] = currentIteration;
        currentIteration++;
    }
    while (currentIteration < 30000000) {
        // console.log(currentIteration)
        priorHolder = currentSpokenNumber;
        if (spokenNumberHolder[priorHolder]) {
            currentSpokenNumber = currentIteration - spokenNumberHolder[priorHolder];
        }
        else {
            currentSpokenNumber = 0;
        }
        spokenNumberHolder[priorHolder] = currentIteration;
        currentIteration++;
    }
    return currentSpokenNumber;
}
console.time();
// console.log(`Part 1: ${RambunctiousRecitation1(input)}`); // Part 1: 441
console.log("Part 2: " + RambunctiousRecitation2(input));
console.timeEnd();
