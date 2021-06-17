import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login'
import home from './views/home'
// import test from '@/views/BasicInfo/test'
const forget = resolve => require(['@/views/common/forget.vue'], resolve);
const empty = resolve => require(['@/views/empty.vue'],resolve);
const register = resolve => require(['@/views/common/register.vue'],resolve)
// 基础信息
const StudentInfo = resolve => require(['@/views/BasicInfo/StudentInfo.vue'],resolve);
const ClassInfo = resolve => require(['@/views/BasicInfo/ClassInfo.vue'],resolve);
const Department = resolve => require(['@/views/BasicInfo/Department.vue'],resolve);
const EntranceYear = resolve => require(['@/views/BasicInfo/EntranceYear.vue'],resolve);
const GenericInfo = resolve => require(['@/views/BasicInfo/GenericInfo.vue'],resolve);
const GenericInfoYear = resolve => require(['@/views/BasicInfo/GenericInfoYear.vue'],resolve);
const ProfessionDirection = resolve => require(['@/views/BasicInfo/ProfessionDirection.vue'],resolve);
const ProfessionInfo = resolve => require(['@/views/BasicInfo/ProfessionInfo.vue'],resolve);
const ProfessionInfoYear = resolve => require(['@/views/BasicInfo/ProfessionInfoYear.vue'],resolve);
const SchoolMain = resolve => require(['@/views/BasicInfo/SchoolMain.vue'],resolve);
const SignInfo = resolve => require(['@/views/BasicInfo/SignInfo.vue'],resolve);
const TeachBuilding = resolve => require(['@/views/BasicInfo/TeachingPlace/TeachBuilding.vue'],resolve);
const SchoolInfo = resolve => require(['@/views/BasicInfo/TeachingPlace/SchoolInfo.vue'],resolve);
const AreaInfo = resolve => require(['@/views/BasicInfo/TeachingPlace/AreaInfo.vue'],resolve);
const ClassRoom = resolve => require(['@/views/BasicInfo/TeachingPlace/ClassRoom.vue'],resolve);


// 测试
const test = resolve => require(['@/views/BasicInfo/test.vue'],resolve);

// 招生系统
const AdmissionPlan0 = resolve => require(['@/views/AdmissionPlan/AdmissionPlan0.vue'],resolve);
const AdmissionPlan1 = resolve => require(['@/views/AdmissionPlan/AdmissionPlan1.vue'],resolve);
const AdmissionPlan2 = resolve => require(['@/views/AdmissionPlan/AdmissionPlan2.vue'],resolve);
const AdmissionPlan3 = resolve => require(['@/views/AdmissionPlan/AdmissionPlan3.vue'],resolve);
const AdmissionQuery = resolve => require(['@/views/AdmissionPlan/AdmissionQuery.vue'],resolve);
const CalendarYearScores = resolve => require(['@/views/AdmissionPlan/CalendarYearScores.vue'],resolve);
const DataImport = resolve => require(['@/views/AdmissionPlan/DataImport.vue'],resolve);
const ExportData = resolve => require(['@/views/AdmissionPlan/ExportData.vue'],resolve);
const ImportPhoto = resolve => require(['@/views/AdmissionPlan/ImportPhoto.vue'],resolve);
const PrintNotice = resolve => require(['@/views/AdmissionPlan/PrintNotice.vue'],resolve);
const ProfessionalAdjustment = resolve => require(['@/views/AdmissionPlan/ProfessionalAdjustment.vue'],resolve);
const StatisticalQuery = resolve => require(['@/views/AdmissionPlan/StatisticalQuery.vue'],resolve);
const StudentInformation = resolve => require(['@/views/AdmissionPlan/StudentInformation.vue'],resolve);
// 招生系统的自主招生系统
const Approval = resolve => require(['@/views/AdmissionPlan/StudentSelf/Approval.vue'],resolve);
const ScoreEntry = resolve => require(['@/views/AdmissionPlan/StudentSelf/ScoreEntry.vue'],resolve);
const SetMajor = resolve => require(['@/views/AdmissionPlan/StudentSelf/SetMajor.vue'],resolve);
const ParameterSettings = resolve => require(['@/views/AdmissionPlan/StudentSelf/ParameterSettings.vue'],resolve);
const ScoreAudit = resolve => require(['@/views/AdmissionPlan/StudentSelf/ScoreAudit.vue'],resolve);
const AdmitisionSettings = resolve => require(['@/views/AdmissionPlan/StudentSelf/AdmitisionSettings.vue'],resolve);


// 招生系统的自主招生系统里的排考信息
const SetTestRoom = resolve => require(['@/views/AdmissionPlan/StudentSelfTest/SetTestRoom.vue'],resolve);
const SetTestTeacher = resolve => require(['@/views/AdmissionPlan/StudentSelfTest/SetTestTeacher.vue'],resolve);
const SetTestSubjects = resolve => require(['@/views/AdmissionPlan/StudentSelfTest/SetTestSubjects.vue'],resolve);
const SetTestTime = resolve => require(['@/views/AdmissionPlan/StudentSelfTest/SetTestTime.vue'],resolve);
const SetTest = resolve => require(['@/views/AdmissionPlan/StudentSelfTest/SetTest.vue'],resolve);

//系统管理
const DatabaseBackup = resolve => require(['@/views/SystemManagement/DatabaseBackup.vue'],resolve);
const LogQuery = resolve => require(['@/views/SystemManagement/LogQuery.vue'],resolve);
const SystemSettings = resolve => require(['@/views/SystemManagement/SystemSettings.vue'],resolve);
const RoleManagement = resolve => require(['@/views/SystemManagement/PermissionManagement/RoleManagement.vue'],resolve);
const SetManagement = resolve => require(['@/views/SystemManagement/PermissionManagement/SetManagement.vue'],resolve);
const LicenseManagement = resolve => require(['@/views/SystemManagement/LicenseManagement.vue'],resolve);
const UserStudentManagement = resolve => require(['@/views/SystemManagement/UserStudentManagement.vue'],resolve);
const UserTeacherManagement = resolve => require(['@/views/SystemManagement/UserTeacherManagement.vue'],resolve);

// 迎新系统
const EntranceGuide = resolve => require(['@/views/WelcomeSystem/EntranceGuide.vue'],resolve);
const GreenRoad = resolve => require(['@/views/WelcomeSystem/GreenRoad.vue'],resolve);
const MajorAdjust = resolve => require(['@/views/WelcomeSystem/MajorAdjust.vue'],resolve);
const PhoneNumber = resolve => require(['@/views/WelcomeSystem/PhoneNumber.vue'],resolve);
const SchoolProfile = resolve => require(['@/views/WelcomeSystem/SchoolProfile.vue'],resolve);
const SchoolScenery = resolve => require(['@/views/WelcomeSystem/SchoolScenery.vue'],resolve);
const StudentMessage = resolve => require(['@/views/WelcomeSystem/StudentMessage.vue'],resolve);
const ChargingProjects = resolve => require(['@/views/WelcomeSystem/ForecastReport/ChargingProjects.vue'],resolve);
const PaymentAmount = resolve => require(['@/views/WelcomeSystem/ForecastReport/PaymentAmount.vue'],resolve);
const ReportingProcess = resolve => require(['@/views/WelcomeSystem/ForecastReport/ReportingProcess.vue'],resolve);
const ReportsLink = resolve => require(['@/views/WelcomeSystem/ForecastReport/ReportsLink.vue'],resolve);
const CommonProblems = resolve => require(['@/views/WelcomeSystem/OnlineChat/CommonProblems.vue'],resolve);
const OnlineConsulting = resolve => require(['@/views/WelcomeSystem/OnlineChat/OnlineConsulting.vue'],resolve);
const RegistrationLink = resolve => require(['@/views/WelcomeSystem/RegistrationProcess/RegistrationLink.vue'],resolve);
const RegistrationProcess0 = resolve => require(['@/views/WelcomeSystem/RegistrationProcess/RegistrationProcess0.vue'],resolve);
const ForecastStatistics = resolve => require(['@/views/WelcomeSystem/DecisionService/ForecastStatistics.vue'],resolve);
const ReportStatistics = resolve => require(['@/views/WelcomeSystem/DecisionService/ReportStatistics.vue'],resolve);
const AccommodationAmount = resolve => require(['@/views/WelcomeSystem/ForecastReport/AccommodationAmount.vue'],resolve);


// 自主招生系统学生端
const StudentSelfAdmissionLogin = resolve => require(['@/views/StudentSelfAdmissionLogin.vue'],resolve);
const StudentSelfAdmissionHome = resolve => require(['@/views/StudentSelfAdmissionHome.vue'],resolve)
const application = resolve => require(['@/views/StudentSelfAdmission/application.vue'],resolve);
const PayCost = resolve => require(['@/views/StudentSelfAdmission/PayCost.vue'],resolve);
const TestInfo = resolve => require(['@/views/StudentSelfAdmission/TestInfo.vue'],resolve);
const Audit = resolve => require(['@/views/StudentSelfAdmission/Audit.vue'],resolve);
const SelfAdmissionQuery = resolve => require(['@/views/StudentSelfAdmission/SelfAdmissionQuery.vue'],resolve);


//错误页面
const page404 = resolve => require(['@/views/common/page-404.vue'], resolve);
const page403 = resolve => require(['@/views/common/page-403.vue'], resolve);
const page500 = resolve => require(['@/views/common/page-500.vue'], resolve);
const pageOutApplicationTime = resolve => require(['@/views/common/page-outApplicationTime.vue'], resolve);
const PageTimeout = resolve => require(['@/views/common/page-timeout.vue'], resolve);
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'login',
      redirect: getDefaultRouter(process.env.NODE_ENV, process.env.BASE_URL),//process.env.NODE_ENV === 'production' && process.env.BASE_URL.indexOf('RecruitStudent') != -1 ? '/StudentSelfAdmissionLogin' : '/login'//
    },
    {
      path:'/StudentSelfAdmissionLogin',
      name:'StudentSelfAdmissionLogin',
      component:StudentSelfAdmissionLogin
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget,
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/page403',
      name: 'page403',
      component: page403,
      meta: {
        title: '错误页面'
      }
    },
    {
      path: '/page404',
      name: 'page404',
      component: page404,
      meta: {
        title: '错误页面'
      }
    },
    {
      path: '/page-outApplicationTime',
      name: 'page-outApplicationTime',
      component: pageOutApplicationTime,
      meta: {
        title: '不在当前报名时间'
      },
    },
    {
      path: '/page-timeout',
      name: 'page-timeout',
      component: PageTimeout,
      meta: {
        title: '登录超时'
      },
    },
    {
      path:'/register',
      name:'register',
      component:register,
      meta: {
        title:'注册账号'
      }
    },
    {
      path:'/home',
      name:'home',
      component:home,
      meta: {
        title: '我的工作台'
      },
      children:[
        {
          path:'BasicInfo',
          name:'BasicInfo',
          component:empty,
          redirect:'/home/BasicInfo/StudentInfo',
          meta: {
            title: '基础信息'
          },
          children:[
            {
              path:'StudentInfo',
              name:'StudentInfo',
              component:StudentInfo,
              meta: {
                title: '学生信息'
              },
            },
            {
              path:'SchoolMsg',
              name:'SchoolMsg',
              component:empty,
              redirect:'/home/BasicInfo/SchoolMsg/SchoolMain',
              meta:{
                title:'学院资料'
              },
              children:[
                {
                  path:'SchoolMain',
                  name:'SchoolMain',
                  component:SchoolMain,
                  meta:{
                    title:'学校信息'
                  } 
                },
                {
                  path:'EntranceYear',
                  name:'EntranceYear',
                  component:EntranceYear,
                  meta:{
                    title:'入学年份'
                  } 
                },
                {
                  path:'Department',
                  name:'Department',
                  component:Department,
                  meta:{
                    title:'单位信息'
                  } 
                },
                {
                  path:'GenericInfo',
                  name:'GenericInfo',
                  component:GenericInfo,
                  meta:{
                    title:'大类信息'
                  } 
                },
                {
                  path:'GenericInfoYear',
                  name:'GenericInfoYear',
                  component:GenericInfoYear,
                  meta:{
                    title:'年度大类信息'
                  } 
                },
                {
                  path:'ProfessionInfo',
                  name:'ProfessionInfo',
                  component:ProfessionInfo,
                  meta:{
                    title:'专业信息'
                  } 
                },
                {
                  path:'ProfessionInfoYear',
                  name:'ProfessionInfoYear',
                  component:ProfessionInfoYear,
                  meta:{
                    title:'年度专业信息'
                  } 
                },
                {
                  path:'ProfessionDirection',
                  name:'ProfessionDirection',
                  component:ProfessionDirection,
                  meta:{
                    title:'专业方向'
                  } 
                },
                {
                  path:'ClassInfo',
                  name:'ClassInfo',
                  component:ClassInfo,
                  meta:{
                    title:'班级信息'
                  } 
                },
                {
                  path:'SignInfo',
                  name:'SignInfo',
                  component:SignInfo,
                  meta:{
                    title:'标签管理'
                  } 
                },
                {
                  path:'test',
                  name:'test',
                  component:test,
                  meta:{
                    title:'test页面'
                  } 
                },
              ]
            },
            {
              path:'TeachingPlace',
              name:'TeachingPlace',
              component:empty,
              redirect:'/home/BasicInfo/TeachingPlace/SchoolInfo',
              meta:{
                title:'教学场所'
              },
              children:[
                {
                  path:'SchoolInfo',
                  name:'SchoolInfo',
                  component:SchoolInfo,
                  meta:{
                    title:'校区信息'
                  } 
                },
                {
                  path:'AreaInfo',
                  name:'AreaInfo',
                  component:AreaInfo,
                  meta:{
                    title:'分区信息'
                  } 
                },
                {
                  path:'TeachBuilding',
                  name:'TeachBuilding',
                  component:TeachBuilding,
                  meta:{
                    title:'教学楼信息'
                  } 
                },
                {
                  path:'ClassRoom',
                  name:'ClassRoom',
                  component:ClassRoom,
                  meta:{
                    title:'教室信息'
                  } 
                },
              ]
            }
          ]
        },
        {
          path:'AdmissionPlan',
          name:'AdmissionPlan',
          component:empty,
          redirect:'/home/AdmissionPlan/AdmissionPlanp/AdmissionPlan1',
          meta: {
            title: '招生计划'
          },
          children:[
            {
              path:'AdmissionPlanp',
              name:'AdmissionPlanp',
              component:empty,
              redirect:'/home/AdmissionPlan/AdmissionPlanp/AdmissionPlan0',
              meta:{
                title:'招生计划'
              },
              children:[
                {
                  path:'AdmissionPlan0',
                  name:'AdmissionPlan0',
                  component:AdmissionPlan0,
                  meta:{
                    title:'省内招生计划查询'
                  }
                },
                {
                  path:'AdmissionPlan1',
                  name:'AdmissionPlan1',
                  component:AdmissionPlan1,
                  meta:{
                    title:'省内招生计划生成'
                  }
                },
                {
                  path:'AdmissionPlan2',
                  name:'AdmissionPlan2',
                  component:AdmissionPlan2,
                  meta:{
                    title:'专业招生计划生成'
                  }
                },
                {
                  path:'AdmissionPlan3',
                  name:'AdmissionPlan3',
                  component:AdmissionPlan3,
                  meta:{
                    title:'专业招生计划查询'
                  }
                },
              ]
            },
            {
              path:'AdmissionQuery',
              name:'AdmissionQuery',
              component:AdmissionQuery,
              meta:{
                title:'录取查询'
              }
            },
            {
              path:'CalendarYearScores',
              name:'CalendarYearScores',
              component:CalendarYearScores,
              meta:{
                title:'历年分数'
              }
            },
            {
              path:'DataImport',
              name:'DataImport',
              component:DataImport,
              meta:{
                title:'数据导入'
              }
            },
            {
              path:'ExportData',
              name:'ExportData',
              component:ExportData,
              meta:{
                title:'数据导出'
              }
            },
            {
              path:'ImportPhoto',
              name:'ImportPhoto',
              component:ImportPhoto,
              meta:{
                title:'导入照片'
              }
            },
            {
              path:'PrintNotice',
              name:'PrintNotice',
              component:PrintNotice,
              meta:{
                title:'打通知书'
              }
            },
            {
              path:'ProfessionalAdjustment',
              name:'ProfessionalAdjustment',
              component:ProfessionalAdjustment,
              meta:{
                title:'专业调整'
              }
            },
            {
              path:'StatisticalQuery',
              name:'StatisticalQuery',
              component:StatisticalQuery,
              meta:{
                title:'统计查询'
              }
            },
            {
              path:'StudentInformation',
              name:'StudentInformation',
              component:StudentInformation,
              meta:{
                title:'学生信息'
              }
            },
            {
              path:'StudentSelf',
              name:'StudentSelf',
              component:empty,
              redirect:'/home/AdmissionPlan/StudentSelf/SetMajor',
              meta:{
                title:'自主招生'
              },
              children:[
                {
                  path:'Approval',
                  name:'Approval',
                  component:Approval,
                  meta:{
                    title:'报名审批'
                  }
                },
                {
                  path:'ScoreEntry',
                  name:'ScoreEntry',
                  component:ScoreEntry,
                  meta:{
                    title:'分数录入'
                  }
                },
                {
                  path:'ParameterSettings',
                  name:'ParameterSettings',
                  component:ParameterSettings,
                  meta:{
                    title:'参数设置'
                  }
                },
                {
                  path:'ScoreAudit',
                  name:'ScoreAudit',
                  component:ScoreAudit,
                  meta:{
                    title:'成绩审核'
                  }
                },
                {
                  path:'SetMajor',
                  name:'SetMajor',
                  component:SetMajor,
                  meta:{
                    title:'可报专业设置'
                  }
                },
                {
                  path:'AdmitisionSettings',
                  name:'AdmitisionSettings',
                  component:AdmitisionSettings,
                  meta:{
                    title:'录取设置'
                  }
                },
              ]
            },
            {
              path:'StudentSelfTest',
              name:'StudentSelfTest',
              component:empty,
              redirect:'/home/AdmissionPlan/StudentSelfTest/SetTestRoom',
              meta:{
                title:'自主招生排考'
              },
              children:[
                {
                  path:'SetTestRoom',
                  name:'SetTestRoom',
                  component:SetTestRoom,
                  meta:{
                    title:'设置考场'
                  }
                },
                {
                  path:'SetTestTeacher',
                  name:'SetTestTeacher',
                  component:SetTestTeacher,
                  meta:{
                    title:'设置监考老师'
                  }
                },
                {
                  path:'SetTestSubjects',
                  name:'SetTestSubjects',
                  component:SetTestSubjects,
                  meta:{
                    title:'设置考试科目'
                  }
                },
                {
                  path:'SetTestTime',
                  name:'SetTestTime',
                  component:SetTestTime,
                  meta:{
                    title:'设置考试场次'
                  }
                },
                {
                  path:'SetTest',
                  name:'SetTest',
                  component:SetTest,
                  meta:{
                    title:'排考'
                  }
                }
              ]
            }
          ]
        },
        {
          path:'SystemManagement',
          name:'SystemManagement',
          component:empty,
          redirect:'/home/SystemManagement/SystemSettings',
          meta: {
            title: '系统管理'
          },
          children:[
            {
              path:'DatabaseBackup',
              name:'DatabaseBackup',
              component:DatabaseBackup,
              meta:{
                title:'数据库备份'
              }
            },
            {
              path:'LogQuery',
              name:'LogQuery',
              component:LogQuery,
              meta:{
                title:'日志查询'
              }
            },
            {
              path:'SystemSettings',
              name:'SystemSettings',
              component:SystemSettings,
              meta:{
                title:'系统设置'
              }
            },
            {
              path:'LicenseManagement',
              name:'LicenseManagement',
              component:LicenseManagement,
              meta:{
                title:'许可证管理'
              }
            },
            {
              path:'PermissionManagement',
              name:'SystemManagement',
              component:empty,
              redirect:'/home/SystemManagement/PermissionManagement/RoleManagement',
              meta: {
                title: '权限管理'
              },
              children:[
                {
                  path:'RoleManagement',
                  name:'RoleManagement',
                  component:RoleManagement,
                  meta:{
                    title:'角色管理'
                  }
                },
                {
                  path:'SetManagement',
                  name:'SetManagement',
                  component:SetManagement,
                  meta:{
                    title:'设置权限'
                  }
                }
              ]
            },
            {
              path:'UserTeacherManagement',
              name:'UserTeacherManagement',
              component:UserTeacherManagement,
              meta:{
                title:'教师用户管理'
              }
            },
            {
              path:'UserStudentManagement',
              name:'UserStudentManagement',
              component:UserStudentManagement,
              meta:{
                title:'学生用户管理'
              }
            },
          ]
        }, 
        {
          path:'WelcomeSystem',
          name:'WelcomeSystem',
          component:empty,
          redirect:'/home/WelcomeSystem/SchoolScenery',
          meta: {
            title: '迎新系统'
          },
          children:[
            {
              path:'EntranceGuide',
              name:'EntranceGuide',
              component:EntranceGuide,
              meta:{
                title:'入学指南'
              }
            },
            {
              path:'GreenRoad',
              name:'GreenRoad',
              component:GreenRoad,
              meta:{
                title:'绿色通道'
              }
            },
            {
              path:'MajorAdjust',
              name:'MajorAdjust',
              component:MajorAdjust,
              meta:{
                title:'专业调整'
              }
            },
            {
              path:'PhoneNumber',
              name:'PhoneNumber',
              component:PhoneNumber,
              meta:{
                title:'电话号码'
              }
            },
            {
              path:'SchoolProfile',
              name:'SchoolProfile',
              component:SchoolProfile,
              meta:{
                title:'校园简介'
              }
            },
            {
              path:'SchoolScenery',
              name:'SchoolScenery',
              component:SchoolScenery,
              meta:{
                title:'校园风采'
              }
            },
            {
              path:'StudentMessage',
              name:'StudentMessage',
              component:StudentMessage,
              meta:{
                title:'学生信息'
              }
            },
            {
              path:'OnlineChat',
              name:'OnlineChat',
              component:empty,
              redirect:'/home/WelcomeSystem/OnlineChat/CommonProblems',
              meta:{
                title:'在线咨询'
              },
              children:[
                {
                  path:'CommonProblems',
                  name:'CommonProblems',
                  component:CommonProblems,
                  meta:{
                    title:'常见问题'
                  },
                },
                {
                  path:'OnlineConsulting',
                  name:'OnlineConsulting',
                  component:OnlineConsulting,
                  meta:{
                    title:'在线咨询'
                  },
                }
              ]
            },
            {
              path:'ForecastReport',
              name:'ForecastReport',
              component:empty,
              redirect:'/home/WelcomeSystem/ForecastReport/ChargingProjects',
              meta:{
                title:'预报到'
              },
              children:[
                {
                  path:'ChargingProjects',
                  name:'ChargingProjects',
                  component:ChargingProjects,
                  meta:{
                    title:'收费项目'
                  },
                },
                {
                  path:'PaymentAmount',
                  name:'PaymentAmount',
                  component:PaymentAmount,
                  meta:{
                    title:'缴费金额'
                  },
                },
                {
                  path:'ReportingProcess',
                  name:'ReportingProcess',
                  component:ReportingProcess,
                  meta:{
                    title:'报道流程'
                  },
                },
                {
                  path:'ReportsLink',
                  name:'ReportsLink',
                  component:ReportsLink,
                  meta:{
                    title:'报道环节'
                  },
                },
                {
                  path:'AccommodationAmount',
                  name:'AccommodationAmount',
                  component:AccommodationAmount,
                  meta:{
                    title:'住宿费金额'
                  },
                }
              ]
            },
            {
              path:'DecisionService',
              name:'DecisionService',
              component:empty,
              redirect:'/home/WelcomeSystem/DecisionService/ForecastStatistics',
              meta:{
                title:'决策服务'
              },
              children:[
                {
                  path:'ForecastStatistics',
                  name:'ForecastStatistics',
                  component:ForecastStatistics,
                  meta:{
                    title:'预报到统计'
                  },
                },
                {
                  path:'ReportStatistics',
                  name:'ReportStatistics',
                  component:ReportStatistics,
                  meta:{
                    title:'报道情况统计'
                  },
                },
              ]
            },
            {
              path:'RegistrationProcess',
              name:'RegistrationProcess',
              component:empty,
              redirect:'/home/WelcomeSystem/RegistrationProcess/RegistrationLink',
              meta:{
                title:'报到流程'
              },
              children:[
                {
                  path:'RegistrationLink',
                  name:'RegistrationLink',
                  component:RegistrationLink,
                  meta:{
                    title:'报道环节'
                  },
                },
                {
                  path:'RegistrationProcess0',
                  name:'RegistrationProcess0',
                  component:RegistrationProcess0,
                  meta:{
                    title:'报道流程'
                  },
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path:'/StudentSelfAdmissionHome',
      name:'StudentSelfAdmissionHome',
      component:StudentSelfAdmissionHome,
      redirect:'/StudentSelfAdmissionHome/application',
      meta:{},
      children:[
        {
          path:'application',
          name:'application',
          component:application,
          meta:{
            title:'报名',
            index:0
          }
        },
        {
          path:'Audit',
          name:'Audit',
          component:Audit,
          meta:{
            title:'审核',
            index:1
          }
        },
        {
          path:'PayCost',
          name:'PayCost',
          component:PayCost,
          meta:{
            title:'缴费',
            index:2
          }
        },
        {
          path:'TestInfo',
          name:'TestInfo',
          component:TestInfo,
          meta:{
            title:'考试信息',
            index:3
          }
        },
        {
          path:'SelfAdmissionQuery',
          name:'SelfAdmissionQuery',
          component:SelfAdmissionQuery,
          meta:{
            title:'查询',
            index:4
          }
        },

      ]
    },    

  ]
})

function getDefaultRouter(node_env, base_Url) {
  var defaultRouter = '/login';
   
  console.log(node_env);
  console.log(base_Url);
  if (node_env === 'production') {
    if (base_Url.indexOf('RecruitStudent') != -1) {
      defaultRouter = '/StudentSelfAdmissionLogin';
    }
  }
  console.log(defaultRouter);
  return defaultRouter;
}

// router.beforeEach((to, from, next) => {
//     console.log(to)
//     console.log(from)
//     next()
// });

export default router 


