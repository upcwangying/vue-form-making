import { hasClass } from 'element-ui/src/utils/dom';
export default {
  data() {
    return {
      tableHeight: 0,
      aqscDeepEqual: null
    }
  },
  created() {
    this.changeHeight(0);
    this.$nextTick(() => {
      this.formColWidthAuto();
    })
  },
  mounted() {
    this.aqscDeepEqual = require('lodash').isEqual
    window.addEventListener('resize', () => {
      this.formColWidthAuto();
    });
  },
  activated() {
    this.formColWidthAuto();
  },
  methods: {
    changeHeight(mathHeight) {
      this.tableHeight = document.querySelector('#app').clientHeight - 180 - mathHeight;
      // 设置表格高度
      window.addEventListener('resize', () => {
        this.tableHeight = document.querySelector('#app').clientHeight - 180 - mathHeight;
      });
    },
    formColWidthAuto(sFm, aFm) {
      const sourceArra = [];
      const toolbarForm = (sFm !== null && (typeof sFm === "object")) ? sFm : (this.$refs[sFm || 'sourceForm'] || null);
      const toolbarQueryPanelForm = (aFm !== null && (typeof aFm === "object")) ? aFm : this.$refs[aFm || 'aimForm'] || null;
      if (!(toolbarForm && toolbarQueryPanelForm)) { return }
      if (toolbarForm && toolbarForm.$el.tagName === "FORM" && hasClass(toolbarForm.$children[0].$el, "el-row")) {
        const toolbarFormRow = toolbarForm.$children[0]
        for (var i = 0; i < toolbarFormRow.$children.length; i++) {
          sourceArra.push(toolbarFormRow.$children[i].$children[0].$children[1].$el.clientWidth);
        }
      }
      if (toolbarQueryPanelForm && toolbarQueryPanelForm.$el.tagName === "FORM") {
        for (var x = 0; x < toolbarQueryPanelForm.$children.length; x++) {
          if (hasClass(toolbarQueryPanelForm.$children[x].$el, "el-row")) {
            let accuratWidth = 0
            for (var y = 0; y < sourceArra.length; y++) {
              if (toolbarQueryPanelForm.$children[x].$children[y] &&
                hasClass(toolbarQueryPanelForm.$children[x].$children[y].$children[0].$el, "el-form-item") &&
                !hasClass(toolbarQueryPanelForm.$children[x].$children[y].$children[0].$el, "form-col-width-no-atuo") &&
                sourceArra[y] !== 0) {
                accuratWidth = sourceArra[y]
                toolbarQueryPanelForm.$children[x].$children[y].$el.style.width = "auto"
                toolbarQueryPanelForm.$children[x].$children[y].$children[0].$children[1].$el.style.width = sourceArra[y] + 'px'
              }
            }
            for (let z = sourceArra.length; z < toolbarQueryPanelForm.$children[x].$children.length; z++) {
              if (toolbarQueryPanelForm.$children[x].$children[z] &&
                hasClass(toolbarQueryPanelForm.$children[x].$children[z].$children[0].$el, "el-form-item") &&
                !hasClass(toolbarQueryPanelForm.$children[x].$children[z].$children[0].$el, "form-col-width-no-atuo") &&
                accuratWidth !== 0) {
                toolbarQueryPanelForm.$children[x].$children[z].$el.style.width = 'auto'
                toolbarQueryPanelForm.$children[x].$children[z].$children[0].$children[1].$el.style.width = accuratWidth + 'px'
              }
            }
          }
        }
      }
      return "formColWidthAutoTag"
    },
    headerDragendFMW(table) {
      let aimTable = null;
      if ((typeof table === "string")) {
        aimTable = this.$refs[table];
      } else if ((typeof table === "object")) { // typeof null = object
        aimTable = table;
      }
      if (!((aimTable && aimTable.columns))) {
        console.error('tableHeight.js err mes: headerDragendFMW()接收了一个不合法的数据');
        return
      }
      // 拖动列宽时保证列最小宽度(minWidth）
      for (let i = 0; i < aimTable.columns.length; i++) {
        const columnsWidth = aimTable.columns[i].width || aimTable.columns[i].realWidth;
        if (columnsWidth < aimTable.columns[i].minWidth) {
          if (aimTable.columns[i].width !== undefined && aimTable.columns[i].width !== null && aimTable.columns[i].width !== '') {
            aimTable.columns[i].width = aimTable.columns[i].minWidth;
          } else if (aimTable.columns[i].realWidth !== undefined && aimTable.columns[i].realWidth !== null && aimTable.columns[i].realWidth !== '') {
            aimTable.columns[i].realWidth = aimTable.columns[i].minWidth;
          }
          this.$message({ type: "warning", message: "拖动列的宽度不能小于列的最小宽度!" });
        }
      }
    }

  }
}
