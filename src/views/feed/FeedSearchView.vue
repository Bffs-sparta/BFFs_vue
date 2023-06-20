<template>
    <main>
      <section class="head-section">
        <div class="head-area">
            <!-- 커뮤니티 관련 내용 넣기 -->
            <img id="head_img" class="head_img" src="@/assets/comu_image(2).jpg">
            <div class="headline">
                <li class="head-title">게시글 검색</li>
            </div>
            <div class="button-box">
            </div>      
        </div>
      </section>
      <section class="category-section">
        <div class="search-category-area">
          <!-- 검색 -->
          <div class="search-box">
            <div class="container-input">
              <input type="text" placeholder="Search" name="text" class="input" autocomplete="off" v-model="searchname" @keyup.enter="searchFeed()">
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
            <div class="search-words">
              <p class="search-word1">검색 결과 :</p>
              <p class="search-word2">{{this.searchname}}</p>
              <!--<p class="search-word2" v-else>{{this.$route.params.name}}</p>-->
            </div>
            <!-- category list 내용 -->
            <div class="main-content-wrapper">
              <!-- 게시글 1개 -->
              <div class="content-card" v-for="(feed, index) in feeds" :key=index>
                <div class="image-box">
                  <img class="content-image" src="@/assets/room_image(3).jpg">
                </div>
                <div class="title-box">
                    <span class="content-title">{{ feed.title }}</span>
                </div>
                <p class="author">{{feed.nickname}}</p>
                <p class="content-date">{{ feed.created_at.slice(0,10) }} | {{ feed.created_at.slice(12,19) }}</p>
                <div class="view-box">
                  <img src="@/assets/view_look.png">
                  <span class="content-count">{{feed.view_count}}</span> 
                </div>
                <div class="like-box">
                  <img src="@/assets/like.png">
                  <span class="content-count">{{feed.likes_count}}</span>
                </div>
                <div class="comment-box">
                  <img src="@/assets/comment.png">
                  <span class="content-count">{{feed.comments_count}}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return{
            searchname: '',
        }
    },
    computed: {
        ...mapGetters(['fetchSearchFeed']),
        feeds(){
            return this.fetchSearchFeed.results;
        },
    },
    created() {
        const name = this.$route.params.name
        this.$store.dispatch("search_feed", name);
    },
    methods: {
        searchFeed() {
            const name = this.searchname
            this.$store.dispatch("search_feed", name);
            //this.searchname = '';
        },
    },
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
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
    margin-top: auto;
}

.head-title {
    z-index: 1;
    color: white;
    font-size: 36px;    
    word-spacing:5px;
    margin-right: 10px;
}

.main-area {
    width: 1200;
    height: auto;
}

.main-container {
    margin: 20px 30px;
    padding: 30px;
}


/***** search words area *****/

.search-words {
    display: flex;
}

.search-word1 {
    margin: auto 0;
    font-size: 1.2rem;
    font-weight: 400;
    margin-right: 20px;
    margin-bottom: 60px;
}

.search-word2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 20px;
    margin-bottom: 60px;
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