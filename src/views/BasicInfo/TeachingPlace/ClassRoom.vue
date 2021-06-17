<template>
	<!-- 教室信息 -->
	<div class="page-ClassRoom">
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
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdjsxxId')" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
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
            prop="jsbh"
            label="教室编号"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.jsbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jsmc"
            label="教室名称"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template align="left" slot-scope="scope">{{ scope.row.jsmc }}</template>
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
            prop="rnrs"
            label="容纳人数"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.rnrs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="rnksrs"
            label="容纳考试人数"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.rnksrs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="rnbs"
            label="容纳班数"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.rnbs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdxqxxMc"
            label="所属校区"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{scope.row.bdxqxxMc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdfqxxMc"
            label="所属分区"
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template slot-scope="scope">{{scope.row.bdfqxxMc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdjxlxMc"
            label="所属教学楼"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{scope.row.bdjxlxxMc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jslx" 
            label="教室类型"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.jslx }}</template>
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
              <el-form-item label="教室编号" prop="jsbh">
                <el-input clearable v-model="editForm.jsbh" :autofocus="true" ref="jsbh_input" placeholder="请输入教室编号"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="容纳考试人数" prop="rnksrs">
                <el-input clearable v-model="editForm.rnksrs" placeholder="请输入容纳考试人数"></el-input>
              </el-form-item>
              <el-form-item label="所属校区" prop="bdxqxxId">
                <el-select style="width: 100%" v-model="editForm.bdxqxxId" placeholder="请选择" @change="selectDataChange" clearable>
                  <el-option
                    v-for="item in optionsXQ"
                    :key="item.bdxqxxId"
                    :label="'['+ item.xqbh +']'+item.xqmc"
                    :value="item.bdxqxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属教学楼" prop="bdjxlxxId">
                <el-select style="width: 100%" v-model="editForm.bdjxlxxId" placeholder="请选择" :disabled="disFQ" clearable>
                    <el-option
                      v-for="item in optionsJXL"
                      :key="item.bdjxlxxId"
                      :label="'['+ item.jxlbh +']'+item.jxlmc"
                      :value="item.bdjxlxxId">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教室用途" prop="jsyh">
                <el-input clearable v-model="editForm.jsyh" placeholder="请输入教室用途"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教室名称" prop="jsmc">
                <el-input clearable v-model="editForm.jsmc" placeholder="请输入教室名称"></el-input>
              </el-form-item>
              <el-form-item label="容纳人数" prop="rnrs">
                <el-input clearable v-model="editForm.rnrs" placeholder="请输入容纳人数"></el-input>
              </el-form-item>
              <el-form-item label="容纳班数" prop="rnbs">
                <el-input clearable v-model="editForm.rnbs" placeholder="请输入容纳班数"></el-input>
              </el-form-item>
              <el-form-item label="所属分区" prop="bdfqxxId">
                <el-select style="width: 100%" v-model="editForm.bdfqxxId" placeholder="请选择" :disabled="disFQ" clearable>
                  <el-option
                    v-for="item in optionsFQ"
                    :key="item.bdfqxxId"
                    :label="'['+ item.fqbh +']'+item.fqmc"
                    :value="item.bdfqxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教室类型" prop="jslx">
                <el-input clearable v-model="editForm.jslx" placeholder="请输入教室类型"></el-input>
              </el-form-item>
              <el-form-item label="所在楼层" prop="szlc">
                <el-input clearable v-model="editForm.szlc" placeholder="请输入教室所在楼层"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="简介" prop="jj">
                <el-input clearable type="textarea" :rows="5" v-model="editForm.jj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label class="no-margin-bottom" prop="jyjs">
                <div class="app-checkbox-group app-checkbox-every">
                  <!-- <el-checkbox label="禁用标记" @change="e=>{editForm.jyjs = e? 1 : 0}" :value="!!editForm.jyjs"></el-checkbox> -->
                  <el-checkbox label="禁用标记" v-model="editForm.jybj" ></el-checkbox>
                  <el-checkbox label="专用标记" v-model="editForm.zybj" ></el-checkbox>
                  <el-checkbox label="桌椅是否固定" v-model="editForm.zygdbj" ></el-checkbox>
                  <el-checkbox label="是否有空调" v-model="editForm.ktbj" ></el-checkbox>
                  <el-checkbox label="考试笔试标记" v-model="editForm.ksbsbj" ></el-checkbox>
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
    name:"ClassInfo",
    data() {
      return {
        requestSuffix:{
        	select:'/bdjsxx/getList.action',
          delete:'/bdjsxx/delete.action',
          add:'/bdjsxx/insert.action',
          export:'/bdjsxx/dataExport.action',
          update:'/bdjsxx/update.action'
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
        tableData:[],
        optionsXQ:[],
        optionsFQ:[],
        optionsJXL:[],
        editForm:{
          jsbh:'',  //教室编号    非空;唯一
          jsmc:'',   //教室名称    非空;唯一
          ywmc:'',   //英文名称
          rnrs:'',     //容纳人数    非空
          rnksrs:'',    //容纳考试人数  非空
          rnbs:'',    //容纳班数    非空
          bdxqxxId:'', //所属校区    非空
          bdfqxxId:'', //所属分区
          bdjxlxxId:'',  //所属教学楼
          jslx:'',   //教室类型
          zybj:'',   //专用标记    非空;默认 0 ;"真(1)"为专用教学区
          jsyh:'',   //教室用途
          ksbsbj:'',   //考试笔试标记  非空;默认 0
          szlc:'',      //所在楼层
          zygdbj:'',   //桌椅是否固定  非空;默认 1
          ktbj:'',   //是否有空调   非空;默认 0
          jj:'',     //简介      提供网上查询
          bz:'',     //备注
          jybj:'',   //禁用标记    非空;默认 0 : 0 未禁用 , 1 已禁用
          cj:'' ,    //创建人
          cjsj:'',     //创建时间
          xgr:'',    //修改人
          xgsj:'',   //修改时间
        },
        editFormRules:{
          jsbh:[{ required: true,message: "教室编号不能为空",tigger: "blur"}],
          jsmc:[{ required: true,message: "教室名称不能为空",tigger: "blur"}],
          ywmc:[],
          rnrs:[{ required: true,message: "容纳人数不能为空",tigger: "blur"}],
          rnksrs:[{ required: true,message: "容纳考试人数不能为空",tigger: "blur"}],
          rnbs:[{ required: true,message: "容纳班数不能为空",tigger: "blur"}],
          bdxqxxId:[{ required: true,message: "所属校区不能为空",tigger: "blur"}],
          bdfqxxId:[{ required: true,message: "所属分区不能为空",tigger: "blur"}],
          // bdjxlxxId:[{ required: true,message: "所属教学楼不能为空",tigger: "blur"}],
          jslx:[],
          zybj:[],
          jsyh:[],
          ksbsbj:[],
          szlc:[],
          zygdbj:[],
          ktbj:[],
          jj:[],
          bz:[],
          jybj:[],
          cj:[],
          cjsj:[],
          xgr:[],
          xgsj:[],
          optionsXQ:[],
          optionsFQ:[]
        },
        disFQ:true,
        disJXL:true
      }
    },
    methods:{
    	// 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
        await this.setIsPaging(isPaging || true).requestList(callback);
      },
      async load() {
        // 获取列表
        this.getList(true);
      },
      async saveForm(){
        this.editForm.jybj = this.editForm.jybj ? 1 : 0
        this.editForm.zybj = this.editForm.zybj ? 1 : 0
        this.editForm.zygdbj = this.editForm.zygdbj ? 1 : 0
        this.editForm.ktbj = this.editForm.ktbj ? 1 : 0
        this.editForm.ksbsbj = this.editForm.ksbsbj ? 1 : 0
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
      openDialog(type){
        if(this.editForm.bdxqxxId){
          this.selectDataChange(this.editForm.bdxqxxId)
        }
        if(type == 'add'){
          this.editForm = {}
        }
        if(type=='update'){
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
          this.editForm.zybj = this.editForm.zybj == 0 ? false : true
          this.editForm.zygdbj = this.editForm.zygdbj == 0 ? false : true
          this.editForm.ktbj = this.editForm.ktbj == 0 ? false : true
          this.editForm.ksbsbj = this.editForm.ksbsbj == 0 ? false : true
        }
        this.getXQ()
      },
      // 获取校区
      getXQ(){
        this.$post('/bdxqxx/getList.action',{
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
      // 获取分区
      getFQ(id){
        this.$post('/bdfqxx/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{
              bdxqxxId:id
            }
          },
        }).then(data =>{
          if(data.succsess){
            this.optionsFQ = data.list
          }
        })
      },
      // 获取教学楼
      getJXL(id){
        this.$post('/bdjxlxx/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{
              bdxqxxId:id
            }
          },
        }).then(data =>{
          if(data.succsess){
            this.optionsJXL = data.list
          }
        })

      },
      // 校区变化
      selectDataChange(current){
        this.disFQ = false
        this.getFQ(current)
        this.getJXL(current)
      },
    },
    mounted(){
      this.load()
    }
  }

</script>
<style></style>