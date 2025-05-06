<template>
  <!----------- banner ------------>
        <div class="faqview">
          <div class="faq_banner">
            <img src="../../src/assets/images/faq/faq_banner.jpg" alt="faq-banner">
              <div class="banner_title">
                <h1>常見問題</h1>
              </div>
          </div>
        </div>
  <!----------- breadcrumb ------------>  
  <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
  <!----------- faq-container ------------> 
  <div class="faq-categories container">
        <button ref="button0" @click="changeCategory('付款問題' ,0)" :class="{ 'active': selectedCategoryIndex === 0 }">付款問題</button>
        <button ref="button1" @click="changeCategory('運送問題' ,1)" :class="{ 'active': selectedCategoryIndex === 1 }">運送問題</button>
        <button ref="button2" @click="changeCategory('食材問題' ,2)" :class="{ 'active': selectedCategoryIndex === 2 }">食材問題</button>
  </div>
  <hr>
  <div class="faq-container container">
    <div v-for="(faqItem, index) in filteredFaqs" :key="index" class="faq-item">
      <div class="question" @click="toggleAnswer(faqItem)">
        <span>{{ faqItem.question }}</span>
        <img
          v-if="faqItem.expanded"
          class="arrow-icon"
          src="@/assets/images/faq/arrow-up.png"
          alt="arrow-up"
        />
        <img
          v-else
          class="arrow-icon"
          src="@/assets/images/faq/arrow-down.png"
          alt="arrow-down"
        />
      </div>
      <transition name="fade">
        <div class="answer" v-show="faqItem.expanded">
          {{ faqItem.answer }}
        </div>
      </transition>
    </div>
  </div>
  </template>
  <!----------- end ------------>
  <script>
  import { RouterLink, RouterView } from 'vue-router'
  import Breadcrumb from '@/components/Breadcrumb.vue';
  
  export default {
    data() {
      return {
        yourBreadcrumbData: [
            { text: '首頁', to: '/' },
            { text: '常見問題', active: true },
          ],
        allFaqs: [
          // 付款問題
          { 
            category: "付款問題", 
            question: "如何付款?", 
            answer: "1.信用卡即時線上一次刷卡付款\n2.ATM付款\n3.LINE Pay", 
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "運費怎麼計算？可以合併運費嗎？", 
            answer: "運費的計算方式取決於購物車中的商品總重量、運送地址、所選擇的運送方式等因素。我們的網站提供了標準運費，同時在特定條件下，購物滿額可能享有免運費優惠。您可以在結帳頁面查看確切的運費金額。\n合併運費方面，我們很抱歉目前無法提供此服務。每筆訂單的運費是根據購物車中商品的總重量計算的。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "為什麼不同商品不能放在同個購物車結帳呢？", 
            answer: "我們的系統目前可能僅支持單一商品結帳，每項商品需單獨結帳。我們正在努力改進系統以提供更便捷的購物體驗，並允許用戶一次性結帳多個商品。感謝您的理解。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "可以用貨到付款或是超商取貨付款嗎？", 
            answer: "目前我們支持線上支付，可使用信用卡、Debit卡等方式進行結帳，我們也提供貨到付款或超商取貨付款服務，感謝您對我們產品的關注。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "要怎麼確認ATM轉帳有成功呢？要通知你們嗎？", 
            answer: "在完成ATM轉帳後，您可以透過查詢您的銀行帳戶明細來確認轉帳是否成功。通常，成功的轉帳交易會顯示在您的交易明細中，包含匯款金額和日期。如果確定成功，您無需通知我們，我們的系統將在一段時間內自動更新您的訂單支付狀態。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "要多久完成匯款呢？帳號忘記了該怎麼辦？", 
            answer: "匯款所需的時間取決於您的銀行以及轉帳的方式。通常情況下，匯款可能需要1至3個工作日完成。一旦我們收到銀行的匯款通知，我們的系統將更新您的訂單狀態。\n如果您忘記了轉帳使用的帳號，請立即聯繫我們的客戶服務，提供您的訂單資訊以及匯款的相關細節。我們的客戶服務將協助您解決問題，並提供正確的帳號資訊。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "已經匯款完，訂單卻一直顯示待付款？", 
            answer: "若您的訂單在您完成匯款後仍顯示待付款，請耐心等待1至3個工作日，以確保銀行完成匯款。如果在此時間內未看到支付狀態更新，請聯繫客戶服務進行進一步的協助。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "如果我忘記去匯款了要怎麼辦？", 
            answer: "如果您忘記了進行匯款，我們建議您立即聯繫客戶服務。我們的團隊將提供進一步的協助，並確認訂單的支付狀態。在此期間，請避免重新下單，以免發生重複支付的情況。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "怎麼付款呢？", 
            answer: "我們提供多種付款方式，包括信用卡支付、網路銀行轉帳、支付寶、PayPal等。您可以在結帳時選擇最適合您的付款方式。",  
            expanded: false 
          },
          { 
            category: "付款問題", 
            question: "可以臨櫃匯款嗎？", 
            answer: "目前我們的系統不支援臨櫃匯款。然而，您可以選擇其他便捷的付款方式，如網路銀行轉帳或信用卡支付，以完成您的訂單付款。如果您有任何其他支付方面的問題或需求，請隨時聯繫我們的客戶服務團隊，我們將竭誠為您提供幫助。",  
            expanded: false 
          },
          // 運送問題
          { category: "運送問題", question: "配送方式是什麼？", answer: "我們提供快遞和郵局配送。", expanded: false },
          { category: "運送問題", question: "如何查詢訂單的運送狀態？", answer: "在訂單頁面您可以追蹤訂單的運送狀態，也會發送通知郵件給您。", expanded: false },
          { category: "運送問題", question: "是否支援國際配送？", answer: "目前我們僅支援本地國內配送，不提供國際配送服務。", expanded: false },
          { category: "運送問題", question: "遇到運送損壞的情況怎麼辦？", answer: "若收到損壞的商品，請立即聯絡我們的客服，我們將提供協助處理並安排替換。", expanded: false },
          { category: "運送問題", question: "是否支援特定時段的配送服務？", answer: "是的，我們提供特定時段的配送選擇，以確保您能在方便的時間收到訂單。", expanded: false },
          { category: "運送問題", question: "如何處理配送延遲的情況？", answer: "若遇到不可預測的配送延遲，我們將立即通知您並提供追蹤資訊，同時努力解決問題以確保訂單盡早送達。", expanded: false },
          // 食材問題
          { category: "食材問題", question: "食材的新鮮程度如何保證？", answer: "我們保證使用新鮮食材，並在配送前進行嚴格的品質檢查。", expanded: false },
          { category: "食材問題", question: "是否提供有機食材？", answer: "是的，我們提供部分有機食材，以提供更多元的選擇。", expanded: false },
          { category: "食材問題", question: "有提供特殊飲食需求的食材選擇嗎？", answer: "是的，我們提供符合特殊飲食需求（如素食、無麩質）的食材選擇。", expanded: false },
          { category: "食材問題", question: "食材的保存方式有特別建議嗎？", answer: "每份食材都附有保存建議，以確保品質和新鮮度。", expanded: false },
          { category: "食材問題", question: "食材是否提供來自當地農產的選擇？", answer: "是的，我們鼓勵並提供當地農產食材，以支持本地農業和提供更環保的食材選擇。", expanded: false },
          { category: "食材問題", question: "有無提供季節性食材，以及如何確保其新鮮度？", answer: "我們定期更新食材菜單，提供符合當季的食材，同時透過迅速的配送流程確保其新鮮度。", expanded: false },       
        ],
        selectedCategory: "付款問題",
        selectedCategoryIndex: 0,
      };
    },
    computed: {
      filteredFaqs() {
        return this.allFaqs.filter(faq => faq.category === this.selectedCategory);
      }
    },
    methods: {
      toggleAnswer(faqItem) {
        // 切換問題的展開狀態
        faqItem.expanded = !faqItem.expanded;
  
        // 如果展開，關閉其他問題的答案
        if (faqItem.expanded) {
          this.allFaqs.forEach(item => {
            if (item !== faqItem) {
              item.expanded = false;
            }
          });
        }
      },
      changeCategory(category, index) {
        this.selectedCategory = category;
        this.selectedCategoryIndex = index;
  
        this.allFaqs.forEach((item, i) => {
              item.active = i === index;
          });
      },  
    },
    components: {
          RouterLink,
          RouterView,
          Breadcrumb,
      },
  }
  </script>
  
  <style lang="scss">
  @import "@/assets/scss/page/_faq.scss";
  </style>
  
  
  
