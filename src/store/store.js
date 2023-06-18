import Vue from 'vue'
import Vuex from 'vuex'
import userApp from './modules/userApp'
import feedApp from './modules/feedApp'
import communityApp from './modules/communityApp'
Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        userApp,
        feedApp,
        communityApp
    }
})