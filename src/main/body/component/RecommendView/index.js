/**
 * Created by lixifeng on 17/10/12.
 */
import React, {Component} from "react";
import {AutoComplete} from "antd";
import css from "./index.less";

/**
 * //精品特价航线view
 */
class RecommendView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    componentDidMount() {

    }


    // arrCity	到达城市名	string
    // arrCityImgUrl	到达城市图片Url	string
    // basePrice	底价	number
    // depCity	出发城市名	string
    // remainCount	剩余数量	number
    // soldCount	已售数量	number
    // endDate	出发时间截止	string
    // flightType	航程类型：0、未定义；1、单程；2、往返；3、多程	number
    // startDate	出发时间开始	string


    render() {

        let {data, template} = this.props;

        if (!data) {
            return null;
        }
        data.to = data.arrCity;
        data.from = data.depCity;



        let tag = this.getShowTag(data.flightType);
        return (
            <div
                className={css.cell}
                {...this.props}
            >
                <div className={css.border}>
                    <div
                        className={css.content}
                    >
                        <div className={css.imageFrame} style={{
                            backgroundImage: "url(" + this.getImageUrlForQiNiu(data.arrCityImgUrl) + ")"
                        }}/>
                        <div className={css.showFrame}>
                            {
                                this.getImageBottom(data, template)
                            }
                            {
                                tag?<div className={css.tag}>
                                    {tag}
                                </div>:null
                            }

                        </div>
                    </div>
                    {
                        this.getBottom(data, template)
                    }

                </div>

            </div>
        );
    }


    getCountShow(data, template) {
        if (template === 1) {
            return (
                <div className={css.bottomRight}>
                    <font className={css.moneyBlack}>{"已团"}</font>
                    <font className={css.money}>{data.soldCount + "张"}</font>
                    <br/>
                    <font className={css.moneyGray}>{"还剩" + data.remainCount + "张"}</font>
                </div>
            );
        } else {
            return (
                <div>
                    <font className={css.moneyWhite}>{"已团"}</font>
                    <font className={css.money}>{data.soldCount + "张"}</font>
                    <font className={css.moneyWhiteV}>{"|"}</font>
                    <font className={css.moneyWhite}>{"还剩" + data.remainCount + "张"}</font>
                </div>
            );
        }

    }

    getTitleLayout(data, template) {

        let img = null;
        data.one = data.flightType===1;
        if( data.one){
            img = require('../../../../images/dcw.png');
        }else{
            img = require('../../../../images/wfw.png');
        }
        return (
            <div>
                <div className={template === 1 ? css.title : css.titleBlack}>
                    <div className={css.text}> {data.depCity}</div>
                    <div className={css.text2}>
                        <div className={css.icon}
                             style={{
                                 backgroundImage: "url(" + img + ")"
                             }}
                        >
                        </div>
                    </div>
                    <div className={css.text}> {data.arrCity}</div>
                </div>
                <div style={{clear: "both"}}/>
            </div>
        );

    }

    getImageBottom(data, template) {

        return (
            <div className={css.titleLayout}>
                {template === 1 ? this.getTitleLayout(data, template) : this.getCountShow(data, template)}
            </div>
        );
    }


    getBottom(data, template) {
        if (template === 1) {
            return (
                <div className={css.bottom}>
                    <div className={css.bottomLeft}>
                        <font className={css.money}>{"¥"}</font>
                        <font className={css.moneyBig}>{data.basePrice}</font>
                        <font className={css.moneyGray}>{"起"}</font>
                        <br/>
                        <font className={css.moneyGray}>{"(含税)"}</font>
                    </div>
                    {this.getCountShow(data, template)}
                </div>
            );
        } else {
            return (
                <div className={css.bottom}>
                    <div className={css.bottomLeft}>
                        {this.getTitleLayout(data, template)}
                        <div
                            className={css.moneyGray}
                        >{this.getTimeShow(data.startDate) + "-" +this.getTimeShow(data.endDate)}</div>
                    </div>

                    <div className={css.bottomRight}>
                        <font className={css.money}>{"￥"}</font>
                        <font className={css.moneyBig}>{data.basePrice}</font>
                        <font className={css.moneyGray}>{"起"}</font>
                    </div>
                </div>
            );
        }

    }


    getImageUrlForQiNiu(url, w = 500) {
        if (!url) {
            return require("../../../../images/default.png");
        }
        return url.split("?")[0] + "?imageView2/0/w/" + w + "/interlace/1/q/75";
    }

    getShowTag(type) {
        // 航程类型：0、未定义；1、单程；2、往返；3、多程
        if (type === 2) {
            return "往返";
        } else if (type === 3) {
            return "多程";
        } else {
            return null;
        }
    }

    getTimeShow(value){
        if(!value){
            return value;
        }
        let ny = new Date().getFullYear().toString();
        let arr= value.split("-");
        if (arr) {
            if (arr.length <= 3) {
                let p = ["年", "月", "日"];
                let time = "";
                for (let i=0;i<arr.length;i++) {
                // &&arr[i]===ny
                    if(i===0){
                        //
                    }else{
                        time+=(arr[i]+p[i]);
                    }

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

module.exports = RecommendView;