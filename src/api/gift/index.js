import request from '@/utils/request'
const getlist = async () => {
  return request({
    url: 'sitenewuser/getlist',
    method: 'post'
  })
}

export default { getlist }
