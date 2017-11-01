/**
 * Created by apin on 2017/10/17.
 */
let APIGYW = {
    dealDateArr(dateArr){
        if (!dateArr||dateArr.length<1){
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            let myDate = year+"-"+month+"-"+day;
            return [myDate];
        }
        else {
            let firstObj = dateArr[0];
            let arrLen = dateArr.length;
            let lateObj = dateArr[arrLen-1];

            let firstDay = firstObj.retDate;
            let lateDay = lateObj.retDate;
            let monthArr = this.getYM(firstDay,lateDay);
            return monthArr;
        }
    },
    getYM(firstDay,lateDay){
        let first = firstDay.substring(0,7);
        let late = lateDay.substring(0,7);
        let arrYM = [];
        arrYM.push(first);
        
        if (first>=late){
            
            return arrYM;
        }else {
            do {
                let y = first.substring(0,4);
                let m = first.substring(5);
                m = parseInt(m);
                y = parseInt(y);
                if (m<12){
                    m++;
                    m = m.toString();
                    if (m.length<2){
                        m = "0"+ m.toString();
                    }
                }else {
                    m = "01";
                    y++;
                }
                first = y+"-"+m;
                arrYM.push(first);
            } while (first < late);
            return arrYM;
        }
    }
};
module.exports = APIGYW;