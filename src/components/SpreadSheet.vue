<template>
  <div ref="xspreadsheet" id="xapp" />
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

<style scoped>

</style>
