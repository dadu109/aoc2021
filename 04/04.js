const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')
 
const queue = '17,11,37,7,89,48,99,28,56,55,57,27,83,59,53,72,6,87,33,82,13,23,35,40,71,47,78,2,39,4,51,1,67,31,79,69,15,73,80,22,92,95,91,43,26,97,36,34,12,96,86,52,66,94,61,76,64,77,85,98,42,68,84,63,60,30,65,19,54,58,24,20,25,75,93,16,18,44,14,88,45,10,9,3,70,74,81,90,46,38,21,49,29,50,0,5,8,32,62,41'.split(',').map(Number);

const boards = input
    .split('\n\n')
    .map(str => (
        str.split('\n').map(row => {
            let values = []
 
            for (let i = 0; i < row.length; i+=3) {
                if((row[i] || row[i] === ' ') && row[i + 1]) {
                    values.push(Number(`${row[i]}${row[i+1]}`))
                }
            }
 
            return values.map(val => ({
                marked: false,
                value: Number(val)
            }))
        })
    ))
 
 
const checkHorizontal = (board) => {
    for(let i = 0; i< 5; i++) {
        let counter = 0;
 
        for (let j = 0; j < 5; j++) {
            if(board[i][j].marked) counter++;
        }

        if (counter === 5) return board;
    }
    return false
}
 
const checkVertical = (board) => {
    for(let i = 0; i< 5; i++) {
        let counter = 0;
 
        for(let j = 0; j< 5; j++) {
            if(board[j][i].marked) counter++;
        }

        if (counter === 5) return board;
    }
    return false
}
 
const mark = (board, number) => {
    for(let i = 0; i< 5; i++) {
        for(let j = 0; j< 5; j++) {
            if(board[i][j].value === number) {
                board[i][j].marked = true;
            }
        }
    }
}

const checkBoards = (boards) => {
    for (let i = 0; i < queue.length; i++) {
        const val = queue[i];
    
        let vert = false;
        let hori = false;
    
        
        for (let j = 0; j<boards.length; j++) { 
            mark(boards[j], val)
    
            vert = checkVertical(boards[j])
            hori = checkHorizontal(boards[j])
     
            if (vert) {
                return {
                    board: vert,
                    value: val
                }
            }
     
            if (hori) {
                return {
                    board: hori,
                    value: val
                }
            }
        }
    }
}

const checkLastWin = (boards) => {
    const winBoards = [];

    for (let i = 0; i < queue.length; i++) {
        const val = queue[i];
        
        for (let j = 0; j<boards.length; j++) { 
            mark(boards[j], val)
    
            vert = checkVertical(boards[j])
            hori = checkHorizontal(boards[j])

            if((vert || hori) && !winBoards.find(e => e.boardIndex === j)) {
                winBoards.push({
                    boardIndex: j,
                    board: JSON.parse(JSON.stringify(boards[j])),
                    value: val
                })
            }
        }
    }

    const lastWinBoard = winBoards.pop()

    return {
        board: lastWinBoard.board,
        value: lastWinBoard.value
    }
}

const getUnmarkedValuesSum = (board) => {
    let sum = 0;

    for(let i = 0; i< 5; i++) {
        for(let j = 0; j< 5; j++) {
            if(!board[i][j].marked) {
                sum += board[i][j].value;
            }
        }
    }

    return sum;
}


const winner = checkLastWin(boards);
const uncheckedSum = getUnmarkedValuesSum(winner.board);

console.log(uncheckedSum * winner.value);