let ExternalConfig = require('./ExternalConfig'),
	path = require('path'),
	ApiTool = require('../api/ApiTool'),
	defaultPlugin = require('../config/webpack/plugins'),
	localWebpackConfig = require('../config/webpack/setting');

class WebpackConfig {
	constructor(filename) {
		this.externalConfig = ExternalConfig.getExternalConfig(filename);
	}

	getWebpackConfig(mode = 'dev') {
		let externalWebpack = this.externalConfig.webpack,
			localConfig = localWebpackConfig,
			configMode = externalWebpack && mode in externalWebpack &&
				'config' in externalWebpack[mode] && externalWebpack[mode].config || {};
		this.outConfig = Object.assign(localConfig[mode].config, localConfig.common, configMode);
		externalWebpack && externalWebpack[mode] && externalWebpack[mode].useAnalyzer &&
			this.outConfig.plugins.push(defaultPlugin.analyzerPlugin({
				analyzerMode: 'server',
				// Host that will be used in `server` mode to start HTTP server. 
				analyzerHost: '127.0.0.1',
				// Port that will be used in `server` mode to start HTTP server. 
				analyzerPort: 8888
			}));
		return this.outConfig;
	}

	getWebpackPath() {
		let externalWebpack = this.externalConfig.webpack,
			useBundle = externalWebpack && 'useBundle' in externalWebpack ?
				externalWebpack.useBundle : true;
		return typeof useBundle == 'boolean' && !useBundle &&
			(path.resolve(ApiTool.getProjectDir(), './node_modules/webpack')) || 'webpack';
	}
}

module.exports = WebpackConfig;