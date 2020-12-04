<template>
  <div :class="[
    'aqsc-toolbar-layout-container', {
      'higher': higher
    }
  ]">
    <div>
      <slot name="left" />
    </div>
    <div class="aqsc-toolbar-layout-right-container">
      <div class="aqsc-toolbar-btn-rl-container">
        <slot name="switch" />
      </div>
      <div class="aqsc-toolbar-btn-rr-container">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AqscToolbarLayout',
  componentName: 'AqscToolbarLayout',
  props: {
    higher: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .aqsc-toolbar-layout-container {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    &.higher {
      height: 48px;
    }

    .aqsc-toolbar-layout-right-container {
      display: flex;

      .aqsc-toolbar-btn-rl-container {
        display: flex;
        margin-right: 8px;
      }

      .aqsc-toolbar-btn-rr-container {
        display: flex;
      }
    }

    ::v-deep .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
