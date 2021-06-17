import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
import Vue2Scrollbar from 'vue2-scrollbar'
import Echarts from 'echarts'
import 'echarts-liquidfill'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/assets/styles/reset.css' // 重置样式
import '@/assets/fonts/iconfont.css' // 图标字体
import '@/assets/fonts/iconfont.js' // 图标字体
import 'element-ui/lib/theme-chalk/index.css' // element-ui
import 'aigodata-element-theme' // 定制element-ui
import '@/assets/styles/theme.css'
import '@/assets/styles/main.css' // 主样式文件
import validator from '@/lib/validator.js'
import Request from './plugin/request' //请求封装
import JSEncrypt from 'jsencrypt'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.echarts = Echarts
Vue.prototype.$validator = validator;

let encrypt = new JSEncrypt()
Vue.prototype.$setRSACode = function (code) {  //  加密
	encrypt.setPublicKey(`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPg/tpaxudKlDcSErq32OhMY0TWbJMFtbEbuY+oxS0sIW/ncARsZ7LZB+PKiMOgoZxH8+jRNTTkgYiQ0O73PRAB8zsoWgiIrj8UKXSTEhXZA9Hs0ge8PRuFExIqC84/al/rQRzUOT8PitPMhqx8pq8EHryCbm4mMMFCPkJu2/QzQIDAQAB`)
	let data = encrypt.encrypt(code)
	return data
}

Vue.prototype.$getRSACode = function (code) {  // 解密
	encrypt.setPrivateKey(`key`)
	let data = encrypt.decrypt(code)
	return data
}




Vue.use(Request);
Vue.use(ElementUI, {
    locale,
    size: 'small'
});
new Vue({
  router,
  store,
  scrollbar: Vue2Scrollbar,
  render: h => h(App)
}).$mount('#app')
