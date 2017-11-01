let externalConfig = require('./ExternalConfig'),
    localServerConfig = require('../config/server/setting');

class ServerConfig{
    getServerConfig(path) {
        // check external exists and external config has server
        let serverConfig = externalConfig.getExternalConfig(path).server;
        return serverConfig ?
            Object.assign(localServerConfig, serverConfig) :
            localServerConfig;
    }
}

module.exports = ServerConfig;