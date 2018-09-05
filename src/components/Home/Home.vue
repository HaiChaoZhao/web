<template>
  <el-container style="height: 615px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1','1-4']" :default-active="getIndex">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航</template>
          <el-menu-item-group>
            <template slot="title">表格</template>
            <router-link to="/">
              <el-menu-item index="1-1">
                主表
              </el-menu-item>
            </router-link>
            <router-link to="/phtableinfo">
              <el-menu-item index="1-2">贫困户信息表</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group title="录入表单">
            <router-link to="/phtableform">
              <el-menu-item index="1-3">主表录入</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">贫困户信息表录入</template>
            <router-link to="/phtableinfoform">
              <el-menu-item index="1-4-1">录入</el-menu-item>
            </router-link>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand" >
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" >登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{user.username?user.username:"尚未登录"}}</span>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "Home",
  data() {
    return {
      pathToIndex: {
        "/": "1-1",
        "/phtableinfo": "1-2",
        "/phtableform": "1-3",
        "/phtableinfoform": "1-4-1"
      },
      user:{}
    };
  },
  methods:{
    handleCommand(command) {
        if(command=='logout') this.logout()
    },
    checkLogin(){
      axios.get('api/users/login')
           .then(this.checkLoginHandle)
    },
    checkLoginHandle(resp){
      const res = resp.data
      if (res.RetCode == "0" ) {
        this.$router.push('/login')
      } else{
        try {
          this.user = JSON.parse(localStorage.user)
        } catch (error) {
          console.log(error);
        }
      }
    },
    logout(){
      axios.get('/api/users/logout')
           .then(this.logoutHandle)
    },
    logoutHandle(resp){
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
  created(){
      this.checkLogin()
  },
  computed: {
    getIndex() {
      const path = this.$route.path;
      return this.pathToIndex[path];
    },
  }
};
</script>

<style lang="stylus" scoped>
.el-header 
  background-color: #B3C0D1
  color: #333
  line-height: 60px
.el-aside 
  color: #333
</style>
