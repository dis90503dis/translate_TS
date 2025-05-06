<template>
    <CheckOutStage :currentStep="'Order'" />
    <div class="container checkOut">
        <div class="row checkOut_checkOutWrap">
            <table class="col-12 col-md-8 checkOut_fixTop">
                <tr class="checkOut_list_title">
                    <th><input type="checkbox" v-model="CartStore.selectAll" @change="CartStore.toggleAll"></th>
                    <th>商品</th>
                    <th></th>
                    <th>數量</th>
                    <th>價格</th>
                    <th @click="CartStore.deleteSelected"><i class="fa-solid fa-xmark"></i></th>
                </tr>
            </table>
            <table class="col-12 col-md-8 checkOut_list">
                <tr v-for="product in cartList" :key="product.product_no" class="checkOut_list_content">
                    <td class="checkOut_list_content_check"><input type="checkbox" v-model="product.checked"></td>
                    <td class="checkOut_list_content_image"><img :src=getImageUrl(product.product_img)></td>
                    <td class="checkOut_list_content_name">{{ product.product_name }}</td>
                    <td class="checkOut_list_content_quantity">
                        <button class="quantityButton" @click="newQuantityUpdate(product.product_no, 'decrement')"><i
                                class="fa-solid fa-minus" style="color: #e73f14;"></i></button>
                        <span class="quantityNum">{{ product.product_quantity }}</span>
                        <button class="quantityButton" @click="newQuantityUpdate(product.product_no, 'increment')"><i
                                class="fa-solid fa-plus" style="color: #e73f14;"></i></button>
                    </td>
                    <td class="checkOut_list_content_price">${{ product.product_price }}</td>
                    <td @click="deleteCart(product.product_no)" class="checkOut_list_content_delete"><i
                            class="fa-solid fa-xmark"></i></td>
                </tr>
            </table>
            <div class="col-12 col-md-4 sideWrap">
                <div class="checkOut_coupon">
                    <p class="checkOut_coupon_title">使用折價券</p>
                    <select class="checkOut_coupon_select" v-model="CartStore.userInput">
                        <option value="" selected></option>
                        <option class="checkOut_coupon_option" v-for="coupon in CartStore.couponList" :key="coupon.coupon_no" :value="coupon.coupon_no">{{
                            coupon.coupon_content }}</option>
                    </select>
                </div>
                <div class="checkOut_price">
                    <div class="checkOut_price_priceWrap">
                        <table class="checkOut_price_priceTable">
                            <tr class="checkOut_price_priceTr">
                                <th class="checkOut_price_priceTh">商品金額</th>
                                <td class="checkOut_price_priceTd">{{ CartStore.subTotal }}</td>
                            </tr>
                            <tr v-if="CartStore.matchingCoupon" class="checkOut_price_priceTr">
                                <th class="checkOut_price_priceTh">{{ CartStore.matchingCoupon.coupon_content }}</th>
                                <td class="checkOut_price_priceTd">-{{ CartStore.matchingCoupon.coupon_value }}</td>
                            </tr>
                            <tr class="checkOut_price_priceTr">
                                <th class="checkOut_price_priceTh">訂單總金額</th>
                                <td class="checkOut_price_priceTd">{{ CartStore.total }}</td>
                            </tr>
                        </table>
                    </div>
                    <router-link to="/payment" class="btn-primary go_payment">結帳</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CheckOutStage from '@/components/CheckOutStage.vue';
import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/Product';
import { userStore } from '@/stores/user';

export default {
    setup() {
        const CartStore = useCartStore();
        const ProductStore = useProductStore();
        const store = userStore();
        //用會員編號抓取會員拿到的coupon
        const memberNo = parseInt(store.userData.member_no);
        onMounted(async () => {
            await CartStore.getCouponByNo(memberNo);
        })
        return {
            CartStore,
            cartList: CartStore.cartList,
            getImageUrl: ProductStore.getImageUrl,
            newQuantityUpdate: (product_no, action) => CartStore.newQuantityUpdate(product_no, action),
            deleteCart: (product_no) => CartStore.deleteCart(product_no),
            memberNo,
        };
    },
    components: {
        RouterLink,
        RouterView,
        CheckOutStage,
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/page/_checkOut.scss';
</style>
