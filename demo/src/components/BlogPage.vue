
<template>
  <div><!-- 美化我不做了，在layout这层div之外套壳子就行 -->
    <div id="layout">
      <div id="articleView" >
        <div v-html="article.contentHtml">
          {{article.contentHtml}}
        </div>
      </div>
    </div>

  </div>
</template>
<script>

    export default {
        data() {
            return {
                article:{contentHtml:'<h1 id="h1-blog"><a name="Blog" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Blog</h1><p><strong>This is a test blog.</strong><br><del>Hello world.</del></p>'}
            }
        },
        methods: {

/*
            getArticleDetail(){

                var _this = this;
                //var articleId = window.sessionStorage.getItem("articleId");
                var articleId = _this.$route.params.articleId;  // TODO: 也是，照常理来说blog应该有个唯一的id，弄好数据库了再改

                _this.$axios.post(`/data/article/detail/${articleId}`).then(res =>{
                    var code = res.data.code;
                    var message = res.data.message;
                    if(code === -1){
                        _this.$message.warning(message);
                    }else {
                        //_this.article = res.data.responseData;  // TODO: 这个地方应该是连接数据库的，提取到这篇博客的内容


                        _this.$nextTick(()=>{
                            let editorView = editormd.markdownToHTML("articleView", {
                                htmlDecode      : "style,script,iframe",  // you can filter tags decode
                                emoji           : true,
                                taskList        : true,
                                tex             : true,  // 默认不解析
                                flowChart       : true,  // 默认不解析
                                sequenceDiagram : true,  // 默认不解析
                            });
                        });

                    }
                })

            },
*/
        },
        /*
        created() {
            var _this = this;
            _this.getArticleDetail();
        }

         */
    }
</script>

