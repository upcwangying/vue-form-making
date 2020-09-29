import request from '@/util/request'

export function getReport(temp_id, version, baobid) {
  return request({
    url: '/tpridmp/process/dmp_report?method=query_data',
    method: 'get',
    params: {
      temp_id,
      version,
      baobid,
    }
  })
}

export function postReport(rows) {
  return request.post('/tpridmp/process/dmp_report?method=save_data',{
    jsonStr: {
      type: "form",
      werks: 'W074',
      bukrs: 4010,
      datas: rows
    }
  })
}

export function getBbfl(syorjb) {
  return request({
    url: '/tpridmp/process/dmp_report?method=query_fl',
    method: 'get',
    params: {
      jb: syorjb.toUpperCase()
    }
  })
}
