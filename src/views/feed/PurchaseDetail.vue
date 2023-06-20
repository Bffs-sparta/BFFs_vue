<template>
    <main>
      <section class="head-section">
        <div class="head-area">
          <!-- 커뮤니티 관련 내용 넣기 -->
          <div class="image-box">
            <img id="head_img" class="head_img" src="@/assets/comu_image(2).jpg">
          </div>
          <p class="head-title">커뮤니티 이름</p>
          <div class="button-box">
            <div class="bookmark">
              <input type="checkbox" id="checkboxInput">
              <label for="checkboxInput" class="bookmark">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" class="svgIcon">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                </svg>
              </label>
            </div>
            <button class="Btn">글 쓰기
              <svg class="Btn-svg" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
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
              <input type="text" placeholder="Search" name="text" class="input">
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
            <!-- 게시 글 내용 전체 -->
            <div class="main-content-wrapper">
              <span class="content-status">[시작 전]</span>
              <!-- <span>[진행 중]</span>
              <span>[종료]</span> -->
              <h2 class="main-title">가나다라마바사아자차카타파하15가나다라마바사아자차카타파하30 </h2>
              <div class="content-button-box">
                <div class="content-view-box">
                  <img src="@/assets/view_look.png">
                  <span class="text-view-content">00</span> 
                </div>
                <!-- 글 쓴 사용자만 // 종료시킬때 경고창으로 한 번 더 확인하기 -->
                <button class="ended-button">공구 종료시키기</button> 
              </div>
              <div class="content-info-box">
                <!-- 작성자 프로필로 이동 -->
                <a>작성자</a>
                <li>작성시간</li>
              </div>
              <div class="main-content">
                <p>같이 식재료 나누실분 구합니다
많이 사면 저렴한테 혼자 먹기에는 너무 많아요!
금액은 사람 모이고 인원봐서 결정하겠습니다~!
                </p>
                <div class="purchase-form-box">
                  <div class="purchase-form">
                    <li class="product-name-part">이름</li>
                    <li class="product-number-part">인당 수량</li>
                    <li class="link-part">상품 link</li>
                    <li class="open-at-part">모집 시작</li>
                    <li class="close-at-part">모집 끝</li>
                    <li class="person-limit-part">모집 인원 (명)</li>
                    <li class="location-part">만날 위치</li>
                    <li class="meeting-at-part">만날 시간</li>
                    <li class="end-option-part">공구 모집 실패 시</li>

                    <li class="product-name">대파 부추 오이</li>
                    <li class="product-number">00</li>
                    <li class="link">https://~~.com</li>
                    <li class="open-at">23.06.25. 오전 9:00</li>
                    <li class="close-at">23.06.28. 오후 12:00</li>
                    <li class="person-limit">10명</li>
                    <li class="location">서울시 송파구 석촌역 7번출구 앞</li>
                    <li class="meeting-at">23.06.28. 오후 7:00</li>
                    <li class="end-option">continue</li>

                    <button class="parti-button">참여할래!</button>
                  </div>
                </div>
                <div class="purchase-submit-box">
                  <li class="submit-part">
                    수량 입력
                  </li>
                  <li class="submit-help-text">
                    ⚠ 0 혹은 -1 이하를 입력하면 신청이 취소됩니다
                  </li>
                  <input type="number" value="1" class="purchase-submit-input" >
                  <button class="submit-button">신 청</button>
                </div>
              </div>
              <div class="function-box">
                <div class="move-box">
                  <a class="move-button">목록으로</a>
                </div>
                <div class="content-button-box">
                  <a class="content-edit-button">글 수정</a> <!-- 본인 -->
                  <a class="content-delete-button">글 삭제</a> <!-- 본인 // 어드민 권한도 주는게 좋을 것 같음 -->
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
                <p>00</p>
              </div>
              <textarea autocomplete="off" class="input-sub-text" placeholder="여기에 댓글을 입력하세요"></textarea>
              <button class="input-button">입 력</button>
            </div>

            <div class="sub-content-wrapper">
              <!-- 댓글 1개 묶음 -->
              <div class="comment-box">
                <!-- comment 내용 -->
                <div class="comment-card">
                  <li class="comment-author"> 작성자 </li>
                  <li class="comment-date">작성-수정-일자</li>
                  <li class="comment-text">
                    comment 내요오오오옹 
                  </li>
                  <div class="comment-func-box">
                    <button class="comment-edit-btn">
                      <svg class="edit-icon" viewBox="0 0 512 512" height="17.5" width="15">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                    </button>
                    <button class="comment-delete-btn">
                      <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="delete-icon">
                      <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 대댓글 입력 폼 -->
                <div class="coco-input-wrapper">
                  <div class="coco-text-info">
                    <p>대댓글 달기</p>
                  </div>
                  <textarea autocomplete="off" class="input-coco-text" placeholder="여기에 댓글을 입력하세요"></textarea>
                  <button class="coco-submit-button">입 력</button>
                  <button class="coco-quit-button">취 소</button>
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
//import {
//    fetchGroupPurchaseDetail,
//    fetchGroupPurchaseJoin,
//    fetchGroupPurchaseCreate,
//    fetchGroupPurchaseFeedDetail,
//    fetchGroupPurchaseJoin,
    //fetchGroupPurchaseSelfEnd,
    //fetchGroupPurchaseCommentCreate,
    //fetchGroupPurchaseCommentEdit,
    //fetchGroupPurchaseCommentDelete,
//} from "@/api/index.js";


export default {
  computed: {
    ...mapGetters({ data: "fetchPurchaseDetail" }),
    community() {
      return this.data?.community;
    },
    grouppurchase() {
      return this.data?.grouppurchase;
    },
    comment(){
      if (Array.isArray(this.data?.comment)) {
          return this.data?.comment?.map(comment => ({
            ...comment
          }))
        }
      return [];
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
      userid: "",
      email: "",
      inputComment: "",
    };
  },
  created() {
    const grouppurchase_id = this.$route.params.grouppurchase_id;
    const community_name = this.$route.params.community_name;
    this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id});
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
//  methods: {
//   async joinPurchase() {
//      try {
//        const response = await fetchGroupPurchaseJoin(
//          this.grouppurchase.grouppurchase_id
//        );
//        if (response.status == 201) {
//          alert(response.data.message);
//        }
//        if (response.status == 202) {
//          alert(response.data.message);
//        }
//      } catch (error) {
//        console.log(error);
//      }
//    },
//    async deleteGroupPurchase() {
//      try {
//        const grouppurchase_idthis.$route.params.grouppurchase_id;
//        const response = await fetchFeedDelete(feed_id);
//        if (response.status === 405) {
//          alert(response.data.error);
//        } 
//        if (response.status === 200) {
//          alert(response.data.message);
//          this.$router.push({
//            name: "community-detail",
//            params: { name: this.community.communityurl }
//          });
//        }
//      } catch (error) {
//        console.log(error);
//      }
//    },
//    //async createGroupPurchaseComment() {
//      try {
//        const grouppurchase_id = this.$route.params.grouppurchase_id;
//        const response = await fetchGroupPurchaseCommentCreate(grouppurchase_id, this.inputComment);
//        if (response.status === 201) {
//          alert(response.data.message);
//          this.inputComment = "";
//          const grouppurchase_id = this.$route.params.grouppurchase_id;
//          const community_name = this.$route.params.community_name;
//          this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
//        }
//      } catch (error) {
//        console.log(error);
//      }
//    },
//    async editGroupPurchaseComment(comment_id) {
//      try {
//        const response = await fetchGroupPurchaseCommentEdit(
//          comment_id,
//        );
//        if (response.status === 201) {
//          alert(response.data.message);
//        }
//      } catch (error) {
//        console.log(error);
//      }
//    },
//    async deleteComment(comment) {
//      try {
//        const response = await fetchCommentDelete(comment.id);
//        if (response.status === 200) {
//          alert(response.data.message);
//          const grouppurchase_id = this.$route.params.grouppurchase_id
//          const community_name = this.$route.params.community_name;
//          this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
//        }
//      } catch (error) {
//        console.log(error);
//     }
//    },
//  },
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
    display: flex;
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
    background-color: #9E2070;
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
    margin: auto 50px;
    padding: 20px 10px 50px 10px;
    grid-column: 1 / 4;
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
    width: 800px;
    height: 500px auto;
}

.purchase-form {
    display: grid;
    grid-template-columns: 100px 20px 300px 100px 200px;
    grid-template-rows: 60px 50px 30px 30px 40px 30px;
    grid-gap: 3px;

    padding: 40px 60px 60px 60px;
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
    grid-column: 4 / 5;
    grid-row: 1 / 2;  
}

.location-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 4 / 5;
    grid-row: 2 / 4;  
}

.meeting-at-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 4 / 5;
    grid-row: 4 / 5;  
}

.end-option-part {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;
    color: #909090;
    grid-column: 1 / 3;
    grid-row: 6 / 7;  
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
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 5 / 6;
    grid-row: 1 / 2;
}

.person-limit {
    margin: auto 0;
    font-size: 1.2rem;
    font-weight: 600;

    grid-column: 2 / 4;
    grid-row: 2 / 3;
}

.location {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 5 / 6;
    grid-row: 2 / 4;
}

.meeting-at {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 5 / 6;
    grid-row: 4 / 5;
}

.end-option {
    margin: auto 0;
    font-size: 1rem;
    font-weight: 500;

    grid-column: 3 / 4;
    grid-row: 6 / 7;
}


/* 공구 신청 버튼 button */

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
    border-color: #9E2070;
}

.input-group:hover, .input:focus {
    color: #9E2070;
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
}

.comment-edit-btn:hover > .edit-icon path {
    fill: rgb(34, 64, 115);
}

.comment-edit-btn:hover::after {
    visibility: visible;
    opacity: 1;
    top: -160%;
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
}

.comment-delete-btn:hover > .delete-icon path {
    fill: rgb(168, 7, 7);
}

.comment-delete-btn:hover::after {
    visibility: visible;
    opacity: 1;
    top: -160%;
}

</style>