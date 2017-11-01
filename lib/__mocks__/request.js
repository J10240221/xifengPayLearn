let request = jest.genMockFromModule('request');
function post(obj,cb) {
	cb(null, {
		statusCode: 200
	}, JSON.stringify({
		code: 200,
		message: 'dropValue',
		data: { val1: 1, val2: 2 }
	}));
}

function get(obj, cb) {
	cb(null, {
		statusCode: 403
	}, JSON.stringify({
			code: 403,
			message: 'request not permmit'
	}));
}

function deleted(obj, cb) {
	cb('remote not support');
}

request.post = post;
request.get = get;
request.delete = deleted;

module.exports = request;