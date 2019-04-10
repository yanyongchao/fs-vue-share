import { hasPermission } from '@/untils'

export default {
  install (Vue) {
    Vue.directive('has', {
      inserted (el, binding) {
        if (!hasPermission(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}