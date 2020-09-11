import request from '@/util/request'

export function getReport() {
  return request({
    url: '/tpridmp/process/dmp_report?method=save',
    method: 'get',
    data
  })
}

export function postReport(rows) {
  return request({
    url: '/tpridmp/process/dmp_report?method=test_save',
    method: 'get',
    params: {
      jsonStr: {
        type: "form",
        werks: 'W074',
        bukrs: 4010,
        datas: rows
      }
    }
  })
}

export function getBbfl(syorjb) {
  return request({
    url: '/tpridmp/process/dmp_report?method=query_fl',
    method: 'get',
    params: {
      syorjb: syorjb
    }
  })
}
