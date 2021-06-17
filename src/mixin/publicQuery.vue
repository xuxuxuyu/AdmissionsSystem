<script>
/**
 * 控制页面通用的全局接口
 * 文档地址: systemv8-api/全局查询.md
 */
export default {
  name: "mixin-publicQuery",
  computed: {},
  data() {
    return {
      // 公共接口参数配置
      PublicQuery: {
        // 01.获取年份数据
        GetEntranceYear: {
          order: [
            {
              Field: "RXNF", // 字段 入学年份
              IsDesc: true // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 02.获取学期数据
        GetTerm: {
          order: [
            {
              Field: "XNXQ", // 字段 学年学期
              IsDesc: true // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 03.获取单位类别信息数据
        GetDepartmentType: {
          order: [
            {
              Field: "DWLBBH", // 字段 单位类别编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 04.获取单位信息数据
        GetDepartment: {
          order: [
            {
              Field: "DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "DepartmentType.BDDWLBID", // 字段 单位类别主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISSKDW", // 字段 开课单位标识
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISKKDW", // 字段 上课单位标识
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 05.获取单位数据
        GetInstitute: {
          order: [
            {
              Field: "DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 06.获取教研室信息数据
        GetStaffRoom: {
          order: [
            {
              Field: "DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "DepartmentType.BDDWLBID", // 字段 单位类别主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "PID", // 字段 隶属单位主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 07.获取大类信息数据
        GetGenericInfo: {
          order: [
            // {
            //   "Field": "Department.DWBH",                 // 字段 单位编号
            //   "IsDesc": false                             // 倒序
            // },
            {
              Field: "XNZYBH", // 字段 大类专业编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 08.获取专业信息数据
        GetProfessionInfo: {
          order: [
            {
              Field: "Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LBZ", // 字段 LBZ
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 9.获取专业方向信息数据
        GetProfessionDirection: {
          order: [
            {
              Field: "ProfessionInfo.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ProfessionInfo.XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            },
            {
              Field: "ZYFXBH", // 字段 专业方向编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ProfessionInfo.Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ProfessionInfo.BDZYXXID", // 字段 校内专业主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 10.获取大类年度信息数据
        GetGenericInfoYear: {
          order: [
            {
              Field: "NF", // 字段 年级
              IsDesc: true // 倒序
            },
            {
              Field: "Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XNZYBH", // 字段 大类专业编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "NF", // 字段 年级
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 11.获取专业年度信息数据
        GetProfessionInfoYear: {
          order: [
            {
              Field: "NF", // 字段 年级
              IsDesc: true // 倒序
            },
            {
              Field: "Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "NF", // 字段 年级
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LBZ", // 字段 LBZ
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 12.获取班级信息数据
        GetClassInfo: {
          order: [
            {
              Field: "ProfessionInfoYear.NF", // 字段 年级
              IsDesc: true // 倒序
            },
            {
              Field: "ProfessionInfoYear.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ProfessionInfoYear.XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            },
            {
              Field: "BJBH", // 字段 班级编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ProfessionInfoYear.NF", // 字段 年级
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ProfessionInfoYear.Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ProfessionInfoYear.BDZYXXNDID", // 字段 专业年度主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 13.获取校区信息数据
        GetSchoolInfo: {
          order: [
            {
              Field: "XQBH", // 字段 校区编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 14.获取分区信息数据
        GetAreaInfo: {
          order: [
            {
              Field: "FQBH", // 字段 分区编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SchoolInfo.BDXQXXID", // 字段 校区主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 15.获取教学楼信息数据
        GetTeachBuilding: {
          order: [
            {
              Field: "JXLBH", // 字段 教学楼编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SchoolInfo.BDXQXXID", // 字段 校区主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 16.获取教室信息数据
        GetRoomInfo: {
          order: [
            {
              Field: "JSBH", // 字段 教室编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SchoolInfo.BDXQXXID", // 字段 校区主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "AreaInfo.BDFQXXID", // 字段 分区主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "TeachBuilding.BDJXLXXID", // 字段 教学楼主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 17.获取标签信息数据
        GetSignInfo: {
          order: [
            {
              Field: "BQBH", // 字段 标签编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BQLX", // 字段 标签类型
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 18.获取地区信息数据
        GetDistrict: {
          order: [
            {
              Field: "DQBH", // 字段 地区编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SSSF", // 字段 所属省份
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 19.获取学生基本信息数据
        GetStudentBasicInfo: {
          order: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 年级
              IsDesc: true // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.XNZYBH", // 字段 专业编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.BJBH", // 字段 班级编号
              IsDesc: false // 倒序
            },
            {
              Field: "XH", // 字段 学号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 年级
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.BDZYXXNDID", // 字段 专业年度主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.BDBJXXID", // 字段 班级主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 20.获取教师基本信息数据
        GetTeacherBasicInfo: {
          order: [
            {
              Field: "Department.DepartmentType.DWLBBH", // 字段 单位类别编号
              IsDesc: false // 倒序
            },
            {
              Field: "Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "JSBH", // 字段 教师编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "Department.DepartmentType.BDDWLBID", // 字段 单位类别主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 21.获取学时分类数据
        GetHourType: {
          order: [
            {
              Field: "FLBH", // 字段 分类编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "GSLX", // 字段 归属类型
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 22.获取课程类别数据
        GetLessonClass: {
          order: [
            {
              Field: "FLBH", // 字段 分类编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 23.获取课程授课方式数据
        GetLessonMethod: {
          order: [
            {
              Field: "FSBH", // 字段 方式编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 24.获取教学进程数据
        GetTeachSymbol: {
          order: [
            {
              Field: "BH", // 字段 编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 25.获取课程信息数据
        GetLessonInfo: {
          order: [
            {
              Field: "KCBH", // 字段 课程编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISParent", // 字段 单位类别主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "LessonMethod.FSMC", // 字段 单位类别主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            }
          ]
        },
        // 26.获取培养方案版本数据
        GetTrainPlanVersion: {
          order: [
            {
              Field: "BBH", // 字段 版本号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 27.获取角色信息数据
        GetRole: {
          order: [
            {
              Field: "JSBH", // 字段 编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "JSLX", // 字段 角色类型 1:系统管理 2:学生 3:教职工
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 28.获取专业年度信息数据（根据培养方案版本主键）
        GetProfessionInfoToTrainPlanVersion: {
          order: [
            {
              Field: "Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LBZ", // 字段 LBZ
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 29.获取课程类别数据 （公共）
        GetLessonClassToCommon: {
          order: [
            {
              Field: "FLBH", // 字段 分类编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 30.获取课程类别数据 （未确定选修课）
        GetLessonClassToUnderknow: {
          order: [
            {
              Field: "FLBH", // 字段 分类编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 31.获取课程类别数据 （实践环节）
        GetLessonClassToPractice: {
          order: [
            {
              Field: "FLBH", // 字段 分类编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 32.获取数据字典数据
        GetSTCode: {
          order: [
            {
              Field: "ZDBH", // 字段 编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 33.获取包含年度专业的专业信息数据
        GetHaveYearProfessionInfo: {
          order: [
            {
              Field: "Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 查询类型 0:查询 1:过滤
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 查询条件
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        // 34.获取单位数据 (开课单位标识、上课单位标识二选一传值)
        GetDepartmentByQuery: {
          order: [
            {
              Field: "DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDDWLBID", // 字段 单位类别主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISKKDW", // 字段 开课单位标识
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISSKDW", // 字段 上课单位标识
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            }
          ]
        },
        //35.获取标签学生基本信息数据
        GetStudentBasicInfoToSign: {
          order: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.XNZYBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.BJBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.BDZYXXNDID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.BDBJXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDZYFXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDBQXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //36.获取系统菜单数据
        GetSystemMenu: {
          order: [],
          where: []
        },
        //37.获取学生异动类型数据
        GetStudentChangeTypeList: {
          order: [],
          where: []
        },
        //38.获取异动学生基本信息数据
        GetStudentBasicInfoToChange: {
          order: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 年级
              IsDesc: true // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.XNZYBH", // 字段 专业编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.BJBH", // 字段 班级
              IsDesc: false // 倒序
            },
            {
              Field: "XH", // 字段 学号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 年级
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.BDZYXXNDID", // 字段 专业年度主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.BDBJXXID", // 字段 班级主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SMXSYDLXID", // 字段 学生异动类型主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //39.获取二级授权数据
        GetPWSecondAuth: {
          order: [],
          where: []
        },
        //40.获取角色权限系统菜单数据
        GetSystemMenuToRolePower: {
          order: [],
          where: []
        },
        //41.获取用户数据（系统管理）
        GetPWUserBySystem: {
          order: [
            {
              Field: "JSBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 单位信息主键
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //41.获取用户数据（系统管理）
        GetPWUserBySystemToPower: {
          order: [
            {
              Field: "JSBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //42.获取培养方案版本年级数据
        GetTrainPlanVersionYearList: {
          order: [],
          where: []
        },
        //43..获取一级实验室数据
        GetLabInfoFirstLevel: {
          order: [
            {
              Field: "SYSBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //44.获取二级实验室数据
        GetLabInfoSecondLevel: {
          order: [
            {
              Field: "SYSBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoFirstLevel.Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoFirstLevel.EBYJSYSID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //45.获取实验人员数据
        GetExperiPersonnel: {
          order: [
            {
              Field: "TeacherBasicInfo.JSBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "LabInfoFirstLevel.Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoFirstLevel.EBYJSYSID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //46.获取实验项目数据
        GetExperiSubject: {
          order: [
            {
              Field: "XMBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "TPKCXXID", // 字段 课程信息id
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoSecondLevel.LabInfoFirstLevel.Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoSecondLevel.LabInfoFirstLevel.EBYJSYSID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoSecondLevel.EBEJSYSID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "XMBH", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "XMMC", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //47.获取实验教室数据
        GetEBLabInfoSecondLevelDetailed: {
          order: [
            {
              Field: "RoomInfo.JSBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "LabInfoSecondLevel.LabInfoFirstLevel.Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoSecondLevel.LabInfoFirstLevel.EBYJSYSID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LabInfoSecondLevel.EBEJSYSID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "RoomInfo.JSBH", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "RoomInfo.JSMC", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        //48.获取评教分类
        GetEvaluateTypeList: {
          order: [],
          where: []
        },
        //49.获取评教类别
        GetEvaluateObjectTypeList: {
          order: [],
          where: []
        },
        //50.获取评教一级指标
        GetEvaluateIndexList: {
          order: [],
          where: []
        },
        //51.获取评教计划
        GetEvaluatePlanList: {
          order: [],
          where: []
        },
        //52.获取单位数据（不限制）开课单位标识、上课单位标识二选一传值 （注：或者二者都不传）
        GetDepartmentByQueryNoLimit: {
          order: [
            {
              Field: "DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "JYBJ", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDDWLBID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISKKDW", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ISSKDW", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            }
          ]
        },

        //53.获取实验预约任务数据
        GetExperiBespeakTask: {
          order: [
            {
              Field: "ZCMS", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "JCMS", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "EBKKSYXMID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            }
          ]
        },

        GetClassInfoToBeginLessonClass: {
          order: [
            {
              Field: "ProfessionInfoYear.NF", // 字段 年级
              IsDesc: true // 倒序
            },
            {
              Field: "ProfessionInfoYear.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ProfessionInfoYear.XNZYBH", // 字段 校内专业编号
              IsDesc: false // 倒序
            },
            {
              Field: "BJBH", // 字段 班级编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "LCKKXXID", // 字段 年级
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            }
          ]
        },
        GetStudentBasicInfoToBeginLessonClass: {
          order: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.DWBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.XNZYBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "ClassInfo.BJBH", // 字段 单位编号
              IsDesc: false // 倒序
            },
            {
              Field: "XH", // 字段 单位编号
              IsDesc: false // 倒序
            }
          ],
          where: [
            {
              Field: "ClassInfo.ProfessionInfoYear.NF", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.Department.BDDWXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.ProfessionInfoYear.BDZYXXNDID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "ClassInfo.BDBJXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDZYFXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BDBQXXID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "BJID", // 字段
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "LCKKXXID", // 字段 禁用标记LCKKXXID
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
            },
            {
              Field: "SearchType", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            },
            {
              Field: "SearchQuery", // 字段 禁用标记
              Value: "", // 值
              Operation: "Contains", // 操作
              Logic: "Or" // 逻辑
            }
          ]
        },
        GetLessonTeachSymbol:{
          order:[],
          where:[{
            Field: "TPJXJCID", // 字段 禁用标记
              Value: "", // 值
              Operation: "Equal", // 操作
              Logic: "And" // 逻辑
          }]
        }
      }
    };
  },
  methods: {
    /**
     * 封装通用请求
     * @param url 请求url
     * @param params 请求条件
     * @param loadingEl 待绑定的loading元素
     * @returns {Promise.<*>}
     */
    async _requestPublicQueryApi(url, params, loadingEl, callback) {
      return this.$post("/PublicQueryApi/" + url, {
        loadingEl: loadingEl,
        action: "select",
        data: params
      }).then(data => {
        if (Array.isArray(data)) {
          return data;
        }
        callback && callback(data.PagingResult.Total, data);
        return data.PagingResult.Rows;
      });
    },
    /**
     * 开放请求封装
     * @param params 请求url | {url, isPaging, offset, limit}
     * @param values 请求条件数组
     * @param loadingEl 待绑定的loading元素
     * @returns {Promise.<*>}
     */
    async getPublicQuery(params, values, loadingEl, callback) {
      let pagingParam = JSON.parse(JSON.stringify(this.PagingParam));
      let config = undefined;
      let url = undefined;
      if (typeof params === "string") {
        url = params;
        pagingParam.IsPaging = params.isPaging || false; // 是否分页
        config = this.PublicQuery[params];
      } else {
        url = params.url;
        config = this.PublicQuery[params.url];
        pagingParam.IsPaging = params.isPaging || true; // 是否分页
        pagingParam.Offset = params.offset || 0; // 偏移
        pagingParam.Limit = params.limit || this.publicQueryLimit; // 页面展示条数, mixin common 配置
      }
      // 排序
      pagingParam.Orders.PropertyParams = config.order;
      // 过滤条件
      pagingParam.Conditions.PropertyParams = [];
      config.where &&
        config.where.forEach((item, index) => {
          // @特殊处理 禁用标记
          if (item.Field === "JYBJ") {
            pagingParam.Conditions.PropertyParams.push({
              // 字段
              Field: item.Field,
              // 值
              Value: false,
              // 操作符
              Operation: this.globalDict.operation["Equal"],
              // 逻辑
              Logic: this.globalDict.logic["And"]
            });
          } else {
            // @特殊处理, 针对JYBJ优化
            if (config.where[0].Field === "JYBJ") {
              index = index - 1;
            }
            // @特殊处理, 过滤异常值
            if (!values || !values[index]) {
              return;
            }
            pagingParam.Conditions.PropertyParams.push({
              // 字段
              Field: item.Field,
              // 值
              Value: values ? values[index] : item.Value || "",
              // 操作符
              Operation: this.globalDict.operation[item.Operation || "Equal"], // 3 === Equal
              // 逻辑
              Logic: this.globalDict.logic[item.Logic || "And"] // 0 === And
            });
          }
        });
      return await this._requestPublicQueryApi(
        url,
        { pagingParam },
        loadingEl,
        callback
      );
    },
    /**
     * 示例使用, 缺少参数, 自行补充
     */
    async _loadPublicQuery() {
      // 01.获取年份数据
      let entranceYear = await this.getPublicQuery("GetEntranceYear");
    }
  },
  mounted() {
    // this._loadPublicQuery()
  }
};
</script>
