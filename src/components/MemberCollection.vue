<template>
    <div class="col-12 col-lg-9">
        <div class="member_collection">
            <h2>我的收藏</h2>
            <div v-if="collect.length === 0">
                <p>您目前還沒有收藏任何食譜</p>
            </div>
            <ul v-if="collect.length > 0" class="member_cookbook_list row">
                <li v-for="item in cookbooks" :key="item.id" class="col-4">
                    <article>
                        <i @click="cancelCollect(item.recipe_no)" class="fa-solid fa-bookmark bookmark"></i>
                        <router-link :to="`/cookbookinfo/${item.recipe_no}`">
                            <img :src="getRecipeImage(item.recipe_img)" :alt="item.recipe_name">
                        </router-link>
                        <div class="text">
                            <router-link :to="`/cookbookinfo/${item.recipe_no}`">
                                <h4>{{ item.recipe_name }}</h4>
                            </router-link>
                            <p>{{ item.recipe_text }}</p>
                        </div>
                    </article>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            cookbooks: [],
            collect: [],
            fetchLocalStorageArray: [],
        }
    },
    mounted() { // Vue 實例創建之後立即被調用
        this.fetchcollect();
        this.VueCollectGetLocalStorage();
    },
    methods: {
        getRecipeImage(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/cookbook/${paths}`, import.meta.url).href;
        },
        cancelCollect(recipeNo) {
            let index = this.collect.indexOf(recipeNo);
            this.collect.splice(index, 1);
            localStorage.removeItem('collect');
            localStorage.setItem('collect', JSON.stringify(this.collect));
            this.fetchcollect();
        },
        fetchcollect() {  //撈 localStorage KEY: collect 的資料出來送給 PHP
            let localStorageCollect = localStorage.getItem('collect')
            if (localStorageCollect != "") {
                this.fetchLocalStorageArray = JSON.parse(localStorage.getItem('collect'));
                axios.post(`${import.meta.env.VITE_API_URL}/front/member/fetchRecipe.php`, this.fetchLocalStorageArray)
                    .then(response => {
                        this.cookbooks = response.data
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },
        VueCollectGetLocalStorage() {
            let localStorageCollect = localStorage.getItem('collect');
            if (localStorageCollect) {
                this.collect = JSON.parse(localStorageCollect);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/page/_member.scss";
</style>