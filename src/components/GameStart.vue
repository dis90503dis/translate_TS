<template>
    <div class="game_start_area">
        <div class="row game_start">
            <div class="game_start_img col-12 col-md-6">
                <img src="/src/assets/images/game/game1.png" alt="健康知識大挑戰">
            </div>
            <div class="game_start_text col-12 col-md-6">
                <h2 class="game_start_title">健康知識大挑戰</h2>
                <p>挑戰您的飲食知識，贏取專屬的折價券！只要您回答正確，即可獲得專屬折扣。讓您在享受美食的同時，豐富自己的營養知識。</p>
                <button type="button" class="btn-l-icon-btn btn-r-icon-btn" @click="startGame"><i
                        class="fa-solid fa-gamepad"></i>開始遊戲<i class="fa-solid fa-arrow-up-right-from-square"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import { userStore } from '../stores/user.js';
export default {
    name: 'GameStart',
    data() {
        return {

        }
    },
    methods: {
        startGame() {
            this.$emit('startGame');
            this.checkLoginAgain();
        },
        checkLoginAgain() {
            const store = userStore();
            store.checkLogin()
                .then(user => {
                    if (!user) {
                        alert('請先登入');
                        store.toggleLoginModal(true);
                    }
                })
                .catch(err => {
                    console.log('驗證過程中發生錯誤', err);
                })
        }
    },
    components: {
        userStore,
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/page/_game.scss";
</style>