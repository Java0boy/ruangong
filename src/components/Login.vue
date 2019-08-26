<template>
  <div>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <div >
    </div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logo-large.png" style="margin: 30px 30px" width="200">
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
        <div class = "headtext" type="primary" @click="handleSubmit('formInline')">登录</div>
      </FormItem>
      <br>
      <FormItem>
        <span>没有账号？ 立即  </span><router-link   :to="{ path: '/Signup' }"><span type="primary" @click="gosignup()">注册</span></router-link>
      </FormItem>
    </div>
  </Form>
  </div>
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
                            if(res.data=="22222222222"){
                                console.log(res.data);
                                this.$Message.warning('密码错误');
                            }
                            else if(res.data=="11111111111")
                            {
                                this.$Message.error('用户名不存在');
                            }
                            else
                            {this.$router.push({name: 'UserPage', params:{username: this.formInline.userName}});}

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
  .headtext{

    font-size: 15px;
    height: 35px;
    line-height: 35px;
    width:100px;
    border-radius: 30px;
    background: rgba(0,0,0,0);
    text-align: center;
    vertical-align:middle;
    line-height: 35px;

    background: #6e9aa6;
    color: #ffffff;
    border: 3px solid #6e9aa6;

  }
  .headtext:hover{

    background: white;
    color: #a6dadd;
    border: 2px solid white;

  }
  .headtext:active{

    border-radius: 10px;
    background: #6e9aa6;
    color: #ffffff;
    border: 3px solid #6e9aa6;
  }
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
