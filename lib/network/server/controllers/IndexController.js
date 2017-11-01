let path = require('path'),
	ApiTool = require('../../../api/ApiTool'),
	BaseController = require('./BaseController');

class IndexController extends BaseController{
	constructor(setting) {
		super(setting);
	}
	mainEntry() {
		return (req, res, next) => {
			let userAgent = req.headers['user-agent'],
				browserSupport = this.Setting.browserSupport || 0,
				blockPageName = path.resolve(ApiTool.getProjectDir(), this.Setting.assetPath, this.Setting.blockPageName || 'index.html'),
				ieReg = null;
			if (!userAgent) {
				res.send('Oh! Where Are You From? Σ(￣。￣ﾉ)ﾉ')
			} else if (browserSupport) {
				if ((''+browserSupport).match(/[5-9]|1[01]/)) {
					ieReg = userAgent.match(/msie\s(\d+)\./i);
					ieReg && ieReg[1] < browserSupport ?
						res.sendFile(blockPageName) : res.render('index');
				} else {
					res.render('index');
				}
			} else {
				res.render('index');
			}
		};
	}
}

module.exports = IndexController