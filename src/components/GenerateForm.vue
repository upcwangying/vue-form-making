<template>
  <div class="fm-style">
    <el-form ref="generateForm"
      v-loading='formLoading'
      label-suffix=":"
      :size="data.config.size"
      :model="models" :rules="rules" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <template v-for="item in data.list">

        <template v-if="item.type === 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">

              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type === 'blank'" :label="citem.name" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <generate-form-item v-else
                  ref="generateFormItem_1"
                  :key="citem.key"
                  :models.sync="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  :disabled="disabled"
                  :readonly="readonly"
                  @input-change="onInputChange">
                </generate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type === 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <generate-form-item
            ref="generateFormItem_2"
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            :remote="remote"
            :disabled="disabled"
            :readonly="readonly"
            @input-change="onInputChange"
          >
          </generate-form-item>
        </template>

      </template>
    </el-form>
  </div>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'

export default {
  name: 'fm-generate-form',
  components: {
    GenerateFormItem
  },
  props: ['data', 'remote', 'value', 'insite', 'formLoading', 'disabled', 'readonly', 'module'],
  data () {
    return {
      models: {},
      rules: {},
      module_: this.module || 'jsjd'
    }
  },
  created () {
    this.generateModule(this.data.list)
  },
  mounted () {
    this.querysheetDate(this.data.list)
  },
  methods: {
    generateModule (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModule(item.list)
          })
        }  else {
          if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
            } else if (genList[i].type === 'table') {
              const originRows = JSON.parse(JSON.stringify(genList[i].rows))
              for (const originRowsIndex in originRows) {
                if (originRows[originRowsIndex]['isColumnHeader']) {
                  delete originRows[originRowsIndex];
                }
              }
              const deletedRows = originRows.filter(obj => !!obj)
              for (const deletedRow of deletedRows) {
                delete deletedRow.rowIndex
                delete deletedRow.isColumnHeader
              }
              this.models[genList[i].model] = deletedRows
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
          }
          if (this.rules[genList[i].model]) {

            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          } else {

            this.rules[genList[i].model] = [...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          }
        }
      }
    },

    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error(this.$t('fm.message.validError')).message)
          }
        })
      })
    },
    reset () {
      this.$refs.generateForm.resetFields()
    },
    querysheetDate(genList){
      this.loadsheetData(genList)
    },
    loadsheetData(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'sheet') {
          if (genList[i].options.length > 0) {
            const optionsJson = genList[i].options[0]
            for (let j = 0; j < this.$refs.generateFormItem_2.length; j++) {
              if(this.$refs.generateFormItem_2[j].widget.type ===  "sheet"){
                this.$refs.generateFormItem_2[j].loadSpreadSheetDataByGenerateFormItem(optionsJson)
              }
            }
          }
        }
      }
    },

    onInputChange (value, field) {
      this.$emit('on-change', field, value, this.models)
    },
    refresh () {

    },
    initDTCompDefaultValue() {
      const generateFormItem_1 = this.$refs['generateFormItem_1'] || null;
      const generateFormItem_2 = this.$refs['generateFormItem_2'] || null;
      generateFormItem_1 && generateFormItem_1.forEach(item => {
        item.initDateTimeComponentDefaultValue()
      })
      generateFormItem_2 && generateFormItem_2.forEach(item => {
        item.initDateTimeComponentDefaultValue()
      })
    },
    clearDTCompDefaultValue() {
      const generateFormItem_1 = this.$refs['generateFormItem_1'] || null;
      const generateFormItem_2 = this.$refs['generateFormItem_2'] || null;
      generateFormItem_1 && generateFormItem_1.forEach(item => {
        item.clearDateTimeComponentValue()
      })
      generateFormItem_2 && generateFormItem_2.forEach(item => {
        item.clearDateTimeComponentValue()
      })
    },
    setGenerateFormItemValue(arrayType, arrayValue) {
      let keyMap = arrayType
      let valuyeMap = arrayValue
      const generateFormItem_1 = this.$refs['generateFormItem_1'] || null;
      const generateFormItem_2 = this.$refs['generateFormItem_2'] || null;
      generateFormItem_1 && generateFormItem_1.forEach(item => {
        const itemType = item.setGFIValue(keyMap, valuyeMap) || ''
        if (itemType !== '') {
          const index = keyMap.indexOf(itemType)
          keyMap.splice(index, 1)
          valuyeMap.splice(index, 1)
        }
      })
      generateFormItem_2 && generateFormItem_2.forEach(item => {
        const itemType = item.setGFIValue(keyMap, valuyeMap) || ''
        if (itemType !== '') {
          const index = keyMap.indexOf(itemType)
          keyMap.splice(index, 1)
          valuyeMap.splice(index, 1)
        }
      })
    },
    displayTableOnly(showOnlyArray) {
      const generateFormItem_1 = this.$refs['generateFormItem_1'] || null;
      const generateFormItem_2 = this.$refs['generateFormItem_2'] || null;
      generateFormItem_1 && generateFormItem_1.forEach(item => {
        item.displayTableOnly(showOnlyArray)
      })
      generateFormItem_2 && generateFormItem_2.forEach(item => {
        item.displayTableOnly(showOnlyArray)
      })
    },
    resetReportStatus() {
      const generateFormItem_1 = this.$refs['generateFormItem_1'] || null;
      const generateFormItem_2 = this.$refs['generateFormItem_2'] || null;
      generateFormItem_1 && generateFormItem_1.forEach(item => {
        item.resetReportStatus()
      })
      generateFormItem_2 && generateFormItem_2.forEach(item => {
        item.resetReportStatus()
      })
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        this.generateModule(val.list)
      }
    },
    value: {
      deep: true,
      handler (val) {
        this.models = {...this.models, ...val}
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
