<template>
    <main>
        <section class="head-section">
            <div class="head-area">
                <!-- 커뮤니티 관련 내용 넣기 -->
                <div class="image-box">
                    <img v-if="community?.image !== null" id="head_img" class="head_img" :src="community?.imageurl">
                    <img v-else id="head_img" class="head_img" src="@/assets/comu_image(2).jpg">
                </div>
                <p class="head-title">{{ community?.title }} | {{ community?.communityurl }}</p>
                <div class="button-box">
                    <div class="bookmark">
                        <input v-if = "hasAccessToken" type="checkbox" id="checkboxInput" @click="addBookmark" :checked="bookmark"/>
                        <input v-else type="checkbox" id="checkboxInput" @click.prevent.prevent="notlogin" :checked="bookmark"/>
                        <label for="checkboxInput" class="bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"
                                class="svgIcon">
                                <path
                                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z">
                                </path>
                            </svg>
                        </label>
                    </div>
                    <router-link :to="`/${this.community_name}/write`">
                        <button class="Btn">글 쓰기
                            <svg class="Btn-svg" viewBox="0 0 512 512">
                                <path
                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                </path>
                            </svg>
                        </button>
                    </router-link>
                </div>
            </div>
        </section>
        <section class="body-section">
            <section class="category-section">
                <div class="search-category-area">
                    <div class="head-category-wrapper">
                        <ul class="head-category">
                            <div class="category-item-box">
                                <router-link v-for="categories,index in categories"
                                        :key="index" :to="`/community/${community_name}/category/${categories[2]}`">{{
                                            categories[1] }}</router-link>
                            </div>
                            <router-link :to="`/community/manage/${community.communityurl}`" class="visit-button" v-if="adminids.includes(userid)">
                                <span>관리</span>
                                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                    viewBox="0 0 1024 1024">
                                    <path
                                        d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z">
                                    </path>
                                </svg>
                            </router-link>
                        </ul>
                    </div>
                </div>
            </section>
            <div class="limit">
                <div class="limits">
                    <h3>우리 커뮤니티의 금지어</h3>
                    <div class="input-box">
                        <div class="forbidden-wrapper">
                            <div v-if = "forbiddens.length != 0">
                                <a v-for="(forbidden, index) in forbiddens" :key="index">   #{{ forbidden }} </a>
                            </div> 
                            <div v-else>
                                해당 커뮤니티의 금지어가 없습니다.   
                            </div>           
                        </div>
                    </div>

                    <h3>우리 커뮤니티의 관리자</h3>
                    <div class="member-area-admin">
                        <div class="member-menu">
                            <div class="member-content1">
                                <span class="realname1">이름</span>
                                <span class="nickname1">닉네임</span>
                                <span class="feed1">메인 관리자</span>
                                <span class="subadmin1">서브 관리자</span>
                            </div>
                        </div>
                        <!-- 멤버 리스트 -->
                        <div v-if="admins.length != 0">
                            <div class="member-list" v-for="admin,index in admins" :key="index">
                                <ul class="member-content">
                                    <li id="realname">{{ admin.name }}</li>
                                    <li id="nickname">{{ admin.nickname }}</li>
                                    <li id="feed">
                                        <img v-if="admin.is_comuadmin" id="checked" src="@/assets/checked.png">
                                    </li>
                                    <li id="subadmin">
                                        <img v-if="admin.is_subadmin" id="checked" src="@/assets/checked.png"> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div v-else>

                        </div>
                    </div>
                </div>
            </div>
            <section class="container">
                <div class="post-list" v-if="popularfeeds == null">
                    <section class="main-section">
                        <div class="main-container">
                            <div class="subtitle">
                                <h3>아직 게시글이 없습니다</h3>
                            </div>
                        </div>
                    </section>                
                </div>
                <div class="post-list" v-else>
                    <section class="main-section">
                        <div class="main-container">
                            <div class="subtitle">
                                <h2>인기 많은 게시글</h2>
                            </div>
                        </div>
                    </section>

                    <section class="newpost" v-if="popularfeeds">
                        <div class="posts" v-for="(feed, index) in popularfeeds" :key="index">
                            <router-link :to="`${community_name}/feed/${feed.id}`" class="card">
                                <div class="header">
                                    <div class="image">
                                        <img :src="feed.profileimageurl" v-if="feed.profileimage !== null && feed.profileimage.includes('profile_img')"/>
                                        <img :src="feed.profileimageurl.slice(33)" v-else-if="feed.profileimage !== null"/>
                                        <img src="@/assets/unity.png" v-else />
                                    </div>
                                    <div class="title-name">
                                        <p class="title">{{feed.title}}</p>
                                        <router-link :to="`/profile/${feed.user}`" class="name">{{feed.nickname}}</router-link>
                                    </div>
                                </div>
                                <p v-html="feed.content" class="message"></p>
                                <div class="button-group">
                                    <div class="with-text-view-box">
                                        <svg class="icon" width="20" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>
                                        <span class="with-text-view-content">{{feed.likes_count}}</span> 
                                    </div>
                                    <div class="with-text-view-box">
                                        <img src="@/assets/comment.png" alt="댓글 아이콘 이미지">
                                        <span class="with-text-view-content">{{feed.comments_count}}</span> 
                                    </div>
                                    <div class="with-text-view-box">
                                        <img src="@/assets/view_look.png" alt="조회수 아이콘 이미지">
                                        <span class="with-text-view-content">{{feed.view_count}}</span> 
                                    </div>
                                </div>          
                            </router-link>
                        </div>
                    </section>

                    <section class="main-section">
                        <div class="main-container">
                            <div class="subtitle">
                                <h2>새로운 게시글</h2>
                            </div>
                        </div>
                    </section>

                    <section class="newpost" v-if="newfeeds">
                        <div class="posts" v-for="(feed, index) in newfeeds" :key="index">
                            <router-link :to="`${community_name}/feed/${feed.id}`" class="card">
                                <div class="header">
                                    <div class="image">
                                        <img :src="feed.profileimageurl" v-if="feed.profileimage !== null && feed.profileimage.includes('profile_img')"/>
                                        <img :src="feed.profileimageurl.slice(33)" v-else-if="feed.profileimage !== null"/>
                                        <img src="@/assets/unity.png" v-else />
                                    </div>
                                    <div class="title-name">
                                        <p class="title">{{feed.title}}</p>
                                        <router-link :to="`/profile/${feed.user}`" class="name">{{feed.nickname}}</router-link>
                                    </div>
                                </div>
                                <div v-html="feed.content" class="message"></div>
                                <div class="button-group">
                                    <div class="with-text-view-box">
                                        <svg class="icon" width="20" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>
                                        <span class="with-text-view-content">{{feed.likes_count}}</span> 
                                    </div>
                                    <div class="with-text-view-box">
                                        <img src="@/assets/comment.png" alt="댓글 아이콘 이미지">
                                        <span class="with-text-view-content">{{feed.comments_count}}</span> 
                                    </div>
                                    <div class="with-text-view-box">
                                        <img src="@/assets/view_look.png" alt="조회수 아이콘 이미지">
                                        <span class="with-text-view-content">{{feed.view_count}}</span> 
                                    </div>
                                </div>         
                            </router-link>
                        </div>
                    </section>
                </div>
            </section>
        </section>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchCommunityBookmark } from "@/api/index.js";
import bus from "@/utils/bus.js";
export default {
    data(){
        return{
            userid: '',
        }
    },
    computed: {
        ...mapGetters(["fetchCommunityDetail"]),
        community_name() {
            return this.$route.params.name;
        },
        community() {
            return this.fetchCommunityDetail.data;
        },
        categories() {
            return this.fetchCommunityDetail.data?.categories || [];
        },
        forbiddens(){
            if(this.fetchCommunityDetail.data?.forbiddenword){
                return this.fetchCommunityDetail.data?.forbiddenword
            }else{
                return []
            }
        },
        admins(){
            return this.fetchCommunityDetail.data?.admin || [];
        },
        adminids(){
            const adminIds = [];
            const adminList = this.fetchCommunityDetail.data?.admin
            if(adminList) {
                for (const admin of adminList) {
                    adminIds.push(admin.user_id);
                }
            }

            return adminIds;
        },
        popularfeeds(){
            if (Array.isArray(this.fetchCommunityDetail.data?.feeds) && this.fetchCommunityDetail.data?.feeds.length > 0) {
                return [...this.fetchCommunityDetail.data?.feeds].sort((a, b) => new Date(b.view_count) - new Date(a.view_count)).slice(0, 4);
            } else {
                return null;
            }
        },
        newfeeds(){
            if (Array.isArray(this.fetchCommunityDetail.data?.feeds) && this.fetchCommunityDetail.data?.feeds.length > 0) {
                return [...this.fetchCommunityDetail.data?.feeds].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);
            } else {
                return null;
            }
        },
        bookmark: {
            get(){
                return this.fetchCommunityDetail?.data?.is_bookmarked;
            },
            set(value){
                this.fetchCommunityDetail.data.is_bookmarked = value;
            }
        },
        hasAccessToken(){
            return localStorage.getItem('access_token');
        },
    },
    watch: {
        $route(to) {
            const community_name = to.params.name
            this.$store.dispatch("FETCH_FEED_LIST", community_name);
            this.$store.dispatch("FETCH_COMMUNITY_DETAIL", community_name);
        }
    },
    created() {
        const community_name = this.$route.params.name
        this.$store.dispatch("FETCH_FEED_LIST", community_name);
        this.$store.dispatch("FETCH_COMMUNITY_DETAIL", community_name);
    },
    mounted() {
        const payload = localStorage.getItem('payload');
        if (payload) {
            const { user_id } = JSON.parse(payload);
            this.userid = user_id;
        }
    },
    methods: {
        async addBookmark() {
            try {
                const response = await fetchCommunityBookmark(
                    this.community_name
                );
                if (response.status == 200) {
                    this.bookmark = !this.bookmark;
                    this.snotify('success',response.data.message);
                }
            } catch (error) {
                if (error.response.status === 401) {
                    this.snotify('error',"로그인을 해주세요");
                }
            }
        },
        notlogin(){
            this.snotify('error','로그인을 해주세요')
        },
        snotify(type,message){
            bus.$emit('showSnackbar',{
                type,
                message
            });
        }
    },
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

main {
    height: auto;
    min-height: 100%;
    /*padding-bottom: 70px;*/
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

h3 {
    color: #454545;
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
.body-section{
    max-width:1700px;
    margin: 0 auto;
}
.category-section {
    max-width: 700px;
    margin: 0 auto;
}

.head-category-wrapper {
    position: relative;
}

.head-category {
    margin-left: -40px;
    display: flex;
    align-items: center;
}

.category-item-box {
    display: flex;
}
.category-item-box a {
    margin-right: 20px;
    font-size: 24px;
    font-weight: 700;
    color: #707070;
}

/***** textarea css area *****/

.input-box {
    display: flex;
    justify-content: center;
    width: 700px;
}

.input-box textarea {
    color: #909090;
}

.input-box-forbidden {
    display: block;
    justify-content: center;
    width: 700px;
}

.forbidden-wrapper {
    width: 100%;
    height: 100px;
    border-radius: 0.5rem;
    padding: 20px;
    background-color: #05060f0a;
    color: #909090;
}

.forbidden-wrapper a svg:hover {
    transform: scale(1.2);
    cursor: pointer;
}


.member-area-admin {
    width: 660px;
    height: 190px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
    overflow:scroll;
    position: relative;
}

.member-menu {
    height: 20px;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;  
    overflow: auto;
    position: sticky;
}

.member-content1 {
    color : #dddddd; 
    font-weight: 700;
    font-size: 0.9rem;
}

.member-content1 span {
    float: left;
    margin-left: 60px;
    margin-right: 20px;
}

.feed1 {
    padding-left: 25px;
    width: 120px;
}

.memeber-list {
    display: flex;
    vertical-align: middle;
}
.member-content {
    list-style-type: none;
    float: left;
    color : #909090; 
    font-size: 0.9rem;
    margin-block-start: 0.3em;
    margin-block-end: 0.5em;   
}

.member-content li {
    float: left;
    margin-right: 10px;
    padding-left: 15px
}

#realname {
    width: 90px;
}

#nickname {
    width: 90px;
}

#feed {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 45px;
}

#subadmin {
    width: 20px;
    padding-left: 263px;
}

.button-box {
    cursor: pointer;
}

.head-area {
    width: 100%;
    height: 150px;
    position: relative;
    overflow: hidden;
    background: rgb(0, 0, 0);

    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100px 50px;
}

.image-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    grid-column: 1 / 3;
    grid-row: 1 / 3;
}

.head_img {
    min-height: 150px;
    min-width: 500px;
    width: 100%;
    opacity: 0.7;
}

.head-title {
    margin-left: auto;
    margin-right: 40px;
    text-align: right;
    color: white;
    z-index: 1;
    font-size: 26px;    
    word-spacing:5px;
    letter-spacing:5px;
    
    grid-column: 2 / 3;
    grid-row: 1 / 2;
}

/***** 버튼 css *****/

.button-box {
    display: flex;
    margin-left: auto;
    margin-right: 40px;

    grid-column: 2 / 3;
    grid-row: 2 / 3;
}


.main-area {
    width: 1200;
    height: auto;
}

.main-container {
    margin: 20px 30px;
    padding: 0px 30px;
    padding-top: 30px;
}


/* 북마크 button css */

.bookmark {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    margin-right: 10px;
    margin-left: auto;

}
  
#checkboxInput {
    display: none;
}
  
.svgIcon {
    height: 35px;
}
  
.svgIcon path {
    fill: rgb(255, 255, 255);
}
  
.bookmark::before {
    content: "\002B";
    position: absolute;
    color: #909090;
    font-size: 1.2em;
    bottom: 7px;
}
  
#checkboxInput:checked + .bookmark::before {
    content: "\2713";
    font-size: 1.1em;
    top: 1px;
    color: #ffffff;
}
  
#checkboxInput:checked + .bookmark .svgIcon path {
    fill: rgb(253, 184, 9);
    color: white;
}
#checkboxInput:checked + .bookmark::after {
    animation: puff-out-center .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
    z-index: 1;
}
#checkboxInput:active + .bookmark .svgIcon path {
    fill: rgb(255, 255, 255);
}
  
.bookmark::after {
    content: "";
    background-color: rgba(255, 183, 0, 0.788);
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    z-index: -1;
}
  
@keyframes puff-out-center {
    0% {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
    }   
  
    100% {
      transform: scale(9);
      filter: blur(1px);
      opacity: 0;
    }
}

/* 새 글 쓰기 button */

.Btn {
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
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
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

/* 금지어, 관리자 폼 */

.limit {
    display: flex;
    justify-content: center;
    align-items: center;
}

.member-area {
    width: 444px;
    height: 48px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
    overflow:scroll;
    position: relative;
}

.member-menu {
    height: 20px;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;  
    overflow: auto;
    position: sticky;
}

.member-content {
    list-style-type: none;
    float: left;
    color : #909090; 
    font-size: 0.9rem;
}

.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 140px 0;
}

.post-list {
    margin: auto 24px;
    border:4px solid  #D7C0CD;
}

.posts {
    margin: auto 24px;
    margin-bottom: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
  background-color: rgba(243, 244, 246, 1);
  padding: 2rem;
  max-width: 320px;
  border-radius: 10px;
  box-shadow: 0 20px 30px -20px rgba(5, 5, 5, 0.24);
}

.newpost {
    margin: auto;
    margin-top: 40px;
    height: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

/* 좋아요, 채팅, 조회수 버튼 이미지 아이콘*/

.card {
  background-color: rgba(243, 244, 246, 1);
  padding: 2rem;
  max-width: 280px;
  max-height: 390px;
  border-radius: 10px;
  box-shadow: 0 20px 30px -20px rgba(5, 5, 5, 0.24);
}

.card > .button-group {
    display: flex;
    float: right;
    align-items: center;
}

.card  > .button-group > img {
    width: 20px;
    height: 15px;
}

.card  > .button-group > .with-text-view-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
}

.card >.button-group > .with-text-view-box > img {
    text-align: center;
    width: 20px;
    height: 15px;
}

.with-text-view-box span {
    margin-left: 5px;
}

.header {
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  gap: 1rem;
}

.header .image {
    position: relative;
    overflow: hidden;
  height: 64px;
  width: 64px;
  border-radius: 9999px;
}
.header .image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
  object-fit: cover;
}

.title-name {
    width: calc(100% - 64px - 1rem);
}
.title {
  margin-top: 0.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, 1);
  height: 28px;
  overflow: hidden;
}

.name {
  margin-top: 0.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, 1);
}

.message {
    width: 280px;
    height: 250px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: 1rem;
    color: rgba(107, 114, 128, 1);
}

.message >>> img {
    width: 320px !important;
    height: 310px!important;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
}



.message >>>  p {
  width: 328px;
  color: #707070;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  position: relative;
}

.btn:hover > .icon {
  transform: scale(1.2);
  cursor: pointer;
  transition: .2s linear;
}

.btn:focus > .icon {
  fill: #fd1853;
  animation: grosseur .2s linear;
}

@keyframes grosseur {
  0% {
    width: 50px;
    height: 50px;
    fill: #fd1853;
  }

  100% {
    width: 30px;
    height: 30px;
    fill: #fd1853;
  }
}

/***** 버튼 css *****/
.visit-button {
    display: flex;
    height: 3em;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee4b;
    border-radius: 3px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
    position: absolute;
    right: 0;
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
    transform: translateY(-3px);
}
</style>