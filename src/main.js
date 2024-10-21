import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import localforage from 'localforage';

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 将 localforage 挂载到全局示例, 这样就可以在任何地方 用 this.$localforage 操作
Vue.prototype.$localforage = localforage

console.info('localforage初始化成功，使用 this.$localforage 调用')

// 创建一个 默认的 IndexDB数据库挂载到全局
const demoDataBase = localforage.createInstance({
  name: 'demoDataBase'
})

Vue.prototype.$demoDataBase  = demoDataBase
console.info('默认数据库 demoDataBase  初始化成功，使用 this.$demoDataBase 调用')

Vue.use(directive)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
