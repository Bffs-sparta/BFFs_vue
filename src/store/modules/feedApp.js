import{
    fetchFeedDetail,
    fetchFeedCreate,
    imageUpload,
    fetchGroupPurchaseList,
    fetchGroupPurchaseCreate,
    fetchGroupPurchaseDetail,
} from '@/api/index.js'
import bus from '@/utils/bus.js'

const state ={
    feeddetail: {},
    purchaselist: {},
    purchasedetail: {},
}

const getters ={
    fetchFeedDetail(state) {
        return state.feeddetail
    },
    fetchGroupPurchaseList(state) {
        return state.purchaselist
    },
    fetchGroupPurchaseDetail(state) {
        return state.purchasedetail
    },
}

const mutations ={
    SET_FEED_DETAIL(state, feeddetail) {
        state.feeddetail = feeddetail
        bus.$emit('axiosEnd')
    },
    SET_GROUPPURCHASE_LIST(state, purchaselist) {
        state.purchaselist = purchaselist
        bus.$emit('axiosEnd')
    },
    SET_GROUPPURCHASE_DETAIL(state, purchasedetail) {
        state.purchasedetail = purchasedetail
        bus.$emit('axiosEnd')
    },
}
const actions ={
    async FETCH_FEED_DETAIL(context, data) {
        try {
            const response = await fetchFeedDetail(data.community_name, data.feed_id)
            bus.$emit('axiosStart')
            context.commit('SET_FEED_DETAIL', response.data)
            return response
        } catch (error) {
            bus.$emit('axiosEnd')
            console.log(error)
        }
    },
    async FETCH_FEED_CREATE(context, feedData) {
        const community_name = feedData.community_name
        const title = feedData.title
        const content = feedData.content
        const category_id = feedData.categoryId
        const response = await fetchFeedCreate(community_name, title, content, category_id)
        bus.$emit('axiosStart')
        return response
    },
    async FETCH_IMAGE_UPLOAD(context, formData) {
        try {
            const response = await imageUpload(formData)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_GROUPPURCHASE_CREATE(context, purchaseData) {
        const community_url = purchaseData.community_url
        const data = purchaseData.data

        const response = await fetchGroupPurchaseCreate(community_url, data)
        bus.$emit('axiosStart')
        return response
    },
    async FETCH_GROUPPURCHASE_LIST(context, community_name) {
        try {
            const response = await fetchGroupPurchaseList(community_name)
            bus.$emit('axiosStart')
            context.commit('SET_GROUPPURCHASE_LIST', response.data)
            return response
        } catch (error) {
            bus.$emit('axiosEnd')
            console.log(error)
        }
    },
    async FETCH_GROUPPURCHASE_DETAIL(context, data) {
        try {
            const response = await fetchGroupPurchaseDetail(data.community_name, data.grouppurchase_id)
            bus.$emit('axiosStart')
            context.commit('SET_GROUPPURCHASE_DETAIL', response.data)
            return response
        } catch (error) {
            bus.$emit('axiosEnd')
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