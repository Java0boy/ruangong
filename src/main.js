// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
import crypto from 'crypto'


Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
import 'iview/dist/styles/iview.css' // 使用 CSS
Vue.use(iView)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import Login from './components/Login'
import MdEditor from "./components/MdEditor";
import VueRouter from 'vue-router';
import Signup from './components/Signup';
import BlogPage from "./components/BlogPage";
import MdEditorExsited from "./components/MdEditorExsited";
import Home from './components/Home';
import User from './components/User';
import Post from './components/Post';
Vue.use(VueRouter);

//定义路由
const routes = [
  {path:'/',component:Home},
  { path: '/Login', name: 'Login', component: Login },
  { path: '/:username/MdEditor', name: 'MdEditor', component: MdEditor},
  {path:'/Signup', name: 'SignUp', component:Signup},
  {path: '/:username/:blogId', name : 'SingleBlog', component: BlogPage},
  {path: '/:username/MdEditor/:blogId', name: 'MdEditorExsited', component: MdEditorExsited},
  {path: '/Home', name: 'Home', component: Home},
  {path: '/:username', name: 'UserPage', component: User},
  {path: '/Post', name: 'Post', component: Post},


]


//创建 router 实例，然后传 routes 配置
const router=new VueRouter({
  routes: routes
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // Bus中央事件总线
  data:
  {
    Bus: new Vue()
  }
})
