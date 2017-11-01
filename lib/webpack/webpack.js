let path = require('path'),
	WebpackConfig = require('../api/WebpackConfig');

function webpack(mode) {
	let webpackConfig = new WebpackConfig(),
		webpackPath = webpackConfig.getWebpackPath(),
		webpack = require(webpackPath),
		ProgressPlugin = require(webpackPath + "/lib/ProgressPlugin"),
		compileConfig = webpackConfig.getWebpackConfig(mode),
		compiler = webpack(compileConfig);
	compiler.apply(new ProgressPlugin({
		// profile: argv.profile
	}));
	return { compiler, config: compileConfig };
}

exports = module.exports = webpack;