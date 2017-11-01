/**
 * Created by apin on 2017/10/11.
 */
import React, { Component } from 'react';
import css from './MyCalendar.less';
import { Icon,Button} from 'antd';
import CalendarHelp from './CalendarHelp';
import DealDate from './DealDate';

class page extends Component {
    constructor(props) {
        super(props);
        //用于记录日期，显示的时候，根据dateObj中的日期的年月显示
        this.state = {
            current_year : CalendarHelp.getFullYear(),
            current_month : CalendarHelp.getMonth(),
            current_day : CalendarHelp.getDate(),
            select_year : CalendarHelp.getFullYear(),
            select_month : CalendarHelp.getMonth(),
            select_day : CalendarHelp.getDate(),
            history_year : undefined,
            history_month : undefined,
            history_day : undefined,
            date_num_array : [],
            tags :[],
            monthArr:[],
            isLeft:true,
            current_Y_M:""
        };
        this.weekArr = ["日","一","二","三","四","五","六"];
    }
    refreshMonth(isLeft,monthArr){
        // let myDateArr = DealDate.dealDateArr(dataSource);

        this.setState({
            // tags:dataSource,
            monthArr:monthArr,
            isLeft:isLeft
        });
    }
    //刷新日历每天的数据
    refreshCalendarDay(isLeft,dataSource){
        this.setState({
            tags:dataSource,
            isLeft:isLeft
        });
    }
    componentWillReceiveProps(nextProps) {
        // todo
    }

    /**
     * 组件渲染完后执行
     */
    componentDidMount() {
        let { year, month, day , current_Y_M} = this.props;

        // // 初始化状态
        // if(year && month && day) {
        //     let date_num_array = this._initMonthDayNumber(year),
        //         first_day = CalendarHelp.weekOfMonth(new Date(year, month - 1));
        //
        //     this.setState({
        //         select_year : year,
        //         select_month : month - 1,
        //         select_day : day,
        //         date_num_array : date_num_array,
        //         first_day : first_day
        //     });
        // }

        this.initYMD(year, month, day);
    }
    initYMD(year,month,day,current_Y_M){
        // 初始化状态
        if(year && month && day) {
            let date_num_array = this._initMonthDayNumber(year),
                first_day = CalendarHelp.weekOfMonth(new Date(year, month - 1));

            this.setState({
                select_year : year,
                select_month : month - 1,
                select_day : day,
                history_year : year,
                history_month : month - 1,
                history_day : day,
                date_num_array : date_num_array,
                first_day : first_day,
                current_Y_M:current_Y_M
            });
        }
    }
    /**
     * 给月份数组附上每月天数
     * @param year 年份
     * @private
     */
    _initMonthDayNumber(year) {
        let _date_array = [];

        for (var i = 0; i < 12; i++) {
            switch (i + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    _date_array.push(31);
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    _date_array.push(30);
                    break;
                case 2:
                    if (CalendarHelp.isLeapYear(year)) {
                        _date_array.push(29);
                    } else {
                        _date_array.push(28);
                    }
                    break;
                default:
                    break;
            }
        }
        return _date_array;
    }

    /**
     * 组件将要挂载
     * 设置月份数组以及计算出每月的第一天星期几
     */
    componentWillMount() {
        let date_num_array = this._initMonthDayNumber(this.state.current_year),
            first_day = CalendarHelp.weekOfMonth();

        this.setState({date_num_array : date_num_array, first_day : first_day});
    }

    /**
     * 日期选择
     * @param s_day
     */
    selectDate(s_day,tagDataItem) {
        let { select_year, select_month,isLeft} = this.state;
        this.setState({
            history_year : select_year,
            history_month : select_month,
            history_day : s_day,
            select_day : s_day
        }, () => {
            if (this.props.onSelectDate){
                this.props.onSelectDate(tagDataItem,isLeft);

                //返回年月日具体数字
                // this.props.onSelectDate(select_year, select_month +1 , s_day,tagDataItem,isLeft);
            }
        });
    }

    //选择的月份
    selectMonth(selMonth,isLeft) {
        let { current_year, current_month, current_day,
            select_year, select_month, select_day, date_num_array, first_day} = this.state;

        select_year = selMonth.substring(0,4);
        select_month = selMonth.substring(5,7);

        if (select_month === 12) {
            select_month = select_month-1;
            date_num_array = this._initMonthDayNumber(select_year);
        } else {
            select_month = select_month-1;
        }
        first_day = CalendarHelp.weekOfMonth(new Date(select_year, select_month));

        if (current_year === select_year &&
            current_month === select_month) {
            select_day = current_day;
        } else {
            select_day = undefined;
        }

        this.setState({
            select_year : select_year,
            select_month : select_month,
            select_day : select_day,
            date_num_array : date_num_array,
            first_day : first_day
        }, () => {
            if (this.props.onSelectMonth){
                //返回年月
                this.props.onSelectMonth(selMonth,isLeft);
            }
        });
    }

    /**
     * 渲染页面
     */
    render() {
        let {row_number, col_number,title} = this.props;

        let {current_Y_M, current_year, current_month, current_day,
            select_year, select_month, select_day,
            history_year, history_month, history_day,
            date_num_array, first_day,tags ,monthArr,isLeft} = this.state;

        let month_day = date_num_array[select_month],
            n_day = row_number * col_number - first_day - month_day,
            previous_month_days = undefined,
            previous_days = [],
            current_days = [],
            next_days = [],
            total_days = [],
            previous_month = undefined;

        if (select_month === 0) {
            previous_month = 11;
        } else {
            previous_month = select_month - 1;
        }

        previous_month_days = date_num_array[previous_month];
        //在本月之前的
        for (let i = 0; i < first_day; i++) {
            let itemView =
                (<div className={css.itemGray}
                      key={'previousItem'+i+(isLeft?"left":"right")}>
                    <div className={css.dayGray}>
                        {previous_month_days - (first_day - i) + 1}
                    </div>
                </div>);

            let previous_link = (<CalendarItem
                key={'previous'+i+(isLeft?"left":"right")}
                itemView = {itemView}/>);
            previous_days.push(previous_link);
        }

        //在本月当中的
        let currentClassName = '',
            currentText = '';
        let itemView = null;
        for (let i = 0; i < month_day; i++) {
            // 今天样式
            if (current_year == select_year && current_month == select_month && current_day == (i + 1)) {
                currentText = '今天';
            } else {
                currentText = i + 1;
            }
            currentClassName = css.itemActive;
            itemView = (<div className={currentClassName} key={'currentItem'+i+(isLeft?"left":"right")}>
                <div className={css.dayTitle}>
                    {currentText}
                </div>
            </div>);

            // 添加tag样式
            if (tags&&tags.length > 0) {
                for (let j = 0; j < tags.length; j++) {
                    let tagDataItem = tags[j];
                    let tagDay = tagDataItem.retDate;
                    tagDay = parseInt(tagDay.substring(8));
                    if ((i + 1) === tagDay) {
                        // 判断选择样式与历史样式是否相等，相等激活
                        let isSelect = (select_year == history_year && select_month == history_month && history_day == (i + 1));
                        currentClassName = isSelect?css.itemSelect:css.itemTags;
                        itemView = (
                            <div className={currentClassName}
                                 key={'currentItem'+i+(isLeft?"left":"right")}
                                 style={{cursor: 'pointer'}}
                                 onClick={this.selectDate.bind(this, i + 1,tagDataItem)}>
                                {isSelect?(<div className={css.itemSelect_sign}></div>):null}
                                <div className={css.dayTitle}>
                                    {currentText}
                                </div>
                                <div className={isLeft?css.refPrice:css.price}> {"¥"+tagDataItem.basePrice}</div>
                                {isLeft?null:<div className={css.sit}>{"余位"+tagDataItem.remainCount}</div>}
                            </div>);
                    }
                }
            }
            let current_link = (
                <CalendarItem
                    key={'calendarItem'+i+(isLeft?"left":"right")}
                    itemView = {itemView}/>);
            current_days.push(current_link);
        }

        //紧随本月之后的
        for (let i = 0; i < n_day; i++) {
            let itemView = (
                <div className={css.itemGray} >
                    <div className={css.dayGray}>{i + 1}</div>
                </div>);

            let next_link = (<CalendarItem key={'next'+i} itemView={itemView}/>);
            next_days.push(next_link);
        }

        total_days = previous_days.concat(current_days, next_days);

        let ul_list = [];
        if (total_days.length > 0) {
            for (let i = 0; i < row_number; i++) {
                let li_list = [],
                    start_index = i * col_number,
                    end_index = (i + 1) * col_number;
                for (let j = start_index; j < end_index; j++) {
                    li_list.push(total_days[j]);
                }
                ul_list.push(li_list);
            }
        }

        return (
            <div className={css.calendar}>
                <div className={css.calendarHeader}>
                    <div className={css.calendarHeader_title}
                         style={{width:title!=""?"15%":"0px"}}
                    >{title}</div>
                    <div className={css.calendarHeader_con} style={{width:title!=""?"85%":"100%"}}>
                        <MonthView
                            selectMonthAction={(selMonth)=>{
                                this.setState({
                                    current_Y_M:selMonth
                                });
                                this.selectMonth(selMonth,isLeft);
                            }}
                            current_month={current_Y_M}
                            monthArr = {monthArr}
                        />
                    </div>

                </div>
                <div className={css.cBodyHead}>
                    {this.createWeekItem()}
                </div>
                <div className={css.cBodyHead}>
                    {
                        ul_list.map((u, index) => {
                            return (<div key={'ul'+index} className={css.contentRow}>{u}</div>);
                        })
                    }
                </div>
            </div>
        );
    }
    createWeekItem(){
        let weekArrView=[];
        let data = this.weekArr;
        for (let i=0;i<data.length;i++){
            let dataItem = data[i];
            let div = (<div className={css.cBodyItem} key={i+"week"}>{dataItem}</div>);
            weekArrView.push(div);
        }
        return weekArrView;
    }
}
page.contextTypes = {
    router: React.PropTypes.object
};

//日历小Item
class CalendarItem extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            isMounseSel:false
        });
    }
    /**
     * 组件渲染完后执行
     */
    componentDidMount() {

    }
    isMounseIn(isIn){
        this.setState({
            isMounseSel:isIn
        });
    }
    render(){
        let {itemView} = this.props;
        return(<div className={this.state.isMounseSel?css.borderIsMounseSel:css.borderDefault}
                    onMouseEnter={()=>{
                        this.isMounseIn(true);
                    }}
                    onMouseLeave={()=>{
                        this.isMounseIn(false);
                    }}>
            {itemView}
        </div>);
    }
}


class MonthView extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            current_month:"",
            remove_width:"0",
            isBeyond:false,
            monthArr:[],
            clickLeft:"auto",
            clickRight:"auto"
        });
        this.removeNum = 0;
        this.removeTotal = 0;
    }

    /**
     * 组件渲染完后执行
     */
    componentDidMount() {
        let {monthArr,current_month} = this.props;
        this.setUpViewMonthWidth(monthArr,current_month);
    }
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        let {monthArr,current_month} = nextProps;
        this.setUpViewMonthWidth(monthArr,current_month);
    }

    setUpViewMonthWidth(monthArr,current_month){
        // monthArr = ["2017-10","2017-11","2017-12","2018-01","2018-02","2018-03","2018-04","2018-05"];
        let monthView_width = this.monthView.offsetWidth;
        let month_width = 0;
        if (monthArr&&monthArr.length>0){
            month_width = monthArr.length*85;
        }
        let isBig = month_width>(monthView_width+this.removeTotal);
        current_month = current_month?current_month.substring(0,7):"";
        this.setState({
            isBeyond:!isBig,
            monthArr:monthArr,
            current_month:current_month
        });
    }
    render(){
        let {selectMonthAction} = this.props;
        let {monthArr} = this.state;
        let month_width = 0;
        if (monthArr&&monthArr.length>0){
            month_width = monthArr.length*85;
        }
        var translateX = "translateX("+this.state.remove_width +"px)";
        var monthView_With = this.monthView?this.monthView.offsetWidth:0;
        return(<div className={css.monthView_bg}>
            {this.removeNum==0?(<div style={{float: "left",width:"15px",height:"20px" }}></div>):
                (<div className={css.calendarHeaderIcon}>
                    <img className={css.icon} style={{float: "right",cursor: 'pointer',pointerEvents:this.state.clickLeft}}
                         onClick={()=>{
                             //控制不能点击过快
                             this.setState({
                                 clickLeft:"none"
                             });

                             if (this.removeNum<1){
                                 this.setState({
                                     clickLeft:"auto"
                                 });
                                 return;
                             }
                             this.removeNum = this.removeNum-1;
                             this.removeTotal = this.removeTotal -85;

                             this.setState({
                                 isBeyond:false
                             });
                             var remove_width = this.state.remove_width;
                             let moveStep = 0;
                             let myInterval = setInterval(()=>{
                                 moveStep++;
                                 if (moveStep<=85){
                                     this.setState({
                                         remove_width:remove_width+moveStep
                                     });
                                 }else {
                                     moveStep = 0;
                                     this.setState({
                                         clickLeft:"auto"
                                     });
                                     clearInterval(myInterval);
                                 }
                             },1);
                         }}
                         src={require("../../../../images/select_left_icon.png")}/>
                </div>)}

            <div ref={(a)=>this.monthView = a}
                 className={css.monthView}>
                <div className={css.monthView_super}
                     style={{
                         width:month_width+"px",
                         transform:translateX,
                     }}>
                    {this.createMonthItem(monthArr,selectMonthAction)}
                </div>
                {this.removeNum==0?null:<div className={css.blurLeft}></div>}
                <div className={css.blurRight}></div>
            </div>

            {this.state.isBeyond?null:(<div className={css.refCalendarHeaderIcon}>
                <img className={css.icon} style={{cursor: 'pointer',pointerEvents:this.state.clickRight}}
                     src={require("../../../../images/select_right_icon.png")}
                     onClick={()=>{
                         this.setState({
                             clickRight:"none"
                         });
                         //日期所占背景的宽度
                         let monthView_width = this.monthView.offsetWidth;
                         let remove_width = this.state.remove_width;
                         let isBeyond = month_width-(monthView_width+this.removeTotal);
                         let isBool = (!monthArr || isBeyond<0);
                         if (isBool){
                             this.setState({
                                 clickRight:"auto"
                             });
                             return;
                         }

                         this.removeNum = this.removeNum+1;
                         this.removeTotal = this.removeTotal +85;
                         let isBig = month_width-(monthView_width+this.removeTotal);
                         this.setState({
                             isBeyond:isBig<0
                         });

                         let moveStep = 0;
                         let myInterval = setInterval(()=>{
                             moveStep++;
                             if (moveStep<=85){
                                 this.setState({
                                     remove_width:remove_width-moveStep
                                 });
                             }else {
                                 moveStep = 0;
                                 this.setState({
                                     clickRight:"auto"
                                 });
                                 clearInterval(myInterval);
                             }
                         },1);
                     }}/>
            </div>)}
        </div>);
    }
    createMonthItem(monthArr,selectMonthAction){
        if (!monthArr||monthArr.length<1){
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;

            let y_m_d = year+"-"+month;
            monthArr = [y_m_d];
        }

        var monthItemArr = [];
        for (let i = 0; i < monthArr.length; i++) {
            // 判断选择样式与历史样式是否相等，相等激活
            let item_MonthView = null;
            let monthData_item = monthArr[i];
            let isSelect = (monthData_item == this.state.current_month);
            let myMonth = monthData_item?monthData_item.replace("-","年"):"";
            item_MonthView = (
                <div key={"current_month"+i}
                     className={isSelect?css.select_monthItem:css.monthItem}
                     style={{cursor: 'pointer'}}
                     onClick={()=>{
                         this.setState({
                             current_month:monthData_item
                         },()=>{
                             if (selectMonthAction){
                                 selectMonthAction(monthData_item);
                             }
                         });
                     }}>{myMonth+"月"}
                </div>);
            monthItemArr.push(item_MonthView);
        }
        return monthItemArr;
    }
}
module.exports = page;