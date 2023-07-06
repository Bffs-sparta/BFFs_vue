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
            <ul class="menu" v-if="loginuser">
              <li>
                <alarm-modal v-if="alarmopen" class="alarm-modal"></alarm-modal>
                <div class="alarm-count-wrap" v-if="getAlarmCount>0">
                  <i class="alarm-count">{{getAlarmCount<999? getAlarmCount:'999+'}}</i>
                </div>
                <button class="alarm" @click="alarmOpen">
                  <svg viewBox="0 0 448 512" class="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
                </button>
              </li>
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
import AlarmModal from './AlarmModal.vue'
import { mapGetters } from 'vuex'
import bus from '@/utils/bus.js'

export default {
    components: {
        MenuBar,
        AlarmModal,
    },
    data() {
        return {
            loginuser: false,
            userid: '',
            alarmopen: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.checkLogin();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        '$route'() {
            this.$store.dispatch('checkMenubar', false);
        },
        getAlarmCount(value){
            if(value == 0){
                this.alarmopen = false;
            }
        }
    },
    computed: {
        ...mapGetters(['menubar','getAlarmCount']),
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
        this.createWebSocket();
    },
    methods: {
        menuShow() {
            this.$store.dispatch('checkMenubar', !this.menubar);
        },
        alarmOpen() {
            if(this.getAlarmCount > 0) {
                this.alarmopen = !this.alarmopen;
            }
            else{
                this.snotify('info', '알림이 없습니다.');
            }
        },
        logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('payload');
            this.$router.push('/').catch(() => { });
            this.checkLogin();
            this.snotify('success', '로그아웃 되었습니다.');
        },
        checkLogin() {
            const access = localStorage.getItem('access_token')
            this.loginuser = access !== null ? true : false;

            const payload = localStorage.getItem('payload');
            if (payload) {
                const { user_id } = JSON.parse(payload);
                this.userid = user_id;
            }
        },
        snotify(type, message) {
            bus.$emit('showSnackbar', {
                type,
                message
            });
        },
        handleScroll() {
            this.$store.dispatch('checkMenubar', false);

        },
        createWebSocket() {
            const socket = new WebSocket(
                `ws://127.0.0.1:8000/ws/alarm/?token=${localStorage.getItem('access_token')}`
            );
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.$store.dispatch('getAlarm',data);
            };
        },
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
    max-width: 1800px;
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
    top: 10px;
    right: 0;
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

.menu-bar {
    position: absolute;
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

.alarm{
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: .3s;
  border: none;
  background-color: transparent;
  margin-right:18px;
}
.alarm-count-wrap{
  position :absolute;
  top: -4px;
  left: 20px;
}
.alarm-count{
  font-size: 14px;
  text-decoration: none;
  font-style: normal;
  background-color: #F55729;
  border-radius: 18px;
  min-width: 18px;
  width: auto;
  height: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80;
  position: sticky;
  padding: 2px;
}
.bell {
  width: 25px;
}

.bell path {
  fill: #555555;
}
.bell:hover path{
  fill:#FEBD1A;
}
.bell:focus-visible{
    outline: 3px solid #aaa;
}
.bell:hover {
  animation: bellRing 0.9s both;
}

/* bell ringing animation keyframes*/
@keyframes bellRing {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}

.bell:active {
  transform: scale(0.9);
}
.alarm-modal{
  top:55px;
  left:50%;
  transform: translate(-50%,0);
}
</style>