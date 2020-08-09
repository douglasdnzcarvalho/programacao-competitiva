require('readline').createInterface({input: process.stdin}).on('line', readLine).on('close', main);

const lines = [];

function readLine(value){
  lines.push(parseInt(value))
}

function main() {
  console.log(`SOMA = ${lines[0] + lines[1]}`);
}