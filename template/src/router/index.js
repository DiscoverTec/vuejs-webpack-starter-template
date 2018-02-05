import Vue from 'vue'
import Router from 'vue-router'

import guard from '@/router/guard'
import routes from '@/router/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  guard(to, from, next)
})

export default router
