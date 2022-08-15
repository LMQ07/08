<template>
  <div id="app">
    <!-- <router-view /> -->
    <homework :total="50" :num="5" @preDate="preDate" @nextDate="nextDate" @pageChange="request" />
    <!-- <homework :total="50" :num="5" @preDate="preDate" @nextDate="nextDate" /> -->
  </div>
</template>

<script>
import homework from './homework'
export default {
  name: 'App',
  components: {
    homework
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    preDate() {
      console.log('上一页数据')
    },
    nextDate() {
      console.log('下一页数据')
    },
    request(page) {
      console.log('发送请求', page)
    }
  }
}
</script>
