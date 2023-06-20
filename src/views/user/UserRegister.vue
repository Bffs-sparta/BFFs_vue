<template>
    <div>
        <Transition name="fade">
            <verify-modal v-if="modalopen" @close="modalopen=false">
                <div slot="body">
                    <div class="background">
                        <div class="form"> 
                            <div class="title">OTP</div>
                            <div class="title">Verification Code</div> 
                            <p class="message">We have sent a verification code to your email</p> 
                            <div class="inputs"> 
                                <input v-for="(input,idx) in inputs" :key="idx" type="text" maxlength="1" v-model="input.value" @input="handleInput(idx)" ref="inputFields" @keyup.delete="backspace(idx)">
                            </div> 
                            <button class="action" @click="verifymail">verify me</button> 
                        </div>
                    </div>
                </div>
            </verify-modal>
        </Transition>
        <div class="modal-overlay" v-if="modalopen" @click="modalopen=false"></div>
        <div class="register-container">
            <h1>Register</h1>
            <div class="register-form">
                <div class="user_form">
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'envelope']" size="xl" style="color: #000000;" /></i>
                        <input autocomplete="off" type="text" id="email" placeholder="이메일" class="input" maxlength="30" autocapitalize="off" v-model="email">
                        <em class="mail-veerification" @click="verify">메일인증</em>
                    </div>
                    
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'lock']" size="xl" style="color: #000000;" /></i>
                        <input :type="inputType" id="password" placeholder="비밀번호" class="input" maxlength="20" autocomplete="new_password" v-model="password">
                        <i class="icon">
                            <font-awesome-icon v-if='visiable' :icon="['far', 'eye']" @click="togglePassword"/>
                            <font-awesome-icon v-else :icon="['far', 'eye-slash']" @click="togglePassword"/>
                        </i>
                    </div>
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'user']" size="xl" style="color: #000000;" /></i>
                        <input autocomplete="off" type="text" id="name" placeholder="이름" class="input" maxlength="17" v-model="name">
                    </div>
                </div>
                <div class="user_detail">
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'user']" size="xl" style="color: #000000;" /></i>
                        <input autocomplete="off" type="text" id="age" placeholder="나이" class="input" maxlength="" v-model="age">
                    </div>
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'map-location-dot']" size="xl" style="color: #000000;" /></i>
                        <input autocomplete="off" type="text" id="region" placeholder="지역" class="input" maxlength="17" v-model="region">
                    </div>
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'signature']" size="xl" style="color: #000000;" /></i>
                        <input autocomplete="off" type="text" id="nickname" placeholder="닉네임" class="input" maxlength="17" v-model="nickname">
                    </div>
                </div>
                <div class="link">
                    <router-link to="/user/login">로그인</router-link>
                </div>
                <div class="register_submit">
                    <button class="btn" @click="userRegister">회원가입</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import VerifyModal from "@/components/VerifyModal.vue";
import  { fetchVerificationEmail,fetchSendEmail,fetchSignup } from "@/api/index.js";

export default {
    data(){
        return {
            inputType: 'password',
            visiable: false,
            modalopen: false,
            email: '',
            password: '',
            name: '',
            age: '',
            region: '',
            nickname: '',
            inputs:[
                {id:1, value:''},
                {id:2, value:''},
                {id:3, value:''},
                {id:4, value:''},
                {id:5, value:''},
                {id:6, value:''},
            ],
            otp:'',
        }
    },
    methods: {
        togglePassword(){
            this.visiable = !this.visiable;
            this.inputType = this.visiable ? 'text' : 'password';    
        },
        async verify(){
            try{
                const response = await fetchSendEmail(this.email);
                if(response.status === 200){
                    this.modalopen = true;
                }
            }catch(error){
                console.log(error);
            }
        },
        handleInput(index){
            if(index !== 5){
                this.$refs.inputFields[index+1].focus();
            }
        },
        backspace(index){
            if(index !== 0){
                this.inputs[index-1].value = '';
                this.$refs.inputFields[index-1].focus();
            }
        },
        async verifymail(){
            this.otp = '';
            this.inputs.forEach(input => {
                this.otp += input.value;
            });
            try{
                const response = await fetchVerificationEmail(this.otp,this.email)
                if(response.status === 200){
                    this.modalopen = false;
                }
            }catch(error){
                console.log(error);
            }
        },
        async userRegister(){
            try{
                const response = await fetchSignup(this.email, this.password, this.name, this.age, this.region, this.nickname);
                if(response.status === 200){
                    alert("회원가입이 완료되었습니다.");
                    this.$router.push({name: 'Login'});
                }
            }catch(error){
                console.log(error);
            }
        }
    },
    components: {
        VerifyModal,
    }

}
</script>

<style scoped>
a{
    text-decoration: none;
    color: #929294;
}
h1{
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.6px;
    color: #000000;
    margin-bottom: 50px;
}
.register-container {
    margin: 0 auto;
    width: 450px;
    flex-direction: column;
    display: flex;
    
    margin-top: 100px;
    margin-bottom: 100px;
}

.register-form {
    flex: 1 1 auto;
}

.register_submit {
    width: 100%;
    flex: none;
}

.icon {
    width: 50px;
    height: 50px;
    position: relative;
}

.icon svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.mail-veerification {
    padding: 6px 8px 5px 8px;
    font-size: 11px;
    font-weight: 500;
    line-height: 13px;
    letter-spacing: -0.4px;
    vertical-align: middle;
    font-style: normal;
    border: 1px solid #dfdfdf;
}

.mail-veerification:hover {
    cursor: pointer;
}

.form-item {
    align-items: center;
    position: relative;
    display: flex;
    width: 450px;
    height: 50px;
}

.form-item::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    border-radius: inherit;
    border: 1px solid #dfdfdf;
}

.form-item+.form-item {
    margin-top: -1px;
}

.input {
    border: none;
    width: 320px;
}

.user_detail {
    margin-top: 20px;
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
.link{
    margin-top:10px
}
.btn{
    width:100%;
    height:50px;
    background-color: #9e2067;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: -0.5px;
    text-align: center;
    border : none;
    margin-top: 20px;
    cursor: pointer;
}
.form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 400px;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index: 1000;
    border: 1px solid #dfdfdf;
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: black
}

.message {
    color: #a3a3a3;
    font-size: 14px;
    margin-top: 4px;
    text-align: center
}

.inputs {
    margin-top: 10px
}

.inputs input {
    width: 32px;
    height: 32px;
    text-align: center;
    border: none;
    border-bottom: 1.5px solid #d2d2d2;
    margin: 0 10px;
}

.inputs input:focus {
    border-bottom: 1.5px solid #9E2067;
    outline: none;
}

.action {
    margin-top: 24px;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    background-color: #9E2067;
    color: white;
    cursor: pointer;
    align-self: end;
}
</style>