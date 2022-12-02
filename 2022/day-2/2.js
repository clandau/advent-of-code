import { parseData } from "../index.js";

const data = parseData("day-2/input.txt");

const scores = {
  A: 1, // rock  (beats scissors)
  B: 2, // paper (beats rock)
  C: 3, // scissors (beats paper)
  X: 1,
  Y: 2,
  Z: 3,
};

function puzzle1(input) {
  let myScore = 0;

  for (const game of input) {
    const player1 = scores[game[0]];
    const player2 = scores[game[2]];
    let gameScore = player2;

    if (player2 - (player1 % 3) === 1) {
      gameScore += 6;
    }

    if (player2 === player1) {
      gameScore += 3;
    }

    myScore += gameScore;
  }

  return myScore;
}

const RPC = ["A", "B", "C"];
const wldOffsets = {
  X: { offset: 2, bonus: 0 },
  Y: { offset: 0, bonus: 3 },
  Z: { offset: 1, bonus: 6 },
};

function puzzle2(input) {
  let myScore = 0;

  for (const game of input) {
    const player1 = game[0];
    const player2data = wldOffsets[game[2]];

    const place = (RPC.indexOf(player1) + player2data.offset) % RPC.length;

    myScore += scores[RPC[place]] + player2data.bonus;
  }

  return myScore;
}

console.log(`Puzzle 1: ${puzzle1(data)}`);
console.log(`Puzzle 2: ${puzzle2(data)}`);
