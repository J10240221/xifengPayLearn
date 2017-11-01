/**
 * Created by lixifeng on 17/10/13.
 */
module.exports = {

    openSearch(obj,data){
        window.app_open(obj, "/Search", {
            data:this.transformationParam(data)
        },"new");
    },
    transformationParam(data){
        // return {
        //     from,to,one,two
        // }= data
        return {
            from:data.from,
            to:data.to,
            one:data.one
        };
    }
};