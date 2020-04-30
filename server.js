const express = require('express');
const app = express();
const path = require('path');
const ctRegisterMicroservice = require('ct-register-microservice-node');
const logger = require('express-simple-logger')
const expressHealthcheck = require('express-healthcheck');

app.use(logger());
app.use('/healthcheck', expressHealthcheck());

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

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  ctRegisterMicroservice.register({
    info: require('./microservice/register.json'),
    mode: ctRegisterMicroservice.MODE_AUTOREGISTER,
    name: 'rw-lp',
    ctUrl: process.env.CT_URL,
    url: process.env.LOCAL_URL,
    token: process.env.CT_TOKEN,
    active: true,
  }).then(
    () => { console.log('Success connecting to CT!') },
    (err) => { console.error(err); process.exit(1);
  });
});

console.log('server listening at 8080');

module.exports = server;
