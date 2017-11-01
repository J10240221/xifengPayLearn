describe('CookieHelp TestSuit', () => {
	let CookieHelp;
	beforeAll(() => {
		CookieHelp = require('../CookieHelp');
	})
	beforeEach(() => {
		this.cookieStr = 'wow';
		this.cookieObj = { a: 'wooo', b: ['ddee', 'ffaa'] };
		this.cookieUser = {
			name: 'a',
			pwd: 'b',
			likes: ['o', 'c', 'u'],
			location: {
				code: 1,
				short: 'BJ',
				geo: [112, 35]
			}
		}
		this.CookieHelp = require('../CookieHelp');
	})
	afterAll(() => {
		CookieHelp = null;
	})
	test('Have Default User key', () => {
		expect(this.CookieHelp.getUserKey()).toBe('APIN_USER');
	})
	test('clearCookie not breakdown if no cookie', () => {
		this.CookieHelp.clearCookie();
	})
	test('Default User Info Should not Exists', () => {
		expect(this.CookieHelp.getUserInfo()).toBeFalsy();
	})
	test('Can normally storage object to cookie', () => {
		this.CookieHelp.saveCookieInfo('cookieObj', this.cookieObj, 1);
		let ret = JSON.parse(this.CookieHelp.getCookieInfo('cookieObj'));
		expect(ret.b).toMatchSnapshot();
	})
	test('Can normally storage object to cookie', () => {
		this.CookieHelp.saveCookieInfo('cookieStr', this.cookieStr, 1);
		let ret = this.CookieHelp.getCookieInfo('cookieStr');
		expect(ret).toMatchSnapshot();
	})
	test('Clear cookie work properly', () => {
		CookieHelp.clearCookie();
		expect(this.CookieHelp.getCookieInfo('a')).toBeFalsy();
	})
	test('saveUserInfo can save User cookie and get user info not first time works', () => {
		this.CookieHelp.saveUserInfo(this.cookieUser, false);
		expect(this.CookieHelp.getUserInfo()).toMatchSnapshot();
	})
	test('get user info first time after save user info', () => {
		this.CookieHelp.first = false;
		expect(this.CookieHelp.getUserInfo().likes).toHaveLength(3);
	})
	test('ClearUserInfo should clean user cookie', () => {
		this.CookieHelp.clearUserInfo();
		expect(this.CookieHelp.getUserInfo()).toBeFalsy();
	})
})