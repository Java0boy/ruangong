<template>


  <div class="postbody">
    <div class="side-bar">
      <div class="header">
        <!--        <a href="index.html" class="logo">BLOG</a>-->
        <div class="intro">软工小学期.第一轮迭代~~~</div>
      </div>
      <div class="nav">
        <a href="#" class="item">关于我们</a>
        <a href="#" class="item">联系我们</a>
        <a href="#" class="item">赞助我们</a>
      </div>
    </div>
    <div class="main">
      <div class="article">
        <div class="hello">
          <h1>上传资源</h1>
          <div style="height:20px;width: 100%"></div>
<!--          <form>-->
<!--          <div id="my-upload" class="button button-primary button-pill button-small" @click="clickupload();"></div>-->
          <div class="file">
            <input id="old-upload" type="file" @change="getFile($event)">上传文件</div>
          </div>
            <input style="text-align:center;width: 300px;border: 0;outline: none" value="<--文件详情-->" id="filename"></input>
            <input style="text-align:center;width: 300px;border: 0;outline: none" value="<--文件详情-->" id="filesize"></input>
          <br>
          <button class="headtext" @click="submit($event)">提交</button>
<!--          </form>-->
<!--          <a href="rest/files/Lonely.gp5" download="Lonely.gp5">下载一个东西</a>-->
        </div>

      </div>
    </div>
  </div>

</template>


<script>
    import axios from 'axios';
  import Global from "../tool/Global";
    export default {
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                file: ''
            }
        },


                methods: {
                    getFile: function (event) {
                        this.file = event.target.files[0];
                        console.log(this.file);
                        // -----------
                        document.getElementById("filename").value="filename-->"+this.file.name;
                        document.getElementById("filesize").value="size-->"+this.file.size;
                    },
                    submit: function (event) {
                        //阻止元素发生默认的行为
                        event.preventDefault();
                        let formData = new FormData();
                        formData.append("file", this.file);
                        axios.post('rest/singlefile', formData)
                            .then(function (response) {
                                alert(response.data);
                                console.log(response);
                                window.location.reload();
                            })
                            .catch(function (error) {
                                alert("上传失败");
                                console.log(error);
                                window.location.reload();
                            });
                    }

                },



                created() {
                    // this.$root.Bus.$emit('changeStatus', '');
                    // var _this = this;
                    // _this.getArticle();
                    // _this.getComment();
                    // if (this.$route.params.ret)
                    // {
                    //     this.goodText = this.$route.params.ret;
                    // }
                    // else
                    // {
                    //     this.$route.params.ret = '点赞';
                    // }
                    // this.EditButton();
                },

            }
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
  .isline{
    height: 1px;
    width: 100%;
    background: rgb(0, 0, 0,0.3);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .commitbox{
    outline: none;
    width: 85%;
    height: 50px;
    background: #f1f1f1;
    border-radius: 15px;
    border: 0px;
    position: center;
  }
  .commitup{
    height: 30px;
    width: 15%;
    background: transparent;
    border-radius: 15px;
    border: 1px solid black;
    color: black;
    margin: 0 auto;
    overflow: hidden;
  }
  .commitup:hover{
    background: #a6dadd;
    border: 1px solid #a6dadd;
    color: white;
    margin: 0 auto;
    overflow: hidden;
  }
  .commitup:active{
    background: black;
    border: 1px solid black;
    color: white;
    margin: 0 auto;
    overflow: hidden;
  }

  .fabiaopinglun{
    display: inline-block;
    *display: inline;
    *zoom: 1;
    vertical-align: middle;
  }

  .content-3{
    border-left: 5px solid #a6dadd;
    text-align: left;
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
  #layout{
    text-align: left;
  }
  .postbody {
    background: #f1f1f1;
    /*line-height: 1.7;*/
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  a, body {
    color: #9fc6dc;
  }
  .itemis{
    margin-left: 10px;
    margin-top: 30px;

  }
  .side-bar {
    float: left;
    width: 20%;
    position: fixed;
  }

  .side-bar > * {
    padding: 10px 15px;
  }

  .side-bar .nav a,
  .side-bar .tag-list a {
    display: block;
    padding: 5px;
    color: #888;
    -webkit-transition: color 200ms;
    -o-transition: color 200ms;
    transition: color 200ms;
  }

  .side-bar .nav a:hover,
  .side-bar .tag-list a:hover {
    color: #9fc6dc;
  }

  .side-bar .nav a {
    font-weight: 700;
  }

  .main {
    float: right;
    width: 80%;
    color: #454545;
  }

  .header .logo {
    line-height: 1;
    border: 5px solid #eee;
    padding: 10px 20px;
    font-size: 30px;
    display: inline-block;
    margin-bottom: 10px;
  }

  .article-list, .article {
    border-top: 5px solid black;
    margin-top: 20px;
    margin-right: 30%;
    background: #fff;
    padding: 10px 30px;
    -webkit-box-shadow: 0 0 10px 0px rgba(0,0,0,.1);
    box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
  }

  .article-list .item  {
    margin-bottom: 25px;
  }

  .article-list .item .title,
  .article .title {
    color: #454545;
    font-size: 22px;
    font-weight: 700;
  }

  .article-list .item .status,
  .article .status {
    font-size: 13px;
    color: #ccc;
  }

  .article-list .item > *,
  .article > * {
    margin: 10px 0;
  }
  .content{
    font-size: 15px;
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
    color: black;
    border: 1px solid black;
    transition: background-color 0.2s ease,border-width 0.2s ease,border-radius 0.2s ease;
  }
  .headtext:hover{


    background: #a6dadd;
    color: white;
    border: 1px solid #a6dadd;
  }
  .headtext:active{

    border-radius: 35px;
    background: black;
    color: white;
    border: 1px solid black;
    /*border: 0px solid white;*/
  }
  .file {
    position: relative;
    display: inline-block;
    background: transparent;
    border: 1px solid #343434;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #343434;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;

  }
  .file:hover {
    background: #a6dadd;
    border-color: #a6dadd;
    color: white;
    text-decoration: none;
  }


</style>
