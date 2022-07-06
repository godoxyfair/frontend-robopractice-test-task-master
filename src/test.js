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

console.log(result);