import { getToken, setToken, removeToken } from '@/untils/auth'
import { login, getUserModule } from '@/api'
import base64 from '@/untils/base64'

const user = {
  state: {
    id: '',
    name: '',
    jwt: getToken(),
    roles: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.jwt = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLE: (state, role) => {
      console.log('...', role)
      state.roles = role
    },
    SET_UID: (state, uid) => {
      state.id = uid
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const _data = res.data
          if (_data.success) {
            const { jwt, username, uid } = _data.data
            commit('SET_TOKEN', jwt)
            commit('SET_NAME', username)
            commit('SET_UID', uid)
            setToken(jwt)
            resolve()
          } else {
            reject(new Error(_data.errorMsg))
          }
        })
      })
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // JSON.parse(base64.decode(state.jwt))用try catch 处理下异常
        try {
          let userinfo = JSON.parse(base64.decode(state.jwt))
          if (userinfo.exp < Date.now()) {
            reject(new Error('登录过期'))
          } else {
            commit('SET_UID', userinfo.uid)
            commit('SET_NAME', userinfo.username)
            getUserModule().then(res => {
              const _data = res.data
              if (_data.success) {
                commit('SET_ROLE', _data.data)
                resolve(_data.data)
              }
            }).catch(err => {
              reject(err)
            })
          }
        } catch(err) {
          reject(err)
        }
      })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
