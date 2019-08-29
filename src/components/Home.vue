<template>
  <div class = "homebody">
    <div class="logobody">
      <img src="../assets/logo-large.png" width="300"  style="display: inline-block; vertical-align: middle;">
    </div>
    <div class="searchmain">
      <div class="inline">
        <select class="searchchoose" id="searchType">
          <option value = 1>博文</option>
          <option value = 2>作者</option>
        </select>
      </div>
      <div class="inline"> <div style="width: 10px"></div> </div>
      <div class="inline"> <input v-model="formInline.keyword" class="searchbox" ></input> </div>
      <div class="inline"> <div style="width: 10px"></div></div>
      <div class="inline"> <button class="searchbottom" @click="searchSth"><span class="searchtext">SEARCH</span></button> </div>
    </div>
    <div class = "post">
      <div class = "listtitle">热门文章</div>
      <div>
        <router-link :to="{}" >
          <img src="../assets/logo-large.png" style="width: 20px">
          <!--
          <span class="postindex">{{index+1}}</span>
          <span class = "posttitle">{{intest.postTitile}}</span>
          <span class = "postauthor">{{intest.postAuthor}}</span>
          <span class = "posttime">{{intest.postTime}}</span>
          -->
        </router-link>
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
               },


            }
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
                    var selectBox = document.getElementById('searchType');
                    // blog mode
                    if (selectBox.value == 1) {
                        this.searchBlog();
                    }
                    // user mode
                    else {
                        this.searchUser();
                    }
                }
            }
        },

    }


</script>

<style>
  .homebody{
    font-family: "Source Han Sans CN";
    height: 100%;
    text-align: center;
    background: white;
  }
  .logobody {
    line-height: 350px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
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
    height: 35px;
    width: 500px;
    border:2px solid #3e606b;
    border-radius:15px;
    vertical-align:middle;
    font-size: 18px;
  }
  .searchbottom {

    height: 35px;
    width:150px;
    border-radius: 30px;
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
  .searchtext{
    font-size: 18px;
    color: white;
    font-style: italic;
  }
  .listtitle{
    margin-bottom: 30px;
    font-size: 35px;
    color: #0a001f;
  }
  .postlist{
    font-size: 20px;
    height: 50px;
    text-align: center;
    vertical-align:middle;
  }
  .postindex{
    font-style: italic;
    font-size: 15px;
  }
  .posttitle{
    font-size: 20px;
  }
  .postauthor{
    font-size: 18px;
    font-style: italic;
  }
  .posttime{
    font-size: 10px;
  }
  .post{
    text-align: center;
  }

</style>
