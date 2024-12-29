import { AdventClient } from "../client.js";

const MIN_DIFF = 1;
const MAX_DIFF = 3;

async function createInput() {
    // obtain input from Advent web client
    const adventClient = new AdventClient(2024, 2);
    const plainInput = await adventClient.input();

    let input = plainInput.split('\n');
    input.pop();
    input = input
        .map(report => report.split(' ')
        .map(Number));

    return input;
}

function isAsc(list) {
    let current;
    let next;
    for (let i = 0; i < list.length - 1; i++) {
        current = list[i];
        next = list[i + 1];

        if (current > next)
            return false;
    }

    return true;
}

function isDesc(list) {
    let current;
    let next;
    for (let i = 0; i < list.length - 1; i++) {
        current = list[i];
        next = list[i + 1];

        if (current < next)
            return false;
    }

    return true;
}

function hasAdjacentValidDiff(report) {
    let adjacentDiffs = report.map((n, index) => {
        if (index === 0)
            return -1;
        else
            return Math.abs(n - report[index - 1]);
    });

    adjacentDiffs.shift();

    if (MIN_DIFF > Math.min(...adjacentDiffs))
        return false;
    if (MAX_DIFF < Math.max(...adjacentDiffs)) {
        return false;
    }

    return true;
}

function isSafe(report) {
    return hasAdjacentValidDiff(report) &&
        (isAsc(report) || isDesc(report));
}

function answer_part1(input) {
    return input.filter(report => isSafe(report)).length;
}

const input = await createInput();
const solution = answer_part1(input);

console.log(`input = ${JSON.stringify(input)}`);
console.log(`[Part 1] solution = ${solution}`);