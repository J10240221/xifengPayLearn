
var router = require("../router.js");
module.exports = {
    port: 3000,
    browserSupport:9,
    blockPageName:"hintPage.html",
    assetPath: "./public",
    viewPath:"./view",
    custom: {
        serverRoutes:router
    },
    hlIP:"http://10.0.0.62:9008",
    serviceIP:"http://10.0.0.72:9008"
};