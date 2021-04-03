<template>
  <d2-container class="container">
  <div class="index">
    <el-card class="box-card box-card-1">
      <div slot="header" class="clearfix">
        <span>产品数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="content">
        <div class="pie">
          <span class="tag" type="">产品地区分布</span>
          <ve-pie :data="AreaData"></ve-pie>
        </div>
        <div class="pie">
          <span class="tag" type="">产品所属分类</span>
          <ve-pie :data="Category"></ve-pie>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <ve-line :data="chartData"></ve-line>
    </el-card>
    <el-card class="box-card box-card-1">
      <div slot="header" class="clearfix">
        <span>产品数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="content">
        <div class="pie">
          <span class="tag" type="">产品地区分布</span>
          <ve-pie :data="AreaData"></ve-pie>
        </div>
        <div class="pie">
          <span class="tag" type="">产品所属分类</span>
          <ve-pie :data="Category"></ve-pie>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <ve-line :data="chartData"></ve-line>
    </el-card>
  </div>
  </d2-container>
</template>
<style lang="scss">
  .container{
    background:rgba(255,255,255,.05)
  }
  .d2-container-full__body{
    background:rgba(255,255,255,.25)!important;
  }
  .box-card{
      width:48%;
      height:550px;
      box-sizing: border-box;
      margin-left:calc(4% / 3);
      margin-top:30px;
      display: inline-block;
      box-shadow: 5px 7px 8px rgba(0,0,0,.1),
      -4px 6px 6px rgba(32,32,32,.1),
      //12px -14px 12px rgba(0,0,0,.25),
      -4px -6px 6px rgba(0,0,0,.1)!important;
      background:rgba(255,255,255,.8);
      transition:all .4s;
      backdrop-filter: blur(1px);
      border-radius: 15px;
  }
  .box-card:hover{
    background:rgba(255,255,255,.85);
    box-shadow: 8px 10px 10px rgba(0,0,0,.12),
    -7px 9px 9px rgba(0,0,0,.12),
    //12px -14px 12px rgba(0,0,0,.25),
    -7px -9px 9px rgba(0,0,0,.12)!important;
    backdrop-filter: blur(10px);
  }
  .box-card-1 .content .pie{
    box-sizing: border-box;
    display: inline-block;
    width:48%;
    margin-left: calc(4% / 3);
    .tag{
      font-size:18px;
      line-height: 36px;
      margin-bottom: 18px;
    }
  }
  .clearfix::after{
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  }
</style>
<script>
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import config from '@/libs/config.js'
import common from '@/libs/common.js'
export default {
  components: { VeLine,VePie },
  data () {
    return {
      chartData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      },
      AreaData: {
        columns: ['Area', 'Count'],
        rows: [
          { 'Area': '库房一', 'Count': 5 },
          { 'Area': '库房二', 'Count': 12 }
        ]
      },
      Category: {
        columns: ['Category', 'Count'],
        rows: [
          { 'Category': '分类1', 'Count': 3 },
          { 'Category': '分类2', 'Count': 4 }
        ]
      }
    }
  },
  mounted(){
    //1. 获取category和area分类的数据，并根据id建立关联
    //2. 获取product具体信息，渲染到数据端
    //3. 获取员工数据信息，进行渲染
    common.GetAreaData("")
  }
}
</script>
