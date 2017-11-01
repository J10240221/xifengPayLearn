// run according to args to determin whether debug or release mode

let argvs = process.argv,
	LogHelper = require('../tools/LogHelper');

function ifArg(name, fn, init) {
	if (argvs.indexOf(name) != -1) {
		if (init) init();
		fn(true, -1);
	}
}

function logBasic(output) {
	console.log('Hash: ', LogHelper.FgGreen(output.hash));
	console.log('Webpack version: ', LogHelper.FgGreen(output.version));
	console.log('Elapsed Time: ', output.time > 10000 ?
		LogHelper.FgYellow('' + (output.time / 1000) + 's') :
		LogHelper.FgGreen('' + output.time + 'ms'));
}

function printList(output) {
	let items = output.assets;
	items.forEach((val) => {
		console.log('' + LogHelper.transferSize(val.size), '\t', LogHelper.FgGreen(val.name), '\t', val.chunks.join(''), '\t', val.chunkNames.join(''));
	})
}

function compilerFn(err, stats) {
	if (!err) {
		// console.log('file will output to: ', webpackConfig.output.path);
		let output = stats.toJson();
		logBasic(output);
		printList(output);
		output.warnings.length > 0 && console.log('Warnings: \n', LogHelper.FgYellow(output.warnings.join('')));
		output.errors.length > 0 && console.log('Error: ', LogHelper.FgRed(output.errors.join('')));
	} else {
		console.log(LogHelper.FgRed(err));
	}
};

function processOptions(opt) {
	let runOptions = {}, webpack = require('../webpack/webpack'),
		ServerConfig = require('../api/ServerConfig'),
		serverConfig = new ServerConfig(), compiler = null;
	createApp = require('../network/server/app');
	ifArg('debug', function (bool) {
		runOptions.debug = bool;
		runOptions.release = !bool;
	});
	ifArg('release', function (bool) {
		runOptions.release = bool;
		runOptions.debug = !bool;
	});
	ifArg('server', function (bool) {
		runOptions.server = bool;
	});
	if (runOptions.debug) {
		compiler = webpack('dev');
		if (runOptions.server) {
			createApp(serverConfig.getServerConfig(), compiler);
		} else {
			compiler.compiler.run(compilerFn)
		}
	} else if (runOptions.release) {
		webpack('release').compiler.run(compilerFn)
		if (runOptions.server) {
			createApp(serverConfig.getServerConfig());
		}
	} else {
		createApp(serverConfig.getServerConfig());
	}
}

processOptions(argvs);