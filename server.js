const Koa = require('koa');
const path = require('path');
const Router = require('@koa/router');
const koaSimpleHealthCheck = require('koa-simple-healthcheck');
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

app.use(require('koa-static')('dist'));


const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    logger.info(`Server listening at ${port}`);
});


module.exports = server;
