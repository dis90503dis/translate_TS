<template>
    <div class="game_q">
        <p class="game_q_num">{{ questionNum }}</p>
        <h2 class="game_q_topic">{{ questionText }}</h2>
        <ol class="game_q_options">
            <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
                {{ option.text }}
            </li>
        </ol>
    </div>
</template>
  
<script>
export default {
    name: 'GameQuestion',
    props: {
        questionNum: String,
        questionText: String,
        options: Array
    },
    methods: {
        selectOption(option) {
            this.$emit('option-selected', option);
        }
    }
};
</script>
  
<style lang="scss">
@import "@/assets/scss/page/_game.scss";
</style>