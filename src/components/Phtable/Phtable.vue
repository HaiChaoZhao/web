<template>
  <div>
    <div class="header-search" >
        <el-input
        placeholder="户主姓名"
        prefix-icon="el-icon-search"
        clearable
        size="mini"
        v-model="serachInput">
        </el-input>
        <el-button type="primary" size="mini" @click="getPhtableList" >查询</el-button>
    </div>
    <el-table :data="tableData" stripe max-height="450" v-loading="loading" style="font-size: 0.22rem;">
      <el-table-column type="index" label="序号" width="20" fixed>
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
      <el-table-column  label="责任人及所属机构" width="110">
        <template slot-scope="scope">
          {{ scope.row.responsible.username }}/{{ scope.row.responsible.agency }}
        </template>
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
          <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <div class="form-wrapper" >
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="125px" size="mini">
        <el-form-item label="贫困户户主姓名" 	 prop="name"  >
        <el-input v-model="ruleForm.name" placeholder="输入贫困户户主姓名" :disabled="true" ></el-input>
      </el-form-item>
      <el-form-item label="致贫原因" prop="causeOfPoverty">
        <el-select v-model="ruleForm.causeOfPoverty" multiple  placeholder="请选择致贫原因">
          <el-option v-for="(item,index) of causeOfPovertyOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item prop="helpMeasures" label="帮扶措施"  required >
          <!-- 多选 -->
            <el-select placeholder="选择帮扶措施" multiple v-model="ruleForm.helpMeasures" >
              <el-option v-for="(item,index) of helpMeasuresOptions" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
      <el-form-item prop="helpMeasuresAgency" label="帮扶措施实行机构" >
        <!-- 多选 -->
        <el-select  placeholder="选择帮扶措施实行机构" multiple v-model="ruleForm.helpMeasuresAgency" >
          <el-option v-for="(item,index) of agencyOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帮扶计划" prop="helpMeasuresPlan">
        <el-input type="textarea" v-model="ruleForm.helpMeasuresPlan"></el-input>
      </el-form-item>
      <el-form-item label="帮扶计划年份" prop="helpMeasuresPlanYear">
        <el-date-picker
        v-model="ruleForm.helpMeasuresPlanYear"
        type="year"
        value-format="yyyy"
        placeholder="选择年">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人及所属机构">
        <el-col :span="5">
          <el-form-item prop="responsible" >
          <el-select  placeholder="选择责任人" v-model="ruleForm.responsible" >
            <el-option v-for="(item,index) of UserList" :key="index" :label="item.username+'/'+item.agency" :value="item._id"></el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="进展情况" prop="progressInfo">
        <el-select  v-model="ruleForm.progressInfo">
         <el-option v-for="(item,index) of progressOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否脱贫" prop="outOfPoverty">
        <el-select v-model="ruleForm.outOfPoverty" @change="checkSelect('outOfPoverty')" >
          <el-option label="是" value="是" ></el-option>
          <el-option label="否" value="否" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="脱贫时间" prop="outOfPovertyDate" v-show="showoutOfPoverty" >
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.outOfPovertyDate" value-format="yyyy/MM/dd" ></el-date-picker>
      </el-form-item>
      <el-form-item label="是否返贫" prop="returnToPoverty"  >
        <el-select v-model="ruleForm.returnToPoverty" @change="checkSelect('returnToPoverty')" >
          <el-option label="是" value="是" ></el-option>
          <el-option label="否" value="否" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="返贫时间" prop="returnToPovertyDate" v-show="showreturnToPoverty" >
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.returnToPovertyDate" value-format="yyyy/MM/dd" ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axois from "axios";
export default {
  name: "Phtable",
  data() {
    return {
      dialogFormVisible:false,
      showoutOfPoverty:0,
      showreturnToPoverty:0,
      curEditRow:'',
      ruleForm: {
          name: '',
          causeOfPoverty: [],
          helpMeasures: [],
          helpMeasuresAgency: [],
          helpMeasuresPlan: '',
          helpMeasuresPlanYear: "",
          responsible:'',
          progressInfo: '',
          outOfPoverty:'',
          outOfPovertyDate:'',
          returnToPoverty:'',
          returnToPovertyDate:''
        },
      rules:{
          helpMeasures:[
            { required: true, message: '请选择帮扶措施', trigger: 'change' }
          ]
      },
      causeOfPovertyOptions:["致病","残疾","因学/教育","失业","缺乏劳动力","其他"],
      helpMeasuresOptions:["资金帮扶","日常医疗救助","教育救助","大病救助","就业帮扶","其他"],
      agencyOptions:["农业局","教育局","扶贫办","民政局","其他"],
      progressOptions:["股份合作制扶贫","家庭手工业扶贫","光伏扶贫","旅游扶贫","电商扶贫","土地扶贫模式","雨露计划","免费培训帮助就业","贴息贷款帮助就业","扶持自主创业","精准扶贫贫困家庭高校毕业生就生","扶贫小额贷款","学前教育","义务教育","普通高中、中等职业教育","大学生教育","城乡特困救助","灾民应急救助","城乡居民基本医疗保险","城乡居民大病保险","城乡居民医疗救助","建档立卡户大额慢性病救助","建档立卡户重特大疾病救助","参保建档立卡户大病保险报销","危房改造计划","其他"],
      UserList:[],
      loading: true,
      loading1:'',
      tableData: [],
      serachInput: "",
      currentPage: 1,
      totalRows: 0,
      pagesize: 10
    };
  },
  methods: {
    getPhtableList() {
      axois
        .get(`/api/phs/${this.currentPage}-${this.pagesize}-${this.serachInput}`)
        .then(this.hanldeGetPhtableListSucc)
    },
    hanldeGetPhtableListSucc(res) {
      const resp = res.data
      if (resp.RetCode == "1" && resp.DataRows) {
        this.loading = false
        const data = resp.DataRows
        this.tableData = data
        this.totalRows = resp.allCount
      }
    },
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getPhtableList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getPhtableList()
    },
    getAllmeber(){
        axois.get('/api/users/1-1000')
             .then(this.hanldeMeberGet)
    },
    hanldeMeberGet(res){
      const resp = res.data
      if(resp.RetCode == "1" && resp.DataRows) {
        this.UserList = resp.DataRows
      }else{
        this.$message({
          type:'error',
          message:"无法获取责任人列表,请联系系统管理员"
        })
      }
    },
    editRow(row){
      this.curEditRow = row._id
      this.ruleForm.name = row.name
      this.ruleForm.causeOfPoverty = row.causeOfPoverty.split(',')
      this.ruleForm.helpMeasures = row.helpMeasures.split(',')
      this.ruleForm.helpMeasuresAgency = row.helpMeasuresAgency.split(',')
      this.ruleForm.helpMeasuresPlan = row.helpMeasuresPlan
      this.ruleForm.helpMeasuresPlanYear = row.helpMeasuresPlanYear
      this.ruleForm.responsible = row.responsible._id
      this.ruleForm.progressInfo = row.progressInfo
      this.ruleForm.outOfPoverty = row.outOfPoverty
      this.ruleForm.outOfPovertyDate = row.outOfPovertyDate
      this.ruleForm.returnToPoverty = row.returnToPoverty
      this.ruleForm.returnToPovertyDate = row.returnToPovertyDate
      if(row.outOfPoverty=="是"){
        this.showoutOfPoverty=1
      }else{
        this.showoutOfPoverty=0
      }
      if(row.returnToPoverty=="是"){
        this.showreturnToPoverty=1
      }else{
        this.showreturnToPoverty=0
      }
      this.dialogFormVisible = true
    },
    checkSelect(SelectName){
      if(this.ruleForm[SelectName]=="是"){
        this.ruleForm[SelectName+"Date"]=""
        this.$data['show'+SelectName] = 1
      }else{
        this.ruleForm[SelectName+"Date"]=""
        this.$data['show'+SelectName] = 0
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.loading1 = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            axois.patch(`/api/phs/${this.curEditRow}`,{
              causeOfPoverty: this.ruleForm.causeOfPoverty.join(''),
              helpMeasures: this.ruleForm.helpMeasures.join(''),
              helpMeasuresAgency: this.ruleForm.helpMeasuresAgency.join(''), 
              helpMeasuresPlan: this.ruleForm.helpMeasuresPlan,
              helpMeasuresPlanYear: this.ruleForm.helpMeasuresPlanYear,
              responsible:this.ruleForm.responsible,
              progressInfo: this.ruleForm.progressInfo,
              outOfPoverty:this.ruleForm.outOfPoverty,
              outOfPovertyDate:this.ruleForm.outOfPovertyDate,
              returnToPoverty:this.ruleForm.returnToPoverty,
              returnToPovertyDate:this.ruleForm.returnToPovertyDate
            }).then(this.hanldePostPhtableFormSucc).catch(function (error) {
              console.log(error);
            });
          } else {
            this.$message({
            type:'error',
            message:"请检查选项输入是否有误"
          })
            return false;
          }
        });
      },
      hanldePostPhtableFormSucc(res) {
        this.loading1.close()
        const resp = res.data
        if (resp.RetCode == '1' ) {
          this.dialogFormVisible=false
          this.getPhtableList()
          this.$message({
            type:'success',
            message:"修改成功"
          })
        }else{
          this.$message({
            type:'error',
            message:"提交失败,"+resp.RetVal
          })
        }
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.getAllmeber()
    this.getPhtableList()
  }
};
</script>

<style lang="stylus" scoped>
.form-wrapper >>>
  .el-textarea,.el-input,.el-date-editor.el-input, .el-date-editor.el-input__inner
    width : 3.5rem
.header-search 
  .el-input--mini 
    width: 3rem;
.pagination-wrapper 
  text-align: center

</style>
