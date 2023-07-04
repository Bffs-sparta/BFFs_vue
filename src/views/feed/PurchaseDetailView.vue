<template>
  <div>
    <main>
      <section class="head-section">
        <div class="head-area">
          <!-- 커뮤니티 관련 내용 넣기 -->
          <div class="image-box">
            <img id="head_img" class="head_img" src="@/assets/comu_image(2).jpg"/>
          </div>
          <router-link :to="`/community/detail/${communityurl}`" class="head-title">{{ community?.title }} | {{ community?.communityurl }}</router-link>
          <div class="button-box">
            <div class="bookmark">
              <input v-if = "hasAccessToken" type="checkbox" id="checkboxInput" @click="addBookmark" :checked="bookmark"/>
              <input v-else type="checkbox" id="checkboxInput" @click.prevent.prevent="notlogin" :checked="bookmark"/>
              <label for="checkboxInput" class="bookmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 384 512"
                  class="svgIcon"
                >
                  <path
                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                  ></path>
                </svg>
              </label>
            </div>
            <router-link :to="`/${community?.communityurl}/write`">
              <button class="Btn">
                글 쓰기
                <svg class="Btn-svg" viewBox="0 0 512 512">
                  <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                  ></path>
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
              <!-- 커뮤니티 카테고리 -->
              <ul class="head-category">
                <div class="category-item-box">
                  <h2 style="color: #909090;">
                    카테고리명 : {{ feed?.category_name }}
                  </h2>
                </div>
              </ul>
            </div>
            <!-- 검색 -->
            <div class="search-box">
              <div class="container-input">
                <input autocomplete="off" type="text" placeholder=" Feed Search" name="text" class="input" v-model="searchname" @keyup.enter="searchFeed()"/>
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section class="main-section">
          <div class="main-area">
            <div class="main-container">
              <!-- 게시 글 내용 전체 -->
              <div class="main-content-wrapper" v-if="feed">
                <span class="content-status" style="color:#9E2067;">[{{ feed.grouppurchase_status }}]</span>
                <h2 class="main-title">{{ feed.title }}</h2>
                <div class="content-button-box">
                    <div class="content-view-box">
                        <img src="@/assets/view_look.png">
                        <span class="text-view-content">{{ feed.view_count }}</span> 
                    </div>
                    <!-- 글 쓴 사용자만 // 종료시킬때 경고창으로 한 번 더 확인하기 -->
                    <button v-if="feed.user === this.userid" class="ended-button" @click="endPurchase()">{{ feed.is_ended ? '종료된 공구' : '공구 종료하기' }}</button> 
                </div>
                <div class="content-info-box">
                    <!-- 작성자 프로필로 이동 -->
                    <a>{{ feed.nickname }}</a>
                    <li>{{ feed?.created_at?.slice(0, 10) + " " + feed?.created_at?.slice(11, 19) }}</li>
                </div>
                <div class="main-content">
                    <div v-html="feed.content"></div>
                    <div class="purchase-form-box">
                        <div class="purchase-form">
                            <li class="product-name-part">이름</li>
                            <li class="product-number-part">구매 수량</li>
                            <li class="link-part">상품 link</li>
                            <li class="open-at-part">모집 시작</li>
                            <li class="close-at-part">모집 끝</li>
                            <li class="person-limit-part">모집 인원 (명)</li>
                            <li class="location-part">만날 위치</li>
                            <li class="meeting-at-part">만날 시간</li>
                            <li class="end-option-part">공구 모집 실패 시</li>

                            <li class="product-name">{{ feed?.product_name }}</li>
                            <li class="product-number">{{ feed?.purchase_quantity }} / {{ feed?.product_number }} 개</li>
                            <li class="link"><a :href="feed.link">{{ feed?.link }}</a></li>
                            <li class="open-at">{{ feed.open_at.slice(0, 10) }} {{ feed.open_at.slice(11, 16) }}</li>
                            <li class="close-at">{{ feed.close_at.slice(0, 10) }} {{ feed.close_at.slice(11, 16) }}</li>
                            <li class="person-limit">{{ feed.joined_user_count }} / {{ feed.person_limit }} 명</li>
                            <li class="location">{{ feed.location }}</li>
                            <li class="meeting-at">{{ feed.meeting_at.slice(0, 10) }} {{ feed.meeting_at.slice(11, 16) }}</li>
                            <li class="end-option">{{ feed.end_choice }}</li>
                            <!-- 지도 api 넣을 예정 -->
                            <div id="map" class="mapping" style="display: none;"></div>
                            <div class="parti-button-box">
                                <button class="party-button" @click="submitOpen()">
                                    <p>Subscribe</p>
                                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="purchase-submit-box" v-if="submitopen">
                        <li class="submit-part" v-if="joined_users_id.includes(userid)">수량 수정</li>
                        <li class="submit-part" v-else>신청 수량</li>
                        <li class="submit-help-text">⚠ 1 이상 입력 가능</li>
                        <input type="number" v-model="submitnumber" min="1" class="purchase-submit-input">
                        <button class="submit-button" @click="grouppurchaseJoin()" v-if="joined_users_id.includes(userid)">수 정</button>
                        <button class="submit-button" @click="grouppurchaseJoin()" v-else>신 청</button>
                    </div>
                </div>

                <div class="main">
                    <ul class="top-bar">
                        <li>
                            <button class="btn minimize" @click="userlistshow=true">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M.3 89.5C.1 91.6 0 93.8 0 96V224 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64V224 96c0-35.3-28.7-64-64-64H64c-2.2 0-4.4 .1-6.5 .3c-9.2 .9-17.8 3.8-25.5 8.2C21.8 46.5 13.4 55.1 7.7 65.5c-3.9 7.3-6.5 15.4-7.4 24zM48 224H464l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192z"></path></svg>
                            </button>
                        </li>
                        <li>
                            <button class="btn close" @click="userlistshow=false">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>
                            </button>
                        </li>
                    </ul>
                    <div class="user-list" v-if="userlistshow">
                        <div class="currentplaying">
                            <p class="heading">공구 참여중인 유저 목록</p>
                        </div>
                        <div class="songs">
                            <router-link :to="`/profile/${user.user}`" class="loader" v-for="user,index in joined_users" :key='index'>
                                <div class="song">
                                    <div class="song-name">
                                        <p class="name">{{ user.nickname }} ({{ user.region }})</p>
                                        <p class="name"><font-awesome-icon :icon="['fas', 'cart-shopping']" /> {{ user.product_quantity }}</p>
                                    </div>
                                    <p class="artist">참여 날짜 : {{ user.created_at.slice(0, 10) }}</p>
                                </div>
                                <div class="albumcover"><img :src="user.profileimage.indexOf('profile_img') ? user.profileimage: 'https://api.makebestie.com/media/'+user.profileimage" alt=""></div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="function-box">
                  <div class="move-box">
                    <router-link :to="`/community/${communityurl}/category/${feed.category_url}`" class="move-button">목록으로</router-link>
                  </div>
                  <div class="like-box">
                    <a v-if="feed.user === this.userid" class="content-edit-button"  @click="editFeed()">글 수정</a>
                    <!-- 본인 -->
                    <a v-if="feed.user === this.userid" class="content-delete-button" @click="deleteFeed()" >글 삭제</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub-area">
            <div class="main-container">
              <div class="sub-input-wrapper">
                <div class="sub-text-info">
                  <p>댓글 |</p>
                  <p v-if="comment &&comment == '아직 댓글이 없습니다'" style="margin-left: 3px;">0</p>
                  <p v-else style="margin-left: 3px;">{{ feed.comment_count }}</p>
                </div>
                <textarea
                  v-model="inputComment"
                  autocomplete="off"
                  class="input-sub-text"
                  placeholder="여기에 댓글을 입력하세요"
                  @keyup.enter="createComment()"
                ></textarea>
                <button class="input-button" @click="createComment()">
                  입 력
                </button>
              </div>
              <div class="sub-content-wrapper">
                <!-- 댓글 1개 묶음 -->
                <div v-if="comment == '아직 댓글이 없습니다'">
                  <p>{{ comment }}</p>
                </div>
                <div v-else>
                  <div class="comment-box"  v-for="(comment, index) in comment" :key="index">
                    <!-- comment 내용 -->
                    <div>
                      <div class="comment-card">
                        <!-- 댓글 수정용 div. display:none; 토글 필요 -->
                        <div class="comment-update-box" v-if="comment.commenteditshow">
                          <div class="comment-update-div">
                            <p>댓글 수정</p>
                            <textarea v-model="inputUpdateComment" class="update-textarea" @keyup.enter="editComment(comment.id)"></textarea>
                            <button type="submit" class="update-submit-button" @click="editComment(comment.id)">수정 완료</button>
                            <button class="update-quit-button" @click="commenteditshow(comment)">취소</button>
                          </div>
                        </div>
  
                        <li class="comment-author">
                          <router-link :to="`/profile/${comment?.user_id}`">{{
                            comment?.nickname
                          }}</router-link>
                        </li>
                        <li class="comment-date">
                          작성일 {{ comment?.created_at?.slice(5, 10) }} 수정일 {{ comment?.updated_at?.slice(5, 10) }}
                        </li>
                        <li class="comment-text">
                          {{ comment.text }}
                        </li>
                        <div
                          class="comment-func-box"
                          v-if="userid === comment.user_id"
                        >
                          <button
                            class="comment-edit-btn"
                            @click="commenteditshow(comment)"
                          >
                            <svg
                              class="edit-icon"
                              viewBox="0 0 512 512"
                              height="17.5"
                              width="15"
                            >
                              <path
                                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            class="comment-delete-btn"
                            @click="deleteComment(comment)"
                          >
                            <svg
                              viewBox="0 0 15 17.5"
                              height="17.5"
                              width="15"
                              xmlns="http://www.w3.org/2000/svg"
                              class="delete-icon"
                            >
                              <path
                                transform="translate(-2.5 -1.25)"
                                d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                id="Fill"
                              ></path>
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
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bus from '@/utils/bus.js'
import {
fetchCommunityBookmark,
fetchGroupPurchaseJoin,
fetchGroupPurchaseDelete,
fetchGroupPurchaseSelfEnd,
fetchGroupPurchaseCommentCreate,
fetchGroupPurchaseCommentEdit,
fetchGroupPurchaseCommentDelete,
} from "@/api/index.js";

export default {
  computed: {
      ...mapGetters({ data: "fetchGroupPurchaseDetail" }),
      feed() {
          return this.data?.grouppurchase;
      },
      community() {
          return this.data?.community;
      },
      communityurl() {
          return this.data?.community?.communityurl;
      },
      bookmark() {
          return this.community?.is_bookmarked;
      },
      hasAccessToken(){
          return localStorage.getItem('access_token');
      },
      comment(){
          if (Array.isArray(this.data?.comment)) {
              return this.data?.comment?.map(comment => ({
                  ...comment,
                  commenteditshow: false,
              }))
          }
          return [];
      },
      joined_users(){
          return this.data?.grouppurchase?.joined_users;
      },
      joined_users_id(){
          return this.data?.grouppurchase?.joined_users.map(user => user.user);
      },
  },
  watch: {
      $route(to) {
          const grouppurchase_id = to.params.grouppurchase_id;
          const community_name = to.params.community_name;
          this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
      }
  },
  data() {
      return {
          submitopen: false,
          submitnumber: 1,
          userid: "",
          email: "",
          inputComment: "",
          inputUpdateComment: "",
          searchname: '',
          userlistshow: true,
      };
  },
  created() {
      const grouppurchase_id = this.$route.params.grouppurchase_id;
      const community_name = this.$route.params.community_name;
      this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
  },
  mounted() {
      const payload = localStorage.getItem("payload");
      if (payload) {
          const { user_id } = JSON.parse(payload);
          const { email } = JSON.parse(payload);
          this.userid = user_id;
          this.email = email;
      }
  },
  methods: {
      submitOpen() {
          if (this.userid === this.feed.user) {
              this.snotify('error','글 작성자 본인입니다');
          } else {
              this.submitopen = !this.submitopen
          }
      },
      async addBookmark() {
          try {
          const response = await fetchCommunityBookmark(
              this.community.communityurl
          );
          if (response.status == 200) {
              this.bookmark = !this.bookmark;
              this.snotify('info',response.data.msg);
          }
          } catch (error) {
          if (error.response.status === 401) {
              this.snotify('warning',"로그인을 해주세요");
          }
          }
      },
      async endPurchase() {
          try {
          const community_name = this.$route.params.community_name;
          const grouppurchase_id = this.$route.params.grouppurchase_id;
          const response = await fetchGroupPurchaseSelfEnd(community_name, grouppurchase_id);
          if (response.status === 202) {
              this.snotify('success',response.data.message);
              this.feed.is_notification = !this.feed.is_notification;
              this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
          }
          } catch (error) {
              this.snotify('error',error.response.data.message);
          }
      },
      editFeed() {
        if (this.feed.grouppurchase_status != '시작 전') {
          this.snotify('error','공구 시작전에만 수정이 가능합니다');
        } else {
          this.$router.push({name:'purchase-update', params:{community_name: this.communityurl, grouppurchase_id: this.feed.id}})
        }
      },
      async deleteFeed() {
          try {
              const community_name = this.community.communityurl
              const grouppurchase_id = this.$route.params.grouppurchase_id;
              const response = await fetchGroupPurchaseDelete(community_name, grouppurchase_id);
              if (response.status === 200) {
                  this.snotify('success',response.data.message);
                  this.$router.push({
                  name: "community-detail",
                  params: { name: this.community.communityurl }
                  });
          }
          } catch (error) {
          this.snotify('error','게시글 삭제에 실패했습니다');
          }
      },
      async grouppurchaseJoin() {
          if (this.feed.grouppurchase_status == '진행 중') {
              try {
                  const community_name = this.$route.params.community_name;
                  const grouppurchase_id = this.$route.params.grouppurchase_id;
                  const response = await fetchGroupPurchaseJoin(community_name, grouppurchase_id, this.submitnumber);
                  if (response.status === 201 || response.status === 202) {
                      this.snotify('success',response.data.message);
                      this.submitopen = false;
                      this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
                  }
              } catch (error) {
                  if (error.response.status === 401) {
                      this.snotify('warning',"로그인을 해주세요");
                  } else {
                      this.snotify('error',error.response.data.message);
                  }
              }
          } else {
            this.snotify('error','공구 진행중에만 참여 가능합니다');
          }
      },
      async createComment() {
          try {
          const community_name = this.$route.params.community_name;
          const grouppurchase_id = this.$route.params.grouppurchase_id;
          const response = await fetchGroupPurchaseCommentCreate(community_name, grouppurchase_id, this.inputComment);
          if (response.status === 201) {
              this.snotify('success',response.data.message);
              this.inputComment = "";
              this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
          }
          } catch (error) {
              if (error.response.status === 401) {
                  this.snotify('error',"로그인을 해주세요");
                  this.inputComment = '';
              } else {
                this.snotify('error',error.response.data.message);
                this.inputComment = '';
              }
          }
      },
      async editComment(comment_id) {
          try {
          const response = await fetchGroupPurchaseCommentEdit(
              comment_id,
              this.inputUpdateComment
          );
          if (response.status === 200) {
              this.snotify('success',response.data.message);
              this.commenteditshow = false;
              const grouppurchase_id = this.$route.params.grouppurchase_id;
              const community_name = this.$route.params.community_name;
              this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
          }
          } catch (error) {
              if (error.response.status === 401) {
                  this.snotify('error',"로그인을 해주세요");
                  this.inputComment = '';
              } else {
                  this.snotify('error',error.response.data.message);
                  this.inputComment = '';
              }
          }
      },
      async deleteComment(comment) {
          try {
          const response = await fetchGroupPurchaseCommentDelete(comment.id);
          if (response.status === 200) {
              this.snotify('success',response.data.message);
              const grouppurchase_id = this.$route.params.grouppurchase_id;
              const community_name = this.$route.params.community_name;
              this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
          }
          } catch (error) {
              this.snotify('error','댓글 삭제를 실패했습니다');
          }
      },
      commenteditshow(comment) {
          this.inputUpdateComment = comment.text;
          comment.commenteditshow = !comment.commenteditshow;
          this.$forceUpdate()
      },
      searchFeed() {
          this.$router.push(`/feed/search/${this.searchname}`)
      },
      notlogin(){
          this.snotify('error','로그인을 해주세요');
      },
      snotify(type,message){
          bus.$emit('showSnackbar',{
                  type,
                  message
              });
          }
      },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

a {
text-decoration: none;
}
.main-content {
  padding: 30px 10px 50px 10px;
  grid-column: 1 / 4;
  grid-row: 3 / 4;
}
.body-section{
max-width:1800px;
margin:0 auto;
}
.main {
--clr: #FDFFFC;
--clr-text: #1C1D21;
--clr1: #9E2067;
padding: 1em;
padding-bottom: 1.1em;
border-radius: 15px;
margin: 1em;
flex-direction: column;
outline-offset: 3px;

display: flex;
grid-column: 3 / 4;
grid-row: 3 / 4;
min-width: 350px;
margin-top: 50px;
}

/* new start */
.top-bar {
display: flex;
align-items: center;
align-self: flex-end;
gap: .5rem;
list-style: none;
}

.btn {
fill: var(--clr);
border: none;
width: 2rem;
aspect-ratio: 1/1;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
z-index: 10;
border-radius: 50%;
}

.close {
background-color: #dddddd;
}
.close:hover {
background-color: #a40303;
}

.minimize {
background-color: #dddddd;
}
.minimize:hover {
background-color: rgb(34, 64, 115);
}

.songs {
display: flex;
flex-direction: column;
gap: .5rem;
height: 210px;
overflow-y: auto;
}
.songs::-webkit-scrollbar {
width: 5px;
}
.songs::-webkit-scrollbar-track {
background: #f1f1f1;
}
.songs::-webkit-scrollbar-thumb {
background: #888;
}
/* new end */

.loader {
display: flex;
flex-direction: row;
height: 4em;
padding-inline: 1em;
transform: rotate(180deg);
justify-content: right;
border-radius: 10px;
transition: .4s ease-in-out;
}

.song > * {
transition: .4s ease-in-out;
}

.loader:hover {
cursor: pointer;
background-color: var(--clr1);
--clr-text: #FDFFFC;
}

.currentplaying {
  display: flex;
align-self: center;
width: 100%;
border-radius: .5rem;
}

.spotify {
width: 50px;
height: 50px;
margin-right: 0.6em;
}

.heading {
color: #1C1D21;
font-size: 1.1em;
font-weight: bold;
align-self: center;
margin: 0 auto;
margin-top: 30px;
margin-bottom: 30px;
}

.loading {
display: flex;
margin-top: 1em;
margin-left: 0.3em;
}

.load {
width: 2px;
height: 33px;
background-color: limegreen;
animation: 1s move6 infinite;
border-radius: 5px;
margin: 0.1em;
}

.load:nth-child(1) {
animation-delay: 0.2s;
}

.load:nth-child(2) {
animation-delay: 0.4s;
}

.load:nth-child(3) {
animation-delay: 0.6s;
}

.play {
position: relative;
left: 0.35em;
height: 1.6em;
width: 1.6em;
clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
background-color: var(--clr-text);
transform: rotate(-90deg);
align-self: center;
margin-top: 0.7em;
justify-self: center;
transition: .4s ease-in-out;
}

.albumcover {
position: relative;
margin-right: 1em;
height: 40px;
width: 40px;
background-color: rgb(233, 232, 232);
align-self: center;
border-radius: 5px;
overflow: hidden;
}
.albumcover img{
  width:100%;
  rotate:180deg;
}
.song {
position: relative;
transform: rotate(180deg);
margin-right: 1em;
color: var(--clr-text);
align-self: center;
width: 70%;
}
.song-name {
  display: flex; 
  justify-content: space-between;
}
.artist {
margin-top:-5px;
font-size: 0.6em;
color: var(--clr-text);
}

@keyframes move6 {
0% {
  height: 0.2em;
}

25% {
  height: 0.7em;
}

50% {
  height: 1.5em;
}

100% {
  height: 0.2em;
}
}


/* 참여 버튼 */
.party-button {
padding: 0;
margin: 0;
border: none;
background: none;
cursor: pointer;
}

.party-button {
--primary-color: #111;
--hovered-color: #9E2067;
position: relative;
display: flex;
font-weight: 600;
font-size: 20px;
gap: 0.5rem;
align-items: center;
}

.party-button p {
margin: 0;
position: relative;
font-size: 1.1em;
color: var(--primary-color);
font-weight: bold;
}

.party-button::after {
position: absolute;
content: "";
width: 0;
left: 0;
bottom: -7px;
background: var(--hovered-color);
height: 2px;
transition: 0.3s ease-out;
}

.party-button p::before {
position: absolute;
/*   box-sizing: border-box; */
content: "Subscribe";
width: 0%;
inset: 0;
color: var(--hovered-color);
overflow: hidden;
transition: 0.3s ease-out;
}

.party-button:hover::after {
width: 100%;
}

.party-button:hover p::before {
width: 100%;
}

.party-button:hover svg {
transform: translateX(4px);
color: var(--hovered-color)
}

.party-button svg {
color: var(--primary-color);
transition: 0.2s;
position: relative;
width: 15px;
transition-delay: 0.2s;
}

.head-area {
    width: 100%;
    height: 150px;
    position: relative;
    overflow: hidden;
    background: rgb(0, 0, 0);

    display: grid;
    grid-template-columns: 75% 25%;
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
    margin-top: 20px;
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
    padding: 30px;
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

/* 글 쓴 당사자가 공구 종료시키기 버튼 buttun */
.content-button-box {
    margin-left: auto;
}

.ended-button {
    position: relative;
    /*display: flex;*/
    align-items: center;
    justify-content: flex-start;
    width: 115px;
    height: 30px;
    border: none;
    padding: 0px 15px;
    background-color: #909090;
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 7px;
    transition-duration: .3s;
}

.ended-button:hover {
    background-color: #9E2067;
}

.ended-button:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
}


/* main-content! 글 내용 area */

.main-content-wrapper {
    display: grid;
    grid-template-columns: 100px 60% 25%;
    grid-template-rows: 30px 30px auto 50px;
}

.content-button-box {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
}

.content-view-box{
    display: flex;
    margin: auto;
    margin-left: 10px;
    margin-right: 40px;
}

.content-view-box img {
    text-align: center;
    width: 23px;
    height: 18px;
}

.text-view-content {
    text-align: center;
    margin-left: 4px;
    color: #dddddd;
    font-weight: 400;
    font-size: 1.1rem;
}

.content-info-box {
    display: flex;
    margin: 8px auto;
    justify-content: space-evenly;
    text-align: center;
    list-style-type: none;
    color: #dddddd;


    grid-column: 3 / 4;
    grid-row: 2 / 3;
}

.content-info-box a {
    margin-right: 8px;
}

.content-info-box li {
    margin-right: 8px;
}

/* content 글자들 area */

.content-status {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    margin: 2px auto;
    color: #454545;
    font-size: 1.4rem;
    font-weight: 700;
}

.main-title {
    margin: 0 auto;
    color: #454545;

    grid-column: 2 / 3;
    grid-row: 1 / 3;
}

.main-content {
    padding: 30px 10px 50px 10px;
    grid-column: 2 / 4;
    grid-row: 3 / 4;
}

.main-content p {
    color: #454545;
    white-space: pre-wrap;
}

/* 공구 폼 purchase form area */

.purchase-form-box {
    display: inline-flex;
    list-style-type: none;
    max-width: 850px;
    min-width: 700px;
    height: 500px auto;
}

.purchase-form {
    display: grid;
    grid-template-columns: 100px auto 20px 110px 180px;
    grid-template-rows: 60px 50px 30px 30px 40px auto 50px;
    grid-gap: 3px;

    padding: 30px 50px 50px 50px;
    width: 100%;
    height: auto;
    background-color: #f7f7f7;
    color: #454545;
    box-shadow:#dddddd 0px -2px 0px inset;
}

.product-name-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 1 / 2;
    grid-row: 1 / 2;    
}

.product-number-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 1 / 2;
    grid-row: 5 / 6;    
}

.open-at-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 1 / 2;
    grid-row: 3 / 4;    
}

.close-at-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 1 / 2;
    grid-row: 4 / 5;    
}

.person-limit-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 1 / 4;
    grid-row: 2 / 3;    
}

.link-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: -5 / -6;
    grid-row: -1 / -2;  
}

.location-part {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 4 / 5;
    grid-row: 3 / 5;  
}

.meeting-at-part {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 4 / 5;
    grid-row: 2 / 3;  
}

.end-option-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 4 / 5;
    grid-row: 1 / 2;  
}

/***** 공구 폼 purchase form 상세 내용 *****/

.product-name {
    margin: auto 0;
    font-size: 1.3rem;
    font-weight: 500;
    grid-column: 2 / 4;
    grid-row: 1 / 2;
}

.product-number {
    margin: auto 0;
    font-size: 1.1rem;
    font-weight: 500;

    grid-column: 2 / 4;
    grid-row: 5 / 6;
}

.open-at {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 2 / 4;
    grid-row: 3 / 4;
}
.close-at {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 2 / 4;
    grid-row: 4 / 5;
}

.link {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: -4 / -5;
    grid-row: -1 / -2;
}

.person-limit {
    margin: auto 0;
    font-size: 1.2rem;
    font-weight: 600;

    grid-column: 2 / 4;
    grid-row: 2 / 3;
}

.location {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 5 / 6;
    grid-row: 3 / 5;
}

.meeting-at {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 5 / 6;
    grid-row: 2 / 3;
}

.end-option {
    margin: auto 5px;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 5 / 6;
    grid-row: 1 / 2;
}

.mapping {
    /*grid-column: 4 / 6;*/
    grid-row: 5 / 7;
    margin-left:auto;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 250px;
    height: 180px;
    background-color: #dddddd;
}


/* 공구 신청 버튼 button */

.parti-button-box {
    display: flex;
    grid-column:  -1 / -2;
    grid-row: -1 / -2;
}
.parti-button {
    margin-left: auto;
    margin-right: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 35px;
    border: none;
    padding: 0px 5px;
    background-color: #9e2070;
    color: white;
    font-size: 0.95rem;
    font-weight: 450;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;

    grid-column:  -1 / -2;
    grid-row: -1 / -2;
}

.parti-button:hover {
    background-color: #c2006e;
    color: white;
}


/***** 신청 폼 & 신청 버튼 *****/


.purchase-submit-box {
    display: inline-flex;
    list-style-type: none;
    width: 400px;
    height: 300px auto;
    margin: 50px 160px;

    display: grid;
    grid-template-columns: 160px 140px 80px;
    grid-template-rows: 30px 50px;
    grid-gap: 10px;

    padding: 30px 40px ;
    height: auto;
    background-color: #dddddd;
    color: #454545;
    box-shadow:#909090 0px -2px 0px inset;
}

.submit-part {
    margin: auto;
    font-size: 1.1rem;
    font-weight: 700;

    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.submit-help-text {
    margin: auto;
    font-size: 0.85rem;
    font-weight: 400;
    color:#909090;
    padding: 5px 10px;

    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

.purchase-submit-input {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    padding: 0.5rem 0.8rem;
    margin: auto;
    width: 50px;
    height: 30px;

    background-color: white;
    border-radius: .5rem;
    padding: 0.5rem 0.8rem;
    border: 2px solid transparent;
    font-size: 1.1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.purchase-submit-input:hover, .purchase-submit-input:focus, .input {
    outline: none;
}

.input-group:hover, .input:focus {
    color: #9E2067;
}

.submit-button {
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 50px;
    border: none;
    background-color: #9e2070;
    color: white;
    font-size: 0.95rem;
    font-weight: 450;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;

    grid-column:  3 / 4;
    grid-row: 1 / 3;
}

.submit-button:hover {
    background-color: #c2006e;
    color: white;
}

.submit-button:active {
    transform: translate(0, 3px);
}


.joined-check-button {
    height: 40px;
    padding: 0px 20px;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 1.0rem;
    font-weight: 500;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #dddddd;
}
.joined-check-button:active {
    transform: translate(0, 3px);
    transition-duration: .1s;
}
.joined-check-button:hover{
    background-color: #c0c0c0;
}

/* joined-box area */

.purchase-joined-box {
    display: inline-flex;
    list-style-type: none;
    width: 400px;
    height: 300px auto;
    margin: 50px 160px;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(auto, 30px);
    grid-gap: 5px;
    
    padding: 30px 40px ;
    height: auto;
    background-color: #dddddd;
    color: #454545;
    box-shadow:#909090 0px -2px 0px inset;
}

.joined-user-info {
    list-style-type: none;
    font-size: 1.05rem;
    font-weight: 600;
    padding: 10px;
}

/* 목록 ~ 버튼 area */
.function-box {
    display: flex;
    grid-column: 1 / 4;
    grid-row: 4 / 5;
}

/* 목록 버튼 */
.move-box {
    display: flex;
    margin-right: auto;
    align-items: center;
}

.move-button {
    margin-left: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 30px;
    border: none;
    padding: 0px 5px;
    background-color: #dddddd;
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
}

.move-button:hover {
    background-color: #909090;
    color: white;
}

.move-button:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
}

/* 버튼 박스 */

.content-button-box {
    display: flex;
    margin-left: auto;
    padding-right: 20px;
    align-items: center;
}

/* 글 수정 삭제 버튼 */
.content-edit-button {
    margin-right: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 30px;
    border: none;
    padding: 0px 5px;
    background-color: #dddddd;
    color: #909090;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
}

.content-edit-button:hover {
    background-color:  rgb(34, 64, 115);
    color: white;
}

.content-edit-button:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
}

.content-delete-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 30px;
    border: none;
    padding: 0px 5px;
    background-color: #dddddd;
    color: #909090;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
}

.content-delete-button:hover {
    background-color: #a40303;
    color: white;
}

.content-delete-button:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
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
    grid-gap:15px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto, 100%)
}


.comment-box {
    display: block;
    list-style-type: none;
    width: auto;
    height: 80px auto;
}

.comment-card {
    display: grid;
    grid-template-columns: 120px auto 200px;
    grid-template-rows: 30px auto;
    grid-gap: 4px;
    position: relative;
    padding: 10px 20px ;
    width: auto;
    height: auto;
    background-color: #f7f7f7;
    color: #454545;
    box-shadow:#dddddd 0px -2px 0px inset;
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
    content: '수정';
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
    transition: .2s linear;
    transition-delay: .2s;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
}

.edit-icon {
    transform: scale(1.1);
    transition: .2s linear;
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
    content: '삭제';
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
    transition: .2s linear;
    transition-delay: .2s;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
}

.delete-icon {
    transform: scale(1.1);
    transition: .2s linear;
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
/* comment 수정 div, textarea, button */
.comment-update-box {
  /* display: none; */
  
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.comment-update-div{
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  box-shadow:#dddddd 0px -2px 0px inset;
  align-items: center;
  justify-content: space-evenly;
}
.comment-update-div p {
  color: #909090;
  font-size: 0.9rem;
  margin: 0px 15px;
}

/* 댓글 수정 textarea */
.update-textarea {
  width: 70%;
  height: 65%;
  margin-right: 20px;
  resize: none;
  overflow: auto;
  padding: 0.5rem 0.8rem;

  border-radius: .3rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.update-textarea:hover, .update-textarea:focus, .input {
  outline: none;
}

/* comment 수정 내 버튼 - 수정완료 / 취소 */
.comment-update-div button {
  margin-right: 10px;
}

.update-submit-button {
  white-space: nowrap;
  padding: 20px 13px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: hsl(0, 0%, 100%);
  border-radius: 5px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  position: relative;
  background-color: #9E2067;
  box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
.update-submit-button:hover{
  background-color: #c3348e;
}
.update-submit-button:active {
  transform: translate(0, 3px);
  transition-duration: .1s;
}

.update-quit-button {
  white-space: nowrap;
  padding: 20px 25px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: hsl(0, 0%, 100%);
  border-radius: 5px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  position: relative;
  background-color: #dddddd;
  box-shadow: 0 2px 5px rgba(131, 131, 131, 0.5);
}
.update-quit-button:active {
  transform: translate(0, 3px);
  transition-duration: .1s;
}
.update-quit-button:hover{
  background-color: #c0c0c0;
}
.like-box {
  display: flex;
}
</style>