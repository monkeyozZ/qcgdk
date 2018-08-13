import * as types from '../mutation-type'

const state = {
  personalID: null
}

const getters = {
  getpersonalID: () => state.personalID
}

const mutations = {
  [types.SETPERSONALID] (state, params) {
    state.personalID = params
  }
}

export default {
  state, mutations, getters
}
