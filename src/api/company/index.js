import request from '@/utils/request'
const getabout = async () => {
  return request({
    url: 'sitecompany/about',
    method: 'post'
  })
}

const getrelief = async () => {
  return request({
    url: 'sitecompany/relief',
    method: 'post'
  })
}

export default { getabout, getrelief }
