import http from '@/api'
import * as types from './types'

// a helper method to collect vee validation child components
function collectChildValidation($this, validations) {
  $this.$children.forEach(vm => {
    validations.push(vm.$validator.validateAll())
    if (vm.$children.length) {
      collectChildValidation(vm, validations)
    }
  })
}

export default {
  clearToken({ commit, state }) {
    commit(types.RESET_LOGIN)
  },
  async getToken({ commit, dispatch }, [user, pwd]) {
    const r = { data: user + pwd }
    console.log('Sample Http Output', http)
    commit(types.SET_TOKEN, r.data)
  },
  veeValidateAll({ commit }, $this) {
    return new Promise((resolve, reject) => {
      let validations = [$this.$validator.validateAll()]
      collectChildValidation($this, validations)
      Promise.all(validations)
        .then(r => resolve(r.every(i => i === true)))
        .catch(reject)
    })
  }
}
