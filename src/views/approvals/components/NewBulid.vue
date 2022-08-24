<template>
  <div>
    <el-dialog
      title="新增设备类型"
      :visible.sync="newBuildShow"
      width="630px"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="140px" :model="taskeDate">
        <el-form-item
          label="设备编号"
          prop="innerCode"
          :rules=" { required: true, message: '请输入', trigger: 'blur' }"
        >
          <el-input
            v-model="taskeDate.innerCode"
            type="text"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
            @blur="getManagerList"
          />
        </el-form-item>
        <el-form-item
          label="工单类型"
          prop="productType"
          :rules="{
            required: true,
            trigger: 'blur',
            message:'请选择'
          }"
        >
          <el-select v-model="taskeDate.productType" placeholder="请选择" style="width:100%">
            <el-option
              label="补货工单"
              value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="补货数量" prop="details.expectCapacity">
          <div>
            <span class="el-icon-document" style="color: #5f84ff" @click="showAddNumDialog">补货清单</span>
            <textarea v-model="taskeDate.details" hidden />
          </div>
        </el-form-item>
        <el-form-item
          label="运营人员"
          prop="userId"
          :rules="{
            required: true,
            trigger: 'blur',
            message:'请选择'
          }"
        >
          <el-select v-model="taskeDate.userId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item,index in managerList"
              :key="index"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="desc"
          :rules="{
            required: true,
            trigger: 'blur',
            message:'请输入'
          }"
        >
          <el-input
            v-model="taskeDate.desc"
            type="textarea"
            placeholder="请输入备注（不超过40字）"
            maxlength="40"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4}"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <addGoodsList :innercode="taskeDate.innerCode" :goods-list-show="goodsListShow" @close="getDetails" />
  </div>

</template>

<script>
import { getManager } from '@/api/worktickets'
import addGoodsList from './addGoodsList.vue'
export default {
  components: {
    addGoodsList
  },
  props: {
    newBuildShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      taskeDate: {
        createType: 1,
        innerCode: '',
        productType: '',
        desc: '',
        userId: '',
        details: ''
      },
      managerList: [],
      goodsListShow: false
    }
  },
  watch: {

  },
  methods: {
    handleClose() {
      this.$parent.newBuildShow = false
      this.$refs.form.resetField()
      this.taskeDate = {
        createType: 1,
        innerCode: '',
        productType: '',
        desc: '',
        userId: '',
        details: ''
      }
    },
    // 确认按钮
    async add() {
      try {
        await this.$refs.form.validate()
        this.dialogVisible = false
      } catch {
        console.log(2)
      }
    },
    // 补货清单跳出
    showAddNumDialog() {
      // 第一项校验完毕之后才能弹出框
      // 然后拿取最新的数据
      this.$refs.form.validateField(['innerCode'], (msg) => {
        console.log(msg)
        if (msg) return
        this.goodsListShow = true
      })
    },
    async getManagerList() {
      const res = await getManager(this.taskeDate.innerCode)
      console.log(res)
      this.managerList = res.data
    },
    // 关闭详情 同时获取detail
    getDetails() {
      console.log(1)
      this.goodsListShow = false
    }
  }
}
</script>

<style lang="scss" >
.el-dialog{
  border-radius: 15px;
  .el-dialog__title{
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
  }
  .el-button--default{
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
  .el-button--primary{
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
  }
  .dialog-footer{
    display: flex;
    padding-left:220px ;
  }

}
</style>
