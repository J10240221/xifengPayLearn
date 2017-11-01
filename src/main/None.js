/**
 * Created by lixifeng on 17/3/24.
 */
import React, {Component} from 'react';
import { Layout} from 'antd';

import less from "./None.less";
class page extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <Layout className={less.content}>
                <div className={less.empty}>
                    <div className={less.emptyText}>
                        <div>很抱歉，您要访问的页面不存在！</div>
                    </div>
                </div>
            </Layout>
        );
    }
}
page.contextTypes = {
    router: React.PropTypes.object
};
module.exports = page;