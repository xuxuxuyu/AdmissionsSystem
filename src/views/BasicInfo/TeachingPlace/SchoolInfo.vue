<template>
	<!-- 校区信息 -->
	<div class="page-SchoolInfo">
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
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdxqxxId')" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
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
            prop="xqbh"
            label="校区编号"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xqbh }}</template>
          </el-table-column>
					<el-table-column
            show-overflow-tooltip
            prop="xqmc"
            label="校区名称"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xqmc }}</template>
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
        width="30%"
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
          <el-form-item label="校区编号" prop="xqbh">
            <el-input clearable v-model="editForm.xqbh" :autofocus="true"  placeholder="请输入校区编号"></el-input>
          </el-form-item>
          <el-form-item label="校区名称" prop="xqmc">
            <el-input clearable v-model="editForm.xqmc" :autofocus="true"  placeholder="请输入校区名称"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="ywmc">
            <el-input clearable v-model="editForm.ywmc" :autofocus="true"  placeholder="请输入英文名称"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="bz">
            <el-input clearable type="textarea" :rows="5" v-model="editForm.bz"></el-input>
          </el-form-item>
          <el-form-item label class="no-margin-bottom" prop="jyjs">
            <div class="app-checkbox-group app-checkbox-every">
              <el-checkbox label="禁用标记" v-model="editForm.jybj" ></el-checkbox>
            </div>
          </el-form-item>
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
    name:"SchoolInfo",
    data() {
      return {
      	requestSuffix:{
        	select:'/bdxqxx/getList.action',
          delete:'/bdxqxx/delete.action',
          add:'/bdxqxx/insert.action',
          export:'/bdxqxx/export.action',
          update:'/bdxqxx/update.action'
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
        editForm:{
        	xqbh:'',
        	xqmc:'',
        	ywmc:'',
        	bz:'',
        	jybj:''
        },
        editFormRules:{
        	xqbh:[{ required: true,message: "校区编号不能为空",tigger: "blur"}],
          xqmc:[{ required: true,message: "校区名称不能为空",tigger: "blur"}],
        }
      }
    },
    methods:{
    	// 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      async saveForm(){
        if(this.editForm.jybj){
           this.editForm.jybj = this.editForm.jybj ? 1 : 0
        }
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
    	openDialog(){
         if(type == 'add'){
          this.editForm = {}
        }
        // 
        if(type=='update'){
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
        }
      },
      async load() {
        // 获取列表
        this.getList(true);
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
        await this.setIsPaging(isPaging || true).requestList(callback);
      },

    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
	
</style>