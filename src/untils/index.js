import store from '@/store'

export function hasPermission (permission) {
  if (!store.getters.roles.buttons.includes(permission)) {
    return false
  }
  return true
}