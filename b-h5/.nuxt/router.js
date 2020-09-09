import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5622aabb = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */))
const _95efdbc0 = () => interopDefault(import('..\\pages\\error.vue' /* webpackChunkName: "pages_error" */))
const _bca3ece0 = () => interopDefault(import('..\\pages\\member\\index.vue' /* webpackChunkName: "pages_member_index" */))
const _7dc04a48 = () => interopDefault(import('..\\pages\\salesman\\index.vue' /* webpackChunkName: "pages_salesman_index" */))
const _35a5f6c4 = () => interopDefault(import('..\\pages\\member\\buy.vue' /* webpackChunkName: "pages_member_buy" */))
const _2b676dfb = () => interopDefault(import('..\\pages\\member\\login\\index.vue' /* webpackChunkName: "pages_member_login_index" */))
const _b15c61a2 = () => interopDefault(import('..\\pages\\salesman\\login\\index.vue' /* webpackChunkName: "pages_salesman_login_index" */))
const _68f6de82 = () => interopDefault(import('..\\pages\\salesman\\member\\index.vue' /* webpackChunkName: "pages_salesman_member_index" */))
const _16fdb659 = () => interopDefault(import('..\\pages\\salesman\\register\\index.vue' /* webpackChunkName: "pages_salesman_register_index" */))
const _18da565e = () => interopDefault(import('..\\pages\\salesman\\member\\add.vue' /* webpackChunkName: "pages_salesman_member_add" */))
const _7141f3ea = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _5622aabb,
    name: "admin"
  }, {
    path: "/error",
    component: _95efdbc0,
    name: "error"
  }, {
    path: "/member",
    component: _bca3ece0,
    name: "member"
  }, {
    path: "/salesman",
    component: _7dc04a48,
    name: "salesman"
  }, {
    path: "/member/buy",
    component: _35a5f6c4,
    name: "member-buy"
  }, {
    path: "/member/login",
    component: _2b676dfb,
    name: "member-login"
  }, {
    path: "/salesman/login",
    component: _b15c61a2,
    name: "salesman-login"
  }, {
    path: "/salesman/member",
    component: _68f6de82,
    name: "salesman-member"
  }, {
    path: "/salesman/register",
    component: _16fdb659,
    name: "salesman-register"
  }, {
    path: "/salesman/member/add",
    component: _18da565e,
    name: "salesman-member-add"
  }, {
    path: "/",
    component: _7141f3ea,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
