<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <el-dialog :visible.sync="dialogFormVisible"
             :show-close="false"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             class="aqsc-dialog-normal"
             width="80%"
             append-to-body>
    <div>
      <el-container style=" width: 100%; height: 100%; border: 1px solid #eee">
        <!-- 左侧导航栏 -->
        <el-aside v-show="showTrees" width="260px">
          <!-- 树查询 -->
          <div class="aside-trees" style="height: 441px">
            <div style="text-align: center ;height: 50px;margin-top: 5px">
              <el-select v-model="treechecked">
                <el-option
                  v-for="item in treeoptions"
                  :key="item.dbid"
                  :label="item.name"
                  :value="item.value" />
              </el-select>
            </div>
            <div style="margin-top: 0;padding-top: 0">
              <kks-tree v-show="Number(treechecked) === 1" ref="kkstree" :werks="werks" @row-click="kksParam" />
              <bmbz-tree v-show="Number(treechecked) === 2" ref="bmbztree" :werks="werks" @row-click="bmbzParam" />
              <sbfl-tree v-show="Number(treechecked) === 3" ref="sbfltree" @row-click="sbflParam" />
              <jsjd-tree v-show="Number(treechecked) === 4" ref="jsjdTree" :werks="werks" @row-click="jsjdParams" />
            </div>
          </div>
        </el-aside>
        <!--  树隐藏按钮  -->
        <div style="width: 16px;background-color: #EBEEF5" height="100%">
          <div style="position: relative;top: 50%">
            <i :class="showTreeQuery" @click="showTree" />
          </div>
        </div>
        <!--  主体 -->
        <el-main style="margin-top: 0;padding: 0">
          <!-- ToolBar -->
          <aqsc-layout class="aqscNormalbackgroundColor" style="padding: 0">
            <aqsc-toolbar-layout class="aqscNormalbackgroundColor" style="padding: 0">
              <template v-slot:left>
                <el-form ref="defaultQueryForm" :model="defaultQueryForm" label-width="75px" style="margin: 0;padding-left: 0">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="设备编号" prop="sbbm">
                        <a slot="label" href="#" style="color: #606266" @click="plsjSbbm">设备编号</a>
                        <el-input v-model="defaultQueryForm.sbbm"
                                  style="width: 100%"
                                  clearable
                                  size="small" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="设备名称" prop="sbmc">
                        <a slot="label" href="#" style="color: #606266" @click="plsjSbmc">设备名称</a>
                        <el-input v-model="defaultQueryForm.sbmc"
                                  style="width: 100%"
                                  clearable
                                  size="small" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="KKS编码" prop="kksbm">
                        <a slot="label" href="#" style="color: #606266" @click="plsjSbbm">KKS编码</a>
                        <el-input v-model="defaultQueryForm.kksbm"
                                  style="width: 100%"
                                  clearable
                                  size="small" />
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">
                      <el-form-item label="设备状态" prop="sbzt">
                        <databook v-model="defaultQueryForm.sbzt"
                                  style="margin-bottom: 0"
                                  groupcode="AQSC_SJGL_SBZT" />
                      </el-form-item>
                    </el-col>-->
                  </el-row>
                </el-form>
                <plsj :dialog-form-visible="popUpBox.showPlsj" :werks="werks"
                      :title="plsjTitle"
                      :table-name="tableName"
                      :table-name2="tableName2"
                      :column-name="columnName"
                      :column-name2="columnName2"
                      :column-name3="columnName3"
                      inornot="kksin"
                      @oks="plsjOks"
                      @close="popUpBox.showPlsj = false" />
              </template>
              <template v-slot:right>
                <aqsc-icon-group>
                  <el-button icon="aqsc-query" size="medium" style="margin: 0" class="aqsc-collapse-toolpannel-button-query" @click="doQuery">查询</el-button>
                  <el-button icon="aqsc-reset" size="medium" style="margin: 0" class="aqsc-collapse-toolpannel-button-query" @click="clearAll">重置</el-button>
                  <el-button :icon="moreIcon" size="medium" style="margin: 0" class="aqsc-collapse-toolpannel-button-query" @click="handleSearchTap">{{ moreTitle }}</el-button>
                </aqsc-icon-group>
              </template>
            </aqsc-toolbar-layout>
          </aqsc-layout>
          <!-- ToolBar展开页 -->
          <aqsc-toolbar-query-panel v-show="searchAlwaysOn" ref="queryPanel" style="padding: 0">
            <template v-slot:condition>
              <!--  查询页  -->
              <aqsc-layout ref="searchPanel" style="margin: 0; padding: 0">
                <div class="condition-filter-wrapper">
                  <el-form ref="normalQueryForm" :model="normalQueryForm" label-width="75px" style="padding-right: 5px">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="机组名称" prop="xtdy">
                          <jizu v-model="normalQueryForm.xtdy"
                                :werks="werks"
                                multiple />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门名称" prop="gsbm">
                          <bmpz v-model="normalQueryForm.gsbm" multiple :werks="werks" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="专业名称" prop="fzzy">
                          <cczy v-model="normalQueryForm.fzzy"
                                multiple :werks="werks" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="班组名称" prop="fzbz">
                          <bzcomp v-model="normalQueryForm.fzbz"
                                  multiple :werks="werks" :bmid="normalQueryForm.gsbm" :zyid="normalQueryForm.fzzy" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="责任人A" prop="fzra">
                          <el-input v-model="normalQueryForm.fzra"
                                    :werks="werks" :bmid="normalQueryForm.gsbm"
                                    :zyid="normalQueryForm.fzzy" :bzid="normalQueryForm.fzbz"
                                    style="width: 100%"
                                    clearable
                                    size="small" @focus="focusFzraParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="责任人B" prop="fzrb">
                          <el-input v-model="normalQueryForm.fzrb"
                                    :werks="werks" :bmid="normalQueryForm.gsbm"
                                    :zyid="normalQueryForm.fzzy" :bzid="normalQueryForm.fzbz"
                                    style="width: 100%"
                                    clearable
                                    size="small" @focus="focusFzrbParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="重要标识" prop="zybs">
                          <sfcom v-model="normalQueryForm.zybs"
                                 :disabled="zybsDisabled" style="margin: 0" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="监督专业" prop="jdzy">
                          <databook v-model="normalQueryForm.jdzy"
                                    style="margin: 0"
                                    multiple
                                    :groupcode="groupcodes" />
                        </el-form-item>
                      </el-col>
                      <!--<el-col :span="6">
                        <el-form-item prop="tzsb" label="台帐设备">
                          <sfcom v-model="normalQueryForm.tzsb"
                                 style="margin: 0" />

                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item prop="xnsb" label="虚拟设备">
                          <sfcom v-model="normalQueryForm.xnsb"
                                 style="margin: 0" />
                        </el-form-item>
                      </el-col>-->
                      <!--<el-col :span="6">
                        <el-form-item prop="cbzx" label="成本中心">
                          <el-input v-model="normalQueryForm.cbzx"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    style="margin-bottom: 6px"
                                    size="small" @focus="focusCbzxParam" />
                        </el-form-item>
                      </el-col>-->
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="标准设备" prop="bzsb">
                          <el-input v-model="normalQueryForm.bzsb"
                                    style="width: 100%"
                                    clearable
                                    size="small" @focus="focusBzsbParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="设备分类" prop="sbfl">
                          <el-input v-model="normalQueryForm.sbfl"
                                    style="width: 100%"
                                    clearable
                                    size="small" @focus="focusSbflParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="生产厂家" prop="sccj">
                          <el-input v-model="normalQueryForm.sccj"
                                    style="width: 100%"
                                    clearable
                                    size="small" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="规格型号" prop="ggxh">
                          <el-input v-model="normalQueryForm.ggxh"
                                    style="width: 100%"
                                    clearable
                                    size="small" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--<el-row>
                      <el-col :span="6">
                        <el-form-item label="受监设备" prop="sjsb">
                          <sfcom v-model="normalQueryForm.sjsb"
                                 style="margin: 0" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item prop="cjsj" label="创建日期">
                          <el-date-picker v-model="normalQueryForm.cjsj" style="width: 100%"
                                          clearable size="small"
                                          type="daterange"
                                          unlink-panels
                                          range-separator="至"
                                          :picker-options="pickerOptions" format="yyyy-MM-dd" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item prop="tyrq" label="投运日期">
                          <el-date-picker v-model="normalQueryForm.tyrq" style="width: 100%"
                                          clearable size="small"
                                          type="daterange"
                                          unlink-panels
                                          range-separator="至"
                                          :picker-options="pickerOptions" format="yyyy-MM-dd" />
                        </el-form-item>
                      </el-col>
                    </el-row>-->
                    <!--<el-row>
                      <el-col :span="6">
                        <el-form-item label="SAP KKS编码" prop="sapkksbm">
                          <el-input v-model="normalQueryForm.sapkksbm"
                                    style="width: 100%"
                                    clearable
                                    size="small" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="电厂自编码" prop="dczbm">
                          <el-input v-model="normalQueryForm.dczbm"
                                    style="width: 100%"
                                    clearable
                                    size="small" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="标准KKS编码" prop="bzkksbm">
                          <el-input v-model="normalQueryForm.bzkksbm"
                                    style="width: 100%"
                                    clearable
                                    size="small" />
                        </el-form-item>
                      </el-col>
                    </el-row>-->
                  </el-form>
                </div>
                <kks :dialog-form-visible="popUpBox.showKKSParam" @close="popUpBox.showKKSParam = false" @row-dblclick="chooseKKSParam" />
                <staff :dialog-form-visible="popUpBox.showFzraParam"
                       :werks="werks"
                       :bmid="normalQueryForm.gsbm"
                       :bzid="normalQueryForm.fzbz"
                       :zyid="normalQueryForm.fzzy"
                       @row-dblclick="chooseFzraParam" @close="popUpBox.showFzraParam=false" />
                <staff :dialog-form-visible="popUpBox.showFzrbParam"
                       :werks="werks"
                       @row-dblclick="chooseFzrbParam" @close="popUpBox.showFzrbParam=false" />
                <sbflcom :dialog-form-visible="popUpBox.showSbflParam" @row-dblclick="chooseSbflParam" @close="popUpBox.showSbflParam=false" />
                <bzsb ref="bzsb" :dialog-form-visible="popUpBox.showBzsbParam" @row-dblclick="chooseBzsbParam" @close="popUpBox.showBzsbParam=false" />
                <csks :dialog-form-visible="popUpBox.showCbzxParam" @row-dblclick="chooseCbzxParam" @close="popUpBox.showCbzxParam=false" />
              </aqsc-layout>
            </template>
          </aqsc-toolbar-query-panel>
          <!--  附件管理模态框   -->
<!--          <aqsc-upload-table ref="uploadertable" v-loading="uploadLoading"-->
<!--                             title="附件管理"-->
<!--                             :show-import="popUpBox.showUpload"-->
<!--                             :file-types="['*.*']"-->
<!--                             werks="W219"-->
<!--                             app-name="统一安全生产管理系统"-->
<!--                             module-name="数据管理模块"-->
<!--                             description="设备管理"-->
<!--                             :recordid="recordid"-->
<!--                             :moduletype="moduletype"-->
<!--                             :moduleintype="moduleintype"-->
<!--                             :limit="10"-->
<!--                             :template="false"-->
<!--                             @cancel="popUpBox.showUpload=false"-->
<!--                             @success="successUpload"-->
<!--                             @failure="failUpload" />-->
          <!-- Table -->
          <aqsc-layout class="aqscNormalbackgroundColor" style="padding-left: 0; padding-right: 0">
            <!-- 基本信息表 -->
            <el-table
              id="jbxxtable"
              ref="jbxxTable"
              v-loading="listLoading"
              :data="jbxxTable"
              :height="tableHeight"
              :default-sort="{ prop:'sbbm', order:'ascending'}"
              border
              stripe
              highlight-current-row
              @selection-change="selectionChange"
              @row-dblclick="rowDblclick"
              @row-click="selectJbxx"
            >
              <template v-if="moreSb">
                <el-table-column
                  type="selection"
                  header-align="center"
                  align="center"
                  :resizable="false"
                  width="45px"
                />
              </template>
<!--              <el-table-column-->
<!--                id="fj"-->
<!--                prop="fj"-->
<!--                label="附件"-->
<!--                header-align="left"-->
<!--                align="center"-->
<!--                fixed-->
<!--                :show-overflow-tooltip="false"-->
<!--                :resizable="false"-->
<!--                width="65px">-->
<!--                <template slot-scope="scope">-->
<!--                  <template v-if="scope.row.fj > 0">-->
<!--                    <el-button icon="aqsc-accessory" class="aqsc-collapse-toolpannel-button-query" @click.stop="showFj(scope.row.dbid)" />-->
<!--                  </template>-->
<!--                  <span v-else>{{ }}</span>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <el-table-column
                prop="sbbm"
                label="设备编号"
                header-align="left"
                align="left"
                sortable
                fixed
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px" />
              <el-table-column
                prop="sbmc"
                label="设备名称"
                header-align="left"
                align="left"
                sortable
                fixed
                :show-overflow-tooltip="true"
                :resizable="true"
                width="170px" />
              <el-table-column
                prop="jzms"
                label="机组名称"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="gsbmms"
                label="部门名称"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="zymc"
                label="专业名称"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="bzmc"
                label="班组名称"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="fzra"
                label="责任人A"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="100px"
              />
              <el-table-column
                prop="fzrb"
                label="责任人B"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="100px"
              />
              <el-table-column
                prop="zybsms"
                label="重要标识"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="sbfl"
                label="设备分类名称"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="sccj"
                label="生产厂家"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="ggxh"
                label="规格型号"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="kksbm"
                label="KKS编码"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="kksms"
                label="KKS描述"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="bzsb"
                label="标准设备编号"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <el-table-column
                prop="bzsbmc"
                label="标准设备名称"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="180px"
              />
              <el-table-column
                prop="sjsbms"
                label="受监设备"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="100px"
              />
              <el-table-column
                prop="jsjdzymc"
                label="技术监督专业"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <!--<el-table-column
                prop="tzsbms"
                label="台帐设备"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="100px"
              />
              <el-table-column
                prop="xnsbms"
                label="虚拟设备"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="100px"
              />-->
              <!--<el-table-column
                prop="bzkksbm"
                label="标准KKS编码"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="180px"
              />
              <el-table-column
                prop="bzkksms"
                label="标准KKS描述"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="180px"
              />-->
              <el-table-column
                prop="sapkksbm"
                label="SAP KKS编码"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="180px"
              />
              <el-table-column
                prop="sapkksms"
                label="SAP KKS描述"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="180px"
              />
              <el-table-column
                prop="sbztms"
                label="设备状态"
                header-align="left"
                align="center"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="100px"
              />
              <el-table-column
                prop="gcms"
                label="工厂"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />
              <!--<el-table-column
                prop="cbzxcode"
                label="成本中心"
                header-align="left"
                align="left"
                sortable
                :show-overflow-tooltip="true"
                :resizable="true"
                width="130px"
              />-->
            </el-table>
            <el-pagination
              style="float: right"
              :current-page="currentPage"
              :page-sizes="[100, 200, 500, 1000, 2000]"
              :page-size="pageSizeNow"
              layout="slot, sizes, prev, pager, next, jumper"
              :hide-on-single-page="false"
              :total="totalData"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
              <span>
                共&nbsp;
                <span :style=" totalData > pageSizeNow ? 'color: #FF0000' : ''">{{ totalData }}</span>条
              </span>
            </el-pagination>
          </aqsc-layout>
        </el-main>
      </el-container>
    </div>
    <span slot="title">{{ title }}</span>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="moreSb" @click="apply">确定</el-button>
      <el-button @click.native="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { AqscToolbarLayout, AqscToolbarQueryPanel } from "./aqsc/AqscToolbar";
  import { dateFtt } from "@/util/index";
  import { getUrl, isNull } from "@/api/sbgl";
  import staff from './aqsc/StaffComponent';
  import { AqscIconGroup } from './aqsc/AqscIcon'
  import AqscLayout from "./aqsc/AqscLayout";
  import BmbzTree from "./aqsc/BmBzTree";
  import kksTree from "./aqsc/kksTree";
  import SbflTree from "./aqsc/SbflTree";
  import JsjdTree from "./aqsc/JsjdTree";
  import { getMethod } from "@/util/method";
  import databook from "./DataBook";
  import bmpz from "./aqsc/BmpzComponent";
  import cczy from "./aqsc/CcZyComponent"
  import bzcomp from "./aqsc/BzComponent"
  import sfcom from "./aqsc/SFComponent"
  import jizu from "./aqsc/JizuComponent"
  import bzsb from "./aqsc/BzsbComponent"
  import kks from "./aqsc/KKSComponent"
  import sbflcom from "./aqsc/SbflComponent"
  import csks from "./aqsc/CsksComponent"
  import plsj from "./aqsc/PlsjComponent";
  // const userInfo = JSON.parse(sessionStorage.getItem("userinfo"));

  export default {
    name: "SjglComponentNew",
    components: {
      // AqscIcon,
      cczy,
      // AqscUploadTable,
      bzcomp,
      databook,
      bmpz,
      staff,
      BmbzTree,
      kksTree,
      SbflTree,
      JsjdTree,
      AqscLayout,
      AqscToolbarLayout,
      AqscToolbarQueryPanel,
      AqscIconGroup,
      // AqscIcon,
      sfcom,
      jizu,
      bzsb,
      sbflcom,
      csks,
      kks,
      plsj
    },
    props: {
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      bukrs: {
        type: String,
        default: "5120"
      },
      werks: {
        type: String,
        default: "W040"
      },
      fzbz: {
        type: String,
        default: ""
      },
      kksbm: {
        type: String,
        default: ""
      },
      moreSb: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '设备管理'
      },
      tzs: {
        type: Array,
        default: () => {
          return [];
        }
      },
      // 重要标识是否禁用且默认为否
      zybsDisabled: {
        type: Boolean,
        default: false
      },
      // 虚拟设备是否写死为否
      xnsbFixed: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 批量查询
        groupcodes: ['AQSC_SJGL_JSJDZY'],
        sbids: [],
        plsjTitle: '',
        tableName: '',
        tableName2: '',
        columnName: '',
        columnName2: '',
        columnName3: '',
        // 上传附件控制
        uploadLoading: false,
        // 日期选择
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tyrqOptions: [],
        cjsjOptions: [],
        // 弹出框控制
        popUpBox: {
          showBatch: false,
          showFzra: false,
          showFzrb: false,
          showSbfl: false,
          showBzsbCom: false,
          showExport: false,
          showBzsb: false,
          showKKSParam: false,
          showBzsbParam: false,
          showSbflParam: false,
          showFzraParam: false,
          showFzrbParam: false,
          showCbzxParam: false,
          // 附件
          showUpload: false,
          // 批量数据
          showPlsj: false
        },
        // 附件管理
        recordid: '', // 设备ID
        moduletype: 'AQSC_SJGL_SBGL',
        moduleintype: 'SBGL',
        // 查询方式切换
        showNormalQuery: true,
        showIndexQuery: false,
        // 默认查询
        defaultQueryForm: {
          werks: this.werks,
          kksbm: '',
          sbmc: '',
          sbbm: '',
          sbzt: ''
        },
        filterList: [
          { name: '单元(机组)', type: 'xtdy' },
          { name: '主/辅机', type: 'zjfj' },
          { name: '设备分类', type: 'sbfl' },
          { name: '标准设备', type: 'bzsb' },
          { name: '受监设备', type: 'sjsb' },
          { name: '监督专业', type: 'jdzy' },
          { name: '生产厂家', type: 'sccj' },
          { name: '规格型号', type: 'ggxh' },
          { name: '部门', type: 'gsbm' },
          { name: '专业', type: 'fzzy' },
          { name: '班组', type: 'fzbz' },
          { name: '责任人A', type: 'fzra' },
          { name: '台账', type: 'tz' }
        ],
        // 普通查询
        normalQueryForm: {
          gsbm: [],
          fzbz: [],
          fzzy: [],
          bzsb: '',
          sbfl: '',
          xtdy: [],
          cbzx: '',
          sjsb: '',
          jdzy: [],
          fzra: '',
          fzrb: '',
          tzsb: '',
          xnsb: '',
          sccj: '',
          ggxh: '',
          tyrq: [],
          cjsj: [],
          sapkksbm: '',
          dczbm: '',
          zybs: '',
          bzkksbm: ''
        },
        // 筛选条件
        indexLoading: false,
        // 已选数据
        choosedFilter: [],
        count: 0,
        // 筛选数据
        filterData: [],
        showFilter: true,
        // 更多
        moreItem: '',
        // 多选数据
        multiChoosedFilter: [],
        // 已选择字段标记
        filterChoosed: {
          jdzy: false,
          sbfl: false,
          xtdy: false,
          sccj: false,
          sjsb: false,
          bzsb: false,
          ggxh: false,
          zjfj: false,
          gsbm: false,
          fzbz: false,
          fzzy: false,
          fzra: false,
          tz: false
        },
        showFilterIcon: 'aqsc-move-up',
        // toolbar展开页显示控制
        moreTitle: '更多',
        moreIcon: 'aqsc-eye',
        searchAlwaysOn: false,
        arrowAlwaysOn: false,
        // 树查询
        showTreeQuery: 'aqsc-left',
        showTrees: true,
        treechecked: "1",
        treeoptions: [
          { name: "KKS树", value: "1" },
          { name: "部门班组树", value: "2" },
          { name: "设备分类树", value: "3" },
          { name: "技术监督树", value: "4" }
        ],
        activeNames: ["1", "2", "3", "4"],
        jsjdTreeData: [],
        jsjdTreeProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf'
        },
        // 分页
        dataStart: 0,
        totalData: 0,
        currentPage: 1,
        pageSizeNow: 100,
        // 入口表格
        jbxxTable: [],
        listLoading: true,
        tableHeight: null,
        // 入口多选
        selectionSb: [],
        selectionSbBh: [],
        queryParams: {
          sbmc: '',
          kksbm: '',
          ggxh: [],
          xtdyid: [],
          zjfjid: [],
          sbflid: [],
          sccj: [],
          bzsbid: [],
          sjsb: [],
          jdzyid: [],
          gsbm: [],
          fzbz: [],
          fzzy: [],
          fzraid: [],
          xnsb: '',
          tzsb: '',
          spkksbm: '',
          spkksms: '',
          zybs: '',
          bzkksbm: ''
        }
      };
    },
    watch: {
      treechecked(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.clearAll();
        }
      },
      dialogFormVisible(val) {
        if (val === true) {
          this.doQuery();
        }
      },
      fzbz(newV, oldV) {
        if (newV !== oldV) {
          this.normalQueryForm.fzbz = newV.split(",");
          this.doQuery();
        }
      },
      kksbm(newV, oldV) {
        if (newV !== oldV) {
          this.defaultQueryForm.kksbm = newV;
          this.doQuery();
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.changeHeight(0);
      });
      if (this.zybsDisabled) {
        this.normalQueryForm.zybs = '0';
      }
      if (this.xnsbFixed) {
        this.normalQueryForm.xnsb = '0';
      }
      this.queryParams = {};
      this.doQuery();
      this.pageSizeNow = 100;

      // console.log("userInfo", userInfo)
    },
    methods: {
      // 批量数据
      plsjOks(p, activename) {
        // console.log(p);
        p.push("-1")
        this.doQuery(p, activename);
      },
      plsjSbmc() {
        this.plsjTitle = '设备名称';
        this.tableName = 'SJGL_ZSJ_ZSBTZ';
        this.tableName2 = '';
        this.columnName = 'sbmc';
        this.columnName2 = '';
        this.columnName3 = '';
        this.popUpBox.showPlsj = true;
        console.log(this.popUpBox.showPlsj);
      },
      plsjSbbm() {
        this.plsjTitle = '设备编码';
        this.tableName = 'SJGL_ZSJ_ZSBTZ';
        this.tableName2 = '';
        this.columnName = 'sbbm';
        this.columnName2 = '';
        this.columnName3 = '';
        this.popUpBox.showPlsj = true;
      },
      plsjKKS() {
        this.plsjTitle = 'KKS编码';
        this.tableName = 'SJGL_ZSJ_ZSBTZ';
        this.tableName2 = 'SJGL_ZSJ_KKS';
        this.columnName = 'kksbm';
        this.columnName2 = 'kksbm';
        this.columnName3 = 'dbid';
        this.popUpBox.showPlsj = true;
        console.log(this.popUpBox.showPlsj);
      },
      close() {
        this.$emit('close');
      },
      apply() {
        if (this.selectionSb.length > 0) {
          this.$emit('select-rows', this.selectionSb);
        } else {
          this.$message({
            type: 'info',
            message: '请选择设备'
          })
        }
      },
      // Table --- 附件管理
      rowDblclick(row) {
        const sb = { ...row };
        this.$emit("row-dblclick", sb);
      },
      successUpload(fileList) {
        // this.tableData = fileList;
        this.uploadLoading = !fileList;
        this.popUpBox.showUpload = false;
      },
      failUpload() {
        this.$message({
          type: "error",
          message: "保存失败"
        })
      },
      showFj(dbid) {
        this.popUpBox.showUpload = true;
        this.recordid = dbid;
      },
      // 树隐藏按钮
      showTree() {
        this.showTrees = !this.showTrees;
        this.showTreeQuery = this.showTrees ? 'aqsc-left' : 'aqsc-right';
      },
      //  主界面多选
      selectionChange(val) {
        // console.log(val);
        const sbList = [];
        const sbidList = [];
        for (let i = 0; i < val.length; i++) {
          sbList.push(val[i]);
          sbidList.push(val[i].dbid);
        }
        this.selectionSb = sbList;
        this.selectionSbBh = sbidList;
      },
      // 单击选择
      selectJbxx(row) {
        this.toggleSelectSb(row);
      },
      toggleSelectSb(row) {
        if (row) {
          this.$refs.jbxxTable.toggleRowSelection(row);
        } else {
          this.$refs.jbxxTable.clearSelection();
        }
      },
      // --------------------------ToolBar按钮-----------------------
      // 普通查询
      normalQuery() {
        if (!this.showNormalQuery) {
          this.changeQuery();
        }
      },
      // 索引查询
      indexQuery() {
        // console.log(this.showIndexQuery);
        if (!this.showIndexQuery) {
          this.changeQuery();
        }
      },
      changeQuery(tab) {
        // console.log(tab);
        this.showNormalQuery = tab.name === 'normalQuery';
        this.showIndexQuery = tab.name === 'indexQuery';
        this.clearAll();
        this.$nextTick(() => {
          const height1 = this.$refs.searchPanel.$el.clientHeight;
          this.changeHeight(height1);
        })
      },
      // 投运日期处理
      getTyrq() {
        this.tyrqOptions = [];
        for (let i = 0; i < this.normalQueryForm.tyrq.length; i++) {
          this.tyrqOptions.push(dateFtt('yyyy-MM-dd hh:mm:ss', new Date(this.normalQueryForm.tyrq[i])));
        }
        // console.log(this.tyrqOptions);
      },
      getCjsj() {
        this.cjsjOptions = [];
        for (let i = 0; i < this.normalQueryForm.cjsj.length; i++) {
          this.cjsjOptions.push(dateFtt('yyyy-MM-dd hh:mm:ss', new Date(this.normalQueryForm.cjsj[i])));
        }
        // console.log(this.tyrqOptions);
      },
      // 查询按钮
      doQuery(sbids, activename) {
        this.listLoading = true;
        this.queryParams.sbmc = this.defaultQueryForm.sbmc;
        this.queryParams.sbbm = this.defaultQueryForm.sbbm;
        this.queryParams.kksbm = this.defaultQueryForm.kksbm;
        this.queryParams.werks = this.werks;
        this.queryParams.sbzt = this.defaultQueryForm.sbzt;
        if (this.showIndexQuery) {
          this.indexLoading = true;
          this.queryParams.multidata = this.choosedFilter;
        }
        if (this.showNormalQuery) {
          const sjsb = [];
          const sccj = [];
          const ggxh = [];
          this.normalQueryForm.sjsb && sjsb.push(this.normalQueryForm.sjsb)
          this.normalQueryForm.sccj && sccj.push(this.normalQueryForm.sccj);
          this.normalQueryForm.ggxh && ggxh.push(this.normalQueryForm.ggxh);
          this.queryParams.gsbm = this.normalQueryForm.gsbm;
          this.queryParams.fzbz = this.normalQueryForm.fzbz;
          this.queryParams.fzzy = this.normalQueryForm.fzzy;
          this.queryParams.bzsbbm = this.normalQueryForm.bzsb;
          this.queryParams.sbflbm = this.normalQueryForm.sbfl;
          this.queryParams.xtdyid = this.normalQueryForm.xtdy;
          this.queryParams.cbzxcode = this.normalQueryForm.cbzx;
          this.queryParams.sjsb = sjsb;
          this.queryParams.jdzyid = isNull(this.normalQueryForm.jdzy) ? undefined : this.normalQueryForm.jdzy;
          this.queryParams.fzra = this.normalQueryForm.fzra;
          this.queryParams.fzrb = this.normalQueryForm.fzrb;
          // this.queryParams.tzsb = this.normalQueryForm.tzsb;
          this.queryParams.xnsb = this.normalQueryForm.xnsb;
          this.queryParams.sccj = sccj;
          this.queryParams.ggxh = ggxh;
          this.queryParams.sapkksbm = this.normalQueryForm.sapkksbm;
          this.queryParams.dczbm = this.normalQueryForm.dczbm;
          this.queryParams.zybs = this.normalQueryForm.zybs.toString();
          this.queryParams.bzkksbm = this.normalQueryForm.bzkksbm;
          this.queryParams.tzs = this.tzs;
          if (!isNull(this.normalQueryForm.tyrq) && JSON.stringify(this.normalQueryForm.tyrq) !== '[]' && this.normalQueryForm.tyrq !== null) {
            this.getTyrq();
            this.queryParams.tyrq = this.tyrqOptions;
          } else {
            this.queryParams.tyrq = undefined;
          }
          if (!isNull(this.normalQueryForm.cjsj) && JSON.stringify(this.normalQueryForm.cjsj) !== '[]' && this.normalQueryForm.cjsj !== null) {
            this.getCjsj();
            this.queryParams.cjsj = this.cjsjOptions;
          } else {
            this.queryParams.cjsj = undefined;
          }
        }
        this.queryParams.start = this.dataStart;
        this.queryParams.limit = this.pageSizeNow;
        if (sbids !== undefined && sbids.length !== undefined) {
          if (this.popUpBox.showPlsj && activename !== "second") {
            this.queryParams.sbid = sbids
            this.queryParams.nsbid = [];
          } else {
            this.queryParams.nsbid = sbids
            this.queryParams.sbid = [];
          }
        } else {
          this.queryParams.nsbid = [];
          this.queryParams.sbid = [];
        }
        this.querySb(this.queryParams);
      },
      querySb(data) {
        // console.log("queryParams:", data);
        if (this.showIndexQuery) {
          this.getXtdy(data);
        }
        getMethod(getUrl('sbgl?sbgl=query2'), { data: JSON.stringify(data) }).then(res => {
          this.ywxxTable = res.dataset.datas;
          this.totalData = parseInt(res.dataset.totalCount);
          this.listLoading = false;
          if (this.totalData <= (this.currentPage - 1) * this.pageSizeNow) {
            if (this.currentPage < 2) {
              this.dataStart = 0
            } else {
              this.dataStart = (this.currentPage - 2) * this.pageSizeNow;
            }
            this.currentPage -= 1;
            this.doQuery();
          }
          this.$nextTick(() => {
            this.jbxxTable = res.dataset.datas;
          });
        });
      },
      // 更多按钮
      handleSearchTap() {
        this.searchAlwaysOn = !this.searchAlwaysOn;
        if (this.searchAlwaysOn) {
          this.moreTitle = '隐藏';
          this.moreIcon = 'aqsc-hide';
          this.$nextTick(() => {
            const height1 = this.$refs.queryPanel.$el.clientHeight;
            this.changeHeight(height1);
          })
        } else {
          this.moreIcon = 'aqsc-eye';
          this.moreTitle = '更多';
          this.$nextTick(() => {
            const height1 = this.$refs.queryPanel.$el.clientHeight;
            this.changeHeight(height1);
          });
        }
      },
      // 刷新按钮--清空查询条件
      clearAll() {
        // 取消全部选择的条件
        this.listLoading = true;
        this.queryParams = {};
        if (this.showIndexQuery) {
          this.choosedFilter = [];
          this.queryParams.multidata = this.choosedFilter;
          this.filterData.forEach((v) => {
            v.hasChoosed = false;
          });
          this.changeTableHeight();
          for (const item in this.filterChoosed) {
            this.filterChoosed[item] = false;
          }
          this.clearQuery('defaultQueryForm');
        }
        if (this.showNormalQuery) {
          this.clearQuery('normalQueryForm');
          this.normalQueryForm.fzraid = '';
          this.normalQueryForm.fzrbid = '';
          this.normalQueryForm.bzsbid = '';
          this.normalQueryForm.sbflid = '';
        }
        // console.log(this.normalQueryForm);
        // 默认查询条件重置
        this.defaultQueryForm.sbbm = '';
        this.defaultQueryForm.sbmc = '';
        this.defaultQueryForm.kksbm = '';
        // 索引查询组件需要下面4个字段
        this.queryParams.kksbm = '';
        this.queryParams.sbmc = '';
        this.queryParams.ggxh = '';
        this.queryParams.sbbm = '';
        this.queryParams.werks = this.werks;
        this.queryParams.start = this.dataStart;
        this.queryParams.limit = this.pageSizeNow;
        this.querySb(this.queryParams);
      },
      // --------------------------树查询----------------------------
      //  KKS树联动查询
      kksParam(row) {
        // console.log(row);
        this.$set(this.defaultQueryForm, 'kksbm', row.code);
        this.doQuery();
      },
      //  部门班组树联动查询
      async bmbzParam(row) {
        // console.log(row);
        this.$set(this.normalQueryForm, 'gsbm', []);
        this.$set(this.normalQueryForm, 'fzbz', []);
        this.$set(this.normalQueryForm, 'fzra', '');
        this.queryParams.fzraid = [];
        const condition2 = {};
        condition2.type = '班组';
        // 部门 item.filters中包含多个condition---item代表一个字段,condition代表一个选项
        const condition = {};
        condition.type = '部门';
        const item = {};
        item.name = '部门';
        item.hasChoosed = true;
        if (row.type === "bm") {
          if (row.children !== undefined) {
            this.queryParams.fzbz = this.getBmbzShadowData(row).bzids;
            this.queryParams.fzraid = this.getBmbzShadowData(row).zrrids;
          }
          if (this.showIndexQuery) {
            // console.log(row.dbid);
            condition.id = row.dbid;
            condition.value = row.name;
            this.resetFilterChoosed(item);
            await this.cancelChoose(condition);
            await this.cancelChoose(condition2);
            this.handleFilter(condition, item);
          }
          if (this.showNormalQuery) {
            this.$set(this.normalQueryForm, 'gsbm', [row.dbid]);
            this.$set(this.normalQueryForm, 'fzbz', []);
            this.doQuery();
          }
        } else if (row.type === 'bz') {
          if (row.children !== undefined) {
            this.queryParams.fzraid = this.getBmbzShadowData(row).zrrids;
          }
          if (this.showIndexQuery) {
            const item2 = {};
            condition2.id = row.dbid;
            condition2.value = row.name;
            item2.name = '班组';
            this.resetFilterChoosed(item2);
            await this.cancelChoose(condition2);
            // console.log(this.choosedFilter);
            for (let i = 0; i < this.choosedFilter.length; i++) {
              if (this.choosedFilter[i].type === '部门' && this.choosedFilter[i].id !== row.parentid) {
                this.resetFilterChoosed(item);
                await this.cancelChoose(condition);
                break;
              }
            }
            await this.handleFilter(condition2, item2);
            condition.id = row.parentid;
            condition.value = row.parentid;
          }
          if (this.showNormalQuery) {
            // this.$set(this.normalQueryForm, 'gsbm', [row.parentid]);
            this.$set(this.normalQueryForm, 'fzbz', [row.dbid]);
            this.doQuery();
          }
        } else if (row.type === 'zrr') {
          const arr = [];
          row.dbid && arr.push(row.dbid)
          this.queryParams.fzraid = arr;
          this.$set(this.normalQueryForm, 'fzra', row.name);
          this.doQuery();
        }
        // console.log(row);
        // console.log(this.filterData);
      },
      // 设备分类树查询
      async sbflParam(row) {
        // console.log(row);
        if (row.children !== undefined) {
          this.$set(this.normalQueryForm, 'sbfl', '');
          const ids = this.getShadowData(row);
          ids.push(row.dbid);
          this.queryParams.sbflid = ids;
        } else {
          this.queryParams.sbflid = [row.dbid];
        }
        if (this.showIndexQuery) {
          const condition = {};
          const item = {};
          item.name = '设备分类';
          item.hasChoosed = true;
          condition.id = this.queryParams.sbflid.join(',');
          condition.type = '设备分类';
          condition.value = row.name;
          this.resetFilterChoosed(item);
          await this.cancelChoose(condition);
          this.handleFilter(condition, item);
        }
        if (this.showNormalQuery) {
          if (row.children === undefined) {
            this.$set(this.normalQueryForm, 'sbfl', row.code);
          }
          this.doQuery();
        }
      },
      // 技术监督树查询
      async jsjdParams(row) {
        // console.log(row);
        if (this.showIndexQuery) {
          const condition1 = {};
          const condition2 = {};
          const condition3 = {};
          const item1 = {};
          const item2 = {};
          const item3 = {};
          condition1.id = row.dbid;
          condition1.type = '监督专业';
          condition1.value = row.label;
          item1.name = '监督专业';
          item1.hasChoosed = true;
          condition2.id = row.dbid;
          condition2.type = '设备分类';
          condition2.value = row.label;
          item2.name = '设备分类';
          item2.hasChoosed = true;
          condition3.id = row.dbid;
          condition3.type = '单元(机组)';
          condition3.value = row.label;
          item3.name = '单元(机组)';
          item3.hasChoosed = true;
          if (row.type === 'jdzy') {
            this.queryParams.jdzyid = [row.dbid];
            this.resetFilterChoosed(item1);
            await this.cancelChoose(condition1);
            await this.cancelChoose(condition2);
            await this.cancelChoose(condition3);
            this.queryParams.sbflid = [];
            this.queryParams.xtdyid = [];
            this.queryParams.sbid = '';
            await this.handleFilter(condition1, item1);
          } else if (row.type === 'sbfl') {
            this.queryParams.sbflid = [row.dbid];
            this.resetFilterChoosed(item2);
            await this.cancelChoose(condition2);
            await this.cancelChoose(condition3);
            this.queryParams.xtdyid = [];
            this.queryParams.sbid = '';
            await this.handleFilter(condition2, item2);
          } else if (row.type === 'jizu') {
            this.queryParams.xtdyid = [row.dbid];
            this.resetFilterChoosed(item3);
            await this.cancelChoose(condition3);
            this.queryParams.sbid = '';
            await this.handleFilter(condition3, item3);
          } else if (row.type === 'sbgl') {
            this.queryParams.sbid = row.dbid;
            this.doQuery();
          }
        }
        if (this.showNormalQuery) {
          if (row.type === 'jdzy') {
            this.queryParams.sbflid = [];
            this.queryParams.xtdyid = [];
            this.queryParams.sbid = '';
            this.$set(this.normalQueryForm, 'jdzy', [row.dbid]);
            this.$set(this.normalQueryForm, 'sbfl', '');
            this.$set(this.normalQueryForm, 'sbflid', '');
            this.$set(this.normalQueryForm, 'xtdy', []);
          } else if (row.type === 'sbfl') {
            this.queryParams.xtdyid = [];
            this.queryParams.sbid = '';
            this.$set(this.normalQueryForm, 'sbfl', row.label);
            this.queryParams.sbflid = row.dbid;
            this.$set(this.normalQueryForm, 'xtdy', []);
          } else if (row.type === 'jizu') {
            this.queryParams.sbid = '';
            this.$set(this.normalQueryForm, 'xtdy', [row.dbid]);
          } else if (row.type === 'sbgl') {
            this.queryParams.sbid = row.dbid;
          }
          this.doQuery();
        }
      },
      // 获得树组件节点及节点下所有子节点
      getShadowData(row) {
        // debugger
        const ids = [];
        for (let i = 0; i < row.children.length; i++) {
          // console.log(row.children[i]);
          ids.push(row.children[i].dbid);
          if (row.children[i].children !== undefined) {
            ids.push.apply(ids, this.getShadowData(row.children[i]));
          }
        }
        return ids;
      },
      getBmbzShadowData(row) {
        // debugger
        const bzids = [];
        const zrrids = [];
        for (let i = 0; i < row.children.length; i++) {
          if (row.children[i].type === 'zrr') {
            zrrids.push(row.children[i].dbid);
          } else if (row.children[i].type === 'bz') {
            bzids.push(row.children[i].dbid);
            if (row.children[i].children) {
              const bz = row.children[i].children;
              bz.forEach(zrr => {
                zrrids.push(zrr.dbid);
              })
            }
          }
        }
        return {
          bzids,
          zrrids
        };
      },
      // ----------------------------------------------------弹出框双击选择数据-----------------
      // 选择KKS
      focusKKSParam() {
        this.popUpBox.showKKSParam = true
      },
      chooseKKSParam(row) {
        // console.log(row);
        if (this.defaultQueryForm.kksid !== row.dbid || this.defaultQueryForm.kksbm !== row.code) {
          this.defaultQueryForm.kksid = row.dbid;
          this.defaultQueryForm.kksbm = row.code;
        }
        this.popUpBox.showKKSParam = false
      },
      // 选择成本中心
      focusCbzxParam() {
        this.popUpBox.showCbzxParam = true
      },
      chooseCbzxParam(row) {
        // console.log(row);
        this.normalQueryForm.cbzx = row.kostl;
        this.normalQueryForm.cbzxid = row.dbid;
        this.popUpBox.showCbzxParam = false
        // console.log(this.normalQueryForm);
      },
      // 选择标准设备
      focusBzsbParam() {
        this.popUpBox.showBzsbParam = true
      },
      chooseBzsbParam(row) {
        // console.log(row);
        // console.log(dtl);
        this.bzsbObj = row;
        if (this.normalQueryForm.bzsb !== row.sbbm || this.normalQueryForm.bzsbid !== row.dbid) {
          this.$set(this.normalQueryForm, 'bzsbid', row.dbid);
          this.$set(this.normalQueryForm, 'bzsb', row.sbbm);
        }
        // console.log(csInfo);
        this.popUpBox.showBzsbParam = false;
      },
      // 选择责任人A
      focusFzraParam() {
        this.popUpBox.showFzraParam = true
      },
      chooseFzraParam(row) {
        // console.log(row);
        if (this.normalQueryForm.fzraid !== row.staffid || this.normalQueryForm.fzra !== row.staffname) {
          this.normalQueryForm.fzra = row.staffname;
          this.normalQueryForm.fzraid = row.staffid;
        }
        // this.fzrBackLogic(row);
        this.popUpBox.showFzraParam = false
      },
      // 选择责任人B
      focusFzrbParam() {
        this.popUpBox.showFzrbParam = true
      },
      chooseFzrbParam(row) {
        // console.log(row);
        if (this.normalQueryForm.fzrbid !== row.staffid || this.normalQueryForm.fzrb !== row.staffname) {
          this.normalQueryForm.fzrb = row.staffname;
          this.normalQueryForm.fzrbid = row.staffid;
        }
        // this.fzrBackLogic(row);
        this.popUpBox.showFzrbParam = false
      },
      // 普通查询负责人逆向级联
      fzrBackLogic(row) {
        if (!isNull(row.bmid)) {
          this.normalQueryForm.gsbm.push(row.bmid)
        }
        if (!isNull(row.bz_id)) {
          this.normalQueryForm.fzbz.push(row.bz_id)
        }
        if (!isNull(row.zy_id)) {
          this.normalQueryForm.fzzy.push(row.zy_id)
        }
      },
      // 选择设备分类
      focusSbflParam() {
        this.popUpBox.showSbflParam = true
      },
      chooseSbflParam(row) {
        // console.log(row);
        // console.log((this.normalQueryForm.jdzy));
        if (this.normalQueryForm.sbflid !== row.dbid || this.normalQueryForm.sbfl !== row.flmc) {
          this.normalQueryForm.sbfl = row.fldm;
          this.normalQueryForm.sbflid = row.dbid;
        }
        this.popUpBox.showSbflParam = false;
      },
      // -----------------------------分页----------------------------
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSizeNow = val;
        this.doQuery();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.dataStart = (this.currentPage - 1) * this.pageSizeNow;
        this.doQuery();
      },
      // ----------------------------工具方法-------------------------
      // 控制筛选时的高度
      changeTableHeight() {
        this.$nextTick(() => {
          const height = this.$refs.searchPanel.$el.clientHeight;
          this.changeHeight(height);
        })
      },
      // 控制页面表格高度
      changeHeight(mathHeight) {
        const that = this;
        this.tableHeight = 365 - mathHeight;
        // 设置表格高度
        window.onresize = () => {
          that.tableHeight = 365 - mathHeight;
        }
      },
      // 重置表单
      clearQuery(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        } else {
          // console.log("this.$refs[formName] :is null");
        }
      }
      /* // ---------------------------索引查询-------------------------
   // 加载筛选条件
   getXtdy(data) {
     // console.log(JSON.stringify(data))
     const arr = [];
     for (const key in this.filterChoosed) {
       this.filterChoosed[key] && arr.push(key)
     }
     Object.assign(data, { choosed: arr })
     /!* {
         params: JSON.stringify(data),
           xtdy: this.filterChoosed.xtdy,
         zjfj: this.filterChoosed.zjfj,
         bzsb: this.filterChoosed.bzsb,
         sccj: this.filterChoosed.sccj,
         ggxh: this.filterChoosed.ggxh,
         sbfl: this.filterChoosed.sbfl,
         sjsb: this.filterChoosed.sjsb,
         jdzy: this.filterChoosed.jdzy,
         gsbm: this.filterChoosed.gsbm,
         fzbz: this.filterChoosed.fzbz,
         fzzy: this.filterChoosed.fzzy,
         fzra: this.filterChoosed.fzra,
         tz: this.filterChoosed.tz
       }*!/
     getMethod(getUrl('sbgl?sbgl=getIndexQuery'), { data: JSON.stringify(data) }).then(res => {
       const filterData = [];
       for (let m = 0; m < res.dataset.length; m++) {
         // 对返回的数据进行格式化
         if (res.dataset[m].datas.length !== 0) {
           if (res.dataset[m].name === 'xtdy') {
             const xtdyObj = {};
             const datass = res.dataset[m];
             xtdyObj.filters = this.dealFilterData(datass, '单元(机组)');
             xtdyObj.name = '单元(机组)';
             if (this.filterChoosed.xtdy) {
               xtdyObj.hasChoosed = true;
             } else {
               xtdyObj.hasChoosed = false;
               this.filterChoosed.xtdy = false;
             }
             xtdyObj.multichoose = false;
             filterData.push(xtdyObj);
           }
           if (res.dataset[m].name === 'sjsb') {
             const sjsbObj = {};
             const datass = res.dataset[m];
             sjsbObj.filters = this.dealFilterData(datass, '受监设备');
             sjsbObj.name = '受监设备';
             if (this.filterChoosed.sjsb) {
               sjsbObj.hasChoosed = true;
             } else {
               sjsbObj.hasChoosed = false;
               this.filterChoosed.sjsb = false;
             }
             sjsbObj.multichoose = false;
             filterData.push(sjsbObj);
           }
           if (res.dataset[m].name === 'bzsb') {
             const bzsbObj = {};
             const datass = res.dataset[m];
             bzsbObj.filters = this.dealFilterData(datass, '标准设备');
             bzsbObj.name = '标准设备';
             if (this.filterChoosed.bzsb) {
               bzsbObj.hasChoosed = true;
             } else {
               bzsbObj.hasChoosed = false;
               this.filterChoosed.bzsb = false;
             }
             bzsbObj.multichoose = false;
             filterData.push(bzsbObj);
           }
           if (res.dataset[m].name === 'sbfl') {
             const sbflObj = {};
             const datass = res.dataset[m];
             sbflObj.filters = this.dealFilterData(datass, '设备分类');
             sbflObj.name = '设备分类';
             if (this.filterChoosed.sbfl) {
               sbflObj.hasChoosed = true;
             } else {
               sbflObj.hasChoosed = false;
               this.filterChoosed.sbfl = false;
             }
             sbflObj.multichoose = false;
             filterData.push(sbflObj);
           }
           if (res.dataset[m].name === 'sccj') {
             const sccjObj = {};
             const datass = res.dataset[m];
             sccjObj.filters = this.dealFilterData(datass, '生产厂家');
             sccjObj.name = '生产厂家';
             if (this.filterChoosed.sccj) {
               sccjObj.hasChoosed = true;
             } else {
               sccjObj.hasChoosed = false;
               this.filterChoosed.sccj = false;
             }
             sccjObj.multichoose = false;
             filterData.push(sccjObj);
             // filterData[2] = (sccjObj);
           }
           if (res.dataset[m].name === 'ggxh') {
             const ggxhObj = {};
             const datass = res.dataset[m];
             ggxhObj.filters = this.dealFilterData(datass, '规格型号');
             ggxhObj.name = '规格型号';
             if (this.filterChoosed.ggxh) {
               ggxhObj.hasChoosed = true;
             } else {
               ggxhObj.hasChoosed = false;
               this.filterChoosed.ggxh = false;
             }
             ggxhObj.multichoose = false;
             filterData.push(ggxhObj);
             // filterData[2] = (sccjObj);
           }
           if (res.dataset[m].name === 'jdzy') {
             const datass = res.dataset[m];
             const jdzyObj = {};
             jdzyObj.filters = this.dealFilterData(datass, '监督专业');
             jdzyObj.name = '监督专业';
             if (this.filterChoosed.jdzy) {
               jdzyObj.hasChoosed = true;
             } else {
               jdzyObj.hasChoosed = false;
               this.filterChoosed.jdzy = false;
             }
             jdzyObj.multichoose = false;
             filterData.push(jdzyObj);
           }
           if (res.dataset[m].name === 'gsbm') {
             const datass = res.dataset[m];
             const gsbmObj = {};
             gsbmObj.filters = this.dealFilterData(datass, '部门');
             gsbmObj.name = '部门';
             if (this.filterChoosed.gsbm) {
               gsbmObj.hasChoosed = true;
             } else {
               gsbmObj.hasChoosed = false;
               this.filterChoosed.gsbm = false;
             }
             gsbmObj.multichoose = false;
             filterData.push(gsbmObj);
           }
           if (res.dataset[m].name === 'fzzy') {
             const datass = res.dataset[m];
             const fzzyObj = {};
             fzzyObj.filters = this.dealFilterData(datass, '专业');
             fzzyObj.name = '专业';
             if (this.filterChoosed.fzzy) {
               fzzyObj.hasChoosed = true;
             } else {
               fzzyObj.hasChoosed = false;
               this.filterChoosed.fzzy = false;
             }
             fzzyObj.multichoose = false;
             filterData.push(fzzyObj);
           }
           if (res.dataset[m].name === 'fzbz') {
             const datass = res.dataset[m];
             const fzbzObj = {};
             fzbzObj.filters = this.dealFilterData(datass, '班组');
             fzbzObj.name = '班组';
             if (this.filterChoosed.fzbz) {
               fzbzObj.hasChoosed = true;
             } else {
               fzbzObj.hasChoosed = false;
               this.filterChoosed.fzbz = false;
             }
             fzbzObj.multichoose = false;
             filterData.push(fzbzObj);
           }
           if (res.dataset[m].name === 'fzra') {
             const datass = res.dataset[m];
             const fzraObj = {};
             fzraObj.filters = this.dealFilterData(datass, '责任人A');
             fzraObj.name = '责任人A';
             if (this.filterChoosed.fzra) {
               fzraObj.hasChoosed = true;
             } else {
               fzraObj.hasChoosed = false;
               this.filterChoosed.fzra = false;
             }
             fzraObj.multichoose = false;
             filterData.push(fzraObj);
           }
           if (res.dataset[m].name === 'tz') {
             const datass = res.dataset[m];
             const tzObj = {};
             tzObj.filters = this.dealFilterData(datass, '台帐');
             tzObj.name = '台帐';
             if (this.filterChoosed.tz) {
               tzObj.hasChoosed = true;
             } else {
               tzObj.hasChoosed = false;
               this.filterChoosed.tz = false;
             }
             tzObj.multichoose = false;
             if (Number(datass.datas[0].count) !== 0 || Number(datass.datas[1].count) !== 0 || Number(datass.datas[2].count) !== 0) {
               filterData.push(tzObj);
             }
           }
         }
       }
       filterData.sort((a, b) => {
         const order = ['单元(机组)', '部门', '专业', '班组', '责任人A', '台帐', '设备分类', '标准设备', '生产厂家', '规格型号', '受监设备', '监督专业'];
         return order.indexOf(a.name) - order.indexOf(b.name);
       });
       // console.log(this.filterData);
       this.filterData = filterData;
       this.indexLoading = false;
       this.changeTableHeight();
     });
   },
   // 筛选条件赋值处理
   dealFilterData(datass, type) {
     const arr = [];
     const numArr = [];
     for (let i = 0; i < datass.datas.length; i++) {
       const item = datass.datas[i];
       const obj = {};
       if (item.dataname !== '空' || item.dataid && item.dataid !== '空') {
         obj.id = item.dataid;
         obj.value = item.dataname ? item.dataname : "";
         obj.type = type;
         obj.count = Number(item.count);
         arr.push(obj);
       } else {
         numArr.push(Number(item.count))
       }
     }
     const num = numArr.reduce((prev, now) => {
       return prev + now;
     }, 0);
     const nObj = {
       id: '_empty',
       value: '空',
       type: type,
       count: num
     };
     if (nObj.count !== 0) {
       arr.push(nObj);
     }
     arr.sort((a, b) => {
       const sort = [b.name, '空'];
       return sort.indexOf(b.name) - sort.indexOf('空');
     });
     return arr;
   },
   // 单选
   async handleFilter(condition, item) {
     /!* console.log(condition);// 一条数据
       console.log(item);// 同类数据数组,其中包含多条数据*!/
     if (condition.id === '') {
       return;
     }
     this.choosedFilter.push(condition);
     for (let i = 0; i < this.filterData.length; i++) {
       if (this.filterData[i].name === item.name) {
         this.$set(this.filterData[i], 'hasChoosed', true);
         break;
       }
     }
     await this.setFilterParam(condition.id.split(','), item);
     this.changeTableHeight();
   },
   // 已选项删除
   async cancelChoose(item) {
     // console.log(item);
     // 取消已选
     const type = this.getType(item);
     // console.log(type);
     // console.log(this.filterData);
     // console.log(this.choosedFilter);
     for (let i = 0; i < this.filterData.length; i++) {
       if (this.filterData[i].name === type) {
         await this.$set(this.filterData[i], 'hasChoosed', false);
       }
     }
     for (let j = 0; j < this.choosedFilter.length; j++) {
       if (Array.isArray(this.choosedFilter[j])) {
         for (let k = 0; k < this.choosedFilter[j].length; k++) {
           if (this.choosedFilter[j][k].type === type) {
             this.choosedFilter.splice(j, 1);
             j -= 1;
             break;
           }
         }
       } else {
         if (this.choosedFilter[j].type === type) {
           this.choosedFilter.splice(j, 1);
           j -= 1;
         }
       }
     }
   },
   // 取消选择之后
   afterCancelChoose(item) {
     // debugger
     // console.log(item);
     this.cancelChoose(item);
     const type = this.getType(item);
     this.setFilterParam([], { name: type });
     // console.log(this.filterData);
     // console.log(this.filterChoosed);
     this.changeTableHeight();
   },
   // 多选
   doMultiChoose(item) {
     // console.log(item); item为该行所有的数据
     this.filterData.forEach(v => {
       // console.log(v); 确保只有一行处于多选状态
       v.multichoose = false;
     });
     item.multichoose = true;
     this.moreItem = item.name;
     this.changeTableHeight();
   },
   // 提交多选
   handleMultiChoose(item) {
     this.choosedFilter.push(this.multiChoosedFilter);
     const ids = [];
     for (let i = 0; i < this.multiChoosedFilter.length; i++) {
       ids.push(this.multiChoosedFilter[i].id);
     }
     this.multiChoosedFilter = [];
     this.moreItem = '';
     this.filterData.forEach(v => {
       v.multichoose = false;
     });
     item.hasChoosed = true;
     this.setFilterParam(ids, item);
     this.changeTableHeight();
   },
   // 取消多选操作
   cancelMultiChoose() {
     // console.log(this.multiChoosedFilter);
     this.multiChoosedFilter = [];
     this.filterData.forEach(v => {
       v.multichoose = false;
     });
     this.changeTableHeight();
   },
   // 获取Type
   getType(item) {
     let type;
     if (item.length === undefined) {
       type = item.type;
     } else {
       item.forEach((v) => {
         type = v.type;
       })
     }
     return type;
   },
   // 更多按钮
   filterMore(item) {
     // 更多按钮点击
     this.moreItem = item.name;
     this.$nextTick(() => {
       const height = this.$refs.searchPanel.$el.clientHeight;
       this.changeHeight(height);
     })
   },
   filterClose() {
     this.changeTableHeight();

     // 点击收起
     this.moreItem = "";
   },
   // 重置筛选状态
   resetFilterChoosed(item) {
     // console.log(item);
     this.filterList.forEach((obj) => {
       // console.log(obj);{ name: '...', type: '...'}
       if (item.name === obj.name && this.filterChoosed[obj.type]) {
         this.filterChoosed[obj.type] = false;
       }
     });
   },
   // 筛选条件查询
   setFilterParam(condition, item) {
     // console.log(item);
     if (item.name === '单元(机组)') {
       this.queryParams.xtdyid = condition;
       this.filterChoosed.xtdy = !this.filterChoosed.xtdy;
     } else if (item.name === '主/辅机') {
       this.filterChoosed.zjfj = !this.filterChoosed.zjfj;
       // console.log(this.filterChoosed.zjfj);
       this.queryParams.zjfjid = condition;
     } else if (item.name === '设备分类') {
       this.filterChoosed.sbfl = !this.filterChoosed.sbfl;
       this.queryParams.sbflid = condition;
     } else if (item.name === '标准设备') {
       this.filterChoosed.bzsb = !this.filterChoosed.bzsb;
       this.queryParams.bzsbid = condition;
     } else if (item.name === '受监设备') {
       this.filterChoosed.sjsb = !this.filterChoosed.sjsb;
       this.queryParams.sjsb = condition;
     } else if (item.name === '监督专业') {
       this.filterChoosed.jdzy = !this.filterChoosed.jdzy;
       this.queryParams.jdzyid = condition;
     } else if (item.name === '生产厂家') {
       this.filterChoosed.sccj = !this.filterChoosed.sccj;
       this.queryParams.sccj = condition;
     } else if (item.name === '规格型号') {
       this.filterChoosed.ggxh = !this.filterChoosed.ggxh;
       this.queryParams.ggxh = condition;
     } else if (item.name === '部门') {
       this.filterChoosed.gsbm = !this.filterChoosed.gsbm;
       if (condition[0] === undefined) {
         this.queryParams.fzbz = '';
       }
       this.queryParams.gsbm = condition;
     } else if (item.name === '专业') {
       this.filterChoosed.fzzy = !this.filterChoosed.fzzy;
       this.queryParams.fzzy = condition;
     } else if (item.name === '班组') {
       this.filterChoosed.fzbz = !this.filterChoosed.fzbz;
       this.queryParams.fzbz = condition;
     } else if (item.name === '责任人A') {
       this.filterChoosed.fzra = !this.filterChoosed.fzra;
       this.queryParams.fzraid = condition;
     } else if (item.name === '台帐') {
       this.filterChoosed.tz = !this.filterChoosed.tz;
       const tzs = [];
       condition.forEach(item => {
         tzs.push(item);
       })
       this.queryParams.tzs = tzs;
     }
     this.doQuery();
   },*/
    }
  };
</script>

<style lang="scss" scoped>
  .aside-trees {
    position: relative;
    display: block;
    overflow: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    /*overflow-x: scroll;*/
  }
</style>

