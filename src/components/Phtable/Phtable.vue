<template>
  <div>
    <el-table :data="tableData" max-height="512" style="font-size: 0.22rem;">
      <el-table-column type="index" label="贫困户编号" width="60" fixed>
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
  </div>
</template>

<script>
  import axois from 'axios'
  export default {
    name: "Phtable",
    data() {
      return {
        tableData: []
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
              const data = resp.DataRows
              this.tableData=data
          }
      },
      handleClick(row) {
        console.log(row);
      }
    },
    mounted(){
        this.getPhtableList();
    }
  }

</script>

<style lang="stylus" scoped>


</style>
