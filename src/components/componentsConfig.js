export const basicComponents = [
  {
    type: 'input',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'textarea',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'number',
    icon: 'icon-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'radio',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'checkbox',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'time',
    icon: 'icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'date',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'month',
    icon: 'icon-date',
    options: {
      defaultValue: ((new Date().getMonth() - 5).toString().length > 1) ? (new Date().getMonth() + 1).toString() : ('0' + (new Date().getMonth() - 5).toString()),
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'month',
      format: 'MM',
      timestamp: false,
      required: false,
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'quarter',
    icon: 'icon-date',
    options: {
      defaultValue: getQuarterDefaultValue(),
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'year',
    icon: 'icon-date',
    options: {
      defaultValue: new Date().getFullYear().toString(),
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'year',
      format: 'yyyy',
      timestamp: false,
      required: false,
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'rate',
    icon: 'icon-pingfen1',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'color',
    icon: 'icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'select',
    icon: 'icon-select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },{
          value: 'Option 3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'switch',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'slider',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'text',
    icon: 'icon-wenzishezhi-',
    options: {
      defaultValue: 'This is a text',
      customClass: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'jizu',
    icon: '',
    options: {
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'staff',
    icon: '',
    options: {
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
]

export const advanceComponents = [
  {
    type: 'blank',
    icon: 'icon-zidingyishuju',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'imgupload',
    icon: 'icon-tupian',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'http://pfp81ptt6.bkt.clouddn.com/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: false,
      min: 0,
      isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'editor',
    icon: 'icon-fuwenbenkuang',
    options: {
      defaultValue: '',
      width: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  },
  {
    type: 'cascader',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: '',
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      field: 'value'
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'table',
    icon: 'icon-table',
    columns: [],
    rows: [],
    mergeRule: [{ startRow: '', startColumn: '', endRow: '', endColumn: '' }],
    options: {
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      dataTransformRules: {
        rows:{
          "wd_jz": "jzid",
          "wd_sheb": "shebid"
        },
        columns:{
          key: "zbid1",
          value: "value"
        }
      },
      stripe: false,
      height: '300',
      border: false,
      fit: true,
      showHeader: true,
      highlightCurrentRow: false,
      showSummary: false
    }
  },
  {
    type: 'sheet',
    icon: 'icon-sheet',
    options: {
      datasource: 'TPRI_VUE',
      table: 'TPRI_DMP_REPORT_DATA_TEST',
      dataTransformRules: {
        rows:{
          "wd_jz": "jzid",
          "wd_sheb": "shebid"
        },
        columns:{
          key: "zbid1",
          value: "value"
        }
      },
    }
  }
]

function getQuarterDefaultValue() {
  let defaultValue = []
  const dateFtt = (fmt, date) => { // author: meizz
    var o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }
    }
    return fmt;
  }
  const month = (new Date().getMonth() + 1).toString()
  switch (month) {
    case "1":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 0)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 2))];
      break;
    case "2":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 0)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 2))];
      break;
    case "3":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 0)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 2))];
      break;
    case "4":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 3)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 5))];
      break;
    case "5":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 3)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 5))];
      break;
    case "6":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 3)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 5))];
      break;
    case "7":
      defaultValue= [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 6)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 8))];
      break;
    case "8":
      defaultValue= [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 6)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 8))];
      break;
    case "9":
      defaultValue= [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 6)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 8))];
      break;
    case "10":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 9)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 11))];
      break;
    case "11":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 9)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 11))];
      break;
    case "12":
      defaultValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 9)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 11))];
      break;
  }
  return defaultValue
}
