const express = require('express');
const app = express();
const path = require('path');
const { RWAPIMicroservice } = require('rw-api-microservice-node');

const expressLogger = require('express-simple-logger')
const expressHealthcheck = require('express-healthcheck');
const bunyan = require('bunyan');

const streams = [
  {
    stream: process.stdout,
    level: process.env.LOGGER_LEVEL || 'debug'
  }, {
    stream: process.stderr,
    level: 'warn'
  },
];


const logger = bunyan.createLogger({
  name: 'rw-lp',
  src: true,
  streams,
});

app.use(expressLogger());
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

app.use(RWAPIMicroservice.bootstrap({
  name: 'rw-lp',
  info: require('./microservice/register.json'),
  swagger: require('./microservice/public-swagger.json'),
  logger,
  baseURL: process.env.CT_URL,
  url: process.env.LOCAL_URL,
  token: process.env.CT_TOKEN,
  fastlyEnabled: process.env.FASTLY_ENABLED,
  fastlyServiceId: process.env.FASTLY_SERVICEID,
  fastlyAPIKey: process.env.FASTLY_APIKEY
}));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  if (process.env.CT_REGISTER_MODE === 'auto') {
    RWAPIMicroservice.register().then(() => {
      logger.info('CT registration process started');
    }, (error) => {
      logger.error(error);
      process.exit(1);
    });
  }
});

console.log('server listening at 8080');

module.exports = server;
