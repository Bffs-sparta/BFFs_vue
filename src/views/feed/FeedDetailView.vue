<template>
  <div>
    <main>
      <section class="head-section">
        <div class="head-area">
          <!-- 커뮤니티 관련 내용 넣기 -->
          <div class="image-box">
            <img
              id="head_img"
              class="head_img"
              src="@/assets/comu_image(2).jpg"
            />
          </div>
          <p class="head-title">{{ community?.title }} | {{ community?.communityurl }}</p>
          <div class="button-box">
            <div class="bookmark">
              <input
                type="checkbox"
                id="checkboxInput"
                @click="addBookmark"
                :checked="bookmark"
              />
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
      <section class="category-section">
        <div class="search-category-area">
          <div class="head-category-wrapper">
            <!-- 커뮤니티 카테고리 -->
            <ul class="head-category">
              <div class="category-item-box">
                <h2 style="color: #909090;">
                  카테고리명 : {{ feed?.category }}
                </h2>
              </div>
            </ul>
          </div>
          <!-- 검색 -->
          <div class="search-box">
            <div class="container-input">
              <input
                autocomplete="off"
                type="text"
                placeholder="Search"
                name="text"
                class="input"
              />
              <svg
                fill="#000000"
                width="20px"
                height="20px"
                viewBox="0 0 1920 1920"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              <div class="main-content-title">
                <h2>{{ feed?.title }}</h2>
              </div>
              <div class="content-button-box">
                <div class="content-view-box">
                  <img src="@/assets/view_look.png" />
                  <span class="text-view-content">{{ feed.view_count }}</span>
                </div>
                <button
                  v-if="feedadmin.includes(feed.user)"
                  class="noti-button"
                  @click="addNotification()"
                >
                  공지 등록
                  <svg viewBox="0 0 512 512" class="bell">
                    <path
                      d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
                    ></path>
                  </svg>
                </button>
                <!-- 어드민 -->
              </div>
              <div class="content-info-box">
                <!-- 작성자 프로필로 이동 -->
                <a style="color: #dddddd;">{{ feed.nickname }}</a>
                <li>
                  {{
                    feed?.created_at?.slice(0, 10) +
                      " " +
                      feed?.created_at?.slice(11, 19)
                  }}
                </li>
              </div>
              <div class="main-text-content">
                <div v-html="feed.content"></div>
              </div>
              <div class="function-box">
                <div class="move-box">
                  <a class="move-button" @click="moveFeed(data?.previous)"
                    >≪ 이전 글</a
                  >
                  <router-link
                    :to="`/community/detail/${community.communityurl}`"
                    class="move-button"
                    >목록으로</router-link
                  >
                  <a class="move-button" @click="moveFeed(data?.next)"
                    >다음 글 ≫</a
                  >
                </div>
                <div class="like-box">
                  <router-link
                    v-if="feed.user === this.userid"
                    class="content-edit-button"
                    :to="`/feed/update/${feed.id}`"
                    >글 수정</router-link
                  >
                  <!-- 본인 -->
                  <a
                    v-if="feed.user === this.userid"
                    class="content-delete-button"
                    @click="deleteFeed()"
                    >글 삭제</a
                  >
                  <!-- 본인 // 어드민 권한도 주는게 좋을 것 같음 -->
                  <button
                    class="like-button"
                    @click="toggleLike"
                    :class="{ like: feed.like_bool }"
                  >
                    <svg
                      class="icon"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                      ></path>
                    </svg>
                  </button>
                  <!--좋아요 숫자-->
                  <p>{{ feed.likes_count }}</p>
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
                <p
                  v-if="comment &&comment == '아직 댓글이 없습니다'"
                  style="margin-left: 3px;"
                >
                  0
                </p>
                <p v-else style="margin-left: 3px;">
                  {{ comment?.length || 0 }}
                </p>
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
                      <li class="comment-author">
                        <router-link :to="`/profile/${comment?.user_id}`">{{
                          comment?.nickname
                        }}</router-link>
                      </li>
                      <li class="comment-date">
                        작성일 {{ comment?.created_at?.slice(5, 10) }} 수정일
                        {{ comment?.updated_at?.slice(5, 10) }}
                      </li>
                      <li class="comment-text">
                        {{ comment.text }}
                      </li>
                      <a class="cocomment-button" @click="cocommentShow(comment)">댓글 달기</a>
                      <div
                        class="comment-func-box"
                        v-if="userid === comment.user_id"
                      >
                        <button
                          class="comment-edit-btn"
                          @click="editComment(comment.id)"
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

                  <!-- 대댓글 입력 폼 -->
                  <div class="coco-input-wrapper" v-if="comment.cocommentshow">
                    <div class="coco-text-info">
                      <p>대댓글 달기</p>
                    </div>
                    <textarea
                      autocomplete="off"
                      class="input-coco-text"
                      placeholder="여기에 댓글을 입력하세요"
                      v-model="inputCocomment"
                    ></textarea>
                    <button class="coco-submit-button" @keyup.enter="createCocomment(comment)" @click="createCocomment(comment)">입 력</button>
                    <button class="coco-quit-button">취 소</button>
                  </div>

                  <!-- 대댓글 내용 -->
                  <div class="cocommnet-box" v-for ="cocomment,index in comment.cocomment" :key="index">
                      <p class="cocomment-deco">|</p>
                      <div class="cocomment-card">
                          <li class="comment-author"> {{cocomment.nickname}} </li>
                          <li class="comment-date">
                            작성일 {{ cocomment?.created_at?.slice(5, 10) }} 수정일{{ cocomment?.updated_at?.slice(5, 10) }}
                          </li>
                          <li class="comment-text">
                              {{cocomment.text}}
                          </li>
                          <div class="comment-func-box">
                              <button class="comment-edit-btn">
                                  <svg class="edit-icon" viewBox="0 0 512 512" height="17.5" width="15">
                                      <path
                                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                      </path>
                                  </svg>
                              </button>
                              <button class="comment-delete-btn" @click="deleteCocomment(cocomment.id)">
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
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  fetchCommunityBookmark,
  fetchFeedNotification,
  fetchFeedDelete,
  fetchFeedLike,
  fetchCommentCreate,
  fetchCommentEdit,
  fetchCommentDelete,
  fetchCocommentCreate,
  fetchCocommentDelete,
} from "@/api/index.js";

export default {
  computed: {
    ...mapGetters({ data: "fetchFeedDetail" }),
    community() {
      return this.data?.community;
    },
    feed() {
      return this.data?.feed;
    },
    feedadmin() {
      return this.data.admin.map(admin => admin.user_id);
    },
    comment(){
      if (Array.isArray(this.data?.comment)) {
          return this.data?.comment?.map(comment => ({
            ...comment,
            cocommentshow: false
          }))
        }
        return [];
    },
    bookmark() {
      return this.community?.is_bookmarked;
    }
  },
  watch: {
    $route(to) {
      const feed_id = to.params.feed_id;
      const community_name = to.params.community_name;
      this.$store.dispatch("FETCH_FEED_DETAIL", { community_name, feed_id });
    }
  },
  data() {
    return {
      userid: "",
      email: "",
      inputComment: "",
      inputCocomment:"",
    };
  },
  created() {
    const feed_id = this.$route.params.feed_id;
    const community_name = this.$route.params.community_name;
    this.$store.dispatch("FETCH_FEED_DETAIL", { community_name, feed_id });
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
    async addBookmark() {
      try {
        const response = await fetchCommunityBookmark(
          this.community.communityurl
        );
        if (response.status == 200) {
          alert(response.data.msg);
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("로그인을 해주세요");
        }
      }
    },
    async addNotification() {
      try {
        const feed_id = this.$route.params.feed_id;
        const response = await fetchFeedNotification(this.community.communityurl, feed_id);
        if (response.status === 200) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFeed() {
      try {
        const feed_id = this.$route.params.feed_id;
        const response = await fetchFeedDelete(feed_id);
        if (response.status === 200) {
          alert(response.data.message);
          this.$router.push({
            name: "community-detail",
            params: { name: this.community.communityurl }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async toggleLike() {
      try {
        const feed_id = this.$route.params.feed_id;
        const response = await fetchFeedLike(feed_id);
        if (response.status === 200) {
          alert(response.data);
          this.feed.like_bool = !this.feed.like_bool;
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("로그인을 해주세요");
        }
      }
    },
    async createComment() {
      try {
        const feed_id = this.$route.params.feed_id;
        const response = await fetchCommentCreate(feed_id, this.inputComment);
        if (response.status === 201) {
          alert(response.data.message);
          this.inputComment = "";
          const feed_id = this.$route.params.feed_id;
          const community_name = this.$route.params.community_name;
          this.$store.dispatch("FETCH_FEED_DETAIL", { community_name, feed_id });
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("로그인을 해주세요");
          this.inputComment = '';
        }
      }
    },
    async editComment(comment_id) {
      try {
        const response = await fetchCommentEdit(
          comment_id,
          this.inputCocomment
        );
        if (response.status === 201) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment) {
      try {
        const response = await fetchCommentDelete(comment.id);
        if (response.status === 200) {
          alert(response.data.message);
          const feed_id = this.$route.params.feed_id;
          const community_name = this.$route.params.community_name;
          this.$store.dispatch("FETCH_FEED_DETAIL", { community_name, feed_id });
        }
      } catch (error) {
        console.log(error);
      }
    },
    moveFeed(id) {
      if (id) {
        this.$router.replace({
          name: "feed-detail",
          params: { community_name: this.community.communityurl, feed_id: id }
        });
      } else {
        alert("게시글이 존재하지않습니다");
      }
    },
    cocommentShow(comment) {
      comment.cocommentshow = !comment.cocommentshow;
      this.$forceUpdate()
    },
    async createCocomment(comment) {
      try {
        const response = await fetchCocommentCreate(comment.id, this.inputCocomment);
        if (response.status === 201) {
          alert(response.data.message);
          this.inputComment = "";
          const feed_id = this.$route.params.feed_id;
          const community_name = this.$route.params.community_name;
          this.$store.dispatch("FETCH_FEED_DETAIL", { community_name, feed_id });
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("로그인을 해주세요");
          this.inputCocomment = '';
        }
      }
    },
    // async editCocomment(comment_id) {
    //   try {
    //     const response = await fetchCommentEdit(
    //       comment_id,
    //       this.inputCocomment
    //     );
    //     if (response.status === 201) {
    //       alert(response.data.message);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async deleteCocomment(comment_id) {
      try {
        const response = await fetchCocommentDelete(comment_id);
        if (response.status === 200) {
          alert(response.data.message);
          const feed_id = this.$route.params.feed_id;
          const community_name = this.$route.params.community_name;
          this.$store.dispatch("FETCH_FEED_DETAIL", { community_name, feed_id });
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #454545;
}
textarea{
  resize: none;
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
  margin-left: auto;
  margin-right: 40px;
  text-align: right;
  color: white;
  z-index: 1;
  font-size: 26px;
  word-spacing: 5px;
  letter-spacing: 5px;

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
  align-items: center;
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
  transition: all 0.2s ease-in-out;
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
  font-size: 1em;
  top: 4px;
  color: #ffffff;
}

#checkboxInput:checked + .bookmark .svgIcon path {
  fill: rgb(253, 184, 9);
  color: white;
}
#checkboxInput:checked + .bookmark::after {
  animation: puff-out-center 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) both;
  z-index: 1;
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
  transition-duration: 0.3s;
}

.Btn-svg {
  width: 13px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  fill: white;
  transition-duration: 0.3s;
}

.Btn:hover {
  color: transparent;
}

.Btn:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: 0.3s;
}

.Btn:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
  box-shadow: 2px 2px 0px #6a154b;
}

/* 공지 버튼 buttun */
.content-button-box {
  margin-left: auto;
}

.noti-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 30px;
  border: none;
  padding: 0px 15px;
  background-color: #909090;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 7px;
  transition-duration: 0.3s;
}

.bell {
  width: 15px;
  position: absolute;
  right: 0;
  margin-right: 14px;
  fill: white;
  transition-duration: 0.3s;
}

.bell path {
  fill: white;
}

.noti-button:hover {
  color: transparent;
}

.noti-button:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: 0.3s;
}

.noti-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
}

/* main-content! 글 내용 area */

.main-content-wrapper {
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: 30px 30px auto 50px;
}

.main-content-wrapper h2 {
  margin: 0 auto;
  color: #454545;

  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.content-button-box {
  display: flex;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.content-view-box {
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

  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.content-info-box a {
  margin-right: 8px;
}

.content-info-box li {
  margin-right: 8px;
}

.main-text-content {
  margin: auto;
  padding: 20px 10px 50px 10px;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}

.main-text-content pre {
  color: #454545;
  font-size: large;
  white-space: pre-wrap;
}

/* 목록 ~ like area */
.function-box {
  display: flex;
  grid-column: 1 / 3;
  grid-row: 4 / 5;
}

/* 이전 다음 목록 버튼 */
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
  transition-duration: 0.3s;
}

.move-button:hover {
  background-color: #909090;
  color: white;
}

.move-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
}

/* like 버튼 */

.like-box {
  display: flex;
  margin-left: auto;
  padding-right: 20px;
  align-items: center;
}

.like-button {
  display: flex;
  margin-left: 20px;
  margin-right: 2px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  position: relative;
}

.like-button:hover > .icon {
  transform: scale(1.2);
  cursor: pointer;
  transition: 0.2s linear;
}

.like > .icon {
  fill: #fd1853;
  animation: grosseur 0.2s linear;
}

@keyframes grosseur {
  0% {
    width: 40px;
    height: 40px;
    fill: #d50087;
  }

  100% {
    width: 30px;
    height: 30px;
    fill: #fd1853;
  }
}

/* like 수 */
.like-box p {
  margin-right: 40px;
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
  transition-duration: 0.3s;
}

.content-edit-button:hover {
  background-color: rgb(34, 64, 115);
  color: white;
}

.content-edit-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
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
  transition-duration: 0.3s;
}

.content-delete-button:hover {
  background-color: #a40303;
  color: white;
}

.content-delete-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
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
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
    color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
}

.input-sub-text:hover,
.input-sub-text:focus,
.input {
  outline: none;
  border-color: #9e2070;
}

.input-group:hover,
.input:focus {
  color: #9e2070;
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
  transition-duration: 0.3s;
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

/* 대댓글 작성 버튼 */

.cocomment-button {
  margin-right: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 25px;
  border: none;
  background-color: #dddddd;
  color: #909090;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition-duration: 0.3s;

  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.cocomment-button:hover {
  background-color: rgb(34, 64, 115);
  color: white;
}

.cocomment-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
}

/* 코코멘트 대댓글 area */

.cocommnet-box {
  width: 100%;
  display: flex;
}

.cocomment-deco {
  color: #9e2070;
  font-size: 40px;
  font-weight: 900;
  padding-left: 10px;
  margin: auto;
}

.cocomment-card {
  display: grid;
  grid-template-columns: 120px auto 160px;
  grid-template-rows: 30px auto;
  grid-gap: 4px;

  margin-left: 20px;
  padding: 10px 20px;
  width: 100%;
  height: auto;
  background-color: #f5f5f5;
  color: #454545;
  box-shadow: #dddddd 0px -2px 0px inset;
}

/* 대댓글 입력 area */

.coco-input-wrapper {
  margin: 20px 20px;
  display: grid;

  grid-template-columns: 90px 75% 70px 70px;
  grid-template-rows: 70px;
  grid-gap: 10px;
}

.coco-text-info {
  display: flex;
  grid-column: 1 / 2;
}

.coco-text-info p {
  margin: auto;
  font-size: 0.9rem;
  color: #707070;
}

.input-coco-text {
  padding: 0.5rem 0.8rem;
  grid-column: 2 / 3;
  margin: 0 auto;
  width: 92%;

  background-color: #05060f0a;
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
    color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
}

.input-coco-text:hover,
.input-coco-text:focus,
.input {
  outline: none;
  border-color: #9e2070;
}

.input-group:hover,
.input:focus {
  color: #9e2070;
}

/* 대댓글 입력 / 취소 button area */

.coco-submit-button {
  grid-column: 3 / 4;
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
  background-color: #a92278;
  box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

.coco-submit-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
}

.coco-quit-button {
  grid-column: 4 / 5;
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

.coco-quit-button:active {
  transform: translate(0, 3px);
  transition-duration: 0.3s;
}
</style>
