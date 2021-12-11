const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8')

const rows = input.split('\n').map(row => row.split('').map(Number));

const lowest = []

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        const cell = rows[i][j];

        //up left
        if(rows[i-1] === undefined && rows[i][j-1] === undefined) {
            if(rows[i+1][j] > cell && cell < rows[i][j+1]) {
                lowest.push([i,j])
            }
            continue;
        }

        //up right
        if(rows[i+1] === undefined && rows[i][j-1] === undefined) {
            if(rows[i-1][j] > cell && cell < rows[i][j+1]) {
                lowest.push([i,j])
            }
            continue;
        }

        //down left
        if(rows[i-1] === undefined && rows[i][j+1] === undefined) {
            if(rows[i+1][j] > cell && cell < rows[i][j-1]) {
                lowest.push([i,j])
            }
            continue;
        }

        //down right
        if(rows[i+1] === undefined && rows[i][j+1] === undefined) {
            if(rows[i-1][j] > cell && cell < rows[i][j-1]) {
                lowest.push([i,j])
            }
            continue;
        }

        //up
        if(rows[i][j-1] === undefined) {
            if(rows[i+1][j] > cell && cell < rows[i-1][j] && cell < rows[i][j+1]) {
                lowest.push([i,j])
            }
            continue;
        }

        //down
        if(rows[i][j+1] === undefined) {
            if(rows[i-1][j] > cell && cell < rows[i+1][j] && cell < rows[i][j-1]) {
                lowest.push([i,j])
            }
            continue;
        }

        //left
        if(rows[i-1] === undefined) {
            if(rows[i][j+1] > cell && cell < rows[i][j-1] && cell < rows[i+1][j]) {
                lowest.push([i,j])
            }
            continue;
        }

        //right
        if(rows[i+1] === undefined) {
            if(rows[i][j-1] > cell && cell < rows[i][j+1] && cell < rows[i-1][j]) {
                lowest.push([i,j])
            }
            continue;
        }

        if(rows[i][j-1] > cell && cell < rows[i][j+1] && cell < rows[i-1][j] && cell < rows[i+1][j]) {
            lowest.push([i,j])
        }
    }
}


function getBasinSize(inputI, inputJ, seenDict) {
    const neighbours = [
        [inputI - 1, inputJ],
        [inputI + 1, inputJ],
        [inputI, inputJ - 1],
        [inputI, inputJ + 1]
    ]

    let count = 1;

    for (const [i, j] of neighbours) {
        if (!seenDict[i]) {
            seenDict[i] = {};
        } else if (seenDict[i][j]) continue;

        seenDict[i][j] = true;

        if (rows[i] === undefined || rows[i][j] === undefined) continue;
        else if (rows[i][j] < 9) {
            count += getBasinSize(i, j, seenDict)
        };
    }

    return count;
}

const answer = lowest.map(([i,j]) => {
    const seenDict = {
        [i]: {[j]: true}
    };
    return getBasinSize(i, j, seenDict);
})

const answers = answer.sort((a,b) => b - a);

console.log(answers[0] * answers[1] * answers[2])
