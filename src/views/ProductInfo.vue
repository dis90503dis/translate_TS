<template>
  <Breadcrumb :breadcrumb="yourBreadcrumbData" />
  <div class="productInfo container" v-if="productInfoDisplay">
    <div class="productInfo_product row ">
      <div class="productInfo_product_image col-12 col-md-6">
        <img :src=getImageUrl(productInfoDisplay.product_img) :alt="productInfoDisplay.product_img">
      </div>
      <div class="productInfo_product_txt col-12 col-md-6">
        <div class="productInfo_product_txtWrap">
          <div class="productInfo_product_txt_title">
            <h1>{{ productInfoDisplay.product_name }}</h1>
            <span>${{ productInfoDisplay.product_price }}</span>
          </div>
          <div class="productInfo_product_txt_describe">
            <p>商品編號#{{ productInfoDisplay.product_no }}</p>
            <p>{{ productInfoDisplay.product_info }}</p>
          </div>
          <div class="productInfo_product_collapse">
            <div class="productInfo_product_collapse_title" @click="toggleCollapse('location')">
              <h3>產地</h3>
              <i class="fa-solid fa-angle-down" style="color: #e73f14;"></i>
            </div>
            <div class="productInfo_product_collapse_txt" v-show="collapseStatus.location">
              <p>{{ productInfoDisplay.product_loc }}</p>
            </div>
            <div class="productInfo_product_collapse_title" @click="toggleCollapse('spec')">
              <h3>產品規格</h3>
              <i class="fa-solid fa-angle-down" style="color: #e73f14;"></i>
            </div>
            <div class="productInfo_product_collapse_txt" v-show="collapseStatus.spec">
              <p>{{ productInfoDisplay.product_standard }}</p>
            </div>
            <div class="productInfo_product_collapse_title" @click="toggleCollapse('nutrition')">
              <h3>營養標示</h3>
              <i class="fa-solid fa-angle-down" style="color: #e73f14;"></i>
            </div>
            <div class="productInfo_product_collapse_txt" v-show="collapseStatus.nutrition">
              <p>{{ productInfoDisplay.product_content }}</p>
            </div>
          </div>
        </div>
        <div class="productInfo_product_btn">
          <div class="productInfo_product_btn_count">
            <button @click="pageQuantityUpdate('decrement')"><i class="fa-solid fa-minus"
                style="color: #e73f14;"></i></button>
            <span>{{ pageQuantity }}</span>
            <button @click="pageQuantityUpdate('increment')"><i class="fa-solid fa-plus"
                style="color: #e73f14;"></i></button>
          </div>
          <button type="button" class="btn-primary" @click="addCart">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>此商品缺貨</p>
  </div>

  <div class="more_title">
    <hr>
    <h2>多點健康</h2>
  </div>
  <div class="more_health container">
    <div class="more_product ">
      <div v-for="item in getRandomSubset(ProductStore.products, 4)" :key="item.product_no"
        class="more_itemsCard col-12 col-lg-3">
        <p class="product_tag">#{{ item.product_tag_name }}</p>
        <div class="product_card_img">
          <img :src=getImageUrl(item.product_img) alt="item.product_name">
        </div>
        <p class="vegetable_title">{{ item.product_name }}</p>
        <p class="vegetable_price">{{ item.product_price }}</p>
        <router-link :to="{
          name: 'productinfo',
          params: { product_no: item.product_no }
        }" class="btn-product">查看商品詳情</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/Product';
import { userStore } from '@/stores/user';
import { useCartStore } from "@/stores/cart";
import { ref, onMounted, watch } from 'vue';

export default {
  props: ['product_no'],
  setup() {
    //使用ProductStore
    const ProductStore = useProductStore();
    const ProductNo = ref('');
    const productInfoDisplay = ref();
    //使用composition API中的route 
    const route = useRoute();

    async function fetchProductInfo() {
      await ProductStore.getProductData();
      ProductNo.value = route.params.product_no;
      //使用ProductStore中根據route綁定no所送出的data
      productInfoDisplay.value = ProductStore.getProductByNo(ProductNo.value);
    }
    //等畫面建立後再抓商品資料
    onMounted(async () => {
      await fetchProductInfo();
    });

    //頁面商品數量加減
    const pageQuantity = ref(1);
    const pageQuantityUpdate = (action) => {
      if (action === 'increment') {
        pageQuantity.value += 1;
      } else if (action === 'decrement' && pageQuantity.value > 1) {
        pageQuantity.value -= 1;
      }
    };
    //如果在內頁點其他商品連結，會監控透過params傳的product_no、pageQuantity要從1開始，即時更新頁面不用重新整理
    watch(() => route.params.product_no, async (newVal) => {
      await fetchProductInfo();
      pageQuantity.value = 1;
    }, { immediate: true });

    const collapseStatus = ref({
      location: false,
      spec: false,
      nutrition: false
    });
    const toggleCollapse = (collapseName) => {
      collapseStatus.value[collapseName] = !collapseStatus.value[collapseName]
    };

    //使用userStore
    const store = userStore();
    //使用CartStore
    const CartStore = useCartStore();
    //先確認是否有登入，才可以使用購物車
    async function addCart() {
      try {
        const user = await store.checkLogin();
        if (!user) {
          alert('請先登入');
          store.toggleLoginModal(true);
          return;
        } else {
          //使用CartStore中的addCart
          await CartStore.addCart({
            product_no: productInfoDisplay.value.product_no,
            product_name: productInfoDisplay.value.product_name,
            product_quantity: pageQuantity.value,
            product_img: productInfoDisplay.value.product_img,
            product_price: productInfoDisplay.value.product_price,
          });
          alert('商品已加入購物車');
        }
      } catch (err) {
        console.log('驗證過程中發生錯誤', err);
        alert('加入購物車時發生錯誤，請稍後再試');
      }
    }

    //會生成一個介於 -0.5 到 0.5 之間的隨機數,大於 0.5，則返回正數，a 和 b 位置交換
    const getRandomSubset = (array, size) => {
      const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
      return shuffledArray.slice(0, size);
    };



    const yourBreadcrumbData = ref([
      { text: '首頁', to: '/' },
      { text: '健康小舖', to: '/products' },
      { text: '商品資訊', active: true }
    ])

    return {
      ProductStore,
      ProductNo,
      productInfoDisplay,
      getImageUrl: ProductStore.getImageUrl,
      store,
      CartStore,
      addCart,
      pageQuantity,
      pageQuantityUpdate,
      getRandomSubset,
      collapseStatus,
      toggleCollapse,
      yourBreadcrumbData
    }
  },
  components: {
    Breadcrumb
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import "@/assets/scss/page/_productInfo.scss";
</style>