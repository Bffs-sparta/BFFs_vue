<template>
	<div class="nav-bar">
		<header>
			<div class="inner">
				<h1>
					<router-link to="/" class="logo">
						<img src="../assets/logo.png" alt="BFF">
                    </router-link>
				</h1>
				<div class="sub-menu">
					<nav>
						<!-- <h2>메뉴</h2> -->
                        <ul class="menu" v-if="loginuser">
							<li><router-link :to="`/profile/${userid}`">My page</router-link></li>
							<li><a @click="logout()">Log out</a></li>
						</ul>
						<ul class="menu" v-else>
							<li><router-link to="/user/login">Log in</router-link></li>
							<li><router-link to="/user/register">Join us</router-link></li>
						</ul>                        
					</nav>
          <input id="checkbox" type="checkbox" @click="menuShow">
            <label class="toggle" for="checkbox" :class="{togglechecked:menubar}">
                <div id="bar1" class="bars" :class="{bar1checked:menubar}"></div>
                <div id="bar2" class="bars" :class="{bar2checked:menubar}"></div>
                <div id="bar3" class="bars"></div>
            </label>

					<!-- <div class="hamburger" @click="menuShow">
                        <div class="material-icons">menu</div>
                    </div> -->
				</div>
			</div>
		</header>
        <Transition name="slide-fade">
            <div class="menu-bar" v-if="menubar==true">
                <menu-bar></menu-bar>
            </div>
        </Transition>
	</div>
</template>

<script>
import jwt_decode from "jwt-decode";
import MenuBar from './MenuBar.vue'
import { mapGetters } from 'vuex'
import bus from '@/utils/bus.js'

export default {
  components: {
    MenuBar,
  },
  data() {
    return {
        loginuser: false,
        userid: '',
    }
  },
  watch:{
    '$route'(){
        this.$store.dispatch('checkMenubar',false);
    }
  },
  computed:{
    ...mapGetters(['menubar']),
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const currentTime = Math.floor(Date.now() / 1000);
      const exp = localStorage.getItem("access_token") ? jwt_decode(localStorage.getItem("access_token")).exp : null;
      if (exp && exp < currentTime) {
        const refresh = localStorage.getItem("refresh_token");
        const refresh_decode = jwt_decode(refresh);
        if (refresh_decode.exp < currentTime) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("payload");
          alert("로그인 시간이 만료되었습니다.");
          next(false);
        } else {
          this.$store.dispatch("TokenRefresh").then((response) => {
            if (response.status == 200) {
              localStorage.setItem("access_token", response.data.access);
              next();
            } else {
              alert("로그인 시간이 만료되었습니다.");
              next(false);
            }
          });
        }
        
        this.checkLogin();
      } else {
        this.checkLogin();
        next();
      }
    });
    
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    menuShow() {
        this.$store.dispatch('checkMenubar',!this.menubar);
    },
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('payload');
        this.$router.push('/').catch(() => {});
        this.checkLogin();
        this.snotify('success','로그아웃 되었습니다.');
    },
    checkLogin(){
      const access = localStorage.getItem('access_token')
      this.loginuser = access !== null ? true : false;

      const payload = localStorage.getItem('payload');
      if (payload) {
        const { user_id } = JSON.parse(payload);
        this.userid = user_id;
      }
    },
    snotify(type,message){
        bus.$emit('showSnackbar',{
            type,
            message
        });
    }
  },
}
</script>

<style scoped>
/* .nav-bar {
    height: 100%;
} */
h1{
  margin: 0;
}
header > .inner{
    position: relative;
    width: auto;
    height: 120px;
    margin: 0 auto;
    padding: 0px 30px;
}

header > .inner > h1 > .logo {
    height: 111px;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
}

header > .inner > .sub-menu {
    position: absolute;
    top: 10;
    right: 0;
    margin-right: 40px;
    display: flex;
}

header > .inner > .sub-menu > nav > h2 {
    visibility: hidden;
}

header > .inner > .sub-menu > nav > .menu {
    list-style-type: none;
    display: flex;
    padding-right: 70px;
    align-items: center;
    height: 70px;
}

header > .inner > .sub-menu > nav > .menu > li{
 position: relative;
}

header > .inner > .sub-menu > nav > .menu > li::before {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 12px;
    background-color: black;
    top: 0;
    bottom: 0;
    margin: auto 0;
}

header > .inner > .sub-menu > nav > .menu > li:first-child:before {
    display: none;
}

header > .inner > .sub-menu > nav > .menu > li > a{
    padding: 11px 12px;
    color: #454545;
    text-decoration: underline;
}

header > .inner > .sub-menu > nav > .menu > li > a:hover {
    color: #9E2067;
    cursor: pointer;
}

/*header > .inner > .sub-menu > .hamburger {
    position: relative;
}

header > .inner > .sub-menu > .hamburger > .material-icons {
    height: 24px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 4px;
    margin: auto;
}

.hamburger:hover {
    cursor: pointer;
}*/

.menu-bar {
    position: absolute;
    height: 100%;
    right: 0;
    z-index: 9999;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

#checkbox {
  display: none;
}

.toggle {
  position: absolute;
  right: 5%;
  top: 35%;

  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition-duration: .3s;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: #9E2067;
  border-radius: 4px;
  transition-duration: .3s;
}

.bar1checked{
  transform: translateY(24px) rotate(-60deg);
  transition-duration: .3s;
  transform-origin: left;
  z-index: 1;
}
.bar2checked{
  transform: translateY(12px) rotate(60deg);
  margin-left: 0;
  transform-origin: right;
  transition-duration: .3s;
  z-index: 2;
}
.togglechecked{
  transform: rotate(-90deg);
}


</style>