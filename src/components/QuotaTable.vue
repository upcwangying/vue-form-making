<template>
<div class="quota-table-container">
  <div class="btn-container">
    <el-row>
      <el-button type="primary">增加指标</el-button>
      <el-button type="danger">删除指标</el-button>
    </el-row>
  </div>

  <div class="table-container">
    <el-table
      :data="tableData"
      stripe
      :show-header="false"
      @row-click="zbTableChange"
    >
      <el-table-column
        prop="zbbm"
        min-width="220"
        height="0">
      </el-table-column>
      <el-table-column
        prop="zbmc"
        min-width="100"
        height="0">
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'QuotaTable',
  props: {
    zbflZbData: {
      type: Array,
      default: () => []
    },
    syorjb: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      tableData: [],
      syorjbParam: 'sy',  //默认实验报表
    }
  },
  watch: {
    zbflZbData: {
      handler(val) {
        this.tableData = val
      },
      deep: true
    },
    syorjb(val) {
      this.syorjbParam = val
    },
  },
  methods: {
    zbTableChange(row, column, event) {
      this.$emit('change', row)
    },
  },
}
</script>

<style lang="scss" scoped>
.quota-table-container {
  position: relative;

  .btn-container {
    position: sticky;
    height: 40px;
    top: 0;
    left: 0;
    z-index: 999;
    padding-top: 4px;
    background-color: white;
  }

  .table-container {
    height: calc(100% - 40px);
    width: 100%;
  }
}
</style>
