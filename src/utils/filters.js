import moment from "moment"
import Vue from "vue"


// 全局过滤器
Vue.filter("actorFilter", data => {
    if (data) {
        return data.map(item => item.name).join(" ")
    } else {
        return "暂无主演"
    }
})


// 引入 monent 组件
Vue.filter("dataFilter", (data, option = '/') => { // option moment里面的参数
    return moment(data * 1000).format("YYYY" + option + "MM" + option + "DD");
    //moment里面的时间戳
})