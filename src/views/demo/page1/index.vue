<template>
  <d2-container>
    <el-drawer
    title="新增员工"
    :before-close="handleClose"
    :visible.sync="dialog"
    direction="ltr"
    custom-class="demo-drawer"
    ref="drawer"
    >
    <div class="demo-drawer__content">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item sortable label="工号" :label-width="formLabelWidth" prop="nums">
          <el-input type="number" v-model="form.nums" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item sortable label="等级" :label-width="formLabelWidth" prop="level">
          <el-input type="number" v-model="form.level" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth" prop="place">
          <el-input v-model="form.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="telephone">
          <el-input type="number" v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop="mail">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submit('form')" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
    <template slot="header">员工管理</template>
    <div class="methods">
      <!--操作-->
      <el-button type="primary" @click="dialog = true">添加员工</el-button>
    </div>
    <u-table
    :data="tableData"
    :pagination-show="true"
      :total="pageForm.total"
      :page-size="pageForm.pageSize"
      :current-page="pageForm.currentPage"
    border
    style="width: 100%">
    <u-table-column
      fixed
      prop="ID"
      label="id"
      width="90">
    </u-table-column>
    <u-table-column
      prop="Name"
      label="姓名"
      width="90">
    </u-table-column>
    <u-table-column
      prop="Nums"
      label="工号"
      width="90">
    </u-table-column>
    <u-table-column
      prop="Level"
      label="级别"
      width="90">
    </u-table-column>
    <u-table-column
      prop="Sex"
      label="性别"
      width="120">
    </u-table-column>
    <u-table-column
      prop="Place"
      label="地址"
      show-overflow-tooltip
      width="180">
    </u-table-column>
    <u-table-column
      prop="Score"
      label="信誉分"
      min-width="120">
    </u-table-column>
    <u-table-column
      prop="Telephone"
      label="联系电话"
      min-width="120">
    </u-table-column>
    <u-table-column
      prop="Description"
      label="描述"
      min-width="120">
    </u-table-column>
    <u-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
      </template>
    </u-table-column>
  </u-table>
  </d2-container>
</template>
<style>
  .methods{
    margin-bottom: 20px;
  }
</style>
<script>
  import config from '@/libs/config.js'
  import common from '@/libs/common.js'
  export default {
    data() {
      return {
        dialog:false,
        loading:false,
        formLabelWidth:'80px',
        tableData: [],
        form:{
          name:null,
          level:null,
          score:100,
          sex:null,
          telephone:null,
          place:null,
          nums:null,
          description:null,
          username:'',
          password:'',
          mail:'',
          iswork:'true'
        },
        rules:{
          name:[
            {required:true,message:'请输入员工姓名',trigger:'change'}
          ],
          level:[
            {required:true,message:'请输入数字格式的等级',trigger:'change'}
          ],
          sex:[
            {required:true,min:1,max:1,message:'请输入正确的性别(男或女)',trigger:'change'}
          ],
          telephone:[
            {required:true,min:11,max:11,message:'请输入正确的中国大陆11位手机号',trigger:'change'}
          ],
          place:[
            {required:true,message:'请输入所在地区',trigger:'change'}
          ],
          nums:[
            {required:true,message:'请输入正确的工号',trigger:'change'}
          ],
          mail:[
            {required:true,message:'请输入电子邮箱',trigger:'change'}
          ],
          username:[
            {required:true,min:5,max:12,message:'用户名必须是5-12位的',trigger:'change'}
          ],
          password:[
            {required:true,min:5,max:15,message:'密码必须是5-15位的',trigger:'change'}
          ],
          description:[
            {required:true,min:5,max:15,message:'描述信息必须填写',trigger:'change'}
          ]
        },
        pageForm: {
          total: 0,
          pageSize: 10,
          currentPage: 1
      },
      }
    },
    methods: {
      handleClick(row) {
        this.$confirm(`确认删除id为${row.ID}\n名为${row.Name}的员工吗？该操作不可撤销哦`).then(_=>{
          //发送删除申请
          common.DeleteWorker(row.ID).then(res=>res.json()).catch(err=>{
            this.$message.error("未能删除数据")
            return
          }).then(res=>{
            if(res==undefined){
              this.$message.error("未知错误，请稍后重试")
              return
            }
            if(res.code !=200){
              this.$message.error(res.msg)
              return
            }
            this.$message.success("成功删除")
            this.UpdateData()
          })
        }).catch(_=>{
          //啥都不用做
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭吗')
          .then(_ => {

            done();
          })
          .catch(_ => {});
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
      },
      submit(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.loading = true
            common.PostWorkData("worker",this.form).then(data=>data.json()).catch(err=>{
              console.log(err)
              this.$message.error('提交时出错，请稍后重试')
              setTimeout(()=>{
                this.loading = false
                this.dialog = false
              },500)
              return
            }).then(res=>{
              if(res.code == undefined){
                this.$message.error('无法插入，请稍后重试')
                return
              }
              if(res.code!=200){
                this.$message.error(res.msg)
                setTimeout(()=>{
                  this.loading = false
                  this.dialog = false
                },500)
                return
              }
              this.$message.success("成功插入员工表")
              this.UpdateData()
              setTimeout(()=>{
                this.loading = false
                this.dialog = false
                //顺便刷新页面，重新获取数据
              },500)
            })
          }else{
            return
          }
        })

      },
      UpdateData(){
        common.GetWorkData("workers").then(res=>res.json()).catch(err=>console.log(err)).then(data=>{
          if(data == undefined){
            this.$message.error('未知错误，请稍后重试')
            return
          }
          if(data.data.workers==undefined){
            this.$message.error(`无法读取到员工信息,原因:${data.msg}`)
            return
          }
          console.log(data.data.workers)
          this.tableData = data.data.workers
          this.pageForm.total = this.tableData.length
        })
      }
    },
    mounted(){
        //权限验证(增加服务器负担，暂时不用)
        /*
        let token = localStorage.getItem('token')
        if (token == undefined){
          this.$message.error('您没有权限访问当前页面')
          setTimeout(()=>{
            localStorage.clear()
            this.$router.push('/login')
          },1500)
        }
        Authorization(token).then(res=>res.json()).catch(err=>{
          this.$message.error('您无权访问当前页面')
          setTimeout(()=>{
            localStorage.clear()
            this.$router.push('/login')
          },1500)
          return
        }).then(data=>{

          if(data.code != 200){
            this.$message.error(data.msg)
            setTimeout(()=>{
              localStorage.clear()
              this.$router.push('/login')
            },1500)
          }
        })
        */

        //获取数据
        this.UpdateData()
    },
  }
</script>
