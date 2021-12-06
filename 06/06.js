const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')
const sampleData = '3,4,3,1,2'.split(',').map(Number);

const fishArr = input.split(',').map(Number);

const NUMBER_OF_ITERATIONS = 256;

const part1 = () => {
    let newArr = [1]

    for(let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
        let numberOfNewFish = 0;
    
        for(let j = 0; j < newArr.length; j++) {
            const fish = newArr[j];
    
            if(fish === 0) {
                newArr[j] = 6;
                numberOfNewFish++;
                continue;
            }
    
            newArr[j] = fish - 1;
        }
    
        for(let j = 0; j < numberOfNewFish; j++) {
            newArr.push(8);
        }
    }
    
    console.log(newArr.length)
}


const part2 = () => {
    let arr = fishArr.reduce((p,q) => {
        p[q]++;
        return p;
    }, Array(9).fill(0));


    for(let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
        const newFish = arr.shift();
        arr[6] += newFish;
        arr.push(newFish);
    }

    console.log(arr.reduce((p,q) => p + q, 0));
}

part2();