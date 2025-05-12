import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from "axios";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            cartList: JSON.parse(localStorage.getItem("items")) || [],
            selectAll: false,
            couponList: [], //此會員的所有折價卷
            userInput: '',  //結帳時選取的折價卷
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
            ],
            payment_status: {
                '0': '銀行轉帳',
                '1': '線上刷卡',
            },
            order_status: {
                '0': '未配送',
                '1': '已配送',
            },
            orderInfo: reactive({
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
        }
    },
    getters: {
        //input選取的折價券和會員本來就有的折價卷array中比對
        matchingCoupon: (state) => {
            //array.find會比對陣列中的元素，傳回第一個找到的值
            return state.couponList.find(coupon => `${coupon.coupon_no}` === `${state.userInput}`) || ''
        },
        //計算運費
        shipping: (state) => {
            const shippingPrice = state.shippingList.find(s => `${s.id}` === `${state.orderInfo['shipping_status']}`);
            return shippingPrice || { price: 0 };
        },
        //--計算小計--
        subTotal: (state) => {
            return state.cartList.reduce((acc, product) => {
                return acc + (product.product_price * product.product_quantity);
            }, 0);
        },
        // --計算總額,和折價券連動--
        total: (getters) => {
            let discount = 0;
            let shipping = 0;
            if (getters.matchingCoupon) {
                discount = parseInt(getters.matchingCoupon.coupon_value || 0);
            }
            shipping = parseInt(getters.shipping.price || 0);
            return getters.subTotal - discount + shipping;
        },
        //計算購物車中商品數量
        count() {
            return this.cartList.length;
        }
    },
    actions: {
        addCart(product) {
            //用findIndex(裡面可以放function)判斷商品是否已在購物車
            const index = this.cartList.findIndex(p => p.product_no === product.product_no)
            //如果在購物車中index會從0開始
            if (index !== -1) {
                //判斷回傳的id是否已經在購物車中,如果已經在購物車內,只更新數量
                const cartItem = this.cartList.find(item => item.product_no === product.product_no)
                if (cartItem) {
                    cartItem.product_quantity += product.product_quantity;
                }
                //如果不在購物車,把商品加進去    
            } else {
                this.cartList.push(product)
            };
            this.saveLocalstorage();
        },
        newQuantityUpdate(product_no, action) {
            //判斷商品是否已在購物車
            const cartItem = this.cartList.find(item => item.product_no === product_no)
            //如果不在購物車,出function
            if (!cartItem) return;
            //如果在車內可以增加或減少數量
            if (action === 'increment') {
                cartItem.product_quantity += 1
            } else if (action === 'decrement' && cartItem.product_quantity > 1) {
                cartItem.product_quantity -= 1
            }
            this.saveLocalstorage();
        },
        saveLocalstorage() {
            localStorage.setItem("items", JSON.stringify(this.cartList));
        },
        deleteCart(product_no) {
            const index = this.cartList.findIndex(item => item.product_no === product_no)
            this.cartList.splice(index, 1);
            this.saveLocalstorage();
        },
        toggleAll() {
            this.cartList.forEach(product => {
                product.checked = this.selectAll;
            });
        },
        deleteSelected() {
            // this.cartList = this.cartList.filter(product => !product.checked)
            for (let i = this.cartList.length - 1; i >= 0; i--) {
                if (this.cartList[i].checked) {
                    this.cartList.splice(i, 1);
                }
            }
            this.saveLocalstorage();
        },
        updateOrderInfo() {
            this.orderInfo['delivery_fee'] = this.shipping.price;
            this.orderInfo['ord_amount'] = this.subTotal;
            this.orderInfo['sales_amount'] = this.matchingCoupon ? this.matchingCoupon.coupon_value : '';
            this.orderInfo['ord_payment'] = this.total;
        },
        cleanOrderInfo() {
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
            }
        },
        async getCouponByNo(memberNo) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/coupon/getCouponRecord.php`, { params: { member_no: memberNo } })
                if (response && response.data) {
                    this.couponList = response.data;
                }
            }
            catch (error) {
                console.error("Error fetching coupon:", error);
            }
        },
    }
})
