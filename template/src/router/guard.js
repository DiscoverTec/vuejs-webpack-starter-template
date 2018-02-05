import store from '@/store'
export default (to, from, next) => {
  // exit if we are allowing anonymous
  if (to.matched.some(record => record.meta.allowAnonymous)) {
    next()
    return
  }
  // exit if they are not authenticated
  if (!store.getters['authorization/token']) {
    next('/login')
    return
  }
  // allowed
  next()
}
