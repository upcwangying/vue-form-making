import request from '@/util/request'
export function superqueryData(param) {
  console.log(param)
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=query',
    method: 'post',
    data: param
  })
}
export function queryData(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=querylist',
    method: 'get',
    params: param
  })
}
export function queryTree(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=query_tree',
    method: 'get',
    params: param
  })
}
export function save(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=save',
    method: 'post',
    params: param
  })
}
export function del(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=del',
    method: 'post',
    params: param
  })
}
export function querySb(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=query_sb&kksbm=' + param,
    method: 'post'
    // params: param
  })
}
export function queryMaxkksbs(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=query_jgbs',
    method: 'get',
    params: param
  })
}

export function savesb(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=save_sb',
    method: 'post',
    params: param
  })
}
export function queryValid(value) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=valid&kksbm=' + value,
    method: 'get'
    // params: param
  })
}
export function queryHis(value) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=query_log&mainid=' + value,
    method: 'get'
    // params: param
  })
}
export function queryKks(value) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=query_skks&skks=' + value,
    method: 'post'
    // params: param
  })
}

export function expKks(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=querylist&exp=1',
    method: 'post',
    params: param,
    responseType: 'arraybuffer'
  })
}
export function superexpKks(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=exp',
    method: 'post',
    data: param,
    responseType: 'arraybuffer'
  })
}

export function saveimp(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=impsave',
    method: 'post',
    params: param
  })
}
export function updateimp(param) {
  return request({
    url: '/sjgl/process/aqsc_sjgl_zsj_kks?m=impupdate',
    method: 'post',
    params: param
  })
}
