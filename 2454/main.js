require('readline').createInterface({ input: process.stdin }).on('line', readLine).on('close', main);

const flipper = [
    ['C', 'C'],
    ['B', 'A']
];
let choices;

function readLine(value) {
    choices = value.split(' ').map(number => parseInt(number));
}

function main() {
    console.log(flipper[choices[0]][choices[1]]);
}