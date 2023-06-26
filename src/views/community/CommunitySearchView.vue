<template>
    <div>
        <section class="head-section">
            <div class="head-area">
                <!-- 커뮤니티 카테고리 ~ 검색 부분 -->
                <div class="search-category-area">
                    <!-- 검색 -->
                    <div class="search-box">
                        <div class="container-input">
                            <input type="text" placeholder="Search" name="text" class="input" autocomplete="off" v-model="searchname" @keyup.enter="searchCommunity()">
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
            <div class="main-container">
                <div class="search-words">
                    <p class="search-word1">검색 결과 :</p>
                    <p class="search-word2">{{this.searchname}}</p>
                <!--<p class="search-word2" v-else>{{this.$route.params.name}}</p>-->
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
        return{
            searchname: '',
        }
    },
    computed: {
        ...mapGetters(['fetchSearchCommunity']),
        community(){
            return this.fetchSearchCommunity;
        },
    },
    created() {
        const name = this.$route.params.name
        this.$store.dispatch("search_community", name);
    },
    methods: {
        searchCommunity() {
            const name = this.searchname
            this.$store.dispatch("search_community", name)

            if (this.fetchSearchCommunity?.length === 0) {
                alert("찾으시는 검색 결과가 없습니다")
                this.searchname = '';
            }
        },
    },
}
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
.head-title {
    word-spacing:10px;
    letter-spacing:6px;
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
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.container {
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
}

.container svg {
    position: relative;
    top: 0;
    left: 0;
    height: 45px;
    width: 45px;
    transition: all 0.3s;
    fill: #666;
}

.container svg:hover {
    transform: scale(1.1);
}

.container input:checked ~ svg {
    fill: #ffc549;
}


/***** 커뮤니티 카테고리 area *****/

.search-category-area {
    display: grid;
    margin: 5px 5px 5px 5px;
    padding-right: 3%;
    justify-content: space-between;

    grid-template-columns: 70% 30%;
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
.with-text-region {
    margin-top: 10px;
    padding-left: 10px;
    align-items: center;
    display: flex;
    font-weight: 450;
    font-size: 1.0rem;
    color: #909090;
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

.bookmark {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1%;
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