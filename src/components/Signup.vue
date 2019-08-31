<template>
  <div style="background: white;height: 100%;width: 100%">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <div>
      </div>
      <div class="outer_label">
        <img class="inner_label login_logo" src="../assets/logo-large-black.png" style="margin: 30px 30px" width="160">
      </div>
      <div class="login_form">
        <div>
          <!--        <h1> &#45;&#45;&#45;&#45;&#45;&#45;Sign Up&#45;&#45;&#45;&#45;&#45;&#45;</h1>-->
        </div>

        <!--      Email-->
        <FormItem prop="email">
          <div>
            <Input placeholder="用户邮箱" v-model="formInline.email">
              <!--            <Icon type="ios-person-outline" slot="prepend"></Icon>-->
            </Input>
          </div>
        </FormItem>
        <br>
        <FormItem prop="vertifyCode">
          <div>
            <Input style="width: 80px" placeholder="验证码" v-model="formInline.vertifyCode">
              <!--            <Icon type="ios-person-outline" slot="prepend"></Icon>-->
            </Input>
          </div>
        </FormItem>
        <FormItem     style="margin-left: -6px;" >
          <div>
            <div @click="getVertifyCode" class="headtext2" >
              获取验证码
            </div>
          </div>
        </FormItem>
        <br>



        <FormItem prop="userName">
          <div>
            <Input v-model="formInline.userName" placeholder="Username">
              <!--            <Icon type="ios-person-outline" slot="prepend"></Icon>-->
            </Input>

          </div>
        </FormItem>
        <br>
        <FormItem prop="password">
          <!--        <div>-->
          <Input  type="password" v-model="formInline.password" placeholder="Password">
            <!--          <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
          </Input>
          <!--        </div>-->
        </FormItem>
        <br>
        <FormItem prop="sex">
          <!--        <Input type="text" v-model="formInline.sex" placeholder="sex">-->

          <div>
            <div id="example-4"  style="display: inline-block">
              <!--             <div class="inline"> <Icon type="ios-lock-outline" slot="prepend"></Icon></div>-->
              <div class="inline"style="color: #343434;font-size: 12px">Sex</div>
              <div class="inline">
                <input type="radio" id="男" value="男" v-model="formInline.sex" >
                <label style="color:#343434 " for="男">男</label>
              </div>

              <!--             <br>-->
              <!--             <div class="inline" style="width: 50px;height: 100px"></div>-->
              <div class="inline">
                <input type="radio" id="女" value="女" v-model="formInline.sex">
                <label style="color:#343434 " for="女">女</label>
              </div>
              <!--             <br>-->
              <!--             <span class="inline">Picked: {{ formInline.sex }}</span>-->
            </div>
            <!--           <select  v-model="formInline.sex" placeholder="sex" style="width: 150px;height: 30px" >-->
            <!--            <option value ="男">男</option>-->
            <!--            <option value ="女">女</option>-->

            <!--          </select>-->
          </div>
          <!--        </Input>-->
        </FormItem>
        <br>
        <FormItem prop="age">
          <!--        <Input type="age" v-model="formInline.age" placeholder="age">-->
          <select class="selectage" v-model="formInline.age" placeholder="age">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            <option value="" disabled selected hidden>Age</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
            <option value="47">47</option>
            <option value="48">48</option>
            <option value="49">49</option>
            <option value="50">50</option>
            <option value="51">51</option>
            <option value="52">52</option>
            <option value="53">53</option>
            <option value="54">54</option>
            <option value="55">55</option>
            <option value="56">56</option>
            <option value="57">57</option>
            <option value="58">58</option>
            <option value="59">59</option>
            <option value="60">60</option>
            <option value="61">61</option>
            <option value="62">62</option>
            <option value="63">63</option>
            <option value="64">64</option>
            <option value="65">65</option>
            <option value="66">66</option>
            <option value="67">67</option>
            <option value="68">68</option>
            <option value="69">69</option>
            <option value="70">70</option>
            <option value="71">71</option>
            <option value="72">72</option>
            <option value="73">73</option>
            <option value="74">74</option>
            <option value="75">75</option>
            <option value="76">76</option>
            <option value="77">77</option>
            <option value="78">78</option>
            <option value="79">79</option>
            <option value="80">80</option>
            <option value="81">81</option>
            <option value="82">82</option>
            <option value="83">83</option>
            <option value="84">84</option>
            <option value="85">85</option>
            <option value="86">86</option>
            <option value="87">87</option>
            <option value="88">88</option>
            <option value="89">89</option>
            <option value="90">90</option>
            <option value="91">91</option>
            <option value="92">92</option>
            <option value="93">93</option>
            <option value="94">94</option>
            <option value="95">95</option>
            <option value="96">96</option>
            <option value="97">97</option>
            <option value="98">98</option>
            <option value="99">99</option>

          </select>

          <!--        </Input>-->
        </FormItem>
        <br>
        <FormItem>
          <div type="primary" @click="handleSubmitsignup('formInline')" class="headtext4" style="margin-bottom: 20px">注册</div>

          <FormItem>
            <span>已有账号？ 立即  </span><router-link   :to="{ path: '/Login' }"><span type="primary">登录</span></router-link>
          </FormItem>
        </FormItem>
      </div>
    </Form>
  </div>





</template>
<script>
    import crypto from 'crypto';
  export default {
    data() {
      return {
        formInline: {
            userName: '',
            password: '',
            sex:'',
            age:'',
            email:'',
            vertifyCode: '',
        },
          tmpCode: '',
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
            email: [
                {required: true, message: 'Please fill in your email address', trigger: 'blur'},
                {
                    pattern : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    message: '错误的邮箱格式',
                    trigger: 'blur'
                }
        ],
            vertifyCode: [
                {required: true, message: 'Please fill in the vertify code', trigger: 'blur'},
            ],
        }
      }
    },
      methods: {
          handleSubmitsignup(name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                      if (this.formInline.vertifyCode == this.tmpCode) {
                          var md5 = crypto.createHash("md5");
                          md5.update(this.formInline.password);
                          var hashed = md5.digest('hex');
                          this.$axios({
                              url: '/rest/signup',//请求的地址
                              method: 'post',//请求的方式
                              data: {
                                  userName: this.formInline.userName,
                                  password: hashed,
                                  sex: this.formInline.sex,
                                  age: this.formInline.age,
                                  mail: this.formInline.email
                              }//请求的表单数据
                          }).then(res => {
                              console.info('后台返回的数据', res.data);
                              // 返回true的话就跳转到编辑器（暂时
                              if (res.data) {
                                  this.$router.push({path: '/Login'});
                              } else {
                                  this.$Message.error('用户名已存在');
                              }

                          }).catch(err => {
                              console.info('报错的信息', err.response.message);
                          });
                      }
                      else
                      {
                          this.$message.error('验证码错误!');
                      }

                  }
                  else {
                      this.$Message.error('表单校验失败!');
                  }

              })
          },

          getVertifyCode()
          {
              this.$axios({
                  url: '/rest/mail',//请求的地址
                  method: 'post',//请求的方式
                  data: {
                      userName:'',
                      password:'',
                      sex: '',
                      age: '',
                      mail: this.formInline.email
                  },//请求的表单数据
              }).then(res => {
                  if (res.data != null) {
                      this.tmpCode = res.data;
                  }
              });
          }

      },

      created() {
          this.$root.Bus.$emit('changeStatus', '');
      }
  }
</script>
<style>
  .userinput{
    border: #0D3349 5px;
    background: #0D3349;
  }
  .inline{
    display: inline;
    margin-left: 5px;
    margin-right: 5px;
  }
  .headtext4{
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
  .headtext4:hover{

    background: #a6dadd;
    color: #000000;
    border: 2px solid #a6dadd;

  }
  .headtext4:active{

    border-radius: 35px;
    background: white;
    color: #000000;
    border: 2px solid transparent;
    /*border: 0px solid white;*/
  }
  .headtext2{
    outline:none;
    font-family: "Yu Gothic UI";
    font-size: 12px;
    height: 33px;
    width:80px;
    border-radius: 30px;
    background: #343434;
    text-align: center;
    vertical-align:middle;
    line-height: 35px;
    color: white;
    /*border: 2px solid white;*/
    transition: border-radius 0.2s ease;
  }
  .headtext2:hover{

    background: #a6dadd;
    color: #000000;
    /*border: 2px solid #a6dadd;*/

  }
  .headtext2:active{

    border-radius: 35px;
    background: white;
    color: #000000;
    /*border: 2px solid transparent;*/
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
    height: 33px;
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
    height: 33px;
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

  .selectage{
    padding-left: 5px;
    width: 165px;
    height: 33px;
    background: transparent;
    border: 2px solid #343434;
    border-radius: 15px;
    color: #343434;
    letter-spacing: 1px;
  }
</style>
