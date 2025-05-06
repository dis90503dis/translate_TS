<template>
  <nav aria-label="breadcrumb" class="container">
    <ol class="breadcrumb">
      <li v-for="(crumb, index) in breadcrumb" :key="index" class="breadcrumb-item">
        <span v-if="crumb.active" >{{ crumb.text }}</span>
        <router-link v-else :to="crumb.to">{{ crumb.text }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumb: {
      type: Array,
      required: true
    }
  }
}
</script>


