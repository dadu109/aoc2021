const fs = require('fs');

const arr = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n')

let gammaRate = '';

for(let i = 0; i< arr[0].length; i++){
    let bits = {};

    for(let j = 0; j< arr.length; j++){
        let bit = arr[j][i];
        bits[bit] ? bits[bit]++ : bits[bit] = 1;
    }

    bits['0'] > bits['1'] ? gammaRate += '0' : gammaRate += '1';
}

const flipBits = (str) => str.split('').map(x => x === '0' ? '1' : '0').join('');

const epsilonRate = flipBits(gammaRate);
const answer  = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)

console.log(answer);