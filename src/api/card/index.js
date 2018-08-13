import request from '@/utils/request'
const Datainit = async (obj) => {
  return request({
    url: 'sitecard/Datainit',
    method: 'post',
    data: obj
  })
}

const dropdown = async (obj) => {
  return request({
    url: 'sitecard/dropdown',
    method: 'post',
    data: obj
  })
}

const pull = async (obj) => {
  return request({
    url: 'sitecard/getmore',
    method: 'get',
    params: obj
  })
}

const filtercase = async (obj) => {
  return request({
    url: 'sitecard/filter',
    method: 'post',
    data: obj
  })
}

const getformdata = async (id) => {
  return request({
    url: 'sitecard/getformdata',
    method: 'post',
    data: {id: id}
  })
}

const getbank = async () => {
  return request({
    url: 'sitecard/getbank',
    method: 'post'
  })
}

const creatbank = async (obj) => {
  return request({
    url: 'sitecard/creatbank',
    method: 'post',
    data: obj
  })
}

const updatebank = async (id, obj) => {
  return request({
    url: 'sitecard/updatebank/' + id,
    method: 'post',
    data: obj
  })
}

const getcard = async (id) => {
  return request({
    url: 'sitecard/getcard',
    method: 'post',
    data: {openid: id}
  })
}

const getcardcount = async (id) => {
  return request({
    url: 'sitecard/getcardcount',
    method: 'post',
    data: { openid: id }
  })
}

const gethistorylist = async (obj) => {
  return request({
    url: 'sitecard/historylist',
    method: 'post',
    data: obj
  })
}

export default { Datainit, pull, filtercase, getformdata, dropdown, getbank, creatbank, updatebank, getcard, getcardcount, gethistorylist }
