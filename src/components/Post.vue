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
      <div  class="article-list">
        <div class="item">
          <div style="height: 5px;width: 100%;background: #6aa0b2"></div>
          <router-link :to="f"><div class="posttitle"></div></router-link>

          <div class="status">发布于： | 作者：</div>
<!--          <div class="content">-->
<!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore nemo ea, magnam qui incidunt maxime commodi eveniet quam soluta, deserunt molestiae officiis adipisci assumenda, rerum, exercitationem architecto natus nihil quia.-->
<!--          </div>-->
          <div style="height: 10px;width: 100%"></div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
    export default {
        data(){
            return {

            }
        },

        methods: {

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


</style>
