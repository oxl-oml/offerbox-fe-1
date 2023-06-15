<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <img src="../assets/logo/l1_low.png" alt="" srcset="">
        <div class="progress-bar">
          <div :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </transition>

    <div id="main-element" class="container-fluid h-100 d-inline-block">
      <div class="row bg-primary sticky-top p-2 text-light">
        <Header />
      </div>

      <div class="row">
        <div class="col-sm-12 col-md-3 col-xl-2 bg-light d-flex flex-column align-items-center">
          <CategoryList :class="{'cat-custom-mobile' : (deviceWidth <= 540), 'cat-custom-standard': (deviceWidth > 540) }"
              :selectedCategory="selectedCategory"
              :categories="categories"
              @selectCategory="handleSelectedCategory"
          />
        </div>

        <div class="col-sm-12 col-md-9 col-xl-10">
          <ProductList v-if="!loading"/>
        </div>
      </div>
    </div>

    <div id="scroll-to-top" v-if="showScrollButton" @click="scrollToTop">
      <i class="bi bi-arrow-right"></i>
    </div>
  </div>
            <Footer />
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import ProductList from '@/components/ProductList.vue';
import CategoryList from '@/components/CategoryList.vue';
import {computed, defineComponent, onMounted, ref} from 'vue';
import {HttpHandler} from '@/data/httpHandler';
import {useStore} from 'vuex';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'MainPage',
  components: {Header, ProductList, CategoryList, Footer},
  setup() {
    const store = useStore();
    const httpHandler = new HttpHandler();
    const loading = ref(true);
    const progress = ref(0);
    const scrollPosition = ref(0);
    const showScrollButton = computed(() => scrollPosition.value > window.innerHeight * 0.8);

    onMounted(() => {
      const timer = setInterval(() => {
        if (progress.value < 100) {
          progress.value += 46;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            loading.value = false;
          }, 225);
        }
      }, 225);

      store.dispatch('loadProducts', httpHandler.loadProducts);
      store.dispatch('loadCategories', httpHandler.loadCategories);

      window.addEventListener('scroll', handleScroll);
    });

    const categories = computed(() => store.state.categories);
    const selectedCategory = computed(() => store.state.selectedCategory);

    const handleSelectedCategory = (cName: string) => {
      store.commit('selectCategory', cName);
    };

    const handleScroll = () => {
      scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return {
      loading,
      progress,
      categories,
      selectedCategory,
      showScrollButton,
      handleSelectedCategory,
      scrollToTop,
    };
  },
  computed:{
    deviceWidth():number{
      return window.innerWidth;
    }
  }
});
</script>

<style>

.cat-custom-mobile{
  max-height: 300px;
  overflow-y: scroll;
}

.cat-custom-normal{
  max-height: 1000px ;

}

#main-element {
  user-select: none;
}

.app-wrapper {
  min-height: 100vh;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.progress-bar {
  width: 220px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
}

.progress-bar div {
  height: 100%;
  background-color: black;
  width: 0;
  transition: width 0.99s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#scroll-to-top {
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: black;
  color: #fff;
  cursor: pointer;
  border-radius: 10%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: ease-in 500ms;
}

#scroll-to-top i {
  transform: rotate(-90deg);
  color: #fff;
  transition: ease-in 500ms;
}

#scroll-to-top:hover {
  transition: ease-in 500ms;
  -webkit-transform: scale(0.88);
  transform: scale(0.88);
}

#F-main-element {
  user-select: none;
}
</style>
