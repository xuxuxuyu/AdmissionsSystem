
import Axios from 'axios'
// import store from '@/store'
// import { message } from 'ant-design-vue';
// import { Toast } from 'ant-design-vue';
// import Vue from 'vue';
// import { Loading } from 'element-ui';



//fetch.js
const fetch = Axios.create({
    withCredentials: true,
    baseURL:baseURL,
    validateStatus: function (status) {
        return status >= 200 && status < 404; // 默认的
    },
})
//请求发送前拦截，根据地址重新配置域名，再子路由请求时必须加/ 例如：请求 localhost:80/app/inset  fetch.get('/app/inset');
fetch.interceptors.request.use(function (config) {
    // let url=config.url;
    // //判断是否是全地址，全地址不做转换，非全地址根据二级参数判断请求的域名
    // if(!url.startsWith("http://")&&process.env.NODE_ENV==='development'){
    //     config.url=baseURL[url.split('/')[1]]+url;
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器  后台登录状态判断和权限控制时很有用
fetch.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.status!=200||response.status!=200){
        if(response.data.status==403||response.status==403){
            Message({
                type:'error',
                message:'未登录',
            });
            store.commit("clert_store");
            router.push('/login')
        }else if(response.data.status==301||response.status==301){
            Modal.error({
                title: '权限提示',
                content: '暂无权限访问'
            });
        }
    }
    // console.log(response)
    return response.data;
}, function (error) {
    Message.error('请求失败，请检查网络');
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default fetch;
//main.js  
//把请求方法放到Vue的原型链上 这样在其他页面通过 this.$http.get/post(...)就可以使用了
import fetch from './request/fetch'

Vue.prototype.$http={
get(url,base,config){
let data={params:base};
return fetch(url,data,config);
},
post(...arr){
return fetch.post(...arr);
},
put(url,base,config){
// let data={data:base};
let data=base;
return fetch.put(url,data,config)
},
delete(url,base,config){
let data={data:base};
return fetch.delete(url,data,config);
}
}
//页面中使用
// this.$http.get(url).then(res=> {
//     let data = res;
//     if (data.status == 200) {
//      //do something
//     }
//   })

