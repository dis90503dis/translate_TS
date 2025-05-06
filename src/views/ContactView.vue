<template>
    <div class="contact">
        <div class="contact_banner">
            <img src="../assets/images/contact/contact_banner.png" alt="banner" >
            <div class="contact_banner_textbackground">
                <h1>聯絡我們</h1>
            </div>
        </div>
        <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
        <div class="contact_inputs">
            <input class="contact_inputs_input" placeholder="請輸入姓名" type="text">
            <input class="contact_inputs_input" placeholder="請輸入電子信箱" type="email">
            <input class="contact_inputs_input" placeholder="請輸入聯絡方式" type="tel">
            <select class="contact_inputs_select" name="" id="">
                <option disabled selected hidden>請選擇問題</option>
                <option>付款問題</option>
                <option>運費問題</option>
                <option>匯款問題</option>
            </select>
            <textarea class="contact_inputs_textarea" placeholder="請輸入詳細內容" cols="30" rows="10"></textarea>
            <button class="btn-product">送出表單</button>
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
                { text: '聯絡我們', active: true }
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
    @import "@/assets/scss/page/_contact.scss";
</style>
