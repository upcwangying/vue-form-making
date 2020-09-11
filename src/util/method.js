import request from '@/util/request'
export function getMethod(url, param) {
  // var url = '/tpridmp/process/' + processcode;
  return request({
    url: url,
    method: 'get',
    params: param
  })
}
export function postMethod(url, param) {
  return request({
    url: url,
    method: 'post',
    data: param
  })
}
export function downMethod(url, param) {
  // var url = '/tpridmp/process/' + processcode;
  return request({
    url: url,
    method: 'post',
    data: param,
    responseType: 'arraybuffer'
  })
}
