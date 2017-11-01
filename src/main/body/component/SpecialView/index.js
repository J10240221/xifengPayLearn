/**
 * Created by lixifeng on 17/10/12.
 */
import React, {Component} from 'react';
import {AutoComplete} from 'antd';
import css from './index.less';
/**
 * 底部每日特价view
 */
class SpecialView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    // departDate	出发日期	string	2017-10-23
    // lineId	航线id	string
    // price	价格	string	88.00
    // saled	已团数量	object
    // voyage	航程	string	杭州-北京
    // flightType	航线类型	number	0：未定义；1：单程；2：往返
    // depCity 出发
    // arrCity 到达
    render() {
        let {data} = this.props;
        if (!data)return null;
        if(data.voyage){
            data.voyage = data.voyage.replace("<->","-");
            let arr = data.voyage.split("-");
            if(arr.length===2){
                data.from = arr[0];
                data.to = arr[1];
            }
        }else{
            if(data.depCity){
                data.from = data.depCity;
                // delete  data.depCity;
            }
            if(data.arrCity){
                data.to = data.arrCity;
                // delete  data.arrCity;
            }
        }


        let img = null;
        data.one = data.flightType===1;
        if( data.one){
            img = require('../../../../images/oneWay.png');
        }else{
            img = require('../../../../images/return.png');
        }
        return (
            <div
                className={css.cell}
                {...this.props}
            >
                <div className={css.bottom}>
                <div className={css.bottomLeft}>

                   <div className={css.table}>
                       <div className={css.text}> {data.from}</div>


                       <div className={css.text2}>
                           <div className={css.icon}
                                style={{
                                    backgroundImage: "url(" + img + ")"
                                }}
                           >
                           </div>
                       </div>


                       <div className={css.text}> {data.to}</div>
                   </div>


                    <div style={{clear:"both"}}>
                        <font className={css.money}>{"¥"}</font>
                        <font className={css.moneyBig}>{data.price}</font>
                        <font className={css.moneyGray}>{"起"}</font>
                    </div>

                </div>
                    <div className={css.bottomRight}>
                        <font className={css.date}>{"已团"}</font>
                        <font className={css.date}>{data.saled+"张"}</font>
                        <br/>
                        <font className={css.date}>{this.getTimeShow(data.departDate)}</font>
                    </div>
                </div>
            </div>
        );
    }

    getTimeShow(value){
        if(!value){
            return value;
        }
        let arr= value.split("-");
        if (arr) {
            if (arr.length <= 3) {
                let p = ["年", "月", "日"];
                let time = "";
                for (let i=0;i<arr.length;i++) {
                    time+=(arr[i]+p[i]);
                }
                return time;
            } else {
                return value;
            }
        } else {
            return value;
        }
    }
}
module.exports = SpecialView;