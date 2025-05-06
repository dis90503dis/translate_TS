<template>
    <div class="bmi">
        <div class="bmi_banner">
            <img src="../assets/images/bmi/bmi_banner.png.png" alt="">
            <div class="bmi_banner_textbackground">
                <h1>BMI計算</h1>
            </div>
        </div>
        <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
        <div ref="bmiCountainer" class="bmi_countainer">
            <h2>身體質量指數 (BMI) 計算器</h2>
            <p class="bmi_countainer_text">世界衛生組織建議以身體質量指數 (Body Mass Index, BMI) 來衡量肥胖程度，其計算公式是以體重 (公斤) 除以身高 (公尺) 的平方。</p>
            <div class="bmi_item">
                <div class="bmi_inputs">
                    <div class="bmi_input_height">
                        <p>身高(公分)</p>
                        <input class="bmi_input_height_input" placeholder="輸入身高" type="number" v-model="personHeight">
                    </div>
                    <div class="bmi_inputs_weight">
                        <p>體重(公斤)</p>
                        <input class="bmi_inputs_weight_input" placeholder="輸入體重" type="number" v-model="personWeight">
                    </div>
                </div>
                <div class="bmi_standard">
                    <p>BMI &lt; 18.5「體重過輕」</p>
                    <p>18.5 ≤ BMI &lt; 24「健康體重」</p>
                    <p>24 ≤ BMI &lt; 27「體重過重」</p>
                    <p>BMI ≥ 27「肥胖」</p>
                </div>
            </div>
            <button class="btn-product" @click="calculate">立即計算</button>
        </div>

        <div ref="healthyRecommend" class="healthy_recommend">
            <h2>身高 {{ personHeight }} 公分 體重 {{ personWeight }} 公斤<span ref="bmiTotal">您的BMI 為{{ bmi }} {{ bmiTitle }}</span>
            </h2>
            <p>{{ suggestionText }}</p>
            <h3>為你推薦專屬商品</h3>
            <p>以下食品的熱量不僅符合您的目前BMI的需求，GI值也非常健康！有效穩定血糖、幫助減脂！！！</p>
            <div class="recommend_wall">
                <div class="bmi_recommend_card" v-for="(item, index) in displatdata" :key="index">
                    <span class="bmi_tag">#NEW</span>
                    <div class="bmi_card_img">
                        <img :src="getImageUrl(item.product_img)" alt="item.name">
                    </div>
                    <p class="bmi_card_title">{{ item.product_name }}</p>
                    <p class="bmi_card_price">${{ item.product_price }}</p>
                    <router-link :to="{
                        name: 'productinfo',
                        params: { product_no: item.product_no }
                    }" class="btn-product">查看商品詳情</router-link>
                </div>
            </div>
            <button class="btn-product" @click="recalculate">重新計算</button>
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
            personHeight: null,
            personWeight: null,
            bmi: null,
            bmiTitle: "",
            suggestionText: "",
            suggestiondata: [
                {
                    bmiTitle: "體重過輕",
                    suggestionText: "增加營養攝取，多補充高蛋白、高纖食物，定期運動，諮詢醫生或營養師建議~",
                },
                {
                    bmiTitle: "健康體位",
                    suggestionText: "維持正確體重，均衡飲食，保持運動，定期檢查健康。",
                },
                {
                    bmiTitle: "體重過重",
                    suggestionText: "肥胖容易引起疾病，您得要多多注意自己的健康囉！",
                },
            ],
            displatdata: [
            ],
            divWidth: 0,
            yourBreadcrumbData: [
                { text: '首頁', to: '/' },
                { text: '健康小幫手', to: '' },
                { text: '身體質量指數 (BMI) 計算器', active: true }
            ],
            

        };
    },
    methods: {
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/product/${paths}`, import.meta.url).href;
        },
        calculate() {
            let type = 1;
            if (this.personHeight && this.personWeight) {
                this.$refs.bmiCountainer.style.display = "none";
                this.$refs.healthyRecommend.style.display = "flex";
                // 計算BMI的邏輯
                let heightMeter = (this.personHeight / 100) * (this.personHeight / 100);
                this.bmi = parseFloat((this.personWeight / heightMeter).toFixed(1)); // 保留一位小數
                if (this.bmi < 18.5) {
                    type = 2;
                    this.bmiTitle = this.suggestiondata[0].bmiTitle;
                    this.suggestionText = this.suggestiondata[0].suggestionText;
                } else if (18.5 <= this.bmi && this.bmi <= 24) {
                    type = 3;
                    this.bmiTitle = this.suggestiondata[1].bmiTitle;
                    this.suggestionText = this.suggestiondata[1].suggestionText;
                    this.$refs.bmiTotal.style.color = "black"
                } else {
                    type = 4;
                    this.bmiTitle = this.suggestiondata[2].bmiTitle;
                    this.suggestionText = this.suggestiondata[2].suggestionText;
                }

                axios.post(`${import.meta.env.VITE_API_URL}/front/product/BMI&BMRproduct.php`, {
                    type: type
                })
                .then(response => {
                    this.displatdata = response.data
                    console.log(this.displatdata)
                })
                .catch(error => {
                    console.error('Error adding prodclass:', error);
                });
            }
        },

        recalculate() {
            this.$refs.bmiCountainer.style.display = "flex";
            this.$refs.healthyRecommend.style.display = "none";
            this.personHeight = '';
            this.personWeight = '';
        }
    },
    beforeDestroy() {
    },
    mounted() { // Vue 實例創建之後立即被調用
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
@import "@/assets/scss/page/_bmi.scss";
</style>


