require('readline').createInterface({ input: process.stdin }).on('line', readLine).on('close', main);

const inputs = [];

function readLine(value) {
    inputs.push(value);
}

function main() {
    let available = inputs[0].split(' ').map(number => parseInt(number));
    let requested = inputs[1].split(' ').map(number => parseInt(number));

    console.log(Math.max(requested[0] - available[0], 0) + Math.max(requested[1] - available[1], 0) + Math.max(requested[2] - available[2], 0));
}