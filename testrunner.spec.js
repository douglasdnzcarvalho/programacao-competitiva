const { spawn } = require('child_process');
const { readdirSync, readFileSync } = require('fs');

describe.each(getProblemsFolders('.'))('Problem %s', testProblem);

function testProblem(problemNumber) {
    let folderPath = './' + problemNumber;

    test.each(getValidTestCases(folderPath))('Scenario %s', async (scenarioNumber) => {
        let expected = readFileSync(`${folderPath}/output_${scenarioNumber}.txt`, 'UTF-8');
        let received = await executeScript(folderPath, scenarioNumber);

        expect(received).toBe(expected);
    })
}

function getProblemsFolders(path) {
    return readdirSync(path, { withFileTypes: true })
        .filter(file => file.isDirectory() && /^[0-9]+$/.test(file.name))
        .map(folder => folder.name);
}

function getValidTestCases(path) {
    return readdirSync(path, { withFileTypes: true })
        .filter(file => !file.isDirectory() && /^(input|output)_[0-9]+.txt$/.test(file.name))
        .reduce((allTests, file) => {
            let number = file.name.match(/[0-9]+/g)[0];
            let type = /^input_/.test(file.name) ? 'input' : 'output';
            let testCase = allTests.find(c => c.number == number);

            if (testCase == undefined) {
                testCase = { number: number }

                if (type == 'input') {
                    testCase.input = true;
                } else {
                    testCase.output = true;
                }

                allTests.push(testCase);
            } else {
                if (type == 'input') {
                    testCase.input = true;
                } else {
                    testCase.output = true;
                }
            }

            return allTests;
        }, [])
        .filter(testCase => testCase.input && testCase.output)
        .map(testCase => testCase.number);
}

async function executeScript(path, scenarioNumber) {
    const script = spawn('node', [`${path}/index.js`]);
    
    const input = readFileSync(`${path}/input_${scenarioNumber}.txt`, 'UTF-8');

    script.stdin.write(input);
    script.stdin.end();

    let output = "";
    let error = "";

    for await (const chunk of script.stdout) {
        output += chunk.toString();
    }

    for await (const chunk of script.stderr) {
        error += chunk;
    }

    const exitCode = await new Promise((resolve, reject) => {
        script.on('close', resolve);
    });

    if (exitCode) {
        throw new Error(`Script failed with code ${exitCode}: ${error}`);
    }

    return output;
}