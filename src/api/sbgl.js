import { downMethod } from "@/util/method";
//  比较所选日期后者大于等于前者
export function compareDateTime(date_start, date_end) {
  const d1 = Date.parse(date_start);
  const d2 = Date.parse(date_end) + (24 * 60 * 60 * 1000 - 1);
  return d1 > d2
}
export function getUrl(url) {
  return '/sjgl/process/sjgl_zsj_' + url;
}
export function isNull(data) {
  return data === undefined || data === '' || data === null;
}
/** 2019/12/6
* @author zgb
* @method 导出excel
* @param tableData {Array} Table data for export
 * @param url {String} Like sjgl_zsj_sbgl?sbgl=export
* @param moduletype {String} The moudle type of the template file for the export file in template management
* @param moduleintype {String} The submodule name in moduletype
* @param fileName {String} The name of the exported file
* @param type {String} The file type of the export file
*/
export function exportExcel(tableData, url, moduletype, moduleintype, fileName, type) {
  const changeFile = JSON.stringify(tableData);
  const param = { changes: changeFile };
  param.moduletype = moduletype;
  param.moduleintype = moduleintype;
  param.filename = fileName;
  const exportExcelUrl = '/sjgl/process/' + url;
  return downMethod(exportExcelUrl, param).then(res => {
    // console.log(res);
    const link = document.createElement('a');
    const blob1 = new Blob([res.data], { type: 'application/x-xlsx' });
    const blob2 = new Blob([res.data], { type: 'application/x-xls' });
    if (type === 'xlsx') {
      link.href = window.URL.createObjectURL(blob1);
    } else if (type === 'xls') {
      link.href = window.URL.createObjectURL(blob2);
    }
    link.download = fileName + '.' + type;
    link.click();
    return Promise.resolve({ success: true });
  })
}

export function removeDumpOfArray(array) {
  // console.log(array);
  const arr = [];
  const obj = {};
  const len = array.length;
  for (let i = 0; i < len; i++) {
    if (!obj[array[i]]) {
      arr.push(array[i]);
      obj[array[i]] = array[i];
    }
  }
  return arr;
}

/** zgb
 * @param arr {Array} Table Data to export
 * @param list {Array} The feilds in the arr that need to be replaced
 * @returns {[]} return a new array like arr without undefind
 */
export function replaceListNull(arr, list) {
  const sbzs = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    const obj = arr[i];
    for (let j = 0, l = list.length; j < l; j++) {
      obj[list[j]] = isNull(obj[list[j]]) ? '' : obj[list[j]];
    }
    sbzs.push(obj);
  }
  console.log(sbzs);
  return sbzs;
}
