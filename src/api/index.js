import http from '../plugins/http'
import qs from 'querystring'

export function getTableList (data) {
  return http.get(`/user/list?${qs.stringify(data)}`).then(res => {
    return res
  })
}

export function login(data) {
  return http.post('/login', data).then(res => {
    return res
  })
}

export function getUserModule() {
  return http.get('/user/module').then(res => {
    return res
  })
}
