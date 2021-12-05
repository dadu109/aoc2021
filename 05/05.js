const fs = require('fs');
 
const input = fs.readFileSync('input.txt', 'utf8')
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8')

const getLine = (str) => {
    const [start, end] = str.split('->');

    const [x1, y1] = start.split(',').map(Number);
    const [x2, y2] = end.split(',').map(Number);

    return {x1, y1, x2, y2};
}

const getPointInStraightLine = (line) => {
    const {x1, y1, x2, y2} = line;

    if(!(x1 === x2 || y1 === y2)) return getPointsOnDiagonal(line);

    const points = [];
    let x = x1;
    let y = y1;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const dist = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

    const xInc = dx / dist;
    const yInc = dy / dist;

    for (let i = 0; i <= dist; i++) {
        points.push(`${[x, y]}`);
        x += xInc;
        y += yInc;
    }

    return points;
}


const getPointsOnDiagonal = (line) => {
    const {x1, y1, x2, y2} = line;

    const points = [];

    let x, y;
   
    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx>0 && dy>0) {
        x = x1;
        y = y1;

        while (x <= x2 && y <= y2) {
            points.push(`${[x, y]}`);
            x++;
            y++;
        }

        return points;
    } else if (dx<0 && dy>0) {
        x = x1;
        y = y1;

        while (x >= x2 && y <= y2) {
            points.push(`${[x, y]}`);
            x--;
            y++;
        }

        return points;
    } else if (dx<0 && dy<0) {
        x = x1;
        y = y1;

        while (x >= x2 && y >= y2) {
            points.push(`${[x, y]}`);
            x--;
            y--;
        }

        return points;
    } else if (dx>0 && dy<0) {
        x = x1;
        y = y1;

        while (x <= x2 && y >= y2) {
            points.push(`${[x, y]}`);
            x++;
            y--;
        }

        return points;
    }
}



const getOverlapingPoints = (line1, line2) => {
    const points1 = getPointInStraightLine(line1);
    const points2 = getPointInStraightLine(line2);

    const points = points1.filter(point => points2.includes(point));

    if (points.length) {
        console.log(points)
    }

    return points;
}

const lines = input.split('\n').map(getLine);

let allOverlapingPoints = {};

for(let i = 0; i < lines.length; i++) {
    for(let j = i + 1; j < lines.length; j++) {
        const line1 = lines[i];
        const line2 = lines[j];

        const overlapingPoints = getOverlapingPoints(line1, line2);

        overlapingPoints.forEach(point => {
            allOverlapingPoints[point] = allOverlapingPoints[point] ? allOverlapingPoints[point] + 1 : 1;
        })
    }
}


console.log(Object.keys(allOverlapingPoints).length);