import request from '@/util/request'

export function getTemplate(code) {
  return request({
    url: '/tpridmp/process/dmp_report?method=query',
    method: 'get',
    params: {
      code,
    }
  })
}

export function postTemplate(dbid, werks, bukrs, name, code, data, tempjb, flid, tables) {
  return request({
    url: '/tpridmp/process/dmp_report?method=save',
    method: 'get',
    params: {
      dbid,
      werks,
      bukrs,
      name,
      code,
      json: JSON.stringify(data),
      version: 0,
      tempjb,
      flid,
      tables: JSON.stringify(tables)
    }
  })
}

export function publishTemplate(params) {
  return request({
    url: '/tpridmp/process/dmp_report?method=publish',
    method: 'get',
    params
  })
}

export function enableTemplate(params) {
  return request({
    url: '/tpridmp/process/dmp_report?method=enable',
    method: 'get',
    params
  })
}
