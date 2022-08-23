<template>
  <el-dialog
    title="补货详情"
    :visible="showAddGoods"
    width="630px"
    :before-close="handleClose"
  >
    <div class="dialog">
      <Table :is-show-done="false" :is-show-page="false" :is-show-index="false" :thead="tableMsg" :table-date="tableDate" />
    </div>
  </el-dialog>
</template>

<script>
import { getDetail } from '@/api/worktickets'
import Table from '@/components/Table'
export default {
  components: {
    Table
  },
  props: {
    showAddGoods: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      tableMsg: [
        { 'prop': 'channelCode', 'label': '货道编号' },
        { 'prop': 'skuName', 'label': '商品' },
        { 'prop': 'expectCapacity', 'label': '补货数量' }
      ],
      tableDate: []
    }
  },
  watch: {
    id(val) {
      console.log(val)
      this.getDate(val)
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showAddGoods', false)
    },
    async getDate(id) {
      const res = await getDetail(id)
      console.log(res)
      this.tableDate = res.data
    }
  }
}
</script>

<style scoped>
 .dialog{
  height: 350px;
  width:100%;
  overflow: auto;
 }
</style>
