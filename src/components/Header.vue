<template>
  <div class = "header" style="background: rgb(166,218,221);height:100%;min-height: 70px;max-height: 100px" >
    <div class = "content">
      <div class="headleft">
        <!--      <img src="../assets/logoblog.png" width="50" height="50">-->
        <div class="inline" style="width: 30px"></div>
        <div class="inline"><router-link :to="{ path: '/' }"><img src="../assets/logo-circle-title.png" width="45" height="45" style="display: inline-block; vertical-align: middle;"></router-link></div>
        <div class="inline" style="width: 10px"></div>
        <div class="inline"><router-link :to="{ path: '/' }"><img src="../assets/logo-test-title.png" height="40" style="display: inline-block; vertical-align: middle;"></router-link></div>
        <div class="inline" style="width: 40px"></div>
<!--        <button class="button button-large button-plain button-border button-box"><i class="fa fa-star"></i></button>-->
        <div class="inline"><router-link :to="{ name: 'Post' }"><div class="headtext">所有文章</div></router-link></div>
<!--        <div class="inline"><router-link :to="{ path: '/Post' }"><el-button round>圆角按钮</el-button></router-link></div>-->

      </div>
      <div class="headright">

        <div class="inline">
          <span class="inputSearch" id="searchInput"><input class="searchbox" v-model="formInline.keyword"></input></span>
        </div>
        <div class="inline">
          <div class="searchicon" @click="handleSubmit"></div>
        </div>
        <div class="inline" style="width: 30px">
        </div>

        <div class="inline">
<!--          <router-link :to="{ path: '/User/1' }"><img class = "usericon" src="../assets/icon-user.png" width="40" height="40" style="display: inline-block; vertical-align: middle;"></router-link>-->
<!--          <div class="usericon" @click=""></div>-->


<!--          <div class="inline" v-if="yonghuming=='00000000000'">-->
<!--            <router-link :to="{ path: '/Login' }"><button class = "headtext">登录</button></router-link>-->
<!--          </div>-->
<!--          <div class="inline" v-else>-->
<!--            <router-link :to="{ path: '/Login' }"><button class = "headtext">{{Global.sso_flag}}</button></router-link>-->
<!--          </div>-->
          <div class="inline">
            <router-link :to="{ path: '/Login' }"><button class = "headtext">{{yonghuming}}</button></router-link>
          </div>


        <div class="inline" style="width: 30px"></div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  import Global from "../tool/Global";
//     $("#search").focus(function(){
//         $("#search").addClass("search");
//         // $("#tubiao").addClass("tubiao");
//     });
//
//     $("#search").blur(function(){
//         $("#search").removeClass("search");
//         // $("#tubiao").removeClass("tubiao");
//      });
    export default {
        data(){
            return {
                formInline:{
                    keyword: '',
                },
                yonghuming:Global.sso_flag

            }
        },
        methods: {
            handleSubmit() {
                this.$axios({
                    url: '/rest/getUserMessage',//请求的地址
                    method: 'post',//请求的方式
                    data: {userName: this.formInline.keyword, password: ''},//请求的表单数据
                }).then(res => {
                    console.info('后台返回的数据', res.data);
                    if (res.data)
                    {
                        console.log(res.data)
                        this.$router.push({name: 'UserPage', params:{username: res.data}})
                    }
                }).catch(err => {
                    console.info('报错的信息', err.response.message);
                });

            },
        }
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
    background: #a6dadd;
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
    background: #a6dadd;
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
    transition: background-color 0.3s ease,border-width 0.3s ease,border-radius 0.3s ease;
  }
  .headtext:hover{

    background: white;
    color: #a6dadd;
    border: 2px solid white;

  }
  .headtext:active{

    border-radius: 10px;
    background: #6e9aa6;
    color: #ffffff;
    border: 0px solid white;
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
    font-family: "Yu Gothic UI";
    text-align: left;
    color: white;
    margin-right: 15px;
    height: 35px;
    width: 200px;
    border-radius:15px;
    vertical-align:middle;
    background: rgba(106, 160, 178, 0);
    border: 2px solid white;

    font-size: 18px;
    padding-left: 5px;
    transition: border-color 0.5s ,border-right-width 0.5s , color 0.5s;

    /*background-image: url("../assets/icon-search.png");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 20px;*/
    /*background-position-y: center;*/
    /*background-position-x: 172px;*/
  }
  .searchbox:hover{
    border-color: #6AA0B2;

    color: #6AA0B2;
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
    background-image: url("../assets/icon-user-hover.png");
  }
  .usericon:active{
    background-image: url("../assets/icon-user-active.png");
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
