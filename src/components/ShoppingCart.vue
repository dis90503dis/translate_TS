<template>
    <div class="shoppingCart_drawer" v-show="drawerStatus" >
            <div class="shoppingCart_drawer_bg " @click="toggleShoppingDrawer">
                <div class="drawer" @click.stop>
                    <h3 class="drawer_title">商品清單</h3>
                    <div v-for="product in cartList"
                        :key="product.product_no"
                        class="drawer_product">
                        <div class="drawer_product_image ">
                            <img :src=getImageUrl(product.product_img)>
                        </div>
                        <p class="drawer_product_name">{{ product.product_name }}</p>
                        <div class="drawer_product_btn_count">
                            <button class="quantityButton" @click="newQuantityUpdate(product.product_no,'decrement')"><i class="fa-solid fa-minus" style="color: #e73f14;"></i></button>
                            <span class="quantityNum" >{{ product.product_quantity }}</span>
                            <button class="quantityButton" @click="newQuantityUpdate(product.product_no,'increment')"><i class="fa-solid fa-plus" style="color: #e73f14;"></i></button>
                        </div>
                    </div>
                    <span class="drawer_close" @click="toggleShoppingDrawer"><i class="fa-solid fa-xmark"
                        ></i></span>
                    <router-link to="/checkout" class="drawer_addCart btn-primary" @click="toggleShoppingDrawer">結帳</router-link >
                    <div class="drawer_wrapper">
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { useCartStore } from "@/stores/cart";
import { useProductStore } from '@/stores/Product';
import { ref,watch } from 'vue';

export default {
    name:'ShoppingCart',
    setup() {
        //使用ProductStore
        const ProductStore = useProductStore();
        //const getImageUrl = ProductStore.getImageUrl;
        //使用pinia中CartStore存放的資料
        const CartStore = useCartStore();
        //使用存在CartStore中的購物車array
        const cartList = CartStore.cartList;

        const drawerStatus = ref(false); 
        const toggleShoppingDrawer = ()=>{
            drawerStatus.value = !drawerStatus.value
        }
        watch(()=>drawerStatus.value,(newValue,oldValue)=>{
            const body = document.getElementsByTagName('body')[0];
            body.classList.toggle("overflow-hidden");
        });
        
        return {
            CartStore,
            cartList,
            ProductStore,
            getImageUrl:ProductStore.getImageUrl,
            newQuantityUpdate: (product_no, action) => CartStore.newQuantityUpdate(product_no, action),
            toggleShoppingDrawer,
            drawerStatus,
        }
    },
    components: {
        RouterLink,
        RouterView,
    },
}
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';
    @import "@/assets/scss/components/_shoppingCart.scss";
</style>