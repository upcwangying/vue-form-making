<template>
  <el-date-picker v-model="datePickerValue" size="small" type="monthrange" value-format="yyyy-MM" :range-separator="displayValue" :picker-options="pickerOptions" popper-class="aqsc-report-demo-jidu-popper" class="aqsc-report-demo-jidu-ui" @change="quaterChange" />
</template>
<script>
export default {
  name: 'AqscQuarter',
  componentName: 'AqscQuarter',
  model: {
    prop: 'dpvalue',
    event: 'change'
  },
  props: ['dpvalue'],
  data() {
    return {
      datePickerValue: this.dpvalue,
      displayValue: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '一季度',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), 0);
              const end = new Date(new Date().getFullYear(), 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '二季度',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), 3);
              const end = new Date(new Date().getFullYear(), 5);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '三季度',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), 6);
              const end = new Date(new Date().getFullYear(), 8);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '四季度',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), 9);
              const end = new Date(new Date().getFullYear(), 11);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    }
  },
  watch: {
    dpvalue : {
      handler: function (val) {
        if (!val) { return }
        switch (val[0].substring(val[0].length - 2, val[0].length)) {
          case "01":
            this.displayValue = "一季度";
            break;
          case "02":
            this.displayValue = "一季度";
            break;
          case "03":
            this.displayValue = "一季度";
            break;
          case "04":
            this.displayValue = "二季度";
            break;
          case "05":
            this.displayValue = "二季度";
            break;
          case "06":
            this.displayValue = "二季度";
            break;
          case "07":
            this.displayValue = "三季度";
            break;
          case "08":
            this.displayValue = "三季度";
            break;
          case "09":
            this.displayValue = "三季度";
            break;
          case "10":
            this.displayValue = "四季度";
            break;
          case "11":
            this.displayValue = "四季度";
            break;
          case "12":
            this.displayValue = "四季度"
            break;
        }
      },
      deep: true
    },
    datePickerValue : {
      handler: function (val) {
        if (!val) { return }
        switch (val[0].substring(val[0].length - 2, val[0].length)) {
          case "01":
            this.displayValue = "一季度";
            break;
          case "02":
            this.displayValue = "一季度";
            break;
          case "03":
            this.displayValue = "一季度";
            break;
          case "04":
            this.displayValue = "二季度";
            break;
          case "05":
            this.displayValue = "二季度";
            break;
          case "06":
            this.displayValue = "二季度";
            break;
          case "07":
            this.displayValue = "三季度";
            break;
          case "08":
            this.displayValue = "三季度";
            break;
          case "09":
            this.displayValue = "三季度";
            break;
          case "10":
            this.displayValue = "四季度";
            break;
          case "11":
            this.displayValue = "四季度";
            break;
          case "12":
            this.displayValue = "四季度"
            break;
        }
      },
      deep: true
    }
  },
  mounted() {
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
        this.datePickerValue = "一季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 0)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 2))];
        break;
      case "2":
        this.datePickerValue = "一季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 0)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 2))];
        break;
      case "3":
        this.datePickerValue = "一季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 0)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 2))];
        break;
      case "4":
        this.datePickerValue = "二季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 3)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 5))];
        break;
      case "5":
        this.datePickerValue = "二季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 3)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 5))];
        break;
      case "6":
        this.datePickerValue = "二季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 3)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 5))];
        break;
      case "7":
        this.datePickerValue = "三季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 6)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 8))];
        break;
      case "8":
        this.datePickerValue = "三季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 6)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 8))];
        break;
      case "9":
        this.datePickerValue = "三季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 6)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 8))];
        break;
      case "10":
        this.datePickerValue = "四季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 9)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 11))];
        break;
      case "11":
        this.datePickerValue = "四季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 9)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 11))];
        break;
      case "12":
        this.datePickerValue = "四季度"; this.datePickerValue = [dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 9)), dateFtt('yyyy-MM', new Date(new Date().getFullYear(), 11))];
        break;
    }
  },
  methods: {
    quaterChange(val) {
      if (val === null) {
        this.displayValue = ''
      } else {
        const tag = val[0].substring(val[0].length - 1)
        switch (tag) {
          case "1":
            this.displayValue = "一季度";
            break;
          case "4":
            this.displayValue = "二季度";
            break;
          case "7":
            this.displayValue = "三季度";
            break;
          case "0":
            this.displayValue = "四季度";
            break;
          default:
            this.displayValue = "";
            break;
        }
      }
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
  .aqsc-report-demo-jidu-ui {
    input {
      display: none !important;
    }
    span {
      width: 100% !important;
    }
  }
  .aqsc-report-demo-jidu-popper {
    width: 100px !important;
    .el-picker-panel__sidebar {
      height: 135px;
      border: solid 1px #ddd;
    }
    .el-picker-panel__body {
      display: none;
    }
  }
</style>
