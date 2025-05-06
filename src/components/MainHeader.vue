<template>
    <header class="mainHeader">
        <div class="container">
            <div class="header-phone">
                <RouterLink to="/" class="header_logo_link_phone">
                    <h1>健康定胃</h1>
                </RouterLink>
                <nav>
                    <ul class="header_phone_nav">
                        <li @click="toggleModal" v-if="!isLoggedIn"><i class="fa-solid fa-user"></i></li>
                        <li v-else class="fa-solid fa-icon-you-want"><img :src="getImageUrl(member.member_photo)" width="36"
                                height="36" style="border-radius: 50%; border: 1px solid #D9D9D9;" @click="toggleMemList">
                        </li>
                        <div class="member_list" v-show="isMemberList">
                            <router-link to="/member" class="user_info">
                                <div class="mem">
                                    <img :src="getImageUrl(member.member_photo)" width="36" height="36"
                                        style="border-radius: 50%;border: 1px solid #D9D9D9;">
                                    <p>{{
                                        member.member_level == 1 ? '一般會員' :
                                        member.member_level == 2 ? '黃金會員' :
                                            member.member_level == 3 ? '白金會員' :
                                                '鑽石會員'
                                    }}</p>
                                </div>
                                <i class="fa-solid fa-gear"></i>
                            </router-link>
                            <ul class="member_nav">
                                <li><router-link to="/member/coupon"><i
                                            class="fa-solid fa-money-check-dollar"></i>折價券</router-link></li>
                                <li><router-link to="/member/level"><i class="fa-solid fa-gift"></i>會員禮遇</router-link>
                                </li>
                                <li><router-link to="/member/order"><i
                                            class="fa-regular fa-file-lines"></i>訂單查詢</router-link></li>
                                <li><router-link to="/member/favourite">
                                        <i class="fa-regular fa-heart"></i>我的最愛
                                    </router-link></li>
                                <li><router-link to="/member/collection"><i
                                            class="fa-regular fa-bookmark"></i>我的收藏</router-link></li>
                            </ul>
                            <div class="member_logout">
                                <p @click="logOut">登出</p>
                            </div>
                        </div>
                        <li @click="toggleShoppingDrawer"><i class="fa-solid fa-cart-shopping"></i></li>
                        <div class="cart-count">{{ cartItemCount }}</div>
                        <li @click="toggleHeaderMenu"><i class="fa-solid fa-bars"></i></li>
                    </ul>
                </nav>
                <div class="header_phone_menulist" v-show="HeaderMenuStatus" @click="toggleHeaderMenu">
                    <nav class="list-list" @click.stop>
                        <ul>
                            <li>
                                <RouterLink to="/products">健康小舖</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/foodmap">食材地圖</RouterLink>
                            </li>
                            <li>
                                <div @click="toggleSubMenu('healthTools')" class="header_phone_link_list">
                                    <RouterLink to="">健康小幫手</RouterLink>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </div>
                                <ul v-show="subMenuStatus.healthTools">
                                    <li>
                                        <RouterLink to="/bmi">BMI計算</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/bmr">基礎代謝率計算</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/cal">食物熱量查詢</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/gi">食物GI值查詢</RouterLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div @click="toggleSubMenu('healthArticles')" class="header_phone_link_list">
                                    <RouterLink to="">健康專欄</RouterLink>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </div>
                                <ul v-show="subMenuStatus.healthArticles">
                                    <li>
                                        <RouterLink to="/cookbook">熱門食譜</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/article">科普文章</RouterLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <RouterLink to="/about">關於我們</RouterLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="headerPc">
                <div class="header_pc_area">
                    <RouterLink to="/" class="header_logo_link_pc">
                        <h1>健康定胃</h1>
                    </RouterLink>
                    <nav>
                        <ul class="header_pc_nav">
                            <li>
                                <RouterLink to="/products">健康小舖</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/foodmap">食材地圖</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="">健康小幫手</RouterLink>
                                <ul>
                                    <li>
                                        <RouterLink to="/bmi">BMI計算</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/bmr">基礎代謝率計算</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/cal">食物熱量查詢</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/gi">食物GI值查詢</RouterLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <RouterLink to="">健康專欄</RouterLink>
                                <ul>
                                    <li>
                                        <RouterLink to="/cookbook">熱門食譜</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/article">科普文章</RouterLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <RouterLink to="/about">關於我們</RouterLink>
                            </li>
                        </ul>
                    </nav>
                    <ul class="header_pc_icon_nav">
                        <li @click="toggleModal" v-if="!isLoggedIn"><i class="fa-solid fa-user"></i></li>
                        <li v-else class="fa-solid fa-icon-you-want user_pic" @click="toggleMemList"><img
                                :src="getImageUrl(member.member_photo)" width="36" height="36"
                                style="border-radius: 50%;border: 1px solid #D9D9D9;">
                            <div class="member_list" v-show="isMemberList">
                                <router-link to="/member" class="user_info">
                                    <div class="mem">
                                        <img :src="getImageUrl(member.member_photo)" width="36" height="36"
                                            style="border-radius: 50%;border: 1px solid #D9D9D9;">
                                        <p>{{
                                            member.member_level == 1 ? '一般會員' :
                                            member.member_level == 2 ? '黃金會員' :
                                                member.member_level == 3 ? '白金會員' :
                                                    '鑽石會員'
                                        }}</p>
                                    </div>
                                    <i class="fa-solid fa-gear"></i>
                                </router-link>
                                <ul class="member_nav">
                                    <li><router-link to="/member/coupon"><i
                                                class="fa-solid fa-money-check-dollar"></i>折價券</router-link></li>
                                    <li><router-link to="/member/level"><i class="fa-solid fa-gift"></i>會員禮遇</router-link>
                                    </li>
                                    <li><router-link to="/member/order"><i
                                                class="fa-regular fa-file-lines"></i>訂單查詢</router-link></li>
                                    <li><router-link to="/member/favourite">
                                            <i class="fa-regular fa-heart"></i>我的最愛
                                        </router-link></li>
                                    <li><router-link to="/member/collection"><i
                                                class="fa-regular fa-bookmark"></i>我的收藏</router-link></li>
                                </ul>
                                <div class="member_logout">
                                    <p @click="logOut">登出</p>
                                </div>
                            </div>
                        </li>
                        <li @click="toggleShoppingDrawer"><i class="fa-solid fa-cart-shopping"></i></li>
                        <div class="cart-count">{{ cartItemCount }}</div>
                    </ul>
                </div>
            </div>
            <div class="header_modal" id="log-in-modal" v-show="modalStatus">
                <div class="header_modal_bg" @click="toggleModal">
                    <div class="modal">
                        <div class="header_model_area" @click.stop>
                            <div class="header_modal_title">
                                <h3 :class="{ title_active: isLogin, title_inactive: !isLogin }" @click="toggleLogin(true)">
                                    登入</h3>
                                <h3 :class="{ title_active: !isLogin, title_inactive: isLogin }"
                                    @click="toggleLogin(false); getLocations();">註冊
                                </h3>
                            </div>
                            <div class="header_login_model" v-if="isLogin">
                                <form @submit.prevent="logIn">
                                    <label for="login" class="close"><i class="fa-solid fa-xmark" id="close-ntn"
                                            @click="toggleModal"></i></label>
                                    <input class="header_login_input" type="email" placeholder="請輸入E-mail" id="loginId"
                                        v-model="user.memId" name="memId" required>
                                    <div class="password">
                                        <input class="header_login_input" :type="passwordVisible ? 'text' : 'password'"
                                            placeholder="請輸入密碼" id="loginPsw" v-model="user.memPsw" name="memPsw" required>
                                        <span class="eye" @click="togglePasswordVisibility"><i class="fa"
                                                :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"></i></span>
                                    </div>
                                    <input type="submit" class="header_login_input member-btn" value="登入" id="submit-login"
                                        @click.prevent="logIn">
                                </form>
                                <div class="remember-area">
                                    <input class="keep-login" type="checkbox" id="keep-log-in"><label
                                        for="keep-log-in">保持登入狀態</label>
                                    <RouterLink to="">忘記密碼</RouterLink>
                                </div>
                                <div class="orther-way">
                                    <h4>或其他方式快速登入</h4>
                                    <div class="fast-img">
                                        <a href="#" @click.prevent="googleLogin"><img
                                                src="/src/assets/images/home/google.png" alt="google_login">
                                        </a>
                                        <a href="#"><img src="/src/assets/images/home/fb.png" alt="facebook_login">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="header_signup_model" v-if="!isLogin">
                                <form @submit.prevent="registerUser">
                                    <label for="signup" class="close"><i class="fa-solid fa-xmark" id="close-ntn"
                                            @click="toggleModal"></i></label>
                                    <input class="signup_modal_input" type="text" placeholder="請輸入您的姓名" name="signup_name"
                                        v-model="newUser.name" required>
                                    <input class="signup_modal_input" type="text" placeholder="請輸入您的手機號碼" name="signup_tel"
                                        v-model="newUser.tel" required>
                                    <input class="signup_modal_input" type="email" placeholder="請輸入您的電子信箱"
                                        name="signup_email" v-model="newUser.email" required>
                                    <div class="password">
                                        <input class="signup_modal_input" :type="passwordVisible ? 'text' : 'password'"
                                            placeholder="請輸入密碼(6-12碼英數字混合)" id="signupPsw" v-model="newUser.au4a83"
                                            name="signup_au4a83" required>
                                        <span class="eye" @click="togglePasswordVisibility"><i class="fa"
                                                :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"></i></span>
                                    </div>
                                    <div class="password">
                                        <input class="signup_modal_input_again"
                                            :type="passwordVisible ? 'text' : 'password'" placeholder="請再次輸入密碼"
                                            id="signupPswagain" v-model="newUser.au4a83again" name="signup_au4a83again"
                                            required>
                                        <span class="eye" @click="togglePasswordVisibility"><i class="fa"
                                                :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"></i></span>
                                    </div>
                                    <div class="signup_select_area">
                                        <select name="signup_county" v-model="newUser.county" @change="handleCountyChange">
                                            <option value="">選擇縣市</option>
                                            <option v-for="location in locations" :key="location.name"
                                                :value="location.name">
                                                {{ location.name }}
                                            </option>
                                        </select>
                                        <select name="signup_city" v-model="newUser.city">
                                            <option value="">選擇鄉鎮</option>
                                            <option v-for="city in citys" :key="city.name" :value="city.name">
                                                {{ city.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <input type="text" name="signup_address" class="signup_modal_input"
                                        v-model="newUser.addr" placeholder="請輸入完整地址">
                                    <div class="check-num">
                                        <input class="signup_modal_input" type="text" placeholder="請輸入右側驗證碼" required><span
                                            class="num">5566</span><a href="#"><i class="fa-solid fa-rotate-right"></i></a>
                                    </div>
                                    <button type="submit" class="member-btn" @click.prevent="registerUser">註冊</button>
                                </form>
                                <p style="text-align: center;">註冊即同意 隱私權政策 和 使用者條款</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="signup_down" v-if="isDown">
                <div class="signup_down_bg" @click="closeSignupDown">
                    <div class="signup_down_area">
                        <div class="signup_down_text">
                            <i class="fa-solid fa-circle-check"></i>
                            <h4>恭喜您註冊完成</h4>
                            <p>請重新登入</p>
                            <button type="button" class="btn-primary" @click="closeSignupDown">確認</button>
                        </div>
                    </div>
                </div>
            </div>
            <ShoppingCart ref="shoppingCartRef" />
        </div>
    </header>
</template>
<script>
import { RouterLink } from 'vue-router';
import ShoppingCart from "@/components/ShoppingCart.vue"
import axios from 'axios';
import { mapActions } from 'pinia'
import { userStore } from '../stores/user.js'
import { useCartStore } from '../stores/cart.js'
import { computed } from 'vue';
import { ref } from 'vue';
import firebaseConfig from '../firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default {
    data() {
        return {
            targetValue: 0,
            HeaderMenuStatus: false,
            subMenuStatus: {
                healthTools: false,
                healthArticles: false,
            },
            modalStatus: false,
            isLogin: true,
            isDown: false,
            isLoggedIn: false,
            user: {
                memId: '',
                memPsw: '',
            },
            isMemberList: false,
            passwordVisible: false,
            locations: [],
            citys: [],
            newUser: {
                name: '',
                tel: '',
                email: '',
                au4a83: '',
                au4a83again: '',
                county: '',
                city: '',
                addr: ''
            },
            cartItemCount: 0, // 初始化購物車數量為 0
            member: {},
            data: null,
            user: {},
        }
    },
    created() {
        const store = userStore();

        //監控pinia中的showLoginModal，如果有變動(true)就打開登入燈箱
        this.$watch(
            () => store.showLoginModal,
            (newValue) => {
                if (newValue === true) {
                    this.toggleModal();
                }
            });
        store.checkLogin()
            .then(user => {
                if (user) {
                    this.member = store.userData;
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                }
            })
            .catch(err => {
                this.isLoggedIn = false;
            });


        const cart = useCartStore();
        this.cartItemCount = computed(() => {
            return cart.count;
        });
    },
    methods: {
        toggleHeaderMenu() {
            this.HeaderMenuStatus = !this.HeaderMenuStatus
        },
        toggleSubMenu(subMenuName) {
            this.subMenuStatus[subMenuName] = !this.subMenuStatus[subMenuName]
        },
        toggleModal() {
            this.modalStatus = !this.modalStatus;
        },
        toggleLogin(isLogin) {
            this.isLogin = isLogin;
        },
        toggleShoppingDrawer() {
            this.$refs.shoppingCartRef.toggleShoppingDrawer()
        },
        toggleSignupDown() {
            this.isDown = !this.isDown;
            this.modalStatus = false;
            this.toggleLogin(true);
            this.newUser = {
                name: '',
                tel: '',
                email: '',
                au4a83: '',
                au4a83again: '',
                county: '',
                city: '',
                addr: ''
            };
        },
        closeSignupDown() {
            this.isDown = false;
        },
        logIn(e) {
            //阻止表單默認行為
            e.preventDefault();
            const store = userStore();
            axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/front/member/front_login.php`,
                data: this.user,
                withCredentials: true, // 確保跨域請求時能夠發送 cookies（如果您的身份驗證機制依賴於此）
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => {
                    const data = res.data;
                    if (data.status === 'success') {
                        alert('登入成功');
                        //清空輸入格的字
                        this.user.memId = '';
                        this.user.memPsw = '';
                        //關閉燈箱
                        this.modalStatus = false;
                        //換大頭貼
                        this.isLoggedIn = true;
                        store.updateToken(data.member.member_no); // 將會員no利用pinia放入localStorage
                        store.updateUserData(data.member);//將會員資料放入pinia中
                        this.member = store.userData;
                    } else if (data.status === 'fail') {
                        alert(data.message);
                        this.user.memId = '';
                        this.user.memPsw = '';
                    } else {
                        alert('帳號或密碼錯誤');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        toggleMemList() {
            this.isMemberList = !this.isMemberList;
        },
        logOut() {
            const store = userStore();
            store.clearToken(); //pinia 清空localStorage
            const CartStore = useCartStore(); //清空購物車
            CartStore.cartList.splice(0);
            this.member = {};
            this.isLoggedIn = false;
            this.$router.push('/'); //跳轉回首頁
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
        getLocations() {

            axios.get('https://tibamef2e.com/chd104/g3/front/taiwan_districts.json')
                .then(res => {
                    this.locations = res.data;
                    this.onCityChange();
                })
                .catch(err => console.log('讀取區域資料時發生錯誤:', err))


        },
        handleCountyChange(event) {
            const countyName = event.target.value;
            const location = this.locations.find(loc => loc.name === countyName);
            if (location) {
                this.citys = location.districts;
            } else {
                this.citys = [];
            }
        },
        registerUser(e) {
            if (!this.validateFormData()) {
                return;
            } else {
                e.preventDefault();
                axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_API_URL}/front/member/front_signup.php`,
                    data: this.newUser,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        if (res && res.data && res.data.msg === '註冊成功') {
                            this.toggleSignupDown();
                        } else {
                            alert(res.data.msg);
                            this.newUser = {
                                name: '',
                                tel: '',
                                email: '',
                                au4a83: '',
                                au4a83again: '',
                                county: '',
                                city: '',
                                addr: ''
                            };
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        validateFormData() {
            // 手機號碼正則表達式
            const telPattern = /^0\d{9}$/;
            // email正則表達式
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // 密碼正則表達式
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

            if (!this.newUser.name) {
                alert('姓名不能為空');
                return false;
            } else if (this.newUser.tel === '') {
                alert('電話號碼不能為空');
                return false;
            } else if (!this.newUser.tel || !telPattern.test(this.newUser.tel)) {
                alert('請輸入有效的電話號碼');
                return false;
            } else if (this.newUser.email === '') {
                alert('電⼦郵件不能為空');
                return false;
            } else if (!this.newUser.email || !emailPattern.test(this.newUser.email)) {
                alert('電⼦郵件格式不正確');
                return false;
            } else if (!this.newUser.au4a83 || !passwordPattern.test(this.newUser.au4a83) || this.newUser.au4a83 !== this.newUser.au4a83again) {
                alert(this.newUser.au4a83 !== this.newUser.au4a83again ? '請確認是否輸入相同密碼' : '密碼格式不正確，應為6-12位英數字混合');
                return false;
            } else if (this.newUser.county === '') {
                alert('縣市不能爲"選擇縣市"');
                return false;
            } else if (this.newUser.city === '') {
                alert('鄉鎮不能爲"選擇鄉鎮"');
                return false;
            } else if (!this.newUser.addr) {
                alert('地址不能為空');
                return false;
            } else {
                return true
            }
        },
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/member/${paths}`, import.meta.url).href;
        },
        googleLogin(event) {
            event.preventDefault();
            const store = userStore();
            const auth = getAuth();
            const googleProvider = new GoogleAuthProvider();
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    const userName = result.user.displayName;
                    const userEmail = result.user.email;
                    axios.post(`${import.meta.env.VITE_API_URL}/front/member/googleLogin.php`, {
                        member_email: userEmail,
                        member_name: userName
                    }, {
                        headers: { "Content-Type": "multipart/form-data" }
                    })
                        .then((res) => {
                            if (res.data.status === 'success') {
                                alert('登入成功');
                                const data = res.data;
                                this.modalStatus = false;
                                this.isLoggedIn = true;
                                store.updateToken(data.member.member_no); // 將會員no利用pinia放入localStorage
                                store.updateUserData(data.member);//將會員資料放入pinia中
                                this.member = store.userData;
                            } else if (res.data.status === 'fail') {
                                alert(res.data.message);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error("登入失敗:", error);
                });
        },
    },
    components: {
        RouterLink,
        ShoppingCart,
        mapActions,
        useCartStore,
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import "@/assets/scss/layout/_header.scss";
</style>../firebaseConfig.js/index.js