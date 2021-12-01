const fs = require('fs');

const arr = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map(Number)

const countIncreases = (arr) => arr.reduce((acc, curr, index, arr) => {
    if (index === 0) { return acc}

    return curr > arr[index - 1] ? acc + 1 : acc
}, 0)

const aggregateInToWindows = (arr) => {
    const windows = []
    for (let i = 0; i < arr.length - 2; i++) {
        let window = 0;
        for (let j = i; j < i + 3; j++) {
            window += arr[j]
        }
        windows.push(window)
    }
    return windows
}

const aggregatedWindows = aggregateInToWindows(arr)

console.log(countIncreases(aggregatedWindows))
