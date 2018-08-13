// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './icons' // icon
import 'swiper/dist/css/swiper.css'
import scroll from '@/components/scroll/index'
import hbgloading from 'hbgloading'
Vue.use(hbgloading)
Vue.component('scroll', scroll)
Vue.filter('sub', function (str) {
  if (str.length > 23) {
    return str.substring(0, 21) + '...'
  } else {
    return str
  }
})
Vue.filter('shortsub', function (str) {
  if (str.length > 18) {
    return str.substring(0, 18) + '...'
  } else {
    return str
  }
})
Vue.filter('dessub', function (str) {
  if (str.length > 7) {
    return str.substring(0, 6) + '...'
  } else {
    return str
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
