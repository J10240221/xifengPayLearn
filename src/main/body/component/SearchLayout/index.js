/**
 * Created by lixifeng on 17/10/12.
 */
import React, {Component} from "react";
import {Button, Input, Row, Col} from "antd";
import AutoInput from "../InputAuto";
import less from "./index.less";

/**
 * 搜索view
 */
class SearchLayout extends Component {

    constructor(props) {
        super(props);

        let {data} = this.props;
        if (!data) {
            data = {};
        }
        this.state = Object.assign({
            searchSource: [],
            defaultSource : [],
            loading: false
        }, data);
        this.img_login_check = require("../../../../images/check.png");
        this.img_login_uncheck = require("../../../../images/uncheck.png");
    }
    componentDidMount() {
        this.loadDefaultData();
        this.loadSearchData();
    }

    getData() {
        return {
            from: this.refs.from.getValue(),
            to: this.refs.to.getValue(),
            one: this.state.one
        };
    }

    homeView() {
        return (

            <div className={less.i_content}>

                <div className={less.title}>出发城市：</div>
                {this.getFromInput()}
                <div className={less.title}>到达城市：</div>
                {this.getToInput()}

                {this.getSwitchLayout()}
                {this.getButton()}
            </div>            );

    }

    getButton() {
        return (
            <div className={less.buttonLayout}>
                <Button
                    loading={this.state.loading}
                    type="primary"
                    className={less.button}
                    onClick={() => {
                        if (this.props.submit) {
                            this.props.submit(this.getData());
                        }
                    }}>
                    {"搜索" + (this.state.loading ? "中" : "")}
                </Button>
            </div>
        );
    }

    getSwitchView(v, title, cb,type) {
        return (
            <div
                onClick={() => {
                    cb();
                }}
                className={type === 1 ?less.searchAction:  less.action }
            >
                <img className={less.actionImg} src={v ? this.img_login_check : this.img_login_uncheck}
                />
                <div className={less.actionTitle} >{title}</div>
            </div>
        );
    }

    getSwitchLayout(type){
        return (
            <div >

                {this.getSwitchView(this.state.one, "单程",
                    () => {
                        let s = !this.state.one;
                        this.setState({
                            one: s
                        });
                    },type)}
                {type!==1?<div style={{width:20,display:"inline-block"}}/>:null}

                {this.getSwitchView(!this.state.one, "往返",
                    () => {
                        let s = !this.state.one;
                        this.setState({
                            one: s
                        });
                    },type)}

            </div>
        );
    }

    getFromInput(){
       return <AutoInput
            className={less.inputAuto}
            ref="from"
            type={"from"}
            defaultValue={this.state.from}
            placeholder={'中文／拼音／三字码'}
            max={'10'}
            defaultSource={this.state.defaultSource}
            searchSource={this.state.searchSource}
            onChange={(val)=>{this.valChange(val);}}
            onSelect={(val,index,opt)=>{this.userSelect("from",val,index,opt);}}
        />;
    }
    getToInput(){
        return  <AutoInput
            className={less.inputAuto}
            ref="to"
            type={"to"}
            defaultValue={this.state.to}
            placeholder={'中文／拼音／三字码'}
            max={'10'}
            defaultSource={this.state.defaultSource}
            searchSource={this.state.searchSource}
            onChange={(val)=>{this.valChange(val);}}
            onSelect={(val,index,opt)=>{this.userSelect("to",val,index,opt);}}
        />;
    }
    searchView() {
        return (
            <div className={less.bar}>
                <div className={less.inputLayoutLeft} style={{width:40}}/>
                <div className={less.row}>
                    {this.getSwitchLayout(1)}
                </div>
                <div className={less.inputLayoutLeft} style={{width:40}}/>
                <div className={less.lineLayout}>
                    <div className={less.line}/>
                </div>
                <div className={less.inputLayoutLeft} style={{width:40}}/>
                <div className={less.inputLayout}>
                    <div className={less.inputLayoutSpan}>出发城市：</div>
                    <div className={less.inputLayoutDiv}>
                        {this.getFromInput()}
                    </div>
                </div>
                <div className={less.inputLayoutLeft} style={{width:20}}/>
                <div className={less.inputLayout}>
                    <div className={less.inputLayoutSpan}>到达城市：</div>
                    <div className={less.inputLayoutDiv}>
                        {this.getToInput()}
                    </div>
                </div>
                <div className={less.inputLayoutLeft} style={{width:40}}/>
                <div className={less.row}>
                    {this.getButton()}
                </div>


            </div>
        );
    }

    render() {
        let {type} = this.props;
        return (
            <div style={{width: "100%"}}>
                {type === 1 ? this.homeView() : this.searchView()}
            </div>
        );
    }

    setLoading(loading) {
        this.setState({
            loading: loading
        });
    }

    valChange(val){
        this.setState({
            value:val
        });
        this.loadSearchData(val);
    }

    userSelect(m,val,index,opt){
        this.setState({
            [m]:val
        });
        this.loadSearchData(val);
    }


    loadSearchData(value){
        this.setState({
            searchSource:[
                {
                    cityName:'天津',
                    idata:'12312311',
                    value:'天津（TJ）'
                },
                {
                    cityName:'天津2',
                    idata:'12312311',
                    value:'天津234（TJ）'
                },
                {
                    cityName:'天津23232',
                    idata:'12312311',
                    value:'天津2342（TJ）'
                }
            ]
        });
    }

    loadDefaultData(){
        this.setState({
            defaultSource:[
                {
                    title: '热门城市',
                    children: [{
                        cityName: '北京',
                        idata: '12112211121',
                        value:'北京(BJ)'
                    }, {
                        cityName: '西安1',
                        idata: '1211122121',
                        value:'西安（XA）'
                    },
                        {
                            cityName: '北京',
                            idata: '12112211121',
                            value:'北京(BJ)'
                        }, {
                            cityName: '西安1',
                            idata: '1211122121',
                            value:'北京(BJ)'
                        },
                        {
                            cityName: '北京',
                            idata: '12112211121',
                            value:'北京(BJ)'
                        }, {
                            cityName: '西安1',
                            idata: '1211122121',
                            value:'北京(BJ)'
                        }
                    ]
                },
                {
                    title: 'Apin推荐',
                    children: [{
                        cityName: '杭州',
                        idata: '1222211121',
                        value:'杭州（HZ）'
                    }, {
                        cityName: '苏州',
                        idata: '32112211121',
                        value:'苏州（SZ）'
                    }]
                }
            ]

        });
    }
}

module.exports = SearchLayout;