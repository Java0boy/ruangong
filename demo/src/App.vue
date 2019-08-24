<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
    import Login from './components/Login'
    import MdEditor from "./components/MdEditor";
    export default {
        name: 'App',
        components: {
            'MdEditor': MdEditor,
            'Login': Login
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
