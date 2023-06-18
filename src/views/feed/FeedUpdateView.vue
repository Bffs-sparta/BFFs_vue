<template>
    <div>
        <div class="write-container">
        <div class = "title">
            <input type="text" id="title" v-model="title" placeholder="제목을 입력해주세요">
        </div>
        <vue-editor v-model="content" :useCustomImageHandler="true" @image-added="handleImageAdded"></vue-editor>
        <div class="submit-box">
            <button class="create-button" @click="editFeed">수정하기</button>
            <button class="quit-button">취소하기</button>
        </div>
    </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fetchFeedDetail,fetchFeedEdit } from "@/api";
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            title:'',
            content: null,
            categoryId: "",
        };
    },
    mounted() {
        this.getFeed();
    },
    methods:{
        async getFeed(){
            const feed_id = this.$route.params.feed_id;
            try{
                const response = await fetchFeedDetail(feed_id);
                if(response.status === 200){
                    const feed = response.data.feed
                    this.title = feed.title;
                    this.content = feed.content;
                }
            }catch(error){
                console.log(error);
            }
        },
        async editFeed(){
            const feed_id = this.$route.params.feed_id;
            try{
                const response = await fetchFeedEdit(feed_id, this.title, this.content);
                if(response.status === 200){
                  alert(response.data.message);
                  this.$router.push({name: "feed-detail", params: {feed_id: feed_id}});
                }
            }catch(error){
                console.log(error);
            }
        },
        
    }
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