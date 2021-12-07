const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8').split(',').map(Number)

const sampleInput = '16,1,2,0,4,2,7,1,2,14'.split(',').map(Number);

const part1 = () => {
    let dict = {};

    const max = input.reduce((a, b) => Math.max(a, b));
    const min = input.reduce((a, b) => Math.min(a, b));

    for(let i = min; i < max+1; i++) {
        let sum = 0;

        for(let j = 0; j < input.length; j++) {
            sum += Math.abs(input[j] - i);
        } 

        dict[i] = sum;
    }

    const getLowestValueInDict = () => {
        let lowestValue = Infinity;

        for(let key in dict) {
            if(dict[key] < lowestValue) {
                lowestValue = dict[key];
            }
        }

        return lowestValue;
    }

    console.log(getLowestValueInDict(dict));
}

let dict = {};

    const max = input.reduce((a, b) => Math.max(a, b));
    const min = input.reduce((a, b) => Math.min(a, b));

    for(let i = min; i < max+1; i++) {
        let sum = 0;

        for(let j = 0; j < input.length; j++) {
            const steps = Math.abs(input[j] - i);

            for (let i = 1; i <= steps; i++) {
                sum += i;
            }
        } 

        dict[i] = sum;
    }

    const getLowestValueInDict = () => {
        let lowestValue = Infinity;

        for(let key in dict) {
            if(dict[key] < lowestValue) {
                lowestValue = dict[key];
            }
        }

        return lowestValue;
    }

    console.log(getLowestValueInDict(dict));