jest.mock('fs');
jest.mock('../../apin.test.config.js');


describe('externalConfig Test', () => {
	beforeEach(() => {
		this.externalConfig = require('../ExternalConfig');
	})
	afterEach(() => {
		this.externalConfig = null;
	})
	test('default externalConfig is Falsy', () => {
		expect(this.externalConfig.externalConfig).toBeFalsy();
	})
	test('getExternalConfig without filename should return falsy', () => {
		expect(this.externalConfig.getExternalConfig()).toMatchSnapshot();
	})
	test('get none exist file should have empty object', () => {
		expect(this.externalConfig.getExternalConfig('none.js')).toMatchSnapshot();
	})
	test('get external config should have property', () => {
		// console.log(externalConfig.getExternalConfig('apin.test.config.js'));
		expect(this.externalConfig.getExternalConfig('apin.test.config.js')).toHaveProperty('server');
	})
	test('get external config without search file if got file', () => {
		let ApiTool = require('../ApiTool.js');
		const getlibRootSpy = jest.spyOn(ApiTool, 'getlibRootPath');
		let ret = this.externalConfig.getExternalConfig('apin.test.config.js');
		expect(getlibRootSpy).not.toHaveBeenCalled();
		getlibRootSpy.mockReset();
		getlibRootSpy.mockRestore();
	})
})