import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const files = require.context('./modules', true, /index\.js$/)

files.keys().forEach((path, i) => {
  let module = files(path)
  Object.keys(module).forEach(item => {
    modules[item] = module[item]
  })
})

export default new Vuex.Store({ modules })
