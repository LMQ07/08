import request from '@/utils/request'
// 这个数字后面登录还需要用到
const num = Math.random() * 100
export function getcode() {
  const url = `/api/user-service/user/imageCode/${num}`
  return url
}
// 登录页面
export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data: {
      ...data,
      clientToken: num,
      loginType: 0
    }
  })
}
export function logout() {

}
