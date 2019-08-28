<template>
  <div>

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
        <h1 class="title">{{article.title}}</h1>
        <div class="status">发布于：{{article.date}}， 作者：{{article.username}} <!--| 阅读：3500 | 标签：#HTML #CSS--></div><!--暂时还没有前面那些东西 -->
        <div class="content">
          <router-link :to="{name: 'MdEditorExsited', params: {username: this.$route.params.username, blogId: this.$route.params.blogId}}"><Button type="primary">Edit</Button></router-link>
          <div id="layout">
            <div id="articleView" >
              <div v-html="article.blogHtml">
                {{article.blogHtml}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
  import Global from "../tool/Global";
    export default {
        data() {
            return {
                article: {},
                formInline: {
                    keyword: '',
                },
            }
        },


                methods: {


                    getArticle() {

                        var _this = this;
                        //var articleId = window.sessionStorage.getItem("articleId");
                        var _blogId = _this.$route.params.blogId;
                        console.log(_blogId);
                        this.$axios({
                            url: '/rest/getBlog',//请求的地址
                            method: 'post',//请求的方式
                            data: {
                                title: '',
                                username: '',
                                date: '',
                                blogMd: '',
                                blogHtml: '',
                                id: _blogId,

                            },//请求的表单数据
                        }).then(res => {
                            if (res.data != null) {
                                this.article = res.data;
                                this.$nextTick(() => {
                                    let editorView = editormd.markdownToHTML("articleView", {
                                        htmlDecode: "style,script,iframe",  // you can filter tags decode
                                        emoji: true,
                                        taskList: true,
                                        tex: true,  // 默认不解析
                                        flowChart: true,  // 默认不解析
                                        sequenceDiagram: true,  // 默认不解析
                                        path: '/static/editor.md-master/lib/',
                                    });
                                });

                            }
                        });

                    },
                    handleSubmit() {
                        this.$axios({
                            url: '/rest/getUserMessage',//请求的地址
                            method: 'post',//请求的方式
                            data: {userName: this.formInline.keyword, password: ''},//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                            if (res.data) {
                                console.log(res.data)
                                this.$router.push({name: 'UserPage', params: {username: res.data}})
                            }
                        }).catch(err => {
                            console.info('报错的信息', err.response.message);
                        });

                    },
                },

                created() {
                    var _this = this;
                    _this.getArticle();
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
    background: #fbfff3;
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
    margin-right: 30%;
    background: #fff;
    padding: 20px 30px;
    -webkit-box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
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

</style>
