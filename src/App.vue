<template>
  <div id="app">
    <el-container style="background:#f1f1f1; ">
      <el-header class="fixed" style='padding: 0;-webkit-box-shadow: 0 0 10px 0px rgba(0,0,0,.1);' >
        <!-- 导航栏 -->
        <header-nav></header-nav>
      </el-header>
<!--      <el-container>-->
      <el-main  style ="padding: 70px 0px 0px; background: #343434;">
          <!-- Body -->
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>

<!--        <components :is = "Footer"></components>-->
<!--        <footer-nav></footer-nav>-->
<!--        <li v-for="food in foodList">{{food.name}}: ￥{{food.price}}</li>-->
      </el-main>
<!--      <el-main style='padding: 0;'>-->
<!--        -->
<!--      </el-main >-->
<!--      </el-container>-->
    </el-container>
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
    import Login from './components/Login'
    import MdEditor from "./components/MdEditor";
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    export default {
        name: 'App',
        components: {
            'MdEditor': MdEditor,
            'Login': Login,
            'Footer': Footer,
            headerNav: Header,
        },
        data() {
            return {}
        }
    }
</script>
<style>
  #app {

  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
    background: rgba(235, 239, 228, 0.05);
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  }
  .fixed{
    position: fixed;
    top: 0px;
    z-index: 99;
    width: 100%;
  }
  html,body,#app,.el-container,.el-main{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .slide-fade{
    position: absolute;left:0;right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1.2s ease;
  }
  .slide-fade-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
  }

</style>
