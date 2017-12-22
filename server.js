var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/info', function(req, res){
    res.sendFile(path.join(__dirname + '/microservice/register.json'));
});

app.get('/ping', function(req, res){
    res.sendStatus(200);
});

app.use(express.static('dist'));

app.listen(8080);
console.log('server listening at 8080');
