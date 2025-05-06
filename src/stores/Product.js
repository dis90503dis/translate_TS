import { defineStore } from "pinia";
import axios from "axios";
export const useProductStore = defineStore("ProductStore", {
    state: () => {
        return {
            products: [],
            productClass: [],
            favoItems: []
        }
    },
    getters: {
        getProductByNo: (state) => {
            return (product_no) => {
                //database:sql->int, serve-side:php->string(jaon response), clint-side:vue->string($route.params)
                //參數再不同地方轉傳容易有型別不一樣的問題，統一型別再比較或是用 == 比較
                //array.find會比對陣列中的元素，傳回第一個找到的值
                return state.products.find(product => `${product.product_no}` === `${product_no}`)
            }
        },
        getImageUrl: () => {
            return (paths) => {
                return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/product/${paths}`).href;
            }
        },
        getFavoriteProducts: (state, getters) => {
            return state.favoItems.map(productId => getters.getProductByNo(productId));
        }
    },
    actions: {
        async getProductData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/front/product/productDisplayDataGet.php`)
                if (response && response.data) {
                    this.products = response.data.products;
                }
            }
            catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        async getProductClassData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataGet.php`)
                if (response && response.data) {
                    this.productClass = response.data.prodclass;
                }
            }
            catch (error) {
                console.error("Error fetching productClasss:", error);
            }
        },
        addFavoriteItem(productId) {
            this.$patch(state => {
                state.favoItems.push(productId);
            });
            localStorage.setItem('favoriteProducts', JSON.stringify(this.favoItems));
        },
        removeFavoriteItem(productId) {
            const index = this.favoItems.indexOf(productId);
            if (index !== -1) {
                this.$patch(state => {
                    state.favoItems.splice(index, 1);
                });
                localStorage.setItem('favoriteProducts', JSON.stringify(this.favoItems));
            }
        },
        loadFavoriteItems() {
            const storedIds = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
            this.$patch(state => {
                state.favoItems = storedIds;
            });
        },
        
    }
})
