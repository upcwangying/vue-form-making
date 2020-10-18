<template>
  <el-tooltip :disabled="tooltipDisable" class="item" effect="dark" :content="tooltipContentStr" placement="top">
    <el-select v-model="svalue" filterable
               :placeholder="spholder" :clearable="clearable" :disabled="disabled" :collapse-tags="collapseTags" :multiple="multiple" :size="size" :loading="loading"
               @change="selectChange" style="width: 100%">
      <el-option v-for="item in options" :key="item.index" :label="item[displayField]" :value="item[valueField]"  />
      <el-option v-show="disempty" value="_null" label="空" />
    </el-select>
  </el-tooltip>
</template>

<script>
  import { getMethod } from "@/util/method";
  export default {
    name: "StaffComponent",
    props: {
      value: {
        type: [String, Array],
        default: ''
      },
      werks: {
        type: String,
        default: ''
      },
      bmid: {
        type: String,
        default: ''
      },
      bzid: {
        type: String,
        default: ''
      },
      bukrs: {
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
      disempty: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      valueField: {
        type: String,
        default: 'staffid'
      },
      displayField: {
        type: String,
        default: 'staffname'
      },
      size: {
        type: String,
        default: 'small'
      },
      collapseTags: {
        type: Boolean,
        default: true
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
        tooltipDisable: true,
        loading: false,
      }
    },
    watch: {
      value(val, oldVal) {
        // console.log('new: %s, old: %s', val, oldVal)
        this.svalue = this.value; // 初始话下拉框的值
        this.$emit('input', this.value);
      },
      werks(newVal, oldVal) {
        if (oldVal !== newVal) {
          this.queryData();
        }
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
      selectBlur(e) {
        if (this.svalue !== e.target.value) {
          this.svalue = e.target.value
        }
      },
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
              if (this.options[i].dbid === x) {
                return this.options[i].txt;
              }
            }
          });
          this.tooltipContentStr = svalue_.toString();
          this.tooltipDisable = (!this.multiple) || (this.svalue.length < 2);
          this.$emit('change', this.svalue, items);
        }
      },
      queryData(param) {
        this.loading = true
        const p = { is_del: 0, werks: this.werks, bukrs: this.bukrs, bmid: this.bmid, bzid: this.bzid, isReplace: true };
        Object.assign(p, param);
        getMethod('/sjgl/process/staff_componet?m=query_Staff', p).then(res => {
          const ss = res.dataset.datas
          for (let i = 0; i < ss.length; i++) {
            if (ss[i].staffcode !== undefined) {
              if (ss[i].staffcode.length > 8) {
                ss[i].staffcode = ss[i].staffcode.substring(0, 2) + "**" + ss[i].staffcode.substring(ss[i].staffcode.length - 4)
              }
            }
          }
          const ssRepeat = {}
          let i = 0
          ss.forEach(item => {
            if (ssRepeat[item.staffid] === undefined && ssRepeat[item.staffname] === undefined) {
              ssRepeat[item.staffid] = '1'
              ssRepeat[item.staffname] = '1'
              this.options.push(item)
            }
          })
          this.loading = false
        })
          .catch(() => {
            this.$message({
              type: "error",
              message: "查询数据失败"
            });
          });
      },
      reLoad(param) {
        getMethod('/sjgl/process/aqsc_zsj_jizupz?m=query', param).then(response => {
          this.options = response.dataset.datas;
        })
          .catch(() => {
            this.$message({
              type: "error",
              message: "查询数据失败"
            });
          });
      },
    }
  }
</script>
