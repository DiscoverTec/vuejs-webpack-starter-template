import * as types from './types'
export default {
  token: sessionStorage.getItem(types.SESSION_TOKEN_NAME)
}
