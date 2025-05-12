<template>
    <div class="col-12 col-lg-9">
        <div class="member_order">
            <h2>訂單查詢</h2>
            <!-- <div class="member_order_search">
                <p>訂單時間</p>
                <input class="order_time" type="date" name="startDate">
                <span> ~ </span>
                <input class="order_time" type="date" name="endDate">
                <button type="button" class="btn-primary">查詢</button>
            </div> -->
            <div class="member_order_table">
                <table class="membar_order_info">
                    <tr>
                        <th class="order_th">訂單日期</th>
                        <th class="order_th">訂單編號</th>
                        <th class="order_th">總金額</th>
                        <th class="order_th">付款方式</th>
                        <th class="order_th">出貨方式</th>
                        <th class="order_th">出貨狀態</th>
                        <th class="order_th"></th>
                    </tr>
                    <template v-for="order in orders" :key="order.ord_no">
                        <tr>
                            <td class="order_td">{{ order.ord_time }}</td>
                            <td class="order_td">{{ order.ord_no }}</td>
                            <td class="order_td">${{ order.ord_payment }}</td>
                            <td class="order_td">{{ CartStore.payment_status[order.payment_status] }}</td>
                            <td class="order_td">{{ CartStore.shippingList[order.shipping_status]["name"] }}</td>
                            <td class="order_td">{{ CartStore.order_status[order.ord_status] }}</td>
                            <td class="order_td">
                                <button type="button" class="btn-outline-primary orderDetail_btn"
                                    @click="fetchOrderDetails(order.ord_no)">商品明細</button>
                            </td>
                        </tr>
                        <tr v-for="detail in orderDetails" :key="detail.product_no" v-show="order.ord_no == selectOrderNo">
                            <td class="orderDetail_td" colspan="3">商品</td>
                            <td class="orderDetail_td">{{ detail.product_no }}</td>
                            <td class="orderDetail_td">{{ detail.product_name }}</td>
                            <td class="orderDetail_td">${{ detail.product_price }}</td>
                            <td class="orderDetail_td">{{ detail.product_quantity }}</td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { userStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';

export default {
    setup() {
        const CartStore = useCartStore();
        const store = userStore();
        const memberNo = parseInt(store.userData.member_no);
        const orders = ref([]);
        const orderDetails = ref([]);
        const fetchOrder = (memberNo) => {
            if (memberNo) {
                axios.get(`${import.meta.env.VITE_API_URL}/front/order/orderDataGetByNo.php`, { params: { member_no: memberNo } })
                    .then(response => {
                        orders.value = response.data.orderRows;
                    })
                    .catch(error => {
                        console.error("訂單資料錯誤:", error);
                    })
            } else {
                console.error("此會員尚無無訂單");
            }
        };
        const selectOrderNo = ref();
        //只要有click就會回傳ordNo進入此function
        const fetchOrderDetails = (ordNo) => {
            //如果重複click(代表selectOrderNo已經有資料且==ordNo)要關起來,並且清空資料
            if (selectOrderNo.value == ordNo) {
                selectOrderNo.value = '';
                orderDetails.value = [];
            } else {
                //第一次click判斷selectOrderNo==ordNo,符合v-show的條件
                selectOrderNo.value = ordNo;
                axios.get(`${import.meta.env.VITE_API_URL}/front/order/ordeDataDetailGetByNo.php`, { params: { ord_no: ordNo } })
                    .then(response => {
                        orderDetails.value = response.data.orderDetailsRows;
                    })
                    .catch(error => {
                        console.error("訂單明細資料錯誤:", error);
                    })
            }
        }
        onMounted(() => {
            fetchOrder(memberNo);
        });

        return {
            CartStore,
            store,
            orders,
            orderDetails,
            fetchOrder,
            fetchOrderDetails,
            selectOrderNo,
        }
    }
}
</script>