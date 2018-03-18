import crypto from 'crypto'

const environment = window.config ? window.config.environment : 'local'

let hash = (key) => {
  return crypto.createHash('md5').update(`${process.env.appName}/${environment}/${key}`).digest('hex')
}

export default {
  session: {
    setItem(key, value) {
      sessionStorage.setItem(hash(key), value)
    },
    getItem(key) {
      return sessionStorage.getItem(hash(key))
    },
    clear() {
      sessionStorage.clear()
    }
  },
  local: {
    setItem(key, value) {
      localStorage.setItem(hash(key), value)
    },
    getItem(key) {
      return localStorage.getItem(hash(key))
    },
    clear() {
      localStorage.clear()
    }
  }
}
