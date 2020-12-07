<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
    <aqsc-toolbar-layout>
      <template v-slot:left>
        <el-form label-width="80px">
          <el-row>
            <template v-if="isGlsb">
              <el-col :span="10">
                <el-form-item label="生产厂家">
                  <el-input v-model="queryList.sccj"
                            style="width: 100%"
                            clearable
                            size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="规格型号">
                  <el-input v-model="queryList.ggxh"
                            style="width: 100%"
                            clearable
                            size="small" />
                </el-form-item>
              </el-col>
            </template>
            <template v-else>
              <el-col :span="9">
                <el-form-item label="设备编号">
                  <el-input v-model="queryList.sbbm"
                            style="width: 100%"
                            clearable
                            size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="设备名称">
                  <el-input v-model="queryList.sbmc"
                            style="width: 100%"
                            clearable
                            size="small" />
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </el-form>
      </template>
      <template v-slot:right>
        <aqsc-icon-group>
          <el-button icon="aqsc-query" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="queryDatas"> 查询</el-button>
          <template v-if="isGlsb">
            <el-button icon="aqsc-save" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="saveGlsb"> 确认</el-button>
            <el-button icon="aqsc-reset" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="queryList={}"> 清空</el-button>
          </template>
        </aqsc-icon-group>
      </template>
    </aqsc-toolbar-layout>
    <aqsc-toolbar-layout v-if="isGlsb">
      <template v-slot:left>
        <el-form v-model="queryList" label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="关联标准设备名称">
                <el-input v-model="glsbmc"
                          style="width: 100%"
                          disabled
                          clearable
                          size="small" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </aqsc-toolbar-layout>
    <el-table ref="table" v-loading="listLoading" height="300" :data="data" border stripe style="width: 100%;" highlight-current-row @row-dblclick="listTableEdit">
      <template v-if="isGlsb">
        <el-table-column prop="dbid" label="" :resizable="false" width="30">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.dbid" @change="aa(scope.row)" />
          </template>
        </el-table-column>
      </template>
      <el-table-column type="index" label="序号" :resizable="false" width="50" align="left" />
      <el-table-column prop="sbbm" label="设备编号" header-align="left" align="left" :resizable="false" width="100" />
      <el-table-column prop="sbmc" label="设备名称" header-align="left" :resizable="false" />
      <template v-if="!isGlsb">
        <el-table-column prop="name" label="设备状态" header-align="left" align="left" :resizable="false" width="90" />
      </template>
      <el-table-column prop="sbfl" label="设备分类" header-align="left" align="left" :resizable="false" width="100" />
      <template v-if="isGlsb">
        <el-table-column prop="sccj" label="生产厂家" header-align="left" align="left" :resizable="false" width="90" />
        <el-table-column prop="ggxh" label="规格型号" header-align="left" align="left" :resizable="false" width="90" />
      </template>
    </el-table>
    <div class="pageDiv">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <span slot="title">标准设备</span>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMethod } from "@/util/method";
import {
  AqscToolbarLayout } from './AqscToolbar'
import {
  AqscIconGroup
} from './AqscIcon'
// const userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
export default {
  name: "SJGLBzsbComponentOld",
  components: {
    AqscToolbarLayout,
    AqscIconGroup
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
    },
    isGlsb: {
      type: Boolean,
      default: false
    },
    sccj: {
      type: String,
      default: ""
    },
    ggxh: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      radio: '',
      radioRow: {},
      queryList: {},
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      listLoading: false,
      data: [],
      glsbmc: '',
      selectRow: {}
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === true) {
        this.$set(this.queryList, 'sccj', this.sccj);
        this.$set(this.queryList, 'ggxh', this.ggxh);
        this.queryData(val)
      }
    }
  },
  mounted() {
  },
  methods: {
    aa(row) {
      this.glsbmc = row.sbmc;
      this.radioRow = row;
    },
    saveGlsb() {
      if (this.radio === '') {
        this.$message({
          type: "info",
          message: "请选择要关联的设备"
        })
      } else {
        this.$emit('saveGlsb', this.radioRow);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.queryData()
    },
    listTableEdit(row) {
      if (this.isGlsb) {
        this.radio = row.dbid;
        this.glsbmc = row.sbmc;
        this.radioRow = row;
      } else {
        this.selectRow = row;
        this.getDetail(row);
      }
    },
    getDetail(row) {
      const sbflid = row.sbflid;
      const bzsbid = row.dbid
      getMethod('/sjgl/process/sjgl_zsj_bzsbcomp?m=query', { sbflid: sbflid, bzsbid: bzsbid }).then(response => {
        const dtl = response.dataset;
        const dtldata = {}
        for (let i = 0; i < dtl.length; i++) {
          const item = dtl[i];
          if (item.name === 'jscs') {
            dtldata.jscs = item.datas;
          }
          if (item.name === 'sbbom') {
            dtldata.sbbom = item.datas;
          }
          if (item.name === 'jdzy') {
            dtldata.jdzy = item.datas;
          }
        }
        this.$emit('row-dblclick', row, dtldata);
      })
        .catch(() => {
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
    },
    close() {
      this.$emit('close');
    },
    queryData(v) {
      this.listLoading = true;
      const query = JSON.parse(JSON.stringify(this.queryList));
      // query.sccj = this.sccj;
      // query.ggxh = this.ggxh;
      query.zt = '1'
      query.start = (this.currentPage - 1) * this.pageSize
      query.limit = this.pageSize
      query.moren = '1';
      const queryUrl = '/sjgl/process/sjgl_zsj_bzsb?m=queryBzsbTable'
      getMethod(queryUrl, query).then(res => {
        this.data = res.dataset.datas;
        this.totalCount = Number(res.dataset.totalCount)
        this.listLoading = false;
        this.radio = '';
        this.glsbmc = '';
        this.radioRow = {};
        if (v && this.data.length > 0) {
          this.radio = this.data[0].dbid;
          this.radioRow = this.data[0];
          this.glsbmc = this.data[0].sbmc;
        }
      })
    },
    queryDatas() {
      this.currentPage = 1;
      this.queryData()
    }
  }
}
</script>

<style scoped>

</style>
