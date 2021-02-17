const Koa = require('koa');
const path = require('path');
const Router = require('@koa/router');
const koaSimpleHealthCheck = require('koa-simple-healthcheck');
const { RWAPIMicroservice } = require('rw-api-microservice-node');
const sendfile = require('koa-sendfile');

const koaLogger = require('koa-logger');

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

const router = new Router({});

const app = new Koa();

app.use(koaLogger());
app.use(koaSimpleHealthCheck());

router.get('/', (ctx) => {
    sendfile(ctx, path.join(`${__dirname}/dist/index.html`));
});

router.get('/info', (ctx) => {
    sendfile(ctx, path.join(`${__dirname}/microservice/register.json`));
});

app.use(require('koa-static')('dist'));

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

logger.info(`Server listening at ${port}`);

module.exports = server;
