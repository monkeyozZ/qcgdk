import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import AuthLogin from './modules/login'
import register from './modules/register'
import personal from './modules/personal'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    AuthLogin,
    register,
    personal
  }
})
