const { spawn } = require('child_process');
const { readdirSync, readFileSync } = require('fs');

describe.each(getTestSuites('.'))('Problem %s', testProblem);

function testProblem(problemNumber, cases) {
    let folderPath = './' + problemNumber;

    test.each(cases)('Scenario %s', async (scenarioNumber, testCase) => {
        let received = await executeScript(folderPath, scenarioNumber, testCase);
        let expected = readFileSync(`${folderPath}/output_${scenarioNumber}.txt`, 'UTF-8');

        expect(received).toBe(expected);
    })
}

function getTestSuites(path) {
    return readdirSync(path, { withFileTypes: true })
        .filter(file => file.isDirectory() && /^[0-9]+$/.test(file.name))
        .reduce((suites, folder) => {
            let testSuite = getValidTestCases('./' + folder.name);

            if (testSuite.length) {
                suites.push([folder.name, testSuite])
            }

            return suites;
        }, []);
}

function getValidTestCases(path) {
    return readdirSync(path, { withFileTypes: true })
        .filter(file => !file.isDirectory() && /^(input|output)_[0-9]+.txt$/.test(file.name))
        .reduce((allTests, file) => {
            let number = file.name.match(/[0-9]+/g)[0];
            let type = /^input_/.test(file.name) ? 'input' : 'output';
            let testCase = allTests.find(test => test[0] == number);

            if (testCase == undefined) {
                testCase = [number, { input: false, output: false }];

                allTests.push(testCase);
            }

            if (type == 'input') testCase[1].input = true;

            if (type == 'output') testCase[1].output = true;

            return allTests;
        }, [])
        .filter(testCase => testCase[1].output);
}

async function executeScript(path, scenarioNumber, options) {
    const script = spawn('node', [`${path}/main.js`]);

    if (options.input) {
        const input = readFileSync(`${path}/input_${scenarioNumber}.txt`, 'UTF-8');

        script.stdin.write(input);
        script.stdin.end();
    }

    let output = "";
    let error = "";

    for await (const chunk of script.stdout) {
        output += chunk.toString();
    }

    for await (const chunk of script.stderr) {
        error += chunk.toString();
    }

    const exitCode = await new Promise((resolve, reject) => {
        script.on('close', resolve);
    });

    if (exitCode) {
        throw new Error(`Script failed with code ${exitCode}: ${error}`);
    }

    return output;
}