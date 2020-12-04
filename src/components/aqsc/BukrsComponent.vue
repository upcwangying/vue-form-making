<template>
  <el-select v-model="svalue" :placeholder="spholder" filterable :clearable="clearable" :disabled="disabled" style="width: 100%" :collapse-tags="collapseTags"
             :size="size" :multiple="multiple" @change="selectChange">
    <el-option v-for="item in options" :key="item.index" :label="item[displayField]" :value="item[valueField]" />
  </el-select>
</template>

<script>
// import { queryData } from "@sjglApi/zsjgl/bukrs";
import { getMethod } from "@/util/method"
export default {
  name: "SJGLBukrsComponent",
  props: {
    value: {
      type: String,
      default: ''
    },
    pholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    valueField: {
      type: String,
      default: 'bukrs'
    },
    displayField: {
      type: String,
      default: 'butxt'
    },
    size: {
      type: String,
      default: 'small'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: true
    },
    bulx: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    // 是否显示次工厂对应的电厂,默认显示 ps:数据库里面次级工厂就是叫这个名字werkss
    isShowWerkss: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [],
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
  created() {
    this.queryData();
  },
  mounted() {
    this.svalue = this.value; // 初始话下拉框的值
    this.spholder = this.pholder; // 初始话下拉框的值
  },
  methods: {
    selectChange() {
      this.$emit('input', this.svalue);
      let iteme = {};
      for (let i = 0; i < this.options.length; i++) {
        const item = this.options[i];
        if (item[this.valueField] === this.svalue) {
          iteme = item;
        }
      }
      this.$emit('change', this.svalue, iteme);
    },
    queryData() {
      const param = { is_del: 0, bulx: this.bulx };
      getMethod("/sjgl/process/sjgl_zsj_bukrs?m=comQuery", param).then(response => {
        const datas = response.dataset.datas
        if (this.isShowWerkss) {
          this.options = response.dataset.datas;
        } else {
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].werkss === undefined || datas[i].werkss === null || datas[i].werkss === "") {
              this.options.push(datas[i])
            }
          }
        }
      })
        .catch(() => {
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
    }
  }
}
</script>

<style scoped>

</style>
