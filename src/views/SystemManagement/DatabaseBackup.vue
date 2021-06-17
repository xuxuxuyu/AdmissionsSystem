<template>
  <!-- 数据库备份 -->
  <div class="page-DatabaseBackup">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <!-- 查询条件 -->
          <div class="cascade-select">
            <el-form :inline="true" :model="dataBase" class="demo-form-inline">
              <el-form-item label="设置名称:">
                <el-input v-model="dataBase.setName" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="pull-right">
          <el-button
            v-if="btn.add"
            size="small"
            type="primary"
            icon="icon iconfont icon-add"
            @click="editDialogVisible=true">新增
          </el-button>
          <el-button
            size="small"
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            v-if="btn.update">修改
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="icon iconfont iconshanchu"
            v-if="btn.del">删除
          </el-button>
          <el-button
            type="primary"
            size="small"
            v-if="btn.update"
            class="app-whole app-whole-export"
            ><i class="icon iconfont">&#xe669</i>备份
          </el-button>
        </div>
      </div>
      <!-- 列表 -->
      <div class="app-page-box-table big-height">
        <el-table
          border
          stripe
          height="100%"
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          highlight-current-row>
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="szmc"
            label="设置名称"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.szmc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sjklx"
            label="数据库"
            align="center"
            min-width="80">
            <template slot-scope="scope" >
              <span v-if="scope.row.sjklx=='1'">主业务逻辑库</span>
              <span v-if="scope.row.sjklx=='2'">非主业务逻辑库</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yxms"
            label="运行模式"
            align="center"
            min-width="80">
            <template slot-scope="scope" >
              <span v-if="scope.row.yxms == '1'">手动备份</span>
              <span v-if="scope.row.yxms == '2'">自动备份</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bfwjqzmc"
            label="备份文件前缀"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.bfwjqzmc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zt"
            label="状态"
            align="center"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.zt=='1'">可用</span>
              <span v-if="scope.row.zt=='2'">不可用</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="page-pagination">
        <div class="page-show-disable">
          <el-checkbox v-model="showColumnDisable" @change="search">显示全部数据</el-checkbox>
        </div>
        <el-pagination
          :total="total"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
      <!-- 新增/修改弹框 -->
      <el-dialog class="edit-dialog" width="1300px" append-to-body @close="resetEditFormCustom()" :visible.sync="editDialogVisible" title="新增数据库备份信息">
        <el-form status-icon label-width="150px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设置名称" prop="szmc">
                <el-input clearable v-model="editForm.szmc" placeholder="请输入设置的名称"></el-input>
              </el-form-item>
              <el-form-item label="备份文件前缀名称" prop="bfwjqzmc">
                <el-input clearable v-model="editForm.bfwjqzmc" placeholder="请输入备份文件前缀名称"></el-input>
              </el-form-item>
              <el-form-item label="运行模式" prop="yxms">
                <el-select v-model="editForm.yxms" class="width-percent-100" clearable placeholder="请选择">
                  <el-option :label="item.label" :value="item.value" v-for="item in YXMSoption" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间间隔" prop="sjjg">
                <el-input clearable v-model="editForm.sjjg" placeholder="请输入事件间隔"></el-input>
              </el-form-item>
              <el-form-item label="备份存储方式" prop="bfccfs">
                <el-select v-model="editForm.bfccfs" class="width-percent-100" clearable placeholder="请选择">
                  <el-option :label="item.label" :value="item.value" v-for="item in BFCCFSoption" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据库业务类型" prop="sjklx">
                <el-select v-model="editForm.sjklx" class="width-percent-100" clearable placeholder="请选择">
                  <el-option :label="item.label" :value="item.value" v-for="item in SJKLXoption" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="zt">
                <el-select v-model="editForm.zt" class="width-percent-100" clearable placeholder="请选择">
                  <el-option :label="item.label" :value="item.value" v-for="item in ZToption" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间" prop="ksyxsj">
                <el-date-picker
                  class="width-percent-100"
                  v-model="editForm.ksyxsj"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="格式：yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="间隔类型" prop="jglx">
                <el-select v-model="editForm.jglx" class="width-percent-100" clearable placeholder="请选择">
                  <el-option :label="item.label" :value="item.value" v-for="item in JGLXoption" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备份存储路径" prop="bfcclj">
                <el-input clearable v-model="editForm.bfcclj" placeholder="请输入专利名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
             ref="btnEditFormSave"
             type="primary"
             size="medium"
             class="app-dialog-btn app-confirm"
             @click="saveEditForm">确认
          </el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible = false">关闭
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"DatabaseBackup",
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
    data(){
      return {
        requestSuffix:{
          // 'select':'/OracleDatabaseController/getList.action',
        },
        selectConfig: {
          // 表格的通用请求
          table: {
            order: [
            ],
            fuzzy: [
              // 设置名称
              {Field: "JSBH", Value: "", Operation: "Contains", Logic: "Or"}
            ],
            where: [
            ]
          }
        },
        dataBase:{
          setName:'',
        },
        tableData:[],
        editDialogVisible:false,
        editForm: {
          szmc:'',//设置名称
          bfwjqzmc:'',//备份文件前缀名称
          yxms:'',//运行模式
          sjjg:'',//时间间隔
          bfccfs:'',//备份存储方式
          sjklx:'',//数据库类型
          zt:'',//状态
          ksyxsj:'',//开始时间
          jglx:'',//间隔类型
          bfcclj:''//备份存储路径
        },
        editFormRules: {
          szmc:[{required: true, message: "设置名称必须输入"},{ min: 0, max: 40, message: '设置名称长度不能大于40个字符', trigger: 'blur' }],
          bfwjqzmc:[{required: true, message: "备份文件前缀名称"},{ min: 0, max: 40, message: '备份文件前缀名称不能大于40个字符', trigger: 'blur' }],
          yxms:[{required: true, message: "运行模式必须输入"}],
          sjjg:[{required: true, message: "时间间隔必须输入"}],
          bfccfs:[{required: true, message: "备份存储方式必须输入"}],
          sjklx:[{required: true, message: "数据库业务类型必须输入"}],
          zt:[{required: true, message: "状态必须输入"}],
          ksyxsj:[{required: true, message: "开始时间必须输入"}],
          jglx:[{required: true, message: "间隔类型必须输入"}],
          bfcclj:[{required: true, message: "备份存储路径必须输入"}],
        },
        YXMSoption:[
          {value:'1',label:'手动备份'},
          {value:'2',label:'自动备份'},
        ],
        BFCCFSoption:[
          {value:'1',label:'数据库本地存储'},
          {value:'2',label:'数据库外地存储'},
        ],
        SJKLXoption:[
          {value:'1',label:'主业务逻辑库'},
          {value:'2',label:'非主业务逻辑库'},
        ],
        ZToption:[
          {value:'1',label:'可用'},
          {value:'2',label:'不可用'},
        ],
        JGLXoption:[
          {value:'1',label:'毫秒'},
          {value:'2',label:'秒'},
          {value:'3',label:'分'},
          {value:'4',label:'时'},
          {value:'5',label:'天'},
          {value:'6',label:'月'},
          {value:'7',label:'季度'},
          {value:'8',label:'年'},
        ],
        ksyxsj:'',
        btn:{}
      }
    },
    methods:{
      onSubmit(){},
      resetEditFormCustom() {
        this.editForm = {
          szmc:'',//设置名称
          bfwjqzmc:'',//备份文件前缀名称
          yxms:'',//运行模式
          sjjg:'',//时间间隔
          bfccfs:'',//备份存储方式
          sjklx:'',//数据库类型
          zt:'',//状态
          ksyxsj:'',//开始时间
          jglx:'',//间隔类型
          bfcclj:''//备份存储路径
        }
      },
      saveEditForm(){},
      formatRole(row, column){
        console.log(1111111111111);
        // return row.sjklx == '1' ? '数据库本地存储' : '数据库异地存储'
      },
      // 搜索
      search() {
        this.currentPage = 1;
        this.getList();
      },
      async getList(isPaging, callback) {
        // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
        // await this.setIsPaging(isPaging || true).requestList(callback)
        this.$post('/OracleDatabaseController/getList.action',{})
        .then(data=>{
          console.log(data)
          this.tableData = data
        })
      },
      async load(){
        await this.getList(true);
      },
      getBtns(){
        this.$post('/qxdj/getBtns.action',{
          loadingEl:'all',
          data:{
            dto:{
              jsId:this.USER_INFO.userId,
              mljd:this.$route.name
            }
          }
        }).then(data=>{
          data.dtoList.forEach(item=>{
            this.$set(this.btn,[item.gnjd],true)
          })
        })
      }
    },
    mounted(){
      // console.log(this.USER_INFO)
      // console.log(this.$route.name)
      this.getBtns()
      // this.load()
    }
  }
</script>
<style>
  .page-DatabaseBackup{
    text-align: left;
    position: relative;
  }
  .cascade-select{
    /*border-bottom: 1px dotted #ccc;*/
  }
  .page-operation-box{
    margin: 10px 0;
  }
</style>