import { defineStore } from "pinia"
import axios from "axios"

// ✅ 產品型別定義（依據你 API response 的結構）
interface Product {
  product_no: string | number
  product_name?: string
  [key: string]: any
}

interface ProductClass {
  class_id: string | number
  class_name?: string
  [key: string]: any
}

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as Product[],
    productClass: [] as ProductClass[],
    favoItems: [] as (string | number)[]
  }),

  getters: {
    getProductByNo: (state) => {
      return (product_no: string | number): Product | undefined => {
        return state.products.find(
          (product) => `${product.product_no}` === `${product_no}`
        )
      }
    },

    getImageUrl: () => {
      return (paths: string): string => {
        return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/product/${paths}`).href
      }
    },

    getFavoriteProducts: (state, getters) => {
      return state.favoItems
        .map((productId: string | number) => getters.getProductByNo(productId))
        .filter((p: Product | undefined): p is Product => !!p) // 排除 undefined
    }
  },

  actions: {
    async getProductData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/front/product/productDisplayDataGet.php`)
        if (response && response.data) {
          this.products = response.data.products
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    },

    async getProductClassData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataGet.php`)
        if (response && response.data) {
          this.productClass = response.data.prodclass
        }
      } catch (error) {
        console.error("Error fetching productClass:", error)
      }
    },

    addFavoriteItem(productId: string | number) {
      this.$patch((state) => {
        state.favoItems.push(productId)
      })
      localStorage.setItem("favoriteProducts", JSON.stringify(this.favoItems))
    },

    removeFavoriteItem(productId: string | number) {
      const index = this.favoItems.indexOf(productId)
      if (index !== -1) {
        this.$patch((state) => {
          state.favoItems.splice(index, 1)
        })
        localStorage.setItem("favoriteProducts", JSON.stringify(this.favoItems))
      }
    },

    loadFavoriteItems() {
      const storedIds = JSON.parse(localStorage.getItem("favoriteProducts") || "[]") as (string | number)[]
      this.$patch((state) => {
        state.favoItems = storedIds
      })
    }
  }
})
