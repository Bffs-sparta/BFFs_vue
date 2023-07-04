<template>
  <div class="card">
    <img class="logo" src="@/assets/mlogo.png"/>
    <span class="card__title">Password Reset</span>
    <p class="card__content">
      We will send the password reset email to the email address you provided
      below.
    </p>
    <div class="card__form">
      <input placeholder="Your Email" type="text" v-model="email" />
      <button class="sign-up" @click="sendEmail">Send Email</button>
    </div>
  </div>
</template>

<script>
import { fetchPasswordReset } from "../api/index.js";
import bus from '@/utils/bus.js'

export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async sendEmail() {
      if (this.email == "") {
        this.snotify('warning','이메일을 입력해주세요')
      } else {
        try {
          const response = await fetchPasswordReset(this.email);
          if (response.status === 200) {
            this.snotify('error',response.data.message)
          }
        } catch (error) {
          this.snotify('error',error.response.data.message)
        }
      }
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
.card {
  width: 240px;
  height: 254px;
  padding: 0 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: 1px solid #dfdfdf;
}

.card > * {
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

.sign-up:hover {
  opacity: 0.8;
}
</style>