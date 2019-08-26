<template>
  <div class="userbody">
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
      <div class="article" style="text-align: left">
        <div style="height: 5px;width: 100%;background: #6aa0b2"></div>
        <div style="height: 100%;width: 100%;padding: 20px 30px">
          <h1 class="title">{{userInfo.username}}</h1>
          <div class="status">性别：{{userInfo.sex}}，年龄：{{userInfo.age}}</div>
          <div class="isline"></div>
          <div class="headtext" @click="toEdit">发布博文</div>
          <div class="isline"></div>
          <div class="userposttext">用户作品列表</div>

          <div class="content">
            <div class="itemis">
              <a>
              <div class="posttitle" @click="gotoBlog">{{blogInfo.title}}</div>
              </a>
              <div class="status">发布于：{{blogInfo.date}} | 作者：{{blogInfo.author}} </div>
              <div id="layout">
                <div id="articleView" >
                  <div v-html="blogInfo.blogHtml">
                    {{blogInfo.blogHtml}}
                  </div>
                </div>
              </div>
              <div style="height: 10px;width: 100%"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                userInfo:{
                    username: '',
                    sex: '',
                    age: '',

                },

                blogInfo:{
                    author: '',
                    title: '',
                    date: '',
                    blogId: '',
                    blogHtml: '',
                }
            }
        },

        methods: {
            getUserInfo()
            {
                var _this = this;
                var _username = this.$route.params.username;
                this.$axios({
                    url: '/rest/getUserInfo',//请求的地址
                    method: 'post',//请求的方式
                    data: {
                        userName: _username,  password: ''

                    },//请求的表单数据
                }).then(res => {
                    console.log(res.data);
                    if (res.data != null)
                    {
                        this.userInfo.username = res.data.userName;
                        this.userInfo.age = res.data.age;
                        this.userInfo.sex = res.data.sex;
                    }
                });
            },
            getBlogInfo()
            {
                var _this = this;
                var _username = this.$route.params.username;
                this.$axios({
                    url: '/rest/getBlogByUser',//请求的地址
                    method: 'post',//请求的方式
                    data: {
                        userName: _username,  password: ''

                    },//请求的表单数据
                }).then(res => {
                    console.log(res.data);
                    if (res.data != null)
                    {
                        this.$nextTick(()=>{
                            let editorView = editormd.markdownToHTML("articleView", {
                                htmlDecode      : "style,script,iframe",  // you can filter tags decode
                                emoji           : true,
                                taskList        : true,
                                tex             : true,  // 默认不解析
                                flowChart       : true,  // 默认不解析
                                sequenceDiagram : true,  // 默认不解析
                                path : '/static/editor.md-master/lib/',
                            });
                        });

                        this.blogInfo.author = res.data.username;
                        this.blogInfo.title = res.data.title;
                        this.blogInfo.date = res.data.date;
                        this.blogInfo.blogId = res.data.id;
                        this.blogInfo.blogHtml = res.data.blogHtml;

                    }
                });
            },

            toEdit()
            {
                this.$router.push({name: 'MdEditor', params:{username: this.$route.params.username}});
            },

            gotoBlog()
            {
                this.$router.push({name: 'SingleBlog', params:{username: this.blogInfo.author, blogId: this.blogInfo.blogId}});
            }



        },

        created() {
            var _this = this;
            _this.getUserInfo();
            _this.getBlogInfo();
        }
    }
</script>

<style scoped>
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

    background: #6e9aa6;
    color: #ffffff;
    border: 0px solid white;
    transition: background-color 0.3s ease,border-width 0.3s ease,border-radius 0.3s ease;
  }
  .headtext:hover{

    background: white;
    color: #a6dadd;
    border: 2px solid white;

  }
  .headtext:active{
    color: white;
    border: 2px solid white;
    border-radius: 10px;
    background: #6e9aa6;
    /*color: #ffffff;*/
    /*border: 0px solid white;*/
  }
  .userposttext{
    color: #6aa0b2;
    font-size: 15px;
    font-weight: bold;
  }
  .content{
    border-left: 2px solid #6aa0b2;
    transition: border-left-color 0.5s;
    transition: border-left-width 0.5s;

  }
  .content:hover{
    border-left: 5px solid rgba(106, 160, 178, 0.55);

  }
  .itemis{
    margin-left: 10px;
    margin-top: 30px;

  }
  .isline{
    height: 1px;
    width: 100%;
    background: rgba(64, 86, 57, 0.36);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .userbody {
    background:#f1f1f1;
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
    /*padding: 20px 30px;*/

    box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    margin-bottom: 25px;
    margin-top: 20px;

    -webkit-box-shadow: 0 0 10px 0px rgba(0,0,0,.1);
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
    margin-top: 10px;
    font-size: 15px;
    text-align: left;

  }


</style>
