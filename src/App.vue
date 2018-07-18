<template>
  <div id="app">
    <el-container style="height: 615px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" :default-active="'1-1'" >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <router-link to="/" >
              <el-menu-item index="1-1"  >
                主表
              </el-menu-item>
              </router-link>
              <router-link to="/phtableinfo">
                <el-menu-item index="1-2">贫困户信息表</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">表格3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">表格4</template>
              <el-menu-item index="1-4-1">表格4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main>
          <router-view/>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "App"
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
