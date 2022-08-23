import request from '@/utils/request'

// 页面初始化数据
export function searchById(params) {
  return request({
    url: '/task-service/task/search',
    params
  })
}
// 获取补货详情
export function getDetail(id) {
  return request({
    url: `task-service/taskDetails/${id}`
  })
}
// 设置警戒线
export function setEndNum(data) {
  return request({
    url: `task-service/task/autoSupplyConfig`,
    method: 'POST',
    data
  })
}
// 获得警戒线
export function getEndNum() {
  return request({
    url: `task-service/task/supplyAlertValue`
  })
}
// 获取运营人员信息
export function getManager(innerCode) {
  return request({
    url: `user-service/user/operatorList/${innerCode}`
  })
}
// 获取补货详情
export function getAddGoods(innerCode) {
  return request({
    url: `vm-service/channel/channelList/${innerCode}`
  })
}
