<template>
  <!-- 学校信息 -->
  <div class="page-SchoolMain">
    <div class="page-container" style="margin-top: 10px">
      <div class="page-form-box">
        <div class="page-form-box-header">
          <i class="icon iconfont iconxinxi"></i>
          <span class="name">学校信息</span>
        </div>
        <div class="page-box-content">
          <el-form :model="editForm" :rules="rules" ref="editForm" label-width="130px" class="form-clear-bottom">
            <el-row :gutter="20">
              <!-- left -->
              <el-col :span="12">
                <el-form-item label="学校代码" prop="XXDM">
                  <el-input v-model="editForm.XXDM" :autofocus="true" ref="XXDM_INPUT" placeholder="请输入学校代码"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="YWMC">
                  <el-input v-model="editForm.YWMC" placeholder="请输入英文名称"></el-input>
                </el-form-item>
                <el-form-item label="建校年月" prop="JXNY">
                  <el-date-picker
                    class="width-percent-100"
                    v-model="editForm.JXNY"
                    type="month"
                    format="yyyy 年 MM 月"
                    placeholder="请选择年月">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="学校性质" prop="XXXZ">
                  <el-input v-model="editForm.XXXZ" placeholder="请输入学校性质"></el-input>
                </el-form-item>
                <el-form-item label="举办者" prop="JBZ">
                  <el-input v-model="editForm.JBZ" placeholder="请输入举办者"></el-input>
                </el-form-item>
                <el-form-item label="法人" prop="FR">
                  <el-input v-model="editForm.FR" placeholder="请输入法人"></el-input>
                </el-form-item>
                <el-form-item label="党委负责人" prop="DWFZR">
                  <el-input v-model="editForm.DWFZR" placeholder="请输入党委负责人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="LXDH">
                  <el-input v-model="editForm.LXDH" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item status-icon label="电子邮箱" prop="DZXX">
                  <el-input v-model="editForm.DZXX" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="YZBM">
                  <el-input v-model="editForm.YZBM" placeholder="请输入邮政编码"></el-input>
                </el-form-item>
                <el-form-item label="学科门类数" prop="XKMLS">
                  <el-input v-model="editForm.XKMLS" placeholder="请输入学科门类数"></el-input>
                </el-form-item>
              </el-col>

              <!-- right -->
              <el-col :span="12">
                <el-form-item label="学校名称" prop="XXMC">
                  <el-input v-model="editForm.XXMC" placeholder="请输入学校名称"></el-input>
                </el-form-item>
                <el-form-item label="组织机构码" prop="ZZJGM">
                  <el-input v-model="editForm.ZZJGM" placeholder="请输入组织机构码"></el-input>
                </el-form-item>
                <el-form-item label="校庆日" prop="XQR">
                  <el-date-picker
                    class="width-percent-100"
                    v-model="editForm.XQR"
                    type="date"
                    format=" MM 月 dd 日"
                    placeholder="请选择月日">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="办学类型" prop="BXLX">
                  <el-input v-model="editForm.BXLX" placeholder="请输入办学类型"></el-input>
                </el-form-item>
                <el-form-item label="主管部门" prop="ZGBM">
                  <el-input v-model="editForm.ZGBM" placeholder="请输入主管部门"></el-input>
                </el-form-item>
                <el-form-item label="法人证书号" prop="FRZSH">
                  <el-input v-model="editForm.FRZSH" placeholder="请输入法人证书号"></el-input>
                </el-form-item>
                <el-form-item label="校长" prop="XZ">
                  <el-input v-model="editForm.XZ" placeholder="请输入校长"></el-input>
                </el-form-item>
                <el-form-item label="传真电话" prop="CZDH">
                  <el-input v-model="editForm.CZDH" placeholder="请输入传真电话"></el-input>
                </el-form-item>
                <el-form-item label="主页地址" prop="ZYDZ">
                  <el-input v-model="editForm.ZYDZ" placeholder="请输入主页地址"></el-input>
                </el-form-item>
                <el-form-item label="开办本科教育年份" prop="KBBKJYNF">
                  <el-date-picker
                    class="width-percent-100"
                    v-model="editForm.KBBKJYNF"
                    type="year"
                    format="yyyy"
                    placeholder="请选择年">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="行政区划" prop="XZQH">
                  <el-input v-model="editForm.XZQH" placeholder="请输入行政区划"></el-input>
                </el-form-item>
              </el-col>

              <!-- bottom -->
              <el-col :span="24">
                <el-form-item label="学校地址" prop="XXDZ">
                  <el-input v-model="editForm.XXDZ" placeholder="请输入学校地址"></el-input>
                </el-form-item>
                <el-form-item label="学校状况" class="app-checkbox-every">
                  <!-- <el-checkbox-group v-model="editForm.typess"> -->
                  <el-checkbox label="学校211工程状况"  v-model="editForm.XXGCZK"></el-checkbox>
                  <el-checkbox label="985工程院校状况" v-model="editForm.GCYXZK"></el-checkbox>
                  <el-checkbox label="重点学校状况" v-model="editForm.ZDXXZK"></el-checkbox>
                  <el-checkbox label="研究生院状况" v-model="editForm.YJSYZK"></el-checkbox>
                  <el-checkbox label="举办网络教育状况" v-model="editForm.JBWLJYZK"></el-checkbox>
                  <el-checkbox label="举办成人教育状况" v-model="editForm.JBCRJYZK"></el-checkbox>
                  <el-checkbox label="国家示范性高职院校状况" v-model="editForm.GJSFXGZYXZK"></el-checkbox>
                  <!-- </el-checkbox-group> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <div class="page-operation-box text-center">
        <el-button size="medium" type="primary" class="app-schoolmain-save" >保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"SchoolMain",
    data() {
      return {
        editForm: {
          ID:'',
          XXDM:'',
          YWMC:'',
          JXNY:'',
          XXXZ:'',
          JBZ: '',
          FR:'',
          DWFZR:'',
          LXDH:'',
          DZXX:'',
          YZBM:'',
          XKMLS:'',
          // 右边
          XXMC:'',
          ZZJGM:'',
          XQR:'',
          BXLX:'',
          ZGBM: '',
          FRZSH: '',
          XZ: '',
          CZDH: '',
          ZYDZ:'',
          KBBKJYNF:'',
          XZQH:'',
          //底部
          XXDZ:'',
          ZSPC: "",
          XXGCZK:false,
          GCYXZK:false,
          ZDXXZK:false,
          YJSYZK:false,
          JBWLJYZK:false,
          JBCRJYZK:false,
          GJSFXGZYXZK:false,

          value: '',
          // 下拉列表：
          unitList0:[],   // 学校性质
          unitList1:[],   // 举办者
          unitList2:[],   // 办学类型
          unitList3:[],   // 主管部门
          unitList4:[]    // 招生批次
        },
        // 表单验证
        rules: {
          // 学校代码（验证: 非空, 长度: 5）
          XXDM: [
            { required: true,trigger: 'blur',message: '学校代码为必填项'},
          ],
          // 学校名称 （验证: 非空, 长度: 40）
          XXMC: [
            { required: true, trigger: 'blur',message: '学校名称为必填项'},
            { min: 0, max: 40, message: '学校名称长度不能大于40个字符', trigger: 'blur' }
          ],
          // 英文名称 （验证: 英文, 长度: 300）
          YWMC: [
            { trigger: 'blur' },
            { min: 0, max: 300, message: '英文名称长度不能大于300个字符', trigger: 'blur' }
          ],
          // 学校地址 （长度: 200）
          XXDZ:[
            { min: 0, max: 200, message: '学校地址长度不能大于200个字符', trigger: 'blur' }
          ],
          // 邮政编码 （长度: 10）
          YZBM:[
            {trigger: 'blur' },
            { min: 0, max: 10, message: '邮政编码长度不能大于10个字符', trigger: 'blur' }
          ],
          // 行政区划 （长度: 50）
          XZQH:[
            { min: 0, max: 50, message: '行政区划长度不能大于50个字符', trigger: 'blur' }
          ],
          // 建校年月 （验证: 年月 [例如: 2010年10月], 长度: 10）
          JXNY:[],
          // 校庆日 （验证: 月日 [例如: 10月15日], 长度: 10）
          XQR:[],
          // 学校性质 （长度: 10）
          XXXZ:[
            { min: 0, max: 10, message: '学校性质长度不能大于10个字符', trigger: 'change' }
          ],
          // 办学类型 （长度: 10）
          BXLX:[
            { min: 0, max: 10, message: '办学类型长度不能大于10个字符', trigger: 'change' }
          ],
          // 举办者 （长度: 20）
          JBZ:[
            { min: 0, max: 20, message: '举办者长度不能大于20个字符', trigger: 'change' }
          ],
          // 主管部门 （长度: 20）
          ZGBM:[
            { min: 0, max: 20, message: '主管部门长度不能大于20个字符', trigger: 'change' }
          ],
          // 法人证书号 （长度: 20）
          FRZSH:[
            { min: 0, max: 20, message: '法人证书号长度不能大于20个字符', trigger: 'blur' }
          ],
          // 法人 （长度: 40）
          FR:[
            { min: 0, max: 40, message: '法人长度不能大于40个字符', trigger: 'blur' }
          ],
          // 校长 （长度: 40）
          XZ:[
            { min: 0, max: 40, message: '校长长度不能大于40个字符', trigger: 'blur' }
          ],
          // 党委负责人 （长度: 40）
          DWFZR:[
            { min: 0, max: 40, message: '党委负责人长度不能大于40个字符', trigger: 'blur' }
          ],
          // 组织机构码 （长度: 20）
          ZZJGM:[
            { min: 0, max: 20, message: '组织机构码长度不能大于20个字符', trigger: 'blur' }
          ],
          // 联系电话 （长度: 20）
          LXDH:[
            {message: '请输入正确的联系电话', trigger: 'blur'},
            { min: 0, max: 20, message: '联系电话长度不能大于20个字符', trigger: 'blur' }
          ],
          // 传真电话 （长度: 20）
          CZDH:[
            {message: '请输入正确的传真电话', trigger: 'blur'},
            { min: 0, max: 20, message: '传真电话长度不能大于20个字符', trigger: 'blur' }
          ],
          // 电子信箱 （验证: 邮箱, 长度: 30）
          DZXX:[
            { message: '请输入正确的邮箱格式', trigger: 'blur'},
            { min: 0, max: 30, message: '电子信箱长度不能大于30个字符', trigger: 'blur' }
          ],
          // 主页地址 （长度: 100）
          ZYDZ:[
            { trigger: 'blur'},
            { min: 0, max: 100, message: '主页地址长度不能大于100个字符', trigger: 'blur' }
          ],
          // 招生批次 （长度: 30）验证取消
          // 学科门类数 （验证: 数字）
          XKMLS:[
            { message: '学科门类数只能为数字', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{},
    mounted(){
    }
  }
</script>
<style>
.page-SchoolMain{
  text-align: left;
}
</style>