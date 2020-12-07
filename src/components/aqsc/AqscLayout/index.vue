<template>
  <div :class="['aqsc-layout-comp-container', ...margin, {
    'border-bottom': borderBottom,
  }]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AqscLayout',
  componentName: 'AqscLayout',
  props: {
    margin: {
      type: Array,
      default: () => []
    },
    borderBottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.aqsc-layout-comp-container {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;

  &.border-bottom {
    border-bottom: 1px solid #E4E7ED;
  }

  &.bottom {
    margin-bottom: 12px;
  }

  &.top {
    margin-top: 12px;
  }
}
</style>
