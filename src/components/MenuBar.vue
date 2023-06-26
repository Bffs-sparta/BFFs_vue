<template>
    <div>
        <header>
            <div id="menu">
                <div class="sub-menu">
                    <div class="hamburger">
                        <div class="material-icons">menu</div>
                    </div>
                    <h2>
                        <a href="">Be My Best Friend:D</a>
                    </h2>
                </div>

                <div class="ct_1">
                    <ul class="alone_play">
                        <li><h3><a>혼자 놀기</a></h3></li>
                        <li><router-link :to="`/profile/${userid}`">내 프로필</router-link></li>
                        <li><router-link :to="`/profile/update/${userid}`">내 프로필 수정하기</router-link></li>
                        <li><router-link :to="`/profile/${userid}`">내 커뮤니티 관리하기</router-link></li>
                        <li><router-link to="/meetfriend">친구 만나기</router-link></li>
                        <li >
                            <h4>
                                <router-link to="/meetai">AI Best Friend와 놀기!</router-link>  
                            </h4>    
                        </li> 
                    </ul>
                </div>
                <div class="ct_2">
                    <ul class="together_play">
                        <li><h3><a href="">같이 놀기</a></h3></li>
                        <li><router-link to="/community/main">같이 놀기 페이지로 이동</router-link></li>
                        <li><router-link to="/community/create">커뮤니티 생성 신청하기</router-link></li>        
                    </ul>
                </div>

                <div class="suggestions">
                    <p>건의사항은 개발자 이메일로 보내주세요!</p>
                    <br>
                    <p>* makebffs@gmail.com *</p>
                </div>

            </div>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userid: '',
        }
    },
    mounted() {
        const payload = localStorage.getItem('payload');
        if (payload) {
        const { user_id } = JSON.parse(payload);
        this.userid = user_id;
        }
    },
}
</script>

<style scoped>
* {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

p {
    color: #000
}

img {
    display: block;
}

header > #menu {
    width: 348px;
    height: 648px;
    background-color: #9E2067;
}

header > #menu > .sub-menu {
    display: flex;
    align-items: center;
    height: 70px;
}

header > #menu > .sub-menu > .hamburger > .material-icons {
    color: #D7C0CD;
    margin-left: 12px;
    margin-right: 4px;
}

header > #menu > .sub-menu > h2 {
    color: #D7C0CD;
}

header > #menu > .ct_1 {
    margin-bottom: 48px;
}

header > #menu > .ct_1 > .alone_play {
    list-style-type: none;
}

header > #menu > .ct_1 > .alone_play  {
    padding-left: 18px;
}

header > #menu > .ct_1 > .alone_play > li {
    margin: 8px 0;
    color: #f0f0f0;

}

header > #menu > .ct_1 > .alone_play > li > a {
    margin-left: 24px;
    color: #D7C0CD;

}

header > #menu > .ct_2 > .together_play {
    padding-left: 18px;
}

header > #menu > .ct_2 > .together_play > li {
    margin: 8px 0;
    color: #f0f0f0;
}

header > #menu > .ct_2 > .together_play > li > a {
    margin-left: 24px;
    color: #D7C0CD;
}

header > #menu > .ct_2 > .together_play {
    list-style-type: none;
}

header > #menu {
    position: relative
}

header > #menu > .suggestions {
    position: absolute;
    margin: 0 0 8px 12px;
    bottom: 0;
}

header > #menu > .suggestions > p {
    color: #D7C0CD;
    font-size: 12px;
}

header > #menu > .ct_1 > .alone_play > li > h4 > a {
    font-style: italic;
    font-weight: bold;
    color: #f0f0f0;
}
</style>