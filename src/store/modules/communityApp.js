import {
    fetchCommunityList,
    fetchCommunityDetail,
    fetchCommunityCategoryDetail,
    fetchCommunityCategoryFeed,
    fetchCommunityAdmin,
    fetchFeedList,
    fetchSearchCommunity,
    fetchSearchFeed,
    fetchCommunityCategoryPagination,
    fetchSearchUser,
}from '@/api/index.js'
import bus from '@/utils/bus.js'

const state ={
    user: [],
    searchuser: [],
    community: {},
    communitydetail: {},
    communitycategory: [],
    communitycategoryfeed:{},
    searchcommunity: {},
    feedlist: {},
    searchfeed: {},
}

const getters ={
    fetchCommunityAdmin(state) {
        return state.user
    },
    fetchCommunityList(state) {
        return state.community
    },
    fetchCommunityDetail(state) {
        return state.communitydetail
    },
    fetchCommunityCategoryDetail(state) {
        return state.communitycategory
    },
    fetchFeedList(state) {
        return state.feedlist
    },
    fetchSearchCommunity(state) {
        return state.searchcommunity
    },
    fetchSearchFeed(state) {
        return state.searchfeed
    },
    fetchSearchUser(state) {
        return state.searchuser
    },
    fetchcategoryfeed(state) {
        return state.communitycategoryfeed
    },
}

const mutations ={
    SET_USER_LIST(state, user) {
        state.user = user
        bus.$emit('axiosEnd')
    },
    SET_COMMUNITY_LIST(state, community) {
        state.community = community
        bus.$emit('axiosEnd')
    },
    SET_COMMUNITY_DETAIL(state, communitydetail) {
        state.communitydetail = communitydetail
        bus.$emit('axiosEnd')
    },
    SET_COMMUNITY_CATEGORY_DETAIL(state, communitycategory) {
        state.communitycategory = communitycategory
        bus.$emit('axiosEnd')
    },
    SET_COMMUNITY_CATEGORY_FEED(state, communitycategoryfeed) {
        state.communitycategoryfeed = communitycategoryfeed
        bus.$emit('axiosEnd')
    },
    SET_FEED_LIST(state, feedlist) {
        state.feedlist = feedlist
        bus.$emit('axiosEnd')
    },
    SET_SEARCH_COMMUNITY(state, searchcommunity) {
        state.searchcommunity = searchcommunity
        bus.$emit('axiosEnd')
    },
    SET_SEARCH_FEED(state, searchfeed) {
        state.searchfeed = searchfeed
        bus.$emit('axiosEnd')
    },
    SET_SEARCH_USER(state, searchuser) {
        state.searchuser = searchuser
        bus.$emit('axiosEnd')
    },
}
const actions ={
    async FETCH_COMMUNITY_LIST(context) {
        try {
            const response = await fetchCommunityList()
            bus.$emit('axiosStart')
            context.commit('SET_COMMUNITY_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_DETAIL(context, community_name) {
        try {
            const response = await fetchCommunityDetail(community_name)
            bus.$emit('axiosStart')
            context.commit('SET_COMMUNITY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_CATEGORY_DETAIL(context, community_name) {
        try {
            const response = await fetchCommunityCategoryDetail(community_name)
            bus.$emit('axiosStart')
            context.commit('SET_COMMUNITY_CATEGORY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_CATEGORY_FEED(context, data) {
        try {
            const response = await fetchCommunityCategoryFeed(data.community_name, data.category_name)
            bus.$emit('axiosStart')
            context.commit('SET_COMMUNITY_CATEGORY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_FEED_LIST(context, community_name) {
        try {
            const response = await fetchFeedList(community_name)
            bus.$emit('axiosStart')
            context.commit('SET_FEED_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_USER_LIST(context, community_name) {
        try {
            const response = await fetchCommunityAdmin(community_name)
            bus.$emit('axiosStart')
            context.commit('SET_USER_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_CATEGORY_PAGINATION(context, url) {
        try {
            const response = await fetchCommunityCategoryPagination(url)
            bus.$emit('axiosStart')
            context.commit('SET_COMMUNITY_CATEGORY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async search_community(context, name) {
        try {
            const response = await fetchSearchCommunity(name)
            bus.$emit('axiosStart')
            context.commit('SET_SEARCH_COMMUNITY', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async search_feed(context, name) {
        try {
            const response = await fetchSearchFeed(name)
            bus.$emit('axiosStart')
            context.commit('SET_SEARCH_FEED', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async search_user(context, data) {
        try{
            const user = data.user
            const community_name = data.community_name
            const response = await fetchSearchUser(user,community_name)
            bus.$emit('axiosStart')
            context.commit('SET_SEARCH_USER', response.data)
            return response
        }catch(error){
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