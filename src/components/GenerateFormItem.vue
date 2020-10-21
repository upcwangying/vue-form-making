<template>
  <el-form-item :prop="widget.model"
                :label="widget.type === 'table' || widget.type === 'sheet' ? '' : widget.name"
                :label-width="widget.type === 'table' ? '0px' : 'auto'"
  >

    <template v-if="widget.type === 'staff'">
      <staff-component :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type === 'jizu'">
      <jizu-component :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type == 'input'">
      <el-input
          v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
          type="number"
          v-model.number="dataModel"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :disabled="widget.options.disabled"
      ></el-input>
      <el-input
          v-else
          :type="widget.options.dataType"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input type="textarea" :rows="5"
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
          v-model="dataModel"
          :style="{width: widget.options.width}"
          :step="widget.options.step"
          controls-position="right"
          :disabled="widget.options.disabled"
          :min="widget.options.min"
          :max="widget.options.max"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel"
                      :style="{width: widget.options.width}"
                      :disabled="widget.options.disabled"
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
      <el-checkbox-group v-model="dataModel"
                         :style="{width: widget.options.width}"
                         :disabled="widget.options.disabled"
      >
        <el-checkbox

            :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
            v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
            :key="index"
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
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
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
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
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
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type=='quarter'">
      <quarter-component
        v-model="dataModel"
        :style="{width: widget.options.width}" />
    </template>

    <template v-if="widget.type=='year'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
               :max="widget.options.max"
               :disabled="widget.options.disabled"
               :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
          v-model="dataModel"
          :disabled="widget.options.disabled"
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
          :disabled="widget.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
          v-model="dataModel"
          :min="widget.options.min"
          :max="widget.options.max"
          :disabled="widget.options.disabled"
          :step="widget.options.step"
          :show-input="widget.options.showInput"
          :range="widget.options.range"
          :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
          v-model="dataModel"
          :disabled="widget.options.disabled"
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
          :style="{width: widget.options.width}"
      >
      </vue-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :options="widget.options.remoteOptions"
      >

      </el-cascader>
    </template>

    <template v-if="widget.type === 'table'">
      <el-table
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
          <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column" :show-edit="true" />
          <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width">
            <template slot-scope="{row, $index}">
              <el-input v-model="row[column.prop]" placeholder="请输入" size="small" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>

    <template v-if="widget.type === 'sheet'">
      <spread-sheet style="width: 100%" />
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{ dataModel }}</span>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import JizuComponent from '@/components/JizuComponent';
import StaffComponent from '@/components/StaffComponent';
import QuarterComponent from '@/components/QuarterComponent';
import SpreadSheet from '@/components/SpreadSheet';
import TableColumn from '@/components/TableColumn';

export default {
  props: ['widget', 'models', 'rules', 'remote'],
  components: {
    SpreadSheet,
    FmUpload,
    JizuComponent,
    StaffComponent,
    QuarterComponent,
    TableColumn,
  },
  data() {
    return {
      dataModel: this.models[this.widget.model],
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
  },
  methods: {
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
    staffRowDbClick(row) {
      this.displayStaff = row.ltext;
      this.dataModel = row.dbid;
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
