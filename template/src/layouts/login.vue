<template>
  <div>
    <router-view/>
    <div class="container mt-5">
      <hr/>
      <pre>v\{{version}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-login',
  data() {
    return {
      version: process.env.version
    }
  }
}
</script>
