/**
 * Created by lixifeng on 16/8/1.
 */

let CookieHelp = require("./CookieHelp.js");

window.log = window.log || function () { console.log.apply(this, [].slice.call(arguments)) };

let HttpTool = {

	typeEnum: {
		POST: 'post',
		GET: 'get',
		PUT: 'put',
		DELETE: 'delete'
	},

	showLog: true, //是否打印,请求日志

	print(value) {
		if (HttpTool.showLog) {
			log(value);
		}
	},
	printWarn(value) {
		if (HttpTool.showLog) {
			log(value);
		}
	},

	send(type, api_type, param, failCall, successCall, reqOptions) {
		//此URL,用来跨域
		var url = '/api/' + type + '?time=' + new Date().getTime(), isFormData = reqOptions.isFormData,
			isRefer = reqOptions.isRefer, text_type = reqOptions.text_type, ipKey = reqOptions.ipKey,
			accessToken = reqOptions.accessToken || '', paramsDemo = "", xmlHttp = null;
		if (window.XMLHttpRequest) {
			//针对chrome,firefox 等浏览器创建 xmlhttprequest 对象
			xmlHttp = new XMLHttpRequest();
			if (xmlHttp.overrideMimeType) {
				//针对http传输mime类型不是 text/xml 时的设置.vv
				xmlHttp.overrideMimeType('text/xml');
			}
		} else if (window.ActiveXObject) {
			//针对变态浏览器IE及其各版本创建 xmlhttprequest 对象
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					HttpTool.print('Microsoft.XMLHTTP xmlHttpRequest Generation error!', e);
					var option = {
						code: -1,
						message: "Microsoft.XMLHTTP xmlHttpRequest Generation error!",
					}
					return failCall(option.code, option.message, option);
				}
			}
		}
		HttpTool.print("开始请求:" + url + "   指向:" + api_type + "  参数:↓");
		// HttpTool.print(param);

		xmlHttp.open('post', url, true);
		xmlHttp.setRequestHeader("API", api_type);

		if (isFormData) {
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			let i = 0;
			for (let key in param) {
				paramsDemo += i == 0 ? (key + '=' + param[key]) : ('&' + key + '=' + param[key]);
				++i;
			}
		} else {
			xmlHttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
			paramsDemo = JSON.stringify(param);
		}
		HttpTool.print("参数:" + paramsDemo);

		// check address allow ref link
		isRefer ? xmlHttp.setRequestHeader('refLink', '1') :
			xmlHttp.setRequestHeader('refLink', '0');

		ipKey && xmlHttp.setRequestHeader('ip_keys', ipKey);

		// 这里set requestHeader
		accessToken && xmlHttp.setRequestHeader("accessToken", accessToken);
		// xmlHttp.setRequestHeader("accessToken", "%7B%22userId%22%3A%22ee2d901a8e4f494da5390092f76b1asd%22%2C%22accountId%22%3A%223acaaf2ce86e43e49fbcfbf43376czxc%22%2C%22accountType%22%3A2%2C%22userName%22%3A%22ywbaoji%22%2C%22secret%22%3A%22671a08a9029f6b81037f1830a5a29cb0%22%2C%22index%22%3A0%2C%22ahead%22%3A1504846789126%7D");
		try {
			xmlHttp.send(paramsDemo);
		} catch (e) {
			HttpTool.print('error!', e);
			var option = {
				code: -1,
				message: "send error" + e,
			}
			return failCall(option.code, option.message, option);
		}

		//ajax 请求状态变化监听
		xmlHttp.onreadystatechange = function () {
			// readState == 4 请求完成
			var json = {}, option = {};
			if (xmlHttp.readyState == 4) {
				HttpTool.print("响应码:" + xmlHttp.status + "   服务器:" + url);
				//状态码 返回 200 表示请求成功

				if (xmlHttp.status == 200) {
					//解析结果
					//转JSON
					HttpTool.print("请求数据:↓↓↓↓↓↓↓下一行↓↓↓↓↓↓↓↓↓↓↓"); //打印结构
					HttpTool.print(xmlHttp.responseText); //打印结构

					if (text_type) {
						json = xmlHttp.responseText
						option = {
							code: 1,
							message: "success"
						}
						successCall(option.code, option.message, json);
						return;
					} else {
						try {
							json = JSON.parse(xmlHttp.responseText);
						} catch (e) {
							failCall(-999, "服务器返回非JSON数据");
							return;
						}

						option = {
							code: json.code,
							message: json.message,
							option: json.option,
						};
						if (json.code == 200) {
							// 在这判断是否token是否过期。
							successCall(option.code, option.message, json.data, option);
						} else {
							failCall(option.code, option.message, option)
						}
					}
				} else {
					var errorCode, errorMsg;
					errorCode = xmlHttp.status;
					var oCode = parseInt(errorCode / 100);
					switch (oCode) {
						case 1:
							errorMsg = '请使用更高版本的HTTP协议';
							break;
						case 2:
							errorMsg = '请使用更高版本的HTTP协议';
							break;
						case 3:
							errorMsg = '请求跳转到新的URL';
							break;
						case 4:
							errorMsg = '客户端请求的资源不存在';
							break;
						case 5:
							errorMsg = '服务器端错误';
							break;
						case 10:
							errorMsg = '服务器连接错误';
							break;
						case 0:
							errorMsg = '请检查本地网络';
							break;
						default:
							errorMsg = "其它错误";
							break;
					}
					HttpTool.print("请求错误:code:" + errorCode + " msg:" + errorMsg);
					HttpTool.print(xmlHttp.responseText);
					var option = {
						code: errorCode,
						message: errorMsg,
					};
					failCall(option.code, option.message, option);
				}

			} else {
				// failCall(xmlHttp.readyState,"error: readyState="+xmlHttp.readyState);
			}
		};
	},
    /**
     * 
     * @param {* transfer type: refer to typeEnum} type 
     * @param {* transfer api path} api_type 
     * @param {* success cb} successCallback 
     * @param {* fail cb} failCallback 
     * @param {* request body} param 
     * @param {* extra request options:{isFormData,isRefer,ipKey}} reqOptions 
     */
	request(type, api_type, successCallback, failCallback, param, reqOptions) {
		//option 参数必须是对象,里面包括 (type 请求方式,url 请求路径,param 请求参数)
		var reqOpt = reqOptions || {};
		var successCall = (code, message, json, option) => {
			successCallback(code, message, json, option);
			HttpTool.print("返回 code:" + code);
			HttpTool.print("返回 message:" + message);
			HttpTool.print("返回 json:↓↓↓↓↓↓↓下一行↓↓↓↓↓↓↓↓↓↓↓");
			HttpTool.print(json);
		};
		var failCall = (code, message, option) => {
			failCallback(code, message, option);
			HttpTool.printWarn("错误 code:" + code);
			HttpTool.printWarn("错误 message:" + message);
		};

		if (!api_type) {
			var option = {
				code: -1,
				message: "no api_type",
			}
			failCall(option.code, option.message, option);
			return;
		}
		//如果参数对象option 包括 param 参数对象
		param = param || {};

		var user = CookieHelp.getUserInfo();
		var ukey = "";
		if (user && user.accessToken) {
			ukey = user.accessToken;
		}
		reqOpt['accessToken'] = ukey;
		reqOpt['text_type'] = false;
		HttpTool.send(type, api_type, param, failCall, successCall, reqOpt);
	},
}

module.exports = HttpTool;