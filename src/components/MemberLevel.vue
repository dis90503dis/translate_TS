<template>
    <div class="col-12 col-lg-9">
        <div class="member_level">
            <h2>會員禮遇</h2>
            <div class="member_level_area">
                <h3 class="member_level_title">{{
                    member.member_level == 1 ? '一般會員' :
                    member.member_level == 2 ? '黃金會員' :
                        member.member_level == 3 ? '白金會員' :
                            '鑽石會員'
                }}</h3>
                <div class="level_exp_text">
                    <p>{{ member.member_total_amount }}</p>
                    <p>{{ levelSpand }}</p>
                </div>
                <div class="level_exp">
                    <div class="level_exp_bar"></div>
                </div>
                <p>再消費{{ money }}TWD，解鎖更高級的會員</p>
            </div>
            <div class="member_level_info">
                <ul>
                    <li class="level_card">
                        <h3>一般會員</h3>
                        <img src="/src/assets/images/member/member_level_1.png" alt="一般會員" />
                        <p class="level_card_need">註冊會員<br>無消費門檻
                        </p>
                        <div class="level_card_gifts">
                            <p>生日禮金$50(需先填寫完整會員資料)</p>
                        </div>
                    </li>
                    <li class="level_card">
                        <h3>黃金會員</h3>
                        <img src="/src/assets/images/member/member_level_2.png" alt="一般會員" />
                        <p class="level_card_need">累計消費滿
                            TWD3000</p>
                        <div class="level_card_gifts">
                            <p>生日禮金$100(需先填寫完整會員資料)</p>
                        </div>
                    </li>
                    <li class="level_card">
                        <h3>白金會員</h3>
                        <img src="/src/assets/images/member/member_level_3.png" alt="一般會員" />
                        <p class="level_card_need">累計消費滿
                            TWD8000</p>
                        <div class="level_card_gifts">
                            <p>生日禮金$150(需先填寫完整會員資料)</p>
                            <p>訂單享95折優惠</p>
                        </div>
                    </li>
                    <li class="level_card">
                        <h3>鑽石會員</h3>
                        <img src="/src/assets/images/member/member_level_4.png" alt="一般會員" />
                        <p class="level_card_need">累計消費滿TWD16000</p>
                        <div class="level_card_gifts">
                            <p>生日禮金$200(需先填寫完整會員資料)</p>
                            <p>訂單享88折優惠</p>
                        </div>
                    </li>
                </ul>
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
            member: {},
            levelData: [],
            levelSpand: '',
            money: '',
        }
    },
    mounted() {
        const store = userStore();
        this.member = store.userData;
        axios.get(`${import.meta.env.VITE_API_URL}/front/member/getLevel.php`)
            .then((res) => {
                this.levelData = res.data;
                this.getLevelSpand(this.member.member_level, this.member.member_total_amount);
            })
            .catch((err) => {
                console.log(err);
            })
    },
    methods: {
        getLevelSpand(level, money) {
            if (level == 1) {
                this.levelSpand = 3000;
                this.money = this.levelSpand - money;
            } else if (level == 2) {
                this.levelSpand = 8000;
                this.money = this.levelSpand - money;
            } else if (level == 3) {
                this.levelSpand = 16000;
                this.money = this.levelSpand - money;
            }
        }
    },
}
</script>