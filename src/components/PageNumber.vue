<template>
    <div class="PageNumber">
        <a @click.prevent='changePage(false)' :class="{ disabled: currentPage === 1 }" id="prevpage"><i class="fa-solid fa-chevron-left" style="color: #e73f14;"></i></a>
        <a @click.prevent='changePage(item)'  :class='{ active: currentPage === item }' v-for='item in list'
            :key='item'>{{ item }}</a>

        <a @click.prevent='changePage(true)' :class='{ disabled: currentPage === pages }' id="nextpage"><i class="fa-solid fa-chevron-right" style="color: #e73f14;"></i></a>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
    name: 'PageNumber',
    props: {
        total: {
            type: Number,
            default: 15
        },
        pagesize: {
            type: Number,
            default: 6
        }
    },
    setup(props, { emit, attrs }) {

        const pages = computed(() => Math.ceil(props.total / props.pagesize))
        // 當前頁碼
        const currentPage = ref(attrs.page || 1)
        // 動態計算頁碼
        const list = computed(() => {
            // 當父元件傳遞total的值改變時，計算屬性會重新計算
            // pages = Math.ceil(props.total / props.pagesize)
            const result = []
            if (pages.value <= 5) {
                for (let i = 1; i <= pages.value; i++) {
                    result.push(i)
                }
            } else {
                // 總頁碼大於5
                if (currentPage.value <= 2) {
                    // 左側臨界值
                    for (let i = 1; i <= 5; i++) {
                        result.push(i)
                    }
                } else if (currentPage.value >= pages.value - 1) {
                    // 右側
                    for (let i = pages.value - 4; i <= pages.value; i++) {
                        result.push(i)
                    }
                } else {
                    // 中間
                    for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
                        result.push(i)
                    }
                }
            }
            return result
        })
        // 控制上一頁和下一頁變化
        const changePage = (type) => {
            if (type === false) {
                // 上一頁
                // 頁面是第一頁時，禁止點擊操作
                if (currentPage.value == 1) return
                if (currentPage.value > 1) {
                    currentPage.value -= 1
                }
            } else if (type === true) {
                // 下一頁
                if (currentPage.value == pages.value) return
                if (currentPage.value < pages.value) {
                    currentPage.value += 1
                }
            } else {
                // 點選頁碼
                currentPage.value = type
            }
            emit('change-page', currentPage.value)
        }
        return { list, currentPage, pages, changePage }
    },

}
</script>

<style lang="scss">
@import "@/assets/scss/components/_pagenumber.scss";
</style>