<template>
    <div class="write-container" v-if="categories.data">
        <div>
          <h3>카테고리</h3>
          <div class="radio-inputs">
            <label class="radio"  v-for="category,index in categories.data.categories" :key="index">
              <input type="radio" name="radio" v-model="categoryId" :value="category[0]" v-if="index==1" checked="">
              <input type="radio" name="radio" v-model="categoryId" :value="category[0]" v-else>
              <span class="name">{{ category[1] }}</span>
            </label>
          </div>
        </div>
        <div class = "title">
            <input type="text" id="title" v-model="title" placeholder="제목을 입력해주세요">
        </div>
        <vue-editor v-model="content" :useCustomImageHandler="true" @image-added="handleImageAdded"></vue-editor>
        <div class="submit-box">
            <button class="create-button" @click="writeFeed">생성하기</button>
            <button class="quit-button" @click="goBack">취소하기</button>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

export default {
	components: {
		VueEditor
	},
	computed: {
		...mapGetters({"categories":"fetchCommunityCategoryDetail"}),
	},
	created() {
		const community_name = this.$route.params.community_name;
		this.$store.dispatch("FETCH_COMMUNITY_CATEGORY_DETAIL", community_name);
	},
	data() {
		return {
			title:'',
			content: "",
			categoryId: "",
		};
	},
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      async writeFeed() {
          try{
              const response = await this.$store.dispatch("FETCH_FEED_CREATE", {
                title: this.title,
                content: this.content,
                categoryId: this.categoryId,
              });
              if(response.status === 201){
                alert(response.data.message)
                this.$router.push({name: "community-detail", params: {name: this.$route.params.community_name}});
              }
          }catch(error){
              alert('카테고리를 입력해주세요')
          }
      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
          const formData = new FormData();
          formData.append("image", file);
          console.log(file)
          const response = await this.$store.dispatch("FETCH_IMAGE_UPLOAD", formData)
          console.log(response)
          if(response.status === 201){
              const imageUrl = response.data.image_url;
              Editor.insertEmbed(cursorLocation, "image", imageUrl);
              resetUploader();
          }
      },
    },
}

</script>

<style scoped>
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
    margin-bottom: 50px;
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
</style>