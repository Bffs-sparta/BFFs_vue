<template>
  <div id="app">
    <div id="test">
      <router-loader v-if="loading"></router-loader>
      <nav-bar id="navigation"></nav-bar>
      <router-view id="app_content"></router-view>
      <footer-bar id="footer"></footer-bar>
    </div>
    <div>
      <button id="top-button" @click="scrollTop">
        ↑
      </button>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import RouterLoader from './components/RouterLoader.vue'
import bus from '@/utils/bus.js'
import snotity from '@/mixins/snotifymixin.js'
export default {
  mixins: [snotity],
  components: {
    NavBar,
    FooterBar,
    RouterLoader,
  },
  data(){
    return{
        loading: true,
        axioscount:0,
    }
  },
  created(){
    bus.$on('showSnackbar', ({type, message}) => {
      this.snotify(type,message)
    }),
    bus.$on('pageMove',()=>{
      this.loading = true 
    }),
    bus.$on('axiosStart', () => {
      this.axiosStart()
    }),
    bus.$on('axiosEnd', () => {
      this.axiosEnd()
    })
  },
  methods:{
    axiosStart(){
      this.axioscount= this.axioscount + 1
      this.loading = true
    },
    axiosEnd(){
      this.axioscount--
      if(this.axioscount <= 0){
        if(this.axioscount < 0) this.axioscount = 0;
        setTimeout(() => {
          this.loading = false
        }, 500);
      }
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  }
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
  overflow-x: hidden;
  width:100%;
  overflow: scroll;
}
body::-webkit-scrollbar{
  display:none;
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
  position: relative;
}
#app_content{
  flex: 1;
}
#footer{
  flex-shrink: 0;
}
.snotify{
  opacity: 0.95;
  width:400px !important;
  left: calc(50% - 400px / 2) !important;
}
.snotify-centerTop{
  top:50px !important;
}
.snotifyToast__inner {
  min-height:48px !important;
}
.snotify-icon{
  right: 0px !important; 
  height: 60% !important;
  background-repeat: no-repeat;
}
#top-button{
  font-size: 20px;
  background-color: white;
  color: black;
  width: 45px;
  height: 45px;
  opacity: 0.75;
  border: 1px solid #e7eae8;
  border-radius: 8px;
  cursor: pointer;
  animation: bounce_513 1s infinite;

  position: fixed;
  right: 25px;
  bottom: 30px;
}
@keyframes bounce_513 {
  0%,
    100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
