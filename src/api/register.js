import request from '@/utils/request'

const getcode = async (obj) => {
  return request({
    url: '/register/getcode',
    method: 'post',
    data: obj
  })
}

const step1 = async (obj) => {
  return request({
    url: '/register/step_1',
    method: 'post',
    data: obj
  })
}

const step2 = async (obj) => {
  return request({
    url: '/register/step_2',
    method: 'post',
    data: obj
  })
}

const step3 = async (obj) => {
  return request({
    url: '/register/step_3',
    method: 'post',
    data: obj
  })
}
export default { step1, step2, step3, getcode }
