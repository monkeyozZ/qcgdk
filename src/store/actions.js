import * as types from './mutation-type'
import Auth from '../utils/auth'
import authapi from '@/api/auth'

export const setLoginstatus = ({commit}, params) => {
  commit(types.SETLOGINSTATUS, params)
}
export const setcode = ({ commit }, params) => {
  authapi.sendCode(params).then((result) => {
    commit(types.SETINFO, result.data)
    // console.log(result)
  }).catch((err) => {
    console.log(err)
  })
}

export const inituserinfo = ({ commit }, obj) => {
  commit(types.SETINFO, obj)
}

export const setregisterid = ({ commit }, params) => {
  commit(types.SETREGISTERID, params)
  Auth.setregisterId(params)
}

export const setpersonalid = ({ commit }, params) => {
  commit(types.SETPERSONALID, params)
  Auth.setpersonalId(params)
}
