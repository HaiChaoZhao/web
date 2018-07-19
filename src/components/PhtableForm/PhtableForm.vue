<template>
  <div class="form-wrapper" >
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" size="mini" label-width="125px" >
      <el-form-item label="贫困户户主姓名" 	 prop="name" required >
        <el-input v-model="ruleForm.name" placeholder="输入贫困户户主姓名" ></el-input>
      </el-form-item>
      <el-form-item label="致贫原因" prop="causeOfPoverty">
        <el-select v-model="ruleForm.causeOfPoverty" multiple  placeholder="请选择致贫原因">
          <el-option v-for="(item,index) of causeOfPovertyOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item prop="helpMeasures" label="帮扶措施" required >
            <el-select placeholder="选择帮扶措施" v-model="ruleForm.helpMeasures" >
              <el-option v-for="(item,index) of helpMeasuresOptions" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
      <el-form-item prop="helpMeasuresAgency" label="帮扶措施实行机构" >
        <el-select  placeholder="选择帮扶措施实行机构" v-model="ruleForm.helpMeasuresAgency" >
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
        placeholder="选择年">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人及所属机构">
        <el-col :span="5">
          <el-form-item prop="responsible" >
          <el-input  placeholder="输入责任人" v-model="ruleForm.responsible" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1" style="text-align:center" >-</el-col>
        <el-col :span="8">
          <el-form-item prop="agency" >
            <el-select placeholder="选择所属机构" v-model="ruleForm.agency" > 
              <el-option v-for="(item,index) of agencyOptions" :key="index" :label="item" :value="item"></el-option>
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
        <el-select v-model="ruleForm.outOfPoverty">
          <el-option label="是" value="是" ></el-option>
          <el-option label="否" value="否" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="脱贫时间" prop="outOfPovertyDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.outOfPovertyDate" ></el-date-picker>
      </el-form-item>
      <el-form-item label="是否返贫" prop="returnToPoverty">
        <el-select v-model="ruleForm.returnToPoverty">
          <el-option label="是" value="是" ></el-option>
          <el-option label="否" value="否" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="返贫时间" prop="returnToPovertyDate">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.returnToPovertyDate" ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axois from 'axios'
  export default {
    name: "PhtableForm",
    data() {
      return {
        loading: false,
        ruleForm: {
          name: '',
          causeOfPoverty: [],
          helpMeasures: '',
          helpMeasuresAgency: '',
          helpMeasuresPlan: '',
          helpMeasuresPlanYear: [],
          responsible:'',
          agency: '',
          progressInfo: '',
          outOfPoverty:'',
          outOfPovertyDate:'',
          returnToPoverty:'',
          returnToPovertyDate:''
        },
        rules:{
          name:[
            { required: true, message: '请输入贫困户户主姓名', trigger: 'blur' },
          ]
        },
        causeOfPovertyOptions:["致病","残疾","因学/教育","失业","缺乏劳动力","其他"],
        helpMeasuresOptions:["资金帮扶","日常医疗救助","教育救助","大病救助","就业帮扶","其他"],
        agencyOptions:["农业局","教育局","扶贫办","民政局","其他"],
        progressOptions:["股份合作制扶贫","家庭手工业扶贫","光伏扶贫","旅游扶贫","电商扶贫","土地扶贫模式","雨露计划","免费培训帮助就业","贴息贷款帮助就业","扶持自主创业","精准扶贫贫困家庭高校毕业生就生","扶贫小额贷款","学前教育","义务教育","普通高中、中等职业教育","大学生教育","城乡特困救助","灾民应急救助","城乡居民基本医疗保险","城乡居民大病保险","城乡居民医疗救助","建档立卡户大额慢性病救助","建档立卡户重特大疾病救助","参保建档立卡户大病保险报销","危房改造计划","其他"]
      }
    },
    methods: {
      hanldePostPhtableFormSucc(res) {
        const resp = res.data
        if (resp.RetCode == '1' && resp.DataRows) {
          this.loading = false
          const data = resp.DataRows
          this.tableData = data
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {}
  }

</script>

<style lang="stylus" scoped>
.form-wrapper >>>
  .el-textarea,.el-input,.el-date-editor.el-input, .el-date-editor.el-input__inner
    width : 3.5rem
</style>
