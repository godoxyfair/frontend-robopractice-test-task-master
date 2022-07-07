let template = ['a', 'b', 'c', 'd', 'e'];
let features = [{
    name: 'a',
    value: 111
},
    {
        name: 'c',
        value: 222
    }
];

let result = [];

for (let s of template) {
    const found = features.find(feature => feature.name === s);
    result.push(found || { [s]: 'DEFAUILT',  });
}

//console.log(result);

const data = {
    endTime: '17-15',
    startTime: '12-48',
}

// separates the string in hours, minutes and seconds
const [startHours, startMinutes] = '00'
const [endHours, endMinutes] = data.endTime.split('-')

// creates a Date instance to work with
const startDate = new Date()
const endDate = new Date()

// sets hour, minutes and seconds to startDate
startDate.setHours(startHours)
startDate.setMinutes(startMinutes)
//startDate.setSeconds(startSeconds)

// sets hour, minutes and seconds to endDate
endDate.setHours(endHours)
endDate.setMinutes(endMinutes)
//endDate.setSeconds(endSeconds)

const differenceInMilliseconds = endDate - startDate
const differenceInSeconds = differenceInMilliseconds / 1000
const differenceInMinutes = differenceInSeconds / 60
const differenceInHours = differenceInMinutes / 60

//console.log(differenceInHours) // outputs 2 hours

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    console.log(hours + ':' + minutes)
    return hours + ':' + minutes;
}

// /function getTimeFromMins(mins) {
// let hours = Math.trunc(mins/60);
// let minutes = mins % 60;
// return hours + 'ч. ' + minutes + 'м.';
// };

getTimeFromMins(differenceInMinutes)

arr = [0,1,2,3,4,5,6,7]
//let dataInt = 0;

for (let i =0; i < arr.length; i++){
    let dataInt= dataInt +1;
}

console.log(dataInt)