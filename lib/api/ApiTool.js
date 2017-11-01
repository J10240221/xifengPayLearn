let path = require('path');

let projectDir = process.cwd();

const getlibRootPath = function () {
	return path.resolve(__dirname, '../');
}

const setProjectDir = function (path) {
	projectDir = path;
}

const getProjectDir = function () {
	return projectDir
}

module.exports = {
	getlibRootPath,
	setProjectDir,
	getProjectDir
}