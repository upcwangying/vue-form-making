<template>
  <div ref="group" :class="['aqsc-toolbar-group-container', {
    'border': border
  }]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AqscIconGroup',
  componentName: 'AqscIconGroup',
  props: {
    border: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/styles/aqsc-styles/aqsc-variables.scss";
.aqsc-toolbar-group-container {
  display: flex;
  align-items: center;

  &.border {
    i {
      border-left: 1px solid $aqscBorderColor1;
      border-top: 1px solid $aqscBorderColor1;
      border-bottom: 1px solid $aqscBorderColor1;
      border-radius: 2px;

      &:last-child {
        border-right: 1px solid $aqscBorderColor1;
      }
    }

    i[class~='active'] {
      border-left: 1px solid $aqscThemeColor;
      border-top: 1px solid $aqscThemeColor;
      border-bottom: 1px solid $aqscThemeColor;

      &:last-child {
        border-right: 1px solid $aqscThemeColor;
      }

      &+i {
        border-left: 1px solid $aqscThemeColor;
      }
    }
  }
}
</style>
