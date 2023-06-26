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
        <h1>Register</h1>
        <div class="privacy-policy-form">
            <div class="policy-item">
                <h3>개인정보 약관 동의</h3>
                <div readonly class="policy-textarea"><pre>
이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.
① 개인정보 수집 항목 및 수집·이용 목적 
  가) 수집 항목 (필수항목)
    - 성명(국문), 주소, 사진, 이메일, 나이, 소셜 로그인 인증정보 등 유저가 가입 시 제공한 또는 정보 프로필에 기재한 내용 
  나) 수집 및 이용 목적
    - 당신의 찐친 BFF 웹사이트 서비스 이용에 따른 본인 확인 절차에 이용
    - 공동구매 게시, 참여 시 실명 확인 및 지역 정보 활용
② 개인정보 보유 및 이용기간
  - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지
  - 입력일로부터 3년까지
  - 회원 탈퇴 신청 시 부터 5년까지 회원 정보 보관 
  - 공동구매 게시글에 대한 분쟁 처리 관련 기록 3년간 보관
③ 동의거부관리 
  - 사용자는 서비스 이용에 필요한 최소한의 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다.
  - 다만, 귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 사이트의 회원 전용 서비스 이용이 불가능함을 알려드립니다.
                </pre></div>
                <p class="policy-item-text">본인은 위의 동의서 내용을 충분히 숙지하였으며, 개인정보 수집, 이용, 제공하는 것에 동의합니다.</p>
            </div>
            <div class="policy-checkbox">
                <p>개인정보 수집 동의 :</p>
                <!-- 함수에서 get할때 날짜 불러다 넣어주기, user 정보에 boolean으로 함께 저장되도록 하기 -->
                <p>2023년 06월 26일</p>
                <p>동의</p>
                <input type="radio" name="policy-check" id="agree_check" />
                <!-- 거부할 시 '동의가 필요하다'는 alert 띄워주기 -->
                <p>거부</p>
                <input type="radio" name="policy-check" id="disagree_check" />
            </div>
        </div>        
        <div class="register-container">
            <div class="register-form">
                <div class="user_form">
                    <div class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'envelope']" size="xl" style="color: #000000;" /></i>
                        <input autocomplete="off" type="text" id="email" placeholder="이메일" class="input" maxlength="30" autocapitalize="off" v-model="email">
                        <em class="mail-veerification" @click="verify">메일인증</em>
                    </div>
                    
                    <form class="form-item">
                        <i class="icon"><font-awesome-icon :icon="['fas', 'lock']" size="xl" style="color: #000000;" /></i>
                        <input :type="inputType" id="password" placeholder="비밀번호" class="input" maxlength="20" autocomplete="new_password" v-model="password">
                        <i class="icon">
                            <font-awesome-icon v-if='visiable' :icon="['far', 'eye']" @click="togglePassword"/>
                            <font-awesome-icon v-else :icon="['far', 'eye-slash']" @click="togglePassword"/>
                        </i>
                    </form>
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
                    alert(response.data.message);
                }
            }catch(error){
                alert("인증번호가 일치하지 않습니다.");
            }
        },
        async userRegister(){
            try{
                const response = await fetchSignup(this.email, this.password, this.name, this.age, this.region, this.nickname);
                if(response.status === 201){
                    alert("회원가입이 완료되었습니다.");
                    this.$router.push({name: 'user-login'});
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
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.6px;
    color: #000000;
    margin-bottom: 50px;
}
/* 개인정보 동의 area */
.privacy-policy-form {
    margin:auto 30%;
    height: auto;
}
.privacy-policy-form h3{
    margin: 10px;
    color: #454545;
}
.policy-item {
    justify-content: center;
    display: grid;
}
.policy-textarea {
    width: 100%;
    min-width: 680px;
    /*max-width: 700px;
    min-width: 200px;*/
    height: 200px;
    resize: none;
    overflow-x: auto;

    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 0.9rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}
.policy-item-text {
    margin-left: 10px;
    color: #454545;
}
.policy-checkbox {    
    display: flex;
    float: right;
    margin: 5px 30px;
    margin-bottom: 50px;
    color: #454545;
}
.policy-checkbox p {
    margin-left: 20px;
    white-space: nowrap;
}
/* 유저 정보 입력 area */
.register-container {
    margin: 0 auto;
    width: 450px;
    flex-direction: column;
    display: flex;
    clear: both;
    
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
