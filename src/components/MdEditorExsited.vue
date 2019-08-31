<template>
<div style="height: 100%;width: 100%;padding-top: 20px">
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="blogTitle">
      <Input v-model="formInline.blogTitle" placeholder="Blog Title" style="width: 300px">  </Input>
    </FormItem>
    <FormItem>
      <div class="headtext" @click="handleSubmit('formInline')">Post Blog</div>
    </FormItem>
    <div id="layout">
      <div id="blog_editormd" style="margin-top: 5px;">

        <textarea style="display: none;" v-model="formInline.blogInit">
        </textarea>

      </div>
    </div>
  </Form>
</div>


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
                            data: {title: this.formInline.blogTitle, username: this.$route.params.username, date: Date().toString(), blogMd:this.formInline.blogEditor.getMarkdown(), blogHtml: this.formInline.blogEditor.getHTML(), id: this.$route.params.blogId, timestamp: new Date().getTime()},//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                            if (res.data)
                            {

                                if(localStorage.getItem('user') == null)
                                {
                                    var r="点赞";
                                    this.$router.push({name: 'SingleBlog', params:{username: localStorage.getItem('user'), blogId: this.$route.params.blogId,ret:r}});
                                }
                                else
                                {
                                    //console.log(Global.sso_flag);
                                    // console.log(addr);
                                    this.$axios({
                                        url:'/rest/chadianzan',
                                        method:'post',
                                        data:{
                                            dianzan:localStorage.getItem('user'),dianzaned:this.$route.params.blogId,
                                        }
                                    }).then(res=>{
                                            // console.log(res);
                                            // var r;
                                            // if(res.data==false) r="取消点赞";
                                            // else if(res.data==true) r="点赞";
                                            // else r=uname;
                                            // this.$router.push({name: 'SingleBlog', params:{username: uname, blogId: addr,ret:r}});
                                        }
                                    )

                                }
                                this.$router.push({name: 'SingleBlog', params: {username: this.$route.params.username, blogId:this.$route.params.blogId,ret:"点赞"}})
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
            this.$root.Bus.$emit('changeStatus', '');
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
<style>
  .inputtitle{
    padding-left: 10px;
    border: 2px solid white;
    border-radius: 25px;
    height: 35px;
    color: white;
  }

  .inputtitle:hover{
    border: 2px solid #a6dadd;
    color: #a6dadd;
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
    color: white;
    border: 2px solid white;
    transition: background-color 0.2s ease,border-width 0.2s ease,border-radius 0.2s ease;
  }
  .headtext:hover{

    background: #a6dadd;
    color: #000000;
    border: 2px solid #a6dadd;

  }
  .headtext:active{

    border-radius: 35px;
    background: white;
    color: #000000;
    border: 2px solid transparent;
    /*border: 0px solid white;*/
  }
</style>

