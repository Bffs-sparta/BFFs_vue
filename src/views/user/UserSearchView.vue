<template>
    <section class="body-section">
        <section class="main-section">
            <div class="main-container">
                <div class="subtitle">
                    <h3> 검색 결과 : {{ user }}</h3>
                </div>

                <!-- 검색 -->
                <div class="search-box">
                    <div class="container-input">
                        <input type="text" placeholder="User Search" name="text" class="input" autocomplete="off" @keyup.enter="searchUser()" v-model="user">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>  
        </section>
        <section class="notice">
            <div class="notice-list">
                <div class="card" v-for="(user, index) in searchuser" :key=index>
                    <router-link :to="`/profile/${user.id}`">
                        <div class="card-image">
                            <img :src="user.profile.profileimageurl" v-if="user.profile.profileimage !== null && user.profile.profileimage.includes('profile_img')"/>
                            <img :src="user.profile.profileimageurl?.slice(33)" v-else-if="user.profile.profileimage !== null"/>
                            <img src="@/assets/room_image(5).jpg" v-else />
                        </div>
                        <div class="category"> {{ user.profile.nickname }} | {{ user.profile.region }} </div>
                        <div class="heading" v-if="user.profile.introduction != null"> {{ user.profile.introduction }}
                            <div class="author"> By <span class="name">{{ user.profile.nickname }}</span></div>
                            <div class="author"> 가입일 <span class="name">{{ user.pfofile?.created_at.slice(0, 10) }}</span></div>
                        </div>
                        <div class="heading" v-else> 친구해요 !
                            <div class="author"> By <span class="name">{{ user.profile.nickname }}</span></div>
                            <div class="author"> 가입일 <span class="name">{{ user.pfofile?.created_at.slice(0, 10) }}</span></div>
                        </div>
                    </router-link>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import bus from '@/utils/bus.js';

export default {
    computed: {
        ...mapGetters(["fetchSearchUser"]),
        searchuser() {
            return this.fetchSearchUser;
        },
    },
    data() {
        return {
            user: '',
        }
    },
    created() {
        const user = this.$route.params.name
        this.$store.dispatch("search_user", {user});
    },
    methods: {
        searchUser() {
            const user = this.user
            if(user==''){
                this.snotify('warning','검색어를 입력해주세요.');
            }
            else{
                this.$store.dispatch("search_user", {user});

                if (this.fetchSearchUser?.length === 0) {
                    this.snotify('error',"찾으시는 검색 결과가 없습니다")
                    this.user = '';
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
body {
    margin: 0;
    padding: 0;
}

* {
    font-family: 'Noto Sans KR', sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}

p {
    color: #000
}

img {
    display: block;
}

header {
    background-image: url("@/assets/bc2.png");
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
}

header >  #menu {
    background-color: #9E2067;
}

header > .profile > h3 {
    padding: 48px 0 24px 118px;
}
.body-section{
    max-width:1800px;
    margin:0 auto;
    width: 100%;
}
.submit-box {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 40px;
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

.visual {
    background-image: url("@/assets/bc2.png");
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 648px;
}

.visual > .inner > .text {
    color: #fff;
    text-align: center;
}

.main-container {
    margin: 20px 0px 20px 0px;
    padding: 30px;
    position: relative;
    display: flex;
}

.main-container > .group { 
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 4px;
    margin: auto;
    align-items: center;
    margin-right: 84px;
}

.main-container > .group > .submit-box {
    margin-left: 28px;
}

/***** 혼자 - AI *****/

.subitle {
    width:100%;
    vertical-align:middle;
}

.subtitle h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;    
    float: left;
    color: #555555;
    font-size: 22px;
}

.subtitle h3::before {
    content: "";
    display: block;
    float: left;
    margin-right: 6px;
    width: 3px;
    height: 28px;
    background-color: #9E2067;
}

.subtitle a {
    padding-left: 110px;
    font-style: italic;
    font-weight: bold;
    color: #9E2067;
    font-size: 25px;    
}


.notice  .notice-list {
    margin: auto;
    margin-bottom: 120px;
    width: 70%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.card {
  margin-right: 44px;
  margin-bottom: 42px;
  width: 190px;
  height: 274px;
  background: white;
  padding: .4em;
  border-radius: 6px;
}

.card-image {
  width: 190px;
  height: 164px;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
}



.card-image:hover {
  transform: scale(0.98);
      
}

.card-image img {
  width: 190px;
  height: 164px;

    object-fit: cover;
}

.category {
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: 600;
  color: rgb(63, 121, 230);
  padding: 10px 7px 0;
}

.category:hover {
  cursor: pointer;
}

.heading {
  font-weight: 600;
  color: rgb(88, 87, 87);
  padding: 7px;
}

.heading:hover {
  cursor: pointer;
}

.author {
  color: gray;
  font-weight: 400;
  font-size: 11px;
  padding-top: 20px;
}

.name {
  font-weight: 600;
}

.name:hover {
  cursor: pointer;
}

/***** search area *****/

.search-box {
    margin-top: 14px;
    margin-left: auto;
    padding-right: 3%;
    justify-content: center;
    align-items: center;

    grid-column: 2;
}

.container-input {
    position: relative;
}

.input {
    width: 150px;
    padding: 10px 0px 10px 40px;
    border-radius: 9999px;
    border: solid 1px #707070;
    transition: all .2s ease-in-out;
    outline: none;
    opacity: 0.8;
}

.container-input svg {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
}

.input:focus {
    opacity: 1;
    width: 250px;
}
</style>