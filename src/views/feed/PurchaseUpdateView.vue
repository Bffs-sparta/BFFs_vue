<template>
    <div class="write-container" v-if="feeds">
        <div>
          <h3>공구 게시글 수정</h3>
        </div>
        <div class = "title">
            <input type="text" id="title" v-model="feeds.title" placeholder="제목을 입력해주세요">
        </div>
        <vue-editor v-model="feeds.content" :useCustomImageHandler="true" @image-added="handleImageAdded"></vue-editor>
        
        <div class="purchase-container">
          <div class="purchase-wrapper">

          <dl class="purchase-form">
            <span>... 공구 기본 내용 ...</span>
            <dt class="product-name">상품 이름</dt>
            <dd class="product-name-text">
              <div class="input-wrapper">
                  <input class="gp-input-box" type="text" v-model="feeds.product_name">
              </div>
            </dd>
            <dt class="product-number">상품 수량</dt>
            <dd class="product-number-text">
              <div class="input-num-wrapper">
                <input class="gp-input-num-box" type="number" v-model="feeds.product_number"> 개
              </div>
            </dd>
            <dt class="product-price">총 가격</dt>
            <dd type="number" class="product-price-text">
              <div class="input-num-wrapper">
                <input class="gp-input-num-box" type="number" v-model="feeds.product_price" min="0"> 원
              </div>
            </dd>
            <dt class="person-limit">모집 인원</dt>
            <dd class="person-limit-text">
              <div class="input-num-wrapper">
                <input class="gp-input-num-box" type="number" v-model="feeds.person_limit" min="0"> 명
              </div>
            </dd>
            <dt class="product-link">상품 상세 url</dt>
            <dd class="product-link-text">
              <div class="input-wrapper">
                <input class="gp-input-box" type="url" v-model="feeds.link">
              </div>
            </dd>
            <dt class="open-at">모집 시작시간</dt>
            <dd class="open-at-text">
              <div class="input-date-wrapper">
                <!-- js로 오늘 날짜 가져와서 띄워주어야함 / step 10분 단위로 시간 받기 / min=선택 시간 제한, 현재 시간 넣기 -->
                <!-- https://sorto.me/docs/Web/HTML/Element/input/datetime-local#%EC%84%A0%ED%83%9D-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%82%A0%EC%A7%9C-%EB%B0%8F-%EC%8B%9C%EA%B0%84-%EB%B2%94%EC%9C%84-%EC%A0%9C%ED%95%9C%ED%95%98%EA%B8%B0 -->
                <input class="gp-input-box" type="datetime-local" v-model="feeds.open_at" min="" step="600">
              </div>
            </dd>
            <dt class="close-at">모집 종료 시간</dt>
            <dd class="close-at-text">
              <div class="input-date-wrapper">
                <input class="gp-input-box" type="datetime-local" v-model="feeds.close_at" min="" step="600">
              </div>
            </dd>
          </dl>

          <dl class="purchase-end-form">
            <span>... 공구 종료 후 ...</span>
            <dt class="end-option">공구 미 완료시</dt>
            <dd class="end-option-text">
              <!-- select -->
              <div class="input-wrapper">
                <select class="gp-select-box" name="order" form="myEndOption" v-model="feeds.end_option">
                    <option value="continue">공구를 계속 진행할 거예요</option>
                    <option value="quit">공구를 진행하지 않을 거예요</option>
                    <option value="discuss">신청한 사람과 논의 후 결정할래요</option>
                    <option value="maybe">종료 후 고민해보고 결정할래요</option>
                </select>
              </div>
            </dd>
            <dt class="location">만날 위치</dt>
            <dd class="location-text">
              <div class="input-wrapper">
                <input class="gp-input-box" type="text" v-model="feeds.location">
              </div>
            </dd>
            <dt class="meeting-at">만날 시간</dt>
            <dd class="meeting-at-text">
              <div class="input-wrapper">
                <input class="gp-input-box" type="datetime-local" v-model="feeds.meeting_at" min="" step="600">
              </div>
            </dd>
            <div class="mapping" style="display: none;">
              지도 api를 넣고 싶다
            </div>
          </dl>

          </div>
        </div>
        
        <div class="submit-box">
            <button class="create-button" @click="editFeed">수정하기</button>
            <button class="quit-button" @click="goBack">취소하기</button>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import { fetchGroupPurchaseEdit } from "@/api/index.js";
import bus from "@/utils/bus.js";

export default {
	components: {
		VueEditor,
	},
	computed: {
		...mapGetters({"feed":"fetchGroupPurchaseDetail"}),
    feeds() {
      return this.feed?.grouppurchase;
    },
	},
	created() {
		const community_name = this.$route.params.community_name;
    const grouppurchase_id = this.$route.params.grouppurchase_id;
    this.$store.dispatch("FETCH_GROUPPURCHASE_DETAIL", { community_name, grouppurchase_id });
	},
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    async editFeed() {
        try{
            if (this.feeds.open_at.length === 16) {
              this.feeds.open_at += ":00";
            }
            if (this.feeds.close_at.length === 16) {
              this.feeds.close_at += ":00";
            }
            if (this.feeds.meeting_at.length === 16) {
              this.feeds.meeting_at += ":00";
            }

            const community_name = this.$route.params.community_name;
            const grouppurchase_id = this.$route.params.grouppurchase_id;
            const title = this.feeds.title;
            const content = this.feeds.content;
            const product_name = this.feeds.product_name;
            const product_number = this.feeds.product_number;
            const product_price = this.feeds.product_price;
            const person_limit = this.feeds.person_limit;
            const link = this.feeds.link;
            const open_at = this.feeds.open_at;
            const close_at = this.feeds.close_at;
            const end_option = this.feeds.end_option;
            const location = this.feeds.location;
            const meeting_at = this.feeds.meeting_at;

            const response = await fetchGroupPurchaseEdit(
              community_name, grouppurchase_id, title, content, product_name, product_number, product_price, person_limit, link, open_at, close_at, end_option, location, meeting_at,
            );
            if(response.status === 200){
              this.snotify('success',response.data.message)
              this.$router.push({
                name: "purchase-detail", 
                params: {community_name: this.$route.params.community_name, grouppurchase_id: this.$route.params.grouppurchase_id}});
            }
        }catch(error){
          this.snotify('error',error.response.data.message)
        }
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await this.$store.dispatch("FETCH_IMAGE_UPLOAD", formData)
        if(response.status === 201){
            const imageUrl = response.data.image_url;
            Editor.insertEmbed(cursorLocation, "image", imageUrl);
            resetUploader();
        }
    },
    snotify(type,message){
        bus.$emit('showSnackbar',{
            type,
            message
        });
    },
  },
}

</script>

<style scoped>

dd {
  margin: 0;
}

.write-container{
  max-width: 1080px;
  margin: 0 auto;
}

.title{
  width:100%;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
  padding-top: 8px;
  padding-bottom: 4px;
}
.title input{
  width: 100%;
  max-width:1080px;
  height: 100%;
  box-sizing : border-box;
  border: 1px solid #ccc;
  font-size:16px;
  padding-left:10px;
}
.title input::placeholder{
  color:#ccc;
  font-size:16px;
}
.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #EEE;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 300px;
  font-size: 14px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: .5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: #fff;
  font-weight: 600;
}

.submit-box {
    display: flex;
    justify-content: right;
    margin-bottom: 80px;
    margin-top: 40px;
}

.create-button {
    outline: none;
    margin-right: 20px;
    border: none;
    cursor: pointer;
    padding: 10px 20px 11px;
    font-size: 15px;
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
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 20px 11px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    color: hsl(0, 0%, 100%);
    background-color: #909090;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

/* 여기부터 공구 폼 */
.purchase-container {
  background-color:#f5f5f5;
  border-radius: 10px;
  width: 100%;
  height: auto;
  margin: 50px auto;
  padding: 20px 0px;
}

.purchase-form {
  display: grid;
  grid-template-columns: 130px 320px auto;
  grid-template-rows: 40px 60px 60px 60px 60px 60px;
  margin-bottom: 20px;
  padding: 10px 30px;
}

.purchase-form span {
  margin-left: 40px;
  font-size: 1.1rem;
  font-weight: 650;
  grid-column: 1 / 3;
  grid-row:1 / 2; 
  
}

.purchase-form dt {
  font-size: 1rem;
  margin: auto 0px;
}

.product-name {
  grid-column: 1 / 2;
  grid-row:2 / 3; 
}

.product-name-text {
  grid-column: 2 / 3;
  grid-row:2 / 3;
}

.product-number {
  grid-column: 1 / 2;
  grid-row:3 / 4; 
}

.product-number-text {
  grid-column: 2 / 3;
  grid-row:3 / 4; 
}

.product-price {
  grid-column: 1 / 2;
  grid-row:4 / 5; 
}

.product-price-text {
  grid-column: 2 / 3;
  grid-row:4 / 5; 
}

.person-limit {
  grid-column: 1 / 2;
  grid-row:5 / 6; 
}

.person-limit-text {
  grid-column: 2 / 3;
  grid-row:5 / 6; 
}

.product-link {
  grid-column: 1 / 2;
  grid-row:6 / 7; 
}

.product-link-text {
  grid-column: 2 / 3;
  grid-row:6 / 7; 
}

.open-at {
  grid-column: 3 / 4;
  grid-row:2 / 3; 
  padding: 10px 45px;
}

.open-at-text {
  grid-column: 3 / 4;
  grid-row:3 / 4; 
}

.close-at {
  grid-column: 3 / 4;
  grid-row:4 / 5; 
  padding: 10px 45px;
}

.close-at-text {
  grid-column: 3 / 4;
  grid-row:5 / 6; 
}

/* 공구 종료 후... form */

.purchase-end-form {
  display: grid;
  grid-template-columns: 130px 320px auto;
  grid-template-rows: 50px 60px 60px 60px;
  padding: 10px 30px;

}

.purchase-end-form span {
  margin-left: 40px;
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: 650;
  grid-column: 1 / 3;
  grid-row:1 / 2; 
}

.purchase-end-form dt {
  font-size: 1rem;
  margin: auto 0px;
}

.end-option {
  grid-column: 1 / 2;
  grid-row:2 / 3; 
}

.end-option-text {
  grid-column: 2 / 3;
  grid-row:2 / 3; 
}

.location {
  grid-column: 1 / 2;
  grid-row:3 / 4; 
}

.location-text {
  grid-column: 2 / 3;
  grid-row:3 / 4; 
}

.meeting-at {
  grid-column: 1 / 2;
  grid-row:4 / 5; 
}

.meeting-at-text {
  grid-column: 2 / 3;
  grid-row:4 / 5; 
}

.mapping {
  grid-column: 3 / 4;
  grid-row:1 / 5;
  background-color: #dddddd;
  width: 240px;
  height: 240px;
  margin: auto;
}

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
  background-color: #ffffff;
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

.input-wrapper {
  margin-top: 10px;
}

.input-num-wrapper {
  margin-top: 10px;
}

.input-date-wrapper {
  display: flex;
  justify-content: center;
}

.gp-input-num-box {
  width: 100px;
  height: 20px;
  background-color: #05060f0a;
  border-radius: .3rem;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}

.gp-input-num-box:hover, .gp-input-num-box:focus, .input {
  outline: none;
  border-color: #9E2067;
}

.gp-input-box {
  width: 220px;
  height: 20px;
  background-color: #05060f0a;
  border-radius: .3rem;
  padding: 0.5rem 0.7rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}

.gp-input-box:hover, .gp-input-box:focus, .input {
    outline: none;
    border-color: #9E2067;
}
  
.input-group:hover .label, .input:focus {
    color: #9E2067;
}

.gp-select-box {
  width: 240px;
  height: 40px;
  background-color: #05060f0a;
  border-radius: .3rem;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}

</style>