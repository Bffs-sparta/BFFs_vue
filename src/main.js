import Vue from 'vue'
import App from './App.vue'
import Snotify from 'vue-snotify';
import { router } from './router/index.js'
import { store } from './store/store.js'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUser,faEnvelope,faLock,faMapLocationDot,faSignature,faTrash,faBan,faMinus,faCartShopping,faXmark} from '@fortawesome/free-solid-svg-icons' 
import { faEye,faEyeSlash } from '@fortawesome/free-regular-svg-icons' 
import 'vue-snotify/styles/material.css'; 
/* add icons to the library */
library.add(faUser,faEnvelope,faLock,faEye,faEyeSlash,faMapLocationDot,faSignature,faTrash,faBan,faMinus,faCartShopping,faXmark)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Snotify);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
