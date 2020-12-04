<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
    <aqsc-toolbar-layout>
      <template v-slot:left>
        <el-form label-width="80px">
          <el-row>
            <template>
              <el-col :span="6">
                <el-form-item label="分类编号">
                  <el-input v-model="queryList.jcdm"
                            style="width: 100%"
                            clearable
                            size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分类名称">
                  <el-input v-model="queryList.jcmc"
                            style="width: 100%"
                            clearable
                            size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="监督专业" label-width="70px">
                  <databook v-model="queryList.jdzy" :groupcode="groupcodes"
                            multiple required />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" label-width="70px">
                  <el-select v-model="queryList.zt"
                             size="small"
                             style="width: 100%;"
                             clearable
                             placeholder="请选择">
                    <el-option v-for="item in ztOptions"
                               :key="item.index"
                               :label="item.value"
                               :value="item.index" />
                  </el-select>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </el-form>
      </template>
      <template v-slot:right>
        <aqsc-icon-group>
          <el-button icon="aqsc-query" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="queryDatas"> 查询</el-button>
        </aqsc-icon-group>
      </template>
    </aqsc-toolbar-layout>
    <el-table ref="table" v-loading="listLoading" height="300" :data="data" border stripe style="width: 100%;" highlight-current-row @row-dblclick="listTableEdit">
      <el-table-column type="index" label="序号" :resizable="false" width="50" align="left" />
      <el-table-column prop="fldm" label="分类代码" header-align="left" align="left" width="100" />
      <el-table-column prop="flmc" label="分类名称" header-align="left" />
    </el-table>
    <span slot="title">设备分类查询</span>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible=false">取消</el-button>
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
import databook from "../DataBook"
// const userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
export default {
  name: "JscsQuery",
  components: {
    AqscToolbarLayout,
    AqscIconGroup,
    databook
  },
  data() {
    return {
      ztOptions: [{ index: '0', value: "未发布" },
        { index: '1', value: "启用" },
        { index: '2', value: "禁用" }],
      radio: '',
      radioRow: {},
      queryList: { jcdm: '', jcmc: '', parentid: '_null' },
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      listLoading: false,
      data: [],
      glsbmc: '',
      selectRow: {},
      groupcodes:['AQSC_SJGL_JSJDZY'],
      dialogFormVisible: false
    }
  },
  mounted() {
  },
  methods: {
    show(param) {
      this.queryList = Object.assign({}, param);
      this.dialogFormVisible = true;
      this.queryData();
    },
    aa(row) {
      this.glsbmc = row.sbmc;
      this.radioRow = row;
    },
    listTableEdit(row) {
      this.$emit('sel', row)
      this.dialogFormVisible = false;
    },
    queryData(v) {
      this.listLoading = true;
      const query = this.queryList;
      if (query.jdzy !== '' && query.jdzy !== undefined && query.jdzy.length !== 0) {
        query.zy = 'jd'
      } else {
        query.zy = ''
      }
      const queryUrl = '/sjgl/process/sjgl_zsj_sbfl?m=query_sbflq';
      getMethod(queryUrl, query).then(res => {
        this.data = res.dataset.datas;
        this.listLoading = false;
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
