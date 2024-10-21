import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import countUp from "./countUp/index"


const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive("countUp", countUp)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  Vue.use(install); // eslint-disable-line
}

export default install
