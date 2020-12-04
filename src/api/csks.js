import request from '@/util/request'
export function queryData(param) {
  return request({
    url: '/sjgl/process/sjgl_zsj_csks?m=query',
    method: 'get',
    params: param
  })
}
