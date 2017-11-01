let path = require('path'),
	{ getlibRootPath } = require('../../api/ApiTool'),
	defaultLoader = require('./loader'),
	defaultPlugin = require('./plugins');
module.exports = {
	useBundle: true,
	dev: {
		config: {
			entry: {
				main: [
					// necessary for hot reloading with IE:
					'eventsource-polyfill',
					// listen to code updates emitted by hot middleware:
					'webpack-hot-middleware/client',
					// your code:
					'./src/index.js'
				]
			},
			devtool: 'eval',
			// devtool: 'cheap-module-source-map',
			plugins: [
				defaultPlugin.hotReplace(),
				defaultPlugin.noEmitError(),
			]
		}
	},
	release: {
		ieSupport: true,
		config: {
			entry: {
				main: [
					'console-polyfill',
					'babel-polyfill',
					'es5-shim',
					'es5-shim/es5-sham',
					// your code:
					'./src/index.js'
				]
			},
			devtool: false,
			plugins: [
				defaultPlugin.noEmitError(),
				defaultPlugin.definePlugin({
					'process.env': {
						'NODE_ENV': JSON.stringify('production')
					}
				}),
				defaultPlugin.es3ifyPlugin(), // MUST put before uglify or it not work
				// defaultPlugin.uglify({
				// 	ie8: true,
				// 	output: {
				// 		comments: false,  // remove all comments
				// 	},
				// 	compress: {
				// 		warnings: false
				// 	}
				// }),
				defaultPlugin.uglify({
					uglifyOptions: {
						ie8: true,
						output: {
							comments: false,  // remove all comments
						},
						compress: true,
						warnings: false
					}
				}),
				defaultPlugin.compressPlugin({ //gzip 压缩
					asset: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp(
						'\\.(js|css)$'    //压缩 js 与 css
					),
					threshold: 10240,
					minRatio: 0.8
				})
			]
		}
	},
	common: {
		output: {
			path: path.resolve(getlibRootPath(), 'public/project'),
			filename: 'spa.js',
			publicPath: '/project/'
		},
		module: {
			loaders: [
				defaultLoader.babel(),
				defaultLoader.images(5120),
				defaultLoader.extractcss('src')
			]
		}
	}
}