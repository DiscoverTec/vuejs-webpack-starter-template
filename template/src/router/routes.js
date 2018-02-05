export default [
  {
    path: '/',
    component(r) { require(['@/layouts/default'], r) },
    children: [
      {
        path: '',
        name: 'Home',
        component(r) { require(['@/pages/index'], r) }
      }
    ]
  },
  {
    path: '/login',
    component(r) { require(['@/layouts/login'], r) },
    children: [
      {
        path: '',
        name: 'Login',
        meta: { allowAnonymous: true },
        component(r) { require(['@/pages/login/index'], r) }
      }
    ]
  }
]
