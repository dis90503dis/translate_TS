<template>
  <div class="member container">
    <div class="member_area row">
      <MemberBar @select-view="updateView" />
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import MemberBar from "@/components/MemberBar.vue";
export default {
  data() {
    return {
      currentView: 'info',
    }
  },
  components: {
    RouterLink,
    MemberBar,
  },
  methods: {
    updateView(selectedView) {
      this.$router.push(`/member/${selectedView}`);
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/_member.scss";
</style>

