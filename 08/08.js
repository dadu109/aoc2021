const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8')

const lines = input.split('\n');
const data = lines.map(line => line.split('|').map(s => s.trim()));

const part1 = () => {
    const uniqueNumbers = [2,3,4,7]
    let sum = 0;

    for(let i = 0; i < data.length; i++) {
        data[i][1].split(' ').forEach(s => {
            if(uniqueNumbers.includes(s.length)) sum++;
        })
    }

    console.log(sum);
}

const hasLength = (value) => (str) => str.length === value;

const part2 = () => {
    let sum = 0;
    
    for(let i = 0; i < data.length; i++) {
        const signals = data[i][0].trim().split(' ');
        const output = data[i][1].trim().split(' ').map((signal) => signal.split('').sort().join(''));;

        const one = signals.find(hasLength(2)).split('');
        const four = signals.find(hasLength(4)).split('');
        const seven = signals.find(hasLength(3)).split('');
        const eight = signals.find(hasLength(7)).split('');

        const twoOrThreeOrFive = signals.filter(hasLength(5)).map((signal) => signal.split(''));
        const zeroOrSixOrNine = signals.filter(hasLength(6)).map((signal) => signal.split(''));

        const topLeftOrMiddle = four.filter((signal) => !one.includes(signal));

        const three = twoOrThreeOrFive.find((signal) => one.every((segment) => signal.includes(segment)));
        const twoOrFive = twoOrThreeOrFive.filter((signal) => signal !== three);

        const topLeft = topLeftOrMiddle.find((segment) => !three.includes(segment));
        const middle = topLeftOrMiddle.find((segment) => segment !== topLeft);

        const zero = zeroOrSixOrNine.find((signal) => !signal.includes(middle));
        const sixOrNine = zeroOrSixOrNine.filter((signal) => signal !== zero);

        const nine = sixOrNine.find((signal) => one.every((segment) => signal.includes(segment)));
        const six = sixOrNine.find((signal) => signal !== nine);

        const two = twoOrFive.find((signal) => !signal.includes(topLeft));
        const five = twoOrFive.find((signal) => signal !== two);

        const digits = {
            [zero.sort().join('')]: '0',
            [one.sort().join('')] : '1',
            [two.sort().join('')] : '2',
            [three.sort().join('')]: '3',
            [four.sort().join('')]: '4',
            [five.sort().join('')]: '5',
            [six.sort().join('')] : '6',
            [seven.sort().join('')]: '7',
            [eight.sort().join('')]: '8',
            [nine.sort().join('')]: '9',
        };
      
        const value = +output.map((signal) => digits[signal]).join('');
    
        sum += value;
    }


    console.log(sum);
}

part2();