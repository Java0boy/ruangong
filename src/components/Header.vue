<template>
  <div class = "header" style="background: rgb(52,52,52);height:100%;min-height: 70px;max-height: 100px" >
    <div class = "content">
      <div class="headleft">
        <!--      <img src="../assets/logoblog.png" width="50" height="50">-->
        <div class="inline" style="width: 30px"></div>
<!--        <div class="inline"><router-link :to="{ path: '/' }"><img src="../assets/logo-circle-title.png" width="45" height="45" style="display: inline-block; vertical-align: middle;"></router-link></div>-->
        <div class="inline" style="width: 10px"></div>
        <div class="inline"><router-link :to="{ path: '/' }"><img src="../assets/logo-test-title.png" height="40" style="display: inline-block; vertical-align: middle;"></router-link></div>
        <div class="inline" style="width: 40px"></div>
<!--        <button class="button button-large button-plain button-border button-box"><i class="fa fa-star"></i></button>-->
        <router-link :to="{name: 'Post', params:{type:'blog', keyword: 'all'}}"><div class="inline"><div class="headtext">所有文章</div></div></router-link><!--这个东西暂时不能用了 -->
<!--        <div class="inline"><router-link :to="{ path: '/Post' }"><el-button round>圆角按钮</el-button></router-link></div>-->

      </div>
      <div class="headright">

        <div class="inline">
          <span class="inputSearch" id="searchInput"><input class="searchbox" v-model="formInline.keyword" @keyup.13="searchUser"></input></span>
        </div>
<!--        <div class="inline">-->
<!--          <div class="searchicon" @click="searchUser"></div>-->
<!--        </div>-->
        <div class="inline" style="width: 30px">
          <div class="usericon" @click="gouser"></div>
        </div>

        <div class="inline">



<!--          <div class="inline" v-if="yonghuming=='00000000000'">-->
<!--            <router-link :to="{ path: '/Login' }"><button class = "headtext">登录</button></router-link>-->
<!--          </div>-->
<!--          <div class="inline" v-else>-->
<!--            <router-link :to="{ path: '/Login' }"><button class = "headtext">{{Global.sso_flag}}</button></router-link>-->
<!--          </div>-->
          <div class="inline" >
<!--            <router-link :to="{ path: '/Login' }"><button class = "headtext" id="headButton">登录</button></router-link>-->
            <button class = "headtext" id="headRightButton" @click="changeUserStatus">登录</button>
<!--
          <div class="inline">
            <router-link :to="{ path: '/Login' }"><button class = "headtext" id="headButton">登录</button></router-link>
-->
          </div>
<!--          <div class="inline" v-else>-->
<!--            <button class = "headtext" id="headButton" @click="zhuxiao()">注销</button>-->
<!--          </div>-->
        <div class="inline" style="width: 30px"></div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  import Global from "../tool/Global";

    export default {
        data(){
            return {
                formInline:{
                    keyword: '',
                },
                //yonghuming:Global.sso_flag,


            }
        },

        methods: {
            searchUser() {
                if (this.formInline.keyword.trim().length == 0)
                {
                    this.$message.error('请输入检索关键词');
                }
                else {
                    this.$router.push({name: 'Post', params: {type: 'user', keyword: this.formInline.keyword}});
                    window.location.reload();
                }
            },


          changeUserStatus()
          {
            // Global.log()
            if(localStorage.getItem('user') == null)
            {
                this.$router.push({path: '/Login'});
            }
            else
            {
                localStorage.removeItem('user');
                this.$router.push({path:'/Home'});
            }
            window.location.reload();


          },

            gouser(){
                if (localStorage.getItem('user') == null)
                {
                    this.$router.push({name: 'Login'});
                }
                else
                {
                    this.$router.push({name: 'UserPage', params:{username: localStorage.getItem('user')}});
                }

            },

            updateButtonText()
            {
                this.$nextTick(()=>{
                    var buttonText = document.getElementById('headRightButton');

                    if (buttonText) {
                        if (localStorage.getItem('user') == null) {
                            buttonText.innerHTML = '登录';
                        } else {
                            buttonText.innerHTML = '注销';
                        }

                    }
                    else
                    {

                    }
                });

            },


        },


        created()
        {
            this.$root.Bus.$on('changeStatus', value => {
                this.updateButtonText();
            })
        },

        beforeDestroy() {
            this.$root.Bus.$off('changeStatus');
        },


    };


 </script>

<style scoped>
  @import '../style/Buttons.css';
  .header{
    /*text-align: center;*/
    line-height: 70px;
    /*direction:rtl;*/
  }
  .content {
    display: table;
    width: 100%;
    height: 70px;
  }
  .inline{
    vertical-align:middle;
    display: inline-table;
  }
  .headleft{
    /*float: left;*/
    /*margin-left: 20px;*/
    /*width: 400px;*/
    /*height: 60px;*/
    /*display: inline-block;*/
    /*text-align: left;*/
    /*vertical-align: middle;*/
    /*line-height: 60px;*/
    /*direction: ltr;*/
    display: table-cell;
    *display: inline-block;
    zoom: 1;
    text-align: left;
    background: black;
  }
  .headright{
    /*float: right;*/
    /*margin-right: 15px;*/
    /*width: 430px;*/
    /*height: 60px;*/
    /*text-align: center;*/
    /*line-height: 60px;*/
    display: table-cell;
    *display: inline-block;
    zoom: 1;
    text-align: right;
    background: black;
  }
  .headlogo{
    width: 150px;
    height: 100%;
    font-size: 45px;
    color: white;
    font-style: italic;
    vertical-align:middle;
    margin: 0;
  }
  .headtext{
    outline:none;
    font-family: "Yu Gothic UI";
    font-size: 15px;
    height: 35px;
    width:100px;
    border-radius: 30px;
    background: rgba(0,0,0,0);
    text-align: center;
    vertical-align:middle;
    line-height: 35px;
    color: white;
    border: 2px solid white;
    transition: background-color 0.2s ease,border-width 0.2s ease,border-radius 0.2s ease;
  }
  .headtext:hover{

    background: #a6dadd;
    color: #343434;
    border: 2px solid #a6dadd;

  }
  .headtext:active{

    border-radius: 35px;
    background: white;
    color: #343434;
    border: 2px solid transparent;
    /*border: 0px solid white;*/
  }
  .loginbottom {

    height: 35px;
    width:100px;
    border-radius: 30px;
    background: rgba(0,0,0,0);
    text-align: center;
    vertical-align:middle;
    line-height: 35px;
    color: white;
    border: 2px solid #ebefe4;
  }
  .searchbox {
    outline:none;
    placeholder:"回车搜索";
    /*font-family: "Yu Gothic UI";*/
    text-align: left;
    color: rgba(255,255,255,0);
    margin-right: 15px;
    height: 35px;
    width: 35px;
    border-radius:15px;
    vertical-align:middle;
    background: url("../assets/icon-search.png");
    background-repeat: no-repeat;
    background-size: 25px 25px;
    background-position: center;
    /*background: rgba(106, 160, 178, 1);*/
    border: 2px solid white;

    font-size: 18px;
    padding-left: 5px;
    transition: border-color 0.5s ,border-right-width 0.5s , color 0.5s,width 1s ease;

    /*background-image: url("../assets/icon-search.png");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 20px;*/
    /*background-position-y: center;*/
    /*background-position-x: 172px;*/
  }
  .searchbox:hover{
    background: rgba(255, 255, 255, 0);
    border-color: #a6dadd;

    color: #a6dadd;
    width: 200px;
  }
  .iconuser{
    position: absolute;
    left: 0;
    z-index:5;
    background-image: url("../assets/icon-user.png"); /*引入图片图片*/
    background-repeat: no-repeat; /*设置图片不重复*/
    background-position: 0px 0px; /*图片显示的位置*/
    width: 20px; /*设置图片显示的宽*/
    height: 20px; /*图片显示的高*/
  }
  .searchimg{
    margin-left: 50px;
    /*float: left;*/
    display: inline-block;
    vertical-align: middle;
  }
  .usericon{

    margin-top: 4px;
    width: 40px;
    height: 40px;
    background-image: url("../assets/icon-user.png");
    background-repeat:no-repeat;
    background-size:90% 90%;
    /*-moz-background-size:90% 90%;*/
  }
  .usericon:hover{
    background-image: url("../assets/icon-user-active.png");
  }
  .usericon:active{
    background-image: url("../assets/icon-user-hover.png");
  }

  .searchicon{
    margin-top: 4px;

    margin-left: -15px;
    width: 40px;
    height: 40px;
    background-image: url("../assets/icon-search.png");
    background-repeat:no-repeat;
    background-size:70% 70%;
    background-position: center;
    /*-moz-background-size:90% 90%;*/
  }
  .searchicon:hover{
    background-image: url("../assets/icon-search-hover.png");
  }
  .searchicon:active{
    background-image: url("../assets/icon-search-cative.png");
  }

  /*#searchInput{float: right;width:235.25px;}*/
  /*#searchInput .form-control{border: 1px solid #AAAAAA;}*/
  /*#searchInput .search{border: 1px solid #0088CF;}*/
  /*#searchTubiao{float:right;font-size:16px;margin-left:-50px;margin-top:2px;}*/
  /*#searchTubiao a{color:#AAAAAA;text-decoration:none;}*/
  /*#searchTubiao a:hover {text-decoration:none;color: #0088CF;}*/
  /*!*#searchTubiao .tubiao{color: #0088CF;}*!*/
</style>
