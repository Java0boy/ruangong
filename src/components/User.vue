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
    <div class="main" style="display:flex">
      <div class="article" style="width: 70%;text-align: left;border-top:5px solid #343434;">
        <!--        <div style="height: 5px;width: 100%;background: #6aa0b2"></div>-->
        <div style="height: 100%;width: 100%;padding: 20px 30px">
          <div class="userheadcontent">
            <!--            头像-->
            <div class="userheadleftleft">

            </div>
            <div class="userheadleft">
              <div class="title">{{userInfo.username}}</div>
              <div class="status">性别：{{userInfo.sex}},年龄：{{userInfo.age}}</div>
              <div class="status"> 关注了{{userInfo.guanzhucount}}人，被{{userInfo.guanzhuedcount}}人关注</div>
              <!--              关注量：{{userInfo.guanzhucount}}-->
            </div>
          <div class="userheadright">
            <div class="headtext" @click="toGuanzhu" id="guanzhuButton" >{{this.followText}}</div>
          </div>
        </div>

          <div class="isline"></div>
<!--          用户操作可以直接隐藏这个id-->
          <div id="useraction" style="display: table;line-height: 50px">
            <div style="display:table-cell;vertical-align: center">
              <div class="headtext" @click="toEdit">发布博文</div></div>
            <div style="display:table-cell;vertical-align: center;width: 15px"></div>
            <div style="display:table-cell;vertical-align: center">
              <div class="headtext" @click="toEdit">发布资源</div>
            </div>
            <div style="display:table-cell;vertical-align: center;width: 15px"></div>
<!--            上传头像-->
            <div style="display:table-cell;vertical-align: center">
              <div class="headtext" @click="toEdit">上传头像</div>
            </div>
          </div>

          <div class="isline"></div>

          <div class="usercontent">
            <div class="userleft">
              <div class="userposttext">用户作品列表</div>
              <div class="content" v-for="blog in blogList">
                <div class="itemis">
                  <a>
                    <div class="posttitle" @click="gotoBlog(blog.id)">{{blog.title}}</div>
                  </a>
                  <div class="status">发布于：{{blog.date}} | 作者：{{blog.username}} </div>
                </div>
              </div>
            </div>

          <!--            <div class="isline-2"></div>-->

          <!--            <div class="userright">-->
          <!--              <div class="userposttext">用户资源列表</div>-->
          <!--              <div class="content-2" v-for="blog in blogList">-->
          <!--                <div class="itemis">-->
          <!--                  <a>-->
          <!--                    <div class="posttitle" @click="gotoBlog(blog.id)">{{blog.title}}</div>-->
          <!--                  </a>-->
          <!--                  <div class="status">发布于：{{blog.date}}</div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
        </div>

        <!--          <div class="isline"></div>-->



      </div>

    </div>
    <div class="article" style="flex: 1;padding: 20px 20px;border-top:5px solid #343434;">
      <div class="isline-2"></div>
      <!--        <div class="userright">-->
      <div class="userposttext">用户资源列表</div>
      <div class="content-2" style="line-height: 35px" v-for="blog in blogList" @click="gotoBlog(blog.id)">
        <!--            <div class="itemis">-->
        <!--              <div >-->
        <div class="posttitle">{{blog.title}}</div>
        <!--              </div>-->
        <!--              <div class="status">发布于：{{blog.date}}</div>-->
        <!--            </div>-->
      </div>
      <!--        </div>-->
    </div>
  </div>
  <!--    <div class="side-bar-right">-->
  <!--      <div class="header">-->
  <!--        &lt;!&ndash;        <a href="index.html" class="logo">BLOG</a>&ndash;&gt;-->
  <!--        <div class="intro">软工小学期.第一轮迭代~~~</div>-->
  <!--      </div>-->
  <!--      <div class="nav">-->
  <!--        <a href="#" class="item">关于我们</a>-->
  <!--        <a href="#" class="item">联系我们</a>-->
  <!--        <a href="#" class="item">赞助我们</a>-->
  <!--      </div>-->
  <!--    </div>-->
  </div>
</template>

<script>
    import Global from '../tool/Global';
    export default {
        data(){
            return {
                userInfo:{
                    username: '',
                    sex: '',
                    age: '',
                    guanzhucount:'',
                    guanzhuedcount:'',

                },

                blogList:[

                ],
                // file: '',
                guan:{
                    guanzhuzhe:'',
                    beiguanzhu:'',
                },
                followText: '关注',
            }
        },

        methods: {
            // getFile: function (event) {
            //     this.file = event.target.files[0];
            //     console.log(this.file);
            //     // -----------
            //     event.preventDefault();
            //     let formData = new FormData();
            //     formData.append("file", this.file);
            //     axios.post('rest/singlefile', formData)
            //         .then(function (response) {
            //             alert(response.data);
            //             console.log(response);
            //             window.location.reload();
            //         })
            //         .catch(function (error) {
            //             alert("上传失败");
            //             console.log(error);
            //             window.location.reload();
            //         });
            // },
            getUserInfo() {
                var _this = this;
                var _username = this.$route.params.username;
                this.$axios({
                    url: '/rest/getUserInfo',//请求的地址
                    method: 'post',//请求的方式
                    data: {
                        userName: _username, password: ''

                    },//请求的表单数据
                }).then(res => {
                    console.log(res.data);
                    if (res.data != null) {
                        this.userInfo.username = res.data.userName;
                        this.userInfo.age = res.data.age;
                        this.userInfo.sex = res.data.sex;
                        this.userInfo.guanzhucount=res.data.guanzhucount;
                        this.userInfo.guanzhuedcount=res.data.guanzhuedcount;
                    }
                });
            },
            getBlogInfo() {
                var _this = this;
                var _username = this.$route.params.username;
                this.$axios({
                    url: '/rest/getBlogByUser',//请求的地址
                    method: 'post',//请求的方式
                    data: {
                        userName: _username, password: ''

                    },//请求的表单数据
                }).then(res => {
                    if (res.data != null) {
                        this.blogList = res.data;
                    }
                });
            },
            toGuanzhu() {
                if (localStorage.getItem('user') == null) {
                    this.$router.push({path: '/Login'});
                } else if (localStorage.getItem('user') == this.$route.params.username) {
                    this.$Message.warning('不能关注自己');
                } else {
                    if (this.followText == '关注'){
                        //console.log(Global.sso_flag);
                        //console.log(this.$route.params.username);
                        this.$axios({
                            url: '/rest/guanzhu',
                            method: 'post',
                            data: {
                                interest: localStorage.getItem('user'), interested: this.$route.params.username,
                            }
                        }).then(res => {
                            //console.log(res.data);
                            if (res.data) {
                                //console.log(Global.sso_flag);
                                //console.log(this.$route.params.username);
                                this.$Message.success('关注成功');
                            } else {
                                this.$Message.warning('关注失败');
                            }

                        });
                        //
                        // console.log(Global.sso_flag);
                        //     console.log(this.$route.params.username);
                        //     this.$Message.success('关注成功');
                        //     document.getElementById('guanzhuButton').innerHTML="取消关注";
                    } else if (this.followText == '取消关注') {


                        this.$axios({
                            url: '/rest/quxiaoguanzhu',
                            method: 'post',
                            data: {
                                interest: localStorage.getItem('user'), interested: this.$route.params.username,
                            }
                        }).then(res => {
                            console.log(res.data);
                            if (res.data) {
                                console.log(localStorage.getItem('user'));
                                console.log(this.$route.params.username);
                                this.$Message.success('取消成功');
                            } else {
                                this.$Message.warning('取消失败');
                            }

                        });

                        //
                        // console.log(Global.sso_flag);
                        //     console.log(this.$route.params.username);
                        //     this.$Message.success('取消成功');
                        //     document.getElementById('guanzhuButton').innerHTML="关注";
                    }
                }
                window.location.reload();
            },

            toEdit() {
                this.$router.push({name: 'MdEditor', params: {username: this.$route.params.username}});
            },

            gotoBlog(addr) {
                //this.$router.push({name: 'SingleBlog', params:{username: this.userInfo.username, blogId: addr,ret:"点赞"}});
                if (localStorage.getItem('user') == null) {
                    var r = "点赞";
                    this.$router.push({
                        name: 'SingleBlog',
                        params: {username: this.userInfo.username, blogId: addr, ret: r}
                    });
                } else {
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
                            this.$router.push({
                                name: 'SingleBlog',
                                params: {username: this.userInfo.username, blogId: addr, ret: r}
                            });
                        }
                    )
                }
                //
                // console.log(Global.sso_flag);
                // console.log("查询点赞");
                // console.log(addr);
                // this.$router.push({name: 'SingleBlog', params:{username: uname, blogId: addr,ret:"点赞"}});
                //
            },

            getGuanzhu()
            {
                this.$nextTick(()=>{
                    if (localStorage.getItem('user') == this.$route.params.username)
                    {
                        this.followText = '关注';
                    }
                    else {
                        this.$axios({
                            url: '/rest/chaguanzhu',
                            method: 'post',
                            data: {
                                interest: localStorage.getItem('user'), interested: this.$route.params.username,
                            }
                        }).then(res => {
                            if (localStorage.getItem('user') == null) {
                                this.followText = "关注";
                                return true;
                            } else {
                                if (res.data == false) {
                                    this.followText = '取消关注';
                                    return false;

                                } else if (res.data == true) {
                                    this.followText = "关注";
                                    return true;
                                } else {
                                    return false;
                                }

                            }
                        });
                    }
                });
            }
        },

        created() {
            var _this = this;
            _this.getUserInfo();
            _this.getBlogInfo();
            if (this.$route.params.ret)
            {
                this.followText = this.$route.params.ret;
            }
            else
            {
                this.getGuanzhu();
            }

        }
    }
</script>

<style scoped>
  .userheadcontent{
    display: flex;
  }
  .userheadleftleft{
    background: #a6dadd;
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .userheadleft{
    flex: 1;
    height: 100%;
    margin-right: 20px;
  }
  .userheadright{
    /*display: flex;*/
    width: 30%;
    height: 100%;
    text-align:left;
    float: right;
    vertical-align: center;
  }

  .usercontent{
    display: flex;
  }
  .userleft{
    /*width: 65%;*/
    flex: 1;
    height: 100%;

    margin-right: 20px;
  }
  .userright{
    /*display: flex;*/
    width: 35%;
    height: 100%;
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
    color: #343434;
    border: 1px solid #343434;
    transition: background-color 0.2s ease,border-width 0.2s ease,border-radius 0.2s ease;
  }
  .headtext:hover{


    background: #a6dadd;
    color: white;
    border: 1px solid #a6dadd;
  }
  .headtext:active{

    border-radius: 35px;
    background: #343434;
    color: white;
    border: 1px solid #343434;
    /*border: 0px solid white;*/
  }
  .userposttext{
    color: #343434;
    font-size: 15px;
    font-weight: bold;
  }
  .content{
    border-left: 2px solid rgb(99, 178, 195);
    transition: border-left-color 0.5s;
    transition: border-left-width 0.5s;

  }
  .content:hover{
    border-left: 5px solid rgb(166, 218, 221);

  }

  .content-2{
    vertical-align: center;
    text-align: center;
    /*border-radius: 10px;*/
    height: 35px;
    background: whitesmoke;
    border-left: 2px solid rgb(166, 218, 221);

    transition: border-left-color 0.5s,border-left-width 0.5s,border-right-color 0.5s,border-right-width 0.5s;

  }
  .content-2:hover{
    border-left: 5px solid rgb(166, 218, 221);
  }
  .itemis{
    margin-left: 10px;
    margin-top: 30px;

  }
  .isline{
    height: 1px;
    width: 100%;
    background: rgb(0, 0, 0,0.3);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  /*.isline-2 {*/
  /*  !*flex: 1;*!*/
  /*  height: 100%;*/
  /*  width: 5px;*/
  /*  background: rgba(64, 86, 57, 1);*/
  /*  !*margin-top: 20px;*!*/
  /*  !*margin-bottom: 20px;*!*/
  /*}*/
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
    height: 100%;
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
  .side-bar-right{
    /*float: right;*/
    width: 20%;
    position: fixed;
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
    margin-right: 20px;
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
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
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
  .posttitle{
    color: gray;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    /*text-align: left;*/
  }

</style>
