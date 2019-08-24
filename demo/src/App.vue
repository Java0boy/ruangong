<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
    import Login from './components/Login';
    import MdEditor from "./components/MdEditor";
    import Signup from "./components/Signup";
    import BlogPage from "./components/BlogPage";
    export default {
        name: 'App',
        components: {
            'MdEditor': MdEditor,
            'Login': Login,
            'Signup': Signup,
            'BlogPage': BlogPage,
        },
        data() {
            return {}
        }
    }
</script>
<style>
  #app {
    text-align: center;
    margin-top:30px ;
  }
</style>
