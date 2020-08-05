const { readdirSync } = require('fs');

let foldersList = readdirSync('.', { withFileTypes: true })
    .filter(file => file.isDirectory() && /^[0-9]+$/.test(file.name))
    .map(folder => folder.name);

describe.each(foldersList)('Problem %s', testProblem);

function testProblem(problemNumber) {
    test('first function', () => {
        expect(problemNumber).toBe('1001');
    });
    test('second function', () => {
        expect(problemNumber).toBe('1002');
    });
}