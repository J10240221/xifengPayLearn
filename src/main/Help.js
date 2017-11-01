/**
 * Created by lixifeng on 17/5/22.
 */

import React, { Component } from 'react';
/**O
 * 得到参数
 * @param obj
 * @returns {{}}
 */

class help {

	constructor() {
	}
	app_getParameter(obj) {
		if (this.stateP) {
			return this.stateP;
		}

        if (obj && obj.props && obj.props.location && obj.props.location.state) {
            this.stateP = obj.props.location.state;
            return this.stateP;
        } else {
            return {};
        }

	}
	/**
	 * 打开页面
	 * @param obj
	 * @param path
	 * @param state
	 * @param callBack
	 */
	app_open(obj, path, state, callBack) {
		if (obj && obj.context && obj.context.router && obj.context.router.push) {
			if (path == "/") {
				//主页
			} else {
				var pathname = "";
				if (obj.context.router.location) {
					pathname = obj.context.router.location.pathname;
				}

                path = pathname+path;
                path = path.replace("//","/");
            }
				obj.context.router.push(
					{
						pathname: path,
						state: state
					});

		} else {
			if (callBack) {
				callBack("打开页面错误,请检查");
			} else {
				alert("打开页面错误,请检查");
				log(obj);
			}
		}

	}




    setIntent(option){
        this.resultOption = option;
    }
    back(obj) {
        if (obj && obj.context && obj.context.router && obj.context.router.goBack) {
            //如果存在动画.关闭动画
            if(this.pageAnimOption){
                if(this.pageAnimAction){
                    this.pageAnimAction.setShowView(false);
                }else{
                    this.backPage(obj);
                }
            }else{
                log("说好的返回呢2");
                this.backPage(obj);
            }

        } else {
            log(obj);
        }

    }

    close(obj){
        if(this.app_getParameter(obj).callBack&&this.resultOption){
            this.app_getParameter(obj).callBack(this.resultOption);
            log("有返回数据");
        }else {
            log("无返回数据");
        }
    }
    backPage(obj){
        obj.context.router.goBack();

    }


    getUrlSearch(str) {
        var query = {};
        var name, value;
        var num = str.indexOf("?");
        if (num < 0) {
            return query;
        }

        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        var arr = str.split("&"); //各个参数放到数组里

        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                query[name] = value;
            }
        }
        return query;
    }
    getImgUrl(url) {
        if(url){
            return `url(${url})`;
        }else{
            return null;
        }

    }


    randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}

module.exports = help;
