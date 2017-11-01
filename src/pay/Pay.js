import React, {Component} from 'react';

import {Pagination, Button, Modal,Input, Select, Col, Row} from 'antd';
import {HttpTool} from "../../lib/utils/index.js";
//获取模拟数据
import less from './Pay.less';

class page extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //id
        this.data = {
            order: {
                title: "北京=>上海",
                desc: "5天6晚 2007年12月12号-2009年XXXX",
                price: 50000,
            },
            integral: {
                all: 456121,
                use: 50
            },
            pay:{}
        };
    }


    render() {


        return (
            <div className={less.content}>
                <PayInfo
                    data={this.data.order}
                    ref={(ref)=>{
                        this.payInfo = ref;
                    }}
                />
                <PaySelectLayout
                 data={this.data.pay}
                />
                <IntegralInfo
                    data={this.data.integral}
                    onPriceChange={(use)=>{
                        this.payInfo.upDatePrice(use);
                    }}

                />

                <div className={less.nextLayout}>
                    <div>
                        订单含机票 ,民......
                    </div>
                    <Button type="primary"

                            onClick={()=>{
                                // let apinPanel =   this.openInitWindow();
                                this.panel.show(true,{
                                    content:"正在下单....",
                                    title:"支付信息",
                                    showType:"loading"

                                },()=>{
                                    let apinPanel =   this.openInitWindow();
                                        this.loadPayOrder(this.data,(code,msg,data)=>{
                                            if(code>0){
                                                //3秒后去开始验证,是否支付成功
                                                // setTimeout(()=>{this.autoVer(apinPanel);},3000);
                                                this.panel.show(true,{
                                                    okText:"我已经支付",
                                                    cancelText:"还没支付",
                                                    content:"正在支付....",
                                                    title:"支付信息",
                                                    showType:"paying"

                                                },()=>{
                                                    this.openWindow(apinPanel,data.url);
                                                });
                                            }else{
                                                this.closeWindow(apinPanel);
                                                this.panel.show(true,{
                                                    okText:"我知道了",
                                                    content:msg,
                                                    title:"支付信息",
                                                    showType:"error"
                                                },()=>{


                                                });
                                            }
                                        });
                                });

                            }}
                    >下一步</Button>
                </div>

                <Loading ref={(ref)=>{
                    this.loading = ref;
                }}/>
                <Panel
                    onAction={(action,showType)=>{

                        if(showType==="paying"){
                            this.handVer();
                        }else if(action ==="ok"&&showType==="success"){
                           //打开订单页
                            alert("打开订单页面");
                        }

                            }}
                    ref={(ref)=>{
                    this.panel = ref;
                }}/>
            </div>
        );
    }


    openInitWindow(){
        let w = window.screen.width*0.6 ,h = window.screen.height*0.6;
        this.shareWindow =  window.open('/html/loading.html', 'apinPanel', 'height='+h+', width='+w+', top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');

        return this.shareWindow;
    }

    openWindow(apinPanel,url){
        apinPanel.location.href = url;
    }
    closeWindow(apinPanel){
        let panel = apinPanel||this.shareWindow;
        if(panel){
            panel.close();
        }
    }

    handVer(){
        //关闭已经存在的窗口
        this.closeWindow();
        //验证是否支付
        this.panel.show(true,{
            content:"验证支付中",
            showType:"verpay"
        },()=>{
            this.loadPayOrderVer(this.data,(code,msg,data)=>{
                //验证是否支付成功
                if(code>0){
                    //支付成功
                    //关闭支付窗口
                    //提示支付成功
                    this.panel.show(true,{
                        content:msg,
                        showType:"success"
                    },()=>{


                    });
                }else{
                    this.panel.show(true,{
                        okText:"我知道了",
                        content:msg,
                        title:"支付信息",
                        showType:"error"
                    },()=>{


                    });
                }

            });

        });

    }


    autoVer(apinPanel){
        this.loadPayOrderVer(this.data,(code,msg,data)=>{
            //验证是否支付成功
            if(code>0){
                //支付成功
                //关闭支付窗口
                this.closeWindow(apinPanel);
                //提示支付成功
                this.panel.show(true,{
                    content:msg,
                    showType:"success"
                },()=>{


                });
            }else{
                setTimeout(()=>{
                    this.autoVer(apinPanel);
                },1000);
            }

        });

    }
    loadPayOrderVer(param,cb){
        setTimeout(()=>{
            let code = (Math.random()*10).toFixed(0)-5;
            let data = {};
            data.url = "http://www.baidu.com";
            cb(code,code>0?"支付成功":"支付失败",data);
        },Math.random()*1000+2000);
    }
    loadPayOrder(param,cb){
        setTimeout(()=>{
            let code = (Math.random()*10).toFixed(0)-5;
            let data = {};
            data.url = "http://www.baidu.com";
            cb(code,"无库存了/或者其他",data);
        },Math.random()*1000+2000);
    }
}
class Panel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:{},
        };
    }
    show(loading,data,callBack){
        this.setState({
            loading,
            data
        },callBack);
    }


    getPayingLayout(){
        let verPay = (action)=>{

            if(this.props.onAction){
                this.props.onAction(action,this.state.data.showType);
            }
        };
        const ButtonGroup = Button.Group;
        return (
          <div>
              <div >{this.state.data.content}</div>
              <ButtonGroup>
                  <Button onClick={()=>{verPay("cancel");}} >{this.state.data.cancelText}</Button>
                  <Button onClick={()=>{verPay("ok");}} type="primary">{this.state.data.okText}</Button>

              </ButtonGroup>
          </div>
        );
    }

    getErrorLayout(){
        return (
           <div>
               <div style={{color:"red"}}>{this.state.data.content}</div>
               <Button  onClick={()=>this.show(false)} >我知道了</Button>
           </div>
        );
    }
    getSuccessLayout(){
        return (
           <div>
               <div style={{color:"green"}}>{this.state.data.content}</div>
               <Button  onClick={(action)=>{
                   if(this.props.onAction){
                       this.props.onAction("ok",this.state.data.showType);
                   }
               }} >查看订单</Button>
           </div>
        );
    }
    getLoadingLayout(){
        return (
           <div>
               <div style={{color:"block"}}>{this.state.data.content}</div>
           </div>
        );
    }

    render(){
        if( !this.state.loading){
            return null;
        }
        let view = null;
        switch (this.state.data.showType){
            case "loading":
            case "verpay":
                view = this.getLoadingLayout();
                break;
            case "error":
                view = this.getErrorLayout();
                break;
            case "success":
                view = this.getSuccessLayout();
                break;
            case "paying":
                view = this.getPayingLayout();
                break;
        }

        return (
            <Modal
                   visible={true}
                   style={{ top: 300 }}
                   confirmLoading={false}
                   maskClosable={false}
                   closable={false}
                   footer={null}
                   {...this.state.data}
            >
                {view}
            </Modal>
        );
    }
}
class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
        };
    }
    show(loading,callBack){
        this.setState({
            loading
        },callBack);
    }

    render(){
        return this.state.loading?(
            <div className={less.loading}>
                <div>loading</div>
            </div>
        ):null;
    }
}

class IntegralInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData:0,
        };
    }

    componentDidMount() {
        if(this.props.onPriceChange){
            this.props.onPriceChange(this.getData().use);
        }
    }

    getData(){
        return this.props.data ||{};
    }
    render() {
        let data = this.getData();

        return (
            <div
                {...this.props}
            >
                <div className={less.integralInfo}>

                    <div className={less.integralInfoImg}>
                        图片
                    </div>
                    <div className={less.integralInfoRight}>
                        <div>积分抵扣</div>
                       <div>
                           您目前有{data.all}积分    可抵用付款500元
                           请输入您要抵用的积分
                           <input defaultValue={data.use}
                            onChange={(e)=>{
                                let v =Number(e.target.value);
                                if(Number.isInteger(v)) {
                                    data.use = v;

                                    this.setState({
                                        upData:this.state.upData+1
                                    });
                                }else{
                                    //请输入数字
                                }
                                if(this.props.onPriceChange){
                                    this.props.onPriceChange(data.use);
                                }
                            }}
                           />
                           可抵用{(data.use/1000).toFixed(2)}元
                       </div>
                    </div>

                </div>
            </div>
        );
    }
}

class PayInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            use:0,
        };
    }

    upDatePrice(use){
        this.setState({
            use:use
        });
    }
    getData(){
        return this.props.data ||{};
    }
    render() {
        let data = this.getData();
        data.payPrice = data.price-this.state.use;
        return (
            <div
                {...this.props}
            >
                <div className={less.payInfo}>

                    <div>
                        本次需支付金额:￥{((data.payPrice)/100).toFixed(2)}无
                    </div>
                    <div>
                        标题:{data.title}
                    </div>
                    <div>
                        描述:{data.desc}
                    </div>
                </div>
            </div>
        );
    }
}

class PaySelectLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxSelect: 3,
            showMore: false,
            selectIndex: 0,
            loading: true
        };
    }
    getData(){
        return this.props.data ||{};
    }
    getPayList() {
        return [
            {
                type: "ali",
                title: "支付宝",
                getView: () => {
                    return <div>支付宝图片</div>;
                },
                span: 8,
            },
            {
                type: "wechat",
                title: "微信支付",
                getView: () => {
                    return "微信支付";
                },
                span: 8,
            }, {
                type: "online",
                title: "在线支付",
                getView: () => {
                    return "在线支付";
                },
                span: 8,
            }, {
                type: "bank",
                title: "银行转账",
                getView: () => {
                    return "银行转账";
                },
                span: 10,
            }
        ];
    }


    render() {
        let payList = this.getPayList();
        if (!this.state.showMore) {
            payList = payList.slice(0, this.state.maxSelect);
        }
        let data = this.getData();
        return (
            <div
                {...this.props}
                className={less.payLayout}
            >
                <Row>

                    {
                        payList.map((obj, index) => {
                            obj.select = this.state.selectIndex === index;
                            if(obj.select){
                                data.type = obj.type;
                            }
                            return <PayItem
                                key={index}
                                {...obj}
                                onClick={() => {
                                    //选择当前选项
                                    this.setState({
                                        selectIndex: index
                                    }, () => {

                                    });
                                    //清空其他选择
                                }
                                }
                            >
                                {obj.getView()}
                            </PayItem>;
                        })
                    }
                </Row>
                <div
                    className={less.payMore}
                    onClick={() => {
                        this.setState({
                            showMore: !this.state.showMore
                        });
                    }}>{"" + (this.state.showMore ? "收起↑" : "更多支付方式↓")}</div>
            </div>
        );
    }
}

class PayItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col
                {...this.props}
            >
                <div className={this.props.select ? less.payItemSelect : less.payItem}>
                    {this.props.children}
                </div>
            </Col>
        );
    }
}

page.contextTypes = {
    router: React.PropTypes.object
};
module.exports = page;

