<template>
    <div>
        <section class="head-section">
            <div class="head-area">
                <img id="head_img">
                <img id="head_title_img">
                <p class="head-title">AI BestFriend와 대화하기:D</p>
            </div>
        </section>
        <section class="main-section">
        <button class=".back-button">
            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>뒤로</span>
        </button>
        <div class="main-area"></div>
            <div class="main-container">
                <div class="main-title">
                    <img src="@/assets/heart_ballon.png">
                    <h2>AI 친구와 대화해보세요!</h2>
                </div>
                <div class="ai-content">
                </div>
                <div class="input-content-wrapper">
                    <div class="input-content-box">
                        <textarea class="input-content" placeholder="여기에 글씨를 입력하세요"></textarea>
                    </div>
                    <div class="input-button">
                        <a>입 력</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

.head-area {
    width: 100%;
    height: 250px;
    position: relative;
    background: rgb(116, 35, 61);
}

.head-area p {
    margin-top: 190px;
    margin-left: 5%;
    font-size: 25px;    
    color: white;
}

.head-title {
    word-spacing:5px;
    letter-spacing:1px;
}

.main-area {
    width: 1200;
    height: auto;
}

.main-container {
    margin: 20px 0px 70px 0px;
    padding: 30px;
}

/* ai 이미지 area */

.main-title {
    display: grid;
    grid-template-rows: auto 30px;
    justify-content: center;
}

.main-title img {
    width: 180px;

    grid-row: 1/2;
    margin: 0 auto;
}

.main-title h2 {
    color: #454545;
    margin-left: 15px;

    grid-row: 2/3;
    margin: 0 auto;
}

/* 뒤로 버튼 */

button {
    margin: 20px 40px;
    display: flex;
    height: 3em;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #454545;
    border-radius: 3px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
    background: #909090;
}

button span {
    font-size: 14px;
    font-weight: 600;
    color: white;
}

button svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
    fill: white;
}

button:hover svg {
    font-size: 1.2em;
    transform: translateX(-5px);
    fill: white;
}

button:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-2px);
}


/* 대화창 area */

.ai-content {
    width: 75%;
    height: 500px;
    justify-content: center;
    background-color: antiquewhite;
    margin: 30px auto;
}

/* 입력창 area */

.input-content-wrapper {
    display: flex;
    justify-content: center;
    margin: 3% 15%;
}

.input-content-box {
    display: flex;

    width: 100%;
    height: 75px;
    margin: 0 0 auto;
    position: relative;
}

.input-content {
    position: absolute;
    width: 93%;
    height: 100%;
    margin: 0 auto;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 1rem 1.2rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-content:hover, .input:focus, .input-group:hover .input {
    outline: none;
    border-color: #9E2070;
}

.input-group:hover .label, .input:focus {
    color: #9E2070;
}


/* 입력 button area */

.input-button {
    outline: none;
    border: none;
    cursor: pointer;
    width: 50px;
    padding: 45px 20px 40px 30px;
    margin-left: 20px;
    margin-right: auto;
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

.create-button::after,
.create-button::before {
    transition: all 0.5s ease-in-out;
}
</style>