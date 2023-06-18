import Vue from 'vue'
import App from './App.vue'

import { router } from './router/index.js'
import { store } from './store/store.js'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUser,faEnvelope,faLock,faMapLocationDot,faSignature,faTrash,faBan,faMinus } from '@fortawesome/free-solid-svg-icons' 
import { faEye,faEyeSlash } from '@fortawesome/free-regular-svg-icons' 


/* add icons to the library */
library.add(faUser,faEnvelope,faLock,faEye,faEyeSlash,faMapLocationDot,faSignature,faTrash,faBan,faMinus)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
