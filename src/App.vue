<script>
import { RouterLink, RouterView } from 'vue-router';
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";

export default {
  components: {
    RouterLink,
    RouterView,
    MainHeader,
    MainFooter,
  }
}
</script>


<template>
  <MainHeader />
  <!-- 頁面路由route渲染的地方 -->
  <RouterView :key="$route.params.id"/>

  <MainFooter />
</template>

<!-- <style lang="scss">
@import "@/assets/scss/main.scss";
</style> -->
