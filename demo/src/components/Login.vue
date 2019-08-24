<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <div >
    </div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logoblog.png">
    </div>
    <div class="login_form">

      <FormItem prop="userName">
        <Input type="text" v-model="formInline.userName" placeholder="Username" >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
      <FormItem>
        <router-link :to="{ path: '/Signup' }"><Button type="primary" @click="gosignup()">Signup</Button></router-link>
      </FormItem>
    </div>
  </Form>




</template>
<script>
    export default {
        data() {
            return {
                formInline: {
                    userName: '',
                    password: ''
                },
                ruleInline: {
                    userName: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
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
                            url: '/rest/login',//请求的地址
                            method: 'post',//请求的方式
                            data: this.formInline//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                            // 返回true的话就跳转到编辑器（暂时
                            if(res.data)
                            {this.$router.push({path: '/MdEditor'});}

                        }).catch(err => {
                            console.info('报错的信息', err.response.message);
                        });
                    } else {
                        this.$Message.error('表单校验失败!');
                    }
                })
            },
          gosignup()
          {
            this.$axios({
              url: '/rest/Signup',//请求的地址
              method: 'post',//请求的方式
              data: this.formInline//请求的表单数据
            }).then(res => {
              this.$router.push({path: '/Signup'});

            }).catch(err => {
              console.info('报错的信息', err.response.message);
            });
          }

        }
    }
</script>
<style>
  .login_form {
    padding-top: 0%;
    padding-left: 10%;
    padding-right: 10%;
  }

  .login_logo {
    height: 50%;
  }
  .qxs-ic_user {
    background-size: 13px 15px;
    background-position: 3%;
  }
  .qxs-ic_password {
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }


  .login_btn {
    width: 100%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
