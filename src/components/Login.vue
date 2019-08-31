<template>
  <div class="Loginbody">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <div >
      </div>
      <div class="outer_label">
        <img class="inner_label login_logo" src="../assets/logo-large-black.png" style="margin: 30px 30px" width="170">
      </div>
      <div class="login_form">

        <FormItem prop="userName">
          <Input type="text" v-model="formInline.userName" placeholder="Username" >
  <!--          <Icon type="ios-person-outline" slot="prepend"></Icon>-->
          </Input>
        </FormItem>
        <br>
        <FormItem prop="password">
          <Input class="Login1" type="password" v-model="formInline.password" placeholder="Password">
  <!--          <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
          </Input>
        </FormItem>
        <br>
        <FormItem>
          <div class = "headtext3" type="primary" @click="handleSubmit('formInline')">登录</div>
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
  import Global from '../tool/Global';
    import crypto from 'crypto';
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
                        var md5 = crypto.createHash("md5");
                        md5.update(this.formInline.password);
                        var hashed = md5.digest('hex');
                        this.$axios({
                            url: '/rest/login',//请求的地址
                            method: 'post',//请求的方式
                            data: {userName: this.formInline.userName, password: hashed}//请求的表单数据
                        }).then(res => {
                            console.info('后台返回的数据', res.data);
                          Global.set_sso_lag(res.data);
                          console.log(Global.sso_flag);
                            if(res.data=="22222222222"){
                                console.log(res.data);
                                this.$Message.warning('密码错误');
                            }
                            else if(res.data=="11111111111")
                            {
                                this.$Message.error('用户名不存在');
                            }
                            else
                            {
                                this.submit('注销');
                                localStorage.setItem("user", this.formInline.userName);
                                this.$router.push({name: 'UserPage', params:{username: this.formInline.userName, ret:"关注"}});
                            }

                        }).catch(err => {
                            console.info('报错的信息', err.response.message);
                        });
                    } else {
                        this.$Message.error('表单校验失败!');
                    }
                })
            },

            submit(uname) {
                // 事件名字自定义，用不同的名字区别事件
                this.$root.Bus.$emit('changeStatus', uname);
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

        },

        created() {
            this.$root.Bus.$emit('changeStatus', '');
        }
    }
</script>
<style>
  .Loginbody{
    background: white;
    height: 100%;
  }
  .headtext3{
    outline:none;
    font-family: "Yu Gothic UI";
    font-size: 15px;
    height: 35px;
    width:100px;
    border-radius: 30px;
    background: rgb(52, 52, 52);
    text-align: center;
    vertical-align:middle;
    line-height: 35px;
    color: white;
    border: 2px solid #343434;
    transition: background-color 0.2s ease,border-width 0.2s ease,border-radius 0.2s ease;
  }
  .headtext3:hover{

    background: #a6dadd;
    color: #000000;
    border: 2px solid #a6dadd;

  }
  .headtext3:active{

    border-radius: 35px;
    background: white;
    color: #000000;
    border: 2px solid transparent;
    /*border: 0px solid white;*/
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
  input[type="password"]{
    padding-left: 10px;
    height: 35px;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 2px solid #343434;
    /*border-radius: 15px;*/
    color: #343434;
    letter-spacing: 1px;
  }
  input[type="password"]:hover{
    border-color: #a6dadd;
    background: transparent;
    color: #343434;
  }
  input[type="text"]{
    padding-left: 10px;
    height: 35px;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 2px solid #343434;
    /*border-radius: 15px;*/
    color: #343434;
    letter-spacing: 1px;
  }
  input[type="text"]:hover{
    border-color: #a6dadd;
    background: transparent;
    color: #343434;
  }
  .myInput{border:0 #FFFFFF; border-bottom:#000000 solid 1px;background-color:#FF0000;}
</style>
