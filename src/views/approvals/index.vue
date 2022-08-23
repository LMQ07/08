<template>
  <div class="main">
    <!-- 头部查询框 -->
    <div class="search">
      <!-- 表单提交 -->
      <el-form :inline="true" :model="searchMsg" class="demo-form-inline" size="medium">
        <el-form-item label="工单编号：">
          <el-input v-model="searchMsg.taskCode" placeholder="请输入" :clearable="true" />
        </el-form-item>
        <el-form-item label="工单状态：">
          <el-select v-model="searchMsg.status" placeholder="请选择" clearable>
            <el-option label="待办" value="1" />
            <el-option label="进行" value="2" />
            <el-option label="取消" value="3" />
            <el-option label="完成" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="searchByMsg">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- main部分 -->
    <div class="body">
      <div class="button">
        <el-button class="build" type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="newBuildShow= true">新建</el-button>
        <el-button class="set" type="warning" size="medium" @click="getNum">工单配置</el-button>
      </div>
      <Table
        v-loading="loading"
        :thead="tableSet"
        :table-date="tableDate"
        :total-count="totalCount"
        :total-page="totalPage"
        :page-index="pageIndex"
        @changePageIndex="changePageIndex"
      >
        <span slot-scope="{row}" class="detail" style="color: #5f84ff" @click="getDetail(row)">查看详情</span>
      </Table>
    </div>
    <NewBulid :new-build-show="newBuildShow" />
    <detail :detail-show="detailShow" :current-detail="currentDetail" />
    <taskSetting :show-setting="showSetting" :num="num" />
  </div>
</template>

<script>
import Table from '@/components/Table'
import NewBulid from './components/NewBulid.vue'
import { searchById, getEndNum } from '@/api/worktickets'
import detail from './components/detail.vue'
import taskSetting from './components/taskSetting.vue'
export default {
  components: {
    Table,
    NewBulid,
    detail,
    taskSetting
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
      tableDate: [],
      newBuildShow: false,
      loading: false,
      detailShow: false,
      currentDetail: {},
      showSetting: false,
      num: ''
    }
  },
  mounted() {
    this.getTableDate({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      isRepair: this.isRepair
    })
  },
  methods: {
    async getTableDate(obj) {
      try {
        this.loading = true
        const res = await searchById(obj)
        console.log(res)
        this.totalCount = res.data.totalCount
        this.totalPage = res.data.totalPage
        // 数据处理一下
        const arr = res.data.currentPageRecords.map((item) => {
          item.createTime = item.createTime.split('T').join(' ')
          item.createType = item.createType === 1 ? '手动' : '自动'
          return item
        })
        this.tableDate = arr
      } catch {
        this.$message.error('数据请求失败')
      } finally {
        this.loading = false
      }
    },
    changePageIndex(val) {
      if (val === 0) {
        this.pageIndex -= 1
        this.getTableDate()
      } else {
        this.pageIndex += 1
        this.getTableDate()
      }
    },
    async searchByMsg() {
      this.pageIndex = 1
      this.getTableDate({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isRepair: this.isRepair,
        ...this.searchMsg
      })
    },
    getDetail(detail) {
      this.detailShow = true
      console.log(detail)
      this.currentDetail = detail
    },
    async getNum() {
      this.showSetting = true
      console.log(await getEndNum())
      const res = await getEndNum()
      this.num = res.data
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
