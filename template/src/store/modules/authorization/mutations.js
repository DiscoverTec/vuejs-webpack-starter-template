import * as types from './types'
export default {
  [types.RESET_LOGIN](state) {
    state.token = null
    sessionStorage.clear()
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
    sessionStorage.setItem(types.SESSION_TOKEN_NAME, token)
  }
}
