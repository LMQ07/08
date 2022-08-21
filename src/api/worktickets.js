import request from '@/utils/request'

export function searchById(params) {
  return request({
    url: '/task-service/task/search',
    params
  })
}
