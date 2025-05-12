<template>
    <div class="col-12 col-lg-9">
        <div class="member_favourite">
            <h2>我的最愛</h2>
            <div class="member_product_items">
                <div v-if="favoriteProducts.length === 0">
                    <p>您目前還沒有收藏任何商品</p>
                </div>
                <div v-else class="product_items">
                    <div v-for="(item, index) in favoriteProducts" :key="item.product_no"
                        class="col-12 col-md-3 vegetable_card">
                        <p class="product_tag">#{{ item.product_tag_name }}</p>
                        <div class="product_card_img">
                            <img :src=getImageUrl(item.product_img) :alt="item.product_name" class="product_image">
                            <button class="heart" @click="removeFavProd(item)" title="取消收藏">
                            <i class="fa-solid fa-x"></i>
                            </button>
                        </div>
                        <p class="vegetable_title">{{ item.product_name }}</p>
                        <p class="vegetable_price">${{ item.product_price }}</p>
                        <router-link :to="{
                            name: 'productinfo',
                            params: { product_no: item.product_no }
                        }" class="btn-product">查看商品詳情</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/Product.js';

export default {
    setup() {
        const productStore = useProductStore();

        // 使用 computed 屬性來獲取收藏的商品資訊
        const favoriteProducts = computed(() => {
            // 從 ProductStore 的 favoItems 中獲取收藏的商品編號
            const favoItems = productStore.favoItems;
            // 使用 getProductByNo 方法將商品編號轉換為商品資訊
            return favoItems.map(productId => productStore.getProductByNo(productId));
        });

        // 在組件掛載後加載商品數據
        onMounted(async () => {
            await productStore.getProductData();
            await productStore.getProductClassData();
            productStore.loadFavoriteItems();
            
        });

        // 定義移除收藏商品的函式
        const removeFavProd = (item) => {
            // 刪除商品編號
            productStore.removeFavoriteItem(item.product_no);
            // 重新加載收藏商品列表
            productStore.loadFavoriteItems();
        }

        

        return {
            favoriteProducts,
            getImageUrl: productStore.getImageUrl,
            removeFavProd
            
        };
    },
};
</script>

<style lang="scss">
@import "@/assets/scss/page/_member.scss";
</style>