/**
 * Created by lixifeng on 17/10/12.
 */

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
module.exports  = {

   getData(count = 10){
       let arr = [];
       for(let i =0;i<count;i++ ){
           arr.push({
               from:"北京".repeat(i)+i,
               to:"天津".repeat(i)+i,
               money:((i+1)*Math.random()*10+200).toFixed(0)*10,
               views:Math.random().toFixed(1)*100,
               image:'/images/vm/xiangg.png',
               image2:'/images/vm/xiangg2.jpg',
               time:new Date().Format("MM月dd日")+"-"+new Date().Format("MM月dd日"),
               tag:i%2==0?"往返":"单程",
               type:i%2==0?1:2,
               count:((i+1)*Math.random()*10+200).toFixed(0)
           });
       }
       return arr;
   }
};