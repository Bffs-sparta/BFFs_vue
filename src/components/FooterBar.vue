<template>
  <div>
    <footer class="footer-distributed">

      <div class="footer-left">

        <h3><img src="@/assets/b2.png" alt=""></h3>

        <p class="footer-links">
          <a href="#" class="fa">Home</a>
          ·
          <a href="https://www.canva.com/design/DAFmmwfCZn0/pKTamb5AtYNPBIsMgtIhcg/edit?utm_content=DAFmmwfCZn0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">Introduce</a>
          ·
          <a href="https://www.notion.so/S-A-f4ad0c52ab5442c7b96ba1ae7a7f17f8">Notion</a>
          ·
          <a href="https://forms.gle/y2VCkqynsA3CtrrE8">Feedback</a>
          ·
          <a href="mailto:swing6514@gmail.com">Contact</a>
        </p>

        <p class="footer-company-name">Best Friend Forever &copy; 2023</p>
      </div>

      <div class="footer-center">

        <div class="member-lists">
          <p><span>김근혜</span> Geunhye, Kim</p>
          <div class="member-icons">
            <a href="https://sw-ing.tistory.com/"><img src="@/assets/tistory_logo.png" alt=""></a>
            <a href="https://github.com/geunhye-kim"><img src="@/assets/github_logo.png" alt=""></a>
          </div>
        </div>
        <div class="member-lists">
          <p><span>원윤희</span> Yunhui, Won</p>
          <div class="member-icons">
            <a href="https://velog.io/@alli9"><img src="@/assets/velog_logo.png" alt=""></a>
            <a href="https://github.com/gangyuji"><img src="@/assets/github_logo.png" alt=""></a>
          </div>
        </div>
        <div class="member-lists">
          <p><span>정승호</span> Seungho, Jung</p>
          <div class="member-icons">            
            <a href="https://teapackage.tistory.com/"><img src="@/assets/tistory_logo.png" alt=""></a>
            <a href="https://github.com/torigasuki"><img src="@/assets/github_logo.png" alt=""></a>
          </div>
        </div>
        <div class="member-lists">
          <p><span>황단아</span> Dana, Hwang</p>
          <div class="member-icons">
            <a href="https://diane073.tistory.com/"><img src="@/assets/tistory_logo.png" alt=""></a>
            <a href="https://github.com/diane073"><img src="@/assets/github_logo.png" alt=""></a>
          </div>
        </div>

        <!-- <div>
          <i class="fa fa-phone"></i>
          <p>+1 234 567890</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">contact@developer.com</a></p>
        </div> -->
        

      </div>

      <div class="footer-right">

        <p class="footer-company-about">
          <span>About the website</span>
          스파르타 코딩클럽 AI트랙 5기 A-3조 팀원들이 Python Django로 백엔드를, Vue.js로 프론트엔드를 구현하여 배포한 커뮤니티 웹 사이트입니다.
        </p>

        <div class="footer-icons">

          <a href="https://github.com/Bffs-sparta/BFFs"><img src="@/assets/github_logo.png" alt=""></a>
          <a href="https://github.com/Bffs-sparta/BFFs_vue"><img src="@/assets/github_logo.png" alt=""></a>

        </div>

      </div>

      </footer>
  </div>    
</template>

<script>
import jwt_decode from "jwt-decode";
import bus from '@/utils/bus.js'
export default {
  created() {
    const currentTime = Math.floor(Date.now() / 1000);
    const exp = localStorage.getItem("access_token") ? jwt_decode(localStorage.getItem("access_token")).exp : null;
    if (exp && exp < currentTime) {
        const refresh = localStorage.getItem("refresh_token");
        const refresh_decode = jwt_decode(refresh);
        if (refresh_decode.exp < currentTime) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("payload");
          alert("로그인 시간이 만료되었습니다.");
        } else {
          this.$store.dispatch("TokenRefresh").then((response) => {
            if (response.status == 200) {
              localStorage.setItem("access_token", response.data.access);
              this.$router.go();
            } else {
              alert("로그인 시간이 만료되었습니다.");
            }
          });
        }
        this.checkLogin();
      }
  },
  methods:{
    checkLogin(){
      const access = localStorage.getItem('access_token')
      this.loginuser = access !== null ? true : false;

      const payload = localStorage.getItem('payload');
      if (payload) {
        const { user_id } = JSON.parse(payload);
        this.userid = user_id;
      }
    },
    snotify(type,message){
        bus.$emit('showSnackbar',{
            type,
            message
        });
    }
  }
};
</script>

<style scoped>
footer{
	position : relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
}
.footer-distributed{
	background-color: #292c2f;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	width: 100%;
	text-align: left;
	font: bold 16px sans-serif;

	padding: 45px 50px;
	margin-top: 80px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right{
	display: inline-block;
	vertical-align: top;
}

.footer-distributed .footer-left{
	width: 40%;
}

.footer-distributed h3{
	color:  #ffffff;
	font: normal 36px 'Cookie', cursive;
	margin: 0;
  height: 45px;
}
.footer-distributed h3 img{
  height: 100%;
}

.footer-distributed h3 span{
	color:  #5383d3;
}


.footer-distributed .footer-links{
	color:  #ffffff;
	margin: 20px 0 12px;
	padding: 0;
}

.footer-distributed .footer-links a{
	display:inline-block;
	line-height: 1.8;
	text-decoration: none;
	color:  inherit;
}

.footer-distributed .footer-company-name{
	color:  #8f9296;
	font-size: 14px;
	font-weight: normal;
	margin: 0;
}


.footer-distributed .footer-center{
	width: 35%;
}

.footer-distributed .footer-center i{
	background-color:  #33383b;
	color: #ffffff;
	font-size: 25px;
	width: 38px;
	height: 38px;
	border-radius: 50%;
	text-align: center;
	line-height: 42px;
	margin: 10px 15px;
	vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope{
	font-size: 17px;
	line-height: 38px;
}

.footer-distributed .footer-center p{
	display: inline-block;
	color: #ffffff;
	vertical-align: middle;
	margin:0;
}

.footer-distributed .footer-center p span{
	display:block;
	font-weight: normal;
	font-size:14px;
	line-height:2;
}

.footer-distributed .footer-center p a{
	color:  #5383d3;
	text-decoration: none;;
}

.footer-distributed .footer-right{
	width: 20%;
}

.footer-distributed .footer-company-about{
	line-height: 20px;
	color:  #92999f;
	font-size: 13px;
	font-weight: normal;
	margin: 0;
}

.footer-distributed .footer-company-about span{
	display: block;
	color:  #ffffff;
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 20px;
}

.footer-distributed .footer-icons{
	margin-top: 25px;
}

.footer-distributed .footer-icons a{
	display: inline-block;
	width: 35px;
	height: 35px;
	cursor: pointer;
	background-color:  #33383b;
	border-radius: 2px;

	font-size: 20px;
	color: #ffffff;
	text-align: center;
	line-height: 35px;
  text-decoration: none;

	margin-right: 3px;
	margin-bottom: 5px;
  position: relative;
}
.footer-distributed .footer-icons a img{
  width:80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.footer-distributed .footer-icons a:hover img{
  width:90%;
  height: 90%;
  transition: all 0.25s ease-in-out;
}
.footer-distributed .footer-icons a::after {
  content: "FE";
  white-space: nowrap;
  margin-top: 10px;
  position: absolute;
  top: -140%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
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
.footer-distributed .footer-icons a:first-child::after {
  content: "BE";
}
.footer-distributed .footer-icons a:hover::after {
  visibility: visible;
  opacity: 1;
  top: -120%;
  cursor: pointer;
}

  @media (max-width: 880px) {

	.footer-distributed{
		font: bold 14px sans-serif;
    flex-direction: column;
	}

	.footer-distributed .footer-left,
	.footer-distributed .footer-center,
	.footer-distributed .footer-right{
		display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
		width: 100%;
		margin-bottom: 40px;
		text-align: center;
	}

	.footer-distributed .footer-center i{
		margin-left: 0;
	}
	.main {
		line-height: normal;
		font-size: auto;
  }
  }
  .member-lists {
    display: flex;
  }
  .member-lists p{
    width: 110px;
  }
  .member-icons {
    margin-top: 10px;
    margin-left: 10px;
  }
  .member-icons a{
    display: inline-block;
    width: 35px;
    height: 35px;
    cursor: pointer;
    background-color:  #33383b;
    border-radius: 2px;

    font-size: 20px;
    color: #ffffff;
    text-align: center;
    line-height: 35px;
    text-decoration: none;

    margin-right: 3px;
    margin-bottom: 5px;
    position: relative;
  }
  .member-icons a img{
    width:80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .member-icons a:hover img{
    width:90%;
    height: 90%;
    transition: all 0.25s ease-in-out;
  }
</style>