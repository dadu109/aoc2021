const fs = require('fs');

const arr = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n')

const getDestination = (arr) => {
    let xPos = 0;
    let yPos = 0;
    let aim = 0;

    for (let i = 0; i < arr.length; i++) {
        const [direction, value] = arr[i].split(' ');
        switch (direction) {
            case 'up':
                aim -= Number(value);
                break;
            case 'down':
                aim += Number(value);
                break;
            case 'forward':
                xPos += Number(value);
                yPos += aim * Number(value);
                break;
                
            default:
                break;
        }
    }

    return Math.abs(xPos * yPos);
}

console.log(getDestination(arr));