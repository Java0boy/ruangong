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
        <h1 class="title">{{article.title}}</h1>
        <div class="status">发布于：{{article.date}}， 作者：{{article.author}} <!--| 阅读：3500 | 标签：#HTML #CSS--></div><!--暂时还没有前面那些东西 -->
        <div class="content">
          <router-link :to="{name: 'MdEditorExsited', params: {username: this.$route.params.username, blogId: this.$route.params.blogId}}"><Button type="primary">Edit</Button></router-link>
          <div id="layout">
            <div id="articleView" >
              <div v-html="article.contentHtml">
                {{article.contentHtml}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    data() {
      return {
        article:{
          contentHtml:'',
          title: '',
          date: '',
          author: '',
        }
      }
    },
    methods: {


      getArticleDetail(){

        var _this = this;
        //var articleId = window.sessionStorage.getItem("articleId");
        var _blogId = _this.$route.params.blogId;
        console.log(_blogId);
        this.$axios({
          url: '/rest/getBlogHtml',//请求的地址
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
          if (res.data != null)
          {
            this.article.contentHtml = res.data;
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

          }
        });

      },

      getArticleTitle(){

        var _this = this;
        //var articleId = window.sessionStorage.getItem("articleId");
        var _blogId = _this.$route.params.blogId;

        this.$axios({
          url: '/rest/getBlogTitle',//请求的地址
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
          if (res.data != null)
          {
            this.article.title = res.data;
          }
        });
      },

      getArticleDate(){

        var _this = this;
        //var articleId = window.sessionStorage.getItem("articleId");
        var _blogId = _this.$route.params.blogId;

        this.$axios({
          url: '/rest/getBlogDate',//请求的地址
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
          if (res.data != null)
          {
            this.article.date = res.data;
          }
        });
      },

      getArticleAuthor(){

        var _this = this;
        //var articleId = window.sessionStorage.getItem("articleId");
        var _blogId = _this.$route.params.blogId;

        this.$axios({
          url: '/rest/getBlogAuthor',//请求的地址
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
          if (res.data != null)
          {
            this.article.author = res.data;
          }
        });
      },
    },

    created() {
      var _this = this;
      _this.getArticleDetail();
      _this.getArticleTitle();
      _this.getArticleDate();
      _this.getArticleAuthor();
    }


  }
</script>


<style scoped>
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
