<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="blogTitle">
      <Input v-model="formInline.blogTitle" placeholder="Blog Title" style="width: 300px">  </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Post Blog</Button>
    </FormItem>
    <div id="layout">
      <div id="blog_editormd" style="margin-top: 5px;">

        <textarea style="display: none;" v-model="formInline.blogInit">
        </textarea>

      </div>
    </div>
  </Form>


</template>

<script>
    export default {
        data() {
            return {
                formInline:
                    {
                        blogTitle: '',
                        blogEditor: {},
                        blogInit:'',
                    },
                ruleInline:
                    {
                        blogTitle:[
                            {required: true, message: 'Your blog must have a title.', trigger: 'blur'},
                            {
                                type: 'string',
                                min: 1,
                                message: 'Your title must be over 1 letter.',
                                trigger: 'blur'
                            }
                        ],

                    }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            url: '/rest/postBlog',//请求的地址
                            method: 'post',//请求的方式
                            data: {title: this.formInline.blogTitle, username: this.$route.params.username, date: Date().toString(), blogMd:this.formInline.blogEditor.getMarkdown(), blogHtml: this.formInline.blogEditor.getHTML(), id: this.$route.params.blogId},//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                            if (res.data)
                            {
                                this.$router.push({name: 'SingleBlog', params: {username: this.$route.params.username, blogId: this.$route.params.blogId}})
                            }

                        }).catch(err => {
                            console.info('报错的信息', err.response.message);
                        });
                    } else {
                        this.$Message.error('表单校验失败!');
                    }
                })
            },

            getTitle()
            {
                var _this = this;
                //var articleId = window.sessionStorage.getItem("articleId");
                var _articleId = _this.$route.params.blogId;

                this.$axios.post('/rest/getBlogTitle', {
                    title: '',
                    date: '',
                    username: '',
                    blogMd: '',
                    blogHtml: '',
                    id: _articleId,
                }).then(res => {
                    if (res.data != null)
                    {
                        this.formInline.blogTitle = res.data;
                    }
                });
            },

            getInitMd()
            {
                var _this = this;
                //var articleId = window.sessionStorage.getItem("articleId");
                var _articleId = _this.$route.params.blogId;

                this.$axios.post('/rest/getBlogMd', {
                    id: _articleId,
                    title: '',
                    date: '',
                    username: '',
                    blogHtml: '',
                    blogMd: '',
                }).then(res => {
                    if (res.data != null)
                    {
                        this.formInline.blogInit = res.data;
                    }
                });
            },

        },
        created(){
            this.$nextTick(() =>{
                const blogEditor = editormd("blog_editormd",{
                    placeholder : '欢迎使用editor.md 编辑器',
                    width : "100%",
                    height : "880",
                    syncScrolling : "single",
                    emoji :true,
                    /* path : '../../../static/editor.md-master/lib/' ,*/
                    path : '/static/editor.md-master/lib/',
                    //pluginPath:'/plugins',
                    saveHTMLToTextarea : true,
                    tocm : true,
                    tex :true,
                    flowChart : true,
                    imageUpload : true,
                    imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL : "",
                    //crossDomainUpload : true
                    previewTheme: "white"

                    /**设置主题颜色*/

                });
                //将刚刚定义的对象 存到vue中，用的时候再取出来
                this.formInline.blogEditor = blogEditor;

            });
            var _this = this;
            _this.getTitle();
            _this.getInitMd();
        }
    }
</script>

