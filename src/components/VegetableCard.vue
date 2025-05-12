<template>
    <div class="product container">
        <div class="row items">
                <div class="col-12 col-md-3 vegetable_card">
                    <p class="product_tag">#{{ item.tag }}</p>
                    <div class="product_card_img">
                        <img :src="item.image" alt="item.name">
                    </div>
                    <p class="vegetable_title">{{ item.name }}</p>
                    <p class="vegetable_price">${{ item.price }}</p>
                    <router-link :to="{
                        name: 'productinfo',
                        params: { id: product.id }
                    }" class="btn-product">查看商品詳情</router-link>
                </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['tag','name','price'],
    computed: {},
    methods: {
        
    }
}
</script>


