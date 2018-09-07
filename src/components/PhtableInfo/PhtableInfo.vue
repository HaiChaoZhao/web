<template>
  <div>
    <div class="header-search" >
        <el-input
        placeholder="姓名"
        prefix-icon="el-icon-search"
        clearable
        size="mini"
        v-model="serachInput">
        </el-input>
        <el-button type="primary" size="mini" @click="getPhtableList" >查询</el-button>
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
      <el-table-column  label="户籍所在地" >
        <template slot-scope="scope">
          <span> {{scope.row.censusAddr.split('-').join('')}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" >
      </el-table-column>
      <el-table-column  label="居住地址">
        <template slot-scope="scope">
          <span> {{scope.row.Address.split('-').join('')}} </span>
        </template>
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
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" size="mini" label-width="125px" >
      <el-form-item label="贫困户户主名" prop="belong" >
          <el-input v-model="ruleForm.belong" :disabled="true" ></el-input>
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
  import axois from 'axios'
  export default {
    name: "PhtableInfo",
    data() {
      return {
        loading: true,
        loading1:'',
        tableData: [],
        serachInput:'',
        currentPage:1,
        totalRows: 0,
        pagesize: 10,
        dialogFormVisible:false,
        curEditRow:'',
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
      getPhtableList(){
          axois.get(`/api/phr/${this.currentPage}-${this.pagesize}-${this.serachInput}`)
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
      },
      editRow(row){
      this.curEditRow = row._id
      this.ruleForm.name = row.name
      this.ruleForm.idNumber = row.IDNumber
      this.ruleForm.belong = row.belong.name
      this.ruleForm.relationship = row.relationship
      this.ruleForm.censusCategory = row.censusCategory
      this.ruleForm.nationality = row.nationality
      this.ruleForm.phone = row.phone
      this.ruleForm.address = row.Address.split('-')
      this.ruleForm.censusAddr = row.censusAddr.split('-')
      this.dialogFormVisible = true
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
            axois.patch(`/api/phr/${this.curEditRow}`,
            {
              	name: this.ruleForm.name,
                relationship: this.ruleForm.relationship ,
                nationality: this.ruleForm.nationality ,
                censusCategory: this.ruleForm.censusCategory ,
                IDNumber: this.ruleForm.idNumber ,
                censusAddr: this.ruleForm.censusAddr.join('-'),
                phone: this.ruleForm.phone,
                Address: this.ruleForm.address.join('-'),
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
        this.dialogFormVisible = false
        this.getPhtableList()
        const resp = res.data
        if (resp.RetCode == '1' ) {
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
    },
    mounted(){
        this.getPhtableList();
    }
  }

</script>

<style lang="stylus" scoped>
.form-wrapper >>>
  .el-textarea,.el-input,.el-date-editor.el-input, .el-date-editor.el-input__inner
    width : 3.5rem
.header-search
  .el-input--mini
    width : 3rem
.pagination-wrapper
  text-align : center
</style>
