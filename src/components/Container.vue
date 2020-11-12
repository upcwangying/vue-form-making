<template>
  <span class="fm-style">
    <el-container class="fm2-container">
      <div class="add-column-mask-container" v-if="showAddColumn"></div>
      <el-header height="45">
        <el-row class="btn-container">
<!--          <el-button @click="saveSheetJSON">保存sheet数据</el-button>-->
          <!--            <el-button @click="saveReportJSON">保存报表数据</el-button>-->
          <!--          <el-button @click="queryReportData">获取报表数据</el-button>-->
          <!--          <el-button @click="queryData">获取数据</el-button>-->
          <el-button @click="querySpreadSheetData">获取电子表格数据(测试)</el-button>
          <!--          <el-button @click="loadSpreadSheetData">赋值电子表格数据(测试)</el-button>-->
          <el-button @click="createTemplate">创建</el-button>
          <el-button @click="saveTemplate">保存</el-button>
          <el-button @click="deleteTemplate">删除</el-button>
          <el-button @click="copyTemplate">参考创建</el-button>
          <el-button @click="handlePreview">预览</el-button>
          <el-button @click="publish">发布</el-button>
          <el-button @click="enable">启用</el-button>
        </el-row>
      </el-header>
      <el-main class="fm2-main">
        <add-column class="add-column-container" v-if="showAddColumn" :zb-data="zbflSelectData"
                    @submit="submitColumnInfo" @cancel="showAddColumn = false"/>
        <el-container>
          <el-aside class="widget-config-container">
            <el-container>
              <el-header height="45px">
                <div class="config-tab left" :class="{active: leftConfigTab ==='shiyan'}"
                     @click="handleLeftConfigSelect('shiyan')">{{$t('fm.left.shiyan.title')}}</div>
                <div class="config-tab left" :class="{active: leftConfigTab ==='jiandu'}"
                     @click="handleLeftConfigSelect('jiandu')">{{$t('fm.left.jiandu.title')}}</div>
              </el-header>
              <el-main class="config-content">
                <div style="height: 100%" v-show="leftConfigTab ==='shiyan'">
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">报表分类</div>
                    </el-header>
                    <el-main>
                      <template-tree :syorjb="syorjbParam" :tree-data="bbflTreeData" @node-expand="handleExpNode"
                                     @check-change="selectTree"/>
                    </el-main>
                  </el-container>
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">指标分类</div>
                    </el-header>
                    <el-main>
                      <quota-table :syorjb="syorjbParam" :zbfl-zb-data="zbflSelectData" :loading="quateTableLoading"
                                   @change="zbSelChange" @update-zbflzbdata="updateZbflSelectData"/>
                    </el-main>
                  </el-container>
                </div>
                <div style="height: 100%" v-show="leftConfigTab ==='jiandu'">
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">报表分类</div>
                    </el-header>
                    <el-main>
                      <template-tree :syorjb="syorjbParam" :tree-data="bbflTreeData" @node-expand="handleExpNode"
                                     @check-change="selectTree"/>
                    </el-main>
                  </el-container>
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">指标分类</div>
                    </el-header>
                    <el-main>
                      <quota-table :syorjb="syorjbParam" :zbfl-zb-data="zbflSelectData" :loading="quateTableLoading"
                                   @change="zbSelChange" @update-zbflzbdata="updateZbflSelectData"/>
                    </el-main>
                  </el-container>
                </div>
              </el-main>
            </el-container>
          </el-aside>

          <el-container class="center-container" direction="vertical">
<!--            <el-header class="btn-bar" style="height: 45px;">-->
            <!--              <slot name="action">-->
            <!--              </slot>-->
            <!--                          <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">{{$t('fm.actions.import')}}</el-button>-->
            <!--              <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">{{$t('fm.actions.clear')}}</el-button>-->
            <!--              <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">{{$t('fm.actions.json')}}</el-button>-->
            <!--              <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">{{$t('fm.actions.code')}}</el-button>-->
            <!--            </el-header>-->
            <el-main :class="{'widget-empty': widgetForm.list.length === 0}">
              <widget-form v-if="!resetJson" ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"
                           :cell-dom.sync="cellDomBlue" :area-dom.sync="areaDomRed" :ui-select="uiSelect"></widget-form>
            </el-main>
          </el-container>

          <el-aside class="widget-config-container" style="width: 400px;">
            <el-container>
              <el-header height="45px">
                <div class="config-tab" :class="{active: configTab ==='header'}" @click="handleConfigSelect('header')">{{$t('fm.config.header.title')}}</div>
                <div class="config-tab" :class="{active: configTab ==='zhibiao'}"
                     @click="handleConfigSelect('zhibiao')">{{$t('fm.config.zhibiao.title')}}</div>
                <div class="config-tab" :class="{active: configTab ==='widget'}" @click="handleConfigSelect('widget')">{{$t('fm.config.widget.title')}}</div>
                <div class="config-tab" :class="{active: configTab ==='form'}" @click="handleConfigSelect('form')">{{$t('fm.config.form.title')}}</div>
              </el-header>
              <el-main class="config-content">
                <header-config v-show="configTab ==='header'" :data="headerFormSelect"></header-config>
                <zhi-biao-config v-show="configTab ==='zhibiao'" :data="zhiBiaoSelect"
                                 :zbattribute="zbAttribute"></zhi-biao-config>
                <widget-config ref="widgetConfig" v-show="configTab ==='widget'" :data="widgetFormSelect"
                               :currcheck.sync="currentCheck" @show-add-column="addColumn" @show-add-row="addRow"
                               @drag-end="dragend" @remove-column="removeColumn" @remove-row="removeRow"
                               @merge-cell="mergeCell" @update-row-check="updateRowCheck"
                               @show-jz="widgetConShowJz"></widget-config>
                <form-config v-show="configTab ==='form'" :data="widgetForm.config"></form-config>
              </el-main>
            </el-container>

          </el-aside>

          <cus-dialog
            :visible="previewVisible"
            @on-close="previewVisible = false"
            ref="widgetPreview"
            width="1000px"
            form
          >
            <generate-form insite="true" @on-change="handleDataChange" v-if="previewVisible" :data="widgetForm"
                           :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

              <template v-slot:blank="scope">
                Width <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
                Height <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
              </template>
            </generate-form>

            <template slot="action">
              <el-button type="primary" @click="handleTest">{{$t('fm.actions.getData')}}</el-button>
              <el-button @click="handleReset">{{$t('fm.actions.reset')}}</el-button>
            </template>
          </cus-dialog>

          <cus-dialog
            :visible="uploadVisible"
            @on-close="uploadVisible = false"
            @on-submit="handleUploadJson"
            ref="uploadJson"
            width="800px"
            form
          >
            <el-alert type="info" :title="$t('fm.description.uploadJsonInfo')"></el-alert>
            <el-tabs type="border-card" style="box-shadow: none;" v-model="dataActiveName">
              <el-tab-pane label="Template Data" name="template">
                <div id="uploadeditor" style="height: 400px; width: 100%;">{{jsonTemplateEg}}</div>
              </el-tab-pane>
              <el-tab-pane label="Report Data" name="report">
                <div id="reporteditor" style="height: 400px; width: 100%;">{{jsonReportEg}}</div>
              </el-tab-pane>
            </el-tabs>
          </cus-dialog>

          <cus-dialog
            :visible="jsonVisible"
            @on-close="jsonVisible = false"
            ref="jsonPreview"
            width="800px"
            form
          >

            <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

            <template slot="action">
              <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">{{$t('fm.actions.copyData')}}</el-button>
            </template>
          </cus-dialog>

          <cus-dialog
            :visible="codeVisible"
            @on-close="codeVisible = false"
            ref="codePreview"
            width="800px"
            form
            :action="false"
          >
            <!-- <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div> -->
            <el-tabs type="border-card" style="box-shadow: none;" v-model="codeActiveName">
              <el-tab-pane label="Vue Component" name="vue">
                <div id="vuecodeeditor" style="height: 500px; width: 100%;">{{vueTemplate}}</div>
              </el-tab-pane>
              <el-tab-pane label="HTML" name="html">
                <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
              </el-tab-pane>
            </el-tabs>
          </cus-dialog>
        </el-container>
      </el-main>
    </el-container>
  </span>
</template>

<script>
  import HeaderConfig from './HeaderConfig'
  import TableConfig from './TableConfig'
  import WidgetConfig from './WidgetConfig'
  import FormConfig from './FormConfig'
  import WidgetForm from './WidgetForm'
  import CusDialog from './CusDialog'
  import GenerateForm from './GenerateForm'
  import Clipboard from 'clipboard'
  import generateCode from './generateCode.js'
  import TemplateTree from '@/components/TemplateTree';
  import QuotaTable from '@/components/QuotaTable';
  import ZhiBiaoConfig from '@/components/ZhiBiaoConfig';
  import AddColumn from '@/components/AddColumn';
  import TableEditable from '@/components/TableEditable';
  import templateInitialData from '@/components/templateInitialData';
  import templateJson from '../mock/template.json';
  import sheetTempIson from '../mock/sheetTemp.json';
  import reportJson from '../mock/report.json';
  import {getTemplate, postTemplate, deleteTemplate, enableTemplate, publishTemplate} from '@/api/template';
  import {getReport, postReport, getBbfl} from '@/api/report';
  import {getZb, getZbDetal} from '@/api/jsjdQuery';
  import _clonedeep from 'lodash/cloneDeep'

  export default {
    name: 'fm-making-form',
    components: {
      TableEditable,
      AddColumn,
      ZhiBiaoConfig,
      QuotaTable,
      TemplateTree,
      HeaderConfig,
      TableConfig,
      WidgetConfig,
      FormConfig,
      WidgetForm,
      CusDialog,
      GenerateForm
    },
    props: {
      generateCode: {
        type: Boolean,
        default: false
      },
      generateJson: {
        type: Boolean,
        default: false
      },
      upload: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        resetJson: false,
        showAddColumn: false,
        widgetForm: JSON.parse(JSON.stringify(templateInitialData)),
        zhiBiaoSelect: {
          config: {}
        },
        leftConfigTab: 'shiyan',
        configTab: 'header',
        headerFormSelect: null,
        widgetFormSelect: null,
        previewVisible: false,
        jsonVisible: false,
        codeVisible: false,
        uploadVisible: false,
        remoteFuncs: {
          func_test(resolve) {
            setTimeout(() => {
              const options = [
                {id: '1', name: '1111'},
                {id: '2', name: '2222'},
                {id: '3', name: '3333'}
              ]

              resolve(options)
            }, 2000)
          },
          funcGetToken(resolve) {
            request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
              resolve(res.uptoken)
            })
          },
          upload_callback(response, file, fileList) {
            console.log('callback', response, file, fileList)
          }
        },
        widgetModels: {},
        blank: '',
        htmlTemplate: '',
        vueTemplate: '',
        jsonTemplate: '',
        uploadEditor: null,
        reportEditor: null,
        jsonCopyValue: '',
        jsonClipboard: null,
        jsonTemplateEg: templateJson,
        jsonReportEg: reportJson,
        codeActiveName: 'vue',
        dataActiveName: 'template',
        bbflTreeData: [],
        bbflTreeDataForsy: [],
        bbflTreeDataForjb: [],
        zbflSelectData: [],
        syorjbParam: 'sy',  //默认实验报表
        zbAttribute: null,
        selectTreeNode: null,
        cloneDeep: null,
        currentCheck: [],
        cellDomBlue: null,
        areaDomRed: null,
        uiSelect: {
          jz: [],
          sb: [],
        },
        quateTableLoading: false,
      }
    },
    mounted() {
      this.cloneDeep = require('lodash').cloneDeep
      this.query_bbfl();
    },
    methods: {
      transIdLabel(datas) {
        datas.forEach(item => {
          item.id = item.dbid;
          item.label = item.name;
          (item.children) && (item.children = this.transIdLabel(item.children));
        })
        return datas
      },
      setSybbTreeDataForBB(val) {
        this['bbflTreeDataFor' + this.syorjbParam] = val
      },
      setSybbTreeDataForZB(val) {
        this['zbflSelectDataFor' + this.syorjbParam] = val
      },
      query_bbfl() {  // 报表查询 方法
        if (this['bbflTreeDataFor' + this.syorjbParam].length < 1) {
          getBbfl(this.syorjbParam).then(res => {
            if (res.success) {
              const sybbTreeData_ = (this.syorjbParam === 'sy' ? [...res.dataset.datas[0].children] : [...res.dataset.datas])
              this.bbflTreeData = this.transIdLabel(sybbTreeData_)
              this.setSybbTreeDataForBB(this.bbflTreeData)
            }
          }).catch(err => {
            err;
          })
        } else {
          this.bbflTreeData = this['bbflTreeDataFor' + this.syorjbParam]
        }
      },
      query_zb(jtzbfl) {
        this.quateTableLoading = true
        getZb(this.syorjbParam, jtzbfl).then(res => {
          if (res.success) {
            this.zbflSelectData = [...res.dataset.datas]
            this.quateTableLoading = false
          }
        }).catch(err => {
          err;
        })
      },
      handleExpNode(obj, node, dom) {
        // request({
        //   url: '/dev-api/tpridmp/process/dmp_report?method=query',
        //   method: 'get',
        //   params: {
        //     syorjb: this.syorjbParam,
        //     flid: this.syorjbParam
        //   }
        // }).then(res => {}).catch(err => { err; })
      },
      selectTree(isCheck, obj) {
        if (isCheck) {
          this.selectTreeNode = obj
          const {dbid, is_temp} = this.selectTreeNode
          is_temp === '1' && this.queryTemplateData(dbid)
          is_temp === '0' && this.handleClear()
          is_temp === '0' && this.query_zb(dbid)
        } else {
          this.selectTreeNode = null
          this.handleClear()
        }
      },
      zbSelChange(val) {
        if (val.dbid === undefined || val.dbid === null || val.dbid === '') {
          this.zbAttribute = {}
          this.zbAttribute = val
          this.zbAttribute.dbid = ''
        } else {
          getZbDetal(val.dbid).then(res => {
            if (res.success) {
              const zbAttribute_ = res.dataset.datas[0]
              zbAttribute_.zbdw = zbAttribute_.zbuint // 规划字段名 指标单位
              zbAttribute_.zbsjlx = zbAttribute_.datatype // 规划字段名 指标类型
              zbAttribute_.zbsjy = zbAttribute_.attribute1 // 规划字段名 指标数据源
              zbAttribute_.zbshux = zbAttribute_.attribute2 // 规划字段名 指标属性
              zbAttribute_.zbbzz = zbAttribute_.bzvalue // 规划字段名 指标标准值
              zbAttribute_.zbqwz = zbAttribute_.qwvalue // 规划字段名 指标期望值
              zbAttribute_.zbshangx = zbAttribute_.uplimit // 规划字段名 指标上限
              zbAttribute_.zbxx = zbAttribute_.lowlimit // 规划字段名 指标下限
              zbAttribute_.zbgx = val.jsgs
              this.zbAttribute = zbAttribute_
            }
          }).catch(err => {
            err;
          })
        }
      },
      updateZbflSelectData(data) {
        this.setSybbTreeDataForZB(data)
        console.log('updateZbflSelectData : ', this.syorjbParam, this['zbflSelectDataFor' + this.syorjbParam]);
      },
      saveSheetJSON() {
        const {list} = this.widgetForm
        let dataList = []
        const listFunc = (data) => {
          console.log(data)
          for (let item of data) {
            console.log(item)
            if (!item || (item instanceof Array && item.length === 0)) continue

            if (item instanceof Array) {
              item = item[0]
            }
            if (item.type === 'sheet') {
              let data = Object.create(null)
              data['type'] = item.type
              data['model'] = item.rows
              // data['key'] = item.model
              dataList.push(data)
            }
          }
        }

        listFunc(list)
        this.jsonVisible = true
        this.jsonTemplate = dataList
        this.$nextTick(() => {

          const editor = ace.edit('jsoneditor')
          editor.session.setMode("ace/mode/json")

          if (!this.jsonClipboard) {
            this.jsonClipboard = new Clipboard('.json-btn')
            this.jsonClipboard.on('success', (e) => {
              this.$message.success(this.$t('fm.message.copySuccess'))
            })
          }
          this.jsonCopyValue = JSON.stringify(dataList)
        })
      },
      saveReportJSON() {
        const {list} = this.widgetForm

        let dataList = []
        const listFunc = (data) => {
          for (let item of data) {
            if (!item || (item instanceof Array && item.length === 0)) continue

            if (item instanceof Array) {
              item = item[0]
            }
            if (item.type === 'table') {
              console.log(item)
              let data = Object.create(null)
              // data['type'] = item.type
              // data['rows'] = item.rows
              // data['key'] = item.model
              dataList.push(data)
            } else if (item.type === 'grid') {
              const {columns} = item
              if (columns) {
                const gridData = []
                for (const column of columns) {
                  gridData.push(column.list)
                }
                gridData && listFunc(gridData)
              }
            } else {
              let OtherData = Object.create(null)
              OtherData['type'] = item.type
              OtherData['key'] = item.model
              OtherData['value'] = item.options.defaultValue
              OtherData['datasource'] = item.options.datasource
              OtherData['table'] = item.options.table
              OtherData['field'] = item.options.field
              OtherData['otherfields'] = "werks,bukrs,create_by,create_time,update_by,update_time,is_del"
              dataList.push(OtherData)
            }
          }
        }

        listFunc(list)
        this.jsonVisible = true
        this.jsonTemplate = dataList
        this.$nextTick(() => {

          const editor = ace.edit('jsoneditor')
          editor.session.setMode("ace/mode/json")

          if (!this.jsonClipboard) {
            this.jsonClipboard = new Clipboard('.json-btn')
            this.jsonClipboard.on('success', (e) => {
              this.$message.success(this.$t('fm.message.copySuccess'))
            })
          }
          this.jsonCopyValue = JSON.stringify(dataList)
        })
        // postReport(dataList)
      },
      queryReportData() {
        getReport('1013114899288600576', 0, '14').then(({success, fromData}) => {
          if (fromData) {
            const {bukrs, datas, werks, type} = JSON.parse(fromData);
            console.log(bukrs, datas, werks, type)
          }
        })
      },
      queryData() {
        Promise.all([getTemplate('1013114899288600576'), getReport('1013114899288600576', 0, '14')])
          .then(([{success: templateSuccess, dataset}, {success, fromData}]) => {
            // console.log(templateSuccess, dataset, success, fromData)
            const {json} = dataset.datas[0]
            const {bukrs, datas, werks, type} = JSON.parse(fromData);
            console.log(json, datas)
            this.setJSON(JSON.parse(json), datas)
          })
      },
      querySpreadSheetData() {
        const data = this.$refs.widgetForm && this.$refs.widgetForm.querySpreadSheetDataByWidgetForm()
        const tableDataList = []
        for (const dataItem of data) {
          const {cols, rows, merges} = dataItem
          const {len: columnLength} = cols
          const {len: rowLength} = rows
          const datas = []
          for (let i = 0; i < rowLength; i++) {
            if (!rows[i]) continue
            const {cells} = rows[i]
            for (let j = 0; j < columnLength; j++) {
              if (!cells[j]) continue
              const {text} = cells[j]
              let headers = false
              if (i === 0) {
                headers = true
              }
              if (headers) {
                datas.push({
                  rowIndex: i,
                  columnIndex: j,
                  text,
                  headers: true, // 是否是表头
                })
              } else {
                datas.push({
                  rowIndex: i,
                  columnIndex: j,
                  text,
                  headers: false, // 是否是表头
                  zbbm: '', //
                  datasource: '',
                  table: '',
                  field: '',
                })
              }
            }
          }

          tableDataList.push({
            cols: columnLength,
            rows: rowLength,
            datas
          })
        }

        this.jsonVisible = true
        this.jsonTemplate = tableDataList
        this.$nextTick(() => {

          const editor = ace.edit('jsoneditor')
          editor.session.setMode("ace/mode/json")

          if (!this.jsonClipboard) {
            this.jsonClipboard = new Clipboard('.json-btn')
            this.jsonClipboard.on('success', (e) => {
              this.$message.success(this.$t('fm.message.copySuccess'))
            })
          }
          this.jsonCopyValue = JSON.stringify(tableDataList)
        })
      },
      loadSpreadSheetData(data) {
        this.$refs.widgetForm && this.$refs.widgetForm.loadSpreadSheetDataByWidgetForm(data)
      },
      createTemplate() {
        if (!this.selectTreeNode) {
          this.$alert('未选中报表分类', '提示')
          return
        }
        const {dbid, is_temp} = this.selectTreeNode
        if (is_temp !== '0') { // 分类节点
          this.$alert('选中的报表分类非分类节点', '提示')
          return
        }
        this.saveTemplateJSON('', dbid)
      },
      saveTemplate() {
        if (!this.selectTreeNode) {
          this.$alert('未选中报表分类', '提示')
          return
        }
        const {dbid, is_temp, parentid} = this.selectTreeNode
        if (is_temp !== '1') { // 分类节点
          this.$alert('选中的报表分类非模板节点', '提示')
          return
        }
        this.saveTemplateJSON(dbid, parentid)
      },
      deleteTemplate() {
        if (!this.selectTreeNode) {
          this.$alert('未选中报表分类', '提示')
          return
        }
        const {dbid, is_temp} = this.selectTreeNode
        if (is_temp !== '1') { // 分类节点
          this.$alert('选中的报表分类非模板节点', '提示')
          return
        }
        deleteTemplate(dbid).then(result => {
          if (result.success) {
            this.$alert('删除成功', '提示')
          }
        })
      },
      copyTemplate() {
        // todo
      },
      saveTemplateJSON(dbid, flid) {
        const {list, config: {werks, bukrs, templateName, templateCode, templateGrade}} = this.widgetForm
        if (!werks) {
          this.$alert('工厂编码不允许为空', '提示')
          return
        }

        if (!bukrs) {
          this.$alert('公司编码不允许为空', '提示')
          return
        }

        if (!templateName) {
          this.$alert('模板名称不允许为空', '提示')
          return
        }

        if (!templateCode) {
          this.$alert('模板编码不允许为空', '提示')
          return
        }

        if (!templateGrade) {
          this.$alert('模板级别不允许为空', '提示')
          return
        }
        let tables = []
        const listFunc = (data) => {
          for (let item of data) {
            if (!item || (item instanceof Array && item.length === 0)) continue

            if (item instanceof Array) {
              item = item[0]
            }
            if (item.type === 'table') {
              let tableData = Object.create(null)
              tableData['type'] = item.type
              tableData['key'] = item.model
              tableData['datasource'] = item.options.datasource
              tableData['table'] = item.options.table
              tableData['dataTransformRules'] = item.options.dataTransformRules
              // tableData['field'] = item.options.field
              tables.push(tableData)
            } else if (item.type === 'grid') {
              const {columns} = item
              if (columns) {
                const gridData = []
                for (const column of columns) {
                  gridData.push(column.list)
                }
                gridData && listFunc(gridData)
              }
            } else if (item.type === 'sheet') {
              const data = this.$refs.widgetForm && this.$refs.widgetForm.querySpreadSheetDataByWidgetForm()
              const ss = _clonedeep(item.options)
              let sheetData = Object.create(null)
              if (ss.length > 0) {
                const rowsarrys = ss[0].rows
                const rightsmenus = ss[0].rightMenus
                const datas_ = []
                for (const x in rowsarrys) {
                  const cells = rowsarrys[x].cells
                  const rowsColumns = {}
                  for (const k in cells) {
                    for (const m in rightsmenus) {
                      if (Number(x) === Number(rightsmenus[m].ri) && Number(k) === Number(rightsmenus[m].ci)) {
                        rowsColumns["rowIndex"] = Number(x)
                        rowsColumns["columnIndex"] = Number(k)
                        if (cells[Number(k)].type === "list") {
                          rowsColumns["text"] = cells[Number(k)].value
                        } else {
                          rowsColumns["text"] = cells[Number(k)].text
                        }
                        rowsColumns["headers"] = rightsmenus[m].headers
                        if (rightsmenus[m].headers === "false") {
                          rowsColumns["datasource"] = rightsmenus[m].datasource
                          rowsColumns["table"] = rightsmenus[m].table
                          rowsColumns["zbbm"] = rightsmenus[m].zbbm
                          rowsColumns["field"] = rightsmenus[m].field
                        }
                        // if(!rightsmenus[m].headers){
                        //   rowsColumns["datasource"] = "TPRI_VUE"
                        //   rowsColumns["table"] = "TPRI_DMP_REPORT_DATA_TEST"
                        //   rowsColumns["zbbm"] = "12"
                        //   rowsColumns["field"] = "value"
                        // }
                        datas_.push(rowsColumns)
                      }
                    }
                  }
                }
                sheetData['type'] = item.type
                sheetData['key'] = item.model
                sheetData['model'] = "model2"
                sheetData['cols'] = ss[0].cols.len
                sheetData['rows'] = ss[0].rows.len
                sheetData['datas'] = datas_
                // data['dataTransformRules'] = item.options.dataTransformRules
                sheetData['defaultFields'] = 'werks,bukrs,create_by,create_time,update_by,update_time,is_del'
                tables.push(sheetData)
              }
              // sheetData['datasource'] = ss.datasource
              // sheetData['table'] = ss.table
              // sheetData['field'] = ss.field
              item.options = data
              if (item.options.length > 0) {
                item.options[0]['type'] = ss.type
                item.options[0]['key'] = ss.model
                item.options[0]['datasource'] = ss.datasource
                item.options[0]['table'] = ss.table
              }
            } else {
              let OtherData = Object.create(null)
              OtherData['type'] = item.type
              OtherData['key'] = item.model
              OtherData['datasource'] = item.options.datasource
              OtherData['table'] = item.options.table
              OtherData['field'] = item.options.field
              tables.push(OtherData)
            }
          }
        }
        listFunc(list)
        postTemplate(dbid, werks, bukrs, templateName, templateCode, this.widgetForm, templateGrade, flid, tables)
          .then(result => {
            if (result.success) {
              this.query_bbfl()
              this.$alert('操作成功', '提示')
            }
          })
      },
      queryTemplateData(dbid) {
        getTemplate(dbid).then(result => {
          const {json} = result.dataset.datas[0]
          const sheetOptions = []
          const {list} = json
          this.setJSON(JSON.parse(json), null)
          this.$nextTick(() => {
            console.log(JSON.parse(json).list)
            for (let item of JSON.parse(json).list) {
              if (item.type === "sheet") {
                if (item.options.length > 0) {
                  const optionsJson = item.options[0]
                  console.log(optionsJson)
                  this.loadSpreadSheetData(optionsJson)
                }
              }
            }

          })
        })
      },
      handlePreview() {
        const {list} = this.widgetForm
        this.previewVisible = true
        const listFunc = (data) => {
          for (let item of data) {
            if (!item || (item instanceof Array && item.length === 0)) continue

            if (item instanceof Array) {
              item = item[0]
            }
            if (item.type === 'sheet') {
              const data = this.$refs.widgetForm && this.$refs.widgetForm.querySpreadSheetDataByWidgetForm()
              const ss = this.cloneDeep(item.options)
              item.options = data
              if (item.options.length > 0) {
                item.options[0]['type'] = ss.type
                item.options[0]['key'] = ss.model
                item.options[0]['datasource'] = ss.datasource
                item.options[0]['table'] = ss.table
              }
              // OtherData['field'] = item.options.field
            }
          }
        }
        return listFunc(list)
      },
      publish() {
        // todo
        if (!this.selectTreeNode) {
          this.$alert('未选中报表分类', '提示')
          return
        }
        const {dbid, is_temp, json, version} = this.selectTreeNode
        if (is_temp !== '1') { // 分类节点
          this.$alert('选中的报表分类非模板节点', '提示')
          return
        }

        publishTemplate(dbid, null, json, version).then(result => {
          if (result.success) {
            this.$alert('启用成功', '提示')
          }
        })
      },
      enable() {
        if (!this.selectTreeNode) {
          this.$alert('未选中报表分类', '提示')
          return
        }
        const {dbid, is_temp} = this.selectTreeNode
        if (is_temp !== '1') { // 分类节点
          this.$alert('选中的报表分类非模板节点', '提示')
          return
        }
        enableTemplate(dbid).then(result => {
          if (result.success) {
            this.$alert('启用成功', '提示')
          }
        })
      },
      updateWidgetFormTable() {
        this.$nextTick(() => {
          (this.$refs.widgetForm) && (this.$refs.widgetForm.changeTag())
        })
      },
      getIndex(columns, label) {
        let index = -1
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].label === label) {
            index = i
          }
        }
        return index
      },
      getLastIndex(columns, label) { // 获取列数组中 特定-label的最后一个子节点下标
        let index = this.getIndex(columns, label)
        for (let i = this.getIndex(columns, label) + 1; i < columns.length; i++) {
          if (columns[i].parent && columns[i].parent === label) {
            index = i
          }
        }
        return index
      },
      columnHasChildren(columns, label) { // 列数组中 特定-label 是否有孩子节点
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].label === label) {
            return !!(columns[i].children)
          } else if (columns[i].children) {
            return this.columnHasChildren(columns[i].children, label)
          }
        }
      },
      structColumnsAddColumn(columns, label, column) { // 组织带结构的 '列'对象
        columns.forEach(item => {
          if (item.label === label) {
            if (!item.children) {
              item.children = []
            }
            item.children.push(column)
          } else if (item.children) {
            item.children = this.structColumnsAddColumn(item.children, label, column)
          }
        })
        return columns
      },
      getChildrenNodeArra(columns, labelArr) { // 找特定-[label]的所有子元素,返回一个[子元素label]的合集 (广度优先)
        let result = []
        if (labelArr.length > 0) {
          columns.forEach(item => {
            if (labelArr.indexOf(item.parent) !== -1) {
              result.push(item.label)
            }
          })
          result.push(...this.getChildrenNodeArra(columns, result))
        }
        return result
      },
      removeTheLabelColumn(columns, label) { //非递归遍历 会破坏structColumns对象的结构 (弃用)
        if (!columns) {
          return;
        }
        var stack = [];
        stack.push(...columns);
        var tmpNode;
        while (stack.length > 0) {
          tmpNode = stack.pop();
          console.log('tmpNode : ', tmpNode);
          if (tmpNode.label === label) {
          }
          if (tmpNode.children && tmpNode.children.length > 0) {
            var i = tmpNode.children.length - 1;
            for (i = tmpNode.children.length - 1; i >= 0; i--) {
              stack.push(tmpNode.children[i]);
            }
          }
        }
      },
      updateWidgetFormRowColumn(tag, param) { // 将 widgetFormSelect 中的数据 处理(删除非叶子节点)后 同步到 widgetForm 中,并根据tag做不同处理
        this.widgetForm.list.forEach(item => {
          if (item.key === this.widgetFormSelect.key) {
            const columns_ = this.cloneDeep(this.widgetFormSelect.columns)
            // const rows_ = this.cloneDeep(this.widgetFormSelect.rows)
            if (tag === 'add-column') { // 新增行逻辑 : param => 新增 column
              if (this.currentCheck.length === 0) {
                if (!item.structColumns) {
                  item.structColumns = []
                }
                item.structColumns.push(param)
              } else if (this.currentCheck.length === 1) {
                item.structColumns = this.structColumnsAddColumn(item.structColumns, this.currentCheck[0], param)
              }
            }
            if (tag === 'remove-column' && item.structColumns.length > 0) { // 删除行逻辑 : param => 删除 label
              const temp = [item.structColumns]
              let i = 0
              // 非递归的遍历 不破坏structColumns结构
              let isBreak = false
              while (i >= 0) {
                let j = 0
                for (j; j < temp[i].length; j++) {
                  if (!isBreak && temp[i][j].label === param) {
                    temp[i].splice(j, 1)
                    isBreak = true
                    break
                  } else if (!isBreak && temp[i][j].children) {
                    temp.push(temp[i][j].children)
                  }
                }
                if (isBreak) {
                  break
                }
                if (!temp[i++]) {
                  new Error('删除列出现错误,请重新创建table;如多次创建无效请联系管理员')
                  break
                }
              }
            }
            if (tag === 'drage-column') {
              // todo : 实现表头的拖动变化
            }
            if (tag === 'merge-cell') { // 合并单元格操作
              // mergeRule = { startRow: 2, startColumn: 2, endRow: 3, endColumn: 3, mergeFunction: (self)=>{} }
              const mergeFunction_ = function ({row, column, rowIndex, columnIndex}, mergeRule) {
                let rowArea = []
                let columnArea = []
                if (mergeRule.startRow < mergeRule.endRow) {
                  for (let i = mergeRule.startRow; i <= mergeRule.endRow; i++) {
                    rowArea.push(i)
                  }
                } else if (mergeRule.startRow === mergeRule.endRow) {
                  rowArea.push(mergeRule.startRow)
                } else {
                  for (let i = mergeRule.endRow; i <= mergeRule.startRow; i++) {
                    rowArea.push(i)
                  }
                }
                if (mergeRule.startColumn < mergeRule.endColumn) {
                  for (let i = mergeRule.startColumn; i <= mergeRule.endColumn; i++) {
                    columnArea.push(i)
                  }
                } else if (mergeRule.startColumn === mergeRule.endColumn) {
                  columnArea.push(mergeRule.startColumn)
                } else {
                  for (let i = mergeRule.endColumn; i <= mergeRule.startColumn; i++) {
                    columnArea.push(i)
                  }
                }
                if (rowArea.indexOf(rowIndex) === 0 && columnArea.indexOf(columnIndex) === 0) {
                  return [columnArea.length, rowArea.length]
                } else if (rowArea.indexOf(rowIndex) !== -1 && columnArea.indexOf(columnIndex) !== -1) {
                  return [0, 0]
                }
              }
              this.widgetFormSelect.mergeRule[param].mergeFunction = mergeFunction_
            }
            for (let i = 0; i < columns_.length; i++) {
              if (this.columnHasChildren(item.structColumns, columns_[i].label)) {
                columns_.splice(i, 1)
                i--
              }
            }
            item.configColumns = this.cloneDeep(this.widgetFormSelect.columns)
            item.columns = columns_
            item.rows = this.widgetFormSelect.rows
            item.mergeRule = this.widgetFormSelect.mergeRule
          }
        })
      },
      addColumn() {
        this.showAddColumn = true
      },
      submitColumnInfo(label, prop, width) {
        console.log(this.widgetFormSelect)
        const label_ = label
        const prop_ = prop
        const width_ = width
        if (this.currentCheck.length === 0) {
          this.widgetFormSelect.columns.push({prop, label, width})
        } else if (this.currentCheck.length === 1) {
          this.widgetFormSelect.columns.splice(this.getLastIndex(this.widgetFormSelect.columns, this.currentCheck[0]) + 1, 0, {
            prop,
            label,
            width,
            parent: this.currentCheck[0]
          })
        }
        this.updateWidgetFormRowColumn('add-column', {prop, label, width})
        this.showAddColumn = false
        this.updateWidgetFormTable()
      },
      removeColumn(label, index) {
        this.widgetFormSelect.columns.splice(index, 1)
        const aimArr = this.getChildrenNodeArra(this.widgetFormSelect.columns, [label])
        for (let i = this.widgetFormSelect.columns.length - 1; i >= 0; i--) {
          if (aimArr.indexOf(this.widgetFormSelect.columns[i].label) !== -1) {
            this.widgetFormSelect.columns.splice(i, 1)
          }
        }
        this.updateWidgetFormRowColumn('remove-column', label)
        this.updateWidgetFormTable()
      },
      addRow() {
        if (this.widgetFormSelect.columns.length > 0) {
          this.widgetFormSelect.rows.push({isColumnHeader: false})
          this.updateWidgetFormRowColumn('add-row')
        }
      },
      removeRow() {
        this.updateWidgetFormRowColumn('remove-row')
      },
      dragend() {
        this.updateWidgetFormRowColumn('drage-column')
        this.updateWidgetFormTable()
      },
      mergeCell(label) {
        this.updateWidgetFormRowColumn('merge-cell', label.substring(label.length - 1))
        this.widgetFormSelect.mergeRule.push({})
      },
      updateRowCheck(checkArr) {
        console.log('checkArr : ', checkArr);
        for (let i in this.widgetFormSelect.rows) {
          console.log('i : ', i, ' | result : ', checkArr.indexOf(i))
          if (checkArr.indexOf(i) >= 0) {
            this.widgetFormSelect.rows[i].isColumnHeader = true
          } else {
            this.widgetFormSelect.rows[i].isColumnHeader = false
          }
        }
        this.widgetForm.list.forEach(item => {
          if (item.key === this.widgetFormSelect.key) {
            item.rows = this.widgetFormSelect.rows
          }
        })
      },
      widgetConShowJz() { // 点击 '字段属性'—'显示机组' 按钮
        // console.log('cellDomBlue : ', this.cellDomBlue)
        // console.log('areaDomRed : ', this.areaDomRed)
        // console.log('widgetForm : ', this.widgetForm)
        // console.log('widgetFormSelect : ', this.widgetFormSelect)
        this.uiSelect.jz.push({rowIndex: this.cellDomBlue.row.rowIndex, prop: this.cellDomBlue.column.property})
      },
      handleGoGithub() {
        window.location.href = 'https://github.com/upcwangying/vue-form-making'
      },
      handleLeftConfigSelect(value) {
        this.leftConfigTab = value
        this.syorjbParam = (value === 'shiyan') ? 'sy' : 'jb' // 设置查询参数 syorjb - 实验or监督
        this.query_bbfl() // 做查询
      },
      handleConfigSelect(value) {
        this.configTab = value
      },
      handleTest() {
        this.$refs.generateForm.getData().then(result => {
          const {list} = this.widgetForm

          let dataList = []
          const listFunc = (data) => {
            for (let item of data) {
              if (!item || (item instanceof Array && item.length === 0)) continue

              if (item instanceof Array) {
                item = item[0]
              }

              if (item.type === 'table') {
                let data = Object.create(null)
                data['type'] = item.type
                const originRows = JSON.parse(JSON.stringify(item.rows))
                for (const originRowsIndex in originRows) {
                  if (originRows[originRowsIndex]['isColumnHeader']) {
                    delete originRows[originRowsIndex];
                  }
                }
                data['rows'] = originRows.filter(obj => !!obj)
                data['key'] = item.model
                data['datasource'] = item.options.datasource
                data['table'] = item.options.table
                data['dataTransformRules'] = item.options.dataTransformRules
                data['otherfields'] = "werks,bukrs,create_by,create_time,update_by,update_time,is_del"
                dataList.push(data)
              } else if (item.type === 'grid') {
                const {columns} = item
                if (columns) {
                  const gridData = []
                  for (const column of columns) {
                    gridData.push(column.list)
                  }
                  gridData && listFunc(gridData)
                }
              } else if (item.type === 'sheet') {
                const data = this.$refs.widgetForm && this.$refs.widgetForm.querySpreadSheetDataByWidgetForm()
                const ss = _clonedeep(item.options)
                let sheetData = Object.create(null)
                sheetData['type'] = item.type
                sheetData['key'] = item.model
                sheetData['datasource'] = ss.datasource
                sheetData['table'] = ss.table
                // OtherData['field'] = item.options.field
                item.options = data
                if (item.options.length > 0) {
                  item.options[0]['type'] = ss.type
                  item.options[0]['key'] = ss.model
                  item.options[0]['datasource'] = ss.datasource
                  item.options[0]['table'] = ss.table
                  dataList.push(sheetData)
                }
              } else {
                let OtherData = Object.create(null)
                OtherData['type'] = item.type
                OtherData['key'] = item.model
                OtherData['value'] = item.options.defaultValue
                OtherData['datasource'] = item.options.datasource
                OtherData['table'] = item.options.table
                OtherData['field'] = item.options.field
                OtherData['otherfields'] = "werks,bukrs,create_by,create_time,update_by,update_time,is_del"
                dataList.push(OtherData)
              }
            }
          }

          listFunc(list)
          for (const listElement of dataList) {
            if (Object.keys(result).includes(listElement['key'])) {
              if (listElement['type'] === 'table') {
                listElement['rows'] = result[listElement['key']]
              } else {
                listElement['value'] = result[listElement['key']]
              }
            }
          }
          this.$alert(dataList, '').catch(e => {
          })
          this.$refs.widgetPreview.end()
        }).catch(e => {
          this.$refs.widgetPreview.end()
        })
      },
      handleReset() {
        this.$refs.generateForm.reset()
      },
      handleGenerateJson() {
        this.jsonVisible = true
        this.jsonTemplate = this.widgetForm
        // console.log(JSON.stringify(this.widgetForm))
        this.$nextTick(() => {

          const editor = ace.edit('jsoneditor')
          editor.session.setMode("ace/mode/json")

          if (!this.jsonClipboard) {
            this.jsonClipboard = new Clipboard('.json-btn')
            this.jsonClipboard.on('success', (e) => {
              this.$message.success(this.$t('fm.message.copySuccess'))
            })
          }
          this.jsonCopyValue = JSON.stringify(this.widgetForm)
        })
        // post(this.widgetForm)
      },
      handleGenerateCode() {
        this.codeVisible = true
        this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html')
        this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue')
        this.$nextTick(() => {
          const editor = ace.edit('codeeditor')
          editor.session.setMode("ace/mode/html")

          const vueeditor = ace.edit('vuecodeeditor')
          vueeditor.session.setMode("ace/mode/html")
        })
      },
      handleUpload() {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.uploadEditor = ace.edit('uploadeditor')
          this.reportEditor = ace.edit('reporteditor')
          this.uploadEditor.session.setMode("ace/mode/json")
          this.reportEditor.session.setMode("ace/mode/json")
        })
      },
      handleUploadJson() {
        try {
          this.setJSON(JSON.parse(this.uploadEditor.getValue()), JSON.parse(this.reportEditor.getValue()))
          this.uploadVisible = false
        } catch (e) {
          this.$message.error(e.message)
          this.$refs.uploadJson.end()
        }
      },
      handleClear() {
        this.widgetForm = JSON.parse(JSON.stringify(templateInitialData))

        this.widgetFormSelect = {}
      },
      clear() {
        this.handleClear()
      },
      getJSON() {
        return this.widgetForm
      },
      getHtml() {
        return generateCode(JSON.stringify(this.widgetForm))
      },
      setJSON(templateJson, reportJson) {
        const {list} = templateJson
        if (list) {
          for (const listElement of list) {
            const {type, model} = listElement
            if (type !== 'table') {
              if (reportJson) {
                for (const reportJsonElement of reportJson) {
                  if (reportJsonElement.type === type && reportJsonElement.key === model) {
                    listElement.options.defaultValue = reportJsonElement.value
                    listElement.options.datasource = reportJsonElement.datasource
                    listElement.options.table = reportJsonElement.table
                    listElement.options.field = reportJsonElement.field
                  }
                }
              }
            } else if (type === 'table') {
              // todo
            }
          }
        }

        this.widgetForm = templateJson

        if (templateJson.list.length > 0) {
          this.widgetFormSelect = templateJson.list[0]
        }
      },
      handleInput(val) {
        this.blank = val
      },
      handleDataChange(field, value, data) {
        // console.log(field, value, data)
        if (data && field !== '') {
          data[field] = value
        }
        this.widgetModels = data
      },
    },
    watch: {
      widgetForm: {
        deep: true,
        handler: function (val) {
          console.log(this.$refs.widgetForm)
        }
      },
      '$lang': function (val) {
        this._loadComponents()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-container {
    display: flex;
    justify-content: flex-end;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .add-column-mask-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
