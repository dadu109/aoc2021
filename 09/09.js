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
                lowest.push(cell)
            }
            continue;
        }

        //up right
        if(rows[i+1] === undefined && rows[i][j-1] === undefined) {
            if(rows[i-1][j] > cell && cell < rows[i][j+1]) {
                lowest.push(cell)
            }
            continue;
        }

        //down left
        if(rows[i-1] === undefined && rows[i][j+1] === undefined) {
            if(rows[i+1][j] > cell && cell < rows[i][j-1]) {
                lowest.push(cell)
            }
            continue;
        }

        //down right
        if(rows[i+1] === undefined && rows[i][j+1] === undefined) {
            if(rows[i-1][j] > cell && cell < rows[i][j-1]) {
                lowest.push(cell)
            }
            continue;
        }

        //up
        if(rows[i][j-1] === undefined) {
            if(rows[i+1][j] > cell && cell < rows[i-1][j] && cell < rows[i][j+1]) {
                lowest.push(cell)
            }
            continue;
        }

        //down
        if(rows[i][j+1] === undefined) {
            if(rows[i-1][j] > cell && cell < rows[i+1][j] && cell < rows[i][j-1]) {
                lowest.push(cell)
            }
            continue;
        }

        //left
        if(rows[i-1] === undefined) {
            if(rows[i][j+1] > cell && cell < rows[i][j-1] && cell < rows[i+1][j]) {
                lowest.push(cell)
            }
            continue;
        }

        //right
        if(rows[i+1] === undefined) {
            if(rows[i][j-1] > cell && cell < rows[i][j+1] && cell < rows[i-1][j]) {
                lowest.push(cell)
            }
            continue;
        }

        if(rows[i][j-1] > cell && cell < rows[i][j+1] && cell < rows[i-1][j] && cell < rows[i+1][j]) {
            lowest.push(cell)
        }
    }
}

console.log(lowest.reduce((p,q) => p+q+1, 0))