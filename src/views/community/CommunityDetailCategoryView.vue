<template>
    <div>
        <section class="head-section">
            <div class="head-area">
                <!-- 커뮤니티 관련 내용 넣기 -->
                <img id="head_img" class="head_img" src="@/assets/comu_image(2).jpg">
                <div class="headline">
                    <li class="head-title">{{ community_name }} :</li>
                    <li class="head-title">{{ category_name }}</li>
                </div>
                <div class="intro-box">
                    <pre class="head-introduction">{{ introduction }} </pre>
                </div>
                <div class="button-box">
                    <div class="bookmark">
                        <input type="checkbox" id="checkboxInput" @click="addBookmark">
                        <label for="checkboxInput" class="bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" class="svgIcon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
                        </label>
                    </div>
                    <button class="Btn">
                        <router-link :to="`/${communityurl}/write`">
                            글 쓰기
                            <svg class="Btn-svg" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                        </router-link>
                    </button>
                </div>      
            </div>
        </section>
        <section class="category-section">
            <div class="search-category-area">
                <div class="head-category-wrapper">
                    <!-- 커뮤니티 카테고리 -->
                    <ul class="head-category">
                        <div class="category-item-box">
                            여기에 카테고리 넣기
                        </div>
                    </ul>
                </div>
                <!-- 검색 -->
                <div class="search-box">
                    <div class="container-input">
                        <input autocomplete="off" type="text" placeholder="Search" name="text" class="input">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
        <section class="main-section">
            <div class="main-area">
                <div class="main-container">
                    <!-- category list 내용 -->
                    <div class="main-content-wrapper" >
                        <!-- 게시글 1개 -->
                        <div  v-for="feed,index in feeds" :key="index">
                            <router-link :to="`/community/detail/${communityurl}/feed/${feed.id}`">
                                <div class="content-card">
                                    <div class="image-box">
                                        <img class="content-image" src="@/assets/room_image(3).jpg">
                                    </div>
                                    <div class="title-box">
                                        <span class="content-title">{{ feed.title }}</span>
                                    </div>
                                    <p class="author">{{ feed.nickname }}</p>
                                    <p class="content-date">{{ feed.created_at.slice(0,10) }} | {{ feed.created_at.slice(12,19) }}</p>
                                    <div class="view-box">
                                        <img src="@/assets/view_look.png">
                                        <span class="content-count">{{ feed.view_count }}</span> 
                                    </div>
                                    <div class="like-box">
                                        <img src="@/assets/like.png">
                                        <span class="content-count">{{ feed.likes_count }}</span>
                                    </div>
                                    <div class="comment-box">
                                        <img src="@/assets/comment.png">
                                        <span class="content-count">{{ feed.comments_count }}</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="page">
                            <ul class="pagination modal">
                                <li> <a href="#" class="first" @click="numberMove(1)" @click.prevent>≪</a></li>
                                <li> <a href="#" class="arrow left" @click="pageMove(pagination.previous)" @click.prevent>﹤</a></li>
                                <li v-if="pagination.re_before_page"> <a href="#" class="num" @click="numberMove(pagination.re_before_page)" @click.prevent>{{ pagination.re_before_page }}</a></li>
                                <li v-if="pagination.before_page"> <a href="#" class="num" @click="numberMove(pagination.before_page)" @click.prevent>{{ pagination.before_page }}</a></li>
                                <li v-if="pagination.current_page"> <a href="#" class="num active" @click="numberMove(pagination.current_page)" @click.prevent>{{ pagination.current_page }}</a></li>
                                <li v-if="pagination.after_page"> <a href="#" class="num"  @click="numberMove(pagination.after_page)" @click.prevent>{{ pagination.after_page }}</a></li>
                                <li v-if="pagination.re_after_page"> <a href="#" class="num"  @click="numberMove(pagination.re_after_page)" @click.prevent>{{ pagination.re_after_page }}</a></li>
                                <li> <a href="#" class="arrow right" @click="pageMove(pagination.next)" @click.prevent>﹥</a></li>
                                <li> <a href="#" class="last" @click="numberMove(pagination.last_page)" @click.prevent>≫</a></li>
                            </ul>
                        </div>
                        <!-- 페이지네이션 여기서 가져왔습니다! https://m.blog.naver.com/my-thing/220857996642 -->
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchCommunityBookmark } from '@/api/index'
export default {
    data(){
        return{
            bookmark: false,
        }
    },
    computed:{
        ...mapGetters(['fetchCommunityCategoryDetail']),
        community_name(){
            return this.fetchCommunityCategoryDetail.community_title
        },
        category_name(){
            return this.fetchCommunityCategoryDetail.category_name
        },
        introduction(){
            return this.fetchCommunityCategoryDetail.introduction
        },
        pagination(){
            return this.fetchCommunityCategoryDetail?.feed || [];
        },     
        feeds(){
            return this.fetchCommunityCategoryDetail?.feed?.results || [];
        },
        communityurl(){
            return this.$route.params.community_name
        }
    },
    created(){
        const community_name = this.$route.params.community_name
        const category_name= this.$route.params.category_name
        this.$store.dispatch('FETCH_COMMUNITY_CATEGORY_FEED',{community_name,category_name})
    },
    methods:{
        async addBookmark() {
            try {
                const response = await fetchCommunityBookmark(this.community)
                if (response.status == 200) {
                    alert(response.data.msg)
                }
            } catch (error) {
                console.log(error)
            }
        },
        pageMove(url){
            if(url){
                this.$store.dispatch('FETCH_COMMUNITY_CATEGORY_PAGINATION',url)
            }
        },
        numberMove(page){
            if(page == 1){
                const community_name = this.$route.params.community_name
                const category_name= this.$route.params.category_name
                this.$store.dispatch('FETCH_COMMUNITY_CATEGORY_FEED',{community_name,category_name})
            }else{
                const url = this.pagination.url+'?page='+page
                console.log(url)
                this.$store.dispatch('FETCH_COMMUNITY_CATEGORY_PAGINATION',url)
            }
        },
    }
}
</script>
<style scoped>
    body {
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
    color:black;
}
.head-area {
    margin-top: 30px;
    width: 100%;
    height: 220px;
    position: relative;
    background: rgb(0, 0, 0);
    
    display: grid;
    grid-template-columns: 17% 60% 18%;
    grid-row: 20px 30% 50%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.head_img {
    position: absolute;
    min-height: 220px;
    min-width: 500px;
    width: 100%;
    opacity: 0.7;
}

.headline {
    display: flex;
    justify-content: center;
    grid-column: 2/3;
    grid-row: 2/3;
    list-style-type: none;
    margin-top: 30px;
}

.head-title {
    z-index: 1;
    color: white;
    font-size: 36px;    
    word-spacing:5px;
    margin-right: 10px;
}

.intro-box {
    grid-column: 2/3;
    grid-row: 3/4;
    z-index: 1;
    
    width: 90%;
    height: 80px;
    margin: 15px 30px;

    overflow: scroll;
}

.head-introduction {
    white-space:pre-wrap;
    text-align: center;
    justify-content: center;
    color: white;
}

.main-area {
    width: 1200;
    height: auto;
}

.main-container {
    margin: 20px 30px;
    padding: 30px;
}


/***** 버튼 css *****/

.button-box {
    display: flex;
    margin-left: auto;
    margin-top: auto;
    margin-bottom: 10px;

    grid-column: 3 / 4;
    grid-row: 3 / 4;
}

/* 북마크 button css */

.bookmark {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
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
    font-size: 1.3em;
    top: 2px;
}
  
#checkboxInput:checked + .bookmark::before {
    content: "\2713";
    font-size: 1.0em;
    top: 4px;
    color: #ffffff;
}
  
#checkboxInput:checked + .bookmark .svgIcon path {
    fill: rgb(253, 184, 9);
    color: white;
}
  
#checkboxInput:active + .bookmark .svgIcon path {
    fill: rgb(255, 255, 255);
}
  
.bookmark::after {
    content: "";
    background-color: rgba(255, 213, 0, 0.342);
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    z-index: -1;
}
  
#checkboxInput:checked + .bookmark::after {
    animation: puff-out-center .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
    z-index: 1;
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

/* 게시판 ~ search area */

.search-category-area {
    display: grid;
    margin: 10px 40px;
    justify-content: space-between;

    grid-template-columns: 67% 33%;
    background-color: #ffc549;
}

.head-category-wrapper {
    display: flex;
    justify-content: left;
    height: 72px;
    width: auto;
    padding: 10px, 10px, 10px, 10px;
}


/***** search area *****/

.search-box {
    margin-top: 14px;
    margin-left: auto;
    justify-content: center;
    align-items: center;

    grid-column: 2;
}

.container-input {
    position: relative;
}
  
.input {
    width: 150px;
    padding: 10px 0px 10px 30px;
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


/* main-content! list area */
/* main-content! list area */
/* main-content! list area */

.main-content-wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(10, auto);
}

.content-card {
    width: 95%;
    height: 80px;
    padding: 10px;
    margin-bottom: 7px;

    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;

    display: grid;
    grid-template-columns: 130px auto 70px 70px 70px;
    grid-template-rows: 50px 30px;
}
    
.content-card:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}

.image-box {
    width: 130px;
    height: 80px;
    position: relative;

    overflow: hidden;
    justify-content: center;
    align-items: center;
    
    grid-column: 1 / 2;
    grid-row: 1 / 3;
}

.image-box img {
    height: 120%;
    position: absolute;
}

.title-box {
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: auto;

    padding-right: 30px;
    height: 50px;

    white-space:nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
}

.title-box span {
    color: #454545;
    font-size: 1.3rem;
    font-weight: 600;
}

.author {
    color: #909090;
    margin-left: 20px;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
}

.content-date {
    margin: auto 0px ;
    padding-left: 10px;
    color: #909090;
    grid-column: 3 / 6;
    grid-row: 2 / 3; 
}

.view-box{
    display: flex;
    margin: auto;
    align-items: center;
    grid-column: 3 / 4;
    grid-row: 1/2;
}

.view-box img {
    padding-right: 1px;
    width: 25px;
    height: 20px;
}

.like-box{
    display: flex;
    margin: auto;
    align-items: center;
    grid-column: 4 / 5;
    grid-row: 1 / 2;
}

.like-box img {
    padding-right: 4px;
    width: 18px;
    height: 20px;
}

.comment-box{
    display: flex;
    margin: auto;
    align-items: center;
    grid-column: 5 / 6;
    grid-row:1 / 2;
}

.comment-box img {
    padding-right: 4px;
    width: 18px;
    height: 18px;
}

.content-count {
    justify-content: center;
    text-align: center;
    color: #dddddd;
    font-weight: 400;
    font-size: 1.0rem;
    margin-top: 2px;
}


/* pagenation area */

.page {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 50px;
}

.pagination {
    list-style: none;
    display: inline-block;
    padding: 0px;
    margin-top: 20px;
}

.pagination li {
    display: inline;
    text-align: center;
}

.pagination a {
    display: block;
    float: left;
    font-size: 15px;
    text-decoration: none;
    padding: 5px 12px;
    color: #454545;
    line-height: 1.5;
}

.first {
    margin-right: 15px;
}

.last {
    margin-left: 15px;
}

.first:hover, .last:hover, .left:hover, .right:hover {
    color: #ffc549;
}

.pagination a.active {
    cursor: default;
    color: #ffffff;
}

.pagination a:active {
    outline: none;
}

.modat .num {
    margin-left: 3px;
    padding: 0;
    width: 30px;
    height: 30px;
    -moz-border-radius:100%;
    -webkit-border-radius:100%;
    border-radius: 100%;
}


.modal .num:hover {
    background-color: #dddddd;
    color: #ffffff;
}

.modal .num.active, .modal .num:active {
    background-color: #9e2070;
    cursor: pointer;
}

.arrow-left {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right:10px solid #9e2070;
}
</style>