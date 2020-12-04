<template>
  <el-tree key="dbid" :data="jsjdTreeData" :props="jsjdTreeProps" :load="loadJsjd"
           lazy node-key="dbid" class="selfTree" highlight-current @node-click="clickJsjd">
    <span slot-scope="{ node, data }" class="custom-tree-node" :class="data.levels === '1' ? 'titles-span' : 'contents-span'">
      <aqsc-icon v-if="data.type === 'jdzy'" name="aqsc-follow" primary />
      <span :title="node.label">{{ node.label }}</span>
    </span>
  </el-tree>
</template>

<script>
import { getMethod } from "@/util/method";
import { AqscIcon } from './AqscIcon'
export default {
  name: "JsjdTree",
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
      jsjdTreeData: [],
      jsjdTreeProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    werks(newV, oldV) {
      if (newV !== oldV) {
        this.queryJsjdTree();
      }
    }
  },
  created() {
    this.queryJsjdTree()
  },
  mounted() {
  },
  methods: {
    // 初始化技术监督树
    queryJsjdTree() {
      const param = {};
      const jsjdUrl = "/sjgl/process/sjgl_zsj_dcsbfl?m=query_zy";
      getMethod(jsjdUrl, param).then(res => {
        this.jsjdTreeData = res.dataset.datas;
        // console.log(this.jsjdTreeData);
      })
    },
    // 加载技术监督树
    loadJsjd(node, resolve) {
      // console.log(node);
      // console.log(resolve);
      const dbid = node.data.dbid;
      const type = node.data.type;
      let url = '/sjgl/process/sjgl_zsj_dcsbfl?m=';
      if (type === "jdzy") {
        url += 'querysbfl';
        const param = { parentid: dbid, werks: this.werks };
        this.queryLeaf(param, url, resolve);
      }
      if (type === "sbfl") {
        const dbid = node.data.dbid;
        if (node.data.counts !== null && node.data.counts !== undefined && node.data.counts > 0) {
          url += 'querysbfl';
          const param = { parentid: dbid, werks: this.werks };
          this.queryLeaf(param, url, resolve);
        } else {
          url += 'query_sb';
          const param = { sbfl: dbid, werks: this.werks };
          this.queryLeaf(param, url, resolve);
        }
        // url += 'query_jz';
        // const param = { sbfl: dbid, werks: this.werks };
        // this.queryLeaf(param, url, resolve);
      }
      if (type === "jizu") {
        url += 'query_sb';
        const parent = node.parent.data;
        const sbflid = parent.dbid;
        const param = { sbfl: sbflid, jizu: dbid, werks: this.werks };
        this.queryLeaf(param, url, resolve);
      }
    },
    // 查询叶子节点
    queryLeaf(param, url, resolve) {
      getMethod(url, param).then(res => {
        resolve(res.dataset.datas);
      })
    },
    clickJsjd(row) {
      this.$emit('row-click', row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .selfTree {
    min-width: 100%;
    display: inline-block;

  .titles-span {
    font-size: 16px;
    font-weight: normal;
    line-height: 19px;
    color: #606266;
  }

  .contents-span {
    font-size: 14px;
    font-weight: normal;
    line-height: 19px;
    color: #606266;
  }

  .aqsc-icon {
    font-size: 18px;
    vertical-align: text-bottom;
    margin-right: 5px;
  }
  }
</style>
