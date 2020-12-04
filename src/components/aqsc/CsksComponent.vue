<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
    <aqsc-toolbar-layout>
      <template v-slot:left>
        <el-form label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司" label-width="60px">
                <bukrs-module v-model="queryList.bukrs" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成本中心编码">
                <el-input v-model="queryList.kostl"
                          style="width: 100%"
                          clearable
                          size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成本中心描述">
                <el-input v-model="queryList.ltext"
                          style="width: 100%"
                          clearable
                          size="small" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template v-slot:right>
        <aqsc-icon-group>
          <el-button icon="aqsc-query" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="queryData"> 查询</el-button>
        </aqsc-icon-group>
      </template>
    </aqsc-toolbar-layout>
    <el-table ref="table" v-loading="listLoading" height="300" :data="data" size="mini" border stripe style="width: 100%;" highlight-current-row @row-dblclick="listTableEdit">
      <el-table-column type="index" label="序号" :resizable="false" width="50" align="right" />
      <el-table-column prop="bukrs" label="公司代码" :resizable="false" header-align="left" align="left" width="80" />
      <el-table-column prop="butxt" label="公司名称" :resizable="false" header-align="left" align="left"
                       show-overflow-tooltip />
      <el-table-column prop="kostl" label="成本中心编码" :resizable="false" header-align="left" align="left" width="100" />
      <el-table-column prop="ltext" label="成本中心描述" :resizable="false" header-align="left" align="left"
                       show-overflow-tooltip />
    </el-table>
    <span slot="title">成本中心选择(双击选择数据)  </span>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryData } from "@/api/csks";
import {
  AqscToolbarLayout } from './AqscToolbar'
import {
  AqscIconGroup
} from './AqscIcon'
import bukrsModule from "./BukrsComponent"
export default {
  name: "SJGLCsksComponent",
  components: {
    AqscToolbarLayout,
    AqscIconGroup,
    bukrsModule
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    bukrs: {
      type: String,
      default: ""
    },
    werks: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      listLoading: false,
      queryList: {},
      data: [],
      selectRow: {}
    }
  },
  watch: {
    bukrs(val) {
      this.$set(this.queryList, "bukrs", this.bukrs)
    },
    dialogFormVisible(val) {
      if (val === true) {
        this.queryData();
      }
    },
    werks(val) {
      this.$set(this.queryList, "werks", this.werks)
    }
  },
  mounted() {
    this.$set(this.queryList, "bukrs", this.bukrs)
  },
  methods: {
    listTableEdit(row) {
      this.selectRow = row;
      this.$emit('row-dblclick', this.selectRow);
    },
    close() {
      this.$emit('close');
    },
    queryData() {
      this.listLoading = true;
      const param = { werks: this.werks }
      const paramm = Object.assign({}, this.queryList, param);
      queryData(paramm).then(response => {
        this.listLoading = false;
        this.data = response.dataset.datas;
        this.$nextTick(function() {
          if (this.value !== null && this.value !== "") {
            this.data.forEach(row => {
              if (this.value === row.dbid) {
                this.selectRow = row;
                this.$refs.table.setCurrentRow(row);
              }
            });
          }
        })
      })
        .catch(() => {
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
    }
  }
}
</script>

<style scoped>

</style>
