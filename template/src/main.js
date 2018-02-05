import 'babel-polyfill'

import Vue from 'vue'
import VeeValidate from 'vee-validate'

import app from '@/app'
import store from '@/store'
import router from '@/router'

// production tips
Vue.config.productionTip = false

// use validation
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<app/>',
  components: { app }
})
