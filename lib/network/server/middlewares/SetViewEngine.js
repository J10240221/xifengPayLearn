var path = require('path'),
    ApiTool = require('../../../api/ApiTool');

let SetViewEngine = {
    hbs: (app, viewPath) => {
        app.set('view engine', 'hbs');
        app.set('views', path.resolve(ApiTool.getProjectDir(), viewPath));
    }
};

module.exports = SetViewEngine;