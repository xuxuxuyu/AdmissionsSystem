<template>
	<!-- 教学楼信息 -->
	<div class="page-TeachBuilding">
		<div class="page-container">
			 <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('add');openDialog('add')" v-if="btn.add">新增
        	</el-button>
        	<el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" :disabled="updateBatchBtnDisabled" v-if="btn.update">修改
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdjxlxxId')" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button ref="exportBtn" type="primary" icon="icon iconfont icondaochu"class="app-whole app-whole-export" @click="toExport()" v-if="btn.export">导出</el-button>
          <el-button type="primary" icon="icon iconfont iconmorenpaixu" v-if="btn.sort">默认排序</el-button>

      	</div>
      </div>
      <!-- 列表 -->
      <div class="app-page-box-table big-height">
        <el-table
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          height="100%"
          highlight-current-row
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange"
          @row-dblclick="doubleClickTableRow">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jxlbh"
            label="教学楼编号"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.jxlbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jxlmc"
            label="教学楼名称"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template align="left" slot-scope="scope">{{ scope.row.jxlmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ywmc"
            label="英文名称"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.ywmc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdxqxxId"
            label="所属校区"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.bdxqxxId}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jzwzk"
            label="建筑物炸状况"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.jzwzk}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jzwlx"
            label="建筑物类型"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.jzwlx}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dz"
            label="地址"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.dz}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="cs"
            label="层数"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.cs}}</template>
          </el-table-column>
          <el-table-column
            prop="zybz"
            label="专用标记"
            align="center"
            width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.zybz) ? scope.row.zybz : scope.row.zybz != 0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="jybj"
            label="禁用"
            align="center"
            width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.jybj) ? scope.row.jybj : scope.row.jybj != 0"></el-checkbox>
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
      <!-- 新增修改dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="60%"
        append-to-body
        :title="editDialogDisplayTitle"
        :visible.sync="editDialogVisible"
        @close="resetEditForm">
        <el-form
          status-icon
          label-width="105px"
          :model="editForm"
          class="form-clear-bottom"
          :rules="editFormRules"
          ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="教学楼编号" prop="jxlbh">
                <el-input clearable v-model="editForm.jxlbh" :autofocus="true" placeholder="请输入教学楼编号"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="建筑物状况" prop="jzwzk">
                <el-select style="width: 100%" v-model="editForm.jzwzk" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in optionsJZWZK"
                      :key="item.id"
                      :label="item.dmmc"
                      :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地址" prop="dz">
                <el-input clearable v-model="editForm.dz" placeholder="请输入地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教学楼名称" prop="jxlmc">
                <el-input clearable v-model="editForm.jxlmc" placeholder="请输入教学楼名称"></el-input>
              </el-form-item>
              <el-form-item label="所属校区" prop="bdxqxxId">
                <el-select style="width: 100%" v-model="editForm.bdxqxxId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsXQ"
                    :key="item.bdxqxxId"
                    :label="'[' + item.xqbh + ']' + item.xqmc"
                    :value="item.bdxqxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="建筑物类型" prop="jzwlx">
                <el-select style="width: 100%" v-model="editForm.jzwlx" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsJZWLX"
                    :key="item.id"
                    :label="item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="层数" prop="cs">
                <el-input clearable v-model="editForm.cs" placeholder="请输入层数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="bz">
                <el-input clearable type="textarea" :rows="5" v-model="editForm.bz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label class="no-margin-bottom" prop="jyjs">
                <div class="app-checkbox-group app-checkbox-every">
                  <el-checkbox label="禁用标记" v-model="editForm.jybj" ></el-checkbox>
                  <el-checkbox label="专用标记" v-model="editForm.zybz" ></el-checkbox>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveForm()">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
		</div>
	</div>
</template>
<script>
	import newtable from "@/mixin/newtable.vue";
	export default {
    mixins: [newtable],
    name:"TeachBuilding",
    data() {
      return {
      	requestSuffix:{
        	select:'/bdjxlxx/getList.action',
          delete:'/bdjxlxx/delete.action',
          add:'/bdjxlxx/insert.action',
          export:'/bdjxlxx/export.action',
          update:'/bdjxlxx/update.action'
        },
        selectConfig: {
          // 表格的通用请求
          table: {
            order: [
            ],
            fuzzy: [

            ],
            where: [
            ]
          }
        },
        optionsJZWZK:[],
        optionsXQ:[],
        optionsJZWLX:[],
        editForm:{},
        editFormRules:{
          jxlbh:[{ required: true,message: "教学楼编号不能为空",tigger: "blur"}],
          jxlmc:[{ required: true,message: "教学楼名称不能为空",tigger: "blur"}],
          bdxqxxId:[{ required: true,message: "所属校区不能为空",tigger: "blur"}],
        },
      }
    },
    methods:{
    	openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        // 
        if(type=='update'){
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
          this.editForm.zybz = this.editForm.zybz == 0 ? false : true
        }
        this.getXQ()
        this.getJZWZK()
        this.getJZWLX()
      },
      // 获取建筑物状态
      getJZWZK(){
        this.$post('/STCode/getList.action',{
          data:{
            dmbt:'JZWZK' ,
            sfsyzjd:1
          }
        }).then(data=>{
          this.optionsJZWZK = data.list
        })
      },
      // 获取建筑物类型
      getJZWLX(){
        this.$post('/STCode/getList.action',{
          data:{
            dmbt:'JZWLX' ,
            sfsyzjd:1
          }
        }).then(data=>{
          this.optionsJZWLX = data.list
        })
      },
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      async load() {
        // 获取列表
        this.getList(true);
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
        await this.setIsPaging(isPaging || true).requestList(callback);
      },
      // 获取校区
      getXQ(){
        this.$post('/bdjsxx/getXqList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{}
          },
        }).then(data =>{
          if(data.succsess){
            this.optionsXQ = data.list
          }
        })
      },
      async saveForm(){
        this.editForm.jybj = this.editForm.jybj ? 1 : 0
        this.editForm.zybz = this.editForm.zybz ? 1 : 0
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          if (this.editDialogType === "add") {
            await this.addEditForm(
              this.editForm
              );
          } else if (this.editDialogType === "update") {
            await this.updateEditForm(
              this.editForm
              );
          }
        })
      },
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
	
</style>