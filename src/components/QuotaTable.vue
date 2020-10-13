<template>
<div class="quota-table-container">
  <div class="btn-container">
    <el-row>
      <el-button type="primary" @click="addZhibiao">增加指标</el-button>
      <el-button type="danger" @click="deleteZhibiao">删除指标</el-button>
    </el-row>
  </div>

  <div class="table-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      stripe
      highlight-current-row
      :show-header="false"
      @row-click="zbTableChange"
      @current-change="zbTableCurrChange"
    >
      <el-table-column
        prop="dbid"
        min-width="140"
        height="0">
      </el-table-column>
      <el-table-column
        prop="zbmc"
        height="0">
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="新增指标" :visible.sync="addZhibiaoShowDialog">
    <el-form class="zhibiao-form" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="指标名称" prop="zbmc">
            <el-input v-model="zbAttribute.zbmc" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指标编码" prop="zbbm">
            <el-input v-model="zbAttribute.zbbm" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="指标单位" prop="zbdw">
            <el-input v-model="zbAttribute.zbdw" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据类型" prop="zbsjlx">
            <el-input v-model="zbAttribute.zbsjlx" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="数据源" prop="zbsjy">
            <el-input v-model="zbAttribute.zbsjy" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="属性" prop="zbshux">
            <el-input v-model="zbAttribute.zbshux" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="符号" prop="zbfh">
            <el-input v-model="zbAttribute.zbfh" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标准值" prop="zbbzz">
            <el-input v-model="zbAttribute.zbbzz" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="期望值" prop="zbqwz">
            <el-input v-model="zbAttribute.zbqwz" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上限" prop="zbshangx">
            <el-input v-model="zbAttribute.zbshangx" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="下限" prop="zbxx">
            <el-input v-model="zbAttribute.zbxx" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高限一级预警" prop="zbgx1jyj">
            <el-input v-model="zbAttribute.zbgx1jyj" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="低限一级预警" prop="zbdx1jyj">
            <el-input v-model="zbAttribute.zbdx1jyj" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高限二级预警" prop="zbgx2jyj">
            <el-input v-model="zbAttribute.zbgx2jyj" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="低限二级预警" prop="zbdx2jyj">
            <el-input v-model="zbAttribute.zbdx2jyj" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高限三级预警" prop="zbgx3jyj">
            <el-input v-model="zbAttribute.zbgx3jyj" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="低限三级预警" prop="zbdx3jyj">
            <el-input v-model="zbAttribute.zbdx3jyj" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公式" prop="zbgx">
            <el-input v-model="zbAttribute.zbgx" placeholder="" size="mini" label="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="submitZhibiao">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      tableData: this.zbflZbData,
      syorjbParam: 'sy',  //默认实验报表
      currentColumn: null,
      oldColumn: null,
      addZhibiaoShowDialog: false,
      zbAttribute: [],
      listLoading: this.loading,
    }
  },
  watch: {
    zbflZbData: {
      handler(val) {
        this.tableData = val
      },
      deep: true
    },
    loading(val) {
      this.listLoading = val
    },
    syorjb(val) {
      this.syorjbParam = val
    },
  },
  methods: {
    zbTableChange(row, column, event) {
      this.$emit('change', row)
    },
    addZhibiao() {
      this.addZhibiaoShowDialog = true
    },
    submitZhibiao() {
      // const zbAttribute_ = res.dataset.datas[0]
      // zbAttribute_.zbdw = zbAttribute_.zbuint // 规划字段名 指标单位
      // zbAttribute_.zbsjlx = zbAttribute_.datatype // 规划字段名 指标类型
      // zbAttribute_.zbsjy = zbAttribute_.attribute1 // 规划字段名 指标数据源
      // zbAttribute_.zbshux = zbAttribute_.attribute2 // 规划字段名 指标属性
      // zbAttribute_.zbbzz = zbAttribute_.bzvalue // 规划字段名 指标标准值
      // zbAttribute_.zbqwz = zbAttribute_.qwvalue // 规划字段名 指标期望值
      // zbAttribute_.zbshangx = zbAttribute_.uplimit // 规划字段名 指标上限
      // zbAttribute_.zbxx = zbAttribute_.lowlimit // 规划字段名 指标下限
      // zbAttribute_.zbgx = val.jsgs
      this.zbflZbData.unshift(this.zbAttribute)
      this.$emit('update-zbflzbdata', this.zbflZbData)
      this.addZhibiaoShowDialog = false
    },
    deleteZhibiao() {
      console.log('currentColumn : ', this.currentColumn)
      if (!this.currentColumn) { return }
      for (let i in this.zbflZbData) {
        if (this.zbflZbData[i].dbid === this.currentColumn.dbid) {
          this.zbflZbData.splice(i, 1)
        }
      }
      this.$emit('update-zbflzbdata', this.zbflZbData)
    },
    zbTableCurrChange(currCol, oldCol) {
      this.currentColumn = currCol
      this.oldColumn = oldCol
    },
    cancel() {
      this.addZhibiaoShowDialog = false
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
