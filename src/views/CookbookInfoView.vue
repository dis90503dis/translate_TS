<template>
  <div class="cookbookinfo">
    <div class="banner">
      <img src="/src/assets/images/cookbook/info_banner.jpg" alt="食譜內頁">
      <h1>食譜內頁</h1>
    </div>
    <breadcrumb :breadcrumb="yourBreadcrumbData"></breadcrumb>
    <div class="recipe">
      <div v-if="loading">loading...</div>
      <div v-else-if="nodata">nodata...</div>
      <div v-else class="recipe_container ">
        <div class="title">
          <h6>{{ responseData.recipe_name }}</h6>
          <span>食譜編號#{{ responseData.recipe_no }}</span>
        </div>
        <div class="recipe_card">
          <div class="recipe_img">
            <img :src="recipeImageUrl" alt="Recipe Image">
          </div>
          <div class="box">
            <p>本篇推薦食材：<br>
              {{ responseData.recipe_recommend }}</p>
            <router-link to="/products">選購go→</router-link>
            <div class="box_btn">
              <button type="button" @click="toggleLikeUp(responseData)">
                <i :class="responseData.iconLike"></i>讚
              </button>
              <button type="button" @click="toggleBookmark(responseData)">
                <i :class="responseData.iconBookmark"></i>收藏
              </button>
            </div>
          </div>
        </div>
        <div class="time">
          <span>份量：{{ responseData.recipe_people }}</span>
          <span>時間：{{ responseData.recipe_time }}</span>
        </div>
        <div class="ingredients">
          <div class="name">
            <h5>食材</h5>
          </div>
          <p class="recipe-ingredient">{{ responseData.recipe_ingredient }}</p>

        </div>


        <div class="content">
          <h5>製作步驟：</h5>
          <p class="recipe-info">{{ responseData.recipe_info }}</p>
        </div>
      </div>

      <div class="comment">

        <h4>有{{ displayedComments.length }}個人一起做</h4>
        <div class="comment-card-wrapper">
          <button @click="scrollComment(-1)" :disabled="currentIndex === 0"><i
              class="fa-solid fa-angle-left"></i></button>
          <div class="comment_card" v-if="displayedComments.length > 0">
            <ul>
              <li v-for="(comment, index) in  displayedComments " :key="index">
                <article>
                  <div class="card_top">
                    <!-- <p>{{ comment }}</p> -->
                    <h5>{{ name }}</h5>
                    <h6>{{ comment.comment_time }}</h6>
                    <p>{{ comment.comment_info }}</p>
                  </div>
                  <div class="card_bottom">
                    <div class="comment_pic">
                      <img :src="getImageUrl(comment.comment_img)" alt=" 留言圖片">

                    </div>
                    <div class="icon">
                      <button @click="report(index)"><i class="fa-solid fa-triangle-exclamation"></i></button>
                      <div class="comment_like">
                        <i @click="toggleLike(comment)" :class="parseClass(comment.like)"></i>
                        <span>{{ comment.comment_like }}</span>
                      </div>
                    </div>

                  </div>
                </article>
              </li>
            </ul>
            <button @click="scrollComment(1)"><i class="fa-solid fa-angle-right"></i></button>
          </div>
          <!-- :disabled=" currentIndex >= totalComments - commentsPerPage || currentIndex + commentsPerPage >= totalComments " -->
          <div v-else>
            <p>暫無留言</p>
          </div>
        </div>


      </div>


    </div>
    <div class="letter">
      <h5>我要留言</h5>
      <div class="letter_box">
        <button type="button" class="login" @click="login">登入</button>
        <input type="file" id="fileInput" @change="handleFileUpload">
        <br>
        <textarea name="comment" id="comment" cols="15" rows="6" placeholder="輸入內容（最多90字）
          " v-model="comment.comment_info"></textarea>
        <br>
        <button type="submit" class="submit" @click="addComment">送出</button>
      </div>
    </div>
    <div v-if="reportModalVisible" class="report-modal">
      <h3>檢舉</h3>
      <p>提醒您：請在真正看到不適當言論時才使用檢舉功能，避免濫用，以確保我們能維護用戶良好的評論環境，謝謝您。</p>
      <button @click="closeReportModal" class="close-button">×</button>
      <textarea v-model="reportContent" placeholder="請輸入檢舉內容"></textarea>
      <br>
      <button @click="submitReport" class="submit-button">送出</button>
    </div>
  </div>
</template>

<script>

import { RouterLink, RouterView } from 'vue-router';
import Breadcrumb from '@/components/Breadcrumb.vue';
import axios from 'axios';
import { useCartStore } from '../stores/cart.js'
import { userStore } from '../stores/user.js';
import { computed } from 'vue';


export default {
  data() {
    return {
      user_no: '',
      name: '',
      showdata: '',
      number: '',
      // 麵包屑數據
      yourBreadcrumbData: [
        { text: '首頁', to: '/' },
        { text: '熱門食譜', to: '/cookbook' },
        { text: '食譜內頁', active: true }
      ],
      responseData: [],
      comments: [],
      currentIndex: 0,
      commentsPerPage: 3,
      reportModalVisible: false,
      reportContent: '',
      newMessage: '',
      newImageFile: '',
      newImage: '',
      comment: '',
      reportActiveIndex: -1,
      messages: {
        likeCount: 0
      },
      comment: { // 在這裡定義 comment 對象
        user_no: '',
        recipe_no: '',
        comment_info: '',
        comment_time: '',
        comment_status: '',
        comment_img: null
      },

    };
  },

  created() {
    const store = userStore();
    //監控pinia中的showLoginModal，如果有變動(true)就打開登入燈箱
    this.$watch(
      () => store.showLoginModal,
      (newValue) => {
        if (newValue === true) {
          this.toggleModal();
        }
      });
    store.checkLogin()
      .then(user => {
        if (user) {
          console.log('有動');
          this.isLoggedIn = true;
        } else {
          console.log('沒token');
          this.isLoggedIn = false;
        }
      })
      .catch(err => {
        this.isLoggedIn = false;
      });


    const cart = useCartStore();
    this.cartItemCount = computed(() => {
      return cart.count;
    });
  },
  mounted() {
    this.axiosGetData();
    this.fetchCommentData();
    this.toggleLikeUp(this.responseData);
    this.toggleBookmark(this.responseData);
    // this.axiosGetComments();
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      // 如果有，则将其加载到页面上
      this.messages = JSON.parse(storedMessages);
      console.log(this.messages)
    };
    const store = userStore()
    this.name = store.userData.member_name
    this.user_no = store.userData.member_no

    // this.fetchRecipeData();

  },
  computed: {
    nodata() {
      return Object.keys(this.responseData).length === 0
    },
    displayedComments() {
      if (this.isMobile) {
        this.commentsPerPage = 1;
        return this.showdata.slice(this.currentIndex, this.currentIndex + 1);
      } else {
        this.commentsPerPage = 3;
        return this.showdata.slice(this.currentIndex, this.currentIndex + 3);
      }
    },
    isMobile() {
      return window.innerWidth <= 802;
    },
    totalComments() {
      return this.showdata.length;
    },
    transformValue() {
      const itemWidth = 387; // 調整為卡片的寬度
      return `-${this.currentIndex * itemWidth}px`;
    },
    currentId() {
      return this.$route.params.id
    },
    recipeImageUrl() {
      // 假设您的图像基本路径是 VITE_IMAGES_BASE_URL
      return `${import.meta.env.VITE_IMAGES_BASE_URL}/cookbook/${this.responseData.recipe_img}`;
    }
  },
  components: {
    RouterLink,
    RouterView,
    Breadcrumb,
    userStore,
    useCartStore,
  },
  methods: {
    axiosGetData() {
      const pageId = this.$route.params.id;
      const apiUrl = `${import.meta.env.VITE_API_URL}/admin/cookbook/get_recipe.php`;
      axios.get(apiUrl)
        .then(res => {
          if (res && res.data) {
            this.loading = false;
            const target = res.data.find(item => item.recipe_no == pageId);
            this.responseData = target ? target : {};
            this.messages = res.data.map(messages => ({ ...messages, like: false, likeCount: 0 }));
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error); // 调试信息：打印错误信息
        });
    },

    fetchCommentData() {
      const apiUrl = `${import.meta.env.VITE_API_URL}/admin/cookbook/get_comment.php`;
      axios.get(apiUrl)
        .then(response => {
          // console.log("res",response);
          // console.log("res.data",response.data);
          // console.log("res.data.comment",response.data.comment);
          let filteredComments = response.data.comment.filter(comment => comment.comment_status == 0&&comment.recipe_no==this.$route.params.id);
          this.number = filteredComments.length;
          this.showdata = filteredComments;
          // console.log("11",filteredComments);
          // console.log("22",this.showdata);
          // console.log("33",this.showdata.length);
          // console.log("44",this.displayedComments[0].comment_img);
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching comment data:', error);
        });
    },



    toggleLike(comment) {
      comment.like = !comment.like;
      comment.iconLike = comment.like ? 'fa-solid fa-thumbs-up' : '';
      comment.likeCount = comment.like ? comment.likeCount + 1 : comment.likeCount - 1;
    },
    toggleLikeUp(responseData) {
      responseData.like = !responseData.like;
      responseData.iconLike = responseData.like ? 'fa-solid fa-thumbs-up' : '';
    },
    toggleBookmark(responseData) {
      responseData.bookmark = !responseData.bookmark;
      responseData.iconBookmark = responseData.bookmark ? 'fa-solid fa-bookmark' : '';
    },
    axiosGetComments() {
      const pageId = this.$route.params.id;
      axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/get_recipe.php`)
        .then(res => {
          if (res && res.data) {
            this.messages = res.data.map(messages => ({ ...messages, like: false, likeCount: 0 }));
          }
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    },
    toggleCommentLike(message) {

      message.like = !message.like;
      message.iconLike = message.like ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up';

    },
    parseClass(like) {
      return like ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up';

    },
    nextComment() {
      const maxIndex = this.messages.length - this.commentsPerPage;
      if (this.currentIndex + this.commentsPerPage < maxIndex) {
        this.currentIndex += this.commentsPerPage;
      } else {

        this.currentIndex = maxIndex;
      }
    },

    prevComment() {
      if (this.currentIndex - this.commentsPerPage >= 0) {
        this.currentIndex -= this.commentsPerPage;
      } else {

        this.currentIndex = 0;
      }
    },
    scrollComment(direction) {
      // console.log("test");
      const newIndex = this.currentIndex + direction;
      // console.log(newIndex);
      console.log("total", this.totalComments);
      console.log("show", this.commentsPerPage);
      if (newIndex >= 0 && newIndex <= this.totalComments - this.commentsPerPage) {
        this.currentIndex = newIndex;
      }
    },
    report(index) {
      this.reportModalVisible = true;
      this.reportActiveIndex = index
    },
    closeReportModal() {
      this.reportModalVisible = false;
      this.reportContent = '';
    },
    submitReport() {
      console.log(this.reportActiveIndex)
      console.log(this.displayedComments[this.reportActiveIndex])
      if (!this.reportContent.trim()) {
        alert('內容不得為空白');
        return;
      }
      const currentCommentId = this.displayedComments[this.reportActiveIndex].comment_no;
      const formData = new FormData()
      formData.append('user_no', '1')
      formData.append('comment_no', currentCommentId)
      formData.append('report_info', this.reportContent)
      formData.append('report_status', '0')
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/report_comment.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(response => {
          alert('檢舉已成功提交');
          this.closeReportModal();
        })
        .catch(error => {
          console.error('提交檢舉時出錯：', error);
          alert('提交檢舉時出錯');
        });
    },



    handleFileUpload(event) {
      const file = event.target.files[0];
      // 將文件設置到 comment 對象中的 comment_img 字段
      this.comment.comment_img = file;
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        this.newImage = imageUrl;
      };
      reader.readAsDataURL(file);
    },
    login() {
      const store = userStore();
      store.checkLogin()
        .then(user => {
          if (!user) {
            alert('請先登入');
            store.toggleLoginModal(true);
          } else {
            let parent = document.querySelector(`.letter_box`)
            parent.removeChild(parent.firstChild)
            let memberName = document.createElement('p')
            memberName.innerText = store.userData.member_name
            parent.insertBefore(memberName, parent.firstChild);
            // userData.member_name
            // console.log('USER',store.userData.member_name);
          }
        })
        .catch(err => {
          console.log('驗證過程中發生錯誤', err);
        })

    },
    addComment() {
      console.log(this.comment.comment_info);
      const formData = new FormData();
      formData.append('user_no', this.user_no);
      formData.append('recipe_no', this.responseData.recipe_no);
      formData.append('comment_info', this.comment.comment_info);
      formData.append('comment_time', this.comment.comment_time);
      formData.append('comment_status', this.comment.comment_status);
      // 將圖片添加到 FormData 中
      formData.append('comment_img', this.comment.comment_img);
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/send_comment.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          alert(response.data.msg);
          this.comment = { // 清空 comment 對象中的數據
            user_no: '',
            recipe_no: '',
            comment_info: '',
            comment_time: '',
            comment_status: '',
            comment_img: null
          };
          this.fetchCommentData();
        })
        .catch(error => {
          console.error('保存出错：', error);
        });
    },
    getImageUrl(paths) {
      return `${import.meta.env.VITE_IMAGES_BASE_URL}/cookbook/${paths}`;
    },





  },
};
</script>

<style lang="scss">
@import "@/assets/scss/page/_cookbook.scss";
@import "@/assets/scss/page/_cookbookinfo.scss";
</style>



