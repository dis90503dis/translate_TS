import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from "axios";

interface CartItem {
    product_no: string;
    product_name: string;
    product_price: number;
    product_quantity: number;
    checked: boolean;
}

interface ShippingOption {
    id: string;
    name: string;
    price: string;
}

interface Coupon {
    coupon_no: string;
    coupon_value: number;
}

interface OrderInfo {
    ord_name: string;
    take_mail: string;
    take_tel: string;
    take_address: string;
    delivery_fee: string;
    ord_amount: string;
    sales_amount: string;
    ord_payment: string;
    shipping_status: string;
    payment_status: string;
    ord_status: number;
}

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        cartList: JSON.parse(localStorage.getItem("items")!) || [] as CartItem[],
        selectAll: false,
        couponList: [] as Coupon[],
        userInput: '',
        shippingList: [
            {
                id: "0",
                name: "宅配到府 ( 運費$80TWD )",
                price: "80",
            },
            {
                id: "1",
                name: "7-11取貨 ( 運費$60TWD )",
                price: "60",
            }
        ] as ShippingOption[],
        payment_status: {
            '0': '銀行轉帳',
            '1': '線上刷卡',
        },
        order_status: {
            '0': '未配送',
            '1': '已配送',
        },
        orderInfo: reactive<OrderInfo>({
            ord_name: '',
            take_mail: '',
            take_tel: '',
            take_address: '',
            delivery_fee: '',
            ord_amount: '',
            sales_amount: '0',
            ord_payment: '',
            shipping_status: '',
            payment_status: '',
            ord_status: 0,
        }),
    }),
    getters: {
        matchingCoupon(state): Coupon | undefined {
            return state.couponList.find(coupon => `${coupon.coupon_no}` === `${state.userInput}`);
        },
        shipping(state): ShippingOption {
            const shippingPrice = state.shippingList.find(s => `${s.id}` === `${state.orderInfo['shipping_status']}`);
            return shippingPrice || { id: "", name: "", price: "0" };
        },
        subTotal(state): number {
            return state.cartList.reduce((acc, product) => {
                return acc + (product.product_price * product.product_quantity);
            }, 0);
        },
        total(_, getters): number {
            let discount = 0;
            let shipping = 0;
            if (getters.matchingCoupon) {
                discount = parseInt(getters.matchingCoupon.coupon_value.toString() || "0");
            }
            shipping = parseInt(getters.shipping.price || "0");
            return getters.subTotal - discount + shipping;
        },
        count(state): number {
            return state.cartList.length;
        }
    },
    actions: {
        addCart(product: CartItem): void {
            const index = this.cartList.findIndex(p => p.product_no === product.product_no);
            if (index !== -1) {
                const cartItem = this.cartList.find(item => item.product_no === product.product_no);
                if (cartItem) {
                    cartItem.product_quantity += product.product_quantity;
                }
            } else {
                this.cartList.push(product);
            }
            this.saveLocalStorage();
        },
        newQuantityUpdate(product_no: string, action: 'increment' | 'decrement'): void {
            const cartItem = this.cartList.find(item => item.product_no === product_no);
            if (!cartItem) return;
            if (action === 'increment') {
                cartItem.product_quantity += 1;
            } else if (action === 'decrement' && cartItem.product_quantity > 1) {
                cartItem.product_quantity -= 1;
            }
            this.saveLocalStorage();
        },
        saveLocalStorage(): void {
            localStorage.setItem("items", JSON.stringify(this.cartList));
        },
        deleteCart(product_no: string): void {
            const index = this.cartList.findIndex(item => item.product_no === product_no);
            this.cartList.splice(index, 1);
            this.saveLocalStorage();
        },
        toggleAll(): void {
            this.cartList.forEach(product => {
                product.checked = this.selectAll;
            });
        },
        deleteSelected(): void {
            for (let i = this.cartList.length - 1; i >= 0; i--) {
                if (this.cartList[i].checked) {
                    this.cartList.splice(i, 1);
                }
            }
            this.saveLocalStorage();
        },
        updateOrderInfo(): void {
            this.orderInfo.delivery_fee = this.shipping.price;
            this.orderInfo.ord_amount = this.subTotal.toString();
            this.orderInfo.sales_amount = this.matchingCoupon ? this.matchingCoupon.coupon_value.toString() : '';
            this.orderInfo.ord_payment = this.total.toString();
        },
        cleanOrderInfo(): void {
            this.orderInfo = {
                ord_name: '',
                take_mail: '',
                take_tel: '',
                take_address: '',
                delivery_fee: '',
                ord_amount: '',
                sales_amount: '',
                ord_payment: '',
                shipping_status: '',
                payment_status: '',
                ord_status: 0,
            };
        },
        async getCouponByNo(memberNo: string): Promise<void> {
            try {
                const response = await axios.get<{ data: Coupon[] }>(`${import.meta.env.VITE_API_URL}/admin/coupon/getCouponRecord.php`, { params: { member_no: memberNo } });
                if (response && response.data) {
                    this.couponList = response.data;
                }
            }
            catch (error) {
                console.error("Error fetching coupon:", error);
            }
        },
    }
});
