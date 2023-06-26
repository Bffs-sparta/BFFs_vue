<template>
    <div>
        <div class="inner">
        <h3>내 정보 수정하기</h3>

            <div class="mypage">
                <div class="list">
                    <dl>
                        <dt>email</dt>
                        <dd>
                            <div class="input-box">
                                <input readonly autocomplete="off" id="comu-title" class="input-title" type="comu-title" v-model="profile.user_email">
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>name</dt>
                        <dd>
                            <div class="input-box">
                                <input readonly autocomplete="off" id="comu-title" class="input-title" type="comu-title" v-model="profile.user_name">
                            </div>
                        </dd>
                    </dl>

                    <dl>
                        <dt>nickname</dt>
                        <dd>
                            <div class="input-box">
                                <input autocomplete="off" id="comu-title" class="input-title-box" type="comu-title" v-model="profile.nickname">
                            </div>
                        </dd>
                    </dl>

                    <dl>
                        <dt>region</dt>
                        <dd>
                            <div class="input-box">
                                <input autocomplete="off" id="comu-title" class="input-title-box" type="comu-title" v-model="profile.region">
                            </div>
                        </dd>
                    </dl>

                    <dl>
                        <dt>introduction</dt>
                        <dd>
                            <div class="input-box">
                                <input autocomplete="off" id="comu-title" class="input-title-box" type="comu-title" v-model="profile.introduction">
                            </div>
                        </dd>
                    </dl>
                    <div class="guestbook-comment">
                        <div class="submit-box">
                            <button class="Btn" @click="editProfile">수정
                                <svg class="Btn-svg" viewBox="0 0 512 512">
                                    <path
                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                    </path>
                                </svg>
                            </button>
                            <button class="quit-button" @click="goBack">취소</button>
                        </div>               
                    </div>
                </div>

                <div class="user_profile">
                    <div class="card">
                        <!-- <div class="card-image" v-if="profile.profileimage !== null">
                            <img :src="profile.profileimageurl.slice(28)" />
                        </div> -->
                        <div class="card-image">
                            <img :src="profile.profileimageurl" v-if="profile.profileimage !== null && profile.profileimage.includes('profile_img')" :style="{ opacity: profile.profileimage !== null ? 1 : 0 }" />
                            <img :src="profile.profileimageurl.slice(33)" v-else-if="profile.profileimage !== null" :style="{ opacity: profile.profileimage !== null ? 1 : 0 }" />
                            <img src="@/assets/room_image(5).jpg" v-else />
                        </div>
                        <div class="image-box">
                            <label class="custum-file-upload" for="file">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                                </div>
                                <div class="text">
                                    <span>Click to upload image</span>
                                </div>
                                <input type="file" id="file" @change="InputImage" ref="fileInput">
                            </label>
                        </div>
                    </div>
                </div>

            </div>     
        </div>

        
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchProfileEdit } from "@/api/index.js";

export default {
    computed: {
        ...mapGetters(["fetchProfile"]),
        profile() {
            return this.fetchProfile.profile;
        },
    },
    watch:{
        $route(){
            const target_user = this.$route.params.id
            const payload = localStorage.getItem("payload")
            const { user_id } = JSON.parse(payload)
            if(target_user!=user_id){
                this.$router.go(-1)
            }
        }
    },
    data() {
        return {
        }
    },
    created() {
        const target_user = this.$route.params.id
        this.$store.dispatch("FETCH_USER_PROFILE", target_user);
        const payload = localStorage.getItem("payload")
        const { user_id } = JSON.parse(payload)
        if(target_user!=user_id){
            this.$router.go(-1)
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        InputImage(event) {
            this.profile.profileimageurl = event.target.files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event)
                this.profile.profileimageurl = event.target.result;
            }
            reader.readAsDataURL(this.profile.profileimageurl)
        },
        async editProfile() {
            try {
                const nickname = this.profile.nickname
                const region = this.profile.region
                const introduction = this.profile.introduction
                const image = this.$refs.fileInput.files[0]

                const formData = new FormData()
                formData.append("nickname", nickname)
                if (region) {
                    formData.append("region", region)
                }
                if (introduction) {
                    formData.append("introduction", introduction)
                }
                if (image) {
                    formData.append("profileimage", image)
                }

                const user_id = this.$route.params.id
                const response = await fetchProfileEdit(user_id, formData)
                if (response.status === 200) {
                    alert(response.data.message)
                    this.$router.push(`/profile/${user_id}`)
                }
            } catch (error) {
                console.log(error)
                if (error.response.status === 400) {
                    alert("닉네임은 필수입니다!")
                }
            }
        },
    },
}
</script>

<style scoped>
dl {
    align-items: center;
}

dt {
    margin-left: 0;
    width: 70px;
}

.card {
  width: 462px;
  background: white;
  padding: .4em;
  border-radius: 6px;
}

.card > .change {
    margin-top: 24px;
    float: right;
}

.card-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 60%;
    border-radius: 6px 6px 0 0;
}

.card-image:hover {
  transform: scale(0.98);
}
.card-image img {
    width: auto;
    max-width: 462px;
    max-height: 254px;
}

.category {
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: 600;
  color: rgb(63, 121, 230);
  padding: 10px 7px 0;
}

.category:hover {
  cursor: pointer;
}

.heading {
  font-weight: 600;
  color: rgb(88, 87, 87);
  padding: 7px;
}

.heading:hover {
  cursor: pointer;
}

.author {
  color: gray;
  font-weight: 400;
  font-size: 11px;
  padding-top: 20px;
}

.name {
  font-weight: 600;
}

.name:hover {
  cursor: pointer;
}

.mypage {
    width: 1100px;
    top: 0;
    bottom: 0;
    right: 80px;
    margin: auto;
    display: grid;
    place-items: center;
    grid-template-rows: 600px;
    grid-template-columns: repeat(1, 400px);
    grid-template-columns: repeat(3, 1fr);
}

.inner > h3 {
    margin-top: 40px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
    color: #909090;
}

.list:nth-child(1) {
    grid-column: 1 / 3;
}

.user_profile:nth-child(1) {
    grid-column: 1 / 4;
}

.list {
    margin-right:44px;
}

.list > dl {
    display: flex;
}

.guestbook-comment > .submit-box {
    display: flex;
}

.guestbook-comment {
    height: 150px;
    float: right;
}

.guestbook-comment > .submit-box {
    display: flex;
    height: 43px;
    top: 0;
    bottom: 0;
    left: 33%;
    margin: 0 auto;
    margin-right:28px;
}

.input-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-title {
    color: #909090;
    width: 450px;
    height: 44px;
    margin-right: 28px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-title:hover, .input-title:focus{
    outline: none;
    border-color: transparent;
    cursor: default;
}

.input-title-box {
    color: #909090;
    width: 450px;
    height: 44px;
    margin-right: 28px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-title-box:hover, .input-title-box:focus{
    outline: none;
    border-color: #9E2070;
}

.submit-box {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 40px;
}

.submit-box {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 40px;
}

.quit-button {
    width: 100px;
    height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 31px 11px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    color: hsl(0, 0%, 100%);
    background-color: #909090;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

/* 새 글 쓰기 button */

.Btn {
    margin-right: 15px;
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
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
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

/***** imageupload css area *****/
.input-image {
    width: auto;
    max-width: 333px;
    max-height: 250px;
}

.custum-file-upload {
    height: 150px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
}

.custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.custum-file-upload .icon svg {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
}

.custum-file-upload .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
    display: none;
}

.image-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}
</style>