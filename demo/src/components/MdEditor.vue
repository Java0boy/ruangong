<template><!--参考了：https://blog.csdn.net/qq_31906861/article/details/88918439 -->
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="blogTitle">
      <Input v-model="formInline.blogTitle" placeholder="Blog Title" style="width: 300px">  </Input>
      </FormItem>
      <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Post Blog</Button>
      </FormItem>
    <div id="layout">
      <div id="blog_editormd" style="margin-top: 5px;">

        <textarea style="display: none;"></textarea>

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
                            data: {title: this.formInline.blogTitle, blogMd:this.formInline.blogEditor.getMarkdown(), blogHtml: this.formInline.blogEditor.getHTML()},//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                        }).catch(err => {
                            console.info('报错的信息', err.response.message);
                        });
                    } else {
                        this.$Message.error('表单校验失败!');
                    }
                })
            }
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
                    imageUploadURL : "",  // TODO: 增加上传图片的功能，解决好跨域问题
                    //crossDomainUpload : true
                    previewTheme: "white"

                    /**设置主题颜色*/

                });
                //将刚刚定义的对象 存到vue中，用的时候再取出来
                this.formInline.blogEditor = blogEditor;

            });
        }
    }
</script>

