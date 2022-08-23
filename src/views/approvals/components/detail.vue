<template>
  <div>
    <el-dialog
      title="工单信息"
      :visible="detailShow"
      width="630px"
      :before-close="handleClose"
    >
      <div class="task-status">
        <div class="img">
          <img src="@/assets/images/detail3.png" alt="">
          <span>待办</span>
        </div>
        <img src="@/assets/images/detail4.png" alt="">
      </div>
      <div class="detail-two">
        <el-row>
          <el-col :span="12">
            <span>设备编号:  </span>
            <span>{{ currentDetail.innerCode }}</span>
          </el-col>
          <el-col :span="12">
            <span>创建日期:  </span>
            <span>{{ currentDetail.updateTime && currentDetail.updateTime.split("T").join(" ") }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>运营人员:  </span>
            <span>{{ currentDetail.userName }}</span>
          </el-col>
          <el-col :span="12">
            <span>工单类型:  </span>
            <span>{{ currentDetail.taskType&& currentDetail.taskType.typeName }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>补货数量:  </span>
            <!-- taskId -->
            <span style="color: #5f84ff;font-weight: bold" @click="showAddGoodsWay">补货详情</span>
          </el-col>
          <el-col :span="12">
            <span>工单方式:  </span>
            <span>{{ currentDetail.createType }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>备注:  </span>
            <span>{{ currentDetail.desc }}</span>
          </el-col>
        </el-row>
      </div>
      <el-row class="button-two-detail">
        <el-button @click="handleClose">取消工单</el-button>
      </el-row>
    </el-dialog>
    <addGoosDetail :id="currentDetail.taskId" :show-add-goods.sync="showAddGoods" />
  </div>
</template>

<script>
import addGoosDetail from './addGoosDetail.vue'
export default {
  name: 'Detail',
  components: {
    addGoosDetail
  },
  props: {
    detailShow: {
      type: Boolean,
      default: false
    },
    currentDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showAddGoods: false
    }
  },
  methods: {
    handleClose() {
      this.$parent.detailShow = false
    },
    showAddGoodsWay() {
      this.$parent.detailShow = false
      this.showAddGoods = true
    }
  }
}
</script>

<style lang="scss">
.task-status{
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0,0%,92.5%,.39);
  padding: 0 50px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .img{
    display: flex;
    align-items: center;
    span{
      margin-left:20px
      }
  }
}
.detail-two{
  padding-left: 40px;
  .el-row{
      display: flex;
      align-items: center;
      line-height: 36px;
      span{
      margin-left:20px
      }
  }
}

.button-two-detail{
    margin:20px auto;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
}
</style>
