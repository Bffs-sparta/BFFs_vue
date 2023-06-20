<template>
  <div id="app">
      <nav-bar v-if="nav" id="navigation"></nav-bar>
      <router-view id="app_content"></router-view>
      <footer-bar v-if="footer" :style="{ display: footer ? 'fixed' : 'none' }"></footer-bar>
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
  data(){
    return{
      nav: true,
      footer: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const isBottom = scrollTop + clientHeight >= scrollHeight
      this.footer = isBottom
      this.nav = window.pageYOffset < 30;
    }
  }

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
#navigation{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color:#fff
}
#app_content{
  margin-top:120px;
  margin-bottom:70px;
}
</style>
