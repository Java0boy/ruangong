import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Home from "../components/Home";
import Login from "../components/Login";
import MdEditor from "../components/MdEditor";
import Signup from "../components/Signup";
import Post from "../components/Post";
import User from "../components/User";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/Post',
      component: Post
    },

    {
      path:'/User/:id',
      component: User
    },
    { path: '/Login',
      component: Login
    },
    {
      path: '/MdEditor',
      component: MdEditor
    },
    {
      path: '/Signup',
      component:Signup
    },
  ],
  mode:"history"
})
