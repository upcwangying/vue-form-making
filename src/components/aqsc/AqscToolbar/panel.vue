<template>
  <aqsc-layout ref="panel" class="aqsc-toolbar-search-panel">
    <div>
      <slot name="condition" />
    </div>
    <div class="search-panel-btn">
      <slot name="btn" />
    </div>
  </aqsc-layout>
</template>

<script>
import AqscLayout from '../AqscLayout'

export default {
  name: 'AqscToolbarQueryPanel',
  comments: {
    AqscLayout
  },
  components: { AqscLayout },
  componentName: 'AqscToolbarQueryPanel',
  methods: {
    showMore(showMore) {
      const root = this.$refs.panel.$el
      const elements = root.getElementsByClassName('el-row')
      if (elements && elements.length > 1) {
        if (showMore) {
          for (let i = 1, len = elements.length; i < len; i++) {
            const element = elements[i]
            element.style.display = ''
          }
        } else {
          for (let i = 1, len = elements.length; i < len; i++) {
            const element = elements[i]
            element.style.display = 'none'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/styles/aqsc-styles/aqsc-variables.scss";
  .aqsc-toolbar-search-panel {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 2px;
    padding-bottom: 5px;
    background-color: $aqscNormalBackgroundColor;

    & > div:nth-child(1) {
      width: 100%;
    }
    .search-panel-btn {
      /*display: flex;*/
      height: 32px;
      padding-left: 34px;
      display: none;

      .el-button {
        padding: 0 12px;
      }
    }
    ::v-deep .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
