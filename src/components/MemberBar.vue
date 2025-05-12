<template>
    <div class="member_bar col-lg-3">
        <div class="member_headshot">
            <div class="member_headshot_img">
                <img :src="getImageUrl(member.member_photo)" alt="大頭照"
                    style="border-radius: 50%;border: 1px solid #D9D9D9;">
                <div class="change_photos" title="檔案大小2MB" @click="triggerFileInput">
                    <i class="fa-solid fa-camera"></i>
                </div>
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
            </div>
            <div class="member_headshot_info">
                <h2 name="memberName">{{ member.member_name }}</h2>
                <p class="member_title">
                    {{
                        member.member_level == 1 ? '一般會員' :
                        member.member_level == 2 ? '黃金會員' :
                            member.member_level == 3 ? '白金會員' :
                                '鑽石會員'
                    }}
                </p>
            </div>
        </div>
        <nav class="member_bar_list">
            <ul>
                <li :class="{ 'active': isActive('/member/info') }"><router-link to="/member/info"><i
                            class=" fa-solid fa-gear"></i>帳號設定</router-link></li>
                <li :class="{ 'active': isActive('/member/coupon') }"><router-link to="/member/coupon"><i
                            class="fa-solid fa-money-check-dollar"></i>折價券</router-link></li>
                <li :class="{ 'active': isActive('/member/level') }"><router-link to="/member/level"><i
                            class="fa-solid fa-gift"></i>會員禮遇</router-link>
                </li>
                <li :class="{ 'active': isActive('/member/order') }"><router-link to="/member/order"><i
                            class="fa-regular fa-file-lines"></i>訂單查詢</router-link></li>
                <li :class="{ 'active': isActive('/member/favourite') }"><router-link to="/member/favourite">
                        <i class="fa-regular fa-heart"></i>我的最愛
                    </router-link></li>
                <li :class="{ 'active': isActive('/member/collection') }"><router-link to="/member/collection"><i
                            class="fa-regular fa-bookmark"></i>我的收藏</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import { userStore } from '../stores/user.js';
export default {
    data() {
        return {
            member: {},
        }
    },
    mounted() {
        const store = userStore();
        this.member = store.userData;
    },
    methods: {
        isActive(path) {
            return this.$route.path === path;
        },
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/member/${paths}`, import.meta.url).href;
        },
        triggerFileInput() {
            // 觸發檔案輸入框打開
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // 創建 FormData 實例
                let formData = new FormData();
                // 添加檔案到 formData
                formData.append('memberImg', file);
                formData.append('member_no', this.member.member_no);

                axios.post(`${import.meta.env.VITE_API_URL}/front/member/changeImg.php`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(res => {
                        alert(res.data.msg)
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
    },

}
</script>

<style lang="scss">
@import "@/assets/scss/page/_member.scss";
</style>