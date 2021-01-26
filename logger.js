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

module.exports = logger;
