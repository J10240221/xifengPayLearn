var compression = require('compression'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser');

let MiddlewareBase = {
    configure: (app, config) => {
        app.use(logger(config.DEV ? 'combined' : 'short'));
        app.use(compression());
        app.use(cookieParser());
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    }
}

module.exports = MiddlewareBase;
