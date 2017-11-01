let webpack = require('webpack');

const pluginList = {
	// dev
	hotReplace: () => new webpack.HotModuleReplacementPlugin(),
	noEmitError: () => webpack.NoEmitOnErrorsPlugin ? new webpack.NoEmitOnErrorsPlugin() : new webpack.NoErrorsPlugin(),

	//release
	// noError: () => new webpack.NoErrorsPlugin(),
	definePlugin: (a) => new webpack.DefinePlugin(a),
	// uglify: (a) => new webpack.optimize.UglifyJsPlugin(a),
	uglify: (a) => {
		let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
		return new UglifyJSPlugin(a);
	},
	compressPlugin: (a) => {
		let CompressionWebpackPlugin = require('compression-webpack-plugin');
		return new CompressionWebpackPlugin(a);
	},
	analyzerPlugin: (a) => {
		let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
		return new BundleAnalyzerPlugin(a);
	},
	es3ifyPlugin: () => {
		let Es3ifyPlugin = require('es3ify-webpack-plugin');
		return new Es3ifyPlugin();
	}
};

module.exports = pluginList;