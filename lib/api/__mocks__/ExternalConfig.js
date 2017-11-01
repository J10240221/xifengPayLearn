let ExternalConfig = jest.genMockFromModule('../ExternalConfig.js')
let apinConfig = {};

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

function getExternalConfig(filename) {
	if (!filename || filename.indexOf('apin.test.config.js') > -1) {
		return apinConfig;
	} else {
		return {};
	}
}

ExternalConfig.getExternalConfig = getExternalConfig;

module.exports = ExternalConfig;