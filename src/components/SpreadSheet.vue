<template>
  <div class="spreadsheet-container">
    <div ref="xspreadsheet" id="xapp"  />
  </div>
</template>

<script>
import Spreadsheet from "@aqsc/x-data-spreadsheet";
import zhCN from '@aqsc/x-data-spreadsheet/src/locale/zh-cn';
export default {
  name: 'SpreadSheet',
  props: {
    zbbmDatas: {
      type: Array,
      default: () => []
    },
    cellPro: {
      type: Object,
      default: () => {}
    },
    jizuData: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: true
    },
    showgrid: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      spreadsheet: null
    }
  },
  mounted() {
    // const s = new Spreadsheet('#xapp')
    Spreadsheet.locale('zh-cn', zhCN);
    this.spreadsheet = new Spreadsheet(this.$refs.xspreadsheet, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth
      },
      row: {
        height: 25,
        len: 30
      },
      border: {
        bottom: ["thick", "#000"]
      },
      col: {
        len: 11,
        width: 100,
        indexWidth: 60,
        minWidth: 60,
      },
      showGrid:this.showgrid,
      zbbmData: this.zbbmDatas,
      cellPro: this.cellPro,
      jizuData: this.jizuData,
      sbData: this.sbData,
      showContextmenu: this.readonly,
      showToolbar: this.readonly
    })
      .loadData({
      }) // load data
      .change(data => {
        console.log(this.showgrid)

        // save data to db
      });
  },
  methods: {
    getSpreadSheetData() {
      return this.spreadsheet && this.spreadsheet.getData()
    },
    setSpreadSheetData(data) {
       this.spreadsheet && this.spreadsheet.loadData(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.spreadsheet-container {
  width: auto;
  overflow: hidden;
}
.x-spreadsheet-scrollbar.horizontal {
  right: 15px;
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
