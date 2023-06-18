<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <footer-bar/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  components: {
    NavBar,
    FooterBar,
  },
}
</script>

<style>
@import '~quill/dist/quill.bubble.css';
body {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  -ms-overflow-style: none;
}

</style>
