// import './assets/scss/main.scss'

import { createApp } from 'vue' //來自套件
import { createPinia } from 'pinia' //來自套件

import App from './App.vue' //.src資料夾
import router from './router' //.src資料夾

//創建一個vue應用程式(主要配置在app.vue裡)
const vueApp = createApp(App)

const pinia = createPinia()
vueApp.use(pinia)
vueApp.use(router)

//渲染在index.html裡面的div#app
vueApp.mount('#app')
