<template>
  <div class="postbody">
    <div class="side-bar">
      <div class="header" style="margin-top: 15px">
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
      <!--      //搜索失败-->
      <div class="article" style="text-align: center;padding: 20px 30px" v-if="blogList.length == 0 && userList.length == 0">
        <div>
          <img src="../assets/logo-large-found.png" width=200>
        </div>
        <div style="color:#3e606b;font-size: 35px;margin-top: 20px;font-style: italic;font-weight: bold">No search results</div>
        <div style="color:#3e606b;margin-top: 20px;letter-spacing: 3px;color: #66686e">没有找到{{this.$route.params.keyword}}相关的搜索结果</div>
      </div>
      <!--      //-->
      <div v-for="blog in blogList" class="article-list">
        <div class="bordertype">
          <div class="item">
            <!--          <div style="height: 5px;width: 100%;background: #6aa0b2"></div>-->
            <a><div class="posttitle" @click="gotoBlog(blog.username, blog.id)">{{blog.title}}</div></a>
            <div class="status">发布于： {{blog.date}}| 作者：{{blog.username}}</div>
            <div style="height: 10px;width: 100%"></div>
          </div>
        </div>
      </div>

      <div v-for="user in userList" class="article-list">
      <div class="bordertype">
        <div class="item">
          <!--          <div style="height: 5px;width: 100%;background: #6aa0b2"></div>-->
          <a><div class="posttitle" @click="gotoUser(user.userName)">{{user.userName}}</div></a>
          <div class="status">性别： {{user.sex}}| 年龄：{{user.age}}</div>
          <div style="height: 10px;width: 100%"></div>
        </div>
      </div>
    </div>

      <div style="height: 50px;width: 100%"></div>
    </div>
  </div>

</template>

<script>
  import Global from '../tool/Global';
    export default {
        data(){
            return {
                blogList: [],
                userList: [],
            }
        },

        methods: {
            gotoBlog(uname, addr)
            {
                if(localStorage.getItem('user') == null)
                {
                    var r="点赞";
                    this.$router.push({name: 'SingleBlog', params: {username: uname, blogId: addr, ret: r}});
                }
                else {
                    // this.$router.push({name: 'SingleBlog', params:{username: uname, blogId: addr}});
                    //console.log(Global.sso_flag);
                    //console.log(addr);
                    this.$axios({
                        url: '/rest/chadianzan',
                        method: 'post',
                        data: {
                            dianzan: localStorage.getItem('user'), dianzaned: addr,
                        }
                    }).then(res => {
                            console.log(res);
                            var r;
                            if (res.data == false) r = "取消点赞";
                            else if (res.data == true) r = "点赞";
                            else r = uname;
                            this.$router.push({name: 'SingleBlog', params: {username: uname, blogId: addr, ret: r}});
                        }
                    )
                }
            },
            gotoUser(uname)
            {
              //
              if(localStorage.getItem('user') == null)
              {
                var r="关注";
                this.$router.push({name: 'UserPage', params: {username: uname,ret:r}});
              }
              else
              {
                //console.log(Global.sso_flag);
                //console.log(uname);
                this.$axios({
                  url:'/rest/chaguanzhu',
                  method:'post',
                  data:{
                    interest:localStorage.getItem('user'),interested:uname,
                  }
                }).then(res=>
                {
                  console.log(res);
                  var r;
                  if(localStorage.getItem('user') == null)
                    r="关注";
                  else
                  {
                    if(res.data==false) r="取消关注";
                    else if(res.data==true) r="关注";
                    else r=uname;
                  }
                  this.$router.push({name: 'UserPage', params: {username: uname,ret:r}});
                });
              }
              //
            },

            getUserList(keyword)
            {
                this.$axios({
                    url: '/rest/searchUser',//请求的地址
                    method: 'post',//请求的方式
                    data: {
                        userName: keyword,  password: ''

                    },//请求的表单数据
                }).then(res => {
                    if (res.data != null)
                    {
                        this.userList = res.data;
                    }
                });
            },

            getBlogList(keyword)
            {
                if(keyword == 'all')
                {
                    this.$axios({
                        url: '/rest/getallBlog',//请求的地址
                        method: 'post',//请求的方式
                        data: {},//请求的表单数据
                    }).then(res => {
                        if (res.data != null) {
                            this.blogList = res.data;
                        }
                    });
                }
                else {
                    this.$axios({
                        url: '/rest/getBlogByBlog',//请求的地址
                        method: 'post',//请求的方式
                        data: {
                            title: keyword,
                            username: '',
                            date: '',
                            blogMd: '',
                            blogHtml: '',
                            id: '',
                        },//请求的表单数据
                    }).then(res => {
                        if (res.data != null) {
                            this.blogList = res.data;
                        }
                    });
                }
            }

        },
        created() {
            this.$root.Bus.$emit('changeStatus', '');
            if (this.$route.params.type == 'blog')
            {
                this.getBlogList(this.$route.params.keyword);
            }
            else
            {
                this.getUserList(this.$route.params.keyword);
            }
        }

    }
</script>

<style scoped>
  .posttitle{
    font-size: 30px;
    font-family: "Yu Gothic UI";
    color: #0C1021;
  }
  .status{
    font-family: "Yu Gothic UI";
  }
  .postbody {
    background: #f1f1f1;
    /*line-height: 1.7;*/
    height: 155%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  a, body {
    color: #000000;
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
    color: #000000;
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
/*//框的样式*/
  .article-list, .article {
    margin-right: 30%;
    margin-bottom: 25px;
    margin-top: 20px;
    background: #fff;
    /*padding: 20px 30px;*/
    transition: height 5s ease;
    -webkit-box-shadow: 0 0 10px 0px rgba(0,0,0,.1);
    /*box-shadow: 0 0 3px 2px rgba(0,0,0,.2);*/
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

  }
  .bordertype{
    border-top:5px solid #000000;
    padding-top: 8px;
    transition: border-top-color 0.1s ease,border-top-width 0.3s;
  }
  .bordertype:hover{
    border-top:8px solid #a6dadd;
    padding-top: 8px;
  }


</style>
