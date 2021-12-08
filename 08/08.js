const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8')

const lines = input.split('\n');
const data = lines.map(line => line.split('|').map(s => s.trim()));

const uniqueNumbers = [2,3,4,7]

const part1 = () => {
    let sum = 0;

    for(let i = 0; i < data.length; i++) {
        data[i][1].split(' ').forEach(s => {
            if(uniqueNumbers.includes(s.length)) sum++;
        })
    }

    console.log(sum);
}