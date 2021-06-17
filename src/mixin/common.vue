<template>
  <div class="mixin-common">
  </div>
</template>

<script>
  // import validator from './validator.js'
  import {mapGetters} from 'vuex'

  export default {
    name: 'mixin-common',
    // mixins:[validator],
    data() {
      let $_diguiCommon = 0

      return {
        // 按钮权限
        permission: {},
        // 该页面的id
        idCommon: '',
        // 查询下拉列表
        diguiCommon: $_diguiCommon,

      }
    },
    computed: {
      ...mapGetters([
        'MENU_DATA'
      ]),
      ROUTE_LIST() {
        return this.$router.currentRoute.matched
      }
    },
    methods: {
      // ----------------------------------  搜索相关
      // 设置搜索按钮 left值
      setFormWidth(formWidth) {
        this.searchButtonLeft = formWidth;
      },
      // ----------------------------------- 兼容老版本
      // 获取初始化的Operation字段
      getInitOperationTypeCommon(type) {
        if (type === 'Contains') {
          return 0
        } else if (type === 'StartsWith') {
          return 1
        } else if (type === 'EndsWith') {
          return 2
        } else if (type === 'Equal') {
          return 3
        } else if (type === 'NotEqual') {
          return 4
        } else if (type === 'GreaterThan') {
          return 5
        } else if (type === 'GreaterThanOrEqual') {
          return 6
        } else if (type === 'LessThan') {
          return 7
        } else if (type === 'LessThanOrEqual') {
          return 8
        } else if (type === 'In') {
          return 9
        } else if (type === 'IsNull') {
          return 10
        }
      },
      // 获取初始化的Logic字段
      getInitLogicTypeCommon(type) {
        if (type === 'And') {
          return 0
        } else if (type === 'Or') {
          return 1
        }
      },
      // 获取操作的Operation字段
      getCzOperationTypeCommon(type) {
        if (type === 'Select') {
          return 0
        } else if (type === 'Add') {
          return 1
        } else if (type === 'Update') {
          return 2
        } else if (type === 'Delete') {
          return 3
        } else if (type === 'Audit') { // 审核
          return 4
        } else if (type === 'Print') { // 导出
          return 5
        }
      },

      // 获取操作的Logtype字段
      getCzLogtypeTypeCommon(type) {
        if (type === 'Unknown') {  // 未知
          return 0
        } else if (type === 'Login') { // 登录
          return 1
        } else if (type === 'Create') {  // 添加
          return 2
        } else if (type === 'Update') {
          return 3
        } else if (type === 'Delete') {
          return 4
        } else if (type === 'Audit') { // 审核
          return 5
        }
      },

      // 获取头部搜索部分的下拉框 && 按钮权限
      getPermission(url, id, form, rules) {
        let _param = {
          param: {},
          __permission: {
            MenuID: id, //导航id
            Operation: 0 //操作类型
          },
        }
        this.$post(url, {data: _param}).then(data => {
          if (rules) {
            let selectList = data.Codes
            this.getSelectListCommon(selectList, form, rules)

          }

          // 按钮权限
          this.permission = data.PermissionResult
        })
      }, // 获取头部搜索部分的下拉框 && 按钮权限
      getsubCodePermission(url, id, form, rules) {
        let _param = {
          param: {},
          __permission: {
            MenuID: id, //导航id
            Operation: 0 //操作类型
          },
        }

        this.$post(url, {data: _param}).then(data => {
          if (rules) {
            let selectList = data.SubCodes
            this.getSelectListCommon(selectList, form, rules)

          }

          // 按钮权限
          this.permission = data.PermissionResult
        })
      },
      // 获取头部搜索部分的下拉框 && 按钮权限
      getCodesAndSubCodes(url, id, form, rules) {
        let _param = {
          param: {},
          __permission: {
            MenuID: id, //导航id
            Operation: 0 //操作类型
          },
        }
        this.$post(url, {data: _param}).then(data => {
          if (rules) {
            let selectList = data.Codes
            if (data.SubCodes.length > 0) {
              for (var i = 0; i < data.SubCodes.length; i++) {
                selectList.push(data.SubCodes[i])
              }
            }
            this.getSelectListCommon(selectList, form, rules)

          }

          // 按钮权限
          this.permission = data.PermissionResult
        })
      },

      // 搜索部分，下拉框数据删选公共方法
      getSelectListCommon(data, form, rules) {
        for (let i = 0; i < rules.length; i++) {
          let array = new Array();
          for (let second = 0; second < data.length; second++) {
            if (rules[i] === data[second].ZDMC) {
              array.push(data[second])
            }
          }
          //	console.log("array===== ",JSON.stringify(array));
          form['unitList' + i] = array
        }

      },

      // 获取permissionId
      getPermissionIdCommon(menuData, routeList) {
        let _list = new Array()
        let _id = ''
        for (let item of routeList) {
          if (item.name !== 'main') {
            _list.push(item.name)
          }
        }
        _id = this.getDiduiIdCommon(menuData, _list)

        return _id
      },

      // 递归menuData 获取id
      getDiduiIdCommon(menuData, list) {
        let _list = JSON.parse(JSON.stringify(list))
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < menuData.length; j++) {
            if (list[i] === menuData[j].name) {
              if (menuData[j].items.length > 0) {
                _list.shift()

                return this.getDiduiIdCommon(menuData[j].items, _list)
              } else {
                return menuData[i].id
              }
            }
          }

        }

      },

      // 获取操作类型的请求参数 (增、删、改)
      getOperationParmCommon(param, menuID, operationType, logtype) {
        let _param = {
          param: param,

          __permission: {
            MenuID: menuID, //导航id
            Operation: operationType //操作类型
          },
          __log: {
            MenuID: menuID,
            Logtype: logtype, //日志类型
            Context: ''
          }
        }
        return _param
      },
      // 获取请求参数
      getParamCommon(Permission, IsPaging, Offset, Limit, Orders, Conditions, Searchs) {
        // Permission结构是这样的，是必填的！
        //{
        // 		"MenuID" : "",        //导航id
        // 		"Operation" : 0      //操作类型
        // }

        if (!Permission) {
          return false
        }
        let _IsPaging = IsPaging ? IsPaging : true;
        let _Offset = Offset ? Offset : 0 // 页数
        let _Limit = Limit ? Limit : 50 // 页面展示条数
        let _Orders = Orders
          ? Orders
          : [
            // {
            // 	Field: 'ID', //字段
            // 	IsDesc: true //倒序
            // }
          ]
        let _Conditions = Conditions  // 过滤
          ? Conditions
          : [
            // {
            // 	Field: '', //字段
            // 	Value: '', //值
            // 	Operation: 0, //操作
            // 	Logic: 1 //逻辑
            // }
          ]
        let _Searchs = Searchs   // 搜索
          ? Searchs
          : [
            // {
            // 	Field: '', //字段
            // 	Value: '', //值
            // 	Operation: 0, //操作
            // 	Logic: 0 //逻辑
            // }
          ]


        let _params =
          {
            param: {
              PagingParam: {
                IsPaging: _IsPaging, //是否分页
                Offset: _Offset, //跳过
                Limit: _Limit, //行数
                Orders: {
                  //排序属性
                  PropertyParams: _Orders
                },
                Searchs: {
                  //搜索属性
                  PropertyParams: _Searchs
                },
                Conditions: {
                  //过滤属性1
                  PropertyParams: _Conditions
                }
              }
            },
            __permission: Permission
          }
        return _params
      },
      dblclick(row) {
        //利用handleSelectionChange添加双击row到 this.multipleSelection 中
        this.handleSelectionChange([row])
        //选中该行的checkbox
        this.$refs.tableData.toggleRowSelection(row)
        //触发update
        this.editConfirm('update', row)
      },

      // 导出
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },
      /**
       * 年月字段类型date转String
       * @author djf
       * @Date 2019年4月18日20:19:44
       * @param date
       * @returns {*|string}
       */
      getYearByDateCommon(date) {
        const moment = require("moment")
        let _year = moment(date).format("YYYY年MM月")
        return _year
      },
      /**
       * 月日字段类型date转String
       * @author djf
       * @Date 2019年4月18日20:19:44
       * @param date
       * @returns {*|string}
       */
      getMonthByDateCommon(date) {
        const moment = require("moment")
        let _month = moment(date).format("MM月DD日")
        return _month
      },
      getNFByDateCommon(date) {
        const moment = require("moment")
        let _nf = moment(date).format("YYYY年")

        return _nf.slice(0, 4)
      },

    },
    mounted() {

    }
  }
</script>

<style>
  .mixin-common {
  }
</style>
