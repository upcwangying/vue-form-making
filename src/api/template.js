import request from '@/util/request'

export function getTemplate(dbid) {
  return request({
    url: '/tpridmp/process/dmp_report?method=query',
    method: 'get',
    params: {
      dbid,
    }
  })
}

export function postTemplate(dbid, werks, bukrs, name, code, data, tempjb, flid, tables) {
  return request.post('/tpridmp/process/dmp_report?method=save', {
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
  })
}

export function deleteTemplate(dbid) {
  return request({
    url: '/tpridmp/process/dmp_report?method=delete',
    method: 'get',
    params: {
      dbid
    }
  })
}

export function publishTemplate(dbid, published_dw, json, version) {
  return request.post('/tpridmp/process/dmp_report?method=publish',{
    dbid,
    published_dw,
    json,
    version
  })
}

export function enableTemplate(dbid) {
  return request({
    url: '/tpridmp/process/dmp_report?method=enable',
    method: 'get',
    params: {
      dbid
    }
  })
}
