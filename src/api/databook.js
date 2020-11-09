import request from '@/util/request'

export function queryDataBook(query) {
  return request({
    url: '/tpridmp/process/Common_ComboBox?type=databook',
    method: 'get',
    params: query
  })
}
