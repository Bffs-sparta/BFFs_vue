<template>
  <div class="modal-card">
    <img class="logo" src="@/assets/mlogo.png"/>
    <span class="card__title">User Withdrawal</span>
    <p class="card__content">
      We are going to withdraw from the password with the password you provided.
      Below.
    </p>
    <div class="card__form">
      <input v-model="password" placeholder="Your Password" type="password" @keyup.enter="sendPassword"/>
      <button class="wdpassword" @click="sendPassword">Send Password</button>
    </div>
  </div>
</template>

<script>
import { fetchProfileDelete } from "../api/index.js";
import bus from '@/utils/bus.js'
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    async sendPassword() {
      if (this.password == "") {
        this.snotify('warning','비밀번호를 입력해주세요')
      } else {
        try {
          const token = localStorage.getItem('access_token')
          const user_id = jwt_decode(token).user_id
          console.log(user_id)
          const response = await fetchProfileDelete(user_id, this.password);
          if (response.status === 204) {
              this.logout();
          }
          } catch (error) {
              this.snotify('error','계정 탈퇴를 실패하였습니다')
          } 
      }
    },
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('payload');
        this.$router.push('/').catch(() => {});
        this.snotify('success',"계정이 탈퇴되었습니다");
    },
    snotify(type,message){
        bus.$emit('showSnackbar',{
            type,
            message
        });
    },
  },
};
</script>

<style scoped>
.modal-card {
  width: 240px;
  height: 254px;
  padding: 0 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: 1px solid #dfdfdf;
}

.modal-card > * {
  margin: 0;
}

.card__title {
  font-size: 23px;
  font-weight: 900;
  color: #333;
}

.card__content {
  font-size: 13px;
  line-height: 18px;
  color: #333;
}

.card__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card__form input {
  margin-top: 10px;
  outline: 0;
  background: rgb(255, 255, 255);
  box-shadow: transparent 0px 0px 0px 1px inset;
  padding: 0.6em;
  border-radius: 14px;
  border: 1px solid #333;
  color: black;
}

.card__form button {
  border: 0;
  background: #9e2067;
  color: #fff;
  padding: 0.68em;
  border-radius: 14px;
  font-weight: bold;
}

.wdpassword:hover {
  opacity: 0.8;
}
</style>

