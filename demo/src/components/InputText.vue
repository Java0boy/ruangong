<template>
  <div>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <!--
    <FormItem prop="blogTitle">
      <Input type="text" v-model="formInline.blogTitle" placeholder="Blog title">
      </Input>
    </FormItem>
    -->
    <FormItem prop="content">
      <Input type="textarea" v-model="formInline.content" placeholder="Enter Something..." :autosize="{minRows: 5,maxRows: 100}">
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Post Blog</Button>
    </FormItem>
  </Form>
  </div>

</template>
<script>
    export default {
        data() {
            return {
                formInline: {
                    username: 'default', // 有没有办法到时候直接在这里换成当前登录的用户的接口？
                    blogTitle: '',
                    content: ''
                },
                ruleInline: {
                    blogTitle:[
                        {required: true, message: 'Your blog must have a title.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 1,
                            message: 'Your title must be over 1 letter.',
                            trigger: 'blur'
                        }
                    ],
                    content: [
                        {required: true, message: 'You cannot post blank blog.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 10,
                            message: 'Your blog must be over 10 letters.',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            url: '/rest/testPost',//请求的地址
                            method: 'post',//请求的方式
                            data: {username: 'tester', blogTitle: 'test', content: this.formInline.content}//请求的表单数据
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
        }
    }
</script>
