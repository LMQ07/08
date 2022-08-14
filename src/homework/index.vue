<template>
  <div class="container">
    <div class="left">
      <span>共{{ total }}条记录</span>
      <span>第{{ page }}/{{ totalPage }}页</span>
    </div>
    <div class="right">
      <button :disabled="page === 1" @click="changeDate(0)">上一页</button>
      <button :disabled="page === totalPage" @click="changeDate(1)">下一页</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Homework',
  props: {
    total: {
      type: Number,
      required: true
    },
    num: {
      type: Number,
      default: () => 10
    }
  },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.num)
    }
  },
  watch: {
    page(val) {
      try { this.$emit('pageChange', val) } catch {
        return
      }
    }
  },
  methods: {
    changeDate(num) {
      if (num === 0) {
        this.page--
        try { this.$emit('preDate') } catch {
          return
        }
      } else {
        this.page++
        try { this.$emit('nextDate') } catch {
          return
        }
      }
    }
  }
}
</script>

<style >
.container{
  margin: 20px;
  display:flex;
  justify-content: space-between;
}
.left span{
  display: inline-block;
  margin-right: 12px;
}
.right button {
  margin-left: 12px;
}
</style>
