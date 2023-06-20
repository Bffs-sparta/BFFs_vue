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
    padding-left: 12px;
}

header > #menu > .ct_1 > .alone_play > li {
    margin: 8px 0;
}

header > #menu > .ct_1 > .alone_play > li > a {
    margin-left: 24px;
}

header > #menu > .ct_2 > .together_play {
    padding-left: 12px;
}

header > #menu > .ct_2 > .together_play > li {
    margin: 8px 0;
}

header > #menu > .ct_2 > .together_play > li > a {
    margin-left: 24px;
    color: #454545;
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
    color: #9E2067;
}

header > .inner{
        position: relative;
        width: 1100px;
        height: 120px;
        margin: 0 auto;
        background-color: #fff;
        opacity: 0.6;
}

header > .inner > h1 > .logo {
    height: 111px;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
}

header > .inner > .sub-menu {
    position: absolute;
    top: 10;
    right: 0;
    display: flex;
}

header > .inner > .sub-menu > nav > h2 {
    visibility: hidden;
}

header > .inner > .sub-menu > nav > .menu {
    list-style-type: none;
    display: flex;
    padding-right: 48px;
    align-items: center;
    height: 70px;
}

header > .inner > .sub-menu > nav > .menu > li{
 position: relative;
}

header > .inner > .sub-menu > nav > .menu > li::before {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 12px;
    background-color: black;
    top: 0;
    bottom: 0;
    margin: auto 0;
}

header > .inner > .sub-menu > nav > .menu > li:first-child:before {
    display: none;
}

header > .inner > .sub-menu > nav > .menu > li > a{
    padding: 11px 12px;
    color: #454545;
}

header > .inner > .sub-menu > nav > .menu > li > a:hover {
    color: #9E2067;
}

header > .inner > .sub-menu > .hamburger {
    position: relative;
}

header > .inner > .sub-menu > .hamburger > .material-icons {
    height: 24px;
    position: absolute;
    top: 0;
    bottom: 0;

    right: 4px;
    margin: auto;
}
</style>