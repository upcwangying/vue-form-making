<template>
  <div style="width: 200px">
    <el-tree ref="tree" key="dbid" :data="kksData" :props="defaultProps" :load="loadNode"
             lazy node-key="dbid" class="selfTree" highlight-current @node-click="rowClick" @node-contextmenu="rightClick">
      <span slot-scope="{ node, data }" class="custom-tree-node" :class="data.levels === '1' ? 'titles-span' : 'contents-span'">
        <aqsc-icon v-if="data.code === werks" name="aqsc-follow" primary />
        <span :title="node.label">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { getMethod } from "@/util/method"
import { AqscIcon } from './AqscIcon'
// const userInfo = JSON.parse(sessionStorage.getItem("userinfo"));

export default {
  name: "KKSTree",
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
      // 树属性
      listLoading: false,
      kksData: [{ dbid: '-1' }],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    werks(newV, oldV) {
      if (newV !== oldV) {
        this.getRoot();
      }
    }
  },
  created() {
    this.getRoot();
  },
  mounted() {
  },
  methods: {
    // -----------------------右键功能
    rightClick(event, row, node, comp) {
      this.$emit("rightClick", event, row);
    },
    // -----------------------
    loadNode(node, resolve) {
      // 加载node
      const dbid = node.data.dbid;
      if (dbid === undefined) {
        return
      }
      const param = { skks: dbid, werks: this.werks };
      getMethod('/sjgl/process/sjgl_zsj_com_kks?m=queryRoot', param).then(res => {
        resolve(res.dataset.datas)
      })
    },
    rowClick(row, node) {
      this.$emit('row-click', row)
    },
    getRoot() {
      const param = { werks: this.werks, skks: '_null', kksbm: this.werks };
      getMethod('/sjgl/process/sjgl_zsj_com_kks?m=queryRoot', param).then(res => {
        this.kksData = res.dataset.datas
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-tree>.el-tree-node {
    min-width: 100%;
    display:inline-block;
  }
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
  .flow-tree{
    overflow: auto;
    flex: 1;
    /*height: 300px;*/
    margin: 10px;
    >>>.el-tree-node{
      >.el-tree-node__children{
        overflow: auto visible !important
    }
  }
  }
</style>
