<template>
  <el-table-column v-if="coloumnHeader.children && coloumnHeader.children.length" :label="coloumnHeader.label">
    <template v-for="column in coloumnHeader.children">
      <table-column v-if="column.children && column.children.length" :key="column.id" :prop="column.prop" :label="column.label" :width="column.width" :coloumn-header="column" :showEdit="showEdit"></table-column>
      <el-table-column v-else :key="column.id" :prop="column.prop" :label="column.label" :width="column.width">
        <template v-if="showEdit" slot-scope="{row}">
          <el-input v-model="row[column.prop]" placeholder="请输入" size="small" @change="change3(arguments, row)" />
        </template>
      </el-table-column>
    </template>
  </el-table-column>
  <el-table-column v-else :key="coloumnHeader.id" :prop="coloumnHeader.prop" :label="coloumnHeader.label" :width="coloumnHeader.width">
    <template v-if="showEdit" slot-scope="{row}">
      <el-input v-model="row[column.prop]" placeholder="请输入" size="mini" @change="change2(arguments, row)" />
    </template>
  </el-table-column>
</template>

<script>
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
    },
    date() {
      return {
        showEditForChildren: showEdit
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
    },
  }
</script>

<style scoped>

</style>
