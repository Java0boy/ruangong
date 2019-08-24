// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
Vue.use(iView)

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

import Login from './components/Login'
import MdEditor from "./components/MdEditor";
import VueRouter from 'vue-router';
import Signup from './components/Signup';
import BlogPage from "./components/BlogPage";
Vue.use(VueRouter);


//定义路由
const routes = [
  {path:'/',component:Login},
  { path: '/Login', name: 'Login', component: Login },
  { path: '/:username/MdEditor', name: 'MdEditor', component: MdEditor},
  {path:'/Signup', name: 'SignUp', component:Signup},
  {path: '/:username/:blogId', name : 'SingleBlog', component: BlogPage},
]


//创建 router 实例，然后传 routes 配置
const router=new VueRouter({
  mode: 'history',
  routes: routes
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
