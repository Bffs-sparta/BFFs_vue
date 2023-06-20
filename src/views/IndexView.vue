<template>
  <main>
    <div class="visual">
      <div class="inner">
        <div class="title">
          <img src="@/assets/BFF.png" alt="Best Friend Forever" />
        </div>
        <div class="text">
          <h4>당신의 찐친을 만나보세요</h4>
        </div>
      </div>
    </div>
    <!--<section class="head-section">
      <div class="head-area">
          <img id="head_img" src="#" />
          <img id="head_title_img" src="#" />
          <p class="head-title">당신의 찐친을 만나보세요</p>
      </div>
    </section>-->
    <section class="main-section">
      <div class="main-area"></div>
      <div class="main-container">
        <div class="main-title">
          <h3>혼자라서 외롭다면?</h3>
          <router-link to="/meetai" class="main-ai-box">
            <a href="#"> AI BestFriend와 놀기!</a>
            <img src="@/assets/heart_ballon.png" />
          </router-link>
          <div class="main-ai-image-box"></div>
        </div>
      </div>
      <div class="main-container">
        <div class="main-title">
          <div>
            <h3>혼자 놀기</h3>
          </div>
        </div>
        <div class="main-box">
          <div class="card-container" id="profile-card-list">
            <!-- 혼자놀기 카드 박스 -->
            <router-link :to="`/profile/${profile.id}`" class="alone-card-box" v-for="(profile, index) in profile" :key="index">
              <div class="card-image" v-if="profile.profileimageurl.slice(37, 42) === 'kakao'">
                <img :src="profile.profileimageurl.slice(28)" />
              </div>
              <div class="card-image" v-else>
                <img :src="profile.profileimageurl" v-if="profile.profileimage != null"/>
                <img src="@/assets/room_image(5).jpg" v-else />
              </div>
              <div class="card-text">
                <a class="alone-text-title" v-if="profile.introduction != null" >{{ profile.introduction }}</a>
                <a class="alone-text-title" v-else>친구해요 !</a>
              </div>
              <div class="card-subtext">
                <div style="margin-top:10px; margin-right:20px;">
                  <span class="alone-text-content" style="margin-left:20px;">{{ profile.region }} | </span>
                  <span class="alone-text-content">{{ profile.nickname }}</span>
                </div>
                <div class="alone-text-view-box">
                  <img src="@/assets/comment.png" alt="댓글 아이콘 이미지" />
                  <span class="with-text-view-content">{{ profile.bookmark_count }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="main-title">
          <span>
            <h3>같이 놀기</h3>
          </span>
        </div>
        <div class="main-box">
          <div class="with-card-container" id="profile-card-list">
            <!-- 함께 놀기 카드 박스 -->
            <router-link
              :to="`/community/detail/${community.communityurl}`"
              class="with-card-box"
              v-for="(community, index) in community"
              :key="index"
            >
              <div class="with-card-text">
                <span class="with-text-title">{{ community.title }}</span>
                <!-- <span class="with-text-region">서울</span> -->
                <div class="with-card-category">
                  <div
                    class="with-card-category-box"
                    v-for="(category, index) in community.categories"
                    :key="index"
                  >
                    <router-link
                      :to="
                        `/community/${community.communityurl}/category/${
                          category[2]
                        }`
                      "
                      >{{ category[1] }}</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="card-content-wrapper">
                <div class="card-text-image">
                  <div class="with-card-image">
                    <img
                      :src="community.imageurl"
                      v-if="community.image != null"
                    />
                    <img src="@/assets/comu_image(1).jpg" v-else />
                  </div>
                </div>
                <div class="with-card-text-box">
                  <div
                    class="with-card-subtext"
                    v-for="(feed, index) in community.feeds.slice(0, 5)"
                    :key="index"
                  >
                    <div class="with-text-content-box">
                      <router-link
                        :to="
                          `/community/detail/${community.communityurl}/feed/${feed.id}/`
                        "
                        class="with-text-content"
                        >{{ feed.title }}</router-link
                      >
                    </div>
                    <div class="with-text-view-box">
                      <img src="@/assets/view_look.png" />
                      <span class="with-text-view-content">{{
                        feed.view_count
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["fetchAllProfile", "fetchCommunityList"]),
    profile() {
      return this.fetchAllProfile;
    },
    community() {
      return this.fetchCommunityList;
    }
  },
  created() {
    this.$store.dispatch("FETCH_COMMUNITY_LIST");
    this.$store.dispatch("FETCH_ALL_PROFILE");
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
main {
    height: auto;
    min-height: 100%;
    padding-bottom: 70px;
}
* {
  font-family: "Noto Sans KR", sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
p {
  color: #000;
}
img {
  display: block;
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

.main-area {
  width: 1200;
  height: auto;
}
.main-container {
  margin: 20px 0px 20px 0px;
  padding: 30px;
  position: relative;
}

.main-title {
  width: 100%;
  vertical-align: middle;
  height: 50px;
  margin-bottom: 40px;
}

.main-box {
  margin: 30px 40px 40px 30px;
}

.card-container {
  margin-top: 40px;
  height: 300px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}



#profile-card-list::-webkit-scrollbar {
  height: 10px; /* 스크롤 막대의 너비 */
  background-color: #d7c0cd; /* 스크롤 막대의 배경색 */
  border-radius: 10px;
}

#profile-card-list::-webkit-scrollbar-thumb {
  background-color: #9e2067; /* 스크롤 막대의 색상 */
  border-radius: 10px; /* 스크롤 막대의 둥근 모서리 */
}

#profile-card-list::-webkit-scrollbar-thumb:hover {
  background-color: #88326c; /* 스크롤 막대에 마우스를 올렸을 때의 색상 */
}

/***** 혼자 - AI *****/

.main-title h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  float: left;
  color: #555555;
  font-size: 22px;
}
.main-title h3::before {
  content: "";
  display: block;
  float: left;
  margin-right: 6px;
  width: 3px;
  height: 28px;
  background-color: #9e2067;
}
.main-title a {
  padding-left: 110px;
  font-style: italic;
  font-weight: bold;
  color: #9e2067;
  font-size: 25px;
}
.main-ai-box {
  display: flex;
  align-items: center;
  float: left;
  padding: 20px;
  font-weight: 700;
}
.main-ai-box img {
  clear: both;
  margin-left: 10px;
  width: 40px;
  height: auto;
}

/***** 혼자 놀기 *****/
.alone-card-box {
  margin-right: 40px;
  width: 260px;
  height: 280px;
  background: rgb(255, 255, 255);
  border-radius: 0.4em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
  cursor: pointer;
}

.alone-card-box:hover {
  box-shadow: 0 10px 20px 4px rgba(35, 35, 35, 0.1);
}
.card-image {
  margin: 0 auto;
  width: 260px;
  height: 190px;
  display: flex;
  position: relative;
  overflow: hidden;
}
.card-image img {
  position: absolute;
  width: 270px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*****Text*****/
.card-text {
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 240px;
}
.alone-text-title {
  justify-self: center;
  margin-top: 23px;
  margin-left: 20px;
  font-weight: 600;
  font-size: 1.2rem;
  width: 210px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #909090;
}
.card-subtext {
  display: flex;
  justify-content: space-between;
}
.alone-text-content {
  text-align: center;
  margin-top: 10px;
  color: #808080;
  font-weight: 400;
  font-size: 0.9rem;
}
.alone-text-view-box {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-right: 20px;
}
.alone-text-view-box img {
  margin-top: 3px;
  margin-right: 5px;
  align-items: center;
  width: 15px;
  height: 15px;
}
.alone-text-view-content {
  text-align: center;
  margin-left: 70px;
  color: #808080;
  font-weight: 400;
  font-size: 0.9rem;
}

.profile-card-list {
  overflow-y: hidden;
}

/***** 같이 놀기 card area *****/
.with-card-container {
  width: 1200;
  margin-top: 20px;
  /* 그리드로 카드 자리 지정 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, auto));
  grid-template-rows: repeat(auto-fill, minmax(300px, auto));
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
  border: #9e2067, 0.2em solid;
  box-shadow: 0 10px 20px 4px rgba(35, 35, 35, 0.1);
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

.with-card-image > img {
  width: auto !important;
  height: auto !important;
  object-fit: cover;
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
  font-size: 1rem;
  color: #909090;
}
.with-card-container {
  width: 1200;
  /* 그리드로 카드 자리 지정 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, auto));
  grid-template-rows: repeat(auto-fill, minmax(300px, auto));
  row-gap: 10px;
  column-gap: 20px;
}
.with-card-subtext {
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
  font-size: 1rem;
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
.with-text-view-box {
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
  margin-top: 3px;
  width: 20px;
  height: 15px;
}
.with-text-view-content {
  text-align: center;
  color: #808080;
  font-weight: 400;
  font-size: 0.9rem;
}
</style>
