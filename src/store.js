import Vue from 'vue'
import Vuex from 'vuex'
import localStore from 'store' 
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  	SELFADMUSER_INFO: null, // 登录的用户个人信息
  	MENU_DATA: null, // 获取所有的菜单列表
  	CURRENT_MENU:null,
	CURRENT_MENU_MATE: null,
	SHOW_TREE:true,
    USER_INFO:null
  },
  mutations: {
  	// 自主招生登录用户信息
	SELFADMUSER_INFO(state, params) {
		localStore.set('SELFADMUSER_INFO', params);
		state.SELFADMUSER_INFO = params;
	},
  	// 总菜单
	MENU_DATA(state, params) {
		localStore.set('MENU_DATA', params);
		state.MENU_DATA = params
	},
	// 点击主菜单以后获取的侧边栏信息
	CURRENT_MENU_MATE(state, params) {
		localStore.set('CURRENT_MENU_MATE', params);
		state.CURRENT_MENU_MATE = params
	},
	//点击主菜单以后当前的主菜单信息（url）
	CURRENT_MENU(state, params) {
		localStore.set('CURRENT_MENU', params);
		state.CURRENT_MENU = params
	},
	SHOW_TREE(state,params){
		localStore.set('SHOW_TREE',params);
		state.SHOW_TREE = params
	},
    USER_INFO(state,params){
        localStore.set('USER_INFO',params);
        state.USER_INFO = params
    },

  },
  actions: {

  },
  getters: {
  	// 自主招生登录的个人信息
	SELFADMUSER_INFO: (state) => {
		return state.SELFADMUSER_INFO || localStore.get('SELFADMUSER_INFO')
	},
  	// 菜单
	MENU_DATA: (state) => {
		return state.MENU_DATA || localStore.get('MENU_DATA')
	},
	// 侧边栏信息
	CURRENT_MENU_MATE: (state) => {
		return state.CURRENT_MENU_MATE || localStore.get('CURRENT_MENU_MATE')
	},
	//一级菜单信息
	CURRENT_MENU: (state) => {
		return state.CURRENT_MENU || localStore.get('CURRENT_MENU')
	},
	SHOW_TREE:(state) => {
		return state.SHOW_TREE || localStore.get('SHOW_TREE')
	},
    USER_INFO:(state) => {
        return state.USER_INFO || localStore.get('USER_INFO')
    },
  }
})
export default store
