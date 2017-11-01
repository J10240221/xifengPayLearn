/**
 * Created by Administrator on 2017\10\14 0014.
 */

/**
 * 带有下拉选项，完成提示的输入框组件。
 * 如何使用：
 *
 * <AutoInput
 *   value=''               string  可选  接管输入框的显示值
 *   defaultValue=''        string  可选  输入框默认的初始值
 *   placeholder=''         string  可选  占位符
 *   max=''                 string/number  可选  可输入的最大字符数
 *   defaultSource={[]}       array   必选   默认的下拉选项
 *   searchSource={[]}        array   必选   匹配的下拉选项
 *   onChange={(val)=>{}}        function  可选  输入框内容改变的回调  参数为输入框的值
 *   onSelect={(val,index,opt)=>{}}  function  可选   下拉框选择后的回调   参数为选项的value属性，选项的                                                       index,整个选项的dom元素
 *   onFocus={()=>{}}           function   可选   输入框获得焦点后的回调
 *   onBlur={()=>{}}            function   可选   输入框失去焦点后的回调
 * />
 *
 *  数据数组格式举例：
 *      defaultSource=[
            {
                title: '热门城市',
                children: [{
                    cityName: '北京',
                    idata: '3001002111',
                    value:'北京(BJ)'
                }, {
                    cityName: '西安',
                    idata: '3001002112',
                    value:'西安(XA)'
                }],
             },
            {
                title: '推荐城市',
                children: [{
                    cityName: '杭州',
                    idata: '3001002113',
                    value:'杭州(HZ)'
                }, {
                    cityName: '宁波',
                    idata: '3001002114',
                    value:'宁波(NB)'
                }],
             },
        ];
 *
 *      searchSource=[
             {
                cityName:'天津',
                idata:'12312319',
                value:'天津（TJ）'
             },
             {
                 cityName:'香港',
                 idata:'12312390',
                 value:'香港（XG）'
             },
             {
                 cityName:'台北',
                 idata:'12312366',
                 value:'台北（TB）'
             },
        ]
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import css from './AutoInput.less';

class AutoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:props.defaultValue?props.defaultValue:'',             //实际值
            inputFocused:false,                                         //获焦
            selectIndex:0                                           //当前选中的项
        };

        this.placeholder=this.props.placeholder?this.props.placeholder:'';         //占位符
        this.max=this.props.max?parseInt(this.props.max):'';                       //最大长度
        this.optsNum=0;                                                     //总共有几项
        this.searchSourceCopy=[];                                           //绘制的下拉选项视图数组
        this.onChangeCB = this.props.onChange?this.props.onChange:()=>{};   //变值回调
        this.onSelectCB = this.props.onSelect?this.props.onSelect:()=>{};   //选择回调
        this.onFocusCB = this.props.onFocus?this.props.onFocus:()=>{};      //获焦回调
        this.onBlurCB = this.props.onBlur?this.props.onBlur:()=>{};         //失焦回调
    }


    render() {
        let inputVal = this.props.value?this.props.value:this.state.value;
        let {defaultSource,searchSource}=this.props;
        this.searchSourceCopy = searchSource;
        this.optsNum = searchSource&&searchSource.length;
        return (
            <div className={css.container}>
                <input
                    maxLength={this.max}
                    type="text"
                    className={css.inputStyle}
                    value={inputVal}
                    placeholder={this.placeholder}
                    onChange={(e)=>{this.valueChange(e);}}
                    onFocus={()=>{this.getFocus();}}
                    onBlur={()=>{this.loseFocus();}}
                    onKeyDown={(event)=>{this.inputKeyDown(event);}}
                />
                <div className={this.state.inputFocused?css.optionsBox:css.close}
                >
                    {
                        this.state.value.length>0
                        ?this.getSearchOptions(searchSource)
                        :this.getDefaultOptions(defaultSource)
                    }
                </div>
            </div>
        );
    }

    /**
     * 输入框获取/失去 焦点 触发
     * @param boolen    true/false
     */
    changeFocus(boolen){
        setTimeout(()=>{
            this.setState({
                inputFocused:boolen
            });
        },200);

    }

    /**
     * 绘制默认下拉视图
     * @returns {XML}
     */
    getDefaultOptions(data){
        if(!data||!(data instanceof Array)){
            return;
        }
        if(data.length<1){
            return(
                <div className={css.noSources}>数据加载中...</div>
            );
        }
        return(
            data.map((group,key) => (
                    this.getCityBox(group,key)
                )
            )
        );
    }

    /**
     * 绘制一组标签城市
     * @param group
     * @returns {XML}
     */
    getCityBox(group,key){
        if(!group){
            return;
        }
        return(
            <div
                key={'group'+key}
                className={css.groupBox}
            >
                <div className={css.groupTitle}>{group.title}</div>
                <div>
                    {
                        this.defaultCityList(group.children)
                    }
                </div>
            </div>
        );
    }

    /**
     * 绘制城市标签
     * @param data
     * @returns {Array}
     */
    defaultCityList(data){
        let list = [];
        data.map((obj,key) =>{(
            list.push(
                <div
                    key={'city'+key}
                    className={css.cityItem}
                    onClick={(e)=>{this.selectOption(e,key);}}
                    value={obj.value}
                    data-num={key}
                    data-idata={obj.idata}
                >
                    {obj.cityName}
                </div>
            )
        );});
        return list;
    }

    /**
     * 绘制搜索下拉视图
     * @returns {XML}
     */
    getSearchOptions(data){
        if(!data||!(data instanceof Array)){
            return;
        }
        if(data.length<1){
            return(
                <div className={css.noSources}>对不起，暂不支持该地点</div>
            );
        }
        let searchOptionView = [];

        data.map((item,key) => (
            searchOptionView.push(
                    <div
                        key={'searchCity'+key}
                        className={key==this.state.selectIndex?css.onSelect:css.searchItem}
                        onClick={(e)=>{this.selectOption(e,key);}}
                        onMouseEnter={(e)=>{this.mouseEnter(e);}}
                        value={item.value}
                        data-num={key}
                        data-idata={item.idata}
                    >
                        {this.matchText(item.cityName)}
                    </div>
                )
            )
        );
        this.searchSourceCopy = searchOptionView;
        return searchOptionView;
    }

    /**
     * 将匹配的字符变色
     * @param txt
     * @returns {*}
     */
    matchText(txt){
        let text = txt;
        let value = this.state.value;
        let len = value.length;
        let textArray = Array.from(txt);
        let chartIndex = text.toLowerCase().indexOf(value.toLowerCase());
        if(chartIndex>=0){
            let itemView = [];
            textArray.map((chart,key)=>(
                itemView.push(
                    <span
                        key={'chart'+key}
                        className={(chartIndex<=key&&key<(chartIndex+len))?css.matchColor:''}
                    >
                    {chart}
                </span>
                )
            ));
            return itemView;
        }else{
            return text;
        }

    }

    /**
     * 用户点击选择
     * @param e
     */
    selectOption(e,index){
        let selOpt = e.target.getAttribute('value');
        if(selOpt){
            if(this.props.value!=undefined||!this.props.value){
                this.setState({
                    value:selOpt
                });
            }
            this.onSelectCB(selOpt,index,e.target);
        }
    }

    /**
     * 输入框内容改变，将值保存在状态机
     * @param e
     */
    valueChange(e){
        if(e&&e.target) {
        let value = e.target.value.trim();
            if(this.props.value!=undefined||!this.props.value){
                this.setState({
                    value: value
                });
            }
            this.onChangeCB(value);
        }
    }

    /**
     * 当鼠标移入选项的时候，修改当前被选中的项
     * @param e
     */
    mouseEnter(e){
        let index = parseInt(e.target.getAttribute('data-num'));
        this.setState({
            selectIndex:index
        });
    }

    /**
     * 输入框获取焦点
     */
    getFocus(){
        this.changeFocus(true);
        this.onFocusCB();

        //注册监听键盘事件
        document.onkeydown=(e)=>{
            e=window.event||e;
            switch(e.keyCode){
                case 38://向上键
                    this.changeIndex(-1);
                    break;
                case 40://向下键
                    this.changeIndex(1);
                    break;
                case 13://回车键
                    this.checkedSel(e);
                    break;
                default:
                    break;
            }
        };
    }

    /**
     * 输入框失去焦点
     */
    loseFocus(){
        this.changeFocus(false);
        this.onBlurCB();

        //注销键盘监听
        document.onkeydown=null;
    }

    /**
     * 改变选中项的index
     * @param num
     */
    changeIndex(num){
        if(this.state.value.length<=0){
            return;
        }
        let nowIndex = this.state.selectIndex;
        let maxNum = this.optsNum-1;
        let newIndex = nowIndex+num<0?maxNum:(nowIndex+num>maxNum?0:nowIndex+num);
        this.setState({
            selectIndex:newIndex
        });
    }

    /**
     * 当按下回车时的调用
     * @param e
     */
    checkedSel(e){
        if(this.state.value.length<=0){
            return;
        }
        let inputDom = e.target;
        //失去焦点
        inputDom.blur();

        let index = this.state.selectIndex;
        let dataTarget = this.searchSourceCopy[index];

        let selOpt = dataTarget.props.value;
        if(selOpt){
            if(this.props.value!=undefined||!this.props.value){
                this.setState({
                    value:selOpt
                });
            }
            this.onSelectCB(selOpt,index,dataTarget);
        }
    }

    /**
     * 阻止输入框的上下按键移动光标
     * @param event
     */
    inputKeyDown(event){
        let key_num = event.keyCode;
        if (38 == key_num||40==key_num) {
            event.preventDefault();
            // return false;
        }
    }

    getValue(){
        return this.state.value;
    }
}

AutoInput.contextTypes = {
    router: React.PropTypes.object
};

module.exports = AutoInput;