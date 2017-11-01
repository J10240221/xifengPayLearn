/**
 * Created by lixifeng on 17/3/24.
 */
import React, {Component} from 'react';
class page  extends Component {


    render() {
        return (
            <div
                style={{
                    textAlign:"center"
                }}
            >
                <font style={{color:"#9c9999",fontSize:12}}>Copyright©2015 杭州爱拼机网络科技有限公司版权所有 浙ICP备 15024358号-1</font>
                <br/>
                <br/>
                <p>
                    <a href="http://www.itrust.org.cn/home/index/rz_certifi/wm/RZ2017081801" target='_blank'>
                        <img style={{height:32}}
                        src={require("../images/believe1.png")}/></a>
                    <a id='___szfw_logo___' href='https://credit.szfw.org/CX20170824035710820330.html'
                       target='_blank'>
                        <img style={{height:32,marginLeft:20}} src={require("../images/believe3.png")}/></a>
                    <a href="https://ss.knet.cn/verifyseal.dll?sn=e17082333010068646dvwe000000&pa=111332"
                       id="urlknet" target="_blank">
                        <img style={{height:32,marginLeft:20}} src={require("../images/believe2.png")}/></a>
                </p>
            </div>
        );
    }
}
module.exports = page;