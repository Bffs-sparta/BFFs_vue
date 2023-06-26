import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'
import UserRegisterView from '../views/user/UserRegister.vue'
import UserLoginView from '../views/user/UserLogin.vue'
import CommunityCreateView from '../views/community/CommunityCreateView.vue'
import CommunityManageView from '../views/community/CommunityManageView.vue'
import CommunityMainView from '../views/community/CommunityMainView.vue'
import CommunityDetailView from '../views/community/CommunityDetailView.vue'
import CommunityDetailCategoryView from '../views/community/CommunityDetailCategoryView.vue'
import CommunitySearchView from '../views/community/CommunitySearchView.vue'
import CallBackView from '../views/user/CallBackView.vue'
import FeedWriteView from '../views/feed/FeedWriteView.vue'
import ProfileView from '../views/user/ProfileView.vue'
import ProfileUpdateView from '../views/user/ProfileUpdateView.vue'
import MeetAI from '../views/user/MeetAI.vue'
import MeetFriendView from '../views/feed/MeetFriendView.vue'
import FeedUpdateView from '../views/feed/FeedUpdateView.vue'
import FeedDetailView from '../views/feed/FeedDetailView.vue'
import FeedSearchView from '../views/feed/FeedSearchView.vue'
import PurchaseWriteView from '../views/feed/PurchaseWriteView.vue'
import PurchaseUpdateView from '../views/feed/PurchaseUpdateView.vue'
import PurchaseDetail from '../views/feed/PurchaseDetail.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView
        },
        {
            path: '/user/register',
            name: 'user-register',
            component: UserRegisterView
        },
        {
            path: '/user/login',
            name: 'user-login',
            component: UserLoginView
        },
        {
            path: '/callback',
            name: 'callback',
            component: CallBackView
        },
        {
            path: '/community/create',
            name: 'community-create',
            component: CommunityCreateView,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next()
                } else {
                    alert('로그인이 필요해요!')
                    next('/user/login')
                }
            }
        },
        {
            path: '/community/manage/:name',
            name: 'community-manage',
            component: CommunityManageView
        },
        {
            path: '/community/main',
            name: 'community-main',
            component: CommunityMainView
        },
        {
            path: '/community/detail/:name',
            name: 'community-detail',
            component: CommunityDetailView
        },
        {
            path: '/community/search/:name',
            name: 'community-search',
            component: CommunitySearchView
        },
        {
            path: '/community/:community_name/category/:category_name',
            name: 'community-category',
            component: CommunityDetailCategoryView
        },
        {
            path:'/profile/',
            beforeEnter(to, from, next) {
                alert('로그인이 필요해요!')
                next('/user/login')
            }
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component:ProfileView,
            beforeEnter: (to, from, next) => {
                const id = to.params.id
                if(id == 'update'){
                    alert('로그인이 필요해요!')
                    next('/user/login')
                }else{
                    next()
                }
            }
        },
        {
            path: '/profile/update/:id',
            name: 'profile-update',
            component:ProfileUpdateView,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next()
                } else {
                    alert('로그인이 필요해요!')
                    next('/user/login')
                }
            }    
        },
        {
            path: '/:community_name/write',
            name: 'feed-create',
            component:FeedWriteView,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next()
                } else {
                    alert('로그인이 필요해요!')
                    next('/user/login')
                }
            } 
        },
        {
            path:'/:community_name/feed/update/:feed_id',
            name:'feed-update',
            component:FeedUpdateView
        },
        {
            path:'/community/detail/:community_name/feed/:feed_id',
            name:'feed-detail',
            component:FeedDetailView
        },
        {
            path:'/feed/search/:name',
            name:'feed-search',
            component:FeedSearchView
        },
        {
            path:'/community/:community_name/purchase/write',
            name:'purchase-create',
            component:PurchaseWriteView,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next()
                } else {
                    alert('로그인이 필요해요!')
                    next('/user/login')
                }
            } 
        },
        {
            path:'/community/update/purchase/:purchase_id',
            name:'purchase-update',
            component:PurchaseUpdateView
        },
        {
            path:'/community/detail/:community_name/purchase/:purchase_id',
            name:'purchase-detail',
            component:PurchaseDetail
        },
        {
            path:'/meetfriend',
            name:'meet-friend',
            component:MeetFriendView
        },
        {
            path:'/meetai',
            name:'meet-ai',
            component:MeetAI,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next()
                } else {
                    alert('로그인이 필요해요!')
                    next('/user/login')
                }
            }
        },
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    
})