let createRoute = (setting) => {
    var express = require('express'),
        router = express.Router(),
        ApiRoute = require('./ApiRoute'),
        IndexRoute = require('./IndexRoute');
        router.use('/api', new ApiRoute(setting).getRoute());
        router.use('/*',new IndexRoute(setting).getRoute());
    return router;
}

module.exports = createRoute;
