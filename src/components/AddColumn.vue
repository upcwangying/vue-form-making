<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="add-column-container">
    <el-form-item
        prop="label"
        label="表头label:"
        :rules="[{ required: true, message: '表头label不能为空', trigger: 'blur' }]"
    >
      <el-select v-model="dynamicValidateForm.label" placeholder="请选择" filterable allow-create default-first-option clearable @blur="selectLabelBlur" @change="selectLabelChange" @clear="selectLabelClear" style="width: 100%">
        <el-option v-for="item in zbflData" :key="'key_of_label_' + item.dbid" :label="item.zbmc" :value="item.zbmc"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
        label="表头prop:"
        prop="prop"
        :rules="[{ required: true, message: '表头prop不能为空', trigger: 'blur' }]"
    >
      <el-select v-model="dynamicValidateForm.prop" placeholder="请选择" filterable allow-create default-first-option clearable :disabled="selectPropDisable" @blur="selectPropBlur" @change="selectPropChange" style="width: 100%">
        <el-option v-for="item in zbflData" :key="'key_of_prop_' + item.dbid" :label="item.dbid" :value="item.dbid">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
            label="表头width:"
            prop="width"
    >
      <el-input v-model="dynamicValidateForm.width"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddColumn',
  props: {
    zbData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dynamicValidateForm: {
        prop: '',
        label: '',
        width: '',
      },
      zbflData: this.zbData,
      selectPropDisable: false,
    };
  },
  mounted() {
    console.log('zbData : ', this.zbData)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.dynamicValidateForm.label, this.dynamicValidateForm.prop, this.dynamicValidateForm.width)
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$emit('cancel')
    },
    selectLabelBlur(e) {
      if (this.dynamicValidateForm.label !== e.target.value) {
        this.dynamicValidateForm.label = e.target.value
      }
    },
    selectLabelChange(val) {
      let dbid_ = ''
      for (let i in this.zbflData) {
        if (this.zbflData[i].zbmc === val) {
          dbid_ = this.zbflData[i].dbid
        }
      }
      console.log('dbid_ : ', dbid_);
      if (dbid_ !== undefined && dbid_ !== null && dbid_ !== '') {
        this.dynamicValidateForm.prop = dbid_
        this.selectPropDisable = true
      }
    },
    selectLabelClear() {
      this.dynamicValidateForm.prop = ''
      this.selectPropDisable = false
    },
    selectPropBlur(e) {
      if (this.dynamicValidateForm.prop !== e.target.value) {
        this.dynamicValidateForm.prop = e.target.value
      }
    },
    selectPropChange() {},
  },
  watch: {
    zbData(val) {
      this.zbflData = val
    },
  }
}
</script>

<style lang="scss" scoped>
.add-column-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -120px;
  z-index: 1001;
  width: 400px;
  height: 240px;
  padding-right: 40px;
  background-color: white;
  border-radius: 10px;
}
</style>
