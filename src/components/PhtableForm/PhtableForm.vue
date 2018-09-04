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
        <!-- <el-col class="line" :span="1" style="text-align:center" >-</el-col>
        <el-col :span="8">
          <el-form-item prop="agency" >
            <el-select placeholder="选择所属机构" v-model="ruleForm.agency" > 
              <el-option v-for="(item,index) of agencyOptions" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
        loading:{},
        showoutOfPoverty:0,
        showreturnToPoverty:0,
        ruleForm: {
          name: '',
          causeOfPoverty: [],
          helpMeasures: '',
          helpMeasuresAgency: '',
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
          name:[
            { required: true, message: '请输入贫困户户主姓名', trigger: 'blur' }
          ],
          helpMeasures:[
            { required: true, message: '请选择帮扶措施', trigger: 'change' }
          ]
        },
        causeOfPovertyOptions:["致病","残疾","因学/教育","失业","缺乏劳动力","其他"],
        helpMeasuresOptions:["资金帮扶","日常医疗救助","教育救助","大病救助","就业帮扶","其他"],
        agencyOptions:["农业局","教育局","扶贫办","民政局","其他"],
        progressOptions:["股份合作制扶贫","家庭手工业扶贫","光伏扶贫","旅游扶贫","电商扶贫","土地扶贫模式","雨露计划","免费培训帮助就业","贴息贷款帮助就业","扶持自主创业","精准扶贫贫困家庭高校毕业生就生","扶贫小额贷款","学前教育","义务教育","普通高中、中等职业教育","大学生教育","城乡特困救助","灾民应急救助","城乡居民基本医疗保险","城乡居民大病保险","城乡居民医疗救助","建档立卡户大额慢性病救助","建档立卡户重特大疾病救助","参保建档立卡户大病保险报销","危房改造计划","其他"],
        UserList:[]
      }
    },
    methods: {
      getAllmeber(){
        axois.get('/api/users/1-1000')
             .then(this.hanldeMeberGet)
      },
      checkSelect(SelectName){
        if(this.ruleForm[SelectName]=="是"){
          this.ruleForm[SelectName+"Date"]=""
          this.$data['show'+SelectName] = 1
        }else{
          this.ruleForm[SelectName+"Date"]="无"
          this.$data['show'+SelectName] = 0
        }
        
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
      hanldePostPhtableFormSucc(res) {
        this.loading.close()
        const resp = res.data
        if (resp.RetCode == '1' && resp.DataRows) {
          this.resetForm('ruleForm')
          this.$message({
            type:'success',
            message:"添加成功"
          })
        }else{
          this.$message({
            type:'error',
            message:"提交失败,"+resp.RetVal
          })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            axois.post('/api/phs/',this.ruleForm).then(this.hanldePostPhtableFormSucc).catch(function (error) {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.getAllmeber()
    },
    mounted() {}
  }
</script>

<style lang="stylus" scoped>
.form-wrapper >>>
  .el-textarea,.el-input,.el-date-editor.el-input, .el-date-editor.el-input__inner
    width : 3.5rem
</style>
