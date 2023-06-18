import {
    fetchCommunityList,
    fetchCommunityDetail,
    fetchCommunityCategoryDetail,
    fetchCommunityCategoryFeed,
    fetchCommunityAdmin,
    fetchFeedList,
    fetchSearchCommunity,
    fetchCommunityCategoryPagination,
    fetchSearchUser
}from '@/api/index.js'

const state ={
    user: [],
    community: {},
    communitydetail: {},
    communitycategory: [],
    communitycategoryfeed:{},
    searchcommunity: {},
    feedlist: {},
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
    fetchcategoryfeed(state) {
        return state.communitycategoryfeed
    }
}

const mutations ={
    SET_USER_LIST(state, user) {
        state.user = user
    },
    SET_COMMUNITY_LIST(state, community) {
        state.community = community
    },
    SET_COMMUNITY_DETAIL(state, communitydetail) {
        state.communitydetail = communitydetail
    },
    SET_COMMUNITY_CATEGORY_DETAIL(state, communitycategory) {
        state.communitycategory = communitycategory
    },
    SET_COMMUNITY_CATEGORY_FEED(state, communitycategoryfeed) {
        state.communitycategoryfeed = communitycategoryfeed
    },
    SET_FEED_LIST(state, feedlist) {
        state.feedlist = feedlist
    },
    SET_SEARCH_COMMUNITY(state, searchcommunity) {
        state.searchcommunity = searchcommunity
    },
}
const actions ={
    async FETCH_COMMUNITY_LIST(context) {
        try {
            const response = await fetchCommunityList()
            context.commit('SET_COMMUNITY_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_DETAIL(context, community_name) {
        try {
            const response = await fetchCommunityDetail(community_name)
            context.commit('SET_COMMUNITY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_CATEGORY_DETAIL(context, community_name) {
        try {
            const response = await fetchCommunityCategoryDetail(community_name)
            context.commit('SET_COMMUNITY_CATEGORY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_CATEGORY_FEED(context, data) {
        try {
            const response = await fetchCommunityCategoryFeed(data.community_name, data.category_name)
            context.commit('SET_COMMUNITY_CATEGORY_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_FEED_LIST(context, community_name) {
        try {
            const response = await fetchFeedList(community_name)
            context.commit('SET_FEED_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_USER_LIST(context, community_name) {
        try {
            const response = await fetchCommunityAdmin(community_name)
            context.commit('SET_USER_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_SEARCH_COMMUNITY(context, name) {
        try {
            const response = await fetchSearchCommunity(name)
            context.commit('SET_SEARCH_COMMUNITY', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_COMMUNITY_CATEGORY_PAGINATION(context, url) {
        try {
            const response = await fetchCommunityCategoryPagination(url)
            context.commit('SET_COMMUNITY_CATEGORY_DETAIL', response.data)
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
            context.commit('SET_USER_LIST', response.data)
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