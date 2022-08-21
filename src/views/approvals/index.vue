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
      <div class="button">
        <el-button class="build" type="primary" icon="el-icon-circle-plus-outline" size="medium">新建</el-button>
        <el-button class="set" type="warning" size="medium">工单配置</el-button>
      </div>
      <Table
        :thead="tableSet"
        :table-date="tableDate"
        :total-count="totalCount"
        :total-page="totalPage"
        :page-index="pageIndex"
        @changePageIndex="changePageIndex"
      >
        <span class="detail" style="color: #5f84ff">查看详情</span>
      </Table>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table'
import { searchById } from '@/api/worktickets'
export default {
  components: {
    Table
  },
  data() {
    return {
      searchMsg: {
        taskCode: '',
        status: ''
      },
      tableSet: [{
        label: '工单编号',
        prop: 'taskCode'
      },
      {
        label: '设备编号',
        prop: 'innerCode'
      },
      {
        label: '工单类型',
        prop: 'taskType.typeName'
      },
      {
        label: '工单方式',
        prop: 'createType' // 创建类型，0:自动，1：手动
      },
      {
        label: '工单状态',
        prop: 'taskStatusTypeEntity.statusName'
      },
      {
        label: '运营人员',
        prop: 'userName'
      },
      {
        label: '创建日期',
        prop: 'createTime'
      }],
      pageIndex: 1,
      pageSize: 10,
      isRepair: false,
      totalCount: 0,
      totalPage: 0,
      tableDate: []
    }
  },
  mounted() {
    this.getTableDate()
  },
  methods: {
    async getTableDate() {
      const res = await searchById({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        isRepair: this.isRepair
      })
      console.log(res)
      this.totalCount = res.data.totalCount
      this.totalPage = res.data.totalPage
      this.tableDate = res.data.currentPageRecords
    },
    changePageIndex(val) {
      if (val === 0) {
        this.pageIndex -= 1
        this.getTableDate()
      } else {
        this.pageIndex += 1
        this.getTableDate()
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
          font-size: 14px;
        }
      }
    }
}
.body{
    padding: 20px 15px 19px 17px;
    background-color: #fff;
    .button{
      margin-bottom: 20px;
    }
    .build{
      background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
      border: none;
    }
    .set{
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    }
}

</style>
