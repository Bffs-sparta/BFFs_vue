<template>
    <div>
        <div class="inner">
            <div class="mypage">

                <div class="list">
                    <h3>내 커뮤니티 모아보기</h3>
                    <div class="main-box">
                        <div class="new-card-wrapper" v-if="community?.length == 0">
                            <div class="make-new-box">
                                <p>내가 관리자인 커뮤니티가 없습니다.</p>
                                <li>새로운 커뮤니티를 만들어보세요!</li>
                                <div class="create-button"><span>새 커뮤니티 만들기</span></div>
                            </div>
                        </div>
                        <div class="new-card-wrapper-2" v-else> 
                            <!-- 새 커뮤니티 카드 박스 -->
                            <router-link :to="`/community/detail/${community.communityurl}`" class="new-card-box" v-for="(community, index) in community" :key=index>
                                <div class="new-card-image">
                                    <img id="new-card-image" v-if="community.image != null" :src="community.imageurl">
                                    <img id="new-card-image" src="@/assets/comu_image(1).jpg">
                                </div>
                                <span id="new-text-title" class="new-text-title">{{ community.title }}</span>
                                <span id="new-text-introduction" class="new-text-introduction">{{ community.introduction }}</span>
                                <li class="recent-act">최근 활동</li>
                                <li class="recent-act-text"> {{ community.recent_act }}</li>
                                <div class="bookmark-box">
                                    <img src="@/assets/bookmark.png"/>
                                    <li class="content-text">{{ community.bookmark_count }}</li>
                                </div>
                                <div class="feed-box">
                                    <img src="@/assets/feed-all.png">
                                    <li class="content-text">{{ community.feed_count }}</li>
                                </div>
                                <router-link :to="`/community/manage/${community.communityurl}`" class="visit-button">                                    
                                    <span>관리</span>
                                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                                        <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                                    </svg>
                                </router-link>
                            </router-link>
                        </div>
                    </div>
                </div>
            
                <div class="user_profile" v-if="profile">
                    <div class="card">
                        <div class="card-image">
                            <img :src="profile.profileimageurl" v-if="profile.profileimage !== null && profile.profileimage.includes('profile_img')"/>
                            <img :src="profile.profileimageurl.slice(33)" v-else-if="profile.profileimage !== null"/>
                            <img src="@/assets/room_image(5).jpg" v-else />
                        </div>
                        <div class="category"> {{ profile.nickname }} | {{ profile.region }} </div>
                        <div class="heading" v-if="profile.introduction != null"> {{ profile.introduction }}
                            <div class="author"> By <span class="name">{{ profile.user_name }}</span></div>
                            <div class="author"> 가입일 <span class="name">{{ profile.created_at.slice(0, 10) }}</span></div>
                        </div>
                        <div class="heading" v-else> 인사말이 없습니다
                            <div class="author"> By <span class="name">{{ profile.user_name }}</span></div>
                            <div class="author"> 가입일 <span class="name">{{ profile.created_at.slice(0, 10) }}</span></div>
                        </div>
                        <div class="guestbook-comment">
                            <div class="submit-box">
                                <router-link :to="`/profile/update/${profile.id}`" class="write-btn" @click="editProfile()">수정
                                    <svg class="write-btn-svg" viewBox="0 0 512 512">
                                        <path
                                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                        </path>
                                    </svg>
                                </router-link>
                                <button class="quit-button" @click="deleteUserCheck()">탈퇴</button>
                            </div>               
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import  { fetchProfileDelete } from "@/api/index.js";
import bus from '@/utils/bus.js'

export default {
    computed: {
        ...mapGetters({"data":"fetchProfileComuInfo"}),
        profile() {
            return this.data.profile;
        },
        community() {
            console.log("⭐️")
            console.log(this.data)
            return this.data.community;
        },
    },
    // data() {
    //     return {
    //         userid: '',
    //         inputComment: '',
    //         inputUpdateComment: "",
    //     }
    // },
    created() {
        this.$store.dispatch("FETCH_PROFILE_COMU_INFO");
    },
    mounted() {
        const payload = localStorage.getItem('payload');
        if (payload) {
            const { user_id } = JSON.parse(payload);
            this.userid = user_id;
        }
    },
    methods: {
        deleteUserCheck() {
            const check = confirm('계정을 비활성화 하시겠습니까?')
            if (check) {
                this.deleteUser();
            }
        },
        async deleteUser() {
            try {                
                const response = await fetchProfileDelete(this.userid)
                if (response.status === 204) {
                    this.snotify('info',response.data.message)
                }
            } catch (error) {
                this.snotify('error','계정 비활성화에 실패했습니다.')
            } 
        },
        snotify(type,message){
            bus.$emit('showSnackbar',{
                type,
                message
            });
        },
    },
}
</script>

<style scoped>
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


/* 프로필 카드 */

.card {
  width: 472px;
  min-height: 424px;
  background: white;
  padding: .4em;
  border-radius: 6px;
  margin-left: -648px;
  margin: auto;
  object-fit: cover;
}

.card > .change {
    margin-top: 24px;
    float: right;
}

.card-image {
  /*background-color: rgb(236, 236, 236);
  background-size: cover;
  background-repeat: no-repeat;*/
  
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
}
.card-image:hover {
  transform: scale(0.98);
}
.card-image img {
  width: 100%;
  height: 100%;
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

.span {
  font-size: 10px;
}
.h1 {
  font-size: 16px;
  font-weight: bold;
}

.p {
  font-size: 12px;
  font-weight: lighter;
}

/***** 커뮤니티 area *****/
.inner {
    display: flex;
}

.mypage {
    top: 0;
    bottom: 0;
    right: 80px;
    margin: auto;
    padding-bottom: 80px;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 680px);
    grid-auto-rows: auto;
}

.list {
    margin: 0px auto;
    margin-bottom: auto;
    min-height: 450px;
}

.list h3 {
    margin: auto;
    padding: 30px 40px;
    color: #454545;
}

.new-card-wrapper {
    justify-content: flex-start; 
    flex-direction: row;
    flex-wrap: wrap;

    max-height: 700px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.new-card-box {
    width: 650px;
    height: 150px;
    margin: 18px 12px 18px 22px;

    padding: 8px;
    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;

    display: grid;
    grid-template-columns: 150px 260px 90px 150px;
    grid-template-rows: 30px 80px 40px;
}

.new-card-box:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}

.new-card-image {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.new-card-box img {
    height: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
}

.new-text-title {
    margin: 5px 15px;
    height: 20px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #707070;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
}

.new-text-introduction {
    margin: 10px 8px 10px 15px;
    height: 80%;
    font-size: 0.8rem;
    color: #909090;
    text-indent: 7px;
    line-height: 1.5;
    overflow-x: hidden;
    overflow-y: scroll;

    grid-column: 2 / 5;
    grid-row: 2 / 3;
}

.recent-act {
    list-style-type: none;
    margin: auto;
    color: #909090;
    font-size: 0.9rem;
  
    grid-column: 3 / 4;
    grid-row: 1 / 2;  
}

.recent-act-text {
    list-style-type: none;
    text-align: center;
    color: #909090;
    font-size: 0.9rem;
    margin: auto;

    grid-column: 4 / 5;
    grid-row: 1 / 2; 
}


.bookmark-box{
    display: flex;
    margin-left: auto;
    align-items: center;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
}

.bookmark-box img {
    padding-right: 1px;
    width: 25px;
    height: 25px;
}

.feed-box{
    display: flex;
    margin: auto;
    align-items: center;
    grid-column: 3 / 4;
    grid-row: 3 / 4;
}

.feed-box img {
    padding-right: 1px;
    width: 25px;
    height: 25px;
}

.content-text {
    list-style-type: none;
    justify-content: center;
    text-align: center;
    color: #d0d0d0;
    font-weight: 400;
    font-size: 1.0rem;
    margin-left: 2px;
}


/***** 관리 버튼 css *****/
.visit-button {
    margin-left: auto;
    display: flex;
    height: 2.5em;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #dddddd71;
    border-radius: 3px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
    right: 0;
    
    grid-column: 4 / 5;
    grid-row: 3 / 4;
}
.visit-button > span {
    font-size: 14px;
    font-weight: 600;
    color: #9E2067;
}
.visit-button > svg {
    margin-right: 5px;
    margin-left: 5px;
    transition: all 0.4s ease-in;
    transform: rotate(180deg);
    fill: #9E2067;
}
   
.visit-button:hover > svg {
    font-size: 1.5em;
    transform: translateX(4px) rotate(180deg);
    fill: #9E2067;
}
.visit-button:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-3px);
}



/* 유저 프로필 */

.guestbook-comment > .submit-box {
    display: flex;
}

.guestbook-comment {
    height: 150px;
    float: right;
    width: 235px;
    padding-right: 100px;
    padding-top: 50px;
}

.guestbook-comment > .submit-box {
    display: flex;
    height: 43px;
    top: 0;
    bottom: 0;
    left: 33%;
    margin: 0 auto;
    margin-right:28px;
}

.quit-button {
    width: 100px;
    height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 31px 11px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    color: hsl(0, 0%, 100%);
    background-color: #909090;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

.quit-button:hover {
    background-color: rgb(185, 0, 0);
}

/* 프로필 수정 button */

.write-btn {
    margin-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 70px;
    height: 40px;
    border: none;
    padding: 0px 20px;
    background-color: #9e2070;
    color: white;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
.write-btn-svg {
    width: 13px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: white;
    transition-duration: .3s;
}
  
.write-btn:hover {
    color: transparent;
}
  
.write-btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: .3s;
}
  
.write-btn:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
    box-shadow: 2px 2px 0px #6a154b;
}

/* 새 커뮤니티 만들기 버튼 */
.create-button {
    margin: 20px 40px;
    width: 110px;
    height: 20px;
    outline: none;
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
    background-color: #9E2067;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
  }

.create-button::after,
.create-button::before {
    transition: all 0.2s ease-in-out;
  }

.create-button:hover {
    background-color: #c3348e;
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

.make-new-box {
    display: inline-flexbox;
    width: 300px;
    height: 200px;
    justify-content: center;
}

.make-new-box p {
    margin-left: 10px;
    padding-top: 10px;
    padding-bottom: 20px;
    color: #707070;
}

.make-new-box li {
    list-style-type: none;
    color: #707070;
    padding-top: 30px;
    padding-bottom: 5px;
    margin-left: 15px;
}

</style>