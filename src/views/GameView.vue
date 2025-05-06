<template>
  <div class="game container">
    <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
    <game-start v-if="gameStep === 0" @startGame="toNextStep" @get-questions="getQuestions" />
    <div class="q_bar col-12 col-xl-6" v-if="gameStep > 0">
      <div class="q_bar_circle" v-for="n in 5" :key="n">
        <img v-if="progressStep >= n" src="/src/assets/images/game/game2.png" alt="小遊戲圖片">
      </div>
      <div class="q_bar_line"></div>
    </div>

    <GameQuestion v-if="gameStep === 1" :questionNum="`第 ${currentQuestionIndex + 1} 題`"
      :questionText="currentQuestion.quiz_name" :options="[
        { text: currentQuestion.option_a, value: 'a' },
        { text: currentQuestion.option_b, value: 'b' },
        { text: currentQuestion.option_c, value: 'c' },
        { text: currentQuestion.option_d, value: 'd' }
      ]" @option-selected="handleOptionSelected" />


    <GameAnswer v-if="gameStep === 2" :image="getImagePath(currentQuestion.quiz_photo
    )" :altText="currentQuestion.quiz_ans" :title="answerTitle" :explanation="currentQuestion.quiz_ans_info"
      :isLastQuestion="currentQuestionIndex === selectedQuestions.length - 1" @next-question="nextQuestion" />

    <div class="game_coupon_modal" v-if="isModalVisible">
      <div class="coupon_modal_bg">
        <div class="coupon_modal">
          <div class="modal_text">
            <p v-if="correctAnswersCount > 2">恭喜您！</p>
            <p v-if="correctAnswersCount > 2">在5題挑戰中答對了 {{ correctAnswersCount }} 題</p>
            <p v-if="correctAnswersCount === 3">您贏得了 10 元的折價券！</p>
            <p v-else-if="correctAnswersCount === 4">您贏得了 20 元的折價券！</p>
            <p v-else-if="correctAnswersCount === 5">您贏得了 30 元的折價券！</p>
            <p v-if="correctAnswersCount <= 2">您已答對 {{ correctAnswersCount }} 題，仍有進步空間。</p>
            <p v-if="correctAnswersCount <= 2">雖未獲得折扣券，但別氣餒，期待您下次的精彩表現！</p>
            <button type="button" class="btn-primary" @click="winCoupon(correctAnswersCount)">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
import GameStart from '@/components/GameStart.vue';
import GameQuestion from '@/components/GameQuestion.vue';
import GameAnswer from '@/components/GameAnswer.vue';
import axios from 'axios';
import { userStore } from '../stores/user.js'


export default {
  data() {
    return {
      // 麵包屑數據
      yourBreadcrumbData: [
        { text: '首頁', to: '/' },
        { text: '健康知識大挑戰', active: true }
      ],
      allQuestions: [],
      gameStep: 0,
      progressStep: 1,
      currentQuestionIndex: 0,
      selectedQuestions: [],
      answerTitle: '',
      correctAnswersCount: 0,
      isModalVisible: false,
      member: {},
    };
  },
  components: {
    Breadcrumb,
    GameStart,
    GameQuestion,
    GameAnswer,
    userStore,
  },
  mounted() {
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
    this.getQuestions();
  },
  computed: {
    currentQuestion() {
      if (this.currentQuestionIndex < this.selectedQuestions.length) {
        return this.selectedQuestions[this.currentQuestionIndex];
      }
      return null; // 或返回一个默认的问题对象
    },
  },
  methods: {
    getQuestions() {
      axios.get(`${import.meta.env.VITE_API_URL}/front/game/getGameQ.php`)
        .then(res => {
          this.allQuestions = res.data;
          this.randomQuestions();
        })
        .catch(err => console.log(err))
    },
    toNextStep() {
      this.gameStep++;
    },
    randomQuestions() {
      const shuffled = [...this.allQuestions].sort(() => Math.random() - 0.5);
      this.selectedQuestions = shuffled.slice(0, 5);
    },
    handleOptionSelected(selectedOption) {
      const isCorrect = selectedOption.value === this.currentQuestion.quiz_ans;
      if (isCorrect) {
        // 如果選項是正确的，則增加答對題數
        this.correctAnswersCount++;
      }
      this.answerTitle = isCorrect ? '答對了' : '答錯了';
      this.gameStep = 2;
    },
    nextQuestion() {
      if (this.gameStep === 2) {
        // 只有在當前顯示的是答案時才更新進度
        this.progressStep++;
      }
      if (this.currentQuestionIndex < this.selectedQuestions.length - 1) {
        this.currentQuestionIndex++;
        this.gameStep = 1;
      } else {
        this.isModalVisible = true;
      }
    },
    toGameStart() {
      this.gameStep = 0;
      this.progressStep = 1;
      this.currentQuestionIndex = 0;
      this.correctAnswersCount = 0;
      this.isModalVisible = false;
      this.randomQuestions();
    },
    getImagePath(paths) {
      return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/game/${paths}`, import.meta.url).href;
    },
    winCoupon(ansNum) {
      const store = userStore();
      this.member = store.userData;
      console.log('u觸發');
      axios.post(`${import.meta.env.VITE_API_URL}/admin/game/winCoupon.php`, {
        ans_num: ansNum,
        member_no: this.member.member_no
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.msg === "每種折價券每位會員只能擁有一張") {
            alert("每種折價券每位會員只能擁有一張");
          }
          this.toGameStart();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
}

</script>

<style lang="scss">
@import "@/assets/scss/page/_game.scss";
</style>

