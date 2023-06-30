<template>
  <div>
    <footer>
      <img src="@/assets/b.png" alt="BFFs">
    </footer>
  </div>    
</template>

<script>
import jwt_decode from "jwt-decode";
import bus from '@/utils/bus.js'
export default {
  created() {
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
        } else {
          this.$store.dispatch("TokenRefresh").then((response) => {
            if (response.status == 200) {
              localStorage.setItem("access_token", response.data.access);
              this.$router.go();
            } else {
              alert("로그인 시간이 만료되었습니다.");
            }
          });
        }
        this.checkLogin();
      }
  },
  methods:{
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
  }
};
</script>

<style scoped>
footer {
    height: 70px;
    background-color: #dddddd;
    position : relative;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
}

main {
    height: auto;
    min-height: 100%;
    padding-bottom: 70px;
}


footer > img {
    width:42px;
    height: 42px;
}

</style>