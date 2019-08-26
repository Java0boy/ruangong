<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <div >
    </div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logo-large.png" style="margin: 30px 30px" width="200">
    </div>
    <div class="login_form">
      <div>
<!--        <h1> &#45;&#45;&#45;&#45;&#45;&#45;Sign Up&#45;&#45;&#45;&#45;&#45;&#45;</h1>-->
      </div>
      <FormItem prop="userName">
        <div>
          <Input type="text" v-model="formInline.userName" placeholder="Username" >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </div>
      </FormItem>
      <br>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br>
      <FormItem prop="sex">
        <Input type="text" v-model="formInline.sex" placeholder="sex">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br>
      <FormItem prop="age">
        <Input type="age" v-model="formInline.age" placeholder="age">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br>
      <FormItem>
        <div type="primary" @click="handleSubmitsignup('formInline')" class="headtext" style="margin-bottom: 20px">注册</div>

        <FormItem>
          <span>已有账号？ 立即  </span><router-link   :to="{ path: '/Login' }"><span type="primary">登录</span></router-link>
        </FormItem>
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
          password: '',
          sex:'',
          age:'',
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
          ],
          sex:[
            {required: true, message: 'Please fill in the user sex', trigger: 'blur'}
          ],
          age:[
            {required: true, message: 'Please fill in the user age', trigger: 'blur'}
          ],
        }
      }
    },
      methods: {
          handleSubmitsignup(name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                      this.$axios({
                          url: '/rest/signup',//请求的地址
                          method: 'post',//请求的方式
                          data: this.formInline//请求的表单数据
                      }).then(res => {
                          console.info('后台返回的数据', res.data);
                          // 返回true的话就跳转到编辑器（暂时
                          if(res.data){
                              this.$router.push({path: '/Login'});
                          }
                          else
                          {
                              this.$Message.error('用户名已存在');
                          }

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
