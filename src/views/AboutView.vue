<template>
    <div class="about">
        <div class="about_banner">
            <img src="../assets/images/about/about_banner.png" alt="banner" >
            <div class="about_banner_textbackground">
                <h1>關於我們</h1>
            </div>
        </div>
        <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
        <div class="about_countainer">
            <div class="about_health_helper">
                <img src="../assets/images/about/about_health_helper.png" alt="">
                <div class="about_health_helper_text">
                    <p>歡迎來到「健康定胃」，您專屬的營養餐盒、有機食材天地！我們致力於提供最健康、最美味的養身餐點，以滿足您對美食和健康的雙重追求。</p>
                    <RouterLink class="btn-product" to="/Bmi">健康小幫手</RouterLink>
                </div>
            </div>
            <div class="about_health_column">
                <img src="../assets/images/about/about_health_column.png" alt="">
                <div class="about_health_column_text">
                    <p>我們的餐點種類豐富多樣，滿足各種飲食需求，包括高蛋白、低碳水化合物、素食等多種選擇，讓您隨時都能享受到符合個人需求的美味餐點。無論您是忙碌的上班族、健身愛好者、還是注重飲食健康的美食家，「健康定胃」都是您最佳的夥伴。我們的目標是透過美味的食物，幫助您建立健康的飲食習慣，讓您擁有更美好、充滿活力的生活。</p>
                    <RouterLink class="btn-product" to="/Article">健康專欄</RouterLink>
                </div>
            </div>
            <div class="about_lunch_box">
                <img class="lunch_box_pic01" src="../assets/images/about/about_lunch_box01.png" alt="">
                <img class="lunch_box_pic02" src="../assets/images/about/about_lunch_box02.png" alt="">
                <div class="about_lunch_box_text">
                    <h3>多樣化餐盒選擇</h3>
                    <p>提供個性化、多樣化的食材和食譜選擇，滿足不同口味和飲食需求，為自己打造獨一無二的餐食體驗。</p>
                </div>
            </div>
            <div class="about_ingredients">
                <h2>嚴選食材</h2>
                <div class="about_ingredients_imgwall">
                    <img src="../assets/images/about/about_Ingredients01.png" alt="about_ingredients">
                    <img src="../assets/images/about/about_Ingredients02.png" alt="about_ingredients">
                    <img src="../assets/images/about/about_Ingredients03.png" alt="about_ingredients">
                </div>
                <RouterLink class="btn-product" to="/FoodMap">食材地圖</RouterLink>
            </div>
        </div>
    </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue';
export default {
    data() {
        return {
            // 麵包屑數據
            yourBreadcrumbData: [
                { text: '首頁', to: '/' },
                { text: '關於我們', active: true }
            ]
        };
    },
    components: {
        RouterLink,
        RouterView,
        Breadcrumb,
    },
    methods: {},

    mounted() { // Vue 實例創建之後立即被調用
    },

    beforeDestroy() {
    },
}
</script>

<style lang="scss">
    @import "@/assets/scss/page/_about.scss";
</style>
