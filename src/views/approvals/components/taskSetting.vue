<template>
  <el-dialog
    title="工单配置"
    :visible="showSetting"
    width="630px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="补货警戒线" prop="alertValue" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
        <el-input-number v-model="form.alertValue" controls-position="right" />
      </el-form-item>
      <el-form-item label-width="203px">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import { setEndNum } from '@/api/worktickets'
export default {
  props: {
    showSetting: {
      type: Boolean,
      default: false
    },
    num: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      form: {
        alertValue: 0
      }
    }
  },
  watch: {
    num(val) {
      this.form.alertValue = val
    }
  },

  methods: {
    async confirm() {
      try {
        const res = await setEndNum({ alertValue: this.form.alertValue })
        console.log(res)
        this.handleClose()
      } catch {
        this.$message.error('数据更改失败')
      }
    },
    handleClose() {
      this.$parent.showSetting = false
    }
  }

}
</script>

<style scoped>
.el-input-number{
  width:474px
}
.el-form-item__content{
 margin-left: 203px !important;
}
</style>

