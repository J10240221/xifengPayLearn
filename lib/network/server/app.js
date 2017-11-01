

let createApp = (serverConfig,webpack) => {
    /**
     * Normalize a port into a number, string, or false.
    */
    function normalizePort(val) {
        // var port = parseInt(val, 10);

        // if (isNaN(port)) {
        //     // named pipe
        //     return val;
        // }

        // if (port >= 0) {
        //     // port number
        //     return port;
        // }
        return val&&(parseInt(val,10)>0&&parseInt(val,10))||false
    }

    /**
    * Event listener for HTTP server "error" event.
    */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
    var myConfig = serverConfig;
    var express = require('express');
    var app = express();
    var path = require('path');
    var ApiTool = require('../../api/ApiTool');
    var MiddlewareBase = require('./middlewares/MiddlewareBase');
    var SetViewEngine = require('./middlewares/SetViewEngine');
    var ErrorHandler = require('./middlewares/ErrorHandler');
    var routes = require('./routes/index');
    var debug = require('debug')('apin:server');
    var http = require('http');
    var server = null,port = normalizePort(process.env.PORT || '' + myConfig.port);;
    console.log("静态服务已启动:" + (webpack ? "开发(虚拟spa.js chrome开发)" : "生产(IE8兼容/压缩包)") + "模式");
    console.log(webpack ? "热更打包中:请等待webpack built 完成" : "静态服务已启动完毕 ^_^ 请打开 ");

    console.log("页面地址:http://localhost:" + port);
    if (webpack) {
        app.use(require('webpack-dev-middleware')(webpack.compiler, {
            noInfo: true,
            publicPath: webpack.config.output.publicPath
        }));

        app.use(require('webpack-hot-middleware')(webpack.compiler));
    }

    MiddlewareBase.configure(app, myConfig);
    SetViewEngine.hbs(app, myConfig.viewPath);

    app.use(express.static(path.resolve(ApiTool.getProjectDir(), myConfig.assetPath)));

    // allow external route config to override inner one
    serverConfig.custom && serverConfig.custom.serverRoutes && app.use(serverConfig.custom.serverRoutes);

    app.use('/', routes(myConfig));

    // catch 404 and forward to error handler
    app.use(ErrorHandler.get404Error);

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(ErrorHandler.getDevelopError);
    } else {
        // production error handler
        // no stacktraces leaked to user
        app.use(ErrorHandler.getProductionError);
    }

    /**
     * Create HTTP server.
     */
    server = http.createServer(app);
    server.on('error', onError);
    server.on('listening', onListening);
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
}

module.exports = createApp;
