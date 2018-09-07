<template>
  <div class="form-wrapper" >
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" size="mini" label-width="125px" >
      <el-form-item label="贫困户编号" prop="belong" >
          <el-select
            v-model="ruleForm.belong"
            filterable
            remote
            reserve-keyword
            placeholder="输入户主姓名搜索"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
            v-for="item in numberList"
            :key="item._id"
            :label="item.name"
            :value="item._id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item._id }}</span>
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name" >
          <el-input v-model="ruleForm.name" placeholder="输入姓名" ></el-input>
      </el-form-item>
      <el-form-item label="与户主关系" prop="relationship" >
          <el-select v-model="ruleForm.relationship" >
              <el-option v-for="(item,index) of relationshipOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="nationality" >
          <el-select filterable v-model="ruleForm.nationality" >
              <el-option v-for="(item,index) of nationalityOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="户籍类别" prop="censusCategory" >
          <el-select v-model="ruleForm.censusCategory" >
              <el-option label="农业" value="农业" ></el-option>
              <el-option label="非农业" value="非农业" ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber" >
          <el-input v-model="ruleForm.idNumber" ></el-input>
      </el-form-item>
      <el-form-item label="户籍所在地" prop="censusAddr" >
          <el-cascader
            :options="addrOptions"
            v-model="ruleForm.censusAddr"
            >
          </el-cascader>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone" ></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="address">
          <el-cascader
            :options="addrOptions"
            v-model="ruleForm.address"
            >
          </el-cascader>
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
          belong:'',
          name: '',
          relationship:'',
          nationality:'',
          censusCategory:'',
          idNumber:'',
          censusAddr:[],
          phone:'',
          address:[]
        },
        rules:{
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ]
        },
        numberList:[],
        relationshipOptions:["户主本人","父亲","母亲"],
        nationalityOptions:["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"],
        addrOptions:[{
            value: '河北省',
            label: '河北省',
            children:[{
                value:'保定市',
                label:'保定市',
                children:[{
                    value:'北市区',
                    label:'北市区'
                }]
            }
            ]
        }]
      }
    },
    methods: {
      remoteMethod(query) {
          if (query !== '') {
              this.loading = true;
              axois.get('/api/phs/search/'+query)
                   .then(this.handleRemoteMethod)
        } else {
          this.numberList = [];
        }
      },
      handleRemoteMethod(resp){
        const res = resp.data
        this.loading = false
        if(res.RetCode=='1'&&res.DataRows){
          this.numberList = res.DataRows
        }else if(res.RetCode=='1'){
          this.numberList =[]
        }else{
          this.numberList =[]
          this.$message({
            type:'error',
            message:'获取列表失败,'+res.RetVal
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
            axois.post('/api/phr/',
            {
              	name: this.ruleForm.name,
                relationship: this.ruleForm.relationship ,
                nationality: this.ruleForm.nationality ,
                censusCategory: this.ruleForm.censusCategory ,
                IDNumber: this.ruleForm.idNumber ,
                censusAddr: this.ruleForm.censusAddr.join('-'),
                phone: this.ruleForm.phone,
                Address: this.ruleForm.address.join('-'),
                belong: this.ruleForm.belong
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
