<script>
  import moment from 'moment'
  import validator from '@/lib/validator'

  export default {
    name: 'mixin-common',
    computed: {
      // 登录个人信息
      USER_INFO() {
        return this.$store.getters.USER_INFO
      },
      // 菜单
      MENU_DATA() {
        return this.$store.getters.MENU_DATA
      },
      // 侧边栏信息
      CURRENT_MENU_MATE() {
        return this.$store.getters.CURRENT_MENU_MATE
      }
    },
    data() {
      return {
        // 当前用户角色, 配合 vuex USER_INFO 使用
        ZHLX: {
          1: 'Admin',
          2: 'Student',
          3: 'Teacher'
        },
        // 全局字典
        globalDict: {
          // 操作符 PagingParam.PropertyParams.Operation
          operation: {
            'Contains': 0,              // 包含
            'StartsWith': 1,            // 开始于
            'EndsWith': 2,               // 结束于
            'Equal': 3,                 // 等于
            'NotEqual': 4,              // 不等于
            'GreaterThan': 5,           // 大于
            'GreaterThanOrEqual': 6,    // 大于等于
            'LessThan': 7,              // 小于
            'LessThanOrEqual': 8,       // 小于等于
            'In': 9,                    // 在集合中
            'IsNull': 10,               // 空
          },
          // 逻辑 PagingParam.PropertyParams.Logic
          logic: {
            'And': 0,                   // 并且
            'Or': 1                     // 或者
          },
          // 动作 __permission.Operation
          action: {
            'Select': 0,                // 查询
            'Add': 1,                   // 添加
            'Update': 2,                // 修改
            'Delete': 3,                // 删除
            'Audit': 4,                 // 审核
            'Print': 5,                 // 导出
          },
          // 日志类型 __log.Logtype
          logType: {
            'Unknown': 0,               // 未知
            'Login': 1,                 // 登录
            'Create': 2,                // 添加
            'Update': 3,                // 修改
            'Delete': 4,                // 删除
            'Audit': 5,                 // 审核
          }
        },
        // 请求模板, 仅clone使用, 不要直接赋值
        PagingParam: {
          "IsPaging": true,            // 是否分页
          "Offset": 0,                 // 跳过
          "Limit": 50,                 // 行数
          "Orders": {                  // 排序属性
            "PropertyParams": [
              // {
              //   "Field" : "",        // 字段
              //   "IsDesc" : true      // true = 倒序, false = 正序
              // }
            ]
          },
          "Searchs": {                 // 模糊查询  表格右上方的查询
            "PropertyParams": [
              // {
              //   "Field" : "",        // 字段
              //   "Value" : "",        // 值
              //   "Operation" : 0,     // 操作
              //   "Logic" : 0          // 逻辑
              // }
            ]
          },
          "Conditions": {               //  过滤属性 表格顶部正常的检索条件
            "PropertyParams": [
              // {
              //   "Field" : "",          // 字段
              //   "Value" : false,       // 值
              //   "Operation" : 0,       // 操作
              //   "Logic" : 1            // 逻辑
              // }
            ]
          }
        },
        // @特殊处理, 针对全局请求的分页需要(穿梭框)
        publicQueryLimit: 200,
      }
    },
    methods: {
      // ----------------------------------  搜索相关
      // 设置搜索按钮 left值
      setFormWidth(formWidth) {
        this.searchButtonLeft = formWidth;
      },
      // ----------------------------------- 兼容老版本

      // 获取头部搜索部分的下拉框 && 按钮权限
      getPermission(url, id, form, rules) {
        let _param = {
          param: {},
          __permission: {
            MenuID: id,     //  导航id
            Operation: 0    //  操作类型
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
      },
      // 获取头部搜索部分的下拉框 && 按钮权限
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
      }
    },
    mounted() {
    }
  }
</script>
