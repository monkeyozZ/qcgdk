import * as types from '../mutation-type'

const state = {
  registerID: null
}

const getters = {
  getregisterID: () => state.registerID
}

const mutations = {
  [types.SETREGISTERID] (state, params) {
    state.registerID = params
  }
}

export default {
  state, mutations, getters
}
