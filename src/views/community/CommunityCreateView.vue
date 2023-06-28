<template>
    <div class="test">
        <section class="main-section">
            <div class="main-area">
                <div class="main-container">
                    <div class="main-title">
                        <h1>커뮤니티 생성 신청하기</h1>
                    </div>
                </div>            
                <div class="main-container">
                    <div class="sub-title">
                        <span>
                            <h3>커뮤니티 이름</h3>
                            <h5>: 커뮤니티 이름은 변경할 수 없습니다. 신중하게 결정해주세요:D<br>(공백, 특수문자 제외)</h5>
                        </span>
                    </div>
                    <div class="input-box">
                        <input autocomplete="off" id="comu-title" class="input-title" type="comu-title" v-model="title">
                    </div>
                </div>
                <div class="main-container">
                    <div class="sub-title">
                        <span>
                            <h3>커뮤니티 영어 이름</h3>
                            <h5>: 영어 이름은 영어와 숫자로 5글자 이상이어야 합니다:D<br>(하이픈(-)과 언더스코어(_)는 가능)</h5>
                        </span>
                    </div>
                    <div class="input-box">
                        <input autocomplete="off" id="comu-title" class="input-title" type="comu-title" v-model="communityurl">
                    </div>
                </div>
                <div class="main-container">
                    <div class="sub-title2">
                        <span>
                            <h3>커뮤니티 소개 글</h3>
                            <h5>: 커뮤니티의 첫 인상을 생각해 작성해보세요!</h5>
                        </span>
                    </div>
                    <div class="input-box">
                        <textarea autocomplete="off" id="introduction" class="input-introduction" type="introduction" v-model="introduction"></textarea>
                    </div>
                </div>
            </div>
            <div class="submit-box">
                <button class="create-button" v-on:click="createCommunity">생성하기</button>
                <button class="quit-button" @click="goBack">취소하기</button>
            </div>
        </section>
    </div>
</template>

<script>
import  { fetchCommunityCreate } from "@/api/index.js";

export default {
    data() {
        return {
            title: "",
            communityurl: "",
            introduction: "",
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        async createCommunity() {
            try {
                const response = await fetchCommunityCreate(this.title, this.communityurl, this.introduction)
                if (response.status === 202) {
                    this.$router.push(`/community/detail/${this.communityurl}`)
                }
            } catch (error) {
                if (error.response.status === 400) {
                    alert(error.response.data)
                }
            }
        },
    }
}
</script>

<style scoped>
.test{
    margin-bottom: 100px !important;
}
body {
    margin: 0;
    padding: 0;
}

.main-section {
    width:500px;
    margin: 0 auto;
}

.main-area {
    height: auto;
}

.main-container {
    padding: 30px;
    position: relative;
}

/***** Title area *****/

.main-title {
    width:100%;
    vertical-align:middle;
}

.main-title h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 450;
    font-size: 2.0rem;
    color: #909090;
}

/***** Content area *****/

.sub-title {
    vertical-align:middle;
}

.sub-title span {
    font-weight: 450;
    font-size: 1.1rem;
    color: #707070;
}

.sub-title h5 {
    color: #909090;
}

.sub-title2 span {
    padding-right: 80px;
    font-weight: 450;
    font-size: 1.1rem;
    color: #707070;
}

.sub-title2 h5 {
    color: #909090;
    margin-bottom:0px;
}

/***** input css area *****/

.input-box {
    display: flex;
    justify-content: center;
}

.input-title {
    width: 100%;
    height: 44px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-introduction {
    width: 100%;
    height: 200px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0.5rem 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
  }

.input-title:hover, .input-title:focus, .input {
    outline: none;
    border-color: #9E2067;
}

.input-introduction:hover, .input-introduction:focus, .input {
    outline: none;
    border-color: #9E2067;
}

  
.input-group:hover .label, .input:focus {
    color: #9E2067;
}


/***** button area *****/

.submit-box {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 40px;
}

.create-button {
    outline: none;
    margin-right: 20px;
    border: none;
    cursor: pointer;
    padding: 10px 20px 11px;
    font-size: 15px;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #a92278;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
  }
  
.create-button::after,
.create-button::before {
    transition: all 0.2s ease-in-out;
  }
  
.create-button::before {
    z-index: -1;
    position: absolute;
    content: "";
    left: -2em;
    right: -2em;
    top: -2em;
    bottom: -2em;
    background-repeat: no-repeat;
    background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, white 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      /*  */
        radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, white 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, white 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
      10% 10%, 18% 18%, 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
      20% 20%;
    background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
      65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
      64% 70%, 80% 71%;
  }
  
.create-button:hover::before {
    background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%,
      100% -2%, -5% 80%, 100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%,
      100% 100%;
    background-size: 0% 0%;
    transition: background-position 0.5s ease-in-out,
      background-size 0.75s ease-in-out;
  }

.quit-button {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 20px 11px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    color: hsl(0, 0%, 100%);
    background-color: #909090;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
</style>