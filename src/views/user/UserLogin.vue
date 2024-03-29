<template>
    <div>
        <Transition name="fade">
            <password-reset-modal v-if="modalopen" @close="modalopen=false"></password-reset-modal>
        </Transition>
        <div class="modal-overlay" v-if="modalopen" @click="modalopen=false"></div>
        <div class="back">
            <img class="back-img" src="@/assets/BestFriendForever.jpg"/>
            <div class="login-wrap">
                <div class="title">
                    <a href="">L O G I N</a>
                </div>
                <div class="login-button">
                    <div class="social-login">
                        <img src="@/assets/naver_circle.png" alt="네이버 로그인 버튼">
                        <button class="naver-button" @click="socialLogin('naver')">네이버 로그인</button>
                    </div>
                    <div class="social-login">
                        <img src="@/assets/kakao_circle.png" alt="카카오 로그인 버튼">
                        <button class="kakao-button" @click="socialLogin('kakao')">카카오 로그인</button>
                    </div>
                    <div class="social-login">
                        <img src="@/assets/google_circle.png" alt="구글 로그인 버튼">
                        <button class="google-button" @click="socialLogin('google')">구글 로그인</button>
                    </div>
                </div>
                <div class="center-line">
                    <div class="left-line"></div>
                    <a href="">OR</a>
                    <div class="right-line"></div>
                </div>
                <div class="form-item">
                    <div class="form-icon">
                        <font-awesome-icon :icon="['fas', 'user']" size="xs" style="color: #000000;" class="icon"/>
                    </div>
                    <div class="form-input">
                        <input autocomplete="off" type="email" class="input" placeholder="Email" v-model="email">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-icon">
                        <font-awesome-icon :icon="['fas', 'lock']" size="xs" style="color: #000000;" class="icon"/>
                    </div>
                    <form class="form-input" v-on:submit.prevent>
                        <input autocomplete="off" type="password" class="input" placeholder="Password" v-model="password" @keyup.enter="login">
                    </form>
                </div>
                <div class="form-item">
                    <button class="button" @click="login()">로그인</button>
                </div>
                <div class="wrap">
                    <router-link to="/user/register">회원가입</router-link>
                    <a @click="passwordModal">비밀번호 변경</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PasswordResetModal from "@/components/PasswordResetModal.vue";
import { socialLogin,fetchLogin } from "@/api/index.js";
import snotifyMixin from '@/mixins/snotifymixin';
import bus from '@/utils/bus.js';

export default {
    mixins: [snotifyMixin],
    data(){
        return {
            modalopen: false,
            email:'',
            password:'',
        }
    },
    mounted(){
        const social_error = this.$route.query.error
        if(social_error){
            this.snotify('warning','선택한 이메일은 다른 방법으로 회원가입을 하셨습니다. 다른 방법으로 로그인 해주세요.')
        }
    },
    methods: {
        passwordModal(){
            this.modalopen = true;
        },
        async socialLogin(provider){
            try{
                const response = await socialLogin(provider);
                if(response.status === 200){
                    window.location.href= response.data.url;
                }
            }catch(error){
                this.snotify('error','로그인에 실패하였습니다.')
            }
        },
        async login(){
            try{
                const response = await fetchLogin(this.email, this.password)
                if(response.status === 200){
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    const base64Url = response.data.access.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''))
                    localStorage.setItem('payload', jsonPayload)
                    this.snotify('success','로그인 되었습니다.')
                    this.$router.push('/');
                }
            }catch(error){
                if (error.response.status == 400) {
                    if(error.response.data.non_field_errors){
                        this.snotify('error',error.response.data.non_field_errors[0])
                    }
                    else{
                        this.snotify('error','아이디 또는 비밀번호가 일치하지 않습니다.')
                        this.email = '';
                        this.password = '';
                    }
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
    components: {
        PasswordResetModal,
    }
}
</script>

<style scoped>
.back{
    width:100%;
    position: relative;
}
.back-img {
    position: absolute;
    z-index: -999;
    min-width: 100vw;
    min-height: 100vh;
    filter: brightness(70%);
}
.login-wrap {
    width: 50%;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 100px;
    padding-top:100px;
}

.title {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title a {
    margin: 0 auto;
    text-decoration: none;
    color: white;
    font-size: 30px;
    font-style: bold;
}

.social-login {
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
}

.social-login img {
    position: absolute;
    height: 100%;
}

.social-login button {
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    font-weight: 600;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-login:hover {
    transform: translateY(-0.2em);
}

.naver-button {
    background-color: #03C75A;
    color: white;
}
.kakao-button {
    background-color: #FEE500;
    color: black;
}
.google-button {
    background-color: white;
    color: rgb(92, 92, 92);
}

.center-line {    
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.center-line a {
    text-decoration: none;
    color: white;
    margin: 0 10px;
    cursor: default;
}

.left-line {
    flex-grow: 1;
    height: 1px;
    background-color: white;
}

.right-line {
    flex-grow: 1;
    height: 1px;
    background-color: white;
}

.form-item {
    display: flex;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.form-icon {
    width: 50px;
    height: 50px;
    border-radius: 2px;
    border: none;
    margin-right: 2px;
    background-color: #dddddd;
    background-color: rgba( 255, 255, 255, 0.5 );
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-input {
    display: block;
    height: 50px;
    width: 100%;
    display: flex;
    position: relative;
}

.form-input input {
    vertical-align: baseline;
    width: 100%;
    border-radius: 2px;
    border: none;
    padding-left: 15px;
    background-color: #dddddd;
    background-color: rgba( 255, 255, 255, 0.5 );
    color: #9E2067;
    font-size: 15px;
}

.button {
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    font-weight: 600;
    border-radius: 2px;
    border: none;
    outline: 2px solid;
    cursor: pointer;
    color: white;
    background-color: transparent;
}

.button:hover {
    box-shadow: inset 2px 2px 5px #BABECC,
                inset -5px -5px 10px #ffffff73;
}

.wrap {
    margin: 10px 0;
    color: #595959;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wrap a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    margin-right: 20px;
}

.wrap a:hover {
    text-decoration: underline;
    text-decoration-color: #9E2067;
    cursor: pointer;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
}
</style>