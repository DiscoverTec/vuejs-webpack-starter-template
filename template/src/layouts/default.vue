<template>
  <div class="container-fluid">
    <div class="row flex-xl-nowrap">
      <div class="d-none d-md-block col-12 col-md-3 col-xl-2 bd-sidebar">
        <div class="text-center my-4">
          <h4>Site Sample</h4>
          <pre class="small">v\{{version}}</pre>
        </div>
        <div class="mb-5">
          <hr/>
          <nav-left/>
          <hr/>
          <pre>app.config: \{{config}}</pre>
        </div>
      </div>
      <main class="col-12 col-md-9 col-xl-10 py-3 px-md-5">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import NavLeft from '@/components/navigation/nav-left'
export default {
  name: 'layout-default',
  components: {
    NavLeft
  },
  data() {
    return {
      config: window.config,
      version: process.env.version
    }
  }
}
</script>

<style scoped>
.bd-sidebar {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
