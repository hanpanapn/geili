
// import cn from "../i18n/lang/cn"
import Vue from "vue"
import Router from "vue-router"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import HomeMain from "@/views/index/mainIndex"

// 不是必须加载的组件使用懒加载
const NotFound = () => import("@/views/page404")

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

// let roleName = cn.routeName
//路由中的children: [] d对象是必须要加的，删掉后有个找不到的地方报错
let defaultRouter = [
  {
    path: "/",
     name: "默认",
    redirect: "/index",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "登录",
    hidden: true,
    children: []
  },
  {
    path: "/",
    iconCls: "fa fa-dashboard", // 图标样式class
    name: '系统主页1',
    component: Layout,
    alone: true,
    children: [
      {
        path: "/index",
        iconCls: "fa fa-dashboard", // 图标样式class
        name: "主页",
        component: HomeMain,
        children: []
      }
    ]
  },
  
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]

let addRouter = [
 
  //商品管理
  {
    r_id: 100082,
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: "商品管理",
    component: () => import("@/views/layout/layout"),
    children: [
       {
        r_id: 100085,
        path: "/goodlist",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "商品列表",
        component: () => import("@/views/good/index"),
        children: []
      },
       {
        r_id: 100084,
        path: "/goodcategory",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "商品分类",
        component: () => import("@/views/goodcategory/index"),
        children: []
      },

    ]
  },
 
  {
    r_id: 100086,
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: "客户管理",
    component: () => import("@/views/layout/layout"),
    children: [
       {
        r_id: 100087,
        path: "/memberlist",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "客户列表",
        component: () => import("@/views/member/index"),
        children: []
      },
    ]
  },
  {
    r_id: 100088,
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: "订单管理",
    component: () => import("@/views/layout/layout"),
    children: [
       {
        r_id: 100089,
        path: "/orderlist",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "订单列表",
        component: () => import("@/views/order/index"),
        children: []
      },
    ]
  },
  {
    r_id: 100090,
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: "业务员管理",
    component: () => import("@/views/layout/layout"),
    children: [
       {
        r_id: 100091,
        path: "/salesman",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "业务员列表",
        component: () => import("@/views/salesman/index"),
        children: [
          {
            r_id: "btn_100092",
            name: "btn:增加",
            path: "",
            type: "button",
            children: []
          }
        ]
      },
      {
        r_id: 100092,
        path: "/salesmanmoney",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "业务员提成",
        component: () => import("@/views/salesmanmoney/index"),
        children: []
      },
    ]
  },
 
  {
    r_id: 100000,
    
    path: "/",
    iconCls: "fa fa-universal-access", // 图标样式class
    name: "系统管理",
    component: () => import("@/views/layout/layout"),
    children: [
      {
        r_id: 100005,
        
        path: "/roleManage",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "角色管理",
        component: () => import("@/views/systemManage/roleManage"),
        children: [
          {
            r_id: "btn_100002",
            name: "btn:增加",
            path: "",
            type: "button",
            children: []
          }
        ]
      },
      {
        r_id: 100029,
      
        path: "/userList",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "用户列表",
        component: () => import("@/views/user/userList"),
        children: []
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
    children: []
  }
]

export default new Router({
  routes: defaultRouter
})
export { defaultRouter, addRouter }
