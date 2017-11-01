/**
 * Created by lixifeng on 16/11/4.
 */
let ClickHelp = {

    /**
     *
     * @param e 事件源 (e)=>{}
     */
    stopClick(e){
        try{
            e.nativeEvent.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
            e.cancelBubble=true;
        }catch (error){
            log(error);
        }
    },
};
module.exports = ClickHelp;