<template>
  <div>
    <el-dialog title="设备分类" :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
      <aqsc-toolbar-layout>
        <template v-slot:left>
          <el-form ref="sourceForm" label-width="70px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="分类编号" label-width="70px">
                  <el-input v-model="queryList.fldm" size="small" clearable style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="分类名称" label-width="70px">
                  <el-input v-model="queryList.flmc" size="small" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <template v-slot:right>
          <aqsc-icon-group>
            <el-button icon="aqsc-query" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="query">查询</el-button>
          </aqsc-icon-group>
        </template>
      </aqsc-toolbar-layout>
      <div class="body">
        <div>
          <el-table ref="refTableq"
                    v-loading="listLoading" height="300"
                    :data="data" row-key="dbid"
                    style="width: 100%;" border
                    :expand-row-keys="expandrows"
                    highlight-current-row
                    :row-class-name="tableRowClassName"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    @row-dblclick="rowDblclick">
            <el-table-column prop="fldm" label="分类代码" header-align="left" align="left" width="150" />
            <el-table-column prop="flmc" label="分类名称" header-align="left" align="left" />
          </el-table>
        </div>
      </div>
      <span slot="title">设备分类</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="close">取消</el-button>
      </div>
    </el-dialog>
    <sbflq ref="sbflq1" @sel="selok1" />
  </div>
</template>
<script>
import { getMethod } from "@/util/method";
import {
  AqscIconGroup
  // AqscIconCompose,
} from './AqscIcon'
import {
  AqscToolbarLayout } from './AqscToolbar'
import sbflq from "./Query.vue"
export default {
  name: "SJGLSbflComponent",
  components: {
    AqscIconGroup,
    AqscToolbarLayout,
    sbflq
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
    chooseleaf: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      item: {},
      expandrows: [],
      queryList: {
        fldm: '',
        flmc: ''
      },
      listLoading: false,
      highLightRows: [],
      data: []
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === true) {
        this.queryList = {
          fldm: '',
          flmc: ''
        };
        this.queryData();
      }
    }
  },
  mounted() {
  },
  methods: {
    selok1(row) {
      // this.collapseAll();
      // const dbid = row.dbid;
      // // 获取id
      // getMethod('/sjgl/process/sjgl_zsj_sbfl?m=query_sbflnode', { dbid: dbid }).then(res => {
      //   const data = res.dataset.datas[0].ids
      //   this.expandrows = data
      //   // 添加选中
      //   this.addchoose(dbid)
      // })
      this.$emit('row-dblclick', row)
    },
    addchoose(id) {
      this.getrow(id, this.data)
      this.$refs.refTableq.setCurrentRow(this.item);
    },
    getrow(id, datas) {
      for (let i = 0; i < datas.length; i++) {
        const item = datas[i];
        if (id === item.dbid) {
          this.item = item;
          return
        }
        const children = item.children
        if (children !== undefined && children !== null) {
          this.getrow(id, children);
        }
      }
    },
    tableRowClassName({ row }) {
      if (row.fldm.length <= 6) {
        return 'warning-row';
      }
    },
    query() {
      const param = { jcdm: this.queryList.fldm, jcmc: this.queryList.flmc };
      this.$refs['sbflq1'].show(param);
    },
    expandedByDbid(data) {
      //  console.log(this.$refs.refTable.store.states)
      for (let i = 0; i < data.length; i++) {
        if (this.$refs.refTable.store.states.treeData[data[i]] !== undefined) {
          // console.log(data[i].dbid)
          this.$refs.refTable.store.states.treeData[data[i]].expanded = true
        }
      }
    },
    // 全部的父节点
    findMyParentIds(parentid, resData) {
      const myParentId = [];
      this.findParentids(parentid, this.data, myParentId)
      // console.log("pid", myParentId)
      if (myParentId[0] !== undefined &&
              myParentId[0] !== "" &&
              myParentId[0] !== 0 &&
              myParentId[0] !== "0") {
        resData.push(myParentId[0]);
        this.findMyParentIds(myParentId[0], resData)
      }
    },
    // 查找该节点的父节点
    findParentids(partentid, treeData, target) {
      for (let i = 0; i < treeData.length; i++) {
        // console.log("???", treeData[i].dbid, partentid)
        if (treeData[i].dbid === partentid) {
          target.push(treeData[i].parentid)
          // console.log("target", target)
          // return treeData[i].parentid
        } else if (treeData[i].children !== undefined && treeData[i].children.length !== 0) {
          this.findParentids(partentid, treeData[i].children, target)
        }
      }
    },
    forArr(arr, isExpand) {
      arr.forEach(i => {
        if (i.children) {
          this.$refs.refTableq.toggleRowExpansion(i, isExpand)
          this.forArr(i.children, isExpand)
        }
      })
    },
    expandAll() { // 默认展开全部的话，首次加载需要在$nextTick下进行
      this.forArr(this.data, true)
    },
    collapseAll() {
      this.forArr(this.data, false)
    },
    // 关闭所有的节点
    sbflNextNode(data, resData, queryData) {
      for (let i = 0; i < data.length; i++) {
        if ((queryData.fldm === "" || data[i].fldm === queryData.fldm) &&
                  (queryData.flmc === "" || data[i].flmc === queryData.flmc)) {
          resData.push(data[i])
        }
        if (data[i].children !== undefined && data[i].children.length !== 0) {
          this.sbflNextNode(data[i].children, resData, queryData)
        }
      }
    },
    rowDblclick(row) {
      if (this.chooseleaf) {
        if (row.fldm.length > 6) {
          this.$emit('row-dblclick', row)
        } else {
          this.$message({
            type: 'info',
            message: '请选择设备层分类！'
          })
        }
      } else {
        this.$emit('row-dblclick', row)
      }
    },
    listTableEdit(row) {
      this.$emit('row-dblclick', row);
    },
    close() {
      this.$emit('close');
    },
    queryData() {
      this.listLoading = true;
      this.data = [];
      const param = { werks: this.werks }
      const paramm = Object.assign({}, param);
      getMethod('/sjgl/process/sjgl_zsj_sbfl?m=querytree', paramm).then(res => {
        this.data = res.dataset.datas
        this.listLoading = false;
      })
    }
  }
}
</script>

<style scoped>
  /deep/ .el-table .warning-row {
    background: #d3dce6;
  }
</style>
