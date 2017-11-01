jest.mock('request');

describe('BaseController TestCase', () => {
	let BaseController;
	beforeAll(() => {
		BaseController = require('../BaseController');
	})
	beforeEach(() => {
		this.serverSetting = {
			DEV: true,
			ipPass: {
				type: 'query', // or 'path',
				queryKey: 'ip' // preserve param key for type in query mode
			},
			serviceIP: "http://10.0.0.182:9092",
			browserSupport: 8,
			blockPageName: 'hintPage.html',
			port: 3001, //项目监听端
			restfulSupport: ['post', 'get', 'put', 'delete'], // element not in array will use default below
			viewPath: "network/server/views",
			assetPath: "public",
			transferHeader: "API",
			acceptHeaders: ['user-agent', 'accept-encoding','content-type'],
			contentEncoding: 'gzip, deflate, br'
		};
		//#region Request
		this.req = {};
		this.req.headers = {
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			'accept-encoding': "gzip, deflate",
			'accept-language': 'zh-CN,zh;q=0.8,ja;q=0.6,en;q=0.4',
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Cookie': 'SUV=00A517557011515B59E4166FBBF6D956; ABTEST=0 | 1508120175 | v1; SNUID=52591878090C53A89F554E0A0952ACE9; IPLOC=CN3301; SUID=5B5111704631990A0000000059E4166F; SUID=5B5111702320940A0000000059E41670; JSESSIONID=aaaE0DjiryXEf - tqPbv8v; weixinIndexVisited=1; sct=4',
			DNT: 1,
			Host: 'weixin.sogou.com',
			Pragma: 'no-cache',
			Referer: 'http://weixin.sogou.com/',
			'Upgrade-Insecure-Requests': 1,
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
		}
		this.req.body = {
			start: '北京',
			target: '杭州',
			suggest:[1,2,'马尼拉'],
			day: 10
		}
		//#endregion
		this.resSendSpy = jest.fn();
		this.baseController = new BaseController(this.serverSetting);
	})
	test('BaseController Work Correctly', () => {
		expect(this.baseController).toBeTruthy();
	})
	test('BaseController instance have default host', () => {
		expect(this.baseController.getHost()).toMatchSnapshot();
	})
	test('BaseController instance can set host to target value', () => {
		let host = 'http://127.0.0.1:8008'
		this.baseController.setHost(host);
		expect(this.baseController.getHost()).toBe(host);
	})
	test('BaseController instance can reset to default value after changed', () => {
		let host = 'http://127.0.0.1:8008'
		this.baseController.setHost(host);
		this.baseController.resetHost();
		expect(this.baseController.getHost()).toMatchSnapshot();
	})
	test('StructHeader can filter source header correctly', () => {
		let retHeaders = this.baseController.StructHeader(this.req);
		expect(retHeaders).not.toHaveProperty('upgrade-insecure-requests');
		expect(retHeaders).toHaveProperty('user-agent');
		expect(retHeaders).toHaveProperty('accept-encoding');
		expect(retHeaders).toHaveProperty('content-type');
	})
	test('CreateReqUri can return string correctly', () => {
		let retUrl = this.baseController.CreateReqUri('/json');
		expect(retUrl).toMatchSnapshot();
	})
	test('CreateReqUri return root path when path not passed', () => {
		let retUrl = this.baseController.CreateReqUri();
		expect(retUrl).toMatchSnapshot();
	})
	test('CreateParamString can return query string when arg true', () => {
		let retStr = this.baseController.CreateParamString(this.req, true);
		expect(retStr).toMatchSnapshot();
	})
	test('CreateParamString can return form-data when arg false',()=>{
		let retStr = this.baseController.CreateParamString(this.req, false);
		expect(retStr).toMatchSnapshot();
	})
	test('CheckReqTypeExist return first item when reqType not exist', () => {
		let tempReq = {
			params: {
			}
		}, retType = this.baseController.CheckReqTypeExist(tempReq);
		expect(retType).toMatchSnapshot();
	})
	test('CheckReqTypeExist return first item when reqType send', () => {
		let tempReq = {
			params: {
				reqType:'delete'
			}
		}, retType = this.baseController.CheckReqTypeExist(tempReq);
		expect(retType).toMatchSnapshot();
	})
	test('CheckReqTypeExist return first item when reqType send not in support array', () => {
		let tempReq = {
			params: {
				reqType: 'options'
			}
		}, retType = this.baseController.CheckReqTypeExist(tempReq);
		expect(retType).toMatchSnapshot();
	})
	test('SendRequest mock post should work correctly', () => {
		let reqType = 'post', obj = { headers: {}},res = { send: this.resSendSpy },
			path = '/json', retData = this.baseController.SendRequest(reqType, obj, res, path);
		expect(this.resSendSpy.mock.calls[0][0]).toMatchSnapshot();
	})
	test('SendRequest mock get should return error data', () => {
		let reqType = 'get', obj = { headers: {}},res = { send: this.resSendSpy },
		path = '/json', retData = this.baseController.SendRequest(reqType, obj, res, path);
		expect(this.resSendSpy.mock.calls[0][0]).toMatchSnapshot();
	})
	test('SendRequest mock get should reach net error', () => {
		let reqType = 'delete', obj = { headers: {}},res = { send: this.resSendSpy },
		path = '/json', retData = this.baseController.SendRequest(reqType, obj, res, path);
		expect(this.resSendSpy.mock.calls[0][0]).toMatchSnapshot();
	})
	test('SendRequest mock post with contentEncoding none', () => {
		let serverSetting = this.serverSetting, baseController = null;
		serverSetting.contentEncoding = 'none';

		baseController = new BaseController(serverSetting);

		let reqType = 'post', obj = { headers: {}},res = { send: this.resSendSpy },
		path = '/json', retData = baseController.SendRequest(reqType, obj, res, path);
		expect(this.resSendSpy.mock.calls[0][0]).toMatchSnapshot()
	})
})