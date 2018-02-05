import { shallow } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/navigation/nav-left.vue'

describe(`Component ${Component.name}`, () => {

  it('renders to a snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {})
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
