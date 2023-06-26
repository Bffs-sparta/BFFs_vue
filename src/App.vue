<template>
  <div id="app">
    <div id="test">
      <nav-bar id="navigation"></nav-bar>
      <router-view id="app_content"></router-view>
      <footer-bar id="footer"></footer-bar>
    </div>
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

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

* {
  font-family: 'SUITE-Regular' !important;
}
body {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  -ms-overflow-style: none;
  margin:0;
  padding:0;
}
#navigation{
  width: 100%;
  height: 120px;
  background-color:#fff
}
#test{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}
#app_content{
  flex: 1;
}
#footer{
  flex-shrink: 0;
}
</style>
