import request from '@/utils/request'

const getuserdata = async () => {
  return request({
    url: '/authlogin/index',
    method: 'post'
  })
}
export default { getuserdata }
