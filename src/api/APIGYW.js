/**
 * Created by apin on 2017/10/16.
 */
let APIGYW = {
    /**
     * 城市对搜索
     */
    flightapi_flight_query: "/ba/flightapi/v1.0/flight/query",

    /**
     * 根据城市对与出发日期结束日期查询航班详情
     */
    flightapi_flightDetail_query: "/ba/flightapi/v1.0/flightDetail/query",


    //左日历月份
    flightapi_flightDetail_month_query: "/ba/flightapi/v1.0/flightDetail/month/query",

    //右日历月份
    flightapi_retFlight_month_query: "/ba/flightapi/v1.0/retFlight/month/query",

    //左日期
    flightapi_flightDetail_day_query: "/ba/flightapi/v1.0/flightDetail/day/query",

    /**
     * 根据城市对与出发日期查询航班 右日期
     */
    flightapi_flights_query: "/ba/flightapi/v1.0/flights/query"

};
module.exports = APIGYW;