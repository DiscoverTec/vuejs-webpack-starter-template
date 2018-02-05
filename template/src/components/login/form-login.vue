<template>
  <form @submit.prevent="submit">
    <dt-input type="text" name="username" label="Username" v-model="username" validate="required" />
    <dt-input type="password" name="password" label="Password" v-model="password" validate="required" />
    <button type="submit" class="btn btn-success btn-block" :disabled="loading">
      Log In
      <i v-if="loading" class="fa fa-spinner fa-spin" aria-hidden="true"></i>
    </button>
    <div v-if="message" class="alert alert-warning mt-2">
      \{{message}}
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import DtInput from '@/components/utils/form/dt-input'
export default {
  name: 'form-login',
  components: {
    DtInput
  },
  data() {
    return {
      message: '',
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapActions('authorization', ['getToken', 'veeValidateAll']),
    async submit() {
      try {
        this.message = ''
        let valid = await this.veeValidateAll(this)
        if (!this.loading && valid) {
          this.loading = true
          await this.getToken([this.username, this.password])
          this.$router.push('/')
        }
      } catch (e) {
        this.password = ''
        this.message = 'Error: Unable to login'
        if (e.response.status === 401 || e.response.status === 403) {
          this.message = 'Incorrect username or password'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
