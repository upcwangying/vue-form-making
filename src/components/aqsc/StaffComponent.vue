<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
    <aqsc-toolbar-layout>
      <template v-slot:left>
        <el-form label-width="60px">
          <el-row>
            <!--            <el-col v-if="!isLssb&&showWerks" :span="6">-->
            <!--              <el-form-item label="工厂">-->
            <!--                <werks-module v-model="queryList.werks"-->
            <!--                              style="width: 100%"-->
            <!--                              clearable-->
            <!--                              size="small" />-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="6">
              <el-form-item label="账号">
                <el-input v-model="queryList.staffcode"
                          style="width: 100%"
                          clearable
                          size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名">
                <el-input v-model="queryList.staffname"
                          style="width: 100%"
                          clearable
                          size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门">
                <bmpz v-model="queryList.bmid" :werks="queryList.werks"
                      style="width: 100%"
                      clearable
                      :multiple="bmmultiple"
                      size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="班组">
                <bzcomp v-model="queryList.bzid" :werks="queryList.werks" :bmid="queryList.bmid" :multiple="bzmultiple" @click="changess" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template v-slot:right>
        <aqsc-icon-group>
          <el-button icon="aqsc-query" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="queryq"> 查询</el-button>
        </aqsc-icon-group>
      </template>
    </aqsc-toolbar-layout>
    <el-table ref="table" v-loading="listLoading" height="300" element-loading-text="加载中" element-loading-spinner="el-icon-loading" :data="datas" border stripe highlight-current-row style="width: 100%;"
              @selection-change="seleChange" @row-dblclick="rowDblclick">
      <!--      <el-table-column type="selection" width="40" />-->
      <el-table-column
        prop="staffcode"
        header-align="left"
        label="账号"
        width="220"
      />
      <el-table-column
        prop="staffname"
        label="姓名"
        header-align="left"
        width="150"
      />
      <!--      <el-table-column-->
      <!--        prop="staffcode"-->
      <!--        label="用户工号/编号"-->
      <!--        header-align="left"-->
      <!--        width="100" />-->

      <!--      <el-table-column-->
      <!--        prop="lxmc"-->
      <!--        header-align="left"-->
      <!--        label="用户类型"-->
      <!--        width="100"-->
      <!--      />-->

      <el-table-column
        prop="bmmc"
        label="部门"
        header-align="left"
        width="200"
      />
      <el-table-column
        prop="bzmc"
        label="班组"
        header-align="left"
        width="210"
      />
      <!--      <el-table-column-->
      <!--        label=""-->
      <!--      />-->
      <!--      <el-table-column-->
      <!--        prop="txtmd"-->
      <!--        header-align="left"-->
      <!--        label="工厂名称"-->
      <!--      />-->
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
    <span slot="title">用户</span>
    <div slot="footer" class="dialog-footer">
      <!--      <el-button @click.native="selectok">确定</el-button>-->
      <el-button @click.native="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMethod } from "@/util/method"
import {
  AqscToolbarLayout } from './AqscToolbar'
import {
  AqscIconGroup
} from './AqscIcon'
// import werksModule from "@sjglComponents/zsjgl/WerksComponent"
import bmpz from "./BmpzComponent"
import bzcomp from "./BzComponent";
// const userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
export default {
  name: "StaffTreeComponent",
  components: {
    AqscToolbarLayout,
    AqscIconGroup,
    // werksModule,
    bmpz,
    bzcomp
  },
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    isLssb: {
      type: Boolean,
      default: false
    },
    showWerks: {
      type: Boolean,
      default: true
    },
    // 三种人资质
    dataid: {
      type: [String, Array],
      default: ""
    },
    bukrs: {
      type: String,
      default: ""
    },
    werks: {
      type: String,
      default: ''
    },
    wbbs: {
      type: String,
      default: ""
    },
    bmid: {
      type: [String, Array],
      default: ''
    },
    zyid: {
      type: [String, Array],
      default: ''
    },
    bzid: {
      type: [String, Array],
      default: ""
    }
  },
  data() {
    return {
      listSeletion: [],
      queryList: { werks: this.werks },
      currentPage: 1,
      pageSize: 20,
      tableData: [],
      totalCount: 0,
      listLoading: false,
      datas: [],
      bmmultiple: false,
      bzmultiple: false
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === true) {
        this.queryStaff();
      }
    },
    werks(value, oldValue) {
      if (value !== oldValue) {
        this.$set(this.queryList, 'werks', value);
        this.queryStaff()
      }
    },
    dataid(value, oldValue) {
      if (value !== oldValue) {
        this.$set(this.queryList, 'dataid', "275000365047390208");
        this.queryStaff()
      }
    },
    bmid(value, oldValue) {
      if (value !== oldValue) {
        if (Array.isArray(value)) {
          this.bmmultiple = true;
        }
        this.$set(this.queryList, 'bmid', value);
      }
    },
    zyid(value, oldValue) {
      if (value !== oldValue) {
        this.$set(this.queryList, 'zyid', value);
      }
    },
    bzid(value, oldValue) {
      if (value !== oldValue) {
        if (Array.isArray(value)) {
          this.bzmultiple = true;
        }
        this.$set(this.queryList, 'bzid', value);
      }
    }
  },
  mounted() {
    if (this.bzid !== "" && this.bzid.length > 0) {
      this.$set(this.queryList, 'bzid', this.bzid);
    }
    if (this.bmid !== "" && this.bmid.length > 0) {
      this.$set(this.queryList, 'bmid', this.bmid);
    }
    if (this.zyid !== "" && this.zyid.length > 0) {
      this.$set(this.queryList, 'zyid', this.zyid);
    }
    this.queryStaff()
  },
  methods: {
    changess(v) {
      console.log(v)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.queryStaff()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.queryStaff()
    },
    rowDblclick(row) {
      this.$emit('row-dblclick', row)
    },
    selectok() {
      if (this.listSeletion.length === 0) {
        this.$message({
          message: '请选择数据!',
          type: 'warning',
          duration: 2000
        });
        return
      }
      this.$emit('selectok', this.listSeletion);
    },
    seleChange(vals) {
      if (!this.multiple) {
        if (vals.length > 1) {
          this.$refs.table.clearSelection()
          this.$refs.table.toggleRowSelection(vals.pop())
        }
      }
      this.listSeletion = vals
    },
    close() {
      this.$emit('close');
      // this.queryList = { werks: this.werks }
    },
    queryq() {
      this.currentPage = 1;
      this.queryStaff()
    },
    queryStaff() {
      this.listLoading = true;
      this.$set(this.queryList, 'wbbs', this.wbbs);
      this.$set(this.queryList, 'dataid', this.dataid);
      const query = this.queryList;
      console.log(query)
      query.isReplace = "true"
      query.start = (this.currentPage - 1) * this.pageSize;
      query.limit = this.pageSize;
      getMethod('/sjgl/process/staff_component?m=query_Staff', query).then(res => {
        const ss = res.dataset.datas
        for (let i = 0; i < ss.length; i++) {
          if (ss[i].staffcode !== undefined) {
            if (ss[i].staffcode.length > 8) {
              ss[i].staffcode = ss[i].staffcode.substring(0, 2) + "**" + ss[i].staffcode.substring(ss[i].staffcode.length - 4)
            }
          }
        }
        this.datas = ss
        this.totalCount = Number(res.dataset.totalCount)
        this.listLoading = false;
        this.$nextTick(function() {
          if (typeof this.value === 'string') {
            this.datas.forEach(row => {
              if (this.value === row.staffid) {
                this.$refs.table.setCurrentRow(row);
              }
            });
          } else {
            this.value.forEach(item => {
              this.datas.forEach(row => {
                if (item === row.staffid) {
                  this.$refs.table.toggleRowSelection(row);
                }
              });
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter{
    display: table-cell!important;
  }
  .el-menu-vertical {
    border: 1px solid #ccc;
  }
  .pages-wrapper::after {
    content: "";
    display: block;
    clear: both;
  }
  .pages-wrapper {
    position: relative;
    .tree-wrapper {
      position: absolute;
      left: 0;
      z-index: 1000;
      width: 300px;
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.16);
      .tree-title {
        padding-left: 14px;
        padding-top: 4px;
        font-size: 16px;
        font-weight: normal;
        line-height: 21px;
        color: #606266;
        padding-bottom: 7px;
        border: 1px solid #dcdfe6;
      }
      .filter-tree-input {
        text-align: center;
        padding: 5px 14px;
      }
    }
    .others-wrapper {
      float: left;
      position: absolute;
      z-index: 0;
      width: 100%;
      padding-left: 260px;
    }
  }
  .selfTree {
    position: relative;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .titles-span {
      font-size: 16px;
      font-weight: normal;
      line-height: 19px;
      color: #606266;
    }
    .contents-span {
      font-size: 14px;
      font-weight: normal;
      line-height: 19px;
      color: #606266;
    }
    .aqsc-icon {
      font-size: 18px;
      vertical-align: text-bottom;
      margin-right: 5px;
    }
  }
</style>
