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
    const s = new Spreadsheet(this.$refs.xspreadsheet)
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
