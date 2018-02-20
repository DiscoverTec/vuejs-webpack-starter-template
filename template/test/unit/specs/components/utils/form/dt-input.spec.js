import VeeValidate from 'vee-validate'
import { shallow, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/utils/form/dt-input'

const localVue = createLocalVue()

localVue.use(VeeValidate)

describe(`Component ${Component.name}`, () => {

  it('should render default properties', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: {
        name: 'testinput',
        label: 'Test Input',
        value: 'Sample Input'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should render with all properties', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: {
        disabled: true,
        maxlength: 100,
        type: 'password',
        name: 'testinput',
        label: 'Test Input',
        validate: 'required',
        value: 'Sample Input'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should render error message', async () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: {
        name: 'testinput',
        label: 'Test Input',
        validate: 'required'
      }
    })
    await wrapper.vm.$validator.validateAll()
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should trigger change event', () => {
    const value = 'testing'
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: { value }
    })
    wrapper.find('input').trigger('input')
    expect(wrapper.emitted().input).toMatchSnapshot()
  })

})