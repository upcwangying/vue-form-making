<template>
<div class="template-tree-container">
  <div class="search-container">
    <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
    </el-input>
  </div>

  <el-tree
      ref="tree"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      show-checkbox
      check-strictly
      node-key="dbid"
      :filter-node-method="filterNode"
      @node-expand="handleExpNode"
      @node-click="handleClickNode"
      @check-change="handleCheckChange"
      >
  </el-tree>
</div>
</template>

<script>
export default {
  name: 'TemplateTree',
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    syorjb: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filterText: '',
      data: this.treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      syorjbParam: 'sy',  //默认实验报表
    }
  },
  watch: {
    treeData: {
      handler(val) {
        this.data = val
      },
      deep: true
    },
    syorjb(val) {
      this.syorjbParam = val
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleExpNode(obj, node, dom) {
      this.$emit('node-expand', obj, node, dom) // 发布展开事件
    },
    handleClickNode(obj, node, dom) {},
    handleCheckChange(obj, isCheck, node) { // 勾选事件
      if (isCheck) {
        this.$refs.tree.setCheckedKeys([obj.dbid], false);
        this.$emit('check-change', isCheck, obj)
      } else {
        if (this.$refs.tree.getCheckedNodes().length < 1) {
          this.$emit('check-change', isCheck, obj)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.template-tree-container {
  position: relative;

  .search-container {
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 999;

  }
}
</style>
