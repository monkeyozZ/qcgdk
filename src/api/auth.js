import request from '@/utils/request'

const sendCode = async (code) => {
  return request({
    url: 'authlogin/gettoken',
    method: 'post',
    data: { 'code': code }
  })
}

const getuserinfo = async (code) => {
  return request({
    url: 'authlogin/getsessioninfo',
    method: 'post'
  })
}
export default { sendCode, getuserinfo }
