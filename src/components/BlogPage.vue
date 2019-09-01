<template>


  <div class="postbody" id="PostBody">
    <div class="side-bar">
      <div class="header" >
        <!--        <a href="index.html" class="logo">BLOG</a>-->
        <div class="intro">软工小学期 / 第二次迭代</div>
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
        <div class="status">发布于：{{article.date}}<!--| 阅读：3500 | 标签：#HTML #CSS--></div><!--暂时还没有前面那些东西 -->
        <div  class="status">作者：{{article.username}}，浏览量：{{article.liulancount}}，点赞量：{{article.dianzancount}}</div>
        <!--        ，浏览量：{{article.liulancount}}，点赞量：{{article.dianzancount}}-->
        <div class="content">
          <!--          <div class="isline"></div>-->
          <router-link :to="{name: 'MdEditorExsited', params: {username: this.$route.params.username, blogId: this.$route.params.blogId}}">
            <button class="headtext" id="editButton" style="margin-right: 10px">Edit</button>
          </router-link>

          <button class="headtext" @click="toDianzan" id="dianzanButton" >{{this.goodText}}</button>
          <div class="isline"></div>
          <div id="layout">
            <div id="articleView" >
              <div v-html="article.blogHtml">
                {{article.blogHtml}}
              </div>
            </div>
          </div>

        </div>
        <div class="isline" style="margin-bottom: 20px"></div>

        <div style="width:100%;display: table">
          <input style="padding-left:15px;display: table-cell" class="commitbox" v-model="comment.content"></input>
          <div style="display: table-cell"  class="commitup">
            <span class="fabiaopinglun" @click="sendComment">发表<br>评论</span>
          </div>
<!--          <div style="width: 10%;height: 100%"></div>-->
        </div>

<!--        v-for-->

        <div class="content-3" v-for="comment1 in comments">
          <div class="itemis">
            <div class="commitname" style="font-size: 10px;font-style: italic;color: rgba(0,0,0,0.51)">{{comment1.username}}</div>
            <div class="commitcontent" style="font-size: 15px">{{comment1.comment}}</div>
            <div class="status"style="font-size: 12px">{{comment1.date}}</div>
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
                comment: {
                    content: '',
                },
                comments:{},
                goodText: '点赞',
            }
        },


                methods: {
                    toDianzan()
                    {
                        if(localStorage.getItem('user') == null)
                            this.$router.push({path: '/Login'});
                        else
                        {
                            if(this.goodText=="点赞")
                            {
                                //////////////////////////
                                //console.log(Global.sso_flag);
                                //console.log(this.$route.params. blogId);
                                this.$axios({
                                    url:'/rest/dianzan',
                                    method:'post',
                                    data:{
                                        dianzan:localStorage.getItem('user'),dianzaned:this.$route.params.blogId,
                                    }
                                }).then(res=>
                                {
                                    //console.log(res.data);
                                    if(res.data)
                                    {
                                       //console.log(Global.sso_flag);
                                        //console.log(this.$route.params. blogId);
                                        this.$Message.success('点赞成功');
                                    }
                                    else
                                    {
                                        this.$Message.warning('点赞失败');
                                    }
                                });

                                /////////////////////////
                                // console.log(Global.sso_flag);
                                // console.log(this.$route.params.blogId);
                                // this.$Message.success('点赞成功');
                                // document.getElementById('dianzanButton').innerHTML="取消点赞";
                                ////////////////////


                            }
                            else if(this.goodText=="取消点赞")
                            {
                                //////////////////

                                this.$axios({
                                    url:'/rest/quxiaodianzan',
                                    method:'post',
                                    data:{
                                        dianzan:localStorage.getItem('user'),dianzaned:this.$route.params. blogId,
                                    }
                                }).then(res=>
                                {
                                    //console.log(res.data);
                                    if(res.data)
                                    {
                                        //console.log(Global.sso_flag);
                                        //console.log(this.$route.params. blogId);
                                        this.$Message.success('取消成功');
                                    }
                                    else
                                    {
                                        this.$Message.warning('取消失败');
                                    }

                                });

                                ///////////////////////////
                                // console.log(Global.sso_flag);
                                //     console.log(this.$route.params.blogId);
                                //     this.$Message.success('取消成功');
                                //     document.getElementById('dianzanButton').innerHTML="点赞";
                                ///////////////

                            }
                        }
                        window.location.reload();
                    },

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

                    sendComment()
                    {
                        if(localStorage.getItem('user') == null)
                        {
                            this.$router.push({name:'Login'});
                        }
                        else
                        {
                            if (this.comment.content.trim().length == 0)
                            {
                                this.$message.error('请输入评论内容');
                            }
                            else
                            {
                                var timestamp=new Date().getTime();
                                var _id= timestamp + localStorage.getItem('user');
                                this.$axios({
                                    url: '/rest/postComment',//请求的地址
                                    method: 'post',//请求的方式
                                    data: {
                                        username: localStorage.getItem('user'),
                                        date: Date().toString(),
                                        comment: this.comment.content,
                                        id: _id,
                                        blogId: this.$route.params.blogId,

                                    },//请求的表单数据
                                }).then(res => {
                                    //console.info('发送评论: 后台返回的数据', res.data);
                                    if (res.data) {
                                        this.$message.success('评论发表成功');

                                    }
                                }).catch(err => {
                                    console.info('报错的信息', err.response.message);
                                });

                            }
                        }
                        window.location.reload();
                    },

                    getComment()
                    {
                        var _this = this;
                        //var articleId = window.sessionStorage.getItem("articleId");
                        var _blogId = _this.$route.params.blogId;
                        this.$axios({
                            url: '/rest/getComment',//请求的地址
                            method: 'post',//请求的方式
                            data: {
                                id: this.$route.params.blogId,

                            },//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                            if (res.data) {
                                this.comments = res.data;
                                console.log(res.data);
                            }
                        }).catch(err => {
                            console.info('报错的信息', err.response.message);
                        });
                    },

                    EditButton()
                    {
                        this.$nextTick(()=>{
                            var button = document.getElementById('editButton');
                            if (button)
                            {
                                if (localStorage.getItem('user') != this.$route.params.username)
                                {
                                    button.style.display = "none";
                                }
                                else
                                {
                                    button.style.display = "inline";
                                }
                            }
                        });
                    },

                    getDianzan()
                    {
                        this.$nextTick(()=>{
                            if(localStorage.getItem('user') == null)
                            {
                                this.goodText ="点赞";
                            }
                            else {
                                // this.$router.push({name: 'SingleBlog', params:{username: uname, blogId: addr}});
                                //console.log(Global.sso_flag);
                                //console.log(addr);
                                this.$axios({
                                    url: '/rest/chadianzan',
                                    method: 'post',
                                    data: {
                                        dianzan: localStorage.getItem('user'), dianzaned: this.$route.params.blogId,
                                    }
                                }).then(res => {
                                        //console.log(res);
                                        var r;
                                        if (res.data == false) this.goodText = "取消点赞";
                                        else if (res.data == true) this.goodText = "点赞";
                                        else this.goodText = "点赞";
                                    }
                                )
                            }
                        });
                    },



                },



                created() {
                    this.$root.Bus.$emit('changeStatus', '');
                    var _this = this;
                    _this.getArticle();
                    _this.getComment();
                    if (this.$route.params.ret)
                    {
                        this.goodText = this.$route.params.ret;
                    }
                    else
                    {
                        this.$route.params.ret = '点赞';
                    }
                    _this.EditButton();
                    _this.getDianzan();
                    // window.onload = function(){
                    //     var winHeight = 0;
                    //     if (window.innerHeight){
                    //         winHeight = window.innerHeight;
                    //     }else if ((document.body) && (document.body.clientHeight)){
                    //         winHeight = document.body.clientHeight;
                    //     }
                    //     var html = document.getElementById("PostBody");
                    //     if(document.body.offsetHeight < winHeight){
                    //         html.style.height = winHeight;
                    //     }
                    // };

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
    margin-bottom: 40px;
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

</style>
