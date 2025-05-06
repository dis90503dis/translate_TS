<template>
    <div class="gi">
        <div class="gi_banner">
            <img src="../assets/images/cal/cal_banner.png" alt="" >
            <div class="gi_banner_textbackground">
                <h1>食物GI值查詢</h1>
            </div>
        </div>
        <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>

        <div ref="giCountainer" class="gi_countainer">
            <h2>食物GI值查詢</h2>
            <p>GI值(Glycemic Index) 即「升糖指數」，是指食物進入人體2小時內，血糖升高的相對速度。用來衡量醣類食物對血糖上升的幅度影響，有些食物雖然含糖量少，但引起血糖升高的速度反而慢。食物的GI數值越大，表示越容易讓血糖上升。低GI飲食有幾項特點，就是少精緻、多膳食纖維、少過度加熱、不糊化及食物中的脂肪與蛋白質增加。</p>
            <div class="gi_inputs">
                <div class="gi_food">
                    <p>食物(種類)</p>
                    <select class="gi_food_select" v-model="chooseFood" ref="chooseFood">
                        <option>請選擇食物種類</option>
                        <option value="10">全穀雜糧類</option>
                        <option value="10">豆魚蛋肉類</option>
                        <option value="10">乳品類</option>
                        <option value="10">蔬菜類</option>
                        <option value="10">水果類</option>
                        <option value="10">油脂與堅果類</option>
                    </select>
                </div>
                <div class="gi_g">
                    <p>份量(公克)</p>
                    <input class="gi_g_input" v-model="portionSize" type="number">
                </div>
            </div>
            <button class="btn-product"
            @click="giCalculate">立即計算</button>
            <div class="gi_word_card">
                <ul>
                    <li>GI值＜55為 「低升糖指數」，對血糖的影響很小。</li>
                    <li>56＜GI值＜69 為「中升糖指數」，對血糖的影響不大。</li>
                    <li>70＜GI值 為「高升糖指數」，對血糖的影響很大。</li>
                </ul>
                <div class="gi_danger">
                    <h4>阻礙低GI飲食的危險食材</h4>
                    <p>白米、糯米、鹹餅乾、含糖飲料、含糖量高的點心、脂肪含量高的肉類、澱粉含量高的豆類(紅豆、綠豆、碗豆等)、動物性脂肪(奶油、鮮奶油等) 、砂糖等。</p>
                </div>
                <div class="gi_optimal">
                    <h4>適合低GI飲食的最佳食材</h4>
                    <p>未經精製的全穀類(糙米、全麥等)、澱粉含量低的蔬菜、膳食纖維豐富水果、豆製品(豆腐、豆漿、納豆等)、低脂的蛋白質(魚肉、瘦肉、雞肉等) 、低糖的堅果類(花生、核桃、杏仁、醋、寡糖)等。</p>
                </div>
            </div>
        </div>
        <div ref="giHealthyRecommend" class="gi_healthy_recommend">
            <h2>您查詢的<span>食物GI值為 {{gi}} </span></h2>
            <h3>為你推薦專屬商品</h3>
            <p>以下食品的熱量不僅符合您的目前GI的需求，GI值也非常健康！有效穩定血糖、幫助減脂！！！</p>
            <div class="recommend_wall">
                <div class="gi_recommend_card" v-for="(item, index) in displatdata" :key="index">
                    <span class="gi_tag">#NEW</span>
                    <div class="gi_card_img">
                        <img :src="getImageUrl(item.product_img)" alt="item.name">
                    </div>
                    <p class="gi_card_title">{{ item.product_name }}</p>
                    <p class="gi_card_price">${{ item.product_price }}</p>
                    <router-link :to="{
                        name: 'productinfo',
                        params: { product_no: item.product_no }
                    }" class="btn-product">查看商品詳情</router-link>
                </div>
            </div>
            <button class="btn-product"
            @click="giRegiculate">重新計算</button>
        </div>
    </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue';
import VegetableCard from "@/components/VegetableCard.vue";
import axios from 'axios';
export default {
    data() {
        return {
            portionSize:null,
            chooseFood:'',
            gi:null,
            displatdata:[],
            yourBreadcrumbData: [
                { text: '首頁', to: '/' },
                { text: '健康小幫手' , to: ''},
                { text: '食物GI值查詢', active: true }
            ],
        };
    },
    methods: {
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/product/${paths}`, import.meta.url).href;
        },
        fetchproduct() {          //呼叫PHP
            axios.get(`${import.meta.env.VITE_API_URL}/front/product/CalGiProdut.php`)
            .then(response => {
                this.displatdata = response.data;
            })
            .catch(error => {
                console.error('Error adding prodclass:', error);
            }); 
        },
        giCalculate(){
            if( this.portionSize && this.chooseFood ){
                this.fetchproduct();
                this.gi = this.portionSize * parseFloat(this.chooseFood);
                this.$refs.giCountainer.style.display = "none";
                this.$refs.giHealthyRecommend.style.display = "flex";
            }else{
                alert("請輸入正確數值");
            }
        },
        giRegiculate(){
            this.$refs.giCountainer.style.display = "flex";
            this.$refs.giHealthyRecommend.style.display = "none";
            this.portionSize = null;
            this.chooseFood = '';
            this.gi = null;
        }
    },
    mounted() { // Vue 實例創建之後立即被調用
        
    },
    beforeDestroy() {
    },
    components: {
        RouterLink,
        RouterView,
        Breadcrumb,
        VegetableCard,
    },
}
</script>

<style lang="scss">
    @import "@/assets/scss/page/_gi.scss";
</style>


