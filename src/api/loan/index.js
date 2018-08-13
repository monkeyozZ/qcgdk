import request from '@/utils/request'
const Datainit = async (obj) => {
  return request({
    url: 'siteloan/Datainit',
    method: 'post',
    data: obj
  })
}

const dropdown = async (obj) => {
  return request({
    url: 'siteloan/dropdown',
    method: 'post',
    data: obj
  })
}

const pull = async (obj) => {
  return request({
    url: 'siteloan/getmore',
    method: 'get',
    params: obj
  })
}

const filtercase = async (obj) => {
  return request({
    url: 'siteloan/filter',
    method: 'post',
    data: obj
  })
}

const getformdata = async (id) => {
  return request({
    url: 'siteloan/getformdata',
    method: 'post',
    data: {id: id}
  })
}

const getplatform = async () => {
  return request({
    url: 'siteloan/getplatform',
    method: 'post'
  })
}

const creatbill = async (obj) => {
  return request({
    url: 'siteloan/creatbill',
    method: 'post',
    data: obj
  })
}

const updatebill = async (id, obj) => {
  return request({
    url: 'siteloan/updatebill/' + id,
    method: 'post',
    data: obj
  })
}

const getbill = async (id) => {
  return request({
    url: 'siteloan/getbill',
    method: 'post',
    data: {openid: id}
  })
}
const getbillcount = async (id) => {
  return request({
    url: 'siteloan/getbillcount',
    method: 'post',
    data: { openid: id }
  })
}

const gethistorylist = async (obj) => {
  return request({
    url: 'siteloan/historylist',
    method: 'post',
    data: obj
  })
}

export default { Datainit, pull, filtercase, dropdown, getformdata, getplatform, creatbill, updatebill, getbill, getbillcount, gethistorylist }
