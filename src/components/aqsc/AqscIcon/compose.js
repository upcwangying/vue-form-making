import { Fragment } from 'vue-fragment'
export default {
  name: 'AqscIconCompose',
  components: {
    Fragment
  },
  methods: {
    getElements() {
      return this.$slots.default && this.$slots.default.filter(slot => slot && slot.tag)
    },
    addClass(prev, cls) {
      if (!prev) {
        return cls
      } else {
        return `${cls} ` + prev.replace(cls, '')
      }
    }
  },
  render(h) {
    const elements = this.getElements()
    if (!elements) return null
    if (elements.length === 2) {
      const parentElement = elements[0]
      const childElement = elements[1]

      const parentData = parentElement.data = parentElement.data || {}
      const childData = childElement.data = childElement.data || {}
      parentData.staticClass = this.addClass(parentData.staticClass, 'parent')
      childData.staticClass = this.addClass(childData.staticClass, 'child')
      return (
        <fragment>
          { parentElement }
          { childElement }
        </fragment>
      )
    }

    return (
      <fragment>
        { ...elements }
      </fragment>
    )
  }
}
