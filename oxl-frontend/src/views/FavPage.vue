<template>
    <div id="main-element" class="container-fluid h-100 d-inline-block">
        <div class="row bg-primary sticky-top p-2 text-light">
            <Header />
        </div>
    </div> 

    <div class="container-lg ">
       
    </div>

</template>



<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue'
import ProductList from '@/components/ProductList.vue';

export default defineComponent({
   name: "FavPage",
   components: {Header, ProductList},
   

});

</script>