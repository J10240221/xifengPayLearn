let path = require('path'),
    apinConfig = jest.genMockFromModule('../apin.test.config.js');

apinConfig.server = {
    port: 8080
}
apinConfig.webpack = {
    dev: {
        config: {
            entry: './react_page/index.js',
        }
    }
}
module.exports = apinConfig;