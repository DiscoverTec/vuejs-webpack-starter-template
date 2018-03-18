import * as types from './types'
import storage from '@/plugins/storage'
export default {
  passthrough: '',
  token: storage.session.getItem(types.SESSION_TOKEN_NAME)
}
