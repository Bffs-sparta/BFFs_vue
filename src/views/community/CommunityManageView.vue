<template>
    <div v-if = "fetchCommunityDetail.data">
        <section class="head-section">
            <div class="head-area">
            </div>
        </section>
        <section class="main-section">
            <div class="main-area">
                <div class="main-container">
                    <div class="main-title">
                        <h1>커뮤니티 관리하기</h1>
                    </div>
                </div>
                <div class="main-container">
                    <div class="main-wrapper">
                        <div class="sub-title">
                            <span>
                            <h3>커뮤니티 이름</h3>
                            <p id="community_title">{{ fetchCommunityDetail.data.title }}</p>
                            </span>
                            <img class="input-image" v-if="fetchCommunityDetail.data.image != null" :src="fetchCommunityDetail.data.imageurl">
                            <img class="input-image" v-else src="@/assets/comu_image(1).jpg">
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
                <div class="main-container">
                    <div class="sub-title2">
                        <span>
                            <h3>커뮤니티 소개</h3>
                            <div class="input-box">
                                <textarea autocomplete="off" id="introduction" class="input-introduction" 
                                v-model="fetchCommunityDetail.data.introduction"></textarea>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="main-container">
                    <div class="sub-title3">
                        <span>
                            <h3>금지어 설정</h3>
                            <div class="member-wrapper">
                                <div class="search-area" style="align-items: center;">
                                    <div class="search-box">
                                        <div class="container-input">
                                            <input type="text" placeholder="Forbidden word" name="text" class="input" style="margin-bottom: 14px;"
                                            @keyup.enter="forbidden()" v-model="word" autocomplete="off">
                                        </div>                                        
                                    </div>
                                </div>                                
                                <div class="input-box">
                                    <div class="forbidden-wrapper">
                                        <a v-for="(forbidden, index) in fetchCommunityDetail.data.forbiddenword" :key="index">   #{{ forbidden }} <font-awesome-icon :icon="['fa', 'ban']" size="xs" style="color: #9E2067;" class="icon" @click="forbiddenDelete(forbidden)"/></a>                   
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="main-container">
                    <div class="sub-title2">
                        <span>
                            <h3>회원 관리하기</h3>
                            <div class="member-wrapper">
                                <div class="search-area">
                                    <div class="admin-box">
                                        <p class="comuadmin-name"> 메인 관리자 :</p>
                                        <p class="comuadmin-name" id="comuadmin_name">{{ fetchCommunityDetail.data.admin[0].nickname }} | {{ fetchCommunityDetail.data.admin[0].user }}</p>
                                    </div>
                                </div>
                                <div class="member-area-admin">
                                    <div class="member-menu">
                                        <div class="member-content1">
                                            <span class="realname1">이름</span>
                                            <span class="nickname1">닉네임</span>
                                            <span class="feed1">최근 접속일</span>
                                            <span class="subadmin1">관리자 설정</span>
                                        </div>
                                    </div>
                                    <!-- 멤버 리스트 -->
                                    <div class="member-list" v-for="admin,index in fetchCommunityDetail.data.admin.slice(1)" :key="index">
                                        <ul class="member-content">
                                            <li id="realname">{{ admin.name }}</li>
                                            <li id="nickname" v-if="admin.nickname">{{ admin.nickname }}</li>
                                            <li id="nickname" v-else>닉네임 없음</li>
                                            <li id="feed" v-if="admin.last_login">{{ admin.last_login.slice(0, 10) }}</li>
                                            <li id="feed" v-else>최근 접속일 없음</li>
                                            <li id="subadmin">
                                            <!-- subadmin 이면 상단에 배치 및 아이콘 띄워주기 -->
                                                <img id="checked" src="@/assets/checked.png"> 
                                            </li>
                                            <li class="button-box">
                                                <button @click="deleteSubadmin(admin.user_id || admin.id)"> 삭제 </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="search-area">
                                    <h3>새로운 관리자 등록하기</h3>
                                    <div class="search-box">
                                        <div class="container-input">
                                            <input type="text" placeholder="Search" name="text" class="input"
                                            @keyup.enter="searchUser()" v-model="user" autocomplete="off">
                                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="member-wrapper">
                                    <div class="member-area">
                                        <div class="member-menu">
                                            <div class="member-content1">
                                                <span class="realname1">이름</span>
                                                <span class="nickname1">닉네임</span>
                                                <span class="feed1">최근 접속일</span>
                                                <span class="subadmin1">관리자 설정</span>
                                            </div>
                                        </div>
                                        <!-- 멤버 리스트 -->
                                        <div class="member-list" v-for="user,index in fetchCommunityAdmin" :key="index">
                                            <ul class="member-content">
                                                <li id="realname">{{ user.name }}</li>
                                                <li id="nickname" v-if="user.nickname">{{ user.nickname }}</li>
                                                <li id="nickname" v-else>닉네임 없음</li>
                                                <li id="feed" v-if="user.last_login">{{ user.last_login.slice(0, 10) }}</li>
                                                <li id="feed" v-else>최근 접속일 없음</li>
                                                <li id="subadmin">
                                                <!-- subadmin 이면 상단에 배치 및 아이콘 띄워주기 -->
                                                    <img id="checked" src="@/assets/checked.png"> 
                                                </li>
                                                <li class="button-box">
                                                    <button @click="createSubadmin(user.id || user.user_id)"> 등록 </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div class="submit-box">
                <button class="create-button" @click="communityEdit()">저장하기</button>
                <button class="create-button" @click="communityDeleteCheck()">삭제하기</button>
                <button class="quit-button">취소하기</button>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchForbiddenCreate, fetchForbiddenDelete, fetchSubAdminCreate, fetchSubAdminDelete, 
    fetchCommunityEdit, fetchCommunityDelete } from "@/api/index.js";

export default {
    data() {
        return {
            word: '',
            user: '',
        }
    },
    computed: {
        ...mapGetters(["fetchCommunityDetail", "fetchCommunityAdmin"]),
        userdata(){
            return this.fetchCommunityAdmin
        },
        admindata(){
            return this.fetchCommunityDetail.data.admin
        }
    },
    created() {
        const community_name = this.$route.params.name
        this.$store.dispatch("FETCH_COMMUNITY_DETAIL", community_name);
        this.$store.dispatch("FETCH_USER_LIST", community_name);
        
    },
    methods: {
        async forbidden() {
            try {
                const community_name = this.$route.params.name
                const response = await fetchForbiddenCreate(community_name, this.word)
                if (response.status === 201) {
                    this.fetchCommunityDetail.data.forbiddenword.push(this.word);
                    this.word = '';
                }
            } catch (error) {
                console.log(error)
            }
        },
        async forbiddenDelete(word) {
            try {
                const community_name = this.$route.params.name
                const response = await fetchForbiddenDelete(community_name, word)
                if (response.status === 200) {
                    this.fetchCommunityDetail.data.forbiddenword.splice(this.fetchCommunityDetail.data.forbiddenword.indexOf(word), 1);
                }
            } catch (error) {
                console.log(error)
            }
        },
        async createSubadmin(id) {
            try {
                const community_name = this.$route.params.name
                const response = await fetchSubAdminCreate(community_name, id)
                if (response.status === 201) {
                    const index = this.fetchCommunityAdmin.findIndex(item => item.id === id || item.user_id === id);
                    const removeuser= this.fetchCommunityAdmin.splice(index, 1);
                    this.fetchCommunityDetail.data.admin.splice(this.fetchCommunityDetail.data.admin.length, 0, ...removeuser)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteSubadmin(id) {
            try {
                const community_name = this.$route.params.name
                const response = await fetchSubAdminDelete(community_name, id)
                if (response.status === 200) {
                    const index = this.fetchCommunityDetail.data.admin.findIndex(item => item.user_id === id || item.id === id);
                    const removeuser = this.fetchCommunityDetail.data.admin.splice(index, 1);
                    this.fetchCommunityAdmin.splice(this.fetchCommunityAdmin.length, 0, ...removeuser)
                }
            } catch (error) {
                console.log(error)
            }
        },
        InputImage(event) {
            this.fetchCommunityDetail.data.imageurl = event.target.files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event)
                this.fetchCommunityDetail.data.imageurl = event.target.result;
            }
            reader.readAsDataURL(this.fetchCommunityDetail.data.imageurl)
        },
        async communityEdit() {
            try {
                const community_name = this.$route.params.name
                const introduction = this.fetchCommunityDetail.data.introduction
                const image = this.$refs.fileInput.files[0]

                const formData = new FormData()
                formData.append("introduction", introduction)
                if (image) {
                    formData.append("image", image)
                }

                const response = await fetchCommunityEdit(community_name, formData)
                if (response.status === 200) {
                    this.$router.go()
                }
            } catch (error) {
                console.log(error)
            }
        },
        searchUser() {
            const user = this.user
            const community_name = this.$route.params.name
            this.$store.dispatch("search_user", {user,community_name});
        },
        communityDeleteCheck() {
            const check = confirm(`${this.fetchCommunityDetail.data.title} 커뮤니티를 삭제하시겠습니까?`)
            if (check) {
                this.communityDelete();
            }
        },
        async communityDelete() {
            try {
                const community_name = this.$route.params.name
                const response = await fetchCommunityDelete(community_name)
                if (response.status === 204) {
                    alert("삭제가 완료되었습니다.")
                    this.$router.push('/')
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

.head-area {
    width: 100%;
    height: 120px;
    position: relative;
    /* 나중에 삭제할 부분, 크기 위치 조정을 위해 넣어둠 */
    background: rgb(39, 35, 116); 
}

.main-area {
    width: 100%;
    height: auto;
    vertical-align: middle;
}

.main-container {
    padding: 30px;
    position: relative;
    display: flex;
    vertical-align: middle;
    justify-content: center;
}

/***** Title area *****/

.main-title {
    width:100%;
    vertical-align:middle;
}

.main-title h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 450;
    font-size: 2.0rem;
    color: #909090;
}

/***** Content area *****/

.main-wrapper {
    display: flex;
    vertical-align: middle;
}

.sub-title {
    width:100%;
    /*justify-content: center;
    display: flex;*/
    float: left;
}

.sub-title span {
    display: flex;
    align-items: center;
    padding-top: 10px;
    margin-right: 190px;
}

.sub-title h3 {
    /*display: flex;*/
    margin-right: 30px;
    color: #909090;
}

.sub-title p {
    font-weight: 550;
    font-size: 1.3rem;
    color: #454545;
}

.sub-title2 {
    display: flex;
    justify-content: center;
    width: 100%;
}

.sub-title2 span {
    display: flex;
    align-items: center;
}

.sub-title2 h3 {
    margin-right: 30px;
    color: #909090;
}

.sub-title3 {
    display: flex;
    justify-content: center;
    width: 100%;
}

.sub-title3 span {
    display: flex;
    align-items: center;
}

.sub-title3 h3 {
    margin-right: 45px;
    color: #909090;
}

/***** imageupload css area *****/
.input-image {
    width: auto;
    max-width: 333px;
    max-height: 250px;
    
}

.image-box {
    display: flex;
    justify-content: center;
    align-items: center;
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

/***** textarea css area *****/

.input-box {
    display: flex;
    justify-content: center;
    width: 700px;
}

.input-box textarea {
    color: #909090;
}

.input-box-forbidden {
    display: block;
    justify-content: center;
    width: 700px;
}

.input-introduction {
    width: 100%;
    height: 150px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 1rem 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-introduction:hover, .input-introduction:focus, .input {
    outline: none;
    border-color: #9E2070;
}

.input-group:hover .label, .input:focus {
    color: #9E2070;
}

.forbidden-wrapper {
    width: 100%;
    height: 150px;
    border-radius: 0.5rem;
    padding: 20px;
    background-color: #05060f0a;
    color: #909090;
}

.forbidden-wrapper a svg:hover {
    transform: scale(1.2);
    cursor: pointer;
}

/***** member area *****/


.member-area {
    width: 660px;
    height: 250px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
    overflow:scroll;
    position: relative;
}

.member-area-admin {
    width: 660px;
    height: 160px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
    overflow:scroll;
    position: relative;
}

.member-menu {
    height: 20px;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;  
    overflow: auto;
    position: sticky;
}

.member-content1 {
    color : #dddddd; 
    font-weight: 700;
    font-size: 0.9rem;
}

.member-content1 span {
    float: left;
    margin-left: 60px;
    margin-right: 20px;
}

.feed1 {
    padding-left: 25px;
    width: 120px;
}

.memeber-list {
    display: flex;
    vertical-align: middle;
}
.member-content {
    list-style-type: none;
    float: left;
    color : #909090; 
    font-size: 0.9rem;
    margin-block-start: 0.3em;
    margin-block-end: 0.5em;   
}

.member-content li {
    float: left;
    margin-right: 10px;
    padding-left: 15px
}

#realname {
    width: 90px;
}

#nickname {
    width: 80px;
}

#feed {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 44px;
}

#subadmin {
    width: 20px;
    padding-left: 6px;
}

.button-box {
    cursor: pointer;
}

/***** search area *****/

.comuadmin-name {
    float: left;
    margin-right: 20px;
    padding-top: 10px;
    font-weight: 500;
    font-size: 0.95rem;
    color : #909090
}

.search-area {
    margin: 5px;
    display: flex;
    justify-content: space-between;
}

.search-box {
    margin-top: 14px;
    align-items: center;
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


/***** button area *****/

.submit-box {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 40px;
}

.create-button {
    margin-right: 30px;
    outline: none;
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