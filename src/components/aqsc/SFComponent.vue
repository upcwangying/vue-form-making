<template>
  <el-select v-model="svalue" :placeholder="spholder" filterable :clearable="clearable" :disabled="disabled" style="width:100%"
             :size="size" :multiple="multiple" @change="selectChange">
    <el-option v-for="item in options" :key="item.index" :label="item[displayField]" :value="item[valueField]" />
  </el-select>
</template>

<script>
export default {
  name: "SfComp",
  props: {
    value: {
      type: [String, Array],
      default: "1"
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
    multiple: {
      type: Boolean,
      default: false
    },
    valueField: {
      type: String,
      default: 'value'
    },
    displayField: {
      type: String,
      default: 'name'
    },
    size: {
      type: String,
      default: 'small'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [{ value: '0', name: '否' }, { value: '1', name: '是' }],
      svalue: '',
      spholder: '请选择'
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
  },
  methods: {
    selectChange() {
      this.$emit('input', this.svalue);
      this.$emit('change', this.svalue);
    }
  }
}
</script>

<style scoped>

</style>
