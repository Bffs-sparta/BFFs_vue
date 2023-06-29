import{
    fetchFeedAll,
    fetchFeedDetail,
    fetchFeedCreate,
    imageUpload,
    fetchGroupPurchaseList,
    fetchGroupPurchaseCreate,
    fetchGroupPurchaseDetail,
} from '@/api/index.js'

const state ={
    feed: [],
    feeddetail: {},
    purchaselist: {},
    purchasedetail: {},
}

const getters ={
    fetchFeedAll(state) {
        return state.feed
    },
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
    SET_FEED_ALL(state, feed) {
        state.feed = feed
    },
    SET_FEED_DETAIL(state, feeddetail) {
        state.feeddetail = feeddetail
    },
    SET_GROUPPURCHASE_LIST(state, purchaselist) {
        state.purchaselist = purchaselist
    },
    SET_GROUPPURCHASE_DETAIL(state, purchasedetail) {
        state.purchasedetail = purchasedetail
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
        const title = feedData.title
        const content = feedData.content
        const category_id = feedData.categoryId
        const response = await fetchFeedCreate(category_id,title, content)
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
        try {
            const community_url = purchaseData.community_url
            const title = purchaseData.title
            const content = purchaseData.content
            const product_name = purchaseData.name
            const product_number = purchaseData.number
            const product_price = purchaseData.price
            const person_limit = purchaseData.person
            const link = purchaseData.link
            const open_at = purchaseData.open_at + ":00"
            const close_at = purchaseData.close_at + ":00"
            const end_option = purchaseData.end_option
            const location = purchaseData.location
            const meeting_at = purchaseData.meeting_at + ":00"

            const response = await fetchGroupPurchaseCreate(community_url, title, content, product_name, product_number, product_price, person_limit, link, open_at, close_at, end_option, location, meeting_at)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_GROUPPURCHASE_LIST(context, community_name) {
        try {
            const response = await fetchGroupPurchaseList(community_name)
            context.commit('SET_GROUPPURCHASE_LIST', response.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },
    async FETCH_GROUPPURCHASE_DETAIL(context, data) {
        try {
            const response = await fetchGroupPurchaseDetail(data.community_name, data.purchase_id)

            context.commit('SET_GROUPPURCHASE_DETAIL', response.data)
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