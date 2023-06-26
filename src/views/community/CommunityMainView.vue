<template>
<div>
    <section class="head-section">
        <div class="head-area">
            <!-- 커뮤니티 카테고리 ~ 검색 부분 -->
            <div class="search-category-area">
                <div class="head-category-wrapper">
                    <!-- 커뮤니티 카테고리 -->
                    <ul class="head-category">
                        <div class="category-item-box">
                            <li class="category-item" v-for="(community, index) in community" :key=index>
                                <router-link type="button" class="nav-link" :to="`/community/detail/${community.communityurl}`">{{community.title}}</router-link>
                            </li>
                        </div>
                    </ul>
                </div>
                <!-- 검색 -->
                <div class="search-box">
                    <div class="container-input">
                        <input type="text" placeholder="Community Search" name="text" class="input" autocomplete="off" v-model="searchname" @keyup.enter="searchCommunity()">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-section">
        <div class="main-area"></div>
        <div class="main-container">
            <div class="main-title">
                <h3>| 관심갈지도 몰라요! </h3>
            </div>
            <div class="main-box">
                <!-- 관심-random 카드 섹션 -->
                <div class="random-card-wrapper">
                    <router-link :to="`/community/detail/${newcommunity?.communityurl}`" class="random-card-image-box">
                        <div class="random-comu-info">
                            <h1 id="random-comu-title">{{popularcommunity?.title}}</h1>
                            <p id="randon-comu-introduction">{{popularcommunity?.introduction}}</p>
                        </div>
                        <img id="new-card-image" v-if="popularcommunity?.image != null" :src="popularcommunity?.imageurl">
                        <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">                        
                    </router-link>                    
                    <ul class="random-subtitle">
                        <h4>⭐️ 이 커뮤니티의 인기 글 ⭐️</h4>
                    </ul>
                    <!-- random-comu의 인기 게시글 -->
                    <ul class="random-text-box">
                        <li id="" v-for="(feeds, index) in popularfeeds" :key=index>
                            <router-link :to="`/community/detail/${popularcommunity?.communityurl}/feed/${feeds.id}`" style="width: 300px;">
                                <a class="random-text-content">{{feeds.title}}</a>
                                <div class="random-text-view-box">
                                    <img src="@/assets/view_look.png">
                                    <span class="random-text-view">{{feeds.view_count}}</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="bookmark" style="z-index: 999;">
                        <input type="checkbox" id="checkboxInput">
                        <label for="checkboxInput" class="bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" class="svgIcon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
                        </label>
                    </div>
                    <div class="button-box">
                        <router-link :to="`/community/detail/${newcommunity?.communityurl}`" class="visit-button">
                            <span>방문</span>
                            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                viewBox="0 0 1024 1024">
                                <path
                                    d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z">
                                </path>
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="main-title">
                <h3>| 새로 생긴 커뮤니티 </h3>
            </div>
            <div class="main-box">
                <div v-if="newcommunity?.length == 0">
                    <p>새로운 커뮤니티가 없습니다</p>
                </div>
                <div class="new-card-wrapper" v-else>
                    <!-- 새 커뮤니티 카드 박스 -->
                    <router-link :to="`/community/detail/${newcommunity?.communityurl}`" class="new-card-box" v-for="(newcommunity, index) in newcommunity" :key=index>
                        <div class="new-card-image">
                            <img id="new-card-image" v-if="newcommunity.image != null" :src="newcommunity.imageurl">
                            <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">
                        </div>
                        <span id="new-text-title" class="new-text-title">{{ newcommunity.title }}</span>
                        <!-- <span id="new-text-region" class="new-text-region">경기</span> -->
                        <span id="new-text-introduction" class="new-text-introduction">{{ newcommunity.introduction }}</span>
                    </router-link>

                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="main-title2">
                <span>
                    <h3>| 내가 같이 놀고 있어요!</h3>
                </span>
            </div>
            <div class="main-box">
                <div class="with-card-container" id="profile-card-list">
                    <!-- 함께 놀기 카드 박스 -->
                    <router-link :to="`/community/detail/${community.communityurl}`" class="with-card-box"
                        v-for="(community,index) in community" :key="index">
                        <div class="with-card-text">
                            <span class="with-text-title">{{ community.title }}</span>
                            <!-- <span class="with-text-region">서울</span> -->
                            <div class="with-card-category">
                                <div class="with-card-category-box" v-for="category,index in community.categories"
                                    :key="index">
                                    <router-link :to="`/community/${community.communityurl}/category/${category[1]}`">{{
                                        category[1] }}</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="card-content-wrapper">
                            <div class="card-text-image">
                                <div class="with-card-image">
                                    <img :src="community.imageurl" v-if="community.image != null" />
                                    <img src="@/assets/comu_image(1).jpg" v-else />
                                </div>
                            </div>
                            <div class="with-card-text-box">

                                <div class="with-card-subtext" v-for="(feed,index) in community.feeds.slice(0, 5)"
                                    :key="index">
                                    <div class="with-text-content-box">
                                        <router-link :to="`/community/detail/${community.communityurl}/feed/${feed.id}/`" class="with-text-content">{{ feed.title }}</router-link>
                                    </div>
                                    <div class="with-text-view-box">
                                        <img src="@/assets/view_look.png" />
                                        <span class="with-text-view-content">{{ feed.view_count }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            searchname: "",
        }
    },
    computed: {
        ...mapGetters(["fetchCommunityList"]),
        community() {
            return this.fetchCommunityList;
        },
        newcommunity() {
            if (Array.isArray(this.fetchCommunityList) && this.fetchCommunityList.length > 0) {
                return [...this.fetchCommunityList].sort((a, b) => new Date(b.id) - new Date(a.id));
            } else {
                return null; // 또는 다른 적절한 기본 값
            }
        },
        popularcommunity() {
            if (Array.isArray(this.fetchCommunityList) && this.fetchCommunityList.length > 0) {
                return [...this.fetchCommunityList].sort((a, b) => new Date(b?.bookmarked) - new Date(a?.bookmarked))[0];
            } else {
                return null; // 또는 다른 적절한 기본 값
            }

        },
        popularfeeds() {
            if (Array.isArray(this.fetchCommunityList) && this.fetchCommunityList.length > 0) {
                return [...this.fetchCommunityList].sort((a, b) => new Date(b.bookmarked) - new Date(a.bookmarked))[0].feeds.sort((a, b) => new Date(b.view_count) - new Date(a.view_count)).slice(0, 3);
            } else {
                return null; // 또는 다른 적절한 기본 값
            }
        },
    },
    created() {
        this.$store.dispatch("FETCH_COMMUNITY_LIST");
    },    
    methods: {
        searchCommunity() {
            this.$router.push(`/community/search/${this.searchname}`)
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

.head-area {
    width: 100%;
    height: 50px;
    position: relative;
}

.head-area p {
    margin-top: 300px;
    text-align: center;
    color: white;
    font-size: 25px;    
}
.main-area {
    width: 1200;
    height: auto;
}
.main-container {
    margin: 20px 0px 20px 0px;
    padding: 30px;
    position: relative
}
.main-box {
    margin-left: 20px;
}
/***** 분류 글씨체, 크기 등 *****/
.main-title {
    width:100%;
    vertical-align:middle;
}
.main-title h3 {
    padding-left: 20px;    
    color: #707070;
    font-size: 20px;
}
.main-title2 {
    width:100%;
    vertical-align:middle;
}
.main-title2 h3 {
    padding-left: 20px;    
    color: #707070;
    font-size: 22px;
}
/***** 버튼 css *****/
.visit-button {
    display: flex;
    justify-content: left;
    margin-left: 20px;
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
    background: #9E2067;
}
.visit-button > span {
    font-size: 14px;
    font-weight: 600;
    color: white;
}
.visit-button > svg {
    margin-right: 5px;
    margin-left: 5px;
    transition: all 0.4s ease-in;
    transform: rotate(180deg);
    fill: white;
}
   
.visit-button:hover > svg {
    font-size: 1.5em;
    transform: translateX(4px) rotate(180deg);
    fill: white;
}
.visit-button:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-3px);
}
/***** 북마크 버튼 css *****/


/***** 커뮤니티 카테고리 area *****/

.search-category-area {
    display: grid;
    margin: 5px 5px 5px 5px;
    padding-right: 3%;
    justify-content: space-between;

    grid-template-columns: 70% 30%;
}

.head-category-wrapper {
    display: flex;
    justify-content: left;
    height: 72px;
    width: auto;
    padding: 10px, 10px, 10px, 10px;
}

.head-category {
    display: block;
    min-width: 100px;
    overflow: hidden;
}

.category-item-box {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    max-width: 100%;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
}

.category-item-box::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.category-item {
    flex: 0 0 auto;
    margin-right: 8px;
    padding: 10px 12px;
    outline: none;
    border: none;

    font-size: 16px;
    font-weight: 650;
    white-space: nowrap;
    background-color: #909090;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);

    list-style-type: none;
    cursor: pointer;
}

.category-item:hover {
    background-color: #707070;
    transition: all ease 0.5s;
}

.category-item a {
    text-decoration-line: none;
    color: white;
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


/***** 랜덤 커뮤니티 area *****/

.random-card-wrapper {
    display: grid;
    grid-template-columns: 43% 40px 2% 30% 20%;
    grid-template-rows: 50px 110px 40px;
}
.random-card-image-box {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    grid-column: 1 / 3;
    grid-row: 1 / 5;

    transition: transform 1s;
    /*filter: brightness(70%);*/
    transition: all ease 0.5s;
}
.random-card-image-box img {
    min-height: 200px;
    min-width: 200px;
    /*filter: brightness(70%);*/
    z-index: 2;
}

.random-card-image-box:hover img {
    filter: brightness(70%);
    z-index: 0;
}
/* .random-card-image-box:hover {
    transition: transform 1s;
    filter: brightness(70%);
    transition: all ease 0.5s;
}
.random-comu-info:hover {
    opacity: 1;
    filter: brightness(100%);
    z-index: 1;
}*/
.random-comu-info {
    position: absolute;
    color: white;
    z-index: 1;

    /*opacity: 0;*/
    display: inline-block;
    justify-content: center;
    text-align: center;
    margin: 20px 80px;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
}
.random-comu-info h1 {
    color: white;
}
.random-comu-info p {
    justify-content: center;
    text-overflow: ellipsis;
    overflow: hidden;
    color: white;
}
.random-subtitle {
    color: #9E2067;
    margin-top: auto;
    grid-column: 4 / 6;
    grid-row: 1 / 2;
}

.random-text-box {
    margin-top: 2px;
    grid-column: 4 / 6;
    grid-row: 2 / 3;
}
.random-text-box li {    
    display: flex;
    line-height: 2.0;
    list-style-type: none;
}
.random-text-view-box{
    display: flex;
    margin-left: 50px;
}
.random-text-content {
    margin-left: 10px;
    width: 240px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #808080;
    font-weight: 400;
    font-size: 1.0rem;
}
.random-text-view-box {
    display: flex;
    float: right;
    margin-top: 3px;
}
.random-text-view-box img {
    text-align: center;
    width: 20px;
    height: 15px;
    margin-top: 5px;
}
.random-text-view {
    text-align: left;
    color: #808080;
    font-weight: 400;
    font-size: 0.9rem;
}

.button-box {
    grid-column: 5 / 6;
    grid-row: 3 / 4;
}

/* 북마크 button css */

.bookmark {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    grid-column: 2 / 3;
    grid-row:1 / 2;
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
/***** 새로운 커뮤니티 area *****/
.new-card-wrapper {
    display: flex;
    justify-content: flex-start;
    padding: 20px 10px;
    overflow-x: auto;
    overflow-y: hidden;
}

/* 스크롤 막대 스타일링 */
.new-card-wrapper::-webkit-scrollbar {
  height: 10px; /* 스크롤 막대의 너비 */
  background-color: #D7C0CD; /* 스크롤 막대의 배경색 */
  border-radius: 10px;
}

.new-card-wrapper::-webkit-scrollbar-thumb {
  background-color: #9E2067; /* 스크롤 막대의 색상 */
  border-radius: 10px; /* 스크롤 막대의 둥근 모서리 */
}

.new-card-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #88326C; /* 스크롤 막대에 마우스를 올렸을 때의 색상 */
}

/* 가로 스크롤 가능한 영역의 배경색 
.new-card-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);  배경색 
  z-index: -1;
}*/

.new-card-box {
    width: 300px;
    height: 120px;
    margin-right: 30px;
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
    margin: 0px 8px 6px 15px;
    height: 100%;
    font-size: 0.8rem;
    color: #909090;
    text-indent: 7px;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    grid-column: 2/4;
	grid-row: 2;
}
/***** 같이 놀기 card area *****/

.with-card-container {
    width: 1200;
    margin-top: 20px;
    /* 그리드로 카드 자리 지정 */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, auto));
    grid-template-rows:repeat(auto-fill, minmax(300px, auto));  
    row-gap: 10px;
	column-gap: 20px;
}

.with-card-box {
    width: 480px;
    height: 270px;
    margin-bottom: 20px;

    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;
}
.with-card-box:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}
.with-card-text {
    display: flex;
    margin-bottom: 15px;
}
.card-content-wrapper {
    display: flex;
    justify-content: space-between;
}
.card-text-image img {
    width: 100%;
}
.with-card-image {
    margin-left: 20px;
    width: 260px;
    height: 190px;
    display: flex;
    position: relative;
    overflow: hidden;
}
.with-text-title {
    margin-top: 10px;
    padding-left: 30px;
    width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.3rem;
    color: #707070;
}
.with-card-subtext{
    display: flex;
    margin-top: 14px;
    justify-content: center;
    text-align: center;
}
.with-card-text-box {
    padding-right: 20px;
}
.with-card-category {
    margin-left: 45px;
    margin-right: 10px;
    display: flex;
}
.with-card-category-box {
    align-items: center;
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
    font-weight: 450;
    font-size: 1.0rem;
    color: #909090;
    cursor: pointer;
}
.with-text-content-box {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 120px; 
}
.with-text-view-box{
    display: flex;
    margin-top: 2px;
}
.with-text-content {
    text-align: center;
    margin-left: 10px;
    color: #808080;
    font-weight: 400;
    font-size: 0.9rem;
}
.with-card-subtext img {
    text-align: center;
    width: 20px;
    height: 15px;
}
.with-text-view-content {
    text-align: center;
    color: #808080;
    font-weight: 400;
    font-size: 0.9rem;
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
</style>