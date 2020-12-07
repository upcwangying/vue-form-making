<template>
  <i ref="icon" class="aqsc-icon"
     :class="[name, `aqsc-icon__${size}`, (name === activeIconName || alwaysOn) ? 'active' : 'enabled',
              {
                'disabled': disabled
              }]"
     @click="handleToolBarIconClick"
     @mouseenter="handleMouseEnter"
     @mouseleave="handleMouseLeave" />
</template>

<script>
export default {
  name: 'AqscIcon',
  componentName: 'AqscIcon',
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    alwaysOn: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIconName: ''
    }
  },
  methods: {
    handleToolBarIconClick() {
      !this.disabled && this.$emit('tap', this.name)
    },
    handleMouseEnter() {
      if (this.disabled) {
        return;
      }
      this.activeIconName = this.name
      this.$emit('mouseOver', this.name)
    },
    handleMouseLeave() {
      if (this.disabled) {
        return;
      }
      this.activeIconName = ''
      this.$emit('mouseOut', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/styles/aqsc-styles/aqsc-variables.scss";
  .aqsc-icon {
    &.aqsc-icon__normal {
      font-size: 20px;
      margin-left: 13px;
      margin-right: 13px;
    }

    &.aqsc-icon__small {
      font-size: 16px;
      padding: 5px 9px 5px 9px;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.parent {
      margin-right: 4px;
    }

    &.child {
      font-size: 6px;
      margin: 0 3px 3px 0;
      align-self: flex-end;
    }

    &.enabled {
      color: $aqscNormalFontColor;
    }

    &.disabled {
      color: $aqscUnimportantFontColor;
      cursor: not-allowed;
    }

    &.active {
      color: $aqscThemeColor;
    }
  }
</style>
