import {
    fetchProfile,
    fetchAllProfile,
    fetchSearchUser,
}from '@/api/index.js'


const state ={
    user: {},
    searchuser: [],
    profile: [],
    menubar : false,
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
    fetchSearchUser(state) {
        return state.searchuser
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
    SET_SEARCH_USER(state, searchuser) {
        state.searchuser = searchuser
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
    async FETCH_SEARCH_USER(context, name) {
        try {
            const response = await fetchSearchUser(name)
            context.commit('SET_SEARCH_USER', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
}
export default {
    state,
    getters,
    mutations,
    actions
}