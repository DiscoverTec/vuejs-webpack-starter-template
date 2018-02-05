import Vuex from 'vuex'
import { createRenderer } from 'vue-server-renderer'
import { shallow, createLocalVue } from '@vue/test-utils'

import Component from '@/components/login/form-login'

const localVue = createLocalVue()
localVue.use(Vuex)

describe(`Component ${Component.name}`, () => {

  it('should display loading and messages', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, { localVue })
    wrapper.vm.loading = true
    wrapper.vm.message = 'Sample Message'
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should getToken for the user', async () => {
    const renderer = createRenderer()
    let $router = []
    let actions = {
      getToken: jest.fn(),
      veeValidateAll: () => true
    }
    let store = new Vuex.Store({
      modules: {
        authorization: {
          namespaced: true,
          actions
        }
      }
    })
    const wrapper = shallow(Component, { localVue, store, mocks: { $router } })
    wrapper.vm.message = 'this message should clear'
    await wrapper.find('form').trigger('submit')
    expect(wrapper.vm.message).toEqual('')
    expect(actions.getToken.mock.calls).toHaveLength(1)
  })

  it('should display error when 500', async () => {
    const renderer = createRenderer()
    let actions = {
      veeValidateAll: () => true,
      getToken: () => { throw { response: { status: 500 } } }
    }
    let store = new Vuex.Store({
      modules: {
        authorization: {
          namespaced: true,
          actions
        }
      }
    })
    const wrapper = shallow(Component, { localVue, store })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.vm.message).toMatchSnapshot()
  })

  it('should display error when 403', async () => {
    const renderer = createRenderer()
    let actions = {
      veeValidateAll: () => true,
      getToken: () => { throw { response: { status: 403 } } }
    }
    let store = new Vuex.Store({
      modules: {
        authorization: {
          namespaced: true,
          actions
        }
      }
    })
    const wrapper = shallow(Component, { localVue, store })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.vm.message).toMatchSnapshot()
  })
})