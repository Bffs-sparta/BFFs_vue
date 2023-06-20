<template>
    <div>
        <Transition name="fade">
            <password-reset-modal v-if="modalopen" @close="modalopen=false"></password-reset-modal>
        </Transition>
        <div class="modal-overlay" v-if="modalopen" @click="modalopen=false"></div>
        <div class="back">
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
                        <input autocomplete="off" type="email" class="input" placeholder="Email" v-model="email" @keyup.enter="login">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-icon">
                        <font-awesome-icon :icon="['fas', 'lock']" size="xs" style="color: #000000;" class="icon"/>
                    </div>
                    <div class="form-input">
                        <input autocomplete="off" type="password" class="input" placeholder="Password" v-model="password" @keyup.enter="login">
                    </div>
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

export default {
    data(){
        return {
            modalopen: false,
            email:'',
            password:'',
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
                console.log(error);
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
                    this.$router.push('/');
                }
            }catch(error){
                console.log(error);
                this.email = '';
                this.password = '';
            }
        }
    },
    computed: {
        footerClass() {
            return "login-footer";
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
    background-color: #9E2067;
}
.login-wrap {
    width: 500px;
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
    color: #dddddd;
    margin: 0 10px;
    cursor: default;
}

.left-line {
    flex-grow: 1;
    /* margin-left: 0px;
    width: 40%; */
    height: 1px;
    background-color: #dddddd;
}

.right-line {
    flex-grow: 1;
    /* margin-right: 0px;
    width: 40%; */
    height: 1px;
    background-color: #dddddd;
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
    background-color: #dddddd;
    border-radius: 2px;
    border: none;
    margin-right: 2px;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-input {
    height: 50px;
    width: 100%;
    display: flex;
    position: relative;
}

.form-input input {
    width: 100%;
    background-color: #dddddd;
    border-radius: 2px;
    border: none;
    padding-left: 15px;
    opacity: 0.5;
    color: #9E2067;
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
    color: #dddddd;
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
    color: #BABECC;
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