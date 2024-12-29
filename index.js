import minimist from 'minimist';

// Test here the different solutions
console.log(`Advent Of Code`);

const args = minimist(process.argv.slice(2));
const day = args.day; // Access the named argument "day"

console.log(`Day: ${day}`);

require('../AdventOfCode/days/1');
