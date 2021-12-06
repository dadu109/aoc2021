const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')

const fishArr = input.split(',').map(Number);

const NUMBER_OF_ITERATIONS = 80;

for(let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    let numberOfNewFish = 0;

    for(let j = 0; j< fishArr.length; j++) {
        const fish = fishArr[j];

        if(fish === 0) {
            fishArr[j] = 6;
            numberOfNewFish++;
            continue;
        }

        fishArr[j] = fish - 1;
    }

    for(let j = 0; j < numberOfNewFish; j++) {
        fishArr.push(8);
    }
}

console.log(fishArr.length)