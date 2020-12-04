<template>
  <el-dialog :title="title+'数据选择'" :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
    <el-row>
      <el-col :span="24">
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          @input="textChange" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="overflow: auto;height: 310px;">
          <el-tabs v-model="activeName">
            <el-tab-pane label="选择单一值" name="first" />
            <el-tab-pane label="排除单一值" name="second" />
          </el-tabs>
          <el-table v-loading="plsjLoadingType" :data="data" size="mini" border stripe style="width: 100%;"
                    height="250"
                    @selection-change="selectChange">
            <el-table-column
              type="selection"
              width="40" />
            <el-table-column prop="d" label="" :resizable="false" header-align="center" align="left"
                             show-overflow-tooltip />
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span style="float: right;margin-bottom: 10px">
          <el-button size="mini" :disabled="buttonDis" type="primary" @click="oks">确定</el-button>
          <el-button size="mini" :disabled="buttonDis" @click="close">关闭</el-button>
        </span>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { postMethod } from "@/util/method";

export default {
  name: "PlsjComponent",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    werks: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    // 后台判断inornot
    inornot: {
      type: String,
      default: ""
    },
    // 主表名 表名需要全大写
    tableName: {
      type: String,
      default: ""
    },
    // 从表名
    tableName2: {
      type: String,
      default: ""
    },
    // 查询字段名
    columnName: {
      type: String,
      default: ""
    },
    // 主表关联字段名
    columnName2: {
      type: String,
      default: ""
    },
    // 从表关联字段名
    columnName3: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeName: 'first',
      plsjLoadingType: false,
      buttonDis: false,
      data: [],
      selectRows: [],
      textarea: ''
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === true) {
        this.data = [];
        this.textarea = '';
      }
    }
  },
  mounted() {
  },
  activated() {
  },
  methods: {
    textChange() {
      this.plsjLoadingType = true;
      this.data = [];
      const datas = this.textarea.split('\n');
      datas.forEach(r => {
        if (r !== '') {
          this.data.push({ d: r })
        }
      });
      this.plsjLoadingType = false;
    },
    selectChange(rows) {
      this.selectRows = rows;
    },
    close() {
      this.$emit('close')
    },
    oks() {
      this.buttonDis = true;
      let dt = [];
      const params = [];
      if (this.selectRows.length === 0) {
        dt = this.data;
      } else {
        dt = this.selectRows;
      }
      dt.forEach(row => {
        params.push(row.d)
      });
      if (params.length === 0) {
        this.$message({
          type: 'info',
          message: '请输入查询参数'
        });
        return;
      }
      postMethod('/sjgl/process/sjgl_zsj_jtsjxt_sbgl_lssbwh_jscs?m=getPlsj', {
        werks: this.werks,
        tableName: this.tableName,
        tableName2: this.tableName2,
        columnName: this.columnName,
        columnName2: this.columnName2,
        columnName3: this.columnName3,
        datas: params,
        isIn: (this.activeName === 'first' || this.inornot === "kksin") ? '' : 'not'
      }).then(res => {
        this.buttonDis = false;
        this.$emit('oks', res.dataset.datas[0].data, this.activeName);
      }).catch(e => {
        this.buttonDis = false;
      })
      // this.$emit('oks', params, this.activeName === 'first' ? '1' : '0')// '1'为选择单一，'0'为排除单一
    }
  }
}
</script>

<style scoped>

</style>
