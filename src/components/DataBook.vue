<template>
  <el-tooltip :disabled="tooltipDisable" class="item" effect="dark" :content="tooltipContentStr" placement="top">
    <el-select v-model="svalue" :placeholder="spholder" filterable :clearable="clearable" :disabled="disabled || readonly" style="width:100%" :collapse-tags="collapseTags"
               :size="size" :multiple="multiple" @change="selectChange">
      <el-option v-for="item in options" :key="item.dataid" :label="item[displayField]" :value="item[valueField]" />
    </el-select>
  </el-tooltip>
</template>

<script>
  import { queryDataBook } from '@/api/databook';
  export default {
    name: "DataBookIdSelect",
    props: {
      value: {
        type: [String, Array],
        default: ""
      }, pholder: {
        type: String,
        default: ''
      },
      groupcode: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      valueField: {
        type: String,
        default: 'dataid'
      },
      displayField: {
        type: String,
        default: 'dataname'
      },
      size: {
        type: String,
        default: 'small'
      },
      collapseTags: {
        type: Boolean,
        default: true
      },
      expid: {
        type: Array,
        default() {
          return []
        }
      },
      clearable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        options: [],
        svalue: '',
        spholder: '请选择',
        tooltipContentStr: "",
        tooltipDisable: true
      }
    },
    watch: {
      value(val, oldVal) {
        // console.log('new: %s, old: %s', val, oldVal)
        this.svalue = this.value; // 初始话下拉框的值
        this.$emit('input', this.value);
      }
    },
    mounted() {
      this.svalue = this.value; // 初始话下拉框的值
      this.spholder = this.pholder; // 初始话下拉框的值
      this.getCrama();
    },
    methods: {
      selectChange() {
        this.$emit('input', this.svalue);
        if (typeof this.value === 'string') {
          let iteme = {};
          for (let i = 0; i < this.options.length; i++) {
            const item = this.options[i];
            if (item[this.valueField] === this.svalue) {
              iteme = item;
            }
          }
          this.$emit('change', this.svalue, iteme);
        } else {
          // 数组
          const items = [];
          for (let i = 0; i < this.svalue.length; i++) {
            const item = this.svalue[i];
            for (let j = 0; j < this.options.length; j++) {
              const itemj = this.options[j];
              if (item === itemj[this.valueField]) {
                items.push(itemj)
              }
            }
          }
          const svalue_ = this.svalue.map(x => {
            for (let i = 0; i < this.options.length; i++) {
              if (this.options[i].dataid === x) {
                return this.options[i].dataname;
              }
            }
          });
          this.tooltipContentStr = svalue_.toString();
          this.tooltipDisable = (!this.multiple) || (this.svalue.length < 2);
          this.$emit('change', this.svalue, items);
        }
      },
      getCrama() {
        queryDataBook({ groupcode: this.groupcode }).then(response => {
          const datas = response.dataset.datas;
          const options = []
          datas.forEach(itee => {
            let flag = true;
            this.expid.forEach(item => {
              if (itee.dataid === item) {
                flag = false;
              }
            })
            if (flag) {
              options.push(itee)
            }
          })
          this.options = options;
        })
          .catch(() => {
            this.$message({
              type: "info",
              message: "查询数据失败"
            });
          });
      }
    }
  }
</script>

<style scoped>

</style>
