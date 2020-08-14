require('readline').createInterface({ input: process.stdin }).on('line', readLine).on('close', main);

const inputs = [];

function readLine(value) {
    inputs.push(value);
}

function main() {
    let testCases = parseInt(inputs.shift());

    for (let tc = 0; tc < testCases; tc += 1) {
        let groupSize = parseInt(inputs.shift());

        let lastlLanguage;
        let actualLanguage;
        let speakInEnglish = false;

        for (let p = 0; p < groupSize; p += 1) {
            if (p == 0) {
                lastlLanguage = inputs.shift();
                actualLanguage = lastlLanguage;
            } else {
                actualLanguage = inputs.shift();
            }

            if (actualLanguage != lastlLanguage) {
                speakInEnglish = true;
            }
        }

        console.log(speakInEnglish ? 'ingles' : actualLanguage);
    }
}