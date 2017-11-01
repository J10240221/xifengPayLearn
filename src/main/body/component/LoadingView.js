/**
 * Created by apin on 2017/10/17.
 */
import React, { Component } from 'react';
import css from './LoadingView.less';
class MyAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        };
    }
    componentDidMount() {

    }
    refreshView(isShow,cb){
        if (isShow){
            this.setState({
                isShow:isShow
            });
        }else {
            setTimeout(()=>{
                this.setState({
                    isShow:isShow
                },cb);
            },500);
        }


    }
    render() {
        var div = (<div className={this.state.isShow?css.main:css.hidden}>
            <img className={css.alertbg} src={require("../../../images/loading.gif")}/>
        </div>);
        return div;
    }
}
MyAlert.contextTypes = {
    router: React.PropTypes.object
};
module.exports = MyAlert;