<script>
  /**
   * 控制表格类页面增删改查
   */
   export default {
    name: "mixin-table",
    watch: {},
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
    data() {
      return {
        numH :  0,
        PagingParam: {
          "IsPaging": true, 
          "Offset": 0,
          "Limit": 50,
          "Orders": {
            "PropertyParams": []
          },
          "Searchs": {
            "PropertyParams": []
          },
          "Conditions": {
            "PropertyParams": []
           }
        },
        // 按钮禁用状态
        deleteBatchBtnDisabled: true, // 批量删除
        updateBatchBtnDisabled: true, // 批量更新
        // 新增 & 修改
        editDialogVisible: false, // 修改弹出框显示
        editDialogType: "", // 修改弹出框类型
        editDialogDisplayTitle: "", // 修改弹出框的标题
        editDialogDisplay: {
          // 修改弹出框的标题映射
          add: "新增",
          update: "修改"
        },
        editFormDefault: {}, // 针对重置按钮的预留
        editForm: {}, // 新增 & 编辑 表单
        editFormRules: {}, // 新增 & 编辑 验证
        // 富文本编辑器
        editorDialogVisible: false, // 富文本编辑器弹出框显示
        editorDialogDisplayTitle: "详情", // 富文本编辑器弹出框的标题
        editorBtnLoading: false, // 富文本编辑器 提交按钮loading
        editorForm: {
          // 富文本编辑器 表单
          id: "",
          content: ""
        },
        editorOptions: {
          // 富文本编辑器 配置
          placeholder: "在此处插入文本…"
        },
        // 过滤条件
        searchForm: {}, // 表格头部搜索条件
        // 模糊查询
        fuzzyQueryValue: "", // 表格右上角模糊查询
        // 拼接的模板条件
        tablePagingParam: {}, // 复制 PagingParam
        // 表格
        tableData: [],
        total: 0,
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        currentPage: 1,
        multipleSelection: [], // 表格选中项
        showColumnDisable: false, // 显示全部数据
        currentCallBackFunction: null, // 记录页面中传过来的回调函数, 用于在翻页、新增、编辑、删除后查询使用
        classRowList: [],
        moreData: [],
        loadMoreDataSign: true,
        searchData:{},
        btn:{}
      };
    },
    directives: {
      loaddata: {
        // 指令的定义   v-loaddata="loadmoredata"
        bind(el, binding) {
          const selectWrap = el.querySelector(".el-table__body-wrapper");
          selectWrap.addEventListener("scroll", function () {
            const sign = 100;
            const scrollDistance =
            this.scrollHeight - this.scrollTop - this.clientHeight;
            if (scrollDistance <= sign || scrollDistance == 0) {
              binding.value("str");
            }
          });
        }
      }
    },
    methods: {
      loadmoredata() {
        if (!this.loadMoreDataSign || this.moreData.length == 0) {
          return;
        }
        if (this.pageSize > 50) {
          if (this.moreData.length > 50) {
            let i = 0;
            let obj;
            while (i < 50) {
              obj = this.moreData.shift();
              this.tableData.push(obj);
              i++;
            }
          } else {
            this.tableData = this.tableData.concat(this.moreData);
            this.moreData = [];
          }
        }
        let that = this;
        setTimeout(() => {
          that.loadMoreDataSign = true;
        }, 100);
      },
      selectAllTableData() {
        this.multipleSelection = this.tableData.concat(this.moreData);
      },
      // 自动根据页面中 的$refs.searchElement 生成 Conditions
      generateSearchConditions(conditions, component) {
        if (component.$children) {
          component.$children.forEach(child => {
            this.generateSearchConditions(conditions, child);
          });
        }
        if (component.$attrs["search-field"]) {
          const value = component.value;
          if ([null, undefined, ""].includes(value)) {
            return;
          }
          conditions.push({
            Field: component.$attrs["search-field"],
            Operation: component.$attrs["search-operation"] || "Equal", // 3 === Equal
            Logic: component.$attrs["search-logic"] || "And", // 0 === And
            Value: component.value
          });
        }
      },
      // 组装 表格的请求参数
      _getTableParams(isPaging,params) {
        // 是否分页
        this.tablePagingParam.IsPaging = isPaging;
        // 分页
        this.tablePagingParam.Offset = (this.currentPage - 1) * this.pageSize;
        this.tablePagingParam.Limit = this.pageSize;
        // 排序
        this.tablePagingParam.Orders.PropertyParams = this.selectConfig.table.order;
        // 过滤条件
        this.tablePagingParam.Conditions.PropertyParams = this._handleConditions();
        // 模糊查询
        this.tablePagingParam.Searchs.PropertyParams = this._handleFuzzyQueryValue();
        if(params){
          let data = { PagingParam: this.tablePagingParam }
          let arr = Object.keys(params)
          arr.forEach(item=>{
            data[item] = params[item]
          })
          return data;
        }else{
          return { PagingParam: this.tablePagingParam };
        }
      },
      // 设置分页
      setIsPaging(isPaging) {
        if (typeof isPaging === "boolean") {
          this.tablePagingParam.IsPaging = isPaging;
        }
        return this;
      },
      // 设置查询条件
      setWhere(...args) {
        return this;
      },
      // 获取列表
      async requestList(ck, params) {
        this.searchData.pageNum = this.currentPage
        this.searchData.pageCnt = this.pageSize
        this.searchData.showColumnDisable = this.showColumnDisable
        await this.$nextTick(); // conditions 的组装有时需要等待组件绘制完成。
        this.$post(this.requestSuffix.select, {
          loadingEl: this.$refs.tableElement,
          data:this.searchData
        })
        .then(data => {
          this.tableData = [];
          if(data.list){
            this.tableData = data.list
          }else{
            this.tableData = data.dtoList
          }
          this.total = data.allCnt;
          ck && ck();
          this.getAppTreeData && this.getAppTreeData()

           if (!this.currentCallBackFunction) {
            this.currentCallBackFunction = ck;
          } else {
            this.currentCallBackFunction();
          }
        }).catch(err=>{console.log(err);});
      },
      // 获取详情
      detailEditForm(config, ck) {
        // let url = this.requestSuffix.select;
        // let param = {
        //   Id: this.multipleSelection[0].bdbjxxId
        // };
        // this.$post(url, {
        //   loadingEl: null,
        //   action: "select",
        //   data: param
        // })
        // .then(data => {
        //   ck && ck(data);
        //   this.editForm = data
        // })
        // .catch(err => {});
      },
      /**
       * 新增 & 修改 打开
       * @param type 请求类型 update add
       * @param config: {}, 参数说明:
       *                row: 指定数据行, scope.row, //  必填, 必须传递
       *                url: 请求地址, 默认值 this.requestSuffix.detail 进行拼接, 默认不填写, 用于特殊情况覆盖
       *                param: 请求参数, 默认值 {'Id', scope.row.id}, 默认不填写, 用于特殊情况覆盖
       *                title: 标题, 默认值 this.pageMeta.title, 默认不填写, 用于特殊情况覆盖
       */
       openEditForm(type) {
        this.editForm={}
        console.log(type);
        
        this.editDialogType = type;
        // // 设置弹出框标题
        this.editDialogDisplayTitle = this.editDialogDisplay[type] + this.$route.meta.title;
        if (type === "update") {
          if (this.multipleSelection.length !== 1) {
            this.$message({
              message: "请选择数据，有且只能选择一条",
              type: "warning"
            });
            return;
          }
          console.log(this.multipleSelection[0]);
          this.editForm = this.multipleSelection[0]
          // 获取详情
          // this.detailEditForm(config, () => {
          //   // 设置表单数据
          //   this.setOpenEditForm();
          // });
        } else {
          // @特殊处理, 编辑后的新增有遗留验证
          this.$nextTick(_ => {
            let editForm = this.$refs["editForm"];
            editForm && editForm.clearValidate && editForm.clearValidate();
            // @特殊处理 钩子函数
            this.setOpenAddFormHook && this.setOpenAddFormHook();
          });
        }
        // 控制弹出框显示
        this.editDialogVisible = true;
      },
      // 新增 提交
      async addEditForm(param, comeparam) {
        return this.$post(this.requestSuffix.add, {
          loadingEl: "all",
          action: "add",
          data: param
        })
        .then(data => {
          if(data.succsess){
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.resetEditForm();
            this.requestList(undefined, comeparam);
            }else{
              this.$message({message: data.jsonMsg, type: "error"});
            }
        })
        .catch(err => {
            this.$message({message: "操作失败", type: "error"});
          });
      },
      // 编辑 提交
      async updateEditForm(param, comeparam) {
        console.log(this.editForm);
        return this.$post(this.requestSuffix.update, {
          loadingEl: "all",
          action: "update",
          data: param
        })
        .then(data => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.resetEditForm();
          this.requestList(undefined, comeparam);
        })
        .catch(err => {
            this.$message({message: "操作失败", type: "error"});
          });
      },
      // 新增 & 修改 表单重置
      resetEditForm() {
        // 关掉dialog
        this.editDialogVisible = false;
        // 递归清空
        let clear = (obj, field) => {
          // 取得对象
          let val = field ? obj[field] : obj;
          // 判断类型
          if (Array.isArray(val)) {
            field ? (obj[field] = []) : (obj = []);
          } else if (typeof val === "object") {
            for (let f in val) {
              if (val.hasOwnProperty(f)) {
                if (Array.isArray(val[f])) {
                  clear(val, f);
                } else if (typeof val[f] === "object") {
                  clear(val[f]);
                } else {
                  clear(obj, f);
                }
              }
            }
          } else {
            obj[field] = undefined;
          }
        };
        // 重置, 各个页面情况不同, 不能clear
        // clear(this.editForm)

        // 勾选去掉
        if (this.multipleSelection && this.multipleSelection.length > 0) {
          this.$refs.tableElement &&
          this.$refs.tableElement.toggleRowSelection(this.multipleSelection[0]);
        }
        let editForm = this.$refs.editForm;
        if (editForm) {
          editForm.clearValidate();
          editForm.resetFields();
        }
      },
      // 删除确认框
      deleteConfirm(idField, params) {
        idField = idField || "ID";
        if (this.multipleSelection.length <= 0) {
          this.$message({
            showClose: true,
            message: "请先选择一条信息",
            type: "warning"
          });
          return;
        }
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
            // 删除
            let ids = this.multipleSelection.map(d => d[idField])
            this.del(ids, params);
          })
        .catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
      },
      // 删除
      del(ids, params) {
        this.$post(this.requestSuffix.delete, {
          action: "delete",
          loadingEl: "all",
          data: {
            ids: ids.join()
          }
        })
        .then(data => {
          if (data.succsess) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.requestList(undefined, params);
          } else {
              // 失败
              // let msg = `总共： ${data.OperationResult.OpTotalNum} 条，`;
              // msg += `成功： ${data.OperationResult.OpSuccessNum} 条，`;
              // msg += `失败： ${data.OperationResult.OpFailNum} 条，`;
              // msg += `失败原因：${data.OperationResult.OpMessage}`;
              this.$message({
                showClose: true,
                message: '删除失败',
                type: "error"
              });
              // if (data.OperationResult.OpSuccessNum > 0) {
              //   this.requestList(undefined, params);
              // }
            }
            //  @特殊处理 删除结束钩子函数
            this.setOpenDeleteFormHook && this.setOpenDeleteFormHook();
          })
        .catch(err => {});
      },
      // 富文本编辑器 失去焦点事件
      onEditorBlur(evt) {},
      // 富文本编辑器 获得焦点事件
      onEditorFocus(evt) {},
      // 富文本编辑器 内容改变事件
      onEditorChange(evt) {},
      // 拉取详情 富文本编辑器
      detailEditor(param, fieldId, fieldContent) {
        this.$post(
          this.pageMeta.path +
          (this.requestSuffix.detailEditor || this.requestSuffix.detail), {
            loadingEl: this.$refs.editorContainer,
            action: "select",
            data: param
          }
          ).then(data => {
            this.editorDialogVisible = true;
            this.editorForm.id = data[fieldId || "ID"];
            this.editorForm.content = data[fieldContent || "JJ"];
          });
        },
      // 保存 富文本编辑器
      updateEditor(fieldId, fieldContent) {
        let editorForm = JSON.parse(JSON.stringify(this.editorForm));
        let data = {
          Dto: {}
        };
        data.Dto[fieldId || "ID"] = editorForm.id;
        data.Dto[fieldContent || "JJ"] = editorForm.content;
        this.$post(this.pageMeta.path + this.requestSuffix.editor, {
          loadingEl: this.$refs.btnEditorFormSave,
          action: "update",
          data: data
        })
        .then(data => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.resetEditor();
            // this.requestList();
          })
        .catch(err => {
            // this.$message({message: "操作失败", type: "error"});
          });
      },
      // 重置 富文本编辑器
      resetEditor() {
        // 关掉dialog
        this.editorDialogVisible = false;
        // 重置
        this.editorForm = {
          id: "",
          content: ""
        };
      },
      // 修改分页数量
      handleSizeChange(val, params) {
        this.currentPage = 1;
        this.pageSize = val;
        this.requestList(undefined, params);
      },
      // 切换分页
      handleCurrentChange(val, params) {
        this.currentPage = val;
        this.requestList(undefined, params);
      },
      // 勾选选中项
      handleSelectionChange(arr) {
        // 全部选择 this.$refs.multipleTable.data.length === all.length
        this.multipleSelection = arr;
        // 按钮禁用状态
        if (arr.length == 1) {
          this.deleteBatchBtnDisabled = false;
          this.updateBatchBtnDisabled = false;
        } else if(arr.length > 1){
          this.deleteBatchBtnDisabled = false;
          this.updateBatchBtnDisabled = true;
        }else {
          this.deleteBatchBtnDisabled = true;
          this.updateBatchBtnDisabled = true;
        }
      },
      // 自定义表头U绘制（实现多列排序）
      renderHeader(
        h, {
          column,
          store: {
            states,
            table
          }
        }
        ) {
        const currentOrder =
        this.selectConfig.table.order.find(
          order => order.Field === column.property
          ) || {};
        const index = this.selectConfig.table.order.indexOf(currentOrder);
        return h(
          "span", 
          [
          column.label,
          h(
            "span", {
              class: {
                "caret-wrapper": true,
                ascending: currentOrder.IsDesc === false,
                descending: currentOrder.IsDesc === true
                  // ascending: index === 0 && currentOrder.IsDesc === false,
                  // descending: index === 0 && currentOrder.IsDesc === true,
                  // "ascending-2": index > 0 && currentOrder.IsDesc === false,
                  // "descending-2": index > 0 && currentOrder.IsDesc === true
                },
                 on: {
              click: () => this.handleSortChange(column)
            }
              },
              [
              h("i", {
                class: {
                  "sort-caret": true, ascending: true
                }
              }),
              h("i", {
                class: {
                  "sort-caret": true, descending: true
                }
              })
              ]
              ),
          h("br", {
              }),
          column.label == "禁用" ? 
          h(
            "input", {
              class: {
                "column-search": true
              },
              style: {
                // width: column.minWidth ? column.minWidth - 30 + 'px' : column.width - 30 + 'px',
                width:"90%",
                height:'18px',
              },
              // disabled:true
              domProps:{
                disabled:true
              }
            }
          ):h(
            "input", {
              on: {
                keydown: (e) => this.columnSearch(e, column),
                blur:(e)=> this.handleDto(e,column)
              },
              class: {
                "column-search": true
              },
              style: {
                // width: column.minWidth ? column.minWidth - 30 + 'px' : column.width - 30 + 'px',
                width:"90%",
                height:'18px',
                fontSize:'10px',
                textIndent:'10px',
                color:"#898989"
              }
            }
          )
          ]
          );
      },
      columnSearch(e, column) {
        if (event.keyCode == 13) {
          if(event.target.value == ""){
            this.requestList()
          }
          let arr = Object.keys(this.tableData[0])
          arr.forEach(item=>{
            this.searchData[item] = this.searchData[item] ? this.searchData[item] :''
          })
          this.searchData[column.property] = e.target.value
          this.requestList()

        }
      },
      handleDto(e, column){
        this.searchData[column.property] = e.target.value
      },
      makeParam(v, arr) {
        if (arr.length > 1) {
          return this.makeParam(v[arr[0]], arr.filter((e, index) => {
            return index != 0
          }))
        } else {
          return v[arr[0]]
        }
      },
      // 恢复默认排序
      resetOrder() {
        // 当没有排序字段的时候，会恢复默认的排序字段
        this._tableFirstOrder = 0;
        this.selectConfig.table.order = JSON.parse(
          JSON.stringify(this._tableDefaultOrder)
          );
        if (this.requestOrderList) {
          this.requestOrderList()
        } else {
          this.requestList();
        }
      },
      // 排序
      handleSortChange({
        property
      }) {
        /*
            名称: 多列排序
            功能: 利用表格排序的 handleSortChange 钩子
                 使用 getParamCommon 函数 拼装多列排序
                 post=>json 后返回数据
            页面加载后，第一次使用多列排序，过程将创建 orders[data],结构为数组
            每一次多列查询均记录在orders内
            */
        if (property === null) {
          //钩子有时会发挥null ，容错
          return;
        }
        // @特殊处理, 兼容业务场景, 当第一次手动排序, 需要清空之前的默认查询条件, 再点击再累加
        if (this._tableFirstOrder === 0) {
          this._tableFirstOrder = 1;
          this.selectConfig.table.order = [];
        }
        // 从data中取出arr
        this.selectConfig.table.order = this.selectConfig.table.order || [];
        const arr = this.selectConfig.table.order;
        // 判断是否已有字段
        const currentOrder = arr.find(order => order.Field === property);
        // ascending  descending


        if (currentOrder) {
          if (currentOrder.IsDesc === true) {
            arr.splice(arr.indexOf(currentOrder), 1);
          } else {
            currentOrder.IsDesc = true;
          }
        } else {
          arr.push({
            Field: property,
            IsDesc: false
          }); // 默认 降序
        }
        // if (arr.length === 0) {
        //   this.resetOrder();
        // } else {
        //   if (this.requestOrderList) {
        //     this.requestOrderList()
        //   } else {
        //     this.requestList();
        //   }

        // }
        let arrParam = []
        arr.forEach(item=>{
          if(item.IsDesc){
            arrParam.push(item.Field + ' ' + 'desc')
          }else{
            arrParam.push(item.Field + ' ' + 'asc')
          }
        })
        // this.searchData
        let str = arrParam.join()
        this.searchData.order = str
        this.requestList()

      },
      // 表格 当某一行被双击时会触发该事件
      doubleClickTableRow(row) {
        if (this.permission("update")) {
          // 利用handleSelectionChange添加双击row到 this.multipleSelection 中
          this.handleSelectionChange([row]);
          // 选中该行的checkbox
          this.$refs.tableElement.toggleRowSelection(row);
          // 触发update
          this.openEditForm("update", {
            row: row
          });
        } else {
          return;
        }
      },
      // 导出
      toExport(params) {
        /**
         * 导出按钮
         * 功能:点击导出, 请求得到一个返回的json，包括filename和base64，base64需要转成二进制，给用户下载
         */
         this.$post(this.requestSuffix.export, {
          loadingEl: "all",
          action: "export",
          // data: this._getTableParams(false, params)
          data:this.searchData
        })
         .then(data => {
          let file =
          "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
          data.buffer;
          const blob = this.dataURLtoBlob(file);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = e => {
            const a = document.createElement("a");
            a.download = data.fileName+'.xls';
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        })
         .catch(err => {});
      },
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(",")
        let mime = arr[0].match(/:(.*?);/)[1]
        console.log(mime);
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
         });
      },
      // 树的查询表格
      // 获取列表
      async treeRequestList(id) {
        await this.$nextTick(); // conditions 的组装有时需要等待组件绘制完成。
        this.$post(this.requestSuffix.select, {
          loadingEl: this.$refs.tableElement,
          // action: "select",
          // data: this._getTableParams(this.tablePagingParam.IsPaging, params)
          data:{
            pid:id
          }
        })
        .then(data => {
          console.log(data);
          this.tableData = [];
          this.tableData = data.list
        }).catch(err=>{console.log(err);});
      },
      async getBtns(){
        await this.$post('/qxdj/getBtns.action',{
          loadingEl:'all',
          data:{
            dto:{
              jsId:this.USER_INFO.userId,
              mljd:this.$route.name
            }
          }
        }).then(data=>{
          if(data.dtoList != null){
            data.dtoList.forEach(item=>{
            this.$set(this.btn,[item.gnjd],true)
          })
          }
        })
      },
     },
     mounted() {
      this.getBtns()
      // if (!this.requestSuffix) {
      //   throw new Error("mixin table 的组件必须配置 requestSuffix");
      // }
      // if (!this.selectConfig || !this.selectConfig.table) {
      //   throw new Error("mixin table 的组件必须配置 selectConfig");
      // }
      // if (!this.selectConfig.table.order) {
      //   throw new Error("mixin table 的组件必须配置 selectConfig.table.order");
      // }
      // if (!this.selectConfig.table.fuzzy) {
      //   throw new Error("mixin table 的组件必须配置 selectConfig.table.fuzzy");
      // }
      // @特殊处理, 兼容业务场景, 当第一次手动排序, 需要清空之前的默认查询条件, 再点击再累加
      // this._tableFirstOrder = 0;
      // this._tableDefaultOrder = JSON.parse(
      //   JSON.stringify(this.selectConfig.table.order)
      //   );
      // this.tablePagingParam = JSON.parse(JSON.stringify(this.PagingParam));
      // this.tablePagingParam.Limit = this.pageSize;
    }
  };
</script>
<style>
/* 多字段排序 */
.el-table .ascending-2 .sort-caret.ascending {
  border-bottom-color: #b0dcfa;
}

.el-table .descending-2 .sort-caret.descending {
  border-top-color: #b0dcfa;
}

.el-table .column-search {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 25px;
}

</style>
