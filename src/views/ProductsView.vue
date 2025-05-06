<template>
  <div class="products">
    <div class="product_banner">
      <img src="../../src/assets/images/product/banner.png" alt="product_banner">
      <div class="banner_title">
        <h1>健康小舖</h1>
      </div>
    </div>
    <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
    <div class="product-list container">
      <ul class="product-list-ul">
        <li class="product-list-li">
          <div class="lunchbox" v-for="prodClass in productClass" :key="prodClass.product_class_no"
            @click="filter(prodClass.product_class_no)">{{ prodClass.product_class_name }}</div>
          <hr>
        </li>
      </ul>
      <div class="phoneList">
        <select @change="filterPhoneList">
          <option value="">所有商品</option>
          <option v-for="prodClass in productClass" :value="prodClass.product_class_no">{{ prodClass.product_class_name
            }}
          </option>
        </select>
      </div>
      <div class="row product_items">
        <div v-for="(item, index) in displayList" :key="item.product_no" class="col-12 col-md-3 vegetable_card">
          <p class="product_tag">#{{ item.product_tag_name }}</p>
          <div class="product_card_img">
            <img :src=getImageUrl(item.product_img) :alt="item.product_name" class="product_image">
            <button class="heart" @click="keepProd(item)" :title="item.heartFilled ? '取消收藏' : '收藏商品'">
              <i :class="{ 'fa-regular': !item.heartFilled, 'fa-solid': item.heartFilled, 'fa-heart': true }"
                style="color: #f50a0a;"></i>
            </button>
          </div>
          <p class="vegetable_title">{{ item.product_name }}</p>
          <p class="vegetable_price">${{ item.product_price }}</p>
          <router-link :to="{
      name: 'productinfo',
      params: { product_no: item.product_no }
    }" class="btn-product">查看商品詳情</router-link>
        </div>
        <div class="home-container">
          <PageNumber @change-page='changePage' :pagesize="reqParams.pageSize" :total='productDisplay.length'
            :page="reqParams.page" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue';
import PageNumber from '@/components/PageNumber.vue';
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useProductStore } from '@/stores/Product';
import { userStore } from '@/stores/user';


export default {
  components: {
    RouterLink,
    RouterView,
    Breadcrumb,
    PageNumber,
  },
  setup() {
    // 麵包屑數據
    const yourBreadcrumbData = ref([
      { text: '首頁', to: '/' },
      { text: '健康小舖', active: true },
    ]);
    const store = userStore();
    //使用ProductStore
    const ProductStore = useProductStore();
    const originData = ref([]);
    const productDisplay = ref([]);
    // const productPage = ref([]);

    const productClass = ref([]);
    //要在vue模板編譯後引入，如果直接放在setup中會比pinia快
    onMounted(async () => {
      await ProductStore.getProductData();
      await ProductStore.getProductClassData();
      originData.value = ProductStore.products;
      productDisplay.value = ProductStore.products;

      // productPage.value = ProductStore.products;

      productClass.value = ProductStore.productClass;
      productDisplay.value.forEach(item => {
        if (favoriteProducts.value.includes(item.product_no)) {
          item.heartFilled = true;
        }
      });
    });

    const filter = (classNo) => {
      if (classNo !== 0) {
        reqParams.page = 1;
        productDisplay.value = originData.value.filter(item => `${item.product_class_no}` === `${classNo}`);
      } else {
        productDisplay.value = originData.value;
      }
    };

    const filterPhoneList = (e) => {
      reqParams.page = 1;
      if (e.target.value === '') {
        productDisplay.value = originData.value;
      } else {
        filter(e.target.value);
      }

      changePage(1);
    };

    //頁數判斷，從1開始，每頁只有6樣商品
    const reqParams = reactive({
      page: 1,
      pageSize: 6
    })
    const displayList = computed(() => {
      const startIndex = (reqParams.page - 1) * reqParams.pageSize;
      const endIndex = reqParams.page * reqParams.pageSize;
      return productDisplay.value.slice(startIndex, endIndex);
    });
    // 控制頁碼的變化
    const changePage = (page) => {
      reqParams.page = page;
      scrollToTop(); // 新增：在換頁碼時滾動到最上面
      // filter(classNo);
    }
    // 滾動到最上面的方法
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };



    // 從本地存儲中加載收藏的商品編號陣列，如果沒有則使用空陣列
    const favoriteProducts = ref(JSON.parse(localStorage.getItem('favoriteProducts')) || []);

    // 當用戶點擊收藏按鈕時調用的函數
    const keepProd = async (item) => {
      const user = await store.checkLogin();
      if (!user) {
        alert('請先登入');
        store.toggleLoginModal(true);
        return;
      } else {
        item.heartFilled = !item.heartFilled;

        // 創建一個新的陣列來保存更新後的收藏的商品編號
        const updatedFavoriteProducts = [...favoriteProducts.value];

        // 檢查商品編號是否已存在於收藏的商品編號陣列中
        const isAlreadyFavorited = updatedFavoriteProducts.includes(item.product_no);

        // 如果商品已收藏且未存在於收藏的商品編號陣列中，則將其編號添加到陣列中
        if (item.heartFilled && !isAlreadyFavorited) {
          updatedFavoriteProducts.push(item.product_no);
          item.heartFilled
        } else if (!item.heartFilled && isAlreadyFavorited) {
          // 如果取消收藏且存在於陣列中，則從陣列中刪除該商品編號
          const index = updatedFavoriteProducts.indexOf(item.product_no);
          if (index !== -1) {
            updatedFavoriteProducts.splice(index, 1);
            !item.heartFilled
          }
        }

        localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavoriteProducts));

        favoriteProducts.value = updatedFavoriteProducts;
      }
    };

    // localStorage.clear();




    return {
      originData,
      productDisplay,
      productClass,
      getImageUrl: ProductStore.getImageUrl,
      displayList,
      filter,
      changePage,
      reqParams,
      yourBreadcrumbData,
      keepProd,
      favoriteProducts,
      filterPhoneList,
    };
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/product.scss";
</style>