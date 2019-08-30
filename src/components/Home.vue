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
    <div class="bodyleft">
      <div class="leftcontentall">
        <div class="leftcontent-logo"></div>
        <div class="leftcontent-picture"></div>
      </div>
    </div>

    <div class="bodyright">

<!--      <select class="searchchoose" id="searchType">-->
<!--        <option value = 1>博文</option>-->
<!--        <option value = 2>作者</option>-->
<!--      </select>-->
      <div>
        <div id="example-4"  style="display: table;padding-left: 10px;margin-bottom: 15px;">
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
<!--          <span class="inline">Picked: {{ formInline.type }}</span>-->
        </div>
      </div>

      <div class="searchmain" style="text-align: left">
        <input v-model="formInline.keyword" class="searchbox" @keyup.13="searchSth"></input>
<!--        <button class="searchbottom" @click="searchSth"><span class="searchtext">SEARCH</span></button>-->
      </div>

      <div class="rightbottom">
        <div class = "listtitle">热门文章</div>
        <div class="post">
<!--          <router-link :to="{}" >-->
            <img src="../assets/logo-large.png" style="width: 20px">
<!--              <span class="postindex">{{index+1}}</span>-->
<!--              <span class = "posttitle">{{intest.postTitile}}</span>-->
<!--              <span class = "postauthor">{{intest.postAuthor}}</span>-->
<!--              <span class = "posttime">{{intest.postTime}}</span>-->
            <span class = "postindex">1</span>
            <span class = "posttitle">Just a test</span>
            <span class = "postauthor">[Juan]</span>
            <span class = "posttime">20190829</span>
<!--          </router-link>-->
        </div>
        <div class="post">

          <img src="../assets/logo-large.png" style="width: 20px">
          <span class = "postindex">2</span>
          <span class = "posttitle">Just a test222</span>
          <span class = "postauthor">[ZXY]</span>
          <span class = "posttime">20190829</span>

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


            }
        },
        mounted(){
            this.formInline.type=1;
        },
        created(){
            this.$root.Bus.$emit('changeStatus', '');
        },
        methods: {
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
    background: #000000;
  }
  .bodyleft{
    float: left;
    height: 100%;;
    width: 50%;
    padding-left: 20px;
    padding-bottom: 20px;

  }
  .bodyright{
    float: right;
    height: 100%;
    background: #000000;
    width: 50%;
    text-align: left;
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
    height: 45px;
    width: 100px;
    border:1px solid #ffffff;
    border-left: 0px;
    border-top-right-radius:30px;
    border-bottom-right-radius:30px;
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
    width: 300px;
    border-color: #a6dadd;
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
    display: inline-block;
    vertical-align:middle
  }
  /*.searchtext{*/
  /*  font-size: 18px;*/
  /*  color: white;*/
  /*  font-style: italic;*/
  /*}*/
  .listtitle{
    text-align: right;
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
    font-size: 18px;
    font-style: italic;
    margin-right: 5px;
  }
  .posttime{

    color: white;
    font-size: 10px;
  }
  .post{
    text-align: right;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .rightbottom{
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 20px;
  }

</style>
