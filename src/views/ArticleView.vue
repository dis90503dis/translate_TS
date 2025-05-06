<template>
  <!----------- banner ------------>
      <div class="article">
        <div class="article_banner">
          <img src="../../src/assets/images/article/article-banner.png" alt="article-banner">
            <div class="banner_title">
              <h1>科普文章</h1>
            </div>
        </div>
      </div>
  
  <!----------- breadcrumb ------------>  
    <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
  
  <!----------- filter-buttons ------------>
    <div class="filter-buttons">
      <button
        @click="filterArticles('飲食')"
        :class="{ 'active': currentCategory === '飲食' }"
      >
        #飲食
      </button>
      <button
        @click="filterArticles('戶外')"
        :class="{ 'active': currentCategory === '戶外' }"
      >
        #戶外
      </button>
      <button
        @click="filterArticles('心理')"
        :class="{ 'active': currentCategory === '心理' }"
      >
        #心理
      </button>
      <button
        @click="showAllArticles"
        :class="{ 'active': currentCategory === '' }"
      >
        顯示全部
      </button>
    </div>
  <!----------- article-container ------------>
    <div class="article-container container">
    <router-link :to="'/articleinfo'" v-for="(article, index) in filteredArticles" :key="index" class="article-card">
      <img :src="getImageUrl(`article-img/article${index+1}.jpg`)" :alt="article.alt">
      <h3>{{ article.title }}</h3>
      <p>{{ article.description }}</p>
    </router-link>
  </div>

  <!-- <div class="home-container">
      <PageNumber @change-page='changePage' :pagesize="reqParams.pageSize" :total='productDisplay.length'
        :page="reqParams.page" />
    </div> -->

  </template>
  <!----------- end ------------>
    <script>
    import { RouterLink, RouterView } from 'vue-router'
    import Breadcrumb from '@/components/Breadcrumb.vue';
    // import PageNumber from '@/components/PageNumber.vue';
    // import { reactive } from 'vue'
    export default{
      data() {
        return {
          yourBreadcrumbData: [
            { text: '首頁', to: '/' },
            { text: '科普專欄', active: true },
          ],
          articles: [
            { 
              title: "飲食健康：探索均衡飲食的奧秘",
             
              alt: "飲食健康",
              description: "在現代快節奏的生活中，我們經常被琳瑯滿目的食物選擇所包圍。快餐、罐頭、即食食品成了生活中的一部分，但我們是否真正了解這些...",
            },
            {
              title: "睡眠的神奇力量：簡單方法改善您的睡眠品質",
              
              alt: "飲食健康",
              description: "每天都有一個神奇的時刻，可以為身體和心靈帶來恢復和重生的力量——那就是睡眠。睡眠不僅僅是一種休息，更是一種身心恢復的重要...",
            },
            {
              title: "運動與心理健康：拓展您的運動視野",
              
              alt: "心理",
              description: "運動不僅僅是一種鍛煉身體的方式，更是維持心理健康的關鍵。傳統上，我們將運動視為一種強化體能的手段，但其對情緒...",
            },
            {
              title: "抗壓之道：應對現代生活中的壓力",
              
              alt: "心理",
              description: "現代生活的節奏快速而緊湊，我們時常感受到種種壓力。無論是來自工作、家庭還是個人期望，壓力似乎無處不在，對其心理...",
            },
            {
              title: "數碼健康：保護您的眼睛和姿勢",
              
              alt: "飲食健康",
              description: "隨著數碼科技的普及，我們的生活變得更加依賴屏幕。無論是工作還是娛樂，我們都花費大量時間注視電腦、手機...",
            },
            {
              title: "心靈療癒：探索自然對心理健康的影響",
              
              alt: "飲食健康",
              description: "在都市塵囂中，我們有時候忘記了大自然的魔力。自然環境對心理健康有著深遠的影響，能夠帶來放鬆、平靜和療癒的效果...",
            },
            {
              title: "享受大自然中的美味：戶外飲食與身心健康的契合",
              
              alt: "戶外飲食",
              description: "戶外飲食不僅是一種用餐方式，更是與大自然深度連結的生活體驗。本文將探討戶外飲食對身心健康的積極影響...",
            },
            {
              title: "社交連結：人際關係對心理健康的重要性",
              
              alt: "心理",
              description: "人是社會性的動物，人際關係是我們生活中不可或缺的一部分。強而有力的社交連結對心理健康有著深遠的影響...",
            },
          ],
          currentCategory: '', // 追蹤當前分類
          filteredArticles: [],
          currentFilter: '', // 追蹤當前篩選條件
          isStyled: [false, false, false],
          currentPage: 1,
        };  
      },
      mounted() {
      // 初始狀態顯示所有文章
      this.filteredArticles = this.articles;
      },
  
      methods: {
        getImageUrl(paths) {
            return new URL(`../assets/images/article/${paths}`, import.meta.url).href;
        },
        filterArticles(category) {
          // 根據分類篩選文章
          this.currentFilter = category;
          this.filteredArticles = this.articles.filter(article => article.title.includes(category) || article.description.includes(category));
          this.currentCategory = category; // 更新當前分類
        },
        showAllArticles() {
          // 顯示所有文章
          this.currentFilter = '';
          this.filteredArticles = this.articles;
          this.currentCategory = ''; // 清除當前分類
        },
        changeStyle(i) {
          this.isStyled = this.isStyled.map((_, index) => index === i);
        },
      },
      
      // setup() {
      // // 篩選條件準備
      // const reqParams = reactive({
      //   // 目前頁碼
      //   page: 1,
      //   // 每頁的數量
      //   pageSize: 9
      // })
      // // 控制頁碼的變化
      // const changePage = (page) => {
      //   //console.log(page)
      //   reqParams.page = page
      //   scrollToTop(); // 新增：在換頁碼時滾動到最上面
      // }

    
      // // 滾動到最上面的方法
      // const scrollToTop = () => {
      //       window.scrollTo({
      //         top: 0,
      //         behavior: 'smooth'
      //       });
      //     };

          

      //     return { changePage, reqParams }
      // },
      components: {
          RouterLink,
          RouterView,
          Breadcrumb,
          // PageNumber
      },
    }
    </script>
  
    <style lang="scss">
    @import "@/assets/scss/page/_article.scss";
    </style>
  
  