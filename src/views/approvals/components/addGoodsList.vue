<template>
  <el-dialog
    title="工单信息"
    :visible="goodsListShow"
    width="630px"
    :before-close="handleClose"
  >
    <div class="main">
      <Table :is-show-page="false" :is-show-index="false" :done="'补满数量'" :thead="tableHeader" :table-date="tableDate">
        <template v-slot="{row}">
          <span v-if="row.currentCapacity === '-'">货道暂无商品</span>
          <el-input-number v-model="row.currentNum" size="mini" />
        </template>
      </Table>
    </div>
    <div class="button">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Table from '@/components/Table'
import { getAddGoods } from '@/api/worktickets'
export default {
  name: 'AddGoodsList',
  components: {
    Table
  },
  props: {
    goodsListShow: {
      type: Boolean,
      default: false
    },
    innercode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableHeader: [
        { 'label': '货道编号', 'prop': 'channelCode' },
        { 'label': '商品名称', 'prop': 'sku.skuName' },
        { 'label': '当前数量', 'prop': 'currentCapacity' },
        { 'label': '还可添加', 'prop': 'num' }
      ],
      tableDate: [],
      detailDate: []
    }
  },
  watch: {
    innercode(val) {
      this.getGoodList(val)
    }
  },
  mounted() { this.getGoodList(this.innercode) },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async getGoodList() {
      const res = await getAddGoods(this.innercode)
      console.log(res.data)
      this.detailDate = res.data
      const arr = res.data.map(item => {
        if (item.sku === null) {
          item.sku = {}
          item.sku.skuName = '-'
          item.currentCapacity = '-'
          item.maxCapacity = '-'
        } else {
          item.num = item.maxCapacity - item.currentCapacity
          item.currentNum = item.maxCapacity - item.currentCapacity
        }
        return item
      })
      this.tableDate = arr
      console.log(arr)
    },
    changeNum(row) {
      // console.log(row)
      // if (row.currentNum < row.num) {
      //   this.tableDate.foreach(item => { })
      // }
    },
    onSubmit() {

    }
  }
}
</script>

<style scoped lang="scss">
.main{
  height: 400px;
  overflow: auto;
  .el-input-number--mini{
  width: 88px;
}
}
.button{
  margin-top:22px;
  padding-left: 220px ;
}
</style>
