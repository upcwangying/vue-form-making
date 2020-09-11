import request from '@/util/request'

export function getDatabook(temp_id, version, baobid) {
  return request({
    url: '/tpridmp/process/dmp_databook?method=query_data',
    method: 'get',
    params: {
      temp_id,
      version,
      baobid,
    }
  })
}
