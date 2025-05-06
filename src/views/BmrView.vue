<template>
    <div class="bmr">
        <div class="bmr_banner">
            <img src="../assets/images/bmi/bmi_banner.png.png" alt="">
            <div class="bmr_banner_textbackground">
                <h1>基礎代謝率計算</h1>
            </div>
        </div>
        <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
        <div ref="bmrCountainer" class="bmr_countainer">
            <h2>基礎代謝率 (BMR) 計算機</h2>
            <p class="bmr_countainer_text">BMR 指人體在休息狀態下，維持新陳代謝所需的熱量，例如：呼吸、器官運作、體溫維持等，即使整天躺著不動也會消耗的最低熱量。BMR
                會隨著年紀增加或體重減輕而降低，會隨著肌肉量增加而上升</p>
            <div class="bmr_item">
                <div class="bmr_inputs">
                    <div class="bmr_input_sex">
                        <p>性別：</p>
                        <input class="bmr_input_sex_sex" @click="bmrSex = '男'" type="radio" name="sex">男
                        <input class="bmr_input_sex_sex" @click="bmrSex = '女'" type="radio" name="sex">女
                    </div>
                    <div class="bmr_input_age">
                        <p>年齡：</p>
                        <input class="bmr_input_age_input" placeholder="輸入年齡" type="number" v-model="bmrAge">
                    </div>
                    <div class="bmr_input_height">
                        <p>身高(公分)</p>
                        <input class="bmr_input_height_input" placeholder="輸入身高" type="number" v-model="bmrHeight">
                    </div>
                    <div class="bmr_input_weight">
                        <p>體重(公斤)</p>
                        <input class="bmr_input_weight_input" placeholder="輸入體重" type="number" v-model="bmrWeight">
                    </div>
                    <div class="bmr_input_sports">
                        <p>身體活動狀態</p>
                        <select class="bmr_input_sports_select" ref="bmrSport" v-model="bmrSport">
                            <option disabled selected hidden>請選擇身體活動狀態</option>
                            <option value="1.2">活動趨於靜態</option>
                            <option value="1.375">活動程度較低</option>
                            <option value="1.55">活動程度正常</option>
                            <option value="1.72">活動程度較高</option>
                            <option value="1.9">活動程度激烈</option>
                        </select>
                    </div>
                </div>
                <div class="bmr_standard">
                    <h4>每日總熱量消耗 (BMR)</h4>
                    <p>BMR 是身體一整天下來，包括基礎代謝、活動量、吃東西所消耗的熱量。不同的生活型態需要的熱量也不一樣，當每天攝取的熱量和 BMR 相等，便達到「熱量平衡」。</p>
                </div>
            </div>
            <button class="btn-product" @click="bmrCalculate">立即計算</button>
        </div>

        <div ref="bmrHealthyRecommend" class="bmr_healthy_recommend">
            <h2>您一天的<span>基礎代謝率為 {{ bmr }} 大卡</span></h2>
            <h3>為你推薦專屬商品</h3>
            <p>以下食品的熱量不僅符合您的目前BMR的需求，GI值也非常健康！有效穩定血糖、幫助減脂！！！</p>
            <div class="recommend_wall">
                <div class="bmr_recommend_card" v-for="(item, index) in displatdata" :key="index">
                    <span class="bmr_tag">#NEW</span>
                    <div class="bmr_card_img">
                        <img :src="getImageUrl(item.product_img)" alt="item.name">
                    </div>
                    <p class="bmr_card_title">{{ item.product_name }}</p>
                    <p class="bmr_card_price">${{ item.product_price }}</p>
                    <router-link :to="{
                        name: 'productinfo',
                        params: { product_no: item.product_no }
                    }" class="btn-product">查看商品詳情</router-link>
                </div>
            </div>
            <button class="btn-product" @click="bmRrecalculate">重新計算</button>
        </div>
    </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue';
import VegetableCard from "@/components/VegetableCard.vue";
import axios from "axios";
export default {
    data() {
        return {
            bmrSex: "",
            bmrAge: null,
            bmrHeight: null,
            bmrWeight: null,
            bmrSport: null,
            bmr: null,
            displatdata: [],
            yourBreadcrumbData: [
                { text: '首頁', to: '/' },
                { text: '健康小幫手', to: '' },
                { text: '基礎代謝率 (BMR) 計算機', active: true }
            ],

        };
    },
    methods: {
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/product/${paths}`, import.meta.url).href;
        },
        bmrCalculate() {
            if (this.bmrSex === "男" && this.bmrAge && this.bmrHeight && this.bmrWeight && this.bmrSport !== "") {
                this.bmr = ((this.bmrWeight * 10) + (this.bmrHeight * 6.25) - (this.bmrAge * 5) + 5) * parseFloat(this.bmrSport);
                // 男性：（10 ×公斤體重）+（6.25 × 公分身高）-（5 ×年齡歲數）+ 5
                this.bmr = this.bmr.toFixed(1);
                this.$refs.bmrCountainer.style.display = "none";
                this.$refs.bmrHealthyRecommend.style.display = "flex";
                this.BmrType();
            } else if (this.bmrSex === "女" && this.bmrAge && this.bmrHeight && this.bmrWeight && this.bmrSport !== "") {
                this.bmr = (this.bmrWeight * 10) + (this.bmrHeight * 6.25) - (this.bmrAge * 5) - 161 * parseFloat(this.bmrSport);
                // 女性：（10 ×公斤體重）+（6.25 × 公分身高）-（5 ×年齡歲數）–161
                this.bmr = this.bmr.toFixed(1);
                this.$refs.bmrCountainer.style.display = "none";
                this.$refs.bmrHealthyRecommend.style.display = "flex";
                this.BmrType();
            } else {
                alert("請輸入正確資料")
            }
        },
        BmrType() {
            let type = 1;
            if (this.bmr < 1600) {
                type = 5;
            } else if (this.bmr >= 1600 && this.bmr < 2000) {
                type = 6;
            } else {
                type = 7;
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
        },
        bmRrecalculate() {
            this.$refs.bmrCountainer.style.display = "flex";
            this.$refs.bmrHealthyRecommend.style.display = "none";
            this.$refs.bmrSport.options[0].selected = true;
            this.bmrSex = "";
            this.bmrAge = null;
            this.bmrHeight = null;
            this.bmrWeight = null;
            this.bmrSport = null;
            this.bmr = null;
        }
    },
    mounted() { // Vue 實例創建之後立即被調用
        this.$nextTick(() => {
            this.$refs.bmrSport.options[0].selected = true;
        });
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
@import "@/assets/scss/page/_bmr.scss";
</style>


