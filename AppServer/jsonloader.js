const fs = require('fs');

let rawdata = fs.readFileSync('sample.json');  
let json_data = JSON.parse(rawdata);

exports.json_data = json_data;