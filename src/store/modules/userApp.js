import {
    fetchProfile,
    fetchAllProfile,
    fetchMeetAI,
    fetchTokenRefresh
}from '@/api/index.js'


const state ={
    user: {},
    profile: [],
    menubar : false,
    meetai: {},
}

const getters ={
    fetchProfile(state) {
        return state.user
    },
    fetchAllProfile(state) {
        return state.profile
    },
    menubar(state) {
        return state.menubar
    },
    fetchMeetAI(state) {
        return state.meetai
    },
}

const mutations ={
    SET_USER_PROFILE(state, user) {
        state.user = user
    },
    SET_ALL_PROFILE(state, profile) {
        state.profile = profile
    },
    toggleMenubar(state, menubar) {
        state.menubar = menubar
    },
    SET_MEET_AI(state, meetai) {
        state.meetai = meetai
    },
}

const actions={
    async FETCH_USER_PROFILE(context, user_id) {
        try {
            const response = await fetchProfile(user_id)
            context.commit('SET_USER_PROFILE', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_ALL_PROFILE(context) {
        try {
            const response = await fetchAllProfile()
            context.commit('SET_ALL_PROFILE', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    checkMenubar(context, menubar) {
        context.commit('toggleMenubar', menubar)
        return menubar
    },
    async FETCH_MEET_AI(context) {
        try {
            const response = await fetchMeetAI()
            context.commit('SET_MEET_AI', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async TokenRefresh() {
        try {
            const response = await fetchTokenRefresh()
            return response
        } catch (error) {
            console.log(error)
        }
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}