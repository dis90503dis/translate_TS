

<template>
  <div class="cookbook">
    <div class="banner">
      <img src="@/assets/images/cookbook/banner.jpg" alt="熱門食譜">
      <h1>熱門食譜</h1>
    </div>
    <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
    <div class="tag">
      <button class="" :class="{ 'styled-button': isStyled[0] }" @click="changeStyle(0)" type="button">#素食</button>
      <button :class="{ 'styled-button': isStyled[1] }" @click="changeStyle(1)" type="button">#肉類</button>
      <button :class="{ 'styled-button': isStyled[2] }" @click="changeStyle(2)" type="button">#冷食</button>
    </div>
    <div class="container cookbook-list">
      <ul>
        <li v-for="recipe in displayedRecipes" :key="recipe.recipe_no">
        <article>
              <i @click="toggleBookmark(recipe, recipe.recipe_no)" :class="recipe.iconClass" class="bookmark"></i>
            <router-link :to="`/cookbookinfo/${recipe.recipe_no}`"><img :src="getRecipeImage(recipe)"
                :alt="recipe.recipe_name"></router-link>
            <div class="text">
              <router-link :to="`/cookbookinfo/${recipe.recipe_no}`">
                <h4>{{ recipe.recipe_name }}</h4>
              </router-link>
              <p>{{ recipe.recipe_text }}</p>
            </div>
            <div class="like">
              <i @click="toggleLike(recipe)" :class="recipe.iconLike"></i>
              <span>1</span>
              <button @click="copyUrl(recipe.recipe_no)"><i class="fa-solid fa-share"></i></button>
            </div><!---->
          </article>
        </li>
      </ul>
    </div>

    <div class="pagination">
      <span v-for="page in totalPages" :key="page" @click="changePage(page)" class="page-link">{{ page }}</span>
    </div>
  </div>
</template>

<script>

import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue';
import { mapActions } from 'pinia'
import { userStore } from '../stores/user.js'

export default {
  data() {
    return {
      collect: [],
      recipe: [],
      itemsPerPage: 9,
      currentPage: 1,
      // 麵包屑數據
      yourBreadcrumbData: [
        { text: '首頁', active: false, to: '/' },
        { text: '熱門食譜', active: true }
      ],
      isStyled: [false, false, false]


    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.recipe.length / this.itemsPerPage);
    },
    displayedRecipes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.recipe.slice(startIndex, endIndex);
    },
  },

  mounted() {
    const store = userStore();
    store.checkLogin();
    this.fetchData();
    this.fetchLocalStorage()
  },
  methods: {
    fetchLocalStorage(){
      const storedValue = localStorage.getItem('collect');
      this.collect = storedValue ? JSON.parse(storedValue) : [];
    },

    copyUrl(id) {
      // 創建一個新的文本區域元素
      const textArea = document.createElement("textarea");
      const cardUrl = `${import.meta.env.BASE_URL}cookbookinfo/${id}`
      // 將卡片對應的URL設置為文本區域的值
      textArea.value = cardUrl;

      // 將文本區域添加到DOM中
      document.body.appendChild(textArea);

      // 選擇文本區域中的內容
      textArea.select();

      // 嘗試複製選定的文本
      document.execCommand("copy");

      // 從DOM中刪除文本區域元素
      document.body.removeChild(textArea);

      // 提示用戶已經複製
      alert("已複製食譜網址：" + cardUrl);
    },
    fetchData() {
      fetch(`${import.meta.env.VITE_API_URL}/admin/cookbook/get_recipe.php`)
        .then((res) => res.json())
        .then((json) => {
        console.log("check",json);
          this.recipe = json.map(recipe => ({
            ...recipe,
            bookmarked: false,
            iconClass: 'fa-regular fa-bookmark',
            like: false,
            iconLike: 'fa-regular fa-thumbs-up',
            // 添加 recipe_img 属性
            recipe_img: recipe.recipe_img
          }));
          // this.recipe=json
          // console.log(this.recipe.iconLike);
          // console.log("see",this.displayedRecipes);
        })
        .catch((error) => {
          // console.error('Error fetching data:', error);
        });
    },
    getRecipeImage(recipe) {
      // 如果 recipe_img 是完整的 URL，则直接返回
      // if (recipe.recipe_img.startsWith('http')) {
        // return recipe.recipe_img;
      // } else {
        // 否则构建本地图像路径并返回
        return `${import.meta.env.VITE_IMAGES_BASE_URL}/cookbook/${recipe.recipe_img}`;
      // }
    },

    changePage(page) {
      this.currentPage = page;
    },
    toggleBookmark(recipe, recipeNo) {
      const store = userStore();
      store.checkLogin().then((user) => {
        if (!user) {
          alert('請先登入');
          store.toggleLoginModal(true);
          return;
        } else {
          if (!recipe.bookmarked) {
            this.collect.push(recipeNo);
            localStorage.setItem('collect', JSON.stringify(this.collect));
          } else {
            let index = this.collect.indexOf(recipeNo);
            this.collect.splice(index, 1);
            localStorage.removeItem('collect');
            localStorage.setItem('collect', JSON.stringify(this.collect));
          }
          recipe.bookmarked = !recipe.bookmarked;
          recipe.iconClass = recipe.bookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
        }

      }

      );
      // console.log(user);

    },
    toggleLike(recipe) {
      recipe.like = !recipe.like;
      recipe.iconLike = recipe.like ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up';
    },
    changeStyle(i) {
      this.isStyled = this.isStyled.map((_, index) => index === i);
    },
  },
  components: {
    RouterLink,
    RouterView,
    Breadcrumb,
    mapActions,
    userStore,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/page/_cookbook.scss";
</style>

