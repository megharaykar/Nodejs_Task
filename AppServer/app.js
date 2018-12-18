var express = require('express');
var app = express();
var json_data = require('./jsonloader').json_data;

require('./routes')(app,json_data);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});


var server = app.listen(3000, function () {
console.log("Server listening on port 3000");
});