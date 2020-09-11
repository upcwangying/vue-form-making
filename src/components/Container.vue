<template>
  <span class="fm-style">
    <el-container class="fm2-container">
      <div class="add-column-mask-container" v-if="showAddColumn"></div>
      <el-header height="45">
        <el-row class="btn-container">
          <el-button @click="saveTemplateJSON">保存模板数据</el-button>
          <el-button @click="queryTemplateData">获取模板数据</el-button>
          <el-button @click="saveReportJSON">保存报表数据</el-button>
          <el-button @click="queryReportData">获取报表数据</el-button>
          <el-button>创建报表</el-button>
<!--          <el-button>创建自由列表</el-button>-->
<!--          <el-button>创建行式列表</el-button>-->
          <el-button>删除</el-button>
          <el-button>参考创建</el-button>
          <el-button @click="handlePreview">预览</el-button>
          <el-button>发布</el-button>
          <el-button>启用</el-button>
        </el-row>
      </el-header>
      <el-main class="fm2-main">
        <add-column class="add-column-container" v-if="showAddColumn" @submit="submitColumnInfo" @cancel="showAddColumn = false" />
        <el-container>
          <el-aside class="widget-config-container">
            <el-container>
              <el-header height="45px">
                <div class="config-tab left" :class="{active: leftConfigTab ==='shiyan'}" @click="handleLeftConfigSelect('shiyan')">{{$t('fm.left.shiyan.title')}}</div>
                <div class="config-tab left" :class="{active: leftConfigTab ==='jiandu'}" @click="handleLeftConfigSelect('jiandu')">{{$t('fm.left.jiandu.title')}}</div>
              </el-header>
              <el-main class="config-content">
                <div style="height: 100%" v-show="leftConfigTab ==='shiyan'">
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">报表分类</div>
                    </el-header>
                    <el-main>
                      <template-tree :syorjb="syorjbParam" :tree-data="bbflTreeData" @node-expand="handleExpNode" />
                    </el-main>
                  </el-container>
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">指标分类</div>
                    </el-header>
                    <el-main>
                      <quota-table :syorjb="syorjbParam" :zbfl-zb-data="zbflSelectData" @change="zbSelChange" />
                    </el-main>
                  </el-container>
                </div>
                <div style="height: 100%" v-show="leftConfigTab ==='jiandu'">
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">报表分类</div>
                    </el-header>
                    <el-main>
                      <template-tree :syorjb="syorjbParam" :tree-data="bbflTreeData" @node-expand="handleExpNode" />
                    </el-main>
                  </el-container>
                  <el-container style="height: 50% !important;">
                    <el-header height="40px">
                      <div class="config-tab all middle">指标分类</div>
                    </el-header>
                    <el-main>
                      <!--<jian-du-index-classify :syorjb="syorjbParam" :zbfl-zb-data="zbflSelectData" @change="zbSelChange" />-->
                      <quota-table :syorjb="syorjbParam" :zbfl-zb-data="zbflSelectData" @change="zbSelChange" />
                    </el-main>
                  </el-container>
                </div>
              </el-main>
            </el-container>
          </el-aside>
          <el-container class="center-container" direction="vertical">
            <el-header class="btn-bar" style="height: 45px;">
              <slot name="action">
              </slot>
              <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">{{$t('fm.actions.import')}}</el-button>
              <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">{{$t('fm.actions.clear')}}</el-button>
              <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">{{$t('fm.actions.json')}}</el-button>
              <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">{{$t('fm.actions.code')}}</el-button>
            </el-header>
            <el-main :class="{'widget-empty': widgetForm.list.length === 0}">

              <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
            </el-main>
          </el-container>

          <el-aside class="widget-config-container" style="width: 400px;">
            <el-container>
              <el-header height="45px">
                <div class="config-tab" :class="{active: configTab ==='header'}" @click="handleConfigSelect('header')">{{$t('fm.config.header.title')}}</div>
<!--                <div class="config-tab" :class="{active: configTab ==='table'}" @click="handleConfigSelect('table')">{{$t('fm.config.table.title')}}</div>-->
                <div class="config-tab" :class="{active: configTab ==='zhibiao'}" @click="handleConfigSelect('zhibiao')">{{$t('fm.config.zhibiao.title')}}</div>
                <div class="config-tab" :class="{active: configTab ==='widget'}" @click="handleConfigSelect('widget')">{{$t('fm.config.widget.title')}}</div>
                <div class="config-tab" :class="{active: configTab ==='form'}" @click="handleConfigSelect('form')">{{$t('fm.config.form.title')}}</div>
              </el-header>
              <el-main class="config-content">
                <header-config v-show="configTab ==='header'" :data="headerFormSelect"></header-config>
<!--                <table-config v-show="configTab ==='table'" :data="tableSelect"></table-config>-->
                <zhi-biao-config v-show="configTab ==='zhibiao'" :data="zhiBiaoSelect" :zbattribute="zbAttribute" ></zhi-biao-config>
                <widget-config ref="widgetConfig" v-show="configTab ==='widget'" :data="widgetFormSelect" @showAddColumn="addColumn" @showAddRow="addRow" @draggableend="dragend"></widget-config>
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
            <generate-form insite="true" @on-change="handleDataChange" v-if="previewVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

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
import request from '../util/request.js'
import generateCode from './generateCode.js'
import TemplateTree from '@/components/TemplateTree';
import QuotaTable from '@/components/QuotaTable';
import JianDuReportClassify from '@/components/JianDuReportClassify';
import JianDuIndexClassify from '@/components/JianDuIndexClassify';
import ZhiBiaoConfig from '@/components/ZhiBiaoConfig';
import AddColumn from '@/components/AddColumn';
import TableEditable from '@/components/TableEditable';
import templateInitialData from '@/components/templateInitialData';
import templateJson from '../mock/template.json';
import reportJson from '../mock/report.json';
import { get, post } from '@/api/template';
import { getReport, postReport } from '@/api/report';

export default {
  name: 'fm-making-form',
  components: {
    TableEditable,
    AddColumn,
    ZhiBiaoConfig,
    JianDuIndexClassify,
    JianDuReportClassify,
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
  data () {
    return {
      resetJson: false,
      showAddColumn:false,
      widgetForm: JSON.parse(JSON.stringify(templateInitialData)),
      tableSelect: {
        config: {}
      },
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
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
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
      zbflSelectDataForsy: [],
      zbflSelectDataForjb: [],
      syorjbParam: 'sy',  //默认实验报表
      zbAttribute: null,
    }
  },
  mounted() {
    this.query_bbfl();
    this.query_zb();
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
        request({
          url: '/dev-api/tpridmp/process/dmp_report?method=query_fl',
          method: 'get',
          params: {
            syorjb: this.syorjbParam
          }
        }).then(res => {
          if (res.success) {
            const sybbTreeData_ = [ ...res.dataset.datas[0].children ]
            this.bbflTreeData = this.transIdLabel(sybbTreeData_)
            this.setSybbTreeDataForBB(this.bbflTreeData)
          }
        }).catch(err => { err; })
      } else {
        this.bbflTreeData = this['bbflTreeDataFor' + this.syorjbParam]
      }
    },
    query_zb() {
      if (this['zbflSelectDataFor' + this.syorjbParam].length < 1) {
        request({
          url: '/dev-api/jsjd/process/aqsc_jsjd_sybg_zb?method=query',
          method: 'get',
          params: {
            syorjb: this.syorjbParam
          }
        }).then(res => {
          if (res.success) {
            this.zbflSelectData = [ ...res.dataset.datas ]
            this.setSybbTreeDataForZB(this.zbflSelectData)
          }
        }).catch(err => { err; })
      } else {
        this.zbflSelectData = this['zbflSelectDataFor' + this.syorjbParam]
      }
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
    zbSelChange(val) {
      this.zbAttribute = val;
      console.log('zbSelChange : ', val);
    },
    saveReportJSON() {
      const { list } = this.widgetForm

      let dataList = []
      const listFunc = (data) => {
        for (const item of list) {
          if (item.type === 'table') {
            let data = Object.create(null)
            data['type'] = item.type
            data['rows'] = item.rows
            data['key'] = item.model
            dataList.push(data)
          } else if (item.type === 'grid') {
            const { columns } = item
            if (columns) {
              const gridData = []
              for (const column of columns) {
                gridData.push(column.list)
              }
              console.log(gridData)
              // gridData && listFunc(gridData)
            }
          } else {
            let data = Object.create(null)
            data['type'] = item.type
            data['key'] = item.model
            data['value'] = item.options.defaultValue
            data['datasource'] = item.options.datasource
            data['table'] = item.options.table
            data['field'] = item.options.field
            data['otherfields'] = "werks,bukrs,create_by,create_time,update_by,update_time,is_del"
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
      // console.log(this.widgetForm.config)
      postReport(dataList)
    },
    queryReportData() {

    },
    saveTemplateJSON() {
      post(this.widgetForm)
    },
    queryTemplateData() {
      get('code4').then(result => {
        const { json } = result.dataset.datas[0]
        this.setJSON(JSON.parse(json), null)
      })
    },
    handlePreview() {
      this.previewVisible = true
    },
    addColumn() {
      this.showAddColumn = true
    },
    addRow() {
        if (this.widgetFormSelect.columns.length > 0) {
            const props = []
            this.widgetFormSelect.columns.forEach(item => {
                props.push(item.prop)
            })
            this.$refs['widgetConfig'].saveTableRow(props)
        }
    },
    dragend() {
      this.$nextTick(() => {
        (this.$refs.widgetForm) && (this.$refs.widgetForm.changeTag())
      })
    },
    submitColumnInfo(label, prop, width) {
      this.$refs['widgetConfig'].saveTableHeaderColumn(label, prop, width)
      this.showAddColumn = false
    },
    handleGoGithub () {
      window.location.href = 'https://github.com/upcwangying/vue-form-making'
    },
    handleLeftConfigSelect (value) {
      this.leftConfigTab = value
      this.syorjbParam = ( value === 'shiyan') ? 'sy' : 'jb' // 设置查询参数 syorjb - 实验or监督
      this.query_bbfl() // 做查询
      this.query_zb();
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset () {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson () {
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
    handleGenerateCode () {

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
    handleUpload () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.reportEditor = ace.edit('reporteditor')
        this.uploadEditor.session.setMode("ace/mode/json")
        this.reportEditor.session.setMode("ace/mode/json")
      })
    },
    handleUploadJson () {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()), JSON.parse(this.reportEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear () {
      this.widgetForm = JSON.parse(JSON.stringify(templateInitialData))

      this.widgetFormSelect = {}
    },
    clear () {
      this.handleClear()
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON (templateJson, reportJson) {
      const { list } = templateJson
      if (list) {
        for (const listElement of list) {
          const { type, model } = listElement
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
    handleInput (val) {
      this.blank = val
    },
    handleDataChange (field, value, data) {
      console.log(field, value, data)
    }
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
