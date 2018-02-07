import { shallow } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/navigation/utils/modal/at-modal.vue'

describe(`Component ${Component.name}`, () => {

  it('should hide when v-modal is false', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {})
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should show when v-modal is true', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: true
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
