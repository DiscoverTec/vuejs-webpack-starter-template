<template>
  <div>
    <h1>{{name}}</h1>
    <p>You have successfully logged into the system</p>
    <hr/>
    <code style="word-break: break-all; display: inline-block">
      <strong>Token:</strong>
      \{{token}}
    </code>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters('authorization', ['token'])
  }
}
</script>
