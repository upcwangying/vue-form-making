<template>
  <el-form-item
    v-show="!showTableOnly"
    :prop="widget.model"
    :label="widget.type === 'table' || widget.type === 'sheet' ? '' : widget.name"
    :label-width="widget.type === 'table' ? '0px' : 'auto'"
  >

    <template v-if="widget.type=='databook'">
      <data-book-select
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :placeholder="widget.options.placeholder"
        :groupcode="widget.options.groupcode"
        value-field="datacode"
        :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type === 'staff'">
      <staff-component
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type === 'jizu'">
      <jizu-component
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type == 'input'">
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        type="number"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :placeholder="widget.options.placeholder"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea" :rows="5"
        v-model="dataModel"
        :placeholder="widget.options.placeholder"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :min="widget.options.min"
        :max="widget.options.max"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{width: widget.options.width}"
      >
        <el-checkbox
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
          :label="item.value"
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type=='month'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type=='quarter'">
      <data-book-select
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :placeholder="widget.options.placeholder"
        :groupcode="['AQSC_JSJD_SUB_QUARTER']"
        value-field="datacode"
        :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type=='year'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="readonly || widget.options.readonly"
        :disabled="disabled || widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :filterable="widget.options.filterable"
      >
        <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
                   :key="item.value" :value="item.value"
                   :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{'width': widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
      >
      </fm-upload>
    </template>

    <template v-if="widget.type == 'editor'">
      <vue-editor
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :style="{width: widget.options.width}"
      >
      </vue-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="disabled || widget.options.disabled"
        :readonly="readonly || widget.options.readonly"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :options="widget.options.remoteOptions"
      >

      </el-cascader>
    </template>
    <template v-if="widget.type === 'table'">
      <el-table
        ref="gFITable"
        :data="widget.rows"
        :height="widget.options.height"
        :border="widget.options.border"
        :stripe="widget.options.stripe"
        :fit="widget.options.fit"
        :show-header="widget.options.showHeader"
        :highlight-current-row="widget.options.highlightCurrentRow"
        :show-summary="widget.options.showSummary"
        :span-method="objectSpanMethod(arguments, widget.mergeRule)"
        style="width: 100%">
        <template v-for="column in widget.structColumns">
          <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column" :show-edit="!disabled" :readonly="readonly" />
          <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width">
            <template slot-scope="{row, $index}">
              <el-input v-if="!disabled" v-model="row[column.prop]" :readonly="readonly" placeholder="请输入" size="small" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>

    <template v-if="widget.type === 'sheet'">
      <spread-sheet style="width: 100%" ref="spreadsheet" :zbbmDatas="zbbmDatas"  />
    </template>

    <template v-if="widget.type === 'text'">
      <span>{{ dataModel }}</span>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import JizuComponent from '@/components/JizuComponent';
import StaffComponent from '@/components/StaffComponent';
import DataBookSelect from '@/components/DataBook';
import SpreadSheet from '@/components/SpreadSheet';
import TableColumn from '@/components/TableColumn';

export default {
  props: ['widget', 'models', 'rules', 'remote', 'disabled', 'readonly','zbbmDatas'],
  components: {
    SpreadSheet,
    FmUpload,
    JizuComponent,
    StaffComponent,
    DataBookSelect,
    TableColumn,
  },
  data() {
    return {
      dataModel: this.models[this.widget.model],
      showTableOnly: false,
    }
  },
  created() {
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }

    this.initDateTimeComponentDefaultValue();
  },
  mounted() {
    if (this.widget.type === 'table' && (this.widget.options.cellComputeRules.length > 0)) {
      this.tableCellAutoComp();
    }
  },
  methods: {
    tableCellAutoComp() {
      // console.log('widget : ', this.widget);
    },
    loadSpreadSheetDataByGenerateFormItem(data) {
      this.$refs.spreadsheet && this.$refs.spreadsheet.setSpreadSheetData(data)
    },
    dateFtt(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }
      }
      return fmt;
    },
    initQuarterComponent() {
      this.dataModel = (parseInt(new Date().getMonth() / 3) + 1).toString()
    },
    initDateTimeComponentDefaultValue() {
      // 在这里做时间类组件的默认值：
      // 原因：widget.options.defaultValue的值会随模板数据存入数据库从而变成 固定常量,所以widget.options.defaultValue只存常量值,不要存计算值
      // 后续如果需要 可以在 widget.options 添加配置:'是否显示当前时间为默认值'[勾选],从而配置时间类组件的默认值.处理逻辑在↓面zzsz修改
      switch (this.widget.type) {
        // case 'time' :
        //   break;
        case 'date' :
          this.dataModel = this.dateFtt('yyyy-MM-dd', new Date());
          break;
        case 'month' :
          this.dataModel = this.dateFtt('MM', new Date());
          break;
        case 'quarter' :
          this.initQuarterComponent()
          break;
        case 'year' :
          this.dataModel = this.dateFtt('yyyy', new Date());
          break;
      }
    },
    clearDateTimeComponentValue() {
      if (this.widget.type === 'date' || this.widget.type === 'month' || this.widget.type === 'quarter' || this.widget.type === 'year') {
        this.dataModel = ""
      }
    },
    setGFIValue(arrayType, arrayValue) {
      if (this.widget.type === 'table') {
        if (arrayType.indexOf(this.widget.type) !== -1) {
          for (const item in this.widget.rows) {
            this.$set(this.widget.rows, item, {
              ...this.widget.rows[item],
              ...arrayValue[arrayType.indexOf(this.widget.type)][item]
            })
          }
        }
      } else if (arrayType.indexOf(this.widget.type) !== -1) {
        if (arrayValue[arrayType.indexOf(this.widget.type)] === '=-aqsc-report-component-placeholder->') {
          // "=-aqsc-report-component-placeholder->" 则不想给第一个此"type"的组件赋值而是给下一个此"type"的组件赋值。return 此 "type"
          return this.widget.type
        } else {
          this.dataModel = arrayValue[arrayType.indexOf(this.widget.type)]
          return this.widget.type
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let mergeRule = this.widget.mergeRule
      let result = false
      for (let mergeRule_index = 0; mergeRule_index < mergeRule.length; mergeRule_index++) {
        const item = mergeRule[mergeRule_index]
        if (typeof(item.mergeFunction) === 'function') {
          result = result || item.mergeFunction({ row, column, rowIndex, columnIndex }, { startRow: item.startRow, endRow: item.endRow, startColumn: item.startColumn, endColumn: item.endColumn })
        }
        if (result) {
          return result
        }
      }
    },
    displayTableOnly(showOnlyArray) {
      const showOnlyArray_ = showOnlyArray || ['table', 'sheet']
      this.showTableOnly = (showOnlyArray_.indexOf(this.widget.type) === -1)
    },
    resetReportStatus() {
      this.showTableOnly = false
    },
  },
  watch: {
    dataModel: {
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model]
      }
    },
  }
}
</script>
