<template>
    <div class="content-wrapper" >
        <div class="login-box-wrapper">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="用户名" prop="email">
                        <el-input placeholder="输入邮箱" v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "输入正确的邮箱",
            trigger: ["change", "blur"]
          }
        ],
        password: [{ required: true, message: "输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.ruleForm;
          axios.post('/api/users/login',{email:data.email,password:data.password})
               .then(this.loginHandle)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginHandle(resp){
      const res = resp.data;
      if(res.RetCode=='1'){
        this.$message({
          type:'success',
          message:"成功登陆"
        })
        localStorage.user = JSON.stringify(res.user) 
        this.$router.push('/')
      }else{
        this.$message({
          type:'error',
          message:res.RetVal
        })
      }
    },
    checkLoginStatus(){
      axios.get('/api/users').then(this.alredyLogin)
    },
    alredyLogin(resp){
      const res = resp.data;
      if(res.RetCode=='1'){
        this.$router.push('/');
      }
    }
  },
  created(){
    this.checkLoginStatus()
  }
};
</script>

<style lang="stylus" scoped>
.content-wrapper
    background-image: url('../../assets/login.png')
    height: 12.3rem
    display: flex
    align-items: center
    justify-content: center
    .login-box-wrapper
        width: 7rem
        height: 5rem
        background: #fff
        .el-form
            width : 6rem
            padding-top: 1rem
</style>
