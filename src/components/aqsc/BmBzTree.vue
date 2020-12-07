<template>
  <el-tree
    key="dbid"
    :data="data" row-key="dbid"
    border
    class="tree-flow"
    :props="bmbzTreeProps"
    @node-click="rowDblclick">
    <span slot-scope="{ node }" class="custom-tree-node" :class="node.level === 1 ? 'titles-span' : 'contents-span'">
      <span v-if="((node.level === 1))" :title="node.label">
        <aqsc-icon name="aqsc-follow" primary />
        {{ node.label }}({{ node.data.sbsl }})
      </span>
      <span v-else>{{ node.label }}({{ node.data.sbsl }})</span>
    </span>
  </el-tree>
</template>
<script>
import { getMethod } from "@/util/method"
import { AqscIcon } from './AqscIcon'
// const userInfo = JSON.parse(sessionStorage.getItem("userinfo"));
export default {
  name: "BmbzTree",
  components: {
    AqscIcon
  },
  props: {
    werks: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: [],
      bmbzTreeProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'isLeaf',
        level: 'level'
      }
    }
  },
  watch: {
    werks(newV, oldV) {
      if (newV !== oldV) {
        // console.log(newV);
        this.queryData();
      }
    }
  },
  created() {
    this.queryData();
  },
  methods: {
    queryData() {
      getMethod('/sjgl/process/sjgl_zsj_sbglcx?cx=bmbztree', { werks: this.werks }).then(res => {
        const data = res.dataset.datas;
        this.bmbzTreePrepareSl(data);
        this.sbflTreeHide(data);
        this.data = data;
      })
    },
    bmbzTreePrepareSl(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          const sl = [];
          this.bmbzTreePrepareSl(data[i].children);
          data[i].children.forEach(c => {
            c.sbsl && sl.push(c.sbsl)
          })
          if (data[i].dbid !== data[i].children[0].parentid) {
            data[i].sbsl = sl.reduce((a, b) => {
              return Number(a) + Number(b);
            }, 0);
          }
        }
      }
    },
    sbflTreeHide(data) {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].sbsl || Number(data[i].sbsl) < 1) {
          data.splice(i, 1)
          i -= 1;
        } else {
          data[i].children && data[i].children.length > 0 && this.sbflTreeHide(data[i].children);
        }
      }
    },
    rowDblclick(row, node) {
      this.$emit('row-click', row)
    }
  }
}
</script>
<style>
  .tree-flow {
    min-width: 100%;
    display: inline-block;
  }
</style>
