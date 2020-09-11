import request from '@/util/request'

export function getZb(syorjb) {
  return request({
    url: '/jsjd/process/aqsc_jsjd_sybg_zb?method=query',
    method: 'get',
    params: {
      syorjb: syorjb
    }
  })
}

export function getZbDetal(dbid) {
  return request({
    url: '/jsjd/process/aqsc_jsjd_sybg_zb?method=detail_zb',
    method: 'get',
    params: {
      dbid: dbid
    }
  })
}
