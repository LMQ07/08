import request from '@/utils/request'
import store from '@/store'
// 获取前十的商品
export function getBussinessTop(start, end) {
  return request({
    url: `order-service/report/skuTop/10/${start}/${end}`
  })
}
// 获取销售数据趋势
export function getSaleNumWeek(start, end) {
  return request({
    url: `order-service/report/amountCollect/${
      store.getters.userId
    }/${start}/${end}`
  })
}
// 获取销售额分布
export function getSaleTotal(start, end) {
  return request({
    url: `order-service/report/regionCollect/${start}/${end}`
  })
}

// 获取合作商
export function getTogetherPartner() {
  return request({
    url: '/vm-service/node/nodeCollect'
  })
}
