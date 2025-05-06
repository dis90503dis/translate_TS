<template>
    <CheckOutStage :currentStep="'Payment'"/>
    <div class="payment container">
        <div class="payment_paymentWrap row">
            <div class="col-12 col-md-6 payment_info">
                <table class="col-12 col-md-6 payment_info_infoTable">
                    <tr class="payment_info_infoTr">
                        <th>訂購人資訊</th>
                        <td>
                            <label for="asMemberInfo">同會員資料</label>
                            <input type="checkbox" id="asMemberInfo" @change="sameAsMem" v-model="checkSame">
                        </td>
                    </tr>
                    <tr class="payment_info_infoTr">
                        <th>姓名:</th>
                        <td>
                            <input
                            type="text"
                            placeholder="請輸入您的姓名"
                            v-model="CartStore.orderInfo['ord_name']"
                            class="payment_info_infoInput"
                            >
                        </td>
                    </tr>
                    <tr class="payment_info_infoTr">
                        <th>mail:</th>
                        <td>
                            <input
                            type="text"
                            placeholder="請輸入您的mail"
                            v-model="CartStore.orderInfo['take_mail']"
                            class="payment_info_infoInput"
                            >
                        </td>
                    </tr>
                    <tr class="payment_info_infoTr">
                        <th>手機:</th>
                        <td>
                            <input
                            type="text"
                            placeholder="請輸入您的手機號碼"
                            v-model="CartStore.orderInfo['take_tel']"
                            class="payment_info_infoInput"
                            >
                        </td>
                    </tr>
                    <tr class="payment_info_infoTr">
                        <th>地址:</th>
                        <td>
                            <input
                            type="text"
                            placeholder="請輸入您的地址"
                            v-model="CartStore.orderInfo['take_address']"
                            class="payment_info_infoInput"
                            >
                        </td>
                    </tr>
                    <tr class="payment_info_infoTr">
                        <th>運送方式:</th>
                        <div v-for="(status, index) in CartStore.shippingList" :key="index">
                                <input 
                                :id = "status.id"
                                name="shipping_status"
                                type="radio"
                                :value = status.id 
                                v-model.number="CartStore.orderInfo['shipping_status']">
                                <!-- radio傳回的value預設是on 要轉成自己設定的index，可以在v-model加上.number轉成預設的index -->
                                <label :for="status.id" >{{ status.name }}</label>
                        </div>
                    </tr>
                    <tr class="payment_info_infoTr">
                        <th >付款方式:</th>
                        <td>
                            <div v-for="(status, index) in CartStore.payment_status" :key="index">
                                <input 
                                :id="`payment_status${index}`"
                                name="payment_status"
                                :value = index
                                type="radio"
                                v-model="CartStore.orderInfo['payment_status']">
                                <label :for="`payment_status${index}`" >{{ status }}</label>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-12 col-md-6 payMent_detail">
                <CartDetail/>
            </div>
        </div>
        <div class="payment_page">
            <router-link to="/checkout" class="payment_page_pageUP"><i class="fa-solid fa-angle-left" style="color: #f73f14;"></i>訂單資料</router-link>
            <router-link to="/confirm" class="btn-primary payment_page_pageDown">訂單確認</router-link>
        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import CheckOutStage from '@/components/CheckOutStage.vue';
import CartDetail from '@/components/CartDetail.vue';
import { useCartStore } from '@/stores/cart';
import { userStore } from '@/stores/user';
import { ref,watch } from 'vue';

export default{
    setup(){
        const CartStore = useCartStore();
        const store = userStore();
        const checkSame = ref(store.checkedSame);
        const sameAsMem = ()=>{
            if(checkSame.value){
                CartStore.orderInfo["ord_name"] = store.userData["member_name"];
                CartStore.orderInfo["take_mail"] = store.userData["member_email"];
                CartStore.orderInfo["take_tel"] = store.userData["member_tel"];
                CartStore.orderInfo["take_address"] = store.userData["member_county"] + store.userData["member_city"] +store.userData["member_addr"];
            }else{
                CartStore.orderInfo['ord_name'] ='';
                CartStore.orderInfo['take_mail'] = '';
                CartStore.orderInfo['take_tel'] = '';
                CartStore.orderInfo['take_address'] = '';
            }
        };
        watch(checkSame, (newValue) => {
            store.isCheckedSame(newValue);
        });
        return{
            CartStore,
            store,
            checkSame,
            sameAsMem,
        }
    },
    components: {
        RouterLink,
        RouterView,
        CheckOutStage,
        CartDetail,
    }
}
</script>

<style lang="scss">
    @import '@/assets/scss/page/_payment.scss';
</style>