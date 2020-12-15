const input = [1,0,18,10,19,6];
// const input = [0,3,6];

function RambunctiousRecitation1(input: number[]) {
  let currentIteration = 1;
  let spokenNumberHolder: any = {};
  let currentSpokenNumber = 0;
  for (let i of input) {
    spokenNumberHolder[i] = currentIteration;
    currentIteration++;
  }
  while (currentIteration !== 2020) {
    let priorHolder = currentSpokenNumber;
    if (spokenNumberHolder[priorHolder]) {
      currentSpokenNumber = currentIteration - spokenNumberHolder[priorHolder];
    } else {
      currentSpokenNumber = 0;
    }
    spokenNumberHolder[priorHolder] = currentIteration;
    currentIteration++;
  }
  return currentSpokenNumber;
}

function RambunctiousRecitation2(input: number[]) {
  let currentIteration = 1;
  let spokenNumberHolder = new Array(30000000);
  let currentSpokenNumber = 0;
  let priorHolder;
  for (let i of input) {
    spokenNumberHolder[i] = currentIteration;
    currentIteration++;
  }
  while (currentIteration < 30000000) {
    priorHolder = currentSpokenNumber;
    if (spokenNumberHolder[priorHolder]) {
      currentSpokenNumber = currentIteration - spokenNumberHolder[priorHolder];
    } else {
      currentSpokenNumber = 0;
    }
    spokenNumberHolder[priorHolder] = currentIteration;
    currentIteration++;
  }
  return currentSpokenNumber;
}

console.time()
// console.log(`Part 1: ${RambunctiousRecitation1(input)}`); // Part 1: 441
console.log(`Part 2: ${RambunctiousRecitation2(input)}`); // Part 2: 10613991
console.timeEnd();
