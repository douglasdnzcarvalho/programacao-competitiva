require('readline').createInterface({ input: process.stdin }).on('line', readLine).on('close', main);

const inputs = [];

function readLine(value) {
    inputs.push(value);
}

function main() {
    let column = parseInt(inputs.shift());
    let operation = inputs.shift();
    let sum = 0;

    for(let l = 0; l < 12; l += 1){
        for(let c = 0; c < 12; c += 1){
            let value = parseFloat(inputs.shift());

            if(c == column) sum += value;
        }
    }

    console.log( (operation == 'S' ? sum : sum / 12).toFixed(1) );
}