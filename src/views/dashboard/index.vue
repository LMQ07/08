<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-row type="flex" justify="space-between">
            <!-- 工单统计 -->
            <el-col
              :span="13"
              class="card tickets"
            >
              <div class="box">
                <!-- 头部 -->
                <div class="header-box">
                  <span class="header">工单统计</span>
                  <span>{{ startTime }}~{{ endTime }}</span>
                </div>
                <div class="body">
                  <div class="item">
                    <span class="num">265</span>
                    <span class="name">工单总数</span>
                  </div>
                  <div class="item">
                    <span class="num">265</span>
                    <span class="name">工单总数</span>
                  </div>
                  <div class="item">
                    <span class="num">265</span>
                    <span class="name">工单总数</span>
                  </div>
                  <div class="item">
                    <span class="num">265</span>
                    <span class="name">工单总数</span>
                  </div>
                </div>
              </div>
            </el-col>
            <!-- 销售统计 -->
            <el-col :span="10" class="card sales">
              <div class="box">
                <div class="header-box">
                  <span class="header">销售统计</span>
                  <span>{{ startTime }}~{{ endTime }}</span>
                </div>
                <div class="body">
                  <div class="item">
                    <span class="num">9459</span>
                    <span class="name">订单量（个）</span>
                  </div>
                  <div class="item">
                    <span class="num">265</span>
                    <span class="name">销售额（万元）</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 销量数据 -->
          <el-row class="saleNumber">
            <div class="header-box">
              <div>
                <span class="header">销售数据</span>
                <span>{{ saleStartTime }}~{{ endTime }}</span>
              </div>
              <div class="week-month-year">
                <span class="active">周</span>
                <span>月</span>
                <span>年</span>
              </div>
            </div>
            <div class="sale-body">
              <el-row>
                <el-col :span="12">
                  <div>
                    <echarts :option="saleNumoption" />
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <echarts :option="saleTotaloption" />
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <!-- 热销榜 -->
          <el-card class="card" shadow="never">
            <div class="header-box">
              <span class="header">商品热榜</span> <span>{{ startTime }}~{{ endTime }}</span>
            </div>
            <el-row v-for="item,index in bussinessTopList" :key="index" class="body">
              <el-col :span="5"><div class="icon">1</div></el-col>
              <el-col :span="13" class="title">{{ item.skuName }}</el-col>
              <el-col :span="6" class="sale">{{ item.count }}单</el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-card class="common">
            <div class="header">
              合作商点位数Top5
            </div>
            <div>
              <el-col :span="17">
                <echarts :option="partneroption" />
              </el-col>
              <el-col :span="7">1323434</el-col>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card class="common">
            <div class="header">
              <span>异常设备监控</span>
            </div>
            <div class="main">
              <img src="@/assets/images/404.png" alt="">
              <span>暂无数据</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getBussinessTop, getSaleNumWeek, getSaleTotal, getTogetherPartner } from '@/api/dashboard'
import echarts from './components/echarts.vue'
import { getUserInfo } from '@/api/user'
export default {
  name: 'Dashboard',
  components: { echarts },
  data() {
    return {
      startTime: '',
      endTime: '',
      saleStartTime: '',
      bussinessTopList: [],
      saleNumoption: {},
      saleTotaloption: {},
      userInfo: {},
      partneroption: {}
    }
  },
  mounted() {
    // console.log(await getBussinessTop())
    this.getTopBussiness()
    this.getSaleNumWeek()
    this.getSaleTotal()
    this.getUserInfo()
    this.getPartner()
  },
  methods: {
    fixZero(m) {
      return String.prototype.padStart.call(m, 2, 0)
    },
    // 获取商业前十的
    async getTopBussiness() {
      const timer = new Date()
      const y = timer.getFullYear()
      const m = this.fixZero(timer.getMonth() + 1)
      const d = this.fixZero(timer.getDate())
      this.startTime = `${y}-${m}-01`
      this.endTime = `${y}-${m}-${d}`
      const res = await getBussinessTop(this.startTime, this.endTime)
      console.log(res.data)
      this.bussinessTopList = res.data
      console.log(this.$store.getters.userId)
      // 请求来的数据
      // console.log(await getUserInfo(this.$store.getters.userId))
    },
    async getUserInfo() {
      const res = await getUserInfo(this.$store.getters.userId)
      this.userInfo = res.data
      console.log(this.userInfo)
    },
    // 获取销售数据趋势图
    async getSaleNumWeek() {
      const timer = new Date(+new Date() - (6 * 24 * 60 * 60 * 1000))
      const y = timer.getFullYear()
      const m = this.fixZero(timer.getMonth() + 1)
      const d = this.fixZero(timer.getDate())
      console.log(timer.getDay())
      this.saleStartTime = `${y}-${m}-${d}`
      const res = await getSaleNumWeek(this.saleStartTime, this.endTime)
      const dateArr = res.data.series.map(item => {
        return parseInt((item / 100))
      })
      console.log(dateArr)
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: dateArr,
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      this.saleNumoption = option
    },
    // 获取销售额
    async getSaleTotal() {
      const res = await getSaleTotal(this.saleStartTime, this.endTime)
      console.log(res)
      const option = {
        xAxis: {
          type: 'category',
          data: res.data.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: res.data.series,
            type: 'bar'
          }
        ]
      }
      this.saleTotaloption = option
    },
    // 获取合作商
    async getPartner() {
      const res = await getTogetherPartner()
      console.log('partner', res.data)
      const date = res.data.map(item => { return { name: item['name'], value: item['value'] } })
      console.log(date)
      const option = {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 0
            },
            data: date
          }
        ]
      }
      this.partneroption = option
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
::v-deep .el-card__body{
// padding-left: 10px;
// padding-right: 10px;
padding-top: 10px;
}
.card{
  background-color: #fff;
  border-radius: 20px;
  .header-box{
    font-size: 12px;
    font-weight: 400;
    color: #999;
    .header{
    margin-right: 10px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
    }
  }
}
.body{
.icon{
  width: 21px;
  height: 20px;
  color: #8e5900;
  font-size: 14px;
  }
 .title{
  font-weight: 500;
  color: #333;
  font-size: 14px;
 }
 .sale{
  font-weight: 400;
  color: #737589;
  font-size: 14px;
 }
}
.tickets{
  min-height: 166px;
  background: url(~@/assets/images/gongdan1.png),url(~@/assets/images/gongdan2.png);
  background-repeat: no-repeat,no-repeat;
  background-position: 0 0,calc(100% - 12px) 100%;
  background-color: #e9f3ff;
  padding-left: 10px; padding-right: 10px;
  box-sizing: border-box;
  .box{
  padding-left: 20px !important;
  padding-right: 20px  !important;
  }
}
   .body{
    display: flex;
    justify-content: space-around;
    .item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .num{
      color: #072074;
      font-size: 36px;
      text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
      font-weight: 600;
    }
    .name{
      color: #91a7dc;
      font-size: 12px;
    }
  }
.sales{
  background: #e9f3ff;
  min-height: 166px;
  background: #fbefe8 url(../../assets/images/sales.png) no-repeat calc(100% - 12px) 100%;
  padding-left: 10px; padding-right: 10px;
  box-sizing: border-box;
 .box{
  padding-left: 20px !important;
  padding-right: 20px  !important;
  }
  .num{
  color: #ff5757;
  text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }
  .name{
    color: #de9690;
  }
}
.saleNumber{
  min-height: 352px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
   .header-box{
    font-size: 12px;
    font-weight: 400;
    color: #999;
    display: flex;
    justify-content: space-between;
    .header{
    margin-right: 10px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
    }
    .week-month-year{
      width: 129px;
    height: 34px;
    background: rgba(233,243,255,.37);
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    span{
    display: inline-block;
    text-align: center;
    line-height: 25px;
    font-weight: 600;
    color: #9ca3b4;
    width: 37px;
    height: 25px;
    font-size: 14px;
    cursor: pointer;
    &.active{
     color: #333;
      background-color: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
       border-radius: 7px;
    }
    }
    }
  }
}
.bottom{
  margin-top:15px;
  .common{
    border-radius:20px;
    min-height: 353px;
    background: #fff;
    padding: 10px;
    .header{
    font-weight: 600;
    color: #333;
    font-size: 16px;
    height: 16px;
    }
    .main{
      display: flex;
      height: 260px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
