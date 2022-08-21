<template>
  <div class="main">
    <!-- 头部查询框 -->
    <div class="search">
      <!-- 表单提交 -->
      <el-form :inline="true" :model="searchMsg" class="demo-form-inline" size="medium">
        <el-form-item label="工单编号：">
          <el-input v-model="searchMsg.taskCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="工单状态：">
          <el-select v-model="searchMsg.status" placeholder="请选择">
            <el-option label="待办" value="1" />
            <el-option label="进行" value="2" />
            <el-option label="取消" value="3" />
            <el-option label="完成" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- main部分 -->
    <div class="body">
      123
      <Table />
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table'
export default {
  components: {
    Table
  },
  data() {
    return {
      searchMsg: {
        taskCode: '',
        status: ''
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.main{
  margin-left:20px;
  margin-top:20px;
}
.search{
    height: 64px;
    width:100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding-left: 17px;
    margin-bottom: 20px;
    .demo-form-inline{
      box-sizing: border-box;
      .el-form-item{
        margin-bottom: 0;
        font-size: 14px;
        color: #606266;
        label{
          font-weight: 400 !important;
        }
        .el-button{
          display: flex;
          align-items: center;
          background-color: #5f84ff;
          font-size: 14px;
        }
      }
    }
}
.body{
    padding: 20px 15px 19px 17px;
    background-color: #fff;
}

</style>
