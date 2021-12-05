const fs = require('fs');

const arr = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n')

const findMostCommonBit = (arr, position = 0) => {
    if (arr.length === 1 || arr.length === 0) return arr[0];

    const newArr = []
    const bits = {}

    for(let j = 0; j< arr.length; j++){
        let bit = arr[j][position];
        bits[bit] ? bits[bit]++ : bits[bit] = 1;
    }

    for(let j = 0; j< arr.length; j++){
        if (bits['0'] > bits['1'] && arr[j][position] === '0'){
            newArr.push(arr[j]);
        }
        if (bits['0'] < bits['1'] && arr[j][position] === '1'){
            newArr.push(arr[j]);
        }
        if (bits['0'] === bits['1'] && arr[j][position] === '1') {
            newArr.push(arr[j]);
        }
    }

    return findMostCommonBit(newArr, position + 1);
}

const findLeastCommonBit = (arr, position = 0) => {
    if (arr.length === 1 || arr.length === 0) return arr[0];

    const newArr = []
    const bits = {}

    for(let j = 0; j< arr.length; j++){
        let bit = arr[j][position];
        bits[bit] ? bits[bit]++ : bits[bit] = 1;
    }

    for(let j = 0; j< arr.length; j++){
        if (bits['0'] < bits['1'] && arr[j][position] === '0'){
            newArr.push(arr[j]);
        }
        if (bits['0'] > bits['1'] && arr[j][position] === '1'){
            newArr.push(arr[j]);
        }
        if (bits['0'] === bits['1'] && arr[j][position] === '0') {
            newArr.push(arr[j]);
        }
    }

    return findLeastCommonBit(newArr, position + 1);
}


const mostCommonBit = parseInt(findMostCommonBit(arr),2);
const leastCommonBit = parseInt(findLeastCommonBit(arr),2);

console.log(mostCommonBit * leastCommonBit);