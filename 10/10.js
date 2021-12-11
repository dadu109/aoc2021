const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8').split('\n');

const openingBrackets = ['(', '{', '[', '<'];
const closingBrackets = [')', '}', ']', '>'];

const corruptedPoints = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const incompletePoints = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}

const getFirstIllegalCharVal = (line) => {
    const stack = [];

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (openingBrackets.includes(char)) {
            stack.push(char);
        }

        if (closingBrackets.includes(char)) {
            const lastChar = stack.pop();

            if (closingBrackets.indexOf(char) !== openingBrackets.indexOf(lastChar)) {
                return corruptedPoints[char];
            }
        }
    }

    return 0;
}

const getIncompleteLineVal = (line) => {
    const stack = [];

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (openingBrackets.includes(char)) {
            stack.push(char);
        }

        if (closingBrackets.includes(char)) {
            const lastChar = stack.pop();

            if (closingBrackets.indexOf(char) !== openingBrackets.indexOf(lastChar)) {
                return 0;
            }
        }
    }

    return [...stack.reverse()].reduce((acc, char) => (acc * 5) + incompletePoints[char], 0);
}

const part1 = () => {
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        const corruptedChar = getFirstIllegalCharVal(input[i]);

        sum += corruptedChar;
        console.log(`${corruptedChar} is found`);
    }

    console.log(sum);
}


const part2 = () => {
    let results = [];

    for (let i = 0; i < input.length; i++) {
        const result = getIncompleteLineVal(input[i]);

        if(result !== 0) {
            results.push(result);
        }
    }

    results = results.sort((a,b) => a - b);

    console.log(results[(results.length - 1) / 2]);
}

part2();

// console.log(getIncompleteLineVal('<{([{{}}[<[[[<>{}]]]>[]]'));