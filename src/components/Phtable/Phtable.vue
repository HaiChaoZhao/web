<template>
  <div>
    <div class="header-search" >
        <el-input
        placeholder="编号或户主姓名"
        prefix-icon="el-icon-search"
        clearable
        size="mini"
        v-model="serachInput">
        </el-input>
        <el-button type="primary" size="mini" >查询</el-button>
    </div>
    <el-table :data="tableData" stripe max-height="450" v-loading="loading" style="font-size: 0.22rem;">
      <el-table-column prop="number" label="贫困户编号" width="60" fixed>
      </el-table-column>
      <el-table-column prop="name" label="贫困户户主姓名" width="76" fixed>
      </el-table-column>
      <el-table-column prop="causeOfPoverty" label="致贫原因">
      </el-table-column>
      <el-table-column prop="helpMeasures" label="帮扶措施">
      </el-table-column>
      <el-table-column prop="helpMeasuresAgency" label="帮扶措施实行机构" width="75">
      </el-table-column>
      <el-table-column prop="helpMeasuresPlan" label="帮扶计划">
      </el-table-column>
      <el-table-column prop="helpMeasuresPlanYear" label="帮扶计划年份" width="75">
      </el-table-column>
      <el-table-column prop="responsibleAndAgency" label="责任人及所属机构" width="110">
      </el-table-column>
      <el-table-column prop="progressInfo" label="进展情况">
      </el-table-column>
      <el-table-column prop="outOfPoverty" label="是否脱贫">
      </el-table-column>
      <el-table-column prop="outOfPovertyDate" label="脱贫时间">
      </el-table-column>
      <el-table-column prop="returnToPoverty" label="是否返贫">
      </el-table-column>
      <el-table-column prop="returnToPovertyDate" label="返贫时间">
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
          :total="400">
          </el-pagination>
    </div>
  </div>
</template>

<script>
  import axois from 'axios'
  export default {
    name: "Phtable",
    data() {
      return {
        loading: true,
        tableData: [],
        serachInput:'',
        currentPage:1
      }
    },
    methods: {
      getPhtableList(){
          axois.get('/api/phtable.json')
          .then(this.hanldeGetPhtableListSucc)
      },
      hanldeGetPhtableListSucc(res){
          const resp=res.data
          if(resp.RetCode=='1'&&resp.DataRows){
              this.loading=false
              const data = resp.DataRows
              this.tableData=data
          }
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
