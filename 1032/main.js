require('readline').createInterface({ input: process.stdin }).on('line', readLine).on('close', main);

const people = [];
const primes = [];

function readLine(value) {
    value = parseInt(value);

    if (value) people.push(value);
}

function main() {
    for (let number of people) {
        let alive = new Array(number).fill(true);
        let remaining = number;
        let primeIndex = 0;
        let lastPosition = -1;

        while (remaining > 1) {
            let eliminate = getNextPrime(primeIndex);

            for (let position = (lastPosition + 1), done = false; done != true; position += 1) {
                if (alive[position]) {
                    eliminate -= 1;

                    if (eliminate == 0) {
                        alive[position] = false;
                        lastPosition = position;

                        primeIndex += 1;
                        remaining -= 1;

                        done = true;
                    }
                }

                if (position == number) position = -1;
            }
        }

        console.log( alive.findIndex(a => a === true) + 1 );
    }
}

function getNextPrime(position) {
    if (primes[position]) {
        return primes[position];
    }

    let nextValue = primes.length ? (primes[primes.length - 1]) + 1 : 2;

    while (!isPrime(nextValue)) {
        nextValue += 1;
    }

    primes.push(nextValue);

    return nextValue;
}

function isPrime(value) {
    for (let prime of primes) {
        if (value % prime == 0) return false;
    }

    return true;
}