<template>
<div class="quota-table-container">
  <div class="btn-container">
    <el-row>
      <el-button type="primary">增加指标</el-button>
      <el-button type="danger">删除指标</el-button>
    </el-row>
  </div>

  <div class="table-container">
    <el-select v-model="value" placeholder="请选择" @change="zbSelChange">
      <el-option
        v-for="item in tableData"
        :key="item.dbid"
        :label="item.zbmc"
        :value="item.dbid">
      </el-option>
    </el-select>
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
        console.log('watch : ', val)
      },
      deep: true
    },
    syorjb(val) {
      this.syorjbParam = val
    },
  },
  methods: {
    zbSelChange(val) {
      let item_ = null
      this.tableData.forEach(item => {
        (item.dbid === val) && (item_ = item)
      })
      this.$emit('change', item_)
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
