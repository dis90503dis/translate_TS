<template>
    <div class="home">
        <!-- 第一區塊 banner -->
        <div ref="myBanner" class="home_banner">
            <div ref="bannerContent" class="banner_content" :width="divWidth">
                <div class="banner_wall">
                    <div class="bag_banner_img" v-for="num in banners" :key="num">
                        <img class="home_bannerpic" :src="getImageUrl(`banner/${num.banner_image}`)" :width="divWidth"
                            alt="banner">
                    </div>
                </div>
            </div>
            <div class="home_banner_textbackground">
                <h1 v-html="home_banner_text[imgnum - 1]"></h1>
            </div>
            <div class="carousel_buttons">
                <div v-for="buttonNum in home_banner_text.length" @click="setActiveImage(buttonNum)"
                    :class="{ 'active': imgnum === buttonNum }" class="carousel_button">
                </div>
            </div>
        </div>
    </div>
    <!-- 第二區塊 feature -->
    <div ref="featureContainer" class="feature container">
        <div class="row">
            <div v-for="iconNum in feature.length" class="feature_card col-12 col-lg-3">
                <h2 class="feature_title">{{ feature[iconNum - 1].title }}</h2>
                <img class="title_pic" :src="getImageUrl(`feature_icon/icon0${iconNum}.svg`)" alt="icon">
                <p class="feature_illustrate">{{ feature[iconNum - 1].illustrate }}</p>
            </div>
        </div>
    </div>
    <!-- 第三區塊 featured_commodity -->
    <div class="home_products_bg">
        <div class="home_products_area container">
            <div class="home_item_list row">
                <div class="home_item_slider_area col-12 col-lg-8">
                    <i class="fa-solid fa-chevron-left" @click="prevImage"></i>
                    <div class="item_slider_imgs">
                        <img class="slider_img_left" :src="leftImage" :alt="leftItemName">
                        <img class="slider_img_middle" :src="middleImage" :alt="middleItemName">
                        <img class="slider_img_right" :src="rightImage" :alt="rightItemName">
                    </div>
                    <i class="fa-solid fa-chevron-right" @click="nextImage"></i>
                </div>
                <div class="home_item_text col-12 col-lg-4">
                    <div class="home_item_text_area">
                        <h2 class="item_title">{{ items[currentIndex].name }}</h2>
                        <p class="item_info">{{ items[currentIndex].description }}</p>
                    </div>
                    <router-link to="/products" class="item_more_btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                        更多商品
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <!-- 第四區塊 comment -->
    <div ref="homeComment" class="comment">
        <h3>留言評論</h3>
        <div ref="commentWall" class="comment_wall">
            <div class="comment_card" @mouseenter="handlHomeCommentMouseenter" @mouseleave="handlHomeCommentMouseleave"
                v-for="commentNum in comment.length" :key="commentNum">
                <div class="person">
                    <img :src="getImageUrl(`comment/avatar${commentNum}.png`)" alt="avatar">
                    <div class="comment_name">{{ comment[commentNum - 1].name }}</div>
                </div>
                <div class="comment_star">
                    <img v-for="n in comment[commentNum - 1].star" src="../assets/images/home/comment/Star.png" alt="">
                </div>
                <div class="comment_message">
                    <p>
                        {{ comment[commentNum - 1].message }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!----------- 專欄 ------------>
    <h2 class="home-title">健康專欄</h2>
    <div class="home-article-link">
        <div class="home-article-container container">
            <div class="home-article-img">
                <img src="/src/assets/images/home/ARTICLE_OVERVIEW.png" alt="健康專欄">
            </div>
            <div class="home-article-txt">
                <h3>{{ articles[0].title }}</h3>
                <p>{{ articles[0].description }}</p>
                <div class="btn_bar">
                    <router-link to="/article" class="btn-outline-white">觀看更多</router-link>
                </div>
            </div>
        </div>
    </div>

    <!----------- 食譜 ------------>
    <h2 class="home-title">熱門食譜</h2>
    <div class="home-recipe-link">
        <div v-for="(recipe, index) in recipes" :key="index" :class="{ 'home-recipe-link-reverse': index % 2 !== 0 }">
            <div class="home-recipe-container container">
                <div class="home-recipe-img">
                    <img :src="getImageUrl(`recipe-${index + 1}.png`)" :alt="`熱門食譜-${index + 1}`">
                </div>
                <div class="home-recipe-txt">
                    <h3>{{ recipe.title }}</h3>
                    <span>{{ recipe.ingredientsTitle }}</span>
                    <hr>
                    <ul>
                        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">{{ ingredient }}</li>
                    </ul>
                    <div class="btn_bar"><router-link to="/cookbook" class="btn-outline-white">探索更多</router-link></div>
                </div>
            </div>
        </div>
    </div>
    <!------- 食譜(手機版) ------->
    <div class="home-phone-recipe">
        <div class="first-recipe">
            <img src="../assets/images/home/recipe-1.png" alt="熱門食譜-1">
        </div>
        <div class="phone-recipe">
            <h3>素食彩虹沙拉</h3>
            <span>食材</span>
            <ul>
                <li>·生菜葉（任選擇的種類），洗淨切碎</li>
                <li>·紅椒、黃椒、橙椒，切絲</li>
                <li>·黃瓜，切薄片</li>
                <li>·紫甘藍，切碎</li>
                <li>·胡蘿蔔，切絲或用刨絲器刨成薄片</li>
                <li>·紅洋蔥, 切絲........ </li>
            </ul>
            <router-link to="/cookbook" class="btn-outline-white">探索更多</router-link>
        </div>
    </div>

    <div class="home-phone-recipe">
        <div class="phone-recipe-img">
            <img src="../assets/images/home/recipe-2.png" alt="熱門食譜-1">
        </div>
        <div class="phone-recipe">
            <h3>紫薯蕎麥鬆餅</h3>
            <span>食材</span>
            <ul>
                <li>·生菜葉（任選擇的種類），洗淨切碎</li>
                <li>·紅椒、黃椒、橙椒，切絲</li>
                <li>·黃瓜，切薄片</li>
                <li>·紫甘藍，切碎</li>
                <li>·胡蘿蔔，切絲或用刨絲器刨成薄片</li>
                <li>·紅洋蔥, 切絲........ </li>
            </ul>
            <router-link to="/cookbook" class="btn-outline-white">探索更多</router-link>
        </div>
    </div>

    <!----------- 小幫手 ------------>
    <h2 class="home-title">健康小幫手</h2>
    <div class="home-assistant-container">
        <div class="assistant-row row">
            <router-link v-bind:data-type="(assistant.type)" v-for="(assistant, index) in assistants" :key="index"
                :to="assistant.link">
                <div class="assistant-icon-card">
                    <img :src="getImageUrl(`assistant-icon/assistant${assistant.type}.png`)" :alt="`健康小幫手-${index + 1}`">
                    <h4>{{ assistant.title }}</h4>
                    <p>{{ assistant.description }}</p>
                </div>
            </router-link>
        </div>
    </div>
    <!------- 小幫手(手機版) ------->
    <div class="phone-assistant-container">
        <h3>{{ carouselItems[assistantsCurrentIndex].title }}</h3><br>
        <h3>{{ carouselItems[assistantsCurrentIndex].subtitle }}</h3>
        <div class="switch">
            <div class="prev" @click="prevSlide"><img src="../assets/images/home/prev.svg" alt=""></div>
            <div class="next" @click="nextSlide"><img src="../assets/images/home/next.svg" alt=""></div>
        </div>
        <router-link :to="carouselItems[assistantsCurrentIndex].link" class="assistant-item">
            <img :src="carouselItems[assistantsCurrentIndex].image" alt="">
            <h4>{{ carouselItems[assistantsCurrentIndex].label }}</h4>
            <div class="text">
                <span>{{ carouselItems[assistantsCurrentIndex].description }}</span>
            </div>
        </router-link>
        <div class="phone-assistant-btn"><router-link :to="carouselItems[assistantsCurrentIndex].buttonLink"
                class="btn-primary">{{ carouselItems[assistantsCurrentIndex].buttonText }}</router-link></div>
    </div>

    <!----------- 小遊戲 ------------>
    <h2 class="home-title">玩遊戲，享優惠！</h2>
    <div class="index-game container">
        <h3>準備好了嗎？接受我們的健康問答挑戰，贏得您的折價券！</h3>
        <div class="game-start row">
            <div class="game-start-img col-12 col-xl-6">
                <img src="../assets/images/game/game1.png" alt="健康知識大挑戰">
            </div>
            <div class="game-start-text col-12 col-xl-6">
                <h2 class="game-start-title">健康知識大挑戰</h2>
                <p>挑戰您的飲食知識，贏取專屬的折價券！只要您回答正確，即可獲得專屬折扣。讓您在享受美食的同時，豐富自己的營養知識。</p>
                <router-link to="/game" class="btn-l-icon-btn btn-r-icon-btn"><i class="fa-solid fa-gamepad"></i>遊戲連結<i
                        class="fa-solid fa-arrow-up-right-from-square"></i></router-link>
            </div>
        </div>
    </div>

    <!----------- 機器人 ------------>

    <!-- 健康小精靈ICON -->
    <div class="rotbot-icon" @click="toggleChat">
        <img src="../assets/images/home/robot.png" alt="Floating Icon">
    </div>

    <!-- 健康小精靈訊息框 -->
    <div v-show="isChatOpen" id="chat-container" :style="{ right: chatContainerRight, bottom: chatContainerBottom }">
        <div class="chat-header">
            <img src="../assets/images/home/robot-img.png" alt="機器人頭像" class="avatar">
            <span class="bot-name">健康小精靈</span>
            <button @click="closeChat" class="close-button"><img src="../assets/images/home/XX.png" alt=""></button>
        </div>
        <hr class="line-divider">

        <div ref="chatMessages" id="chat-messages">
            <div v-for="(message, index) in messages" :key="index" class="message"
                :class="{ 'user-message': message.type === 'user', 'bot-message': message.type === 'bot' }">
                <div class="message-content">
                    <span class="message-text" v-html="message.text"></span>
                </div>
                <span class="message-time">{{ message.time }}</span>
            </div>
        </div>

        <!-- 關鍵字按鈕 -->
        <div class="keyword-filter-buttons">
            <button @click="handleKeywordClick('如何付款?')">如何付款?</button>
            <button @click="handleKeywordClick('是否提供有機食材？')">是否提供有機食材？</button>
            <button @click="handleKeywordClick('食材是否提供來自當地農產的選擇?')">食材是提供來自當地農產的選擇？</button>
            <button @click="handleKeywordClick('如何查詢訂單的運送狀態？')">如何查詢訂單的運送狀態？</button>
        </div>

        <!-- 使用者訊息輸入 -->
        <div class="input-container">
            <input class="user-input" type="text" v-model="userInput" @keyup.enter="sendMessage" placeholder="提問問題..." />
            <button @click="sendMessage" class="send-button">
                <img src="../assets/images/home/Vector.svg" alt="Send">
            </button>
        </div>
    </div>



    <!----------- end ------------>
</template>

<script>
import { RouterLink } from 'vue-router'
import axios from "axios";
export default {
    data() {
        return {
            imgnum: 1, //照片index(配合文字也吃)
            home_banner_text: [],
            banners: [],
            activeButton: 1,
            feature: [
                {
                    title: '多樣化餐盒選擇',
                    illustrate: '提供多樣化的食材和食譜選擇，滿足不同口味和飲食需求，為您打造獨一無二的餐食體驗。'
                },
                {
                    title: '嚴選食材',
                    illustrate: '我們精心挑選來自優質農場和供應商的食材，確保每一道餐點都是新鮮、高品質且營養豐富的，為您提供美味的同時注重您的身體健康。'
                },
                {
                    title: '方便快捷',
                    illustrate: '注重方便性，提供簡單易行的食材和食譜，節省您在烹飪上的時間，讓美味營養更輕鬆進入您的生活。'
                },
                {
                    title: '健康資訊分享',
                    illustrate: '我們不僅提供食材，還分享有價值的健康資訊和烹飪技巧，幫助您更深入了解飲食與健康的關聯，讓烹飪成為一場愉悅的學習和享受的過程。'
                },
            ],
            comment: [
                {
                    name: '李先生',
                    message: '這個餐盒真的是營養師的極力推薦！食材新鮮，營養均衡，而且份量十足。每次吃完都感覺充滿活力，對於注重健康的我來說，是個理想的選擇。推薦給大家！',
                    star: 5,
                },
                {
                    name: '林先生',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '王小姐',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '郭小姐',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '陳小姐',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '梁小姐',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '琳小姐',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '周先生',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '康先生',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '董小姐',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
                {
                    name: '彭先生',
                    message: '作為一個注重健身的人，我對於飲食特別講究。這款健康餐盒完全滿足了我的需求，高蛋白、低脂肪，而且味道還好吃！是我每日訓練後的最佳補充。',
                    star: 5,
                },
            ],
            articles: [
                {
                    title: "營養均衡，從餐桌開始",
                    description: "在現代快節奏的生活中，人們越來越注重健康。而要實現真正的健康，一頓營養均衡的餐點是不可或缺的一環。飲食不僅關係到我們的體重管理，更關係到身體各個器官的正常運作和免疫系統的強壯。",
                    link: "/path-to-article-1",
                },
            ],
            recipes: [
                {
                    title: '素食彩虹沙拉',
                    ingredientsTitle: '食材',
                    ingredients: [
                        '·生菜葉（任選擇的種類），洗淨切碎',
                        '·紅椒、黃椒、橙椒，切絲',
                        '·黃瓜，切薄片',
                        '·紫甘藍，切碎',
                        '·胡蘿蔔，切絲或用刨絲器刨成薄片',
                        '·紅洋蔥，切絲',
                        '·紅蘿蔔，刨成絲',
                        '·玉米粒，瀝乾',
                        '·青豆，瀝乾',
                        '·義大利香草醬（或橄欖油和新鮮檸檬汁混合）',
                        '·鹽和黑胡椒調味',
                    ],
                    link: '/recipe1'
                },

                {
                    title: '紫薯蕎麥鬆餅',
                    ingredientsTitle: '食材',
                    ingredients: [
                        '·生菜葉（任選擇的種類），洗淨切碎',
                        '·紅椒、黃椒、橙椒，切絲',
                        '·黃瓜，切薄片',
                        '·紫甘藍，切碎',
                        '·胡蘿蔔，切絲或用刨絲器刨成薄片',
                        '·紅洋蔥，切絲',
                        '·紅蘿蔔，刨成絲',
                        '·玉米粒，瀝乾',
                        '·青豆，瀝乾',
                        '·義大利香草醬（或橄欖油和新鮮檸檬汁混合）',
                        '·鹽和黑胡椒調味',
                    ],
                    link: '/recipe2'
                }
            ],
            assistants: [
                {
                    title: 'BMI計算',
                    description: '衡量身體的肥胖程度',
                    link: '/bmi',
                    type: 1,
                },
                {
                    title: '基礎代謝率',
                    description: '了解你身體在靜息狀態下維持基本生命活動所需的能量消耗',
                    link: '/bmr',
                    type: 2,
                },
                {
                    title: '卡路里計算',
                    description: '了解你每天攝取的卡路里量有助於維持健康的飲食習慣',
                    link: '/cal',
                    type: 3,
                },
                {
                    title: 'GI飲食計算',
                    description: '低GI飲食有助於穩定血糖水平',
                    link: '/gi',
                    type: 4,
                },
            ],
            assistantsCurrentIndex: 0,
            carouselItems: [
                {
                    title: "深入了解您的身體狀態",
                    subtitle: "為健康生活打下堅實基礎",
                    link: "/bmi",
                    image: new URL('/src/assets/images/home/assistant-icon/assistant1.png', import.meta.url).href,
                    description: "了解你每天攝取的卡路里量有助於維持健康的飲食習慣。",
                    buttonLink: "/bmi",
                    buttonText: "前往計算",
                    label: "BMI計算",
                },
                {
                    title: "深入了解您的身體狀態",
                    subtitle: "為健康生活打下堅實基礎",
                    link: "/bmr",
                    image: new URL('/src/assets/images/home/assistant-icon/assistant2.png', import.meta.url).href,
                    description: "了解你身體在靜息狀態下維持基本生命活動所需的能量消耗",
                    buttonLink: "/bmr",
                    buttonText: "前往計算",
                    label: "基礎代謝率",
                },
                {
                    title: "深入了解您的身體狀態",
                    subtitle: "為健康生活打下堅實基礎",
                    link: "/cal",
                    image: new URL('/src/assets/images/home/assistant-icon/assistant3.png', import.meta.url).href,
                    description: "了解你每天攝取的卡路里量有助於維持健康的飲食習慣",
                    buttonLink: "/cal",
                    buttonText: "前往計算",
                    label: "卡路里計算",
                },
                {
                    title: "深入了解您的身體狀態",
                    subtitle: "為健康生活打下堅實基礎",
                    link: "/gi",
                    image: new URL('/src/assets/images/home/assistant-icon/assistant4.png', import.meta.url).href,
                    description: "低GI飲食有助於穩定血糖水平",
                    buttonLink: "/gi",
                    buttonText: "前往計算",
                    label: "GI飲食計算",
                },
            ],
            isChatOpen: false,
            chatContainerRight: 'calc(20px + 60px)', // 初始位置，60px 是 floating-icon 的寬度
            chatContainerBottom: '20px', // 初始位置
            userInput: '',
            messages: [],
            qaPairs: {
                '你好': '你好! 需要什麼幫助呢？',
                '你是誰': '我是健康小精靈，很高興為您服務。',
                '健康': '關於健康的問題，問我就對了。',
                '再見': '再見！如果有任何問題，歡迎隨時回來。',
                '購買': '如果有購買問題，可至健康小舖內逛逛或至聯絡我們提供任何意見~',
            },
            divWidth: 0,
            elements: [],
            divWidth: 0, //banner寬度
            elements: [], //banner的照片
            timer: null, //自動輪播的計時器變數
            isPaused: true, // 輪播開關
            position: 0, //輪播位移 初值
            items: [
                {
                    image: new URL('/src/assets/images/home/featured_commodity/commodity03.png', import.meta.url).href,
                    name: '地中海風味便當',
                    description: '品嚐地中海的魅力！這款地中海風味便當為您帶來了經典的鮮蔬烤魚，搭配酸甜多汁的檸檬，以及豐富的烤蔬菜。每一口都是對味蕾的極致呵護，讓您在繁忙的一天中也能享受到健康與美味的完美平衡。'
                },
                {
                    image: new URL('/src/assets/images/home/featured_commodity/commodity02.png', import.meta.url).href,
                    name: '烤雞肉沙拉餐盒',
                    description: '輕食的最佳選擇！我們的烤雞肉沙拉餐盒特選新鮮蔬菜與香嫩烤雞，佐以特製沙拉醬，每一口都清新爽口。為您的健康加分，為您的日常餐桌增添一份輕盈與活力。'
                },
                {
                    image: new URL('/src/assets/images/home/featured_commodity/commodity01.png', import.meta.url).href,
                    name: '綜合營養素食盒',
                    description: '綠色健康，素食者的完美選擇。我們精心準備的綜合營養素食盒，包含了各式顏色繽紛的蔬菜和全穀物，不僅滿足您的日常營養需求，更帶來滿滿的植物性能量。無論是午餐還是晚餐，它都是追求健康生活人士的優質選擇。'
                }
            ],
            currentIndex: 0,
        };
    },
    computed: {
        leftImage() {
            let index = this.currentIndex - 1 < 0 ? this.items.length - 1 : this.currentIndex - 1;
            return this.items[index].image;
        },
        middleImage() {
            return this.items[this.currentIndex].image;
        },
        rightImage() {
            let index = this.currentIndex + 1 >= this.items.length ? 0 : this.currentIndex + 1;
            return this.items[index].image;
        },
        leftItemName() {
            let index = this.currentIndex - 1 < 0 ? this.items.length - 1 : this.currentIndex - 1;
            return this.items[index].name;
        },
        middleItemName() {
            return this.items[this.currentIndex].name;
        },
        rightItemName() {
            let index = this.currentIndex + 1 >= this.items.length ? 0 : this.currentIndex + 1;
            return this.items[index].name;
        }
    },
    created() {
        this.fetchBanners();
    },
    methods: {
        fetchBanners() {          //匯入
            axios.get(`${import.meta.env.VITE_API_URL}/front/front_home_banner.php`)
                .then(response => {
                    this.banners = response.data;
                    this.home_banner_text = this.banners.map(item => item.banner_title);
                })
                .catch(error => {
                    console.error('Error fetching banners:', error);
                });
        },
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/home/${paths}`, import.meta.url).href;
        },
        updateDimensions() {  //抓取banner 並且同步寬度
            if (this.$refs.myBanner) {
                this.divWidth = this.$refs.myBanner.offsetWidth;
            }
        },

        startSlideshow() {
            this.timer = setInterval(() => {
                const nextImage = this.imgnum === this.home_banner_text.length ? 1 : this.imgnum + 1;
                //判斷 imgnum 的值 是不是 home_banner_text.length 的值  如果是回傳 1 給 nextImage 如果不是 nextImage + 1
                this.setActiveImage(nextImage); // 把 nextImage 當參數 回傳給 setActiveImage
            }, 5000); // 每5000毫秒更換一次圖片
        },
        setActiveImage(buttonNum) {
            clearInterval(this.timer);
            this.imgnum = buttonNum; // 將 imgnum 設置為 buttonNum 的值  設置要顯示的圖片。
            this.applyTransition(); //呼叫
            this.startSlideshow();
        },
        applyTransition() {
            const bannerContent = this.$refs.bannerContent;
            if (bannerContent) {
                const transitionValue = `translateX(-${(this.imgnum - 1) * 100}%)`;
                bannerContent.style.transform = transitionValue;
            }
        },
        startComment() {
            const commentWall = this.$refs.commentWall; // 獲取照片牆
            const animateMarquee = () => {
                if (this.isPaused) {
                    this.position -= 1;
                    commentWall.style.transform = `translateX(${this.position}px)`;
                    if (this.position * -1 - 2500 >= commentWall.offsetWidth) {
                        this.position = 0;
                    }
                }
                cancelAnimationFrame(animateMarquee);
                requestAnimationFrame(animateMarquee);
            };
            animateMarquee();
        },
        handlHomeCommentMouseenter() {
            this.isPaused = false; //mouseenter 把開關 關起來
        },
        handlHomeCommentMouseleave() {
            this.isPaused = true; //mouseenter 把開關 關起來
        },

        sendMessage() {
            const userMessage = this.userInput.trim();
            if (userMessage === '') return;

            const currentTime = new Date().toLocaleTimeString();

            this.messages.push({ type: 'user', text: userMessage, time: currentTime });
            this.userInput = '';

            const botReply = this.qaPairs[userMessage];

            if (botReply) {
                this.messages.push({ type: 'bot', text: botReply, time: currentTime });
            } else {
                // 如果沒有預定義的關鍵字，向後端API請求相關問答內容
                this.fetchFAQContent(userMessage);
            }

            // 滾動到底部
            this.$nextTick(() => {
                const chatMessages = this.$refs.chatMessages;
                console.log('chatMessages:', chatMessages);
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });
            });
        },

        closeChat() {
            this.isChatOpen = false;  // 用於關閉 chat-container
        },
        toggleChat() {
            this.isChatOpen = !this.isChatOpen;
            if (this.isChatOpen) {
                this.chatContainerRight = 'calc(100px + 60px)';
                this.chatContainerBottom = '20px';
            }
        },
        filterByKeyword(keyword) {
            const currentTime = new Date().toLocaleTimeString();
            this.messages.push({ type: 'user', text: keyword, time: currentTime });

            const matchingKeywords = [];

            // 模糊比對
            Object.keys(this.qaPairs).forEach(q => {
                if (q.includes(keyword) || keyword.includes(q)) {
                    matchingKeywords.push(q);
                }
            });

            if (matchingKeywords.length > 0) {
                // 獲取第一個匹配到的關鍵字對應的回答
                const answer = this.qaPairs[matchingKeywords[0]];
                this.addBotMessage(answer);
            } else {
                this.messages.push({ type: 'bot', text: '抱歉，我不了解您的問題。', time: currentTime });
            }
            // 滾動到底部
            const chatMessages = this.$refs.chatMessages;
            requestAnimationFrame(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
                console.log('Scrolling to bottom');
                console.log('chatMessages:', chatMessages);
            });
        },
        prevImage() {
            this.currentIndex = this.currentIndex - 1 < 0 ? this.items.length - 1 : this.currentIndex - 1;
        },
        nextImage() {
            this.currentIndex = this.currentIndex + 1 >= this.items.length ? 0 : this.currentIndex + 1;
        },
        prevSlide() {
            this.assistantsCurrentIndex = (this.assistantsCurrentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
        },
        nextSlide() {
            this.assistantsCurrentIndex = (this.assistantsCurrentIndex + 1) % this.carouselItems.length;
        },
        fetchFAQContent(key) {
            axios.get(`${import.meta.env.VITE_API_URL}/admin/faq/backend_faq.php`, {
                params: {
                    key: key
                }
            })
                .then(response => {
                    // API返回相關問答內容
                    const ans = response.data.ans;
                    if (ans) {
                        this.addBotMessage(ans);
                    } else {
                        this.addBotMessage("抱歉，找不到相關答案。");
                    }

                    // 滾動到底部
                    this.$nextTick(() => {
                        const chatMessages = this.$refs.chatMessages;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                })
                .catch(error => {
                    console.error('匯入問答內容時發生錯誤:', error);
                });
        },
        addBotMessage(message) {
            const currentTime = new Date().toLocaleTimeString();
            this.messages.push({ type: 'bot', text: message, time: currentTime });
        },
        handleKeywordClick(keyword) {
            // 發送用戶訊息
            const currentTime = new Date().toLocaleTimeString();
            this.messages.push({ type: 'user', text: keyword, time: currentTime });

            // 調用後端 API 取得答案
            this.fetchFAQContent(keyword);
        },
    },
    mounted() { // Vue 實例創建之後立即被調用
        this.$nextTick(() => {
            this.updateDimensions();
            window.addEventListener('resize', this.updateDimensions); //resize 重新抓取寬度
            this.elements = this.$refs.myBanner.querySelectorAll('img'); //抓取myBanner標籤裡的所有圖片 變成陣列
            this.startSlideshow(); //啟動自動輪播
            this.startComment();
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateDimensions)
    },
};
</script>
<style lang="scss">
@import "@/assets/scss/page/_index.scss";
</style>