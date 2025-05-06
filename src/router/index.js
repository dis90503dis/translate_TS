import { createRouter, createWebHistory } from 'vue-router';
import { userStore } from '../stores/user.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/foodmap',
      name: 'foodmap',
      component: () => import('../views/FoodMapView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FaqView.vue'),
    },
    {
      path: '/bmi',
      name: 'bmi',
      component: () => import('../views/BmiView.vue'),
    },
    {
      path: '/bmr',
      name: 'bmr',
      component: () => import('../views/BmrView.vue'),
    },
    {
      path: '/cal',
      name: 'cal',
      component: () => import('../views/CalView.vue'),
    },
    {
      path: '/gi',
      name: 'gi',
      component: () => import('../views/GiView.vue'),
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
    },
    {
      path: '/cookbook',
      name: 'cookbook',
      component: () => import('../views/CookbookView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/member',
      component: () => import('../views/MemberView.vue'),
      beforeEnter: (to, from, next) => {
        const store = userStore();
        if (!store.checkLogin()) {
          next('/'); // 如果用戶未登錄，跳轉首頁
        } else {
          next(); // 已登錄，允許訪問
        }
      },
      children: [
        { path: '', redirect: { name: 'memberInfo' } },
        { path: 'info', name: 'memberInfo', component: () => import('@/components/MemberInfo.vue') },
        { path: 'coupon', name: 'memberCoupon', component: () => import('@/components/MemberCoupon.vue') },
        { path: 'level', name: 'memberLevel', component: () => import('@/components/MemberLevel.vue') },
        { path: 'order', name: 'memberOrder', component: () => import('@/components/MemberOrder.vue') },
        { path: 'favourite', name: 'memberFavourite', component: () => import('@/components/MemberFavourite.vue') },
        { path: 'collection', name: 'memberCollection', component: () => import('@/components/MemberCollection.vue') },
      ]
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/productinfo/:product_no',
      name: 'productinfo',
      component: () => import('../views/ProductInfo.vue'),
      props: true
    },
    {
      path: '/articleinfo',
      name: 'articleinfo',
      component: () => import('../views/ArticleInfo.vue'),
    },
    {
      path: '/cookbookinfo',
      name: 'cookbookinfo',
      component: () => import('../views/CookbookInfoView.vue'),
    },
    {
      path: '/cookbookinfo/:id',
      name: 'cookbookinfo',
      component: () => import('../views/CookbookInfoView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckOutView.vue'),
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentView.vue'),
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../views/ConfirmView.vue'),
    },

  ]
})

export default router
