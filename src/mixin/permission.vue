<script>
/**
 * 控制页面权限相关
 */
export default {
  name: "mixin-permission",
  computed: {
    // 菜单
    MENU_DATA() {
      return this.$store.getters.MENU_DATA;
    }
  },
  data() {
    return {
      // 页面相关信息
      pageMeta: {
        prefix: "", // 权限控制请求url前缀
        suffix: "Api/InitPageData", // 权限控制请求url后缀
        id: "", // 页面id
        title: "", // 页面中文名
        name: "", // 页面key
        path: "", // 页面路径
        // 行为 | 动作,
        // 规范 __permission.Operation & __log.Logtype
        action: {
          select: {
            permission: { code: 0, name: "Select", text: "查询" },
            log: { code: 6, name: "Select", text: "查询" }
          },
          add: {
            permission: { code: 1, name: "Add", text: "添加" },
            log: { code: 2, name: "Create", text: "添加" }
          },
          update: {
            permission: { code: 2, name: "Update", text: "修改" },
            log: { code: 3, name: "Update", text: "修改" }
          },
          delete: {
            permission: { code: 3, name: "Delete", text: "删除" },
            log: { code: 4, name: "Delete", text: "删除" }
          },
          audit: {
            permission: { code: 4, name: "Audit", text: "审核" },
            log: { code: 5, name: "Audit", text: "审核" }
          },
          export: {
            permission: { code: 5, name: "Print", text: "导出" },
            log: { code: 7, name: "Print", text: "导出" }
          },
          import: {
            permission: { code: 6, name: "Import", text: "导入" },
            log: { code: 8, name: "Import", text: "导入" }
          },
          login: {
            permission: { code: 7, name: "Login", text: "登录" },
            log: { code: 1, name: "Login", text: "登录" }
          }
        }
      },
      permissionReady: null, // 具体的页面 可以在 mounted 中使用 await this.permissionReady; 等待权限和pageData 加载完成。
      // 页面初始信息
      initPageData: {
        // 数据字典, 没有级联关系, 供页面所有下拉列表使用(查询|新增|编辑)
        Codes: [
          {
            /* 其他字段暂不使用 */
            ZDHY: "", // 代码含义, 请求字段 & 显示字段
            ZDMC: "" // 代码名称, 通过这个字段来区分不同的下拉框
          }
        ],
        // 数据字典, 有级联关系, 供页面所有下拉列表使用(查询|新增|编辑)
        SubCodes: [
          {
            /* 其他字段暂不使用 */
            ZDHY: "", // 代码含义, 请求字段 & 显示字段
            ZDMC: "", // 代码名称, 通过这个字段来区分不同的下拉框
            childrens: [
              {
                /* 其他字段暂不使用 */
                ZDHY: "", // 代码含义, 请求字段 & 显示字段
                ZDMC: "" // 代码名称, 通过这个字段来区分不同的下拉框
              }
            ]
          }
        ],
        // 页面权限
        PermissionResult: {
          IsSelect: true, // 查询权限
          IsAdd: true, // 添加权限
          IsUpdate: true, // 修改权限
          IsDelete: true, // 删除权限
          IsAudit: true, // 审核权限
          IsPrint: true // 导出权限
        },
        Signs: [
          //标签信息
          {
            ID: "", //主键
            BQLX: "", //标签类型
            BQBH: "", //标签编号
            BQMC: "" //标签名称
          }
        ],

        // 预留
        ID: null,
        Dto: null,
        Dtos: null,
        PagingResult: null,
        OperationResult: null
      },
      Signs: [],
      Codes: {},
      SubCodes: {}
    };
  },
  methods: {
    // 权限控制 按钮的显示与隐藏
    permission(...args) {
      if(!this.initPageData.PermissionResult){
        return false
      }
       for (let d of args) {
         // 转换单词
         let name = this.pageMeta.action[d].permission.name;
         // 首字母大写
        name = name[0].toUpperCase() + name.substr(1);
        if (this.initPageData.PermissionResult["Is" + name]) {
           return true;
         }
       }
      // return true
    },
    // 获取当前页面相关信息
    _setPageMeta() {
      let route = this.$route;
      this.pageMeta.name = route.name;
      this.pageMeta.path = route.fullPath.replace(
        /^\/main/,
        this.pageMeta.prefix
      );
      this.pageMeta.title = route.meta.title;
      this.pageMeta.id =
        route.name == "WorkFlowTask"
          ? new Date().getTime()
          : this._getPageMetaId(this.MENU_DATA, route.name);
    },
    // 递归寻找页面唯一id
    _getPageMetaId(arr, name) {
     for (let d of arr) {
        if (d.name === name) {
          return d.id;
        }
        if (d.items) {
          let id = this._getPageMetaId(d.items, name);
          if (id) {
            return id;
          }
        }
      }
    },
    // 请求获取初始化数据
    _requestPageMeta() {
      // 请求
      return this.$post(this.pageMeta.path + this.pageMeta.suffix, {
        action: "select",
        data: {}
      }).catch(err => {});
    },
    // 处理下拉菜单
    handleCodes() {
      ((this.initPageData && this.initPageData.Codes) || []).forEach(code => {
        // 代码名称, 通过这个字段来区分不同的下拉框
        this.Codes[code.ZDMC] = this.Codes[code.ZDMC] || [];
        this.Codes[code.ZDMC].push(code);
      });
    },
    // 处理有级联关系的下拉菜单
    handleSubCodes() {
      ((this.initPageData && this.initPageData.SubCodes) || []).forEach(
        subCode => {
          // 代码名称, 通过这个字段来区分不同的下拉框
          this.SubCodes[subCode.ZDMC] = this.SubCodes[subCode.ZDMC] || [];
          this.SubCodes[subCode.ZDMC].push(subCode);
        }
      );
    },
    // 处理标签信息
    handleSigns() {
      ((this.initPageData && this.initPageData.Signs) || []).forEach(signs => {
        this.Signs.push(signs);
      });
    }
  },
  async mounted() {
    if (localStorage["Jump"]) {
      let data = JSON.parse(localStorage["Jump"]);
      this.initPageData = data.permission;
      this.handleCodes();
      return;
    }
    this._setPageMeta();
    const metaRequest = this._requestPageMeta();
    this.permissionReady = metaRequest;
    let initPageData = await metaRequest;
    this.initPageData = initPageData ? initPageData : {}
    // @特殊处理, 页面初始的下拉菜单
    this.handleCodes();
    // @特殊处理, 页面初始有级联关系的下拉菜单
    this.handleSubCodes();
    // @特殊处理，对初始化页面时,标签信息对象数组
    this.handleSigns();
  }
};
</script>
