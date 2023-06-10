<template>
  <div id="main-element" class="container-fluid h-100 d-inline-block">
    <div class="row bg-primary sticky-top p-2 text-light">
      <Header/>
    </div>
  </div>

  <div class="col-md-10">
    <div>
      <ProductItem v-for="fav in favProducts" v-bind:key="fav.dbaseId" v-bind:product="fav"/>
    </div>
  </div>

</template>


<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import Header from '@/components/Header.vue'
import ProductList from '@/components/ProductList.vue';
import ProductItem from "@/components/ProductItem.vue";
import {mapGetters, useStore} from "vuex";
import {HttpHandler} from "@/data/httpHandler";

export default defineComponent({
  name: "FavPage",
  components: {Header, ProductItem, ProductList},
  data() {
    const store = useStore();
    const httpHandler = new HttpHandler();
    onMounted(() => {
      store.dispatch("loadFavouriteProducts", httpHandler.loadFavouriteProducts())
    })


  },
  computed: {
    ...mapGetters(["favProducts"])
  }
});

</script>