<template>
  <div class="spreadsheet-container">
    <div ref="xspreadsheet" id="xapp" />
  </div>
</template>

<script>
import Spreadsheet from "x-data-spreadsheet";
export default {
  name: 'SpreadSheet',
  mounted() {
    // const s = new Spreadsheet('#xapp')
    const s = new Spreadsheet(this.$refs.xspreadsheet, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth
      },
      row: {
        height: 25,
        len: 30
      },
      col: {
        len: 11,
        width: 100,
        indexWidth: 60,
        minWidth: 60,
      }
    })
      .loadData({}) // load data
      .change(data => {
        // save data to db
      });
  }
}
</script>

<style lang="scss" scoped>
.spreadsheet-container {
  width: auto;
  overflow: hidden;
}
</style>
