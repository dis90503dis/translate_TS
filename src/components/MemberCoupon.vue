<template>
    <div class="col-12 col-lg-9">
        <div class="member_coupon">
            <h2>折價券</h2>
            <div class="coupon_list">
                <div class="coupon_card" v-for="coupon in sortedCoupons" :key="coupon.id">
                    <h2 class="coupon_card_price">${{ coupon.coupon_value }} 折價券</h2>
                    <p class="coupon_card_title">{{ coupon.coupon_content }}</p>
                    <p>每筆訂單限用一張折價券</p>
                    <p>有效期限至：{{ coupon.coupon_use_date }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { userStore } from '../stores/user.js';
export default {
    data() {
        return {
            coupons: [],
            member: {},
        }
    },
    mounted() {
        const store = userStore();
        this.member = store.userData;
        axios.get(`${import.meta.env.VITE_API_URL}/admin/coupon/getCouponRecord.php?member_no=${this.member.member_no}`)
            .then((res) => {
                this.coupons = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    },
    computed: {
        // 使用計算屬性對coupons數組進行排序
        sortedCoupons() {
            // 使用slice()複製一份數組，避免直接修改原數組
            // 使用sort()對數組進行排序
            // 這裡以升序排序為例，如果需要降序，將比較函數中的返回值反轉即可
            return this.coupons.slice().sort((a, b) => a.coupon_value - b.coupon_value);
        }
    }
};
</script>
