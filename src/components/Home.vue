<template>
  <div class = "homebody">
<!--    <div class="logobody">-->
<!--      <img src="../assets/logo-large.png" width="300"  style="display: inline-block; vertical-align: middle;">-->
<!--    </div>-->
<!--    <div class="searchmain">-->
<!--      <div class="inline">-->
<!--        <select class="searchchoose" id="searchType">-->
<!--          <option value = 1>博文</option>-->
<!--          <option value = 2>作者</option>-->
<!--        </select>-->
<!--      </div>-->
<!--      <div class="inline"> <div style="width: 10px"></div> </div>-->
<!--      <div class="inline"> <input v-model="formInline.keyword" class="searchbox" @keyup.13="searchSth"></input> </div>-->
<!--      <div class="inline"> <div style="width: 10px"></div></div>-->
<!--      <div class="inline"> <button class="searchbottom" @click="searchSth"><span class="searchtext">SEARCH</span></button> </div>-->
<!--    </div>-->
<!--    <div class = "post">-->
<!--      <div class = "listtitle">热门文章</div>-->
<!--      <div>-->
<!--        <router-link :to="{}" >-->
<!--          <img src="../assets/logo-large.png" style="width: 20px">-->
<!--          &lt;!&ndash;-->
<!--          <span class="postindex">{{index+1}}</span>-->
<!--          <span class = "posttitle">{{intest.postTitile}}</span>-->
<!--          <span class = "postauthor">{{intest.postAuthor}}</span>-->
<!--          <span class = "posttime">{{intest.postTime}}</span>-->
<!--          &ndash;&gt;-->
<!--        </router-link>-->
<!--      </div>-->



<!--    </div>-->
<!--    <div class="bodyleft">-->
<!--      <div class="leftcontentall">-->
<!--        <div class="leftcontent-logo"></div>-->
<!--        <div class="leftcontent-picture"></div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="bodyright">

<!--      <select class="searchchoose" id="searchType">-->
<!--        <option value = 1>博文</option>-->
<!--        <option value = 2>作者</option>-->
<!--      </select>-->
      <div>
        <div style="margin: 20px">
          <img src="../assets/logo-large.png" width="250">
        </div>
        <div id="example-4"  style="width:100%;display: table;padding-left: 10px;">
          <div class="inline" style="width: 30%"></div>
          <div class="inline">
            <div class="textsearch">Find what you need --></div>
          </div>
          <div class="inline">
            <input type="radio" id="博文" value=1 v-model="formInline.type" >
            <label class="radiotext" for="博文">博文</label>
          </div>
          <div class="inline">
            <input type="radio" id="用户" value=2 v-model="formInline.type">
            <label class="radiotext" for="用户">用户</label>
          </div>
          <div class="inline" style="width: 30%"></div>
<!--          <span class="inline">Picked: {{ formInline.type }}</span>-->
        </div>
      </div>

      <div class="searchmain" style="text-align: center;margin-top: 20px">
        <input v-model="formInline.keyword" class="searchbox" @keyup.13="searchSth"></input>
<!--        <button class="searchbottom" @click="searchSth"><span class="searchtext">SEARCH</span></button>-->
      </div>

      <div class="rightbottom">
        <div class = "listtitle">热门文章</div>
<!--        <div class="post">-->
<!--&lt;!&ndash;          <router-link :to="{}" >&ndash;&gt;-->
<!--            <img src="../assets/logo-large.png" style="width: 20px">-->
<!--&lt;!&ndash;              <span class="postindex">{{index+1}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class = "posttitle">{{intest.postTitile}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class = "postauthor">{{intest.postAuthor}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span class = "posttime">{{intest.postTime}}</span>&ndash;&gt;-->
<!--            <span class = "postindex">1</span>-->
<!--            <span class = "posttitle">Just a test</span>-->
<!--            <span class = "postauthor">[Juan]</span>-->
<!--            <span class = "posttime">20190829</span>-->
<!--&lt;!&ndash;          </router-link>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="post">-->

<!--          <img src="../assets/logo-large.png" style="width: 20px">-->
<!--          <span class = "postindex">2</span>-->
<!--          <span class = "posttitle">Just a test222</span>-->
<!--          <span class = "postauthor">[ZXY]</span>-->
<!--          <span class = "posttime">20190829</span>-->

<!--        </div>-->

        <div v-for="(blog,index) in blogList" v-if="index<4" class="post">
<!--          <div class="bordertype">-->
            <div class="item">
              <!--          <div style="height: 5px;width: 100%;background: #6aa0b2"></div>-->
              <span class = "postindex">{{index+1}}</span>
              <a><span class="posttitle" @click="gotoBlog(blog.username, blog.id)">{{blog.title}}</span></a>
              <span class="postauthor">[{{blog.username}}]</span>
              <span class="posttime">2019.09.01</span>
<!--              <span style="height: 10px;width: 100%"></span>-->
            </div>
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default{
        data(){
            return {
               formInline:{
                   keyword: '',
                   type:'',
               },
                blogList: [],

            }
        },
        mounted(){
            this.formInline.type=1;
        },
        created(){
            this.$root.Bus.$emit('changeStatus', '');
            // this.getBlogList(this.$route.params.keyword);
            this.getBlogList('all');
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
            },

            searchUser() {
                this.$router.push({name: 'Post', params: {type:'user', keyword: this.formInline.keyword}});
            },
            searchBlog()
            {
                this.$router.push({name: 'Post', params: {type:'blog', keyword: this.formInline.keyword}});
            },
            searchSth()
            {
                if (this.formInline.keyword.trim().length == 0)
                {
                    this.$Message.error('请输入检索关键词');
                }
                else {
                    // var selectBox = document.getElementById('searchType');
                    // blog mode
                    if (this.formInline.type == 1) {
                        this.searchBlog();
                    }
                    // user mode
                    else {
                        this.searchUser();
                    }
                }
                window.location.reload();
            }
        },

    }


</script>

<style>
  .homebody{
    /*display: flex;*/
    font-family: "Source Han Sans CN";
    height: 100%;
    text-align: center;
    background: #343434;
    padding: 20px;
  }
  .bodyleft{
    float: left;
    height: 0%;;
    width: 0%;
    padding-left: 20px;
    padding-bottom: 20px;

  }
  .bodyright{
    float: right;
    height: 100%;
    background: #343434;
    width: 100%;
    text-align: center;
  }
  .leftcontentall{
    width: 100%;
    height: 100%;
    position:relative;
  }
  .leftcontent-picture{
    position:absolute;
    z-index:1;
    width: 100%;
    height: 100%;
    background-image: url("../assets/homebackground-1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .leftcontent-logo{
    width: 100%;
    height: 100%;
    background-image: url("../assets/logo-large-black.png");
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: 100% 100%;
    position:absolute;
    z-index:2;
  }
  .radiotext{
    color: white;
    margin-right: 20px;
  }

  /*.logobody {*/
  /*  line-height: 350px;*/
  /*  padding-top: 50px;*/
  /*  padding-bottom: 50px;*/
  /*}*/
  .searchmain{
    height: 100px;
    width: 100%;
    text-align: center;
  }
  .searchchoose {
    height: 35px;
    width: 100px;
    border:2px solid #3e606b;
    border-radius:15px;
    vertical-align:middle;
    font-size: 15px;
    text-align: center;
    text-align-last: center;
  }
  .searchbox {
    outline:none;
    height: 45px;
    width:450px;
    border:1px solid #ffffff;
    border-radius: 35px;
    /*border-right-width: 10px;*/
    vertical-align:middle;
    font-size: 16px;
    background: transparent;
    color: white;
    padding-left: 20px;
    transition: width 0.5s ease,border-color 0.3s;
    letter-spacing: 2px;
  }
  .searchbox:hover {
    width: 550px;
    /*border-color: #a6dadd;*/
  }
  .textsearch{
    /*margin-left: 10px;*/
    /*margin-bottom: 10px;*/
    margin-top: -3px;
    color: white;
    margin-right: 15px;
    letter-spacing: 3px;
    font-size: 12px;
    font-style: italic;
  }
  .searchbottom {
    height: 35px;
    width:150px;
    background: #3e606b;
    text-align: center;
    vertical-align:middle;
    line-height: 35px;
    color: white;
  }
  .inline{
    display: inline-table;
    vertical-align:middle;
  }
  /*.searchtext{*/
  /*  font-size: 18px;*/
  /*  color: white;*/
  /*  font-style: italic;*/
  /*}*/
  .listtitle{
    text-align: center;
    margin-bottom: 30px;
    font-size: 35px;
    color: #ffffff;
    font-style: italic;
    font-family: 汉仪新人文宋W;
  }
  .postlist{
    font-size: 20px;
    height: 50px;
    text-align: center;
    vertical-align:middle;
  }
  .postindex{
    color: white;
    font-style: italic;
    font-size: 15px;
    margin-right: 5px;
  }
  .posttitle{
    color: white;
    font-size: 20px;
    margin-right: 5px;
    margin-left: 5px;
  }
  .postauthor{
    color: white;
    font-size: 15px;
    font-style: italic;
    margin-right: 5px;

  }
  .posttime{

    color: white;
    font-size: 10px;
  }
  .post{
    text-align: center;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .rightbottom{
    position: center;
    bottom: 0;

    margin-bottom: 20px;
  }

</style>
