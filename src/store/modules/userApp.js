import {
    fetchProfileComuInfo,
    fetchProfile,
    fetchAllProfile,
    fetchMeetAI,
    fetchTokenRefresh
}from '@/api/index.js'
import bus from '@/utils/bus.js'

const state ={
    user: {},
    profile: [],
    menubar : false,
    meetai: {},
    profilecomu: {},
    alarmlist:[]
}

const getters ={
    fetchProfileComuInfo(state) {
        return state.profilecomu
    },
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
    getAlarmData(state) {
        return state.alarmlist.sort((a,b) => b.id - a.id)
    },
    getAlarmCount(state) {
        return state.alarmlist.length
    }
}

const mutations ={
    SET_PROFILE_COMU_INFO(state, profilecomu) {
        state.profilecomu = profilecomu
        bus.$emit('axiosEnd')
    },
    SET_USER_PROFILE(state, user) {
        state.user = user
        bus.$emit('axiosEnd')
    },
    SET_ALL_PROFILE(state, profile) {
        state.profile = profile
        bus.$emit('axiosEnd')
    },
    toggleMenubar(state, menubar) {
        state.menubar = menubar
        bus.$emit('axiosEnd')
    },
    SET_MEET_AI(state, meetai) {
        state.meetai = meetai
        bus.$emit('axiosEnd')
    },
    SET_ALARM(state, data) {
        if(Array.isArray(data)){
            if(data.length>=state.alarmlist.length){
                state.alarmlist = data
            }else{
                data.forEach(e => {
                    state.alarmlist.push(e)
                });
            }
        }else{
            state.alarmlist.push(data)
        }
    }
}

const actions={
    async FETCH_PROFILE_COMU_INFO(context) {
        try {
            const response = await fetchProfileComuInfo()
            bus.$emit('axiosStart')
            context.commit('SET_PROFILE_COMU_INFO', response.data)
            return response
        } catch (error) {
            bus.$emit('axiosEnd')
            console.log(error)
        }
    },
    async FETCH_USER_PROFILE(context, user_id) {
        try {
            const response = await fetchProfile(user_id)
            bus.$emit('axiosStart')
            context.commit('SET_USER_PROFILE', response.data)
            return response
        } catch (error) {
            bus.$emit('axiosEnd')
            console.log(error)
        }
    },
    async FETCH_ALL_PROFILE(context) {
        try {
            const response = await fetchAllProfile()
            bus.$emit('axiosStart')
            context.commit('SET_ALL_PROFILE', response.data)
            return response
        } catch (error) {
            bus.$emit('axiosEnd')
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
    },
    getAlarm(context, alarmlist) {
        context.commit('SET_ALARM', alarmlist.message)
        return alarmlist
    },
    deleteAlarm(context, index) {
        context.state.alarmlist.splice(index,1)
    },
    deleteAllAlarm(context){
        context.state.alarmlist = []
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}