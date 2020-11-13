<template>
  <el-form-item class="widget-view"
                v-if="element && element.key"
                :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
                :label="element.type === 'table' || element.type === 'sheet' ? '' : element.name"
                :label-width="element.type === 'table' ? '0px' : 'auto'"
                @click.native.stop="handleSelectWidget(index)"
  >

    <template v-if="element.type === 'databook'">
      <data-book-select
        v-model="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        :groupcode="element.options.groupcode"
        value-field="datacode"
        :style="{width: element.options.width}" />
    </template>

    <template v-if="element.type === 'staff'">
      <staff-component
        :style="{width: element.options.width}" />
    </template>

    <template v-if="element.type === 'jizu'">
      <jizu-component
        :style="{width: element.options.width}" />
    </template>

    <template v-if="element.type === 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      ></el-input>
    </template>

    <template v-if="element.type === 'textarea'">
      <el-input type="textarea" :rows="5"
                v-model="element.options.defaultValue"
                :style="{width: element.options.width}"
                :disabled="element.options.disabled"
                :placeholder="element.options.placeholder"
      ></el-input>
    </template>

    <template v-if="element.type === 'number'">
      <el-input-number
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{width: element.options.width}"
      ></el-input-number>
    </template>

    <template v-if="element.type === 'radio'">
      <el-radio-group v-model="element.options.defaultValue"
                      :style="{width: element.options.width}"
                      :disabled="element.options.disabled"
      >
        <el-radio
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"

        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue"
                         :style="{width: element.options.width}"
                         :disabled="element.options.disabled"
      >
        <el-checkbox
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <el-time-picker
        v-model="element.options.defaultValue"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrowControl="element.options.arrowControl"
        :style="{width: element.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="element.type === 'date'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="element.type === 'month'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :value-format="element.options.format"
        :format="element.options.format"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="element.type === 'quarter'">
      <data-book-select
        v-model="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        groupcode="AQSC_JSJD_SUB_QUARTER"
        value-field="datacode"
        :style="{width: element.options.width}" />
    </template>

    <template v-if="element.type === 'year'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="element.type === 'rate'">
      <el-rate v-model="element.options.defaultValue"
               :max="element.options.max"
               :disabled="element.options.disabled"
               :allow-half="element.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="element.type === 'color'">
      <el-color-picker
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="element.type === 'select'">
      <el-select
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
      >
        <el-option v-for="item in element.options.options" :key="item.value" :value="item.value"
                   :label="element.options.showLabel?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="element.type ==='switch'">
      <el-switch
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="element.type ==='slider'">
      <el-slider
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{width: element.options.width}"
      ></el-slider>
    </template>

    <template v-if="element.type ==='imgupload'">
      <fm-upload
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :style="{'width': element.options.width}"
        :width="element.options.size.width"
        :height="element.options.size.height"
        token="xxx"
        domain="xxx"
      >

      </fm-upload>
    </template>

    <template v-if="element.type === 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
        :options="element.options.remoteOptions"
      >

      </el-cascader>
    </template>

    <template v-if="element.type === 'table'">
      <el-table
        v-if="changeShowTableTag"
        ref="editTable1"
        :key="'widgetFormItemTable_' + index + '_1'"
        :data="element.rows"
        :span-method="objectSpanMethod(arguments, element.mergeRule)"
        :height="element.options.height"
        :border="element.options.border"
        :stripe="element.options.stripe"
        :fit="element.options.fit"
        :show-header="element.options.showHeader"
        :highlight-current-row="element.options.highlightCurrentRow"
        :show-summary="element.options.showSummary"
        :cell-class-name="editableCellClassName"
        @cell-click="editablecellclick"
        style="width: 100%; z-index: 9;">
        <template v-for="column in element.structColumns">
          <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column"></table-column>
          <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" align="center"></el-table-column>
        </template>
      </el-table>
      <el-table
        v-else
        ref="editTable2"
        :key="'widgetFormItemTable_' + index + '_2'"
        :data="element.rows"
        :span-method="objectSpanMethod(arguments, element.mergeRule)"
        :height="element.options.height"
        :border="element.options.border"
        :stripe="element.options.stripe"
        :fit="element.options.fit"
        :show-header="element.options.showHeader"
        :highlight-current-row="element.options.highlightCurrentRow"
        :show-summary="element.options.showSummary"
        :cell-class-name="editableCellClassName"
        @cell-click="editablecellclick"
        style="width: 100%; z-index: 9;">
        <template v-for="column in element.structColumns">
          <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column"></table-column>
          <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" align="center"></el-table-column>
        </template>
      </el-table>
    </template>

    <template v-if="element.type === 'sheet'">
      <spread-sheet ref="spreadsheet" />
    </template>

    <template v-if="element.type === 'editor'">
      <vue-editor
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
      >
      </vue-editor>
    </template>

    <template v-if="element.type ==='blank'">
      <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">
        {{ $t('fm.components.fields.blank') }}
      </div>
    </template>

    <template v-if="element.type === 'text'">
      <span>{{ element.options.defaultValue }}</span>
    </template>

    <div class="widget-view-action" v-if="selectWidget.key === element.key">
      <i class="el-icon-edit" v-if="element.type === 'table'" @click.stop="handleEditTable(index, element.rows)"></i>
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key === element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>

    <el-dialog title="表格编辑" :visible.sync="dialogEidtableTableVisible">
      <el-table
        v-if="dialogEidtableTableVisible"
        :data="element.rows"
        :span-method="objectSpanMethod(arguments, element.mergeRule)"
        :height="element.options.height"
        :border="element.options.border"
        :stripe="element.options.stripe"
        :fit="element.options.fit"
        :show-header="element.options.showHeader"
        :highlight-current-row="element.options.highlightCurrentRow"
        :show-summary="element.options.showSummary"
        style="width: 100%">
        <template v-for="column in element.structColumns">
          <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column" :show-edit="true" :ui-select="uiselect" />
          <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" align="center">
            <template slot-scope="{row, $index}">
              <el-input v-if="isDefaultOrOtherUi(row, column) === 'default'" v-model="row[column.prop]" placeholder="请输入" size="small" @change="change1(arguments, row, column)" />
              <jizu-component v-if="isDefaultOrOtherUi(row, column) === 'jz'" v-model="row[column.prop]" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>

  </el-form-item>
</template>

<script>
  import FmUpload from './Upload'
  import JizuComponent from '@/components/JizuComponent'
  import StaffComponent from '@/components/StaffComponent';
  import DataBookSelect from '@/components/DataBook';
  import TableColumn from '@/components/TableColumn';
  import { addClass, removeClass } from 'element-ui/src/utils/dom';
  import SpreadSheet from '@/components/SpreadSheet';

  export default {
    props: ['element', 'select', 'index', 'data', 'changeshowtt', 'celldom', 'areadom', 'uiSelect'],
    components: {
      SpreadSheet,
      JizuComponent,
      StaffComponent,
      DataBookSelect,
      FmUpload,
      TableColumn,
    },
    data() {
      return {
        selectWidget: this.select,
        changeShowTableTag: true,
        editableTableData: [],
        dialogEidtableTableVisible: false,
        cloneDeep: null,
        isShift: false,
        cellDom: null,
        areaDom: null,
        uiselect: this.uiSelect,
      }
    },
    mounted() {
      this.cloneDeep = require('lodash').cloneDeep
      window.addEventListener('keydown', code => {
        if (code.keyCode === 16 && code.shiftKey) {
          this.isShift = true
        }
      })
      window.addEventListener('keyup', code => {
        if (code.keyCode === 16) {
          this.isShift = false
        }
      })
    },
    methods: {
      querySpreadSheetDataByWidgetFormItem() {
        return this.$refs.spreadsheet && this.$refs.spreadsheet.getSpreadSheetData()
      },
      loadSpreadSheetDataByWidgetFormItem(data) {
         this.$refs.spreadsheet && this.$refs.spreadsheet.setSpreadSheetData(data)
      },
      editableCellClassName({row, column, rowIndex, columnIndex}) {
        row.rowIndex=rowIndex;
        column.columnIndex=columnIndex;
        return 'editable-row_' + rowIndex + '-column_' + columnIndex + '-cell'
      },
      transferConfigcolToCol(formW) {
        if (formW.configColumns) {
          formW.columns = formW.configColumns
          delete formW.configColumns
        }
        return formW
      },
      updateSelectWidget(index) {
        if (this.data.list[index].type === 'table') {
          const selectWidget_ = this.cloneDeep(this.data.list[index])
          selectWidget_.columns = this.cloneDeep(this.data.list[index]).configColumns
          this.selectWidget = selectWidget_
        } else {
          this.selectWidget = this.data.list[index]
        }
      },
      handleSelectWidget(index) {
        this.updateSelectWidget(index)
      },
      handleWidgetDelete(index) {
        if (this.data.list.length - 1 === index) {
          if (index === 0) {
            this.selectWidget = {}
          } else {
            this.updateSelectWidget(index - 1)
          }
        } else {
          this.updateSelectWidget(index + 1)
        }

        this.$nextTick(() => {
          this.data.list.splice(index, 1)
        })
      },

      handleEditTable(index, tableData) {
        // this.$message('表格编辑', index);
        this.currentIndex = index
        this.dialogEidtableTableVisible = true
      },
      handleWidgetClone(index) {
        const key = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
        let cloneData = {
          ...this.data.list[index],
          options: {
            ...this.data.list[index].options,
            remoteFunc: 'func_' + key
          },
          key,
          model: this.data.list[index].type + '_' + key,
          rules: this.data.list[index].rules || []
        }

        if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox' || this.data.list[index].type === 'select') {

          cloneData = {
            ...cloneData,
            options: {
              ...cloneData.options,
              options: cloneData.options.options.map(item => ({ ...item }))
            }
          }
        }

        this.data.list.splice(index, 0, cloneData)

        this.$nextTick(() => {
          this.updateSelectWidget(index + 1)
        })
      },
      change1(arg, row, column) {
        console.log('arg1 : ', arg);
        console.log('row1 : ', row);
        console.log('column1 : ', column);
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        let mergeRule = this.element.mergeRule
        let result = false
        // console.log('row : ', row)
        // console.log('column : ', column)
        // console.log('rowIndex : ', rowIndex)
        // console.log('columnIndex : ', columnIndex)
        // console.log('mergeRule : ', mergeRule)
        for (let mergeRule_index = 0; mergeRule_index < mergeRule.length; mergeRule_index++) {
          const item = mergeRule[mergeRule_index]
          // console.log('item : ', item)
          if (typeof(item.mergeFunction) === 'function') {
            result = result || item.mergeFunction({ row, column, rowIndex, columnIndex }, { startRow: item.startRow, endRow: item.endRow, startColumn: item.startColumn, endColumn: item.endColumn })
            console.log('result : ', result)
          }
          if (result) {
            console.log('break : ', result)
            return result
          }
        }
      },
      editablecellclick(row, column, cell, event) {
        const tableDom = this.$refs['editTable1'] || this.$refs['editTable2']
        const cellDom = tableDom.$el.querySelector('.el-table ' + '.editable-row_' + row.rowIndex + '-column_' + column.columnIndex + '-cell')
        if (this.isShift) {
          if (this.areaDom) {
            removeClass(this.areaDom, 'editable-red-tag')
            this.areaDom = null
          }
          this.areaDom = cellDom
          this.$emit('update:areadom', { row: row, column: column })
          addClass(this.areaDom, 'editable-red-tag')
        } else {
          if (this.cellDom) {
            removeClass(this.cellDom, 'editable-blue-tag')
            this.cellDom = null
          }
          this.cellDom = cellDom
          this.$emit('update:celldom', { row: row, column: column })
          addClass(this.cellDom, 'editable-blue-tag')
        }
      },
      isDefaultOrOtherUi(row, column) {
        console.log('row : ', row);
        console.log('column : ', column);
        console.log('uiselect : ', this.uiselect);
        if (this.uiselect.jz && this.uiselect.jz.length > 0) {
          for (let i in this.uiselect.jz) {
            if (this.uiselect.jz[i].rowIndex === row.rowIndex && this.uiselect.jz[i].prop === column.prop) {
              return 'jz'
            }
          }
        } else if (this.uiselect.sb && this.uiselect.sb.length > 0) {

        }
        return 'default'
      },
    },
    watch: {
      select(val) {
        this.selectWidget = val
      },
      uiSelect(val) {
        this.uiselect = val
      },
      selectWidget: {
        handler(val) {
          this.$emit('update:select', val)
        },
        deep: true
      },
      changeshowtt(val) {
        this.changeShowTableTag = val
      },
    }
  }
</script>
<style lang="scss" scoped>
  ::v-deep .el-table td{
    &.editable-red-tag {
      border: solid 1px #ff0000;
    }
    &.editable-blue-tag {
      border: solid 1px #0000ff;
    }
  }
</style>
