<template>
    <div>
        <div class="inner">
            <!-- <button>
                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>뒤로</span>
            </button> -->

            <div class="mypage">
                <div class="list">

                    <div class="bookmark">
                        <h3>북마크한 커뮤니티</h3>
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-wrapper" v-if="bookmark?.length == 0 || true">
                                    <p>북마크한 커뮤니티가 없습니다</p>
                                </div>
                                <div class="new-card-wrapper" v-else>                                    
                                    <!-- 새 커뮤니티 카드 박스 -->
                                    <router-link :to="`/community/detail/${bookmark.communityurl}`" class="new-card-box" v-for="(bookmark, index) in bookmark" :key=index>
                                        <div class="new-card-image">
                                            <img id="new-card-image" v-if="bookmark.image != null" :src="bookmark.imageurl">
                                            <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">
                                        </div>
                                        <span id="new-text-title" class="new-text-title community-text">{{ bookmark.title }}</span>
                                        <!-- <span id="new-text-region" class="new-text-region">경기</span> -->
                                        <span id="new-text-introduction" class="new-text-introduction">{{ bookmark.introduction }}</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="posts">
                        <h3>내 커뮤니티</h3>                        
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-wrapper" v-if="community?.length == 0">
                                    <p>내 커뮤니티가 없습니다</p>
                                </div>
                                <div class="new-card-wrapper" v-else>                                    
                                    <!-- 새 커뮤니티 카드 박스 -->
                                    <router-link :to="`/community/detail/${community.communityurl}`" class="new-card-box" v-for="(community, index) in community" :key=index>
                                        <div class="new-card-image">
                                            <img id="new-card-image" v-if="community.image != ''" :src="community.imageurl">
                                            <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">
                                        </div>
                                        <span id="new-text-title" class="new-text-title">{{ community.title }}</span>
                                        <!-- <span id="new-text-region" class="new-text-region">경기</span> -->
                                        <span id="new-text-introduction" class="new-text-introduction community-text">{{ community.introduction }}</span>
                                        <div class="button-box">
                                            <router-link :to="`/community/manage/${community.communityurl}`" class="visit-button" v-if="userid===profile.id">
                                                <span>관리</span>
                                                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                    viewBox="0 0 1024 1024">
                                                    <path
                                                        d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z">
                                                    </path>
                                                </svg>
                                            </router-link>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div> 
                    </div>

                    <div class="community">
                        <h3>내 게시글</h3>
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-wrapper" v-if="feed?.length == 0">
                                    <p>내 게시글이 없습니다</p>
                                </div>
                                <div class="new-card-wrapper" v-else>                                    
                                    <!-- 새 커뮤니티 카드 박스 -->
                                    <router-link :to="`/community/detail/:community_name/feed/${feed.id}`" class="new-card-box" v-for="(feed, index) in feed" :key=index>
                                        <div class="new-card-image">
                                            <img id="new-card-image" v-if="feed.image != null" :src="feed.imageurl">
                                            <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">
                                        </div>
                                        <span id="new-text-title" class="new-text-title">{{ feed.title }}</span>
                                        <!-- <span id="new-text-region" class="new-text-region">경기</span> -->
                                        <span id="new-text-introduction" class="new-text-introduction"><div v-html="feed.content"></div></span>
                                    </router-link>
                                </div>
                            </div>
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
                            <!-- <div class="change" v-if="userid===profile.id">
                                <button class="quit-button"><router-link :to="`/profile/update/${profile.id}`">회원 정보 수정</router-link></button>
                            </div> -->
                            <div class="guestbook-comment" v-if="userid===profile.id">
                                <div class="submit-box">
                                    <router-link :to="`/profile/update/${profile.id}`" class="Btn" @click="editProfile()">수정
                                        <svg class="Btn-svg" viewBox="0 0 512 512">
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

            <div class="sub-area"></div>
                <div class="main-container-book">
                    <div class="sub-input-wrapper">
                        <div class="sub-text-info">
                            <p>방명록 |</p> 
                            <p style="margin-left: 3px;">{{ guestbook_length }}</p>
                        </div>
                        <textarea v-model="inputComment" autocomplete="off" class="input-sub-text" placeholder="여기에 방명록을 입력하세요" @keyup.enter="createComment()"></textarea>
                        <button class="input-button" @click="createComment()">입 력</button>
                    </div>

                    <div class="sub-content-wrapper">
                        <!-- 댓글 1개 묶음 -->
                        <div class="comment-box">
                            <!-- comment 내용 -->
                            <div v-if="guestbook_length === 0">
                                <p>첫 방명록을 작성해 보세요!</p>
                            </div>
                            <div v-else>
                                <div class="comment-card" v-for="(guestbook, index) in guestbook" :key="index">
                                    <li class="comment-author"><router-link :to="`/profile/${guestbook.user}`">{{ guestbook.nickname }}</router-link></li>
                                    <li class="comment-date">작성일 {{ guestbook.created_at.slice(5, 10) }} 수정일 {{ guestbook.updated_at.slice(5, 10) }}</li>
                                    <li class="comment-text">
                                        {{ guestbook.comment }}
                                    </li>
                                    <div class="comment-func-box" v-if="userid===guestbook.user">
                                        <button class="comment-edit-btn" @click="editComment(guestbook.id)">
                                            <svg class="edit-icon" viewBox="0 0 512 512" height="17.5" width="15">
                                                <path
                                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button class="comment-delete-btn" @click="deleteComment(guestbook.id)">
                                            <svg viewBox="0 0 15 17.5" height="17.5" width="15"
                                                xmlns="http://www.w3.org/2000/svg" class="delete-icon">
                                                <path transform="translate(-2.5 -1.25)"
                                                    d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                    id="Fill"></path>
                                            </svg>
                                        </button>
                                    </div>
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
import  {  fetchGuestBook, fetchGuestBookEdit, fetchGuestBookDelete, fetchProfileDelete } from "@/api/index.js";

export default {
    computed: {
        ...mapGetters({"data":"fetchProfile"}),
        profile() {
            return this.data.profile;
        },
        bookmark() {
            return this.data.bookmark;
        },
        community() {
            return this.data.community;
        },
        feed() {
            return this.data.feed;
        },
        guestbook() {
            return this.data.guestbook;
        },
        guestbook_length() {
            return this.guestbook?.length;
        },
    },
    data() {
        return {
            userid: '',
            inputComment: '',
        }
    },
    created() {
        const user_id = this.$route.params.id
        this.$store.dispatch("FETCH_USER_PROFILE", user_id);
    },
    mounted() {
        const payload = localStorage.getItem('payload');
        if (payload) {
            const { user_id } = JSON.parse(payload);
            this.userid = user_id;
        }
    },
    watch:{
        $route() {
            const user_id = this.$route.params.id
            this.$store.dispatch("FETCH_USER_PROFILE", user_id);
        }
    },
    methods: {
        async createComment() {
            try {
                const profile_id = this.$route.params.id;
                const response = await fetchGuestBook(profile_id, this.inputComment)
                if (response.status === 200) {
                    alert('방명록을 작성했습니다.')
                    const user_id = this.$route.params.id
                    this.$store.dispatch("FETCH_USER_PROFILE", user_id);
                    this.inputComment='';
                }
            } catch (error) {
                console.log(error)
            } 
        },
        async editComment(guestbook_id) {
            try {
                const response = await fetchGuestBookEdit(guestbook_id, guestbook_id, this.inputCocomment)
                if (response.status === 201) {
                    alert('방명록 수정이 완료되었습니다.')
                }
            } catch (error) {
                console.log(error)
            } 
        },
        async deleteComment(guestbook_id) {
            try {
                
                const profile_id = this.$route.params.id;
                const response = await fetchGuestBookDelete(profile_id, guestbook_id)
                if (response.status === 204) {
                    console.log(response)
                    const user_id = this.$route.params.id
                    this.$store.dispatch("FETCH_USER_PROFILE", user_id);
                    alert('방명록 삭제가 완료되었습니다.')
                }
            } catch (error) {
                console.log(error)
            } 
        },
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
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            } 
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
.quit-button {
 display: flex;
 /* height: 3em; */
 width: 100px;
 align-items: center;
 justify-content: center;
 background-color: #eeeeee4b;
 border-radius: 3px;
 letter-spacing: 1px;
 transition: all 0.2s linear;
 cursor: pointer;
 border: none;
 background: #fff;
}
.quit-button > svg {
 margin-right: 5px;
 margin-left: 5px;
 font-size: 20px;
 transition: all 0.4s ease-in;
}
.quit-button:hover > svg {
 font-size: 1.2em;
 transform: translateX(-5px);
}
.quit-button:hover {
 box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
 transform: translateY(-2px);
}

/***** 버튼 css *****/
.visit-button {
    display: flex;
    justify-content: left;
    margin-left: -75px;
    margin-top: 80px;
    height: 2.5em;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee4b;
    border-radius: 3px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
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

.bookmark {
    margin: auto;
    margin-top: 40px;
    height: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.posts {
    margin: auto;
    margin-top: 40px;
    height: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.community {
    margin: auto;
    margin-top: 40px;
    height: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}


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


.mypage {
    width: 1200px;
    margin: auto;
    display: grid;
    place-items: start;
    grid-template-rows: (1, 48px);
    grid-template-columns: repeat(9, 680px);
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: auto;
}


.new-card-box:nth-child(1) {
    grid-column: 1 / 5;
}

.new-card-box:nth-child(2) {
    grid-column: span 6;
}


.user {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
}
.user > .guestbook {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    
}
.user > .guestbook > h3::after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 18px;
    margin-left: 8px;
    margin-right: 14px;
    background-color: #9E2067;
}
.user > .guestbook > h4 {
    margin-right: 20px;
}
.user > .input-box {
    margin-right: 84px;;
}
.writer >.user-guestbook {
    position: relative;
    display: flex;
    align-items: center;
    width: 928px; 
    height: 68px;
    margin: 0 auto;
}
.writer > .user-guestbook > .user-writer {
    display: flex;
    align-items: center;
    height: 41px;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
}
.writer > .user-guestbook > .user-writer > h5 {
    margin-left: 12px;
    margin-right: 24px;
}
.writer > .user-guestbook > h6 {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 12px;
    right: 4px;
    margin: auto;
    margin-right: 44px;
}
 .user-guestbook  {
    height: 24px;
    top: 0;
    bottom: 0;
    margin: auto;
 }


 /*.user-guestbook > .submit-box > .create-button {
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 20px 28px 25px;
    font-size: 8px;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #a92278;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
.writer > .guestbook-comment {
    position: relative;
    display: flex;
    align-items: center;
    width: 928px; 
    height: 84px;     
    margin: 0 auto; 
}
.writer > .guestbook-comment > p {
        margin-left: 12px;
}
.writer > .guestbook-comment >.submit-box {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 41px;  
    right: 4px;
    margin: auto;
    margin-right: 44px;
}*/

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



.input-box {
    display: flex;
    justify-content: center;
}
.input-title {
    width: 524px;
    height: 44px;
    margin-right: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}


.create-button {
    margin-right: 30px;
    outline: none;
    border: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: 10px 28px 11px;
    font-size: 14px;
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
/***** 새로운 커뮤니티 area *****/
.new-card-wrapper {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 800px;
}
.new-card-box {
    width: 300px;
    height: 120px;
    margin: 18px 12px 18px 22px;
    padding: 8px;
    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;
    display: grid;
    grid-template-columns: 120px 150px 30px;
    grid-template-rows: 40px auto;
}

.new-card-box:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}
.new-card-image {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}
.new-card-box img {
    height: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    background-size: cover;
    background-repeat: no-repeat;
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
.new-text-region {
    margin-top: 7px;
    font-size: 0.8rem;
    color: #909090;
}.new-text-introduction {
    margin: 0px 8px 6px 15px;
    height: 100%;
    font-size: 0.8rem;
    color: #909090;
    text-indent: 7px;
    line-height: 1.5;
    grid-column: 2/4;
    grid-row: 2;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
}
.community-text{
    height:50% !important ;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
}
.post-card {
  width: 100%;
  max-width: 290px;
  height: 70px;
  background: #353535;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
}
.post-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
}
.post-card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}
.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  color: white;
  font-family: 'Poppins' sans-serif;
}
.textContent {
    width: 140px; 
 white-space: nowrap;
 text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.main-container-book {
    margin: 20px 30px;
    padding: 30px;
}
/* 새 글 쓰기 button */

.Btn {
    margin-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100px;
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

.Btn-svg {
    width: 13px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: white;
    transition-duration: .3s;
}
  
.Btn:hover {
    color: transparent;
}
  
.Btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: .3s;
}
  
.Btn:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
    box-shadow: 2px 2px 0px #6a154b;
}

/* sub-content! 댓글 input area */

.sub-input-wrapper {
    margin: 0px 0px 50px 0px;
    display: grid;

    grid-template-columns: 90px 80% 90px;
    grid-template-rows: 90px;
}

.sub-text-info {
    display: flex;
    grid-column: 1 / 2;
}
.sub-text-info p {
    margin-right: 3px;
    padding-top: 20px;
}

.input-sub-text {
    padding: 0.5rem 0.8rem;
    grid-column: 2 / 3;
    margin: 0 auto;
    width: 92%;

    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0.5rem 0.8rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-sub-text:hover, .input-sub-text:focus, .input {
    outline: none;
    border-color: #9E2070;
}

.input-group:hover, .input:focus {
    color: #9E2070;
}


/* 입력 button area */

.input-button {
    grid-column: 3 / 4;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #a92278;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

.input-button:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
}


/* 댓글 내용 area */

.sub-content-wrapper {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto, 100%);
}

.comment-box {
  display: block;
  list-style-type: none;
  width: auto;
  height: 80px auto;
}
.comment-box div p {
  text-align: center;
}
.comment-card {
  display: grid;
  grid-template-columns: 120px auto 200px;
  grid-template-rows: 30px auto;
  grid-gap: 4px;

  padding: 10px 20px;
  width: auto;
  height: auto;
  background-color: #f7f7f7;
  color: #454545;
  box-shadow: #dddddd 0px -2px 0px inset;
}

.comment-author {
  margin: auto 0;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.comment-date {
  margin-left: auto;
  margin-top: 5px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  font-size: 13px;
}

.comment-text {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.comment-func-box {
  display: flex;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

/* comment 수정 버튼 */

.comment-edit-btn {
  background-color: transparent;
  position: relative;
  border: none;
  margin-left: auto;
  margin-top: auto;
  margin-right: 5px;
}

.comment-edit-btn::after {
  content: "수정";
  white-space: nowrap;
  margin-top: 10px;
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background-color: rgb(34, 64, 115);
  padding: 4px 8px;
  border-radius: 5px;
  transition: 0.2s linear;
  transition-delay: 0.2s;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
}

.edit-icon {
  transform: scale(1.1);
  transition: 0.2s linear;
}

.comment-edit-btn:hover > .edit-icon {
  transform: scale(1.3);
  cursor: pointer;
}

.comment-edit-btn:hover > .edit-icon path {
  fill: rgb(34, 64, 115);
  cursor: pointer;
}

.comment-edit-btn:hover::after {
  visibility: visible;
  opacity: 1;
  top: -160%;
  cursor: pointer;
}

/* comment 삭제 버튼 */

.comment-delete-btn {
  background-color: transparent;
  position: relative;
  border: none;
  margin-top: auto;
}

.comment-delete-btn::after {
  content: "삭제";
  white-space: nowrap;
  margin-top: 10px;
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background-color: rgb(168, 7, 7);
  padding: 4px 8px;
  border-radius: 5px;
  transition: 0.2s linear;
  transition-delay: 0.2s;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
}

.delete-icon {
  transform: scale(1.1);
  transition: 0.2s linear;
}

.comment-delete-btn:hover > .delete-icon {
  transform: scale(1.3);
  cursor: pointer;
}

.comment-delete-btn:hover > .delete-icon path {
  fill: rgb(168, 7, 7);
  cursor: pointer;
}

.comment-delete-btn:hover::after {
  visibility: visible;
  opacity: 1;
  top: -160%;
  cursor: pointer;
}
</style>