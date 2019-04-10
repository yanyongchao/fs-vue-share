const JWT_TOKEN = 'jwt'

export function getToken () {
  return localStorage.getItem(JWT_TOKEN)
}

export function setToken (token) {
  return localStorage.setItem(JWT_TOKEN, token)
}

export function removeToken () {
  return localStorage.removeItem(JWT_TOKEN)
}
