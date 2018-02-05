<template>
  <nav class="nav flex-column">
    <template v-for="n in nav">
      <router-link :key="n.name" :to="n.url" class="nav-link" :title="n.name">
        <i v-if="n.fa" class="fa pr-2" :class="`fa-${n.fa}`" aria-hidden="true"></i>
        \{{n.name}}
      </router-link>
    </template>
  </nav>
</template>

<script>
export default {
  name: 'nav-left',
  data() {
    return {
      nav: [{ fa: 'puzzle-piece', url: '/', name: 'Main' }]
    }
  }
}
</script>
