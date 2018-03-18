import * as types from './types'
import storage from '@/plugins/storage'
export default {
  [types.RESET_LOGIN](state) {
    state.token = null
    storage.session.clear()
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
    storage.session.setItem(types.SESSION_TOKEN_NAME, token)
  },
  [types.SET_PASSTHROUGH](state, passthrough) {
    state.passthrough = passthrough
  }
}
