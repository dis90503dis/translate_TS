<template>
  <!----------- banner ------------>
     <div class="articleinfo">
      <div class="articleinfo_banner">
        <img src="../../src/assets/images/article/article-banner.png" alt="article-banner">
          <div class="banner_title">
            <h1>科普文章</h1>
          </div>
      </div>
    </div>

  <!----------- breadcrumb ------------>  
  <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>

  <!----------- articleinfo-container ------------>
  <div class="articleinfo-container container">
    <div class="info" :style="{ fontSize: infoFontSize + 'px' }">
      <div class="encoding">#001</div>
      <div class="title">飲食健康：探索均衡飲食的奧秘
        <div class="font-controls">
          <button @click="increaseFontSize">A+</button>
          <button @click="decreaseFontSize">A-</button>
        </div>
      </div>
      <div class="creation-time">2023.12.31</div>
    </div>
    <div class="article-main">
      <p :style="{ fontSize: infoFontSize + 'px' }">在現代快節奏的生活中，我們經常被琳瑯滿目的食物選擇所包圍。快餐、罐頭、即食食品成了生活中的一部分，但我們是否真正了解這些選擇對我們的健康有何影響呢？</p>
      <p :style="{ fontSize: infoFontSize + 'px' }">食物是我們身體的燃料。 就像汽車需要高品質燃料來運轉一樣，我們的身體也需要均衡、多樣的營養來保持運作順暢。這就是均衡飲食的概念——通過攝取來自各種食物的必需營養素，保持我們的身體在最佳狀態下運作。</p>
      <p :style="{ fontSize: infoFontSize + 'px' }">一頓均衡的飲食應包含足夠的蛋白質、碳水化合物、脂肪、纖維、維生素和礦物質。這意味著我們需要攝取豐富的蔬菜、水果、全穀食品、健康的蛋白質來源，以及一些健康的脂肪，如橄欖油和堅果。</p>
      <p :style="{ fontSize: infoFontSize + 'px' }">研究表明，飲食對我們的整體健康有著深遠的影響。 過多的加工食品和高糖分的飲食可能導致肥胖、糖尿病和心血管疾病。相反，均衡飲食與更低的患病風險和更好的心血管健康相關聯。</p>
      <p :style="{ fontSize: infoFontSize + 'px' }">此外，均衡飲食還對心理健康有積極影響。飲食中豐富的Omega-3脂肪酸和抗氧化劑與情緒健康的改善有關。這表明，我們的飲食選擇不僅影響身體，還影響心靈。</p>
      <p :style="{ fontSize: infoFontSize + 'px' }">然而，實現均衡飲食可能是一項挑戰。在生活中忙碌的時候，我們經常傾向於選擇便利食品而非健康選擇。為了實現均衡飲食，我們可以嘗試制定合理的飲食計劃，增加蔬菜和水果的攝取，減少加工食品的消耗。</p>
      <p :style="{ fontSize: infoFontSize + 'px' }">在結論時，均衡飲食不僅是對身體的呵護，更是對生活品質的投資。通過深入了解各種食物對我們的影響，我們可以更智慧地選擇食物，實現健康、快樂的生活。讓我們一起探索飲食的奧秘，迎接更健康的未來。</p>
  <img src="../assets/images/article/articleinfo-1.jpg" alt="飲食健康">
    </div>
  </div>
  <div class="tag-button">
    <button>#飲食</button>
  </div>
</template>
<!----------- end ------------>
<script>
  import { RouterLink, RouterView } from 'vue-router'
  import Breadcrumb from '@/components/Breadcrumb.vue';

  export default{
    data() {
      return {
        yourBreadcrumbData: [
          { text: '首頁', to: '/' },
          { text: '科普專欄', to: '/article'},
          { text: '文章', active: true },
        ],
        infoFontSize: 24, // 一般顯示大小
        minFontSize: 12,  // 文字最小
        maxFontSize: 36,  // 文字最大
      };  
    },

    methods: {
        increaseFontSize() {
            if (this.infoFontSize < this.maxFontSize) {
                this.infoFontSize += 2; // 文字變大
          console.log('增加文字大小', this.infoFontSize);
        }
      },
      decreaseFontSize() {
          if (this.infoFontSize > this.minFontSize) {
              this.infoFontSize -= 2; // 文字變小
          console.log('减小文字大小', this.infoFontSize);
        }
      },
    },
    components: {
        RouterLink,
        RouterView,
        Breadcrumb,
    },
  }
</script>

<style lang="scss">
  @import "@/assets/scss/page/_articleinfo.scss";
  </style>





