import request from '@/utils/request'

const getonelist = async (obj) => {
  return request({
    url: '/Personal/getonelist',
    method: 'post',
    data: obj
  })
}

const step1 = async (obj) => {
  return request({
    url: '/Personal/step_1',
    method: 'post',
    data: obj
  })
}

const step2 = async (obj) => {
  return request({
    url: '/Personal/step_2',
    method: 'post',
    data: obj
  })
}

const step3 = async (obj) => {
  return request({
    url: '/Personal/step_3',
    method: 'post',
    data: obj
  })
}
export default { getonelist, step1, step2, step3 }
