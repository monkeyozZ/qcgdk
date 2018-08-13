import request from '@/utils/request'
const init = async () => {
  return request({
    url: 'siteindex/index',
    method: 'post'
  })
}
const getlastadv = async () => {
  return request({
    url: 'siteindex/getlastadv',
    method: 'post'
  })
}

export default { init, getlastadv }
