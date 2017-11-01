//重写日志系统
function getUrlSearch(str) {
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

window.log = function (obj) {
    /* eslint-disable no-console */
    console.log(obj);
};
window.app_getPar = function (obj) {
    if (!obj || !obj.props || !obj.props.location) {
        return {};
    }
    let state = obj.props.location.state;
    let query = obj.props.location.query;
    let data = query ? query.data : null;
    return Object.assign(state || {}, data ? JSON.parse(decodeURIComponent(data)) : {});
};
window.app_open = function (obj, path, state, open, callBack) {
    log(obj);
    if (!obj || (!obj.context) || (!obj.context.router) || (!obj.context.router.push)) {
        alert("打开页面错误,请检查");
        if (callBack) {
            callBack("打开页面错误,请检查");
        }
    }

    let search = getUrlSearch(window.location.href);
    let ip = "?";
    if (search && search.ip) {
        ip = "?ip=" + search.ip + "&";
    }

    let get = state ? "data=" + encodeURIComponent(JSON.stringify(state)) : "";
    get = ip + get;
    if(get==="?"){
        get = "";
    }
    if (open === "new") {
        window.open(path + get);
    } else if (open === "self") {
        window.location.pathname = path + get;
    } else {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        obj.context.router.push(
            {
                pathname: path,
                state: state
            });
    }
};

window.apin = {};

function exe() {
    apin.cache = new Map();
    apin.setCache = function (key, obj) {
        apin.cache.set(key, obj);
    };
    apin.delCache = function (key) {
        apin.cache.delete(key);
    };
    apin.getCache = function (key) {
        let v = apin.cache.get(key);
        apin.delCache(key);
        return v;
    };
}

exe();

const React = require("react");
const ReactDOM = require("react-dom");
const routes = require("./routes.js");
ReactDOM.render(routes, document.getElementById("root"));