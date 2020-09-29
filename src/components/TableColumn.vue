<template>
  <el-table-column v-if="coloumnHeader.children && coloumnHeader.children.length" :label="coloumnHeader.label">
    <template v-for="column in coloumnHeader.children">
      <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column" :showEdit="showEdit" :ui-select="uiselect" />
      <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width">
        <template v-if="showEdit" slot-scope="{row}">
          <el-input v-if="isDefaultOrOtherUi(row, column) === 'default'" v-model="row[column.prop]" placeholder="请输入" size="small" @change="change3(arguments, row)" />
          <jizu-component v-if="isDefaultOrOtherUi(row, column) === 'jz'" />
        </template>
      </el-table-column>
    </template>
  </el-table-column>
  <el-table-column v-else :key="coloumnHeader.id" :prop="coloumnHeader.prop" :label="coloumnHeader.label" :width="coloumnHeader.width">
    <template v-if="showEdit" slot-scope="{row}">
      <el-input v-if="isDefaultOrOtherUi(row, column) === 'default'" v-model="row[column.prop]" placeholder="请输入" size="mini" @change="change2(arguments, row)" />
      <jizu-component v-if="isDefaultOrOtherUi(row, column) === 'jz'" />
    </template>
  </el-table-column>
</template>

<script>
  import JizuComponent from '@/components/JizuComponent'
  export default {
    name: 'tableColumn',
    props: {
      prop: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      width: {
        type: String,
        required: true
      },
      coloumnHeader: {
        type: Object,
        required: true
      },
      showEdit: {
        type: Boolean,
        default: false
      },
      uiSelect: {
        type: Object,
        default: () => {
          return { jz: [], sb: [], }
        }
      }
    },
    components: {
      JizuComponent,
    },
    data() {
      return {
        showEditForChildren: this.showEdit,
        uiselect: this.uiSelect,
      }
    },
    mounted() {
      console.log('coloumnHeader : ', this.coloumnHeader);
    },
    methods: {
      change2(arg, row) {
        console.log('arg2 : ', arg);
        console.log('row2 : ', row);
      },
      change3(arg, row) {
        console.log('arg3 : ', arg);
        console.log('row3 : ', row);
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
      uiSelect(val) {
        this.uiselect = val
      },
    }
  }
</script>

<style scoped>

</style>
