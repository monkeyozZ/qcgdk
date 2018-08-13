import * as types from '../mutation-type'

const state = {
  is_login: false,
  user_info: {

  }
}

const getters = {
  login_status: () => state.is_login,
  user_info: () => state.user_info
}

const mutations = {
  [types.SETLOGINSTATUS] (state, params) {
    state.is_login = params
  },
  [types.SETINFO] (state, params) {
    state.user_info = params
  }
}

export default {
  state, mutations, getters
}
