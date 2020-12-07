<template>
  <el-dialog :visible.sync="dialogFormVisible" class="aqsc-dialog-normal" width="80%" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
    <el-container ref="container_" style=" width: 100%; height: 100%;padding-bottom: 0px; border: 1px solid #eee">
      <el-aside v-show="treeVisible" width="260px">
        <!--                  <div v-show="treeVisible" class="tree-wrapper">-->
        <el-tree ref="tree"
                 class="selfTree"
                 :props="defaultProps"
                 :data="datatree"
                 accordion
                 :filter-node-method="filterNode"
                 :load="loadNode"
                 lazy
                 node-key="dbid"
                 @node-click="queryright"
        >
          <!--              <span slot-scope="{ node }" class="span-ellipsis">-->
          <!--                <span :title="node.label">{{ node.label }}</span>-->
          <!--              </span>-->
        </el-tree>
      </el-aside>
      <div style="padding-left: 0px;width: 16px;background-color: #EBEEF5" height="100%">
        <div style="position: relative;top: 50%">
          <i :class="showTreeQuery" @click="changeswitch" />
        </div>
      </div>
      <el-main style="padding-left: 0;margin-top: 0;padding-top: 0;padding-bottom: 0px;">
        <!--        <div :class="['others-wrapper', {'main-padding-left' : treeVisible}]">-->
        <aqsc-layout class="aqscNormalbackgroundColor aqscBorderColor">
          <aqsc-toolbar-layout>
            <template v-slot:left>
              <el-form ref="kksform" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="KKS编码" label-width="80px">
                      <el-input v-model="listQuery.kksbm" style="width: 100%" clearable placeholder="请输入"
                                size="small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="KKS描述" label-width="80px">
                      <el-input v-model="listQuery.kksms" placeholder="请输入" size="small" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="责任人A" label-width="120px">
                      <el-input v-model="listQuery.sbzrmc"
                                class="condition-row-child el-select-child" clearable
                                style="margin-bottom: 0"
                                prefix-icon="el-icon-search"
                                size="small"
                                @focus="FormVisisbstaff1=true" @clear="clearsbzr1" />
                      <staff :dialog-form-visible="FormVisisbstaff1" :bmid="listQuery.gsbm" :bzid="listQuery.fzbz"
                             :zyid="listQuery.fzzy"
                             @close="FormVisisbstaff1=false" @row-dblclick="clikquerystaff"
                             @selectok="selectquerystaff" />
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :span="24">-->
                  <!--                    <el-form-item label="工厂" label-width="60px">-->
                  <!--                      <werks-component v-model="werks" clearable placeholder="请选择" size="small"-->
                  <!--                                       @change="queryclick" />-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                </el-row>
              </el-form>
            </template>
            <template v-slot:right>
              <aqsc-icon-group border>
                <el-button icon="aqsc-query" size="medium" class="aqsc-collapse-toolpannel-button-query"
                           @click="queryData('ss')">查询
                </el-button>
                <!--                  <el-button icon="aqsc-eye" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="superquery">高级查询</el-button>-->
                <el-button :icon="moreIcon" size="medium" class="aqsc-collapse-toolpannel-button-query"
                           @click="handleSearchTap">{{ moreTitle }}
                </el-button>
                <el-button icon="aqsc-reset" size="medium" class="aqsc-collapse-toolpannel-button-query" @click="reset">重置</el-button>
              </aqsc-icon-group>
            </template>
          </aqsc-toolbar-layout>
        </aqsc-layout>
        <aqsc-toolbar-query-panel v-show="searchAlwaysOn" ref="queryPanel">
          <template v-slot:condition>
            <el-form ref="aimForm" label-width="180px" style="width: 100%">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="机组名称" label-width="120px">
                    <jizu v-model="listQuery.xtdy" :disempty="true" size="small" multiple :werks="werks" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门名称" label-width="120px">
                    <bmpz v-model="listQuery.gsbm" :disempty="true" size="small" multiple clearable
                          :werks="werks" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="专业名称" label-width="120px">
                    <cczy v-model="listQuery.fzzy" :werks="werks" :bmid="listQuery.gsbm" :disempty="true" multiple clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="班组名称" label-width="120px">
                    <bzcomp v-model="listQuery.fzbz" :disempty="true" size="small" label="班组" multiple
                            :werks="werks" :bmid="listQuery.gsbm" :zyid="listQuery.fzzy" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="重要标识" label-width="120px">
                    <el-select v-model="listQuery.zybs" style="width: 100%" clearable placeholder="请选择"
                               size="small">
                      <el-option
                        v-for="item in sfarrys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="归属日志" label-width="120px">
                    <logtype v-model="listQuery.gsrz" multiple clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电厂自编码" label-width="120px">
                    <el-input v-model="listQuery.dczbm" style="width: 100%" clearable placeholder="请输入" size="small" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电厂自编码描述" label-width="120px">
                    <el-input v-model="listQuery.dczbms" placeholder="请输入" size="small" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </aqsc-toolbar-query-panel>
        <aqsc-layout :margin="['top']">
          <el-table ref="tableref" v-loading="listLoading"
                    :data="datas"
                    element-loading-text="加载中"
                    element-loading-spinner="el-icon-loading"
                    :height="tableHeight" border stripe
                    size="mini"
                    highlight-current-row style="width: 100%" @selection-change="seleChange"
                    @row-dblclick="listTableEdit">
            <!--            <el-table-column type="selection" width="50" align="center" />-->
            <el-table-column type="index" label="序号" align="center" width="50" fixed />
            <el-table-column prop="kksbm" label="KKS编码" width="160" sortable fixed show-overflow-tooltip>
              <!--              <template slot-scope="scope">-->
              <!--                <a href="javascript:;" class="list-link" @click="listTableEdit(scope.row)">{{ scope.row.kksbm }}</a>-->
              <!--              </template>-->
            </el-table-column>
            <el-table-column prop="kksms" label="KKS描述" width="140" sortable fixed show-overflow-tooltip>
              <!--              <template slot-scope="scope">-->
              <!--                <a href="javascript:;" class="list-link" @click="listTableEdit(scope.row)">{{ scope.row.kksms }}</a>-->
              <!--              </template>-->
            </el-table-column>
            <!--            <el-table-column prop="xtscmc" label="系统生成描述" width="130" sortable show-overflow-tooltip />-->
            <!--            <el-table-column prop="scode" label="上级KKS" width="120" sortable show-overflow-tooltip />-->
            <!--            <el-table-column prop="sttxt" label="KKS状态" sortable :formatter="formatDisplay" width="100"-->
            <!--                             align="center" />-->
            <el-table-column prop="jzmc" label="机组名称" width="120" sortable show-overflow-tooltip />
            <el-table-column prop="bmmc" label="部门名称" width="100" sortable />
            <el-table-column prop="zybm" label="专业名称" width="120" sortable />
            <el-table-column prop="bzbm" label="班组名称" width="100" sortable />
            <el-table-column prop="sbzrmc" label="责任人A" width="100" sortable />
            <el-table-column prop="sbzrmc2" label="责任人B" width="100" sortable />
            <el-table-column prop="zybsmc" label="重要标识" width="100" sortable />
            <el-table-column prop="sfyaz" label="安装设备" sortable width="130">
              <template slot-scope="scope">
                <template v-if=" scope.row.sfyaz==='是'&&scope.row.sbkksid !=='' ">
                  <span>是</span>
                </template>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column prop="sfglbzkksbm" label="关联标准" sortable width="120" :formatter="formatsfglbm" />
            <el-table-column prop="bkksm" label="标准KKS" width="120" sortable show-overflow-tooltip />
            <el-table-column prop="bkksms" label="标准KKS描述" width="150" sortable show-overflow-tooltip />
            <el-table-column prop="dczbm" label="电厂自编码" width="120" sortable show-overflow-tooltip />
            <el-table-column prop="dczbms" label="电厂自编码描述" width="140" sortable show-overflow-tooltip />
            <el-table-column prop="werksname" label="工厂" width="120" sortable />
            <el-table-column prop="cbzxmc" label="成本中心" width="150" sortable show-overflow-tooltip />
            <el-table-column prop="gsrzmc" label="归属日志" width="100" sortable show-overflow-tooltip />
            <el-table-column prop="bz" label="备注" width="100" sortable show-overflow-tooltip />

            <!--              <el-table-column prop="gnfwmc" label="功能范围" width="120" />-->
            <!--            <el-table-column prop="jdzy" label="技术监督专业" width="120" />-->
            <!--              <el-table-column prop="aqwz" label="安全位置" width="120" />-->
            <!--              <el-table-column prop="sapkksbm" label="SAP KKS编码" width="150" sortable show-overflow-tooltip />-->
            <!--              <el-table-column prop="sapkksbms" label="SAP KKS描述" width="160" sortable show-overflow-tooltip />-->
            <!--              <el-table-column prop="rldjmc" label="容量等级" width="100" sortable show-overflow-tooltip />-->
            <!--              <el-table-column prop="zjrlmc" label="装机容量" width="100" sortable show-overflow-tooltip />-->
          </el-table>
          <div class="pageDiv">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </aqsc-layout>
      </el-main>
    </el-container>
    <span slot="title">KKS编码选择</span>
    <div slot="footer" class="dialog-footer">
      <!--      <el-button type="primary" @click.native="selectok">确定</el-button>-->
      <el-button @click.native="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMethod } from "@/util/method"
// const userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
import {
  AqscToolbarLayout, AqscToolbarQueryPanel
} from './AqscToolbar'
import AqscLayout from './AqscLayout'
import tableHeight from '@/util/tableHeight'
// import databook from "@sjglComponents/zsjgl/DataBook"
import {
  AqscIconGroup
} from './AqscIcon'
import jizu from "./JizuComponent"
import staff from "./StaffComponent"
import logtype from "./LogTypeComponent";
import cczy from "./CcZyComponent"
import bmpz from "./BmpzComponent"
import bzcomp from "./BzComponent"
import {
  superqueryData
} from "@/api/kks";
export default {
  name: "KKSComponent",
  components: {
    AqscLayout,
    AqscToolbarLayout,
    AqscIconGroup,
    AqscToolbarQueryPanel,
    bzcomp,
    jizu,
    staff,
    logtype,
    cczy,
    bmpz
  },
  mixins: [tableHeight],
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    bukrs: {
      type: String,
      default: ''
    },
    werks: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      datas: [],
      listLoading: false,
      data: [{ dbid: '-1' }],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      currentPage: 1,
      total: 20,
      FormVisisbstaff1: false,
      datatree: [],
      moreIcon: 'aqsc-eye',
      moreTitle: '更多',
      searchAlwaysOn: false,
      arrowAlwaysOn: false,
      switchedIcon: 'aqsc-list-view',
      sfarrys: [{
        value: '0',
        label: '是'
      }, {
        value: '1',
        label: '否'
      }],
      rightflag: '',
      treeVisible: false, // tree收缩
      showTreeQuery: 'aqsc-left',
      listQuery: {
        parentid: [],
        kksbm: '',
        kksms: '',
        kksbmzt: '',
        sjkksbm: '',
        sjkksbm1: '',
        kkscxx: '1',
        gx1: '3',
        kkscxx2: '1',
        gx2: '3',
        zjgx: '1',
        werks: this.werks,
        sttxt: '0',
        cbzx: '',
        zybs: '',
        bkksbm: '',
        bkksbm1: '',
        gsbm: [],
        fzbz: [],
        fzzy: [],
        yxaz1: '',
        rldj: [],
        xtdy: [],
        sbzr: [],
        sbzr2: [],
        gsrz: [],
        sapkksbm: '',
        dczbm: '',
        sapkksbms: '',
        dczbms: '',
        sfglbzkks: '',
        bzkksms: '',
        start: 0,
        limit: 20
      }
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === true) {
        this.reset()
        this.getList();
        this.queryData();
        this.$nextTick(() => {
          this.changeHeight(100);
        })
      }
    },
    werks(val) {
      this.werks = val
    }
  },
  mounted() {
    this.getList();
    this.queryData();
  },
  methods: {
    changeHeight(mathHeight) {
      const that = this;
      if (this.$refs.container_) {
        this.tableHeight = this.$refs.container_.$el.offsetHeight - mathHeight;
        window.onresize = () => {
          that.tableHeight = this.$refs.container_.$el.offsetHeight - mathHeight;
        }
      }
    },
    changeswitch(v) {
      this.treeVisible = !this.treeVisible
      this.showTreeQuery = this.treeVisible ? 'aqsc-left' : 'aqsc-right';
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.listQuery.start = 0;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listQuery.start = (val - 1) * this.listQuery.limit;
      this.queryData();
    },
    formatDisplay: function(row, column) {
      return row.sttxt === '1' ? "禁用" : ("在用");
    },
    formatDisplay2: function(row, column) {
      return row.sfscsb === '0' ? "否" : ("是");
    },
    formatsfglbm: function(row, column) {
      return (row.bzkks === '' || row.bzkks === undefined) ? "否" : ("是");
    },
    seleChange(vals) {
      this.listSeletion = vals
    },
    listTableEdit(row) {
      console.log(row)
      this.$emit('row-dblclick', row);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    getList() {
      const param = { werks: this.werks, skks: '_null', kksbm: this.werks }
      getMethod('/sjgl/process/aqsc_sjgl_zsj_kks?m=query_tree', param).then(res => {
        this.datatree = res.dataset.datas;
        // const ss = []
        // res.dataset.datas.forEach(item => {
        //   if (item.code.length === 4) {
        //     ss.push(item)
        //   }
        // });
        // this.datatree = ss;
      })
    },
    async loadNode(node, resolve) {
      const dbid = node.data.dbid;
      if (dbid === undefined) {
        return
      }
      const param = { skks: dbid, werks: this.werks }
      await getMethod('/sjgl/process/aqsc_sjgl_zsj_kks?m=query_tree', param).then(res => {
        resolve(res.dataset.datas)
      })
    },
    async queryright(row, obj, node) {
      console.log(row.dbid)
      this.listQuery.kksdbid = ""
      this.nodedbids = []
      this.listQuery.kkscxx = "1"
      // this.listQuery.kksbm = row.kksbm
      this.listQuery.kksgj1 = row.kksbm
      this.listQuery.gx1 = "1"
      this.listQuery.rightflag = "8"
      this.queryData()
      this.rightflag = '8'
    },
    clikquerystaff(row) {
      this.$set(this.listQuery, 'sbzr', [row.staffid])
      this.$set(this.listQuery, 'sbzrmc', row.staffname)
      this.FormVisisbstaff1 = false
    },
    selectquerystaff(sels) {
      // this.$set(this.listSeletionsb[0], 'sbzr', sels.staffid)
      // this.$set(this.listSeletionsb[0], 'sbzrname', sels.staffname)
      const arrays = [];
      const names = []
      for (let i = 0; i < sels.length; i++) {
        arrays.push(sels[i].staffid)
        names.push(sels[i].staffname)
      }
      this.listQuery.sbzr = arrays
      this.listQuery.sbzrmc = names.toString()
      // this.listSeletionsb[0] = obj
      this.FormVisisbstaff1 = false
    },
    clearsbzr1() {
      this.listQuery.sbzr = []
      this.listQuery.sbzrmc = ''
    },
    handleSearchTap() {
      this.supershow = false
      this.searchAlwaysOn = !this.searchAlwaysOn
      this.collapseyc = true
      if (this.searchAlwaysOn) {
        this.moreTitle = '隐藏';
        this.moreIcon = 'aqsc-hide';
        this.$nextTick(() => {
          const height = this.$refs.queryPanel.$el.clientHeight;
          this.changeHeight(height + 100);
        })
      } else {
        this.moreIcon = 'aqsc-eye';
        this.moreTitle = '更多';
        this.collapseyc = false
        this.changeHeight(100);
      }
      // console.log(this.supershow)
    },
    reset() {
      this.showSjjy = false;
      this.rightflag = ''
      this.listQuery = {
        bmjy: '',
        msjy: '',
        bgzbmcfs: [],
        bgzmscfs: [],
        cjqs: [],
        parentid: [],
        kksbm: '',
        kksms: '',
        kksbmzt: '',
        sjkksbm: '',
        sjkksbm1: '',
        kkscxx: '1',
        gx1: '3',
        kkscxx2: '1',
        gx2: '3',
        zjgx: '1',
        werks: this.werks,
        kksgj1: '',
        kksgj2: '',
        kksbm1: '',
        kksms1: '',
        sttxt: '0',
        cbzx: '',
        zybs: '',
        bkksbm: '',
        bkksbm1: '',
        gsbm: [],
        fzbz: [],
        fzzy: [],
        yxaz1: '',
        rldj: [],
        xtdy: [],
        sbzr: [],
        sbzr2: [],
        gsrz: [],
        sapkksbm: '',
        dczbm: '',
        sapkksbms: '',
        dczbms: '',
        sfglbzkks: '',
        bzkksms: '',
        start: 0,
        limit: 20
      }
    },
    handleArrowTap() {
      this.arrowAlwaysOn = !this.arrowAlwaysOn
      // todo 搜索历史条件面板
    },
    queryData(v) {
      this.listLoading = true;
      this.listQuery.kksdbid = (this.listQuery.kksdbid === undefined ? '' : this.listQuery.kksdbid)
      if (this.listQuery.parentid.length === 0 || this.rightflag !== '8') {
        this.listQuery.parentid = [-1]
        // this.listQuery.kksdbid = ''
      }
      if (v === '951202785683132416') {
        this.listQuery.bmjy = v
        this.listQuery.msjy = ''
        this.listQuery.bgzbmcfs = []
        this.listQuery.bgzmscfs = []
        this.listQuery.cjqsdbids = []
      }
      if (v === '951203127195947008') {
        this.listQuery.bgzbmcfs = []
        this.listQuery.bmjy = ''
        this.listQuery.msjy = v
        this.listQuery.bgzmscfs = []
        this.listQuery.cjqsdbids = []
      }
      if (v === '951202852737470464') {
        this.listQuery.bgzbmcfs = this.bgzbmcfs
        this.listQuery.bmjy = ''
        this.listQuery.msjy = ''
        this.listQuery.bgzmscfs = []
        this.listQuery.cjqsdbids = []
      }
      if (v === '951203014167842816') {
        this.listQuery.bgzmscfs = this.bgzmscfs
        this.listQuery.bmjy = ''
        this.listQuery.msjy = ''
        this.listQuery.bgzbmcfs = []
        this.listQuery.cjqsdbids = []
      }
      if (v === '951202932425052160') {
        this.listQuery.bgzmscfs = []
        this.listQuery.bmjy = ''
        this.listQuery.msjy = ''
        this.listQuery.bgzbmcfs = []
        this.listQuery.cjqsdbids = this.cjqsdbids
      }
      // else {
      //   this.listQuery.bgzmscfs = []
      //   this.listQuery.bmjy = ''
      //   this.listQuery.msjy = ''
      //   this.listQuery.bgzbmcfs = []
      //   this.listQuery.cjqsdbids = []
      // }
      this.typeCount = v
      // if (this.listQuery.bmjy !== undefined) {
      //
      //   this.listQuery.bmjy = (v === '951202785683132416' || v === '951202852737470464' || v === '951202932425052160' || v === '951203014167842816' || v === '951203127195947008' ? v : this.listQuery.bmjy)
      // } else {
      //   this.listQuery.bmjy = ''
      // }
      if (this.listQuery.gsbm.length > 0 && this.listQuery.gsbm.indexOf("_null") !== -1) {
        this.listQuery.bmkz = "1"
      } else {
        this.listQuery.bmkz = "0"
      }
      if (this.listQuery.xtdy.length > 0 && this.listQuery.xtdy.indexOf("_null") !== -1) {
        this.listQuery.jzkz = "1"
      } else {
        this.listQuery.jzkz = "0"
      }
      if (this.listQuery.fzzy.length > 0 && this.listQuery.fzzy.indexOf("_null") !== -1) {
        this.listQuery.zykz = "1"
      } else {
        this.listQuery.zykz = "0"
      }
      if (this.listQuery.fzbz.length > 0 && this.listQuery.fzbz.indexOf("_null") !== -1) {
        this.listQuery.bzkz = "1"
      } else {
        this.listQuery.bzkz = "0"
      }
      if (v !== undefined) {
        this.currentPage = 0
      }
      this.listQuery.start = (this.currentPage - 1) * this.listQuery.limit;
      this.listQuery.werks = this.werks
      superqueryData(this.listQuery)
        .then(response => {
          // 对返回的数据进行格式化
          if (this.rightflag === '8') {
            for (let m = 0; m < response.dataset.length; m++) {
              console.log(response.dataset[m])
              if (response.dataset[m].name === 'zsj') {
                this.datas = response.dataset[m].datas;
                this.total = parseInt(response.dataset[m].totalCount);
              }
            }
          } else {
            this.datas = response.dataset.datas;
            this.total = parseInt(response.dataset.totalCount);
          }
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
      // this.getgzx()
      // }
    },
    rowDblclick(row, node) {
      this.$emit('row-dblclick', row)
    },
    getRoot() {
      const param = { werks: this.werks, skks: '_null', kksbm: this.werks }
      getMethod('/sjgl/process/sjgl_zsj_com_kks?m=queryRoot', param).then(res => {
        this.data = res.dataset.datas
      })
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
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/styles/aqsc-styles/aqsc-variables.scss";
  /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter {
    display: table-cell !important;
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
      height: 100%;
      position: absolute;
      left: 0;
      z-index: 1000;
      width: 240px;
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

      &.main-padding-left {
        padding-left: 240px;
      }
    }
  }

  .selfTree {
    height: calc(100vh - 420px);
    position: relative;
    display: block;
    overflow: auto;
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

  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    /*display: block;*/
  }

  .doubLeft {
    position: relative;
    cursor: pointer;
    line-height: $aqscTagViewHeight - 7px;
    padding: 2px 15px 0 15px;
    float: left;

    &:active {
      background-color: $aqscNormalBackgroundColor;
      color: $aqscThemeColor;
    }
  }
  ::v-deep .el-tree>.el-tree-node{
    min-width: 100%;
    display:inline-block;
  }
  .list-link {
    display: inline-block;
    color: #4EA5FF;
    font-size: 13px;
    cursor: pointer;
  }

</style>
