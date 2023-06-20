import axios from 'axios'

const config = {
    baseUrl: 'http://127.0.0.1:8000'
}
const access_token = () => {
    return localStorage.getItem('access_token')
}
// 회원가입
function fetchSignup(email,password,name,age,region,nickname){
    return axios.post(`${config.baseUrl}/user/`,{
        email,
        password,
        name,
        age,
        region,
        nickname,
    },{
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// 로그인
function fetchLogin(email,password){
    return axios.post(`${config.baseUrl}/user/login/`,{
        email,
        password,
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// social login
function socialLogin(provider){
    return axios.get(`${config.baseUrl}/user/${provider}/login/`)
}

// social callback
function socialCallback(provider){
    return axios.get(`${config.baseUrl}/user/${provider}/callback/`)
}

// refresh token
function fetchTokenRefresh(){
    return axios.get(`${config.baseUrl}/user/refresh/`)
}

// 이메일 전송
function fetchSendEmail(email){
    return axios.post(`${config.baseUrl}/user/email/`,{
        email,
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// 이메일 인증
function fetchVerificationEmail(code,email){
    return axios.post(`${config.baseUrl}/user/email/verify/`,{
        email,
        code,
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// 비밀번호 변경
function fetchPasswordReset(email){
    return axios.post(`${config.baseUrl}/user/password/reset/`,{
        email,
    },
    {
        headers: {
            'Content-Type': 'application/json',
    }
    })
}

// 프로필 전체 조회
function fetchAllProfile(){
    return axios.get(`${config.baseUrl}/user/profile/`)
}

// 프로필 조회
function fetchProfile(user_id){
    return axios.get(`${config.baseUrl}/user/${user_id}/`)
}

// 프로필 수정
function fetchProfileEdit(user_id, formData){
    return axios.patch(`${config.baseUrl}/user/${user_id}/`,
        formData,
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 프로필 삭제 (회원탈퇴)
function fetchProfileDelete(user_id){
    return axios.delete(`${config.baseUrl}/user/${user_id}/`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 프로필 방명록 조회, 생성
function fetchGuestBook(profile_id, comment){
    return axios.post(`${config.baseUrl}/user/${profile_id}/guestbook/`,{
        comment,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 프로필 방명록 수정
function fetchGuestBookEdit(profile_id, guestbook_id){
    return axios.patch(`${config.baseUrl}/user/${profile_id}/guestbook/${guestbook_id}/`)
}

// 프로필 방명록 삭제
function fetchGuestBookDelete(profile_id, guestbook_id){
    return axios.delete(`${config.baseUrl}/user/${profile_id}/guestbook/${guestbook_id}/`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 커뮤니티 조회, 생성
function fetchCommunityList() {
    return axios.get(`${config.baseUrl}/community/`)
}
function fetchCommunityCreate(title, communityurl, introduction) {
    return axios.post(`${config.baseUrl}/community/`,{
        title,
        communityurl,
        introduction,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 커뮤니티 카테고리 조회
function fetchCommunityCategoryDetail(community_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/category/`)
}

function fetchCommunityCategoryFeed(community_name,category_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/category/${category_name}`)
}

// 커뮤니티 수정, 삭제
function fetchCommunityDetail(community_name) {
    
    const token = access_token()
    if (token) {
        return axios.get(`${config.baseUrl}/community/${community_name}/`,{
            headers: {
                'Authorization': `Bearer ${access_token()}`,
            }
        })
    } else {
        return axios.get(`${config.baseUrl}/community/${community_name}/`)
    }
}
function fetchCommunityEdit(community_name, formData) {
    
    return axios.put(`${config.baseUrl}/community/${community_name}/`,
            formData,
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}
function fetchCommunityDelete(community_name) {
    return axios.delete(`${config.baseUrl}/community/${community_name}/`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 커뮤니티 서브어드민 등록
function fetchCommunityAdmin(community_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/subadmin/`)
}
function fetchSubAdminCreate(community_name, user) {
    return axios.post(`${config.baseUrl}/community/${community_name}/subadmin/`, {
        user,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}
function fetchSubAdminDelete(community_name, user) {
    return axios.delete(`${config.baseUrl}/community/${community_name}/subadmin/`,{
        data: {
            user,
        },
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 커뮤니티 금지어 등록
function fetchCommunityForbidden(community_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/forbidden/`)
}
function fetchForbiddenCreate(community_name, word) {
    return axios.post(`${config.baseUrl}/community/${community_name}/forbidden/`,{
        word,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}
function fetchForbiddenDelete(community_name, forbidden_word) {
    return axios.delete(`${config.baseUrl}/community/${community_name}/forbidden/${forbidden_word}`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 커뮤니티 북마크 등록
function fetchCommunityBookmark(community_name) {
    return axios.post(`${config.baseUrl}/community/${community_name}/bookmark/`,{},{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 커뮤니티 검색
function fetchSearchCommunity(name) {
    return axios.get(`${config.baseUrl}/community/search?search=${name}`)
}

// 피드 검색
function fetchSearchFeed(name) {
    return axios.get(`${config.baseUrl}/feed/search?search=${name}`)
}

// 유저 검색
function fetchSearchUser(name,community_name) {
    return axios.get(`${config.baseUrl}/user/search?search=${name}&community_url=${community_name}`)
}

// 메인페이지 전체 피드 중 최근순 3개 조회
function fetchFeedAll() {
    return axios.get(`${config.baseUrl}/feed/`)
}

// 전체 피드 리스트 조회
function fetchFeedList(community_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/list/`)
}

// 피드 카테고리별 조회
function fetchFeedCategoryList(community_name, category_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/category/${category_name}/`)
}

// 피드 상세 조회, 피드 댓글 조회
function fetchFeedDetail(community_name,feed_id) {
    const token = access_token()
    if (token) {
        return axios.get(`${config.baseUrl}/community/${community_name}/${feed_id}/`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    } else {
        return axios.get(`${config.baseUrl}/community/${community_name}/${feed_id}/`)
    }
}
//페이지네이션
function fetchCommunityCategoryPagination(url){
    return axios.get(url)
}
// 피드 생성
function fetchFeedCreate(category_id,title,content) {
    return axios.post(`${config.baseUrl}/feed/${category_id}/feed/`,{
        title,
        content,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 피드 수정
function fetchFeedEdit(feed_id,title,content) {
    return axios.put(`${config.baseUrl}/feed/${feed_id}/`,{
        title,
        content,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 피드 삭제
function fetchFeedDelete(feed_id) {
    return axios.delete(`${config.baseUrl}/feed/${feed_id}/`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 피드 좋아요
function fetchFeedLike(feed_id) {
    return axios.post(`${config.baseUrl}/community/${feed_id}/likes/`,{},{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}
function fetchPrevfeed(community_name,feed_id){
    return axios.get(`${config.baseUrl}/community/${community_name}/${feed_id}/prev/`)
}

function fetchNextfeed(community_name,feed_id){
    return axios.get(`${config.baseUrl}/community/${community_name}/${feed_id}/next/`)
}
// 피드 게시글 공지 설정
function fetchFeedNotification(community_name, feed_id) {
    return axios.post(`${config.baseUrl}/community/${community_name}/${feed_id}/notification/`,{},{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 공구 전체 리스트 조회
function fetchGroupPurchaseList(community_name) {
    return axios.get(`${config.baseUrl}/community/${community_name}/grouppurchase/`)
}

// 공구 상세 페이지
function fetchGroupPurchaseDetail(community_name, grouppurchase_id) {
    return axios.get(`${config.baseUrl}/community/${community_name}/grouppurchase/${grouppurchase_id}/`)
}

// 공구 참여
function fetchGroupPurchaseJoin(grouppurchase_id) {
    return axios.get(`${config.baseUrl}/community/${grouppurchase_id}/join/`)
}

// 공구 게시글 생성
function fetchGroupPurchaseCreate(community_name) {
    return axios.get(`${config.baseUrl}/feed/${community_name}/grouppurchase/`)
}

// 공구 게시글 수정
function fetchGroupPurchaseEdit(grouppurchase_id) {
    return axios.get(`${config.baseUrl}/feed/grouppurchase/${grouppurchase_id}/`)
}

// 공구 게시글 삭제
function fetchGroupPurchaseDelete(grouppurchase_id) {
    return axios.get(`${config.baseUrl}/feed/grouppurchase/${grouppurchase_id}/`)
}

// // 공구 게시글 작성자가 종료
// function fetchGroupPurchaseSelfEnd(grouppurchase_id) {
//     return axios.get(`${config.baseUrl}/feed/${grouppurchase_id}/self_end/`)
// }


// 댓글 생성
function fetchCommentCreate(feed_id, text) {
    return axios.post(`${config.baseUrl}/feed/${feed_id}/comment/`,{
        text,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 댓글 수정
function fetchCommentEdit(comment_id, text) {
    return axios.put(`${config.baseUrl}/feed/comment/${comment_id}/`,{
        text,
    },
    {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 댓글 삭제
function fetchCommentDelete(comment_id) {
    return axios.delete(`${config.baseUrl}/feed/comment/${comment_id}/`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 대댓글 생성
function fetchCocommentCreate(comment_id,text) {
    console.log(text)
    return axios.post(`${config.baseUrl}/feed/${comment_id}/cocomment/`,{
        text,
    },{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
            'Content-Type': 'application/json',
        }
    })
}

// 대댓글 수정, 삭제
function fetchCocommentDelete(cocomment_id) {
    return axios.delete(`${config.baseUrl}/feed/cocomment/${cocomment_id}/`,{
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

function imageUpload(file) {
    return axios.post(`${config.baseUrl}/feed/image/upload/`, file, {
        headers: {
            'Authorization': `Bearer ${access_token()}`,
        }
    })
}

// 공구 댓글 생성
// function fetchGroupPurchaseCommentCreate(grouppurchase_id, text) {
//     return axios.post(`${config.baseUrl}/feed/${grouppurchase_id}/purchasecomment/`,{
//         text,
//     },
//     {
//         headers: {
//             'Authorization': `Bearer ${access_token()}`,
//             'Content-Type': 'application/json',
//         }
//     })
// }

// // 공구 댓글 수정
// function fetchGroupPurchaseCommentEdit(purchase_comment_id, text) {
//     return axios.put(`${config.baseUrl}/feed/purchasecomment/${purchase_comment_id}/`,{
//         text,
//     },
//     {
//         headers: {
//             'Authorization': `Bearer ${access_token()}`,
//             'Content-Type': 'application/json',
//         }
//     })
// }
//
// // 공구 댓글 삭제 
// function fetchGroupPurchaseCommentDelete(purchase_comment_id) {
//     return axios.delete(`${config.baseUrl}/feed/purchasecomment/${purchase_comment_id}/`,{
//         headers: {
//             'Authorization': `Bearer ${access_token()}`,
//         }
//     })
// }

export {
    fetchSignup,
    fetchLogin,
    socialLogin,
    socialCallback,
    fetchTokenRefresh,
    fetchSendEmail,
    fetchVerificationEmail,
    fetchPasswordReset,
    fetchAllProfile,
    fetchProfile,
    fetchProfileEdit,
    fetchProfileDelete,
    fetchGuestBook,
    fetchGuestBookEdit,
    fetchGuestBookDelete,
    fetchCommunityList,
    fetchCommunityCreate,
    fetchCommunityCategoryDetail,
    fetchCommunityCategoryFeed,
    fetchCommunityDetail,
    fetchCommunityEdit,
    fetchCommunityDelete,
    fetchCommunityAdmin,
    fetchSubAdminCreate,
    fetchSubAdminDelete,
    fetchCommunityForbidden,
    fetchForbiddenCreate,
    fetchForbiddenDelete,
    fetchCommunityBookmark,
    fetchSearchCommunity,
    fetchSearchFeed,
    fetchSearchUser,
    fetchFeedAll,
    fetchFeedList,
    fetchFeedCategoryList,
    fetchFeedDetail,
    fetchFeedCreate,
    fetchFeedLike,
    fetchFeedEdit,
    fetchFeedDelete,
    fetchPrevfeed,
    fetchNextfeed,
    fetchFeedNotification,
    fetchGroupPurchaseList,
    fetchGroupPurchaseDetail,
    fetchGroupPurchaseJoin,
    fetchGroupPurchaseCreate,
    fetchGroupPurchaseEdit,
    fetchGroupPurchaseDelete,
    fetchCommentCreate,
    fetchCommentEdit,
    fetchCommentDelete,
    fetchCocommentCreate,
    fetchCocommentDelete,
    imageUpload,
    fetchCommunityCategoryPagination,
    //fetchGroupPurchaseSelfEnd,
    //fetchGroupPurchaseCommentCreate,
    //fetchGroupPurchaseCommentEdit,
    //fetchGroupPurchaseCommentDelete,
    
}