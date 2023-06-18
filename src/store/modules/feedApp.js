import{
    fetchFeedAll,
    fetchFeedDetail,
    fetchFeedCreate,
    imageUpload,
} from '@/api/index.js'

const state ={
    feed: [],
    feeddetail: {},
}

const getters ={
    fetchFeedAll(state) {
        return state.feed
    },
    fetchFeedDetail(state) {
        return state.feeddetail
    },
}

const mutations ={
    SET_FEED_ALL(state, feed) {
        state.feed = feed
    },
    SET_FEED_DETAIL(state, feeddetail) {
        state.feeddetail = feeddetail
    },
}
const actions ={
    async FETCH_FEED_ALL(context) {
        try {
            const response = await fetchFeedAll()
            context.commit('SET_FEED_ALL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_FEED_DETAIL(context, data) {
        try {
            const response = await fetchFeedDetail(data.community_name, data.feed_id)
            context.commit('SET_FEED_DETAIL', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_FEED_CREATE(context, feedData) {
        try {
            const title = feedData.title
            const content = feedData.content
            const category_id = feedData.categoryId

            const response = await fetchFeedCreate(category_id,title, content)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_IMAGE_UPLOAD(context, formData) {
        try {
            const response = await imageUpload(formData)
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