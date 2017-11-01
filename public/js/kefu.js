/**
 * 使用
 * kefu?groupid=497519
 * 添加参数 组ID
 */

if(window.ysf){
    window.ysf = {};
}
var getArgs=(function(){
    var sc=document.getElementsByTagName('script');
    var src = sc[sc.length-1].src;
    if(src.indexOf("?")<0) return {};
    var paramsArr=src.split('?')[1].split('&');
    var args={},argsStr=[],param,t,name,value;
    for(var ii=0,len=paramsArr.length;ii<len;ii++){
        param=paramsArr[ii].split('=');
        name=param[0],value=param[1];
        if(typeof args[name]=="undefined"){ //参数尚不存在
            args[name]=value;
        }else if(typeof args[name]=="string"){ //参数已经存在则保存为数组
            args[name]=[args[name]]
            args[name].push(value);
        }else{  //已经是数组的
            args[name].push(value);
        }
    }
    /*在实际应用中下面的showArg和args.toString可以删掉，这里只是为了测试函数getArgs返回的内容*/
    // var showArg=function(x){   //转换不同数据的显示方式
    //     if(typeof(x)=="string"&&!/d+/.test(x)) return "'"+x+"'";   //字符串
    //         if(x instanceof Array) return "["+x+"]"; //数组
    //     return x;   //数字
    // }
    // //组装成json格式
    // args.toString=function(){
    //     for(var ii in args) argsStr.push(ii+':'+showArg(args[ii]));
    //     return '{'+argsStr.join(',')+'}';
    // }
    return function(){return args;} //以json格式返回获取的所有参数
})();


//下载JS
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(typeof(callback) !== "undefined"){
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

window.onload = function () {
    loadScript("https://qiyukf.com/script/18ad0082e6d47bfc1862bad6f830220c.js",function () {
        window.ysf.config({
            groupid: getArgs()["groupid"]||'497519',
            success: function(){
                // todo
                var YSF_BTN_HOLDER =  document.getElementById('YSF-BTN-HOLDER');
                YSF_BTN_HOLDER.style.top = "110px" ;
                YSF_BTN_HOLDER.style.right = "80px"  ;
            },
            error: function(){
                // handle error
            }
        });
    });
}


