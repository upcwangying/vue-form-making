<template>
  <el-tree key="dbid" :data="datatree"
           :props="sbflTreeProps"
           node-key="dbid"
           class="selfTree"
           highlight-current
           border max-height="640"
           @node-click="rowclick">
    <span slot-scope="{ node }" class="custom-tree-node" :class="Number(node.level) === 1 ? 'titles-span' : 'contents-span'">
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
  name: "Sbflcom",
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
      sbflTreeProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'isLeaf',
        level: 'level'
      },
      datatree: []
    }
  },
  watch: {
    werks(newV, oldV) {
      if (newV !== oldV) {
        this.queryData()
      }
    }
  },
  created() {
    this.queryData();
  },
  methods: {
    rowclick(row, node, data) {
      // console.log(node);
      this.$emit('row-click', row)
    },
    queryData() {
      getMethod('/sjgl/process/sjgl_zsj_sbglcx?cx=sbfltree', { werks: this.werks }).then(res => {
        const data = res.dataset.datas;
        this.sbflTreePrepareSl(data);
        this.sbflTreeHide(data);
        this.datatree = data;
      })
    },
    sbflTreePrepareSl(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          const sl = [];
          this.sbflTreePrepareSl(data[i].children);
          data[i].children.forEach(c => {
            c.sbsl && sl.push(c.sbsl)
          })
          data[i].sbsl = sl.reduce((a, b) => {
            return Number(a) + Number(b);
          }, 0);
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
    }
  }
}
</script>
<style  lang="scss" scoped>
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
