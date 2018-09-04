<template>
  <div>
    <div class="header-search" >
        <el-input
        placeholder="编号"
        prefix-icon="el-icon-search"
        clearable
        size="mini"
        v-model="serachInput">
        </el-input>
        <el-button type="primary" size="mini" >查询</el-button>
    </div>
    <el-table :data="tableData" stripe max-height="450" v-loading="loading" style="font-size: 0.22rem;">
      <el-table-column type="index" label="序号" width="25" fixed>
      </el-table-column>
      <el-table-column prop="belong.name" label="贫困户主名"  fixed>
      </el-table-column>
      <el-table-column prop="name" label="姓名"  fixed>
      </el-table-column>
      <el-table-column prop="relationship" label="与户主关系">
      </el-table-column>
      <el-table-column prop="nationality" label="民族">
      </el-table-column>
      <el-table-column prop="censusCategory" label="户籍类别">
      </el-table-column>
      <el-table-column prop="IDNumber" width="135" label="身份证号">
      </el-table-column>
      <el-table-column prop="censusAddr" label="户籍所在地" >
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" >
      </el-table-column>
      <el-table-column prop="Address" label="居住地址">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper" >
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRows">
          </el-pagination>
    </div>
  </div>
</template>

<script>
  import axois from 'axios'
  export default {
    name: "PhtableInfo",
    data() {
      return {
        loading: true,
        tableData: [],
        serachInput:'',
        currentPage:1,
        totalRows: 0,
        pagesize: 10
      }
    },
    methods: {
      getPhtableList(){
          axois.get(`/api/phr/${this.currentPage}-${this.pagesize}`)
          .then(this.hanldeGetPhtableListSucc)
      },
      hanldeGetPhtableListSucc(res){
        this.loading=false
          const resp=res.data
          if(resp.RetCode=='1'&&resp.DataRows){
              const data = resp.DataRows
              this.tableData=data
              this.totalRows = resp.allCount;
          }
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getPhtableList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getPhtableList();
      }
    },
    mounted(){
        this.getPhtableList();
    }
  }

</script>

<style lang="stylus" scoped>
.header-search
  .el-input--mini
    width : 3rem
.pagination-wrapper
  text-align : center
</style>
