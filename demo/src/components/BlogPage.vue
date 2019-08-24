
<template>
  <div> <!-- 美化我不做了，在layout这层div之外套壳子就行 --><!--还有标题我现在还没加，就这样吧草 -->
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


            getArticleDetail(){

                var _this = this;
                //var articleId = window.sessionStorage.getItem("articleId");
                var articleId = _this.$route.params.articleId;  // TODO: 也是，照常理来说blog应该有个唯一的id，弄好数据库了再改

                this.$axios.post('/rest/getBlogHtml', {
                    blogId: articleId
                }).then(res => {
                        console.info('后台返回的数据', res.data);
                        if (res.data != null)
                        {
                            this.article.contentHtml = res.data;
                            console.log(res);
                        }
                    });

            },

        },

        created() {
            var _this = this;
            _this.getArticleDetail();
        }


    }
</script>

