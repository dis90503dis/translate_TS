<template>
  <MainHeader />
  <!-- 頁面路由route渲染的地方 -->
  <RouterView :key="$route.params.id" />
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

export default defineComponent({
  components: {
    RouterLink,
    RouterView,
    MainHeader,
    MainFooter,
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
