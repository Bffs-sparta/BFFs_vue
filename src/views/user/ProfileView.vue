<template>
    <div>
        <div class='modal-wrap' v-if='profileModal'>
            <div class="modal-back" @click='closeModal'></div>
            <div class='profile-modal'>
                <div class='modal-header'>
                    <div @click='closeModal'>
                        <font-awesome-icon :icon="['fas', 'xmark']" size="2xl" style="color: #fffff;" />
                    </div>
                </div>
                <div class='modal-body'>
                    <img :src="profile.profileimageurl" v-if="profile.profileimage !== null && profile.profileimage.includes('profile_img')"/>
                    <img :src="profile.profileimageurl.slice(33)" v-else-if="profile.profileimage !== null"/>
                    <img src="@/assets/room_image(5).jpg" v-else />
                </div>
            </div>
        </div>
        <Transition name="fade">
            <password-withdrawal-modal v-if="modalopen" @close="modalopen=false"></password-withdrawal-modal>
        </Transition>
        <div class="modal-overlay" v-if="modalopen" @click="modalopen=false"></div>
        <section class="body-section">
            <div class="mypage">
                
                <div class="list">
                    <div class="bookmark">
                        <h3>{{ profile.nickname }}님의 마이페이지</h3>
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-container">
                                    <div class="new-card-wrapper" v-if="!(notificationopen || bookmarkopen || communityopen || feedopen || purchaseopen)">
                                        <p v-if="userid===profile.id">오른쪽에서 보고싶은 내 정보를 눌러보세요:)<br><br>내 정보 공개는 내 정보 수정에서 가능합니다!</p>
                                        <p v-else>{{ profile.nickname }}님에게 방명록을 남겨 인사해보세요!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bookmark" v-if="notificationopen">
                        <h3>
                            <svg style="width:20px;" fill="none" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z" fill="#7D8590" fill-rule="evenodd"></path></svg>
                            알림
                        </h3>
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-container">
                                    <div class="new-card-wrapper">
                                        <p>준비중입니다</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bookmark" v-if="bookmarkopen">
                        <h3>
                            <svg style="width:20px;" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2"><path fill="#7D8590" d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"></path></svg>
                            북마크한 커뮤니티
                        </h3>
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-container">
                                    <div class="new-card-wrapper" v-if="bookmark?.length == 0">
                                        <p>북마크한 커뮤니티가 없습니다</p>
                                    </div>
                                    <div class="new-card-wrapper" v-else>                                    
                                        <!-- 새 커뮤니티 카드 박스 -->
                                        <router-link :to="`/community/detail/${bookmark.communityurl}`" class="new-card-box" v-for="(bookmark, index) in bookmark" :key=index>
                                            <div class="new-card-image">
                                                <img id="new-card-image" v-if="bookmark.image != null" :src="bookmark.imageurl">
                                                <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">
                                            </div>
                                            <span id="new-text-title" class="new-text-title">{{ bookmark.title }}</span>
                                            <span id="new-text-introduction" class="new-text-introduction">{{ bookmark.introduction }}</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="posts" v-if="communityopen">
                        <div class="post-title-box">
                            <h3>
                                <svg style="width:20px;" id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" id="XMLID_1646_" d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z"></path><path id="XMLID_1645_" fill="#7D8590" d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path></svg>
                                내 커뮤니티
                            </h3>
                            <router-link :to="`/my_community`" class="visit-button" v-if="userid===profile.id">
                                <span>모아보기</span>
                                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                    viewBox="0 0 1024 1024">
                                    <path
                                        d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z">
                                    </path>
                                </svg>
                            </router-link>
                        </div>                        
                        <div class="main-container">
                            <div class="main-box">
                                <div class="new-card-container">
                                    
                                    <div class="new-card-wrapper" v-if="community?.length == 0">
                                        <p>내 커뮤니티가 없습니다</p>
                                    </div>
                                    <div class="new-card-wrapper" v-else>                                    
                                        <!-- 새 커뮤니티 카드 박스 -->
                                        <router-link :to="`/community/detail/${community.communityurl}`" class="new-card-box" v-for="(community, index) in community" :key=index>
                                            <div class="new-card-image">
                                                <img id="new-card-image" v-if="community.image != ''" :src="community.imageurl">
                                                <img id="new-card-image" v-else src="@/assets/comu_image(1).jpg">
                                            </div>
                                            <span id="new-text-title" class="new-text-title">{{ community.title }}</span>
                                            <span id="new-text-introduction" class="new-text-introduction">{{ community.introduction }}</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>

                    <div class="community" v-if="feedopen">
                        <div class="main-container-2">
                            <h3>
                                <svg style="width:20px;" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" d="m109.9 20.63a6.232 6.232 0 0 0 -8.588-.22l-57.463 51.843c-.012.011-.02.024-.031.035s-.023.017-.034.027l-4.721 4.722a1.749 1.749 0 0 0 0 2.475l.341.342-3.16 3.16a8 8 0 0 0 -1.424 1.967 11.382 11.382 0 0 0 -12.055 10.609c-.006.036-.011.074-.015.111a5.763 5.763 0 0 1 -4.928 5.41 1.75 1.75 0 0 0 -.844 3.14c4.844 3.619 9.4 4.915 13.338 4.915a17.14 17.14 0 0 0 11.738-4.545l.182-.167a11.354 11.354 0 0 0 3.348-8.081c0-.225-.02-.445-.032-.667a8.041 8.041 0 0 0 1.962-1.421l3.16-3.161.342.342a1.749 1.749 0 0 0 2.475 0l4.722-4.722c.011-.011.018-.025.029-.036s.023-.018.033-.029l51.844-57.46a6.236 6.236 0 0 0 -.219-8.589zm-70.1 81.311-.122.111c-.808.787-7.667 6.974-17.826 1.221a9.166 9.166 0 0 0 4.36-7.036 1.758 1.758 0 0 0 .036-.273 7.892 7.892 0 0 1 9.122-7.414c.017.005.031.014.048.019a1.717 1.717 0 0 0 .379.055 7.918 7.918 0 0 1 4 13.317zm5.239-10.131c-.093.093-.194.176-.293.26a11.459 11.459 0 0 0 -6.289-6.286c.084-.1.167-.2.261-.3l3.161-3.161 6.321 6.326zm7.214-4.057-9.479-9.479 2.247-2.247 9.479 9.479zm55.267-60.879-50.61 56.092-9.348-9.348 56.092-50.61a2.737 2.737 0 0 1 3.866 3.866z"></path></svg>
                                내 게시글
                            </h3>
                            <div class="main-box-2">
                                <div class="new-card-wrapper-2" v-if="feed?.length == 0">
                                    <p>내 게시글이 없습니다</p>
                                </div>
                                <div class="new-card-wrapper-2" v-else>  
                                    <div class="my-feeds-box">
                                        <div class="main-card-wrapper">
                                            <!-- 게시글 1개 -->
                                            <router-link :to="`/community/detail/:community_name/feed/${feed.id}`" v-for="(feed, index) in feed" :key=index>
                                                <div class="content-card">
                                                    <div class="feed-card-image">
                                                        <img id="feed-card-image" v-if="feed.image != null" :src="feed.imageurl">
                                                        <img id="feed-card-image" v-else src="@/assets/feed_image(1).jpg">
                                                    </div>
                                                    <div class="title-box">
                                                        <span class="content-title">{{ feed.title }}</span>
                                                    </div>
                                                    <span id="new-text-introduction" class="new-text-introduction"><div v-html="feed.content"></div></span>
                                                    <p class="content-date">{{ feed.created_at.slice(0,10) }} | {{ feed.created_at.slice(12,19) }}</p>
                                                    <div class="view-box">
                                                        <img src="@/assets/view_look.png">
                                                        <span class="content-count">{{ feed.view_count }}</span> 
                                                    </div>
                                                    <div class="like-box">
                                                        <img src="@/assets/like.png">
                                                        <span class="content-count">{{ feed.likes_count }}</span>
                                                    </div>
                                                    <div class="comment-box">
                                                        <img src="@/assets/comment.png">
                                                        <span class="content-count">{{ feed.comments_count }}</span>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <!--<div class="main-container-3">
                            <h3 class="gp-menu-title">내가 참여 중인 공동구매</h3>
                            <div class="main-box-3">
                                <div class="new-card-wrapper-2" v-if="feed?.length == 0">
                                    <p>참여중인 공동구매가 없습니다</p>
                                </div>
                                <div class="new-card-wrapper-2" v-else>  
                                    <div class="my-feeds-box">
                                        <div class="main-card-wrapper">
                                            <router-link :to="`/community/detail/${grouppurchase.community_url}/groupbuy/${grouppurchase.id}`" v-for="(grouppurchase, index) in grouppurchase" :key=index>
                                                <div class="gp-content-card">
                                                    <div class="gp-title-box">
                                                        <span class="content-title">{{ grouppurchase.title }}</span>
                                                    </div>
                                                    <span id="gp-product-name" class="gp-product-name"><div v-html="grouppurchase.product_name"></div></span>
                                                    <li>시작일</li>
                                                    <p class="gp-content-date">{{ grouppurchase.open_at.slice(0,10) }} | {{ grouppurchase.open_at.slice(12,19) }}</p>
                                                    <li>마감일</li>
                                                    <p class="gp-content-date">{{ grouppurchase.close_at.slice(0,10) }} | {{ grouppurchase.close_at.slice(12,19) }}</p>
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>--> 
                    </div>

                    <div class="main-container-3" v-if="purchaseopen">
                        <h3 class="gp-menu-title">
                            <svg style="width:20px;" id="svg8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-33.022 -30.617)"><path fill="#7D8590" id="path26276" d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"></path></g></svg>
                            참여 중인 공동구매
                        </h3>
                        <div class="main-box-3">
                            <div class="new-card-wrapper-2" v-if="feed?.length == 0">
                                <p>참여중인 공동구매가 없습니다</p>
                            </div>
                            <div class="new-card-wrapper-2" v-else>  
                                <div class="my-feeds-box">
                                    <div class="main-card-wrapper">
                                        <!-- 공구 게시글 1개 -->
                                        <router-link :to="`/community/detail/${grouppurchase.community_url}/groupbuy/${grouppurchase.id}`" v-for="(grouppurchase, index) in grouppurchase" :key=index>
                                            <div class="gp-content-card">
                                                <div class="gp-title-box">
                                                    <span class="content-title">{{ grouppurchase.title }}</span>
                                                </div>
                                                <span id="gp-product-name" class="gp-product-name"><div v-html="grouppurchase.product_name"></div></span>
                                                <li>시작일</li>
                                                <p class="gp-content-date">{{ grouppurchase.open_at.slice(0,10) }} | {{ grouppurchase.open_at.slice(12,19) }}</p>
                                                <li>마감일</li>
                                                <p class="gp-content-date">{{ grouppurchase.close_at.slice(0,10) }} | {{ grouppurchase.close_at.slice(12,19) }}</p>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                <div class="user_profile" v-if="profile">
                    <div class="card">
                        <div class="card-image">
                            <img :src="profile.profileimageurl" v-if="profile.profileimage !== null && profile.profileimage.includes('profile_img')" @click='openModal'/>
                            <img :src="profile.profileimageurl.slice(33)" v-else-if="profile.profileimage !== null" @click='openModal'/>
                            <img src="@/assets/room_image(5).jpg" v-else />
                        </div>
                        <div class="category"> {{ profile.nickname }} | {{ profile.region }} </div>
                        <div class="heading" v-if="profile.introduction != null"> {{ profile.introduction }}
                            <div class="author"> By <span class="name">{{ profile.user_name }}</span></div>
                            <div class="author"> 가입일 <span class="name">{{ profile.created_at.slice(0, 10) }}</span></div>
                        </div>
                        <div class="heading" v-else> 인사말이 없습니다
                            <div class="author"> By <span class="name">{{ profile.user_name }}</span></div>
                            <div class="author"> 가입일 <span class="name">{{ profile.created_at.slice(0, 10) }}</span></div>
                        </div>
                        <div class="guestbook-comment" v-if="userid===profile.id">
                            <div class="submit-box">
                                <router-link :to="`/profile/update/${profile.id}`" class="Btn" @click="editProfile()">수정
                                    <svg class="Btn-svg" viewBox="0 0 512 512">
                                        <path
                                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                        </path>
                                    </svg>
                                </router-link>
                                <button class="quit-button" @click="deleteUserCheck()">탈퇴</button>
                            </div>               
                        </div>
                    </div>

                    <div class="radioinput">
                        <button class="value" :class="{ 'active': notificationopen}" @click="notificationOpen">
                            <svg fill="none" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z" fill="#7D8590" fill-rule="evenodd"></path></svg>
                            알림
                        </button>
                        <button class="value" :class="{ 'active': bookmarkopen}" @click="bookmarkOpen">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2"><path fill="#7D8590" d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"></path></svg>
                            북마크한 커뮤니티
                        </button>
                        <button class="value" :class="{ 'active': communityopen}" @click="communityOpen">
                            <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" id="XMLID_1646_" d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z"></path><path id="XMLID_1645_" fill="#7D8590" d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path></svg>
                            내 커뮤니티
                        </button>
                        <button class="value" :class="{ 'active': feedopen}" @click="feedOpen">
                            <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" d="m109.9 20.63a6.232 6.232 0 0 0 -8.588-.22l-57.463 51.843c-.012.011-.02.024-.031.035s-.023.017-.034.027l-4.721 4.722a1.749 1.749 0 0 0 0 2.475l.341.342-3.16 3.16a8 8 0 0 0 -1.424 1.967 11.382 11.382 0 0 0 -12.055 10.609c-.006.036-.011.074-.015.111a5.763 5.763 0 0 1 -4.928 5.41 1.75 1.75 0 0 0 -.844 3.14c4.844 3.619 9.4 4.915 13.338 4.915a17.14 17.14 0 0 0 11.738-4.545l.182-.167a11.354 11.354 0 0 0 3.348-8.081c0-.225-.02-.445-.032-.667a8.041 8.041 0 0 0 1.962-1.421l3.16-3.161.342.342a1.749 1.749 0 0 0 2.475 0l4.722-4.722c.011-.011.018-.025.029-.036s.023-.018.033-.029l51.844-57.46a6.236 6.236 0 0 0 -.219-8.589zm-70.1 81.311-.122.111c-.808.787-7.667 6.974-17.826 1.221a9.166 9.166 0 0 0 4.36-7.036 1.758 1.758 0 0 0 .036-.273 7.892 7.892 0 0 1 9.122-7.414c.017.005.031.014.048.019a1.717 1.717 0 0 0 .379.055 7.918 7.918 0 0 1 4 13.317zm5.239-10.131c-.093.093-.194.176-.293.26a11.459 11.459 0 0 0 -6.289-6.286c.084-.1.167-.2.261-.3l3.161-3.161 6.321 6.326zm7.214-4.057-9.479-9.479 2.247-2.247 9.479 9.479zm55.267-60.879-50.61 56.092-9.348-9.348 56.092-50.61a2.737 2.737 0 0 1 3.866 3.866z"></path></svg>
                            내 게시글
                        </button>
                        <button class="value" :class="{ 'active': purchaseopen}" @click="purchaseOpen">
                            <svg id="svg8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-33.022 -30.617)"><path fill="#7D8590" id="path26276" d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"></path></g></svg>
                            참여중인 공동구매
                        </button>
                    </div>
                        
                </div>
            </div>
            <div class="sub-area">
                <div class="main-container-book">
                    <div class="sub-input-wrapper">
                        <div class="sub-text-info">
                            <p>방명록 |</p> 
                            <p style="margin-left: 3px;">{{ guestbook_length }}</p>
                        </div>
                        <textarea v-model="inputComment" autocomplete="off" class="input-sub-text" placeholder="여기에 방명록을 입력하세요" @keyup.enter="createComment()"></textarea>
                        <button class="input-button" @click="createComment()">입 력</button>
                    </div>

                    <div class="sub-content-wrapper-0">
                        <!-- guestbook 1개 묶음 -->
                        <div class="guestbook-box">
                            <!-- guestbook 내용 -->
                            <div v-if="guestbook_length === 0">
                                <p>첫 방명록을 작성해 보세요!</p>
                            </div>
                            <div v-else>
                                <div class="guestbook-card" v-for="(guestbook, index) in guestbook" :key="index">
                                    <!-- 댓글 수정용 div. display:none; 토글 필요 -->
                                    <div class="guestbook-update-box" v-if="guestbook.commenteditshow">
                                        <div class="guestbook-update-div">
                                        <p>댓글 수정</p>
                                        <textarea v-model="inputUpdateComment" class="update-textarea" @keyup.enter="editComment(guestbook.id)"></textarea>
                                        <button type="submit" class="update-submit-button" @click="editComment(guestbook.id)">수정 완료</button>
                                        <button class="update-quit-button" @click="commenteditshow(guestbook)">취소</button>
                                        </div>
                                    </div>

                                    <li class="guestbook-author"><router-link :to="`/profile/${guestbook.user}`">{{ guestbook.nickname }}</router-link></li>
                                    <li class="guestbook-date">작성일 {{ guestbook.created_at.slice(5, 10) }} 수정일 {{ guestbook.updated_at.slice(5, 10) }}</li>
                                    <li class="guestbook-text">
                                        {{ guestbook.comment }}
                                    </li>
                                    <div class="guestbook-func-box" v-if="userid===guestbook.user">
                                        <button class="guestbook-edit-btn" @click="commenteditshow(guestbook)">
                                            <svg class="edit-icon" viewBox="0 0 512 512" height="17.5" width="15">
                                                <path
                                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button class="guestbook-delete-btn" @click="deleteComment(guestbook.id)">
                                            <svg viewBox="0 0 15 17.5" height="17.5" width="15"
                                                xmlns="http://www.w3.org/2000/svg" class="delete-icon">
                                                <path transform="translate(-2.5 -1.25)"
                                                    d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                    id="Fill"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import PasswordWithdrawalModal from "@/components/PasswordWithdrawalModal.vue";
import { mapGetters } from "vuex";
import  {  fetchGuestBook, fetchGuestBookEdit, fetchGuestBookDelete, fetchProfileDelete } from "@/api/index.js";
import bus from '@/utils/bus.js'


export default {
    computed: {
        ...mapGetters({"data":"fetchProfile"}),
        profile() {
            return this.data.profile;
        },
        bookmark() {
            return this.data.bookmark;
        },
        community() {
            return this.data.community;
        },
        feed() {
            return this.data.feed;
        },
        guestbook(){
            if (Array.isArray(this.data?.guestbook)) {
                return this.data?.guestbook?.map(guestbook => ({
                    ...guestbook,
                    commenteditshow: false,
                    }))
                }
                return [];
        },
        guestbook_length() {
            return this.guestbook?.length;
        },
        grouppurchase() {
            return this.data.joined_grouppurchase;
        }
    },
    data() {
        return {
            userid: '',
            inputComment: '',
            inputUpdateComment: "",
            profileModal: false,
            modalopen: false,
            password:'',

            notificationopen: false,
            bookmarkopen: false,
            communityopen: false,
            feedopen: false,
            purchaseopen: false,
        }
    },
    created() {
        const user_id = this.$route.params.id
        this.$store.dispatch("FETCH_USER_PROFILE", user_id);
    },
    mounted() {
        const payload = localStorage.getItem('payload');
        if (payload) {
            const { user_id } = JSON.parse(payload);
            this.userid = user_id;
        }
    },
    watch:{
        $route() {
            const user_id = this.$route.params.id
            this.$store.dispatch("FETCH_USER_PROFILE", user_id);
        }
    },
    methods: {
        commenteditshow(guestbook) {
            this.inputUpdateComment = guestbook.comment;
            guestbook.commenteditshow = !guestbook.commenteditshow;
            this.$forceUpdate()
        },
        async createComment() {
            try {
                const profile_id = this.$route.params.id;
                const response = await fetchGuestBook(profile_id, this.inputComment)
                if (response.status === 200) {
                    this.snotify('success','방명록을 작성했습니다.')
                    const user_id = this.$route.params.id
                    this.$store.dispatch("FETCH_USER_PROFILE", user_id);
                    this.inputComment='';
                }
            } catch (error) {
                if (error.response.status === 401) {
                    this.snotify('warning',"로그인을 해주세요");
                }else{
                    this.snotify('error','방명록 작성에 실패했습니다.')
                }
            } 
        },
        async editComment(guestbook_id) {
            try {
                const profile_id = this.$route.params.id;
                const response = await fetchGuestBookEdit(profile_id, guestbook_id, this.inputUpdateComment)
                if (response.status === 200) {
                    this.snotify('success','방명록 수정이 완료되었습니다.')
                    this.commenteditshow = false;
                    const user_id = this.$route.params.id
                    this.$store.dispatch("FETCH_USER_PROFILE", user_id);
                }
            } catch (error) {
                console.log(error)
            } 
        },
        async deleteComment(guestbook_id) {
            try {
                const profile_id = this.$route.params.id;
                const response = await fetchGuestBookDelete(profile_id, guestbook_id)
                if (response.status === 204) {
                    console.log(response)
                    const user_id = this.$route.params.id
                    this.$store.dispatch("FETCH_USER_PROFILE", user_id);
                    this.snotify('success','방명록 삭제가 완료되었습니다.')
                }
            } catch (error) {
                this.snotify('error','방명록 삭제에 실패했습니다.')
            } 
        },

        deleteUserCheck() {
            const check = confirm('계정을 비활성화 하시겠습니까?')
            this.modalopen = true;
            if (check) {
                this.deleteUser();
            }

        },
        async deleteUser() {
            try {                
                const response = await fetchProfileDelete(this.userid)
                if (response.status === 204) {
                    this.snotify('info',response.data.message)
                }
            } catch (error) {
                this.snotify('error','계정 비활성화에 실패했습니다.')
            } 
        },
        snotify(type,message){
            bus.$emit('showSnackbar',{
                type,
                message
            });
        },
        openModal(){
            this.profileModal = true;
        },
        closeModal(){
            this.profileModal = false;
        },
        notificationOpen() {
            if (this.profile.id !== this.userid && !this.profile.is_agreed) {
                this.snotify('warning','정보를 미공개한 사용자입니다.')
            } else {
                this.notificationopen = !this.notificationopen
            }
        },
        feedOpen() {
            if (this.profile.id !== this.userid && !this.profile.is_agreed) {
                this.snotify('warning','정보를 미공개한 사용자입니다.')
            } else {
                this.feedopen = !this.feedopen
            }
        },
        communityOpen() {
            if (this.profile.id !== this.userid && !this.profile.is_agreed) {
                this.snotify('warning','정보를 미공개한 사용자입니다.')
            } else {
                this.communityopen = !this.communityopen
            }
        },
        bookmarkOpen() {
            if (this.profile.id !== this.userid && !this.profile.is_agreed) {
                this.snotify('warning','정보를 미공개한 사용자입니다.')
            } else {
                this.bookmarkopen = !this.bookmarkopen
            }
        },
        purchaseOpen() {
            if (this.profile.id !== this.userid && !this.profile.is_agreed) {
                this.snotify('warning','정보를 미공개한 사용자입니다.')
            } else {
                this.purchaseopen = !this.purchaseopen
            }
        },
    },
    components: {
        PasswordWithdrawalModal,
    }
}
</script>

<style scoped>
.body-section{
    max-width:1800px;
    margin:0 auto;
}
.modal-back{
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
.profile-modal{
    z-index: 99999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.modal-header{
    float:right;
}
a {
    color: inherit;
    text-decoration: none;
}
p {
    color: #000
}
img {
    display: block;
}
header {
    background-image: url("@/assets/bc2.png");
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
}
header >  #menu {
    background-color: #9E2067;
}
header > .profile > h3 {
    padding: 48px 0 24px 118px;
}


.quit-button {
 display: flex;
 /* height: 3em; */
 width: 100px;
 align-items: center;
 justify-content: center;
 background-color: #eeeeee4b;
 border-radius: 3px;
 letter-spacing: 1px;
 transition: all 0.2s linear;
 cursor: pointer;
 border: none;
 background: #fff;
}
.quit-button > svg {
 margin-right: 5px;
 margin-left: 5px;
 font-size: 20px;
 transition: all 0.4s ease-in;
}
.quit-button:hover {
    background-color: rgb(185, 0, 0);
}


/***** 버튼 css *****/
.visit-button {
    display: flex;
    margin-top: 15px;
    margin-left: 30px;
    height: 2.2em;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #909090;
    border-radius: 5px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
}
.visit-button > span {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
}
.visit-button > svg {
    margin-right: 5px;
    margin-left: 5px;
    transition: all 0.4s ease-in;
    transform: rotate(180deg);
    fill: #ffffff;
}
   
.visit-button:hover > svg {
    font-size: 1.5em;
    transform: translateX(4px) rotate(180deg) scale(1.3);
    fill: #ffffff;
}
.visit-button:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-3px);
}
.list {
    margin: auto;
}
.bookmark {
    margin: auto;
    margin-top: 40px;
    height: 50%;
    flex-wrap: wrap;
}

.posts {
    margin: auto;
    margin-top: 40px;
    height: 50%;
    flex-direction: row;
    flex-wrap: wrap;
}

.community {
    margin: auto;
    /*margin-top: 40px;*/
    height: 50%;
    flex-direction: row;
    flex-wrap: wrap;
    display: grid;
    grid-template-columns: 49% 2% 49%;
    grid-template-rows: 50px auto;

}


.card {
  width: 472px;
  min-height: 424px;
  background: white;
  padding: .4em;
  border-radius: 6px;
  margin-left: -648px;
  margin: auto;
  object-fit: cover;
}

.card > .change {
    margin-top: 24px;
    float: right;
}

.card-image {
  /*background-color: rgb(236, 236, 236);
  background-size: cover;
  background-repeat: no-repeat;*/
  
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
}
.card-image:hover {
  transform: scale(0.98);
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.category {
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: 600;
  color: rgb(63, 121, 230);
  padding: 10px 7px 0;
}
.category:hover {
  cursor: pointer;
}
.heading {
  font-weight: 600;
  color: rgb(88, 87, 87);
  padding: 7px;
}
.heading:hover {
  cursor: pointer;
}
.author {
  color: gray;
  font-weight: 400;
  font-size: 11px;
  padding-top: 20px;
}
.name {
  font-weight: 600;
}
.name:hover {
  cursor: pointer;
}


.mypage {
    width: 1200px;

    top: 0;
    bottom: 0;
    margin: auto;
    display: grid;
    place-items: start;
    grid-template-rows: (1, 48px);
    grid-template-columns: repeat(9, 680px);
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: auto;
}


.new-card-box:nth-child(1) {
    grid-column: 1 / 5;
}

.new-card-box:nth-child(2) {
    grid-column: span 6;
}


.user {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
}
.user > .guestbook {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    
}
.user > .guestbook > h3::after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 18px;
    margin-left: 8px;
    margin-right: 14px;
    background-color: #9E2067;
}
.user > .guestbook > h4 {
    margin-right: 20px;
}
.user > .input-box {
    margin-right: 84px;;
}
.writer >.user-guestbook {
    position: relative;
    display: flex;
    align-items: center;
    width: 928px; 
    height: 68px;
    margin: 0 auto;
}
.writer > .user-guestbook > .user-writer {
    display: flex;
    align-items: center;
    height: 41px;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
}
.writer > .user-guestbook > .user-writer > h5 {
    margin-left: 12px;
    margin-right: 24px;
}
.writer > .user-guestbook > h6 {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 12px;
    right: 4px;
    margin: auto;
    margin-right: 44px;
}
.user-guestbook  {
    height: 24px;
    top: 0;
    bottom: 0;
    margin: auto;
}

.user_profile {
    margin-top: 40px;
}
.user_profile .card .card-image{
    cursor: pointer;
}
 /*.user-guestbook > .submit-box > .create-button {
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 20px 28px 25px;
    font-size: 8px;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #a92278;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
.writer > .guestbook-comment {
    position: relative;
    display: flex;
    align-items: center;
    width: 928px; 
    height: 84px;     
    margin: 0 auto; 
}
.writer > .guestbook-comment > p {
        margin-left: 12px;
}
.writer > .guestbook-comment >.submit-box {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 41px;  
    right: 4px;
    margin: auto;
    margin-right: 44px;
}*/

.guestbook-comment > .submit-box {
    display: flex;
}

.guestbook-comment {
    height: 100px;
    float: right;
    /*width: 235px;*/
    /*padding-right: 100px;*/
    padding-top: 50px;
}

.guestbook-comment > .submit-box {
    display: flex;
    height: 43px;
    top: 0;
    bottom: 0;
    left: 33%;
    margin: 0 auto;
    /*margin-right:28px;*/
}

.input-box {
    display: flex;
    justify-content: center;
}
.input-title {
    width: 524px;
    height: 44px;
    margin-right: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
}
.create-button {
    margin-right: 30px;
    outline: none;
    border: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: 10px 28px 11px;
    font-size: 14px;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #a92278;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
  }
.create-button::after,
.create-button::before {
    transition: all 0.2s ease-in-out;
  }
.create-button::before {
    z-index: -1;
    position: absolute;
    content: "";
    left: -2em;
    right: -2em;
    top: -2em;
    bottom: -2em;
    background-repeat: no-repeat;
    background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, white 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      /*  */
        radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, white 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, white 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
      10% 10%, 18% 18%, 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
      20% 20%;
    background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
      65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
      64% 70%, 80% 71%;
  }
  
.create-button:hover::before {
    background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%,
      100% -2%, -5% 80%, 100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%,
      100% 100%;
    background-size: 0% 0%;
    transition: background-position 0.5s ease-in-out,
      background-size 0.75s ease-in-out;
}

.quit-button {
    width: 100px;
    height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 31px 11px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    color: hsl(0, 0%, 100%);
    background-color: #909090;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

.quit-button:hover {
    background-color: #292c2f;
    opacity: 0.9;
}

/***** 새로운 커뮤니티 area *****/
.new-card-container {
    display: flex;
    margin-right: auto;
    width: 800px;
    justify-content: flex-start;
    padding-right: 30px;
}

.new-card-wrapper {
    width: 800px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
}
.new-card-wrapper::-webkit-scrollbar{
    height: 7px;
}
.new-card-wrapper::-webkit-scrollbar-thumb{
    background-color: #a92278;
    border-radius: 10px;
}
.new-card-wrapper::-webkit-scrollbar-track{
    background-color: #ffffff;
    border-radius: 10px;
}

.new-card-box {
    width: 300px;
    height: 120px;
    margin: 18px 12px 18px 22px;
    padding: 8px;
    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;
    display: grid;
    grid-template-columns: 120px 150px 30px;
    grid-template-rows: 40px auto;
}

.new-card-box:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}
.new-card-image {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}
.new-card-box img {
    height: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    background-size: cover;
    background-repeat: no-repeat;
}
.new-text-title {
    margin: 5px 15px;
    height: 20px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #707070;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
}
.new-text-region {
    margin-top: 7px;
    font-size: 0.8rem;
    color: #909090;
}.new-text-introduction {
    margin: 0px 8px 6px 15px;
    height: 100%;
    font-size: 0.8rem;
    color: #909090;
    text-indent: 7px;
    line-height: 1.5;
    grid-column: 2/4;
    grid-row: 2;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
}
.post-title-box {
   display: inline-flex; 
}
.post-card {
  width: 100%;
  max-width: 290px;
  height: 70px;
  background: #353535;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
}
.post-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
}
.post-card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}
.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  color: white;
  font-family: 'Poppins' sans-serif;
}
.textContent {
    width: 140px; 
 white-space: nowrap;
 text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.span {
  font-size: 10px;
}
.h1 {
  font-size: 16px;
  font-weight: bold;
}

.p {
  font-size: 12px;
  font-weight: lighter;
}

.main-container-book {
    margin: 20px 30px;
    padding: 30px;
}
/* 새 글 쓰기 button */

.Btn {
    margin-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 60px;
    height: 40px;
    border: none;
    padding: 0px 20px;
    background-color: #9e2070;
    color: white;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
    transition-duration: .3s;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
.Btn-svg {
    width: 13px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: white;
    transition-duration: .3s;
}
  
.Btn:hover {
    color: transparent;
}
  
.Btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: .3s;
}
  
.Btn:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
    box-shadow: 2px 2px 0px #6a154b;
}

/* sub-content! 댓글 input area */
.sub-input-wrapper {
    margin: 0px 0px 50px 0px;
    display: grid;

    grid-template-columns: 90px 80% 90px;
    grid-template-rows: 90px;
}

.sub-text-info {
    display: flex;
    grid-column: 1 / 2;
}
.sub-text-info p {
    margin-right: 3px;
    padding-top: 20px;
}

.input-sub-text {
    padding: 0.5rem 0.8rem;
    grid-column: 2 / 3;
    margin: 0 auto;
    width: 92%;
    resize: none;

    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0.5rem 0.8rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.input-sub-text:hover, .input-sub-text:focus, .input {
    outline: none;
    border-color: #9E2067;
}

.input-group:hover, .input:focus {
    color: #9E2067;
}


/* 입력 button area */

.input-button {
    grid-column: 3 / 4;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #a92278;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}

.input-button:active {
    transform: translate(0, 3px);
    transition-duration: .3s;
}


/* 댓글 내용 area */

.sub-content-wrapper-0 {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto, 100%);
}

.guestbook-box {
  display: block;
  list-style-type: none;
  width: auto;
  height: 80px auto;
}
.guestbook-box div p {
  text-align: center;
}
.guestbook-card {
  display: grid;
  grid-template-columns: 120px auto 200px;
  grid-template-rows: 30px auto;
  grid-gap: 4px;
  position: relative;

  padding: 10px 20px;
  width: auto;
  height: auto;
  background-color: #f7f7f7;
  color: #454545;
  box-shadow: #dddddd 0px -2px 0px inset;
}

.guestbook-author {
  margin: auto 0;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.guestbook-date {
  margin-left: auto;
  margin-top: 5px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  font-size: 13px;
}

.guestbook-text {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.guestbook-func-box {
  display: flex;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

/* guestbook 수정 버튼 */

.guestbook-edit-btn {
  background-color: transparent;
  position: relative;
  border: none;
  margin-left: auto;
  margin-top: auto;
  margin-right: 5px;
}

.guestbook-edit-btn::after {
  content: "수정";
  white-space: nowrap;
  margin-top: 10px;
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background-color: rgb(34, 64, 115);
  padding: 4px 8px;
  border-radius: 5px;
  transition: 0.2s linear;
  transition-delay: 0.2s;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
}

.edit-icon {
  transform: scale(1.1);
  transition: 0.2s linear;
}

.guestbook-edit-btn:hover > .edit-icon {
  transform: scale(1.3);
  cursor: pointer;
}

.guestbook-edit-btn:hover > .edit-icon path {
  fill: rgb(34, 64, 115);
  cursor: pointer;
}

.guestbook-edit-btn:hover::after {
  visibility: visible;
  opacity: 1;
  top: -160%;
  cursor: pointer;
}

/* guestbook 삭제 버튼 */

.guestbook-delete-btn {
  background-color: transparent;
  position: relative;
  border: none;
  margin-top: auto;
}

.guestbook-delete-btn::after {
  content: "삭제";
  white-space: nowrap;
  margin-top: 10px;
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background-color: rgb(168, 7, 7);
  padding: 4px 8px;
  border-radius: 5px;
  transition: 0.2s linear;
  transition-delay: 0.2s;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
}

.delete-icon {
  transform: scale(1.1);
  transition: 0.2s linear;
}

.guestbook-delete-btn:hover > .delete-icon {
  transform: scale(1.3);
  cursor: pointer;
}

.guestbook-delete-btn:hover > .delete-icon path {
  fill: rgb(168, 7, 7);
  cursor: pointer;
}

.guestbook-delete-btn:hover::after {
  visibility: visible;
  opacity: 1;
  top: -160%;
  cursor: pointer;
}

/* guestbook 수정 div, textarea, button */
.guestbook-update-box {
    /* display: none; */
    
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.guestbook-update-div{
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    box-shadow:#dddddd 0px -2px 0px inset;
    align-items: center;
    justify-content: space-evenly;
}
.guestbook-update-div p {
    color: #909090;
    font-size: 0.9rem;
    margin: 0px 15px;
}

/* 댓글 수정 textarea */
.update-textarea {
    width: 70%;
    height: 65%;
    margin-right: 20px;
    resize: none;
    overflow: auto;
    padding: 0.5rem 0.8rem;

    border-radius: .3rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s;
}

.update-textarea:hover, .update-textarea:focus, .input {
    outline: none;
    border-color: #9E2067;
}

/* guestbook 수정 내 버튼 - 수정완료 / 취소 */
.guestbook-update-div button {
    margin-right: 10px;
}

.update-submit-button {
    white-space: nowrap;
    padding: 20px 13px;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #9E2067;
    box-shadow: 0 2px 5px rgba(70, 70, 70, 0.5);
}
.update-submit-button:hover{
    background-color: #c3348e;
}
.update-submit-button:active {
    transform: translate(0, 3px);
    transition-duration: .1s;
}

.update-quit-button {
    white-space: nowrap;
    padding: 20px 25px;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    color: hsl(0, 0%, 100%);
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    position: relative;
    background-color: #dddddd;
    box-shadow: 0 2px 5px rgba(131, 131, 131, 0.5);
}
.update-quit-button:active {
    transform: translate(0, 3px);
    transition-duration: .1s;
}
.update-quit-button:hover{
    background-color: #c0c0c0;
}

.main-content-wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(10, auto);
    margin-left: 30px;
}

/* 게시글 area */
.main-container-2 {
    grid-column: 1 / 2;
    grid-row:2 / 3;
}

.my-feeds-box {
    margin: 20px 0px;
    padding: 10px 10px;
    width: 95%;
    height: 320px;
    overflow-y: auto;
    overflow-x: hidden;
}
.my-feeds-box:nth-child(1){
    padding-left:0;
}
.my-feeds-box::-webkit-scrollbar {
    width: 7px;
    background-color: #F5F5F5;
}
.my-feeds-box::-webkit-scrollbar-thumb {
    background-color: #9E2067;
    border-radius: 10px;
}

.content-card {
    width: 350px;
    height: 50px;
    padding: 5px;
    margin: 7px;

    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;

    display: grid;
    grid-template-columns: 80px auto 55px 55px 55px;
    grid-template-rows: 20px 30px;
}
    
.content-card:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 10px 20px 4px rgba(35, 35, 35, .1);
}

.feed-card-image {
    width: 80px;
    height: 53px;
    position: relative;

    overflow: hidden;
    justify-content: center;
    align-items: center;
    
    grid-column: 1 / 2;
    grid-row: 1 / 3;
}

.feed-card-image img {
    height: 120%;
    position: absolute;
}

.title-box {
    margin-left: 20px;

    padding-right: 30px;
    height: 20px;

    white-space:nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
}

.title-box span {
    color: #454545;
    font-size: 1rem;
    font-weight: 600;
}

.content-date {
    margin: auto 10px;
    margin-left:auto;

    color: #909090;
    font-size: 0.8rem;
    grid-column: 3 / 6;
    grid-row: 2 / 3; 
}

.view-box{
    display: flex;
    margin: auto 0px;
    margin-left: auto;
    align-items: center;
    grid-column: 3 / 4;
    grid-row: 1 / 2;
}

.view-box img {
    padding-right: 1px;
    width: 20px;
    height: 15px;
}

.like-box{
    display: flex;
    margin: auto 20px;
    align-items: center;
    grid-column: 4 / 5;
    grid-row: 1 / 2;
}

.like-box img {
    padding-right: 4px;
    width: 15px;
    height: 16px;
}

.comment-box{
    display: flex;
    margin: auto;
    margin-right: 10px;
    align-items: center;
    grid-column: 5 / 6;
    grid-row:1 / 2;
}

.comment-box img {
    padding-right: 4px;
    width: 15px;
    height: 15px;
}

.content-count {
    justify-content: center;
    text-align: center;
    color: #dddddd;
    font-weight: 400;
    font-size: 0.8rem;
    margin-top: 2px;
}


/* 공구 area */
.main-container-3 {
    margin-top: 40px;
    grid-column: 3 / 4;
    grid-row:2 / 3;
}

.gp-menu-title {
    /*margin-left: 20px;*/
    grid-column: 3 / 4;
    grid-row: 1 / 2;
}

.gp-content-card {
    margin: 7px;
    width: 350px;
    height: 50px;
    padding: 5px;

    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;

    display: grid;
    grid-template-columns: 160px 40px auto;
    grid-template-rows: 25px 25px;
}
.gp-content-card:hover {
    border: #9E2067, 0.2em solid;
    box-shadow: 0 0px 20px 4px #ffcce4 ;
}
.gp-title-box {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin: auto 5px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.gp-product-name {
    list-style-type: none;
    margin: auto 5px;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    color: #909090;
    font-size: 0.8rem;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

.gp-content-card li {
    list-style-type: none;
    margin: auto 0px;

    color: #909090;
    font-size: 0.8rem;
}

.gp-content-date {
    margin: auto 5px;
    margin-right: 10px;
    margin-left:auto;
    color: #909090;
    font-size: 0.8rem;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
}

/* 라디오 */
.radioinput {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #05060f0a;
  justify-content: center;
  border-radius: 5px
}

.value {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: rgb(88, 87, 87);
  display: flex;
  position: relative;
  gap: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.value:not(:active):hover{
  background-color: #909090;
  color: white;
}

.value:hover,
.active {
  background-color: #292c2f;
  outline: none;
  color: white;
  opacity: 0.9;
}

.value::before {
  content: "";
  position: absolute;
  top: 5px;
  left: -10px;
  width: 5px;
  height: 80%;
  background-color: #9E2067;
  border-radius: 5px;
  opacity: 0;
}

.value:hover::before,
.active::before {
  opacity: 1;
}

.value svg {
  width: 15px
}

.radioinput:hover > :not(.value:hover,.active){
    transition: 300ms;
    filter: blur(1px);
}
.radioinput:hover > :not(.value:hover){
    transition: 300ms;
    transform: scale(0.95,0.95);
}
</style>
