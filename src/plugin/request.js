import axios from 'axios'
import {
	Loading
} from 'element-ui';

/**
 * 统一拦截错误码
 * @param vm vue实例
 * @param state 状态码
 */
let parseStatusCode = (vm, data, state) => {
    // 成功
    if (state === 200) {
        return data.data
    }
    else {
        throw new Error(state || data.statusText|| 'request.js other error');
        // return data;
    }
}
/**
 * 开启Loading
 */
let stopEvent = (evt) => {
	evt.stopPropagation();
}
let startLoading = (loadingEl, that) => {
	if (!loadingEl) {
		return;
	}
	if (loadingEl == 'all') {
		return that.$loading({
			lock: true,
			text: '正在处理中, 请稍候...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.5)'
		});
	}
	if (Array.isArray(loadingEl)) {
		loadingEl = loadingEl[0]
	}
	let config = {
		target: loadingEl.$el || loadingEl
	}
	// @特殊处理, 有loading属性的元素, 更好默认图标
	if (loadingEl.loading !== undefined) {
		// config.spinner = 'el-icon-loading'
	}
	const loadingInstance = Loading.service(config);
	loadingInstance.$el.addEventListener("click", stopEvent)
	return loadingInstance;
}

/**
 * 关闭Loading
 * @param instance loading实例
 */
let endLoading = (instance, str) => {
	if (!instance) {
		return;
	}
	if (str == 'all') {
		instance.close()
	} else {
		instance.$el && instance.$el.removeEventListener("click", stopEvent)
		instance.close()
	}
}


export default {
	install: function (Vue) {
		Vue.prototype.$request = function (url, config) {
			config.timeout = 1000 * 60 * 10
			// 请求默认配置
			config = config || {};
			config.headers = config.headers || {};
			// 自主招生的请求分开
			let routeArr = [
				'register',
				'application',
				'StudentSelfAdmissionLogin',
				'StudentSelfAdmissionHome',
				'PayCost',
				'TestInfo',
				'SelfAdmissionQuery',
				'Audit'
			]
			let appName = '/SWE'
			if(!routeArr.includes(this.$route.name)){
				appName = '/SW';
			}
			if (process.env.NODE_ENV === 'production') {
				// appName = this.GLOBAL.BASE_URL;//'/' + process.argv.splice(2)[2];
				appName = '/' + this.$el.baseURI.split('/')[3];
			}
			config.url = appName + url;
			// 加载数据时，在指定元素上显示loading 状态
			let loadingInstance = startLoading(config.loadingEl, this);
			if (!!~config.url.indexOf('/FileItemApi/FileUpLoad')) {
				config.headers = {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			}
			// config.data = JSON.stringify(config.data);
			// config.headers = {
			// 	'Content-Type': 'application/json;charset=UTF-8'
			// }
			return axios.request(config).then((response) => {
				console.log(response)
				// 完成加载后，关闭loading 状态
				endLoading(loadingInstance, config.loadingEl)
				return parseStatusCode(this,response,response.status);
			}).catch((response) => {
				// 完成加载后，关闭loading 状态
				endLoading(loadingInstance);
				// 根据响应的状态码返回不同消息
				return parseStatusCode(this,response,response.status);
			})
		}
		Vue.prototype.$get = function (url, config) {
			config = Object.assign({}, config, {
				method: 'get'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$post = function (url, config) {
			config = Object.assign({}, config, {
				method: 'post'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$put = function (url, config) {
			config = Object.assign({}, config, {
				method: 'put'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$delete = function (url, config) {
			config = Object.assign({}, config, {
				method: 'delete'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$all = function (requestInfos) {
			if (!Array.isArray(requestInfos)) {
				requestInfos = [requestInfos]
			}
			return Promise.all(requestInfos.map(requestInfo => {
					if ($utils.is(String, requestInfo)) {
						requestInfo = [requestInfo]
					}
					const config = Object.assign({}, {
						method: 'get'
					}, requestInfo[1])
					const url = requestInfo[0]

					return this.$request(url, config, true)
				}))
				.then(responses => {
					return responses
				})
				.catch((response) => {
					if (response.response.status === 401) {
						this.$router.push({
							name: 'login'
						})
					} else {
						// this.$message.error(response.response.data.message)
					}
				})
		}
	}
}
