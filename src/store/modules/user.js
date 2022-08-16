import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    pushToken(state, token) {
      state.token = token
      setToken(token)
    },
    clearToken(state) {
      removeToken()
      state.token = ''
    }
  },
  actions: {
    // 发起异步请求并且设置
    async getToken({ commit }, data) {
      const res = await login(data)
      console.log(res.data.token)
      commit('pushToken', res.data.token)
    }
  }
}
