import request from '@/utils/request'
const getlist = async () => {
  return request({
    url: 'sitenotice/list',
    method: 'post'
  })
}

const getdetails = async (id) => {
  return request({
    url: 'sitenotice/details/' + id,
    method: 'get'
  })
}
const getcount = async () => {
  return request({
    url: 'sitenotice/count',
    method: 'post'
  })
}

export default { getlist, getdetails, getcount }
