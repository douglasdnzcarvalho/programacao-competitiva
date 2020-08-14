require('readline').createInterface({ input: process.stdin }).on('line', readLine).on('close', main);

const inputs = [];

function readLine(value) {
    inputs.push(value);
}

function main() {
    while(inputs.length > 0){
        let testCases = parseInt(inputs.shift());
        let numbers = [];

        for (let tc = 0; tc < testCases; tc += 1) {
            numbers.push(inputs.shift());
        }

        numbers.sort((a,b) => a.localeCompare(b)).forEach(number => console.log(number));
    }    
}