import VeeValidate from 'vee-validate'
import { shallow, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/utils/form/dt-select'

const localVue = createLocalVue()

localVue.use(VeeValidate)

describe(`Component ${Component.name}`, () => {

  it('should render default properties', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: {
        name: 'testinput',
        label: 'Test Input'
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
        value: '1',
        name: 'testinput',
        label: 'Test Input',
        validate: 'required',
        options: [
          { name: 'one', value: '1' },
          { name: 'two', value: '2' },
          { name: 'three', value: '3' }
        ]
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

  it('should display disabled select with options', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: {
        value: 1,
        disabled: true,
        name: 'testinput',
        label: 'Test Input',
        validate: 'required',
        options: [
          { name: 'one', value: '1' },
          { name: 'two', value: '2' },
          { name: 'three', value: '3' }
        ]
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should display disabled select without options', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      localVue,
      propsData: {
        value: '1',
        disabled: true,
        name: 'testinput',
        label: 'Test Input'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})